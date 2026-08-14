import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Sidebar from './shared/ui/Sidebar/Sidebar';
import AppRoutes from './app/router/AppRoutes';
import './index.css';
import './App.css';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 5000,
    },
  },
});

// eslint-disable-next-line no-undef
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="app-container">
          <Sidebar />
          <main className="app-content">
            <AppRoutes />
          </main>
        </div>
      </Router>
    </QueryClientProvider>
  </React.StrictMode>
);
