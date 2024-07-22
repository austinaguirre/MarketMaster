// App.js
import React from 'react';
import { AuthProvider } from './AuthContext';
import AppNavigation from './AppNavigation';

export default function App() {
  return (
    <AuthProvider>
      <AppNavigation />
    </AuthProvider>
  );
}
