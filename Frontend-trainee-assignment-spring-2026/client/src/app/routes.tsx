import { lazy, Suspense } from 'react';
import {
  createBrowserRouter,
  Navigate,
  type RouteObject,
} from 'react-router-dom';
import { CircularProgress, Box } from '@mui/material';
import { PageLayout } from '@/shared/ui/PageLayout';

const AdsListPage = lazy(() => import('@/features/ads/pages/AdsListPage'));
const AdDetailPage = lazy(() => import('@/features/ads/pages/AdDetailPage'));
const AdEditPage = lazy(() => import('@/features/ads/pages/AdEditPage'));

function SuspenseLoader() {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', pt: 8 }}>
      <CircularProgress />
    </Box>
  );
}

function LayoutWrapper({ children }: { children: React.ReactNode }) {
  return (
    <PageLayout>
      <Suspense fallback={<SuspenseLoader />}>{children}</Suspense>
    </PageLayout>
  );
}

const routes: RouteObject[] = [
  {
    path: '/',
    element: <Navigate to="/ads" replace />,
  },
  {
    path: '/ads',
    element: (
      <LayoutWrapper>
        <AdsListPage />
      </LayoutWrapper>
    ),
  },
  {
    path: '/ads/:id',
    element: (
      <LayoutWrapper>
        <AdDetailPage />
      </LayoutWrapper>
    ),
  },
  {
    path: '/ads/:id/edit',
    element: (
      <LayoutWrapper>
        <AdEditPage />
      </LayoutWrapper>
    ),
  },
];

export const router = createBrowserRouter(routes);
