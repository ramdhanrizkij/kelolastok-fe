import { useState, useMemo, useCallback } from "react"
import type { PaginationMeta } from "../types/pagination"

interface UsePaginationOptions {
  totalItems: number
  initialPage?: number
  initialLimit?: number
}

export function usePagination({
  totalItems,
  initialPage = 1,
  initialLimit = 10,
}: UsePaginationOptions) {
  const [page, setPage] = useState(initialPage)
  const [limit, setLimit] = useState(initialLimit)

  const totalPages = useMemo(
    () => Math.max(1, Math.ceil(totalItems / limit)),
    [totalItems, limit]
  )

  const meta: PaginationMeta = useMemo(
    () => ({
      page,
      limit,
      total: totalItems,
      totalPages,
      hasNext: page < totalPages,
      hasPrev: page > 1,
    }),
    [page, limit, totalItems, totalPages]
  )

  const nextPage = useCallback(() => {
    setPage((prev) => Math.min(prev + 1, totalPages))
  }, [totalPages])

  const prevPage = useCallback(() => {
    setPage((prev) => Math.max(prev - 1, 1))
  }, [])

  const goToPage = useCallback(
    (targetPage: number) => {
      const sanitized = Math.max(1, Math.min(targetPage, totalPages))
      setPage(sanitized)
    },
    [totalPages]
  )

  return {
    page,
    limit,
    meta,
    setPage: goToPage,
    setLimit,
    nextPage,
    prevPage,
  }
}

export default usePagination
