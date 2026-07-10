import { HashRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { DashboardView } from './views/DashboardView';
import { POSTerminalView } from './views/POSTerminalView';
import { InventoryView } from './views/InventoryView';
import { TransactionsView } from './views/TransactionsView';
import { AdminPanelView } from './views/AdminPanelView';
import { LoginView } from './views/LoginView';
import { RegisterView } from './views/RegisterView';

import { Layout } from './layout/Layout';
import { I18nProvider } from './i18nContext';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';


const queryClient = new QueryClient();
function ProtectedRoute() {
  const token = localStorage.getItem("token");

  return token ? <Outlet /> : <Navigate to="/login" replace />;
}

export default function App() {
  return (
    <I18nProvider>
      <QueryClientProvider client={queryClient}>
        <Router>
        <Routes>
          <Route path="/login" element={<LoginView />} />
          <Route path="/register" element={<RegisterView />} />

          <Route element={<ProtectedRoute />}>
            <Route element={<Layout />}>
              <Route index element={<DashboardView />} />
              <Route path="pos" element={<POSTerminalView />} />
              <Route path="inventory" element={<InventoryView />} />
              <Route path="transactions" element={<TransactionsView />} />
              {/* <Route path="admin" element={<AdminPanelView />} /> */}
            </Route>
          </Route>
        </Routes>
      </Router>
      </QueryClientProvider>
    </I18nProvider>
  );
}
