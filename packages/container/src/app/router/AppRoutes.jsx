import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import DashboardPage from '../../pages/Dashboard/DashboardPage';
import CustomersPage from '../../pages/Customers/CustomersPage';
import CustomerDetailPage from '../../pages/Customers/CustomerDetailPage';
import TransactionsPage from '../../pages/Transactions/TransactionsPage';
import SettingsPage from '../../pages/Settings/SettingsPage';
import { withAuth, withGuest } from './PageHOC';
import { useAuth } from '../auth/AuthContext';

const Login = React.lazy(() => import('auth_app/Login'));

const AuthenticatedDashboard = withAuth(DashboardPage);
const AuthenticatedCustomers = withAuth(CustomersPage);
const AuthenticatedCustomerDetail = withAuth(CustomerDetailPage);
const AuthenticatedTransactions = withAuth(TransactionsPage);
const AuthenticatedSettings = withAuth(SettingsPage);
const GuestLogin = withGuest(Login);

function AppRoutes() {
  const { signIn } = useAuth();

  return (
    <Suspense fallback={<div style={{ padding: '40px', textAlign: 'center', fontFamily: 'sans-serif' }}>Loading...</div>}>
      <Routes>
        <Route path="/login" element={<GuestLogin onSignIn={signIn} />} />
        <Route path="/" element={<AuthenticatedDashboard />} />
        <Route path="/customers" element={<AuthenticatedCustomers />} />
        <Route path="/customers/:id" element={<AuthenticatedCustomerDetail />} />
        <Route path="/transactions" element={<AuthenticatedTransactions />} />
        <Route path="/settings" element={<AuthenticatedSettings />} />
      </Routes>
    </Suspense>
  );
}

export default AppRoutes;
