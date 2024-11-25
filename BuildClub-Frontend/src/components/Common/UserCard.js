import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './UserCard.module.css';
import { Tooltip } from '@mui/material';
import { ReactComponent as LogoutIcon } from "../../assets/images/icons/logoutIcon.svg";
import {
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CButton,
} from "@coreui/react-pro";
import LogoutIconImage from '../../assets/images/icons/lastLoginIcon_subscreen.svg';

const UserCard = ({ username, email, avatar, onLogout }) => {
  const [logoutConfirmModal, setLogoutConfirmModal] = useState(false);
  const navigate = useNavigate(); // useNavigate hook for navigation

  const getCurrentDateTime = () => {
    const now = new Date();
    const date = now.toLocaleDateString(); 
    const time = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }); // Formats to 'HH:MM AM/PM' by default
    return `${date}, ${time}`;
  };

  const lastLoggedIn = getCurrentDateTime();

  const handleLogoutClick = () => {
    setLogoutConfirmModal(true);
  };

  const handleLogoutConfirm = () => {
    console.log("User confirmed logout"); 
    if (onLogout) {
      onLogout(); 
       navigate('/user/login'); 
      setLogoutConfirmModal(false); // Close the modal
     
    } else {
      console.error('onLogout function is not defined'); 
    }
  };

  return (
    <div className={styles.userCard}>
      <div className={styles.userInfo}>
        <div className={styles.avatar}>
          <img src={avatar} alt="avatar" />
        </div>
        <div className={styles.userDetails}>
          <div className={styles.userName}>{username}</div>
          <div className={styles.userEmail}>{email}</div>
        </div>
      </div>
      <Tooltip title="Logout" placement="bottom" >
        <div className={styles.powerButton} onClick={handleLogoutClick}>
      
          <LogoutIcon style={{ height: '1.758vh', width: '1.111vw' }} />
        </div>
      </Tooltip>

      

      <CModal
        visible={logoutConfirmModal}
        onClose={() => setLogoutConfirmModal(false)}
        className="modal-center"
      >
        <CModalHeader closeButton>
          <img src={LogoutIconImage} alt="Logout Icon" />
          
          <CModalTitle>Logout</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <p>Are you sure you want to logout?</p>
        </CModalBody>
        <CModalFooter className="modal-footer-common-buttons">
          <CButton id="close" onClick={() => setLogoutConfirmModal(false)}>Cancel</CButton>
          <CButton id="submit" onClick={onLogout}>Confirm</CButton>
        </CModalFooter>
      </CModal>
    </div>
  );
};

export default UserCard;
