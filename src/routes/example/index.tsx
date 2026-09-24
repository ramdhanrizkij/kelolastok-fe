import { createBrowserRouter, RouterProvider, Navigate } from 'react-router'
import { routeMapper } from './core'
import routes from './routes'
import ErrorPage from '@/pages/error/ErrorPage'
import NotFoundPage from '@/pages/error/NotFoundPage'
import RootLayout from '@/components/RootLayout'
import { isMenuItemEnabled } from '@/shared/config/featureFlags'
import { getBasename } from '@/shared/config/runtime'

// Standalone: /${VITE_API_SITE}. Inside the Minerva shell: the mount path the
// shell routes to (VITE_EVA_MOUNT_PATH, default /eva). See shared/config/runtime.
const basePath = getBasename()

const defaultPath = import.meta.env.VITE_APP_DEFAULT_PATH || '/master/equipment'

/**
 * Map a route path to its group label so featureFlags can match the group key.
 * Mirrors the grouping in `DevNavbar` so menu visibility & route registration stay in sync.
 */
const groupLabelForPath = (path: string | undefined): string | undefined => {
    if (!path) return undefined
    if (path.startsWith('/master')) return 'Master'
    if (path.startsWith('/transaction')) return 'Transaction'
    if (path.startsWith('/dashboard')) return 'Main'
    if (path.startsWith('/config')) return 'Config'
    if (path.startsWith('/report')) return 'Report'
    return undefined
}

// Filter out disabled routes — direct URL access falls through to the catch-all 404.
// Routes without a `path` (index/group routes) are never filtered out.
const enabledRoutes = routes.filter((r) =>
    r.path ? isMenuItemEnabled(r.path, groupLabelForPath(r.path)) : true,
)

const router = createBrowserRouter(
    [
        {
            element: <RootLayout />,
            // Top-level errorElement catches unrecoverable errors (e.g. RootLayout itself crashing).
            // Per-child errorElement (below) keeps the sidebar/header alive when a single page errors.
            errorElement: <ErrorPage />,
            children: [
                { index: true, element: <Navigate to={defaultPath} replace /> },
                ...routeMapper(enabledRoutes).map((r) => ({
                    ...r,
                    errorElement: <ErrorPage />,
                })),
                { path: '/404', element: <NotFoundPage /> },
                { path: '*', element: <NotFoundPage /> },
            ],
        },
    ],
    {
        basename: basePath,
    },
)

export default function Router() {
    return <RouterProvider router={router} />
}
