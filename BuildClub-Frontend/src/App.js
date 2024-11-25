// src/App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider } from '../src/Routes/AuthContext';
import ProtectedRoute from '../src/Routes/ProtectedRoute';

import { BreadcrumbProvider } from '../src/components/Common/BreadcrumbContext';


import Sidebar from './components/Common/Sidebar';
import UserHomePage from './pages/User/UserHomePage';
import UserFeedbackPage from './pages/User/UserFeedbackPage';
import UserSettingsPage from './pages/User/UserSettingsPage';
import VehicleDynamicsPage from './pages/User/VehicleDynamicsPage';
import MotorLogPage from './pages/User/MotorLogPage';
import MotorWizPageOutput from './pages/User/MotorWizPageOutput';
import styles from './App.module.css';
import Header from './components/Common/Header';
import MotorWizComponent from './pages/User/MotorWizComponent';
import Login from './pages/Auth/Login';
import SignUp from './pages/Auth/SignUp';
import EmailVerifyOtp from './pages/Auth/EmailVerifyOtp';
import ForgotPasswordPage  from './pages/Auth/ForgotPasswordPage';
import OtpPage  from './pages/Auth/ForgotPassOtp';
import Reset  from './pages/Auth/Reset';
import ResetDone  from './pages/Auth/ResetDone';
import base_url from './services/api';
import LoadingGif from './components/Common/MotorWizOutput/LoadingGif';
import TorqueSpeed from './components/Common/VehicleDynamicsOutput/TorqueSpeed';
import VeichleDynamicsOutputpage from './pages/User/VeichleDynamicsOutputpage';

const RouteHandler = ({ setActiveStep, setActiveStepNEV, setTypeOfApplication }) => {
  const location = useLocation();

  useEffect(() => {

    if (location.pathname === '/user/home') {
      setActiveStep(0);
      setActiveStepNEV(0);
      setTypeOfApplication('');
    }
  }, [location.pathname, setActiveStep, setActiveStepNEV, setTypeOfApplication]);

  return null;
};

const App = () => {
  const [userData, setUserData] = useState({
    username: '',
    email: '',
    avatar: ''
  });

  const [activeStep, setActiveStep] = useState(0);
  const [activeStepNEV, setActiveStepNEV] = useState(0);
  const [typeOfApplication, setTypeOfApplication] = useState(''); 
  console.log("Type Of Application: ", typeOfApplication);
 

  const fetchUserData = () => {
    const userId = sessionStorage.getItem('user_id'); 
    console.log("Fetched user ID:", userId);
    if (!userId) {
        console.error("User ID not found in session storage.");
        return;
    }
    fetch(base_url + "/get_userdata", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_id: userId })
    })
    .then(response => response.json())
    .then(data => {
      console.log("Response from get_userdata:", data);
        if (data.error === "none") {
            setUserData({
                username: data.user_data.user_name,
                email: data.user_data.email,
                avatar: data.user_data.avatar || 'https://cdn-icons-png.flaticon.com/128/3177/3177440.png'
            });
        } else {
            console.error("Error fetching user data:", data.error);
        }
    })
    .catch(error => console.error('Error:', error));
};
  useEffect(() => {
    fetchUserData(); 
  }, []);



  return (
    <AuthProvider>
      <Router>
        <RouteHandler setActiveStep={setActiveStep} setActiveStepNEV={setActiveStepNEV} setTypeOfApplication={setTypeOfApplication} />

        <Routes>
          <Route path="/" element={<Navigate to="/Auth/login" />} />
          <Route path="/Auth/login" element={<Login  userData={userData} fetchUserData={fetchUserData}/>} />
          <Route path="/Auth/signup" element={<SignUp />} />
          <Route path="/Auth/Emailotp" element={<EmailVerifyOtp />} />
          <Route path="/Auth/forget-password" element={<ForgotPasswordPage />} />
          <Route path="/Auth/otp" element={<OtpPage />} />
          <Route path="/Auth/reset" element={<Reset />} />
          <Route path="/Auth/resetdone" element={<ResetDone />} />

          <Route 
            path="/*" 
            element={
              <div className={styles.appContainer}>
                <Sidebar 
                  activeStep={activeStep} 
                  setActiveStep={setActiveStep} 
                  activeStepNEV={activeStepNEV} 
                  setActiveStepNEV={setActiveStepNEV} 
                  typeOfApplication={typeOfApplication} 
                />
                <div className={styles.mainContent}>
                <BreadcrumbProvider>
                  <Header user={userData} />
                  <Routes>
                    <Route path="/user/home" element={<ProtectedRoute element={<UserHomePage />} />} />
                    <Route path="/user/feedback" element={<ProtectedRoute element={<UserFeedbackPage />} />} />
                    <Route path="/user/settings" element={<ProtectedRoute element={<UserSettingsPage userData={userData} fetchUserData={fetchUserData} />} />} />
                    <Route path="/user/application" element={<ProtectedRoute element={<MotorLogPage setActiveStep={setActiveStep} />} />} />
                    <Route path="/user/vehicle-dynamics/:id" element={<ProtectedRoute element={<VehicleDynamicsPage />} />} />
                
                    <Route path="/user/vehicle-dynamics-output" element={<ProtectedRoute element={<VeichleDynamicsOutputpage/>} />} />
                    <Route path="/user/motor-log" element={<ProtectedRoute element={<MotorLogPage setActiveStep={setActiveStep} />} />} />
                    <Route path="/user/motor-wiz" element={<ProtectedRoute element={<MotorWizComponent />} />} />
                    <Route path="/user/loading" element={<ProtectedRoute element={<LoadingGif />} />} />
                    <Route path="/user/motor-wiz-output" element={<ProtectedRoute element={<MotorWizPageOutput />} />} />
                  </Routes>
                  </BreadcrumbProvider>
                </div>
              </div>
            } 
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
