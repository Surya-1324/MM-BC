// src/routes.js
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import AdminHomePage from './pages/Admin/AdminHomePage';
import UserManagementPage from './pages/Admin/UserManagementPage';
import ReportPage from './pages/Admin/ReportPage';
import AdminSettingsPage from './pages/Admin/AdminSettingsPage';
import UserDashboard from './pages/User/UserDashboard';
import LoginPage from './pages/Auth/LoginPage';
import RegisterPage from './pages/Auth/RegisterPage';
import ForgotPasswordPage from './pages/Auth/ForgotPasswordPage';

const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route path="/admin/home" component={AdminHomePage} />
        <Route path="/admin/user-management" component={UserManagementPage} />
        <Route path="/admin/reports" component={ReportPage} />
        <Route path="/admin/settings" component={AdminSettingsPage} />
        <Route path="/user" component={UserDashboard} />
        <Route path="/login" component={LoginPage} />
        <Route path="/register" component={RegisterPage} />
        <Route path="/forgot-password" component={ForgotPasswordPage} />
        {/* Add other routes as needed */}
      </Switch>
    </Router>
  );
};

export default Routes;
