import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Dashboard from './components/dashboard/Dashboard';
import FormsGeneral from './components/forms/FormsGeneral';
import TablesSimple from './components/tables/TablesSimple';
import UIElements from './components/ui/UIElements';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import ProtectedRoute from './components/auth/ProtectedRoute';
import Profile from './components/profile/Profile';
import GetAllAgent from './components/agent/GetAllAgent';

function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Protected Routes */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Layout>
              <Dashboard />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/forms"
        element={
          <ProtectedRoute>
            <Layout>
              <FormsGeneral />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/tables"
        element={
          <ProtectedRoute>
            <Layout>
              <TablesSimple />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/ui"
        element={
          <ProtectedRoute>
            <Layout>
              <UIElements />
            </Layout>
          </ProtectedRoute>
        }
      />

      {/* profile */}
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Layout>
              <Profile />
            </Layout>
          </ProtectedRoute>
        }
      />

      {/* agent */}
      <Route
        path="/agent"
        element={<ProtectedRoute><Layout><GetAllAgent /></Layout></ProtectedRoute>}
      />
    </Routes>
  );
}

export default App;
