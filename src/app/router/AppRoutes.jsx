import React from 'react';
import { Routes, Route } from 'react-router-dom';
import DashboardPage from '../../pages/Dashboard/DashboardPage';
import CustomersPage from '../../pages/Customers/CustomersPage';
import CustomerDetailPage from '../../pages/Customers/CustomerDetailPage';
import TransactionsPage from '../../pages/Transactions/TransactionsPage';
import SettingsPage from '../../pages/Settings/SettingsPage';

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<DashboardPage />} />
      <Route path="/customers" element={<CustomersPage />} />
      <Route path="/customers/:id" element={<CustomerDetailPage />} />
      <Route path="/transactions" element={<TransactionsPage />} />
      <Route path="/settings" element={<SettingsPage />} />
    </Routes>
  );
}

export default AppRoutes;
