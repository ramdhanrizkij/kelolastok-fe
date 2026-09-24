import type { Route } from '../shared/types'
import { lazy } from 'react'

/**
 * Lazy-loaded page components
 * Using React.lazy for code splitting and better performance
 */
const EVADashboard = lazy(() => import('../pages/dashboard'))
const EquipmentClasses = lazy(() => import('../pages/equipment-classes'))
const EquipmentBrands = lazy(() => import('../pages/equipment-brands'))
const Equipment = lazy(() => import('../pages/equipment'))
const EquipmentModels = lazy(() => import('../pages/equipment-models'))
const InitialAssignments = lazy(() => import('../pages/initial-assignments'))
const NonTosLocations = lazy(() => import('../pages/non-tos-locations'))
const TosActivation = lazy(() => import('../pages/tos-activation'))
const Operators = lazy(() => import('../pages/operators'))
const SimTypes = lazy(() => import('../pages/sim-types'))
const EquipmentTypeSimTypes = lazy(() => import('../pages/equipment-type-sim-types'))
const PersonRoster = lazy(() => import('../pages/person-roster'))
const EquipmentStatusPage = lazy(() => import('../pages/equipment-status'))
const PlannedAssignmentOperatorPage = lazy(() => import('../pages/planned-assignment-operator'))
const PlannedAssignmentLocPage = lazy(() => import('../pages/planned-assignment-loc'))
const TodayShiftOperatorPage = lazy(() => import('../pages/today-shift-operator'))
const ActualAssignmentPage = lazy(() => import('../pages/actual-assignment'))
const ScreenConfigPage = lazy(() => import('../pages/screen-config'))
const AttendanceReportPage = lazy(() => import('../pages/attendance-report'))
const ShowAttendancePage = lazy(() => import('../pages/show-attendance'))
const TosAssignmentPage = lazy(() => import('../pages/tos-assignment'))
const STMBManager = lazy(() => import('../pages/stmb-manager'))

const routes: Route[] = [
    {
        name: 'EVADashboard',
        path: '/dashboard',
        type: 'page',
        element: EVADashboard,
        meta: {
            isProtectedRoute: false,
        },
    },
    {
        name: 'EVADashboardScreen',
        path: '/dashboard/:screenName',
        type: 'page',
        element: EVADashboard,
        meta: {
            isProtectedRoute: false,
        },
    },
    {
        name: 'EquipmentClasses',
        path: '/master/equipment-classes',
        type: 'page',
        element: EquipmentClasses,
        meta: {
            isProtectedRoute: false,
        },
    },
    {
        name: 'EquipmentBrands',
        path: '/master/equipment-brands',
        type: 'page',
        element: EquipmentBrands,
        meta: {
            isProtectedRoute: false,
        },
    },
    {
        name: 'EquipmentModels',
        path: '/master/equipment-models',
        type: 'page',
        element: EquipmentModels,
        meta: {
            isProtectedRoute: false,
        },
    },
    {
        name: 'InitialAssignments',
        path: '/master/initial-assignments',
        type: 'page',
        element: InitialAssignments,
        meta: {
            isProtectedRoute: false,
        },
    },
    {
        name: 'NonTosLocations',
        path: '/master/non-tos-locations',
        type: 'page',
        element: NonTosLocations,
        meta: {
            isProtectedRoute: false,
        },
    },
    {
        name: 'TosActivation',
        path: '/master/tos-activation',
        type: 'page',
        element: TosActivation,
        meta: {
            isProtectedRoute: false,
        },
    },
    {
        name: 'Equipment',
        path: '/master/equipment',
        type: 'page',
        element: Equipment,
        meta: {
            isProtectedRoute: false,
        },
    },
    {
        name: 'Operators',
        path: '/master/operators',
        type: 'page',
        element: Operators,
        meta: {
            isProtectedRoute: false,
        },
    },
    {
        name: 'SimTypes',
        path: '/master/sim-types',
        type: 'page',
        element: SimTypes,
        meta: {
            isProtectedRoute: false,
        },
    },
    {
        name: 'EquipmentTypeSimTypes',
        path: '/master/equipment-type-sim-types',
        type: 'page',
        element: EquipmentTypeSimTypes,
        meta: {
            isProtectedRoute: false,
        },
    },
    {
        name: 'PersonRoster',
        path: '/transaction/person-roster',
        type: 'page',
        element: PersonRoster,
        meta: {
            isProtectedRoute: false,
        },
    },
    {
        name: 'EquipmentStatusTransactionPage',
        path: '/transaction/equipment-status',
        type: 'page',
        element: EquipmentStatusPage,
        meta: {
            isProtectedRoute: false,
        },
    },
    {
        name: 'PlannedAssignmentOperatorPage',
        path: '/transaction/planned-assignment-operator',
        type: 'page',
        element: PlannedAssignmentOperatorPage,
        meta: {
            isProtectedRoute: false,
        },
    },
    {
        name: 'PlannedAssignmentLocPage',
        path: '/transaction/planned-assignment-loc',
        type: 'page',
        element: PlannedAssignmentLocPage,
        meta: {
            isProtectedRoute: false,
        },
    },
    {
        name: 'TodayShiftOperatorPage',
        path: '/transaction/today-shift-operator',
        type: 'page',
        element: TodayShiftOperatorPage,
        meta: {
            isProtectedRoute: false,
        },
    },
    {
        name: 'ActualAssignmentPage',
        path: '/transaction/actual-assignment',
        type: 'page',
        element: ActualAssignmentPage,
        meta: {
            isProtectedRoute: false,
        },
    },
    {
        name: 'ShowAttendancePage',
        path: '/transaction/show-attendance',
        type: 'page',
        element: ShowAttendancePage,
        meta: {
            isProtectedRoute: false,
        },
    },
    {
        name: 'TosAssignmentPage',
        path: '/transaction/tos-assignment',
        type: 'page',
        element: TosAssignmentPage,
        meta: {
            isProtectedRoute: false,
        },
    },
    {
        name: 'STMBManagerPage',
        path: '/transaction/stmb-manager',
        type: 'page',
        element: STMBManager,
        meta: {
            isProtectedRoute: false,
        },
    },
    {
        name: 'ScreenConfigPage',
        path: '/config/screen',
        type: 'page',
        element: ScreenConfigPage,
        meta: {
            isProtectedRoute: false,
        },
    },
    {
        name: 'AttendanceReportPage',
        path: '/report/attendance',
        type: 'page',
        element: AttendanceReportPage,
        meta: {
            isProtectedRoute: false,
        },
    },
]

export default routes
