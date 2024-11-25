import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import styles from './Sidebar.module.css'; // Import CSS module
import logo from "../../assets/images/mmLogo.svg";
import { ReactComponent as HomeIcon } from "../../assets/images/icons/homeIcon.svg";
import { ReactComponent as UserManagementIcon } from "../../assets/images/icons/userManagementIcon.svg";
import { ReactComponent as SettingsIcon } from "../../assets/images/icons/settingsIcon.svg";
import NonEVVerticalLinearStepper from './VerticalLinearStepper';

const Sidebar = ({ loadinggif,activeStep, setActiveStep, activeStepNEV, setActiveStepNEV }) => {
  const location = useLocation();
  const isHomePage = location.pathname === '/user/home';
  const isMotorPage = 
    location.pathname === '/user/motor-log' || 
    location.pathname === '/user/motor-wiz' || 
    location.pathname === '/user/loading' || 
    location.pathname === '/user/motor-wiz-output'; 
  const isApplicationPage = location.pathname === '/user/application'; 
  const isFeedbackPage = location.pathname === '/user/feedback';
  const isSettingsPage = location.pathname === '/user/settings';


  const isHomeActive = !isFeedbackPage && !isSettingsPage && (isMotorPage || isApplicationPage);
  const isLoading = location.pathname === '/user/loading';
  return (
    <div className={styles.sidebar} 
    style={{
     
      pointerEvents: isLoading ? 'none' : 'auto', // Disable interactions when loadingGif is true
    }}
    >
      <div className={styles.sidebarHeader}>
        <img src={logo} alt="Logo" className={styles.logo} /> {/* Update with your logo path */}
      </div>
      <ul className={styles.sidebarMenu}>
        <li className={styles.sidebarMenuItem}>
          <NavLink
            to="/user/motor-log" 
            className={({ isActive }) => (isActive || isHomeActive ? styles.active : styles.sidebarMenuLink)}
            onClick={() => setActiveStepNEV(0)} // Reset to first step when navigating to Motor Log
          >
            <HomeIcon style={{height: '2.734vh', width: '1.944vw'}} /> {'\u00A0'} {'\u00A0'} {'\u00A0'} Home
          </NavLink>
          {(isMotorPage || isApplicationPage) && ( // Updated condition to include application page
            <NonEVVerticalLinearStepper activeStepNEV={activeStepNEV} setActiveStepNEV={setActiveStepNEV} />
          )}
        </li>

        <li className={styles.sidebarMenuItem}>
          <NavLink
            to="/user/feedback"
            className={({ isActive }) => (isActive ? styles.active : styles.sidebarMenuLink)}
            onClick={() => {
              setActiveStepNEV(-1); // Reset active step on feedback click
            }}
          >
            <UserManagementIcon style={{height: '2.734vh', width: '1.944vw'}}/> {'\u00A0'} {'\u00A0'} {'\u00A0'} Feedback
          </NavLink>
        </li>
        <li className={styles.sidebarMenuItem}>
          <NavLink
            to="/user/settings"
            className={({ isActive }) => (isActive ? styles.active : styles.sidebarMenuLink)}
            onClick={() => {
              setActiveStepNEV(-1); // Reset active step on settings click
            }}
          >
            <SettingsIcon style={{height: '2.734vh', width: '1.944vw'}} /> {'\u00A0'} {'\u00A0'} {'\u00A0'} Settings
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
