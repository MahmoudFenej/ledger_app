import React from 'react';
import Sidebar from './shared/ui/Sidebar/Sidebar';
import AppRoutes from './app/router/AppRoutes';
import { useSharedState } from 'auth_app/useSharedState';
import './App.css';

export default function App() {
  const [{ isAuthenticated }] = useSharedState();

  return (
    <div className="app-container">
      {isAuthenticated && <Sidebar />}
      <main className={`app-content ${!isAuthenticated ? 'no-sidebar' : ''}`}>
        <AppRoutes />
      </main>
    </div>
  );
}
