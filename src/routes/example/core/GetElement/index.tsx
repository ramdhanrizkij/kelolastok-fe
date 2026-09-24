import type { Route, RouteComponentProps } from '../../../shared/types'
import { type ComponentType, createElement, Suspense } from 'react'
import { Navigate, Outlet, useNavigate } from 'react-router'
import { Spin } from 'antd'
import ProtectedRoute from '../ProtectedRoute'
import { LoadingOutlined } from '@ant-design/icons'

interface GetElementProps {
    route: Route
}

/**
 * Loading fallback component for lazy-loaded routes
 */
function LoadingFallback() {
    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 12,
                minHeight: '100vh',
            }}
        >
            <Spin indicator={<LoadingOutlined spin style={{ fontSize: 48 }} />} />
            Loading...
        </div>
    )
}

/**
 * GetElement Component
 *
 * Resolves route configuration to appropriate React elements.
 * Handles:
 * - Group routes (renders Outlet for nested routes)
 * - Redirect routes (navigates to specified path)
 * - Page routes (renders component, optionally wrapped with ProtectedRoute)
 */
export default function GetElement({ route }: GetElementProps) {
    const navigate = useNavigate()

    // Handle group routes - render outlet for nested children
    if (route.type === 'group') {
        return <Outlet />
    }

    // Handle redirect routes
    if (route.type === 'redirect') {
        const to = route.meta?.redirection ?? '/'
        return <Navigate to={to} replace />
    }

    // Handle page routes
    if (route.type === 'page') {
        const element = createElement(route.element as ComponentType<RouteComponentProps>, {
            navigate,
        })
        const isProtected = route.meta?.isProtectedRoute ?? false

        // Wrap with Suspense for lazy-loaded components
        const suspendedElement = <Suspense fallback={<LoadingFallback />}>{element}</Suspense>

        // Wrap with ProtectedRoute if route requires authentication
        if (isProtected) {
            return <ProtectedRoute redirectTo="/">{suspendedElement}</ProtectedRoute>
        }

        return suspendedElement
    }

    return null
}
