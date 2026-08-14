import React from 'react';
import Sidebar from './shared/ui/Sidebar/Sidebar';
import AppRoutes from './app/router/AppRoutes';
import { useAuth } from './app/auth/AuthContext';
import './App.css';

export default function App() {
  const { isAuthenticated, signOut } = useAuth();

  return (
    <div className="app-container">
      {isAuthenticated && <Sidebar onSignOut={signOut} />}
      <main className={`app-content ${!isAuthenticated ? 'no-sidebar' : ''}`}>
        <AppRoutes />
      </main>
    </div>
  );
}
