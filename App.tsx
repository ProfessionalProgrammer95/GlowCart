import React from 'react';
import AppNavigator from './src/navigation/AppNavigator';
import { AuthProvider } from './src/context/AuthContext';
import { WishlistProvider } from './src/context/WishlistContext';

export default function App() {
  return (
    <AuthProvider>
      <WishlistProvider>
        <AppNavigator />
      </WishlistProvider>
    </AuthProvider>
  );
}
