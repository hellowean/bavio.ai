import { Navigate, type RouteObject } from 'react-router-dom'

import { ProtectedRoute, PublicOnlyRoute } from '@/app/AuthGuards'
import { DashboardLayout } from '@/components/layout/DashboardLayout'
import LoginPage from '@/pages/auth/LoginPage'
import AgentsPage from '@/pages/agents/AgentsPage'
import AnalyticsPage from '@/pages/analytics/AnalyticsPage'
import BillingPage from '@/pages/billing/BillingPage'
import CallsPage from '@/pages/calls/CallsPage'
import LeadsPage from '@/pages/leads/LeadsPage'
import MinutesPage from '@/pages/minutes/MinutesPage'
import OverviewPage from '@/pages/overview/OverviewPage'
import PlaceholderPage from '@/pages/placeholder/PlaceholderPage'
import SettingsPage from '@/pages/settings/SettingsPage'
import SubscriptionPage from '@/pages/subscription/SubscriptionPage'
import UsagePage from '@/pages/usage/UsagePage'

export const routes: RouteObject[] = [
  {
    path: '/login',
    element: (
      <PublicOnlyRoute>
        <LoginPage />
      </PublicOnlyRoute>
    ),
  },
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <DashboardLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <Navigate to="/overview" replace />,
      },
      {
        path: 'overview',
        element: <OverviewPage />,
      },
      {
        path: 'calls',
        element: <CallsPage />,
      },
      {
        path: 'leads',
        element: <LeadsPage />,
      },
      {
        path: 'usage',
        element: <UsagePage />,
      },
      {
        path: 'minutes',
        element: <MinutesPage />,
      },
      {
        path: 'agents',
        element: <AgentsPage />,
      },
      {
        path: 'analytics',
        element: <AnalyticsPage />,
      },
      {
        path: 'integrations',
        element: <PlaceholderPage title="Integrations" />,
      },
      {
        path: 'workflows',
        element: <PlaceholderPage title="Workflows" />,
      },
      {
        path: 'phone-numbers',
        element: <PlaceholderPage title="Phone Numbers" />,
      },
      {
        path: 'subscription',
        element: <SubscriptionPage />,
      },
      {
        path: 'billing',
        element: <BillingPage />,
      },
      {
        path: 'team',
        element: <PlaceholderPage title="Team" />,
      },
      {
        path: 'notifications',
        element: <PlaceholderPage title="Notifications" />,
      },
      {
        path: 'support',
        element: <PlaceholderPage title="Support" />,
      },
      {
        path: 'settings',
        element: <SettingsPage />,
      },
    ],
  },
  {
    path: '*',
    element: <Navigate to="/overview" replace />,
  },
]
