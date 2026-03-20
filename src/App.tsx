/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { AuthProvider } from './store/auth';
import { LanguageProvider } from './store/language';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { Assets } from './pages/Assets';
import { AssetDetails } from './pages/AssetDetails';
import { Dashboard } from './pages/Dashboard';
import { ListOnboarding } from './pages/ListOnboarding';
import { Booking } from './pages/Booking';
import { Profile } from './pages/Profile';
import { Settings } from './pages/Settings';
import { Login } from './pages/Login';
import { ErrorBoundary } from './components/ErrorBoundary';
import { SEO } from './components/SEO';
import { ScrollToTop } from './components/ScrollToTop';

export default function App() {
  return (
    <ErrorBoundary>
      <HelmetProvider>
        <LanguageProvider>
          <AuthProvider>
            <SEO />
            <BrowserRouter>
              <ScrollToTop />
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/" element={<Layout />}>
                  <Route index element={<Home />} />
                  <Route path="assets" element={<Assets />} />
                  <Route path="assets/:id" element={<AssetDetails />} />
                  <Route path="dashboard" element={<Dashboard />} />
                  <Route path="list-onboarding" element={<ListOnboarding />} />
                  <Route path="booking" element={<Booking />} />
                  <Route path="profile" element={<Profile />} />
                  <Route path="settings" element={<Settings />} />
                </Route>
              </Routes>
            </BrowserRouter>
          </AuthProvider>
        </LanguageProvider>
      </HelmetProvider>
    </ErrorBoundary>
  );
}
