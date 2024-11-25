import React, { useState, useEffect } from 'react';
import CryptoJS from 'crypto-js';
import { TextField, Button, IconButton, InputAdornment } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import './Settings.css';
import editIcon from '../../assets/images/icons/edit.svg'; 
import profileImage from '../../assets/images/icons/profile.svg';
import editprofile from '../../assets/images/icons/editprofile.svg';
import PasswordUpdationIcon from '../../assets/images/icons/PasswordUpdationIcon.svg';
import ProfileUpdationIcon from '../../assets/images/icons/ProfileUpdationIcon.svg';
import { CModal, CModalHeader, CModalTitle, CModalBody, CModalFooter } from '@coreui/react';
// import MainComponent from '../MainComponent';
import base_url from '../../services/api';


const validatePassword = (password) => {
  const minLength = 8;
  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasNumber = /\d/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  return password.length >= minLength && hasUppercase && hasLowercase && hasNumber && hasSpecialChar;
};

const Settings = ({userData, fetchUserData}) => {
  const userId = sessionStorage.getItem('user_id');
  const [activeTab, setActiveTab] = useState('General');
  const [isEditing, setIsEditing] = useState(false);
  const [userName, setUserName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [profileImageSrc, setProfileImageSrc] = useState(profileImage);
  const [createVersionConfirmModal, setCreateVersionConfirmModal] = useState(false);
  const [successModal, setSuccessModal] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const [isFormFilled, setIsFormFilled] = useState(false);

  const [loading, setLoading] = useState(false);
  useEffect(() => {

    const currentUser = userData;

    if (currentUser) {
      setUserName(currentUser.username);
      setEmail(currentUser.email);
    }
    const nameParts = userName.split(' ');
    const storedFirstName = nameParts[0]; 
    const storedLastName = nameParts[1] || ''; 

    setFirstName(storedFirstName);
    setLastName(storedLastName);
  }, [userName, userData])
  useEffect(() => {
    setIsFormFilled(
      firstName.trim() !== '' && email.trim() !== ''
    );
  }, [firstName, email]);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const updateProfileData = async () => {

    if (!firstName || !lastName || !email) {
        console.error('One or more form elements are missing.');
        alert('Error: Form elements are missing. Please check the form.');
        return;
    }
    setLoading(true);
    const userName = `${firstName} ${lastName}`; 

    const profileData = {
      user_name: userName,
      email: email
    };

    fetch(base_url + "/update_profile", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_id: userId, ...profileData })
    })
    .then(response => response.json())
    .then(data => {
        if (data.error === "none") {
        fetchUserData();

        } else {
            alert("Error updaing profile: " + data.error);
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Error updating profile');
    }
  )
  .finally(() => {
    setLoading(false); 
  });
    
};


const handleSaveClick = () => {
  if (!userId) {
    alert("User ID is required.");
    return;
}
  updateProfileData();
  
  setIsEditing(true);
};
  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };
  const hashPassword = (password) => {
    return CryptoJS.SHA256(password).toString();
};


const handlePasswordSaveClick = async () => {
  if (newPassword !== confirmPassword) {
      alert("New passwords do not match.");
      return;
  }

  if (!validatePassword(newPassword)) {
      alert("New password must contain at least one uppercase letter, one lowercase letter, one digit, one special character, and be at least 8 characters long.");
      return;
  }

  if (!userId) {
      alert('Error: User ID is missing. Please log in again.');
      return;
  }

  const currentPasswordHash = hashPassword(currentPassword);
  const newPasswordHash = hashPassword(newPassword);

  const data = {
      user_id: userId,
      current_password: currentPasswordHash,
      new_password: newPasswordHash
  };

  try {
      const response = await fetch(base_url + "/change_password", {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
      });

      const responseData = await response.json();

      if (response.ok) {
          if (responseData.error === "none") {
              alert("Password changed successfully");
          } else {
              alert("Error changing password: " + responseData.error);
          }
      } else {
          throw new Error(responseData.error);
      }
  } catch (error) {
      console.error('Error:', error);
      alert(error.message || "Error changing password");
  }
};

  const handleClose = () => {
    setCreateVersionConfirmModal(false);
    setSuccessModal(false);
    setIsEditing(false); // Enable editing again after modal close
  };

  const togglePasswordVisibility = (field) => {
    if (field === 'current') {
      setShowCurrentPassword(!showCurrentPassword);
    } else if (field === 'new') {
      setShowNewPassword(!showNewPassword);
    } else if (field === 'confirm') {
      setShowConfirmPassword(!showConfirmPassword);
    }
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImageSrc(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="settings-container">
      <div className="tabs">
        <div
          className={`tab ${activeTab === 'General' ? 'active' : ''}`}
          onClick={() => handleTabClick('General')}
        >
          General
        </div>
        <div
          className={`tab ${activeTab === 'Security' ? 'active' : ''}`}
          onClick={() => handleTabClick('Security')}
        >
          Security
        </div>
      </div>
      {activeTab === 'General' && (
        <div className="profile-settings">
          <h4 className='settings-h'>Profile settings</h4>
          <div className="profile-pic">
            <img src={profileImageSrc} alt="Profile" />
            {isEditing && (
              <>
                <img
                  src={editprofile}
                  alt="upload_button"
                  className="upload_button"
                  onClick={() => document.getElementById('fileInput').click()}
                />
                <input
                  type="file"
                  id="fileInput"
                  style={{ display: 'none' }}
                  accept="image/*"
                  onChange={handleImageUpload}
                />
              </>
            )}
          </div>
          <div className="form">
            <div className="form-group">
              <TextField className='settingsinput'
                label="First name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                disabled={!isEditing}
                fullWidth
                variant="outlined"
                margin="normal"
                required
                InputLabelProps={{
                  style: { color: '#0069BD', fontSize: '16px', fontWeight: 500 },
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '8px',
                  },
                }}
              />
            </div>
            <div className="form-group">
              <TextField className='settingsinput'
                label="Last name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                disabled={!isEditing}
                fullWidth
                variant="outlined"
                margin="normal"
                InputLabelProps={{
                  style: { color: '#0069BD', fontSize: '16px', fontWeight: 500 },
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '8px',
                  },
                }}
              />
            </div>
            <div className="form-group">
              <TextField className='settingsinput'
                label="Email ID"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={!isEditing}
                fullWidth
                variant="outlined"
                margin="normal"
                required
                InputLabelProps={{
                  style: { color: '#0069BD', fontSize: '16px', fontWeight: 500 },
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '8px',
                  },
                }}
              />
            </div>
          </div>
          <div className="button-group">
            <Button
              variant="contained"
              color="primary"
              onClick={handleEditClick}
              disabled={isEditing || !isFormFilled}
              className="edit-button"
              endIcon={<img src={editIcon} alt="Edit Icon" className="edit-icon1" />}
            >
              Edit
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSaveClick}
              disabled={!isFormFilled || !isEditing}
              className="submit-button"
            >
              Submit
            </Button>
          </div>
          <CModal
            visible={createVersionConfirmModal}
            onClose={handleClose}
            className="modal-center"
          >
            <CModalHeader closeButton>
              <img src={ProfileUpdationIcon} alt="Update Icon" />
              <CModalTitle>Profile Updated</CModalTitle>
            </CModalHeader>
            <CModalBody>Your profile has been successfully updated!</CModalBody>
            <CModalFooter>
              <Button onClick={handleClose}>OK</Button>
            </CModalFooter>
          </CModal>
        </div>
      )}
      {activeTab === 'Security' && (
        <div className="security-settings">
          <h4 className='settings-h'>Password settings</h4>
          <div className="form">
            <div className="form-group">
              <TextField
                className='settingsinput'
                label="Current Password"
                type={showCurrentPassword ? 'text' : 'password'}
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                fullWidth
                variant="outlined"
                margin="normal"
                InputLabelProps={{
                  style: { color: '#0069BD', fontSize: '16px', fontWeight: 500 },
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '8px',
                  },
                }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => togglePasswordVisibility('current')}>
                        {showCurrentPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </div>
            <div className="form-group">
              <TextField
                className='settingsinput'
                label="New Password"
                type={showNewPassword ? 'text' : 'password'}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                fullWidth
                variant="outlined"
                margin="normal"
                InputLabelProps={{
                  style: { color: '#0069BD', fontSize: '16px', fontWeight: 500 },
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '8px',
                  },
                }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => togglePasswordVisibility('new')}>
                        {showNewPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              {passwordError && <span className="error">{passwordError}</span>}
            </div>
            <div className="form-group">
              <TextField
                className='settingsinput'
                label="Confirm New Password"
                type={showConfirmPassword ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                fullWidth
                variant="outlined"
                margin="normal"
                InputLabelProps={{
                  style: { color: '#0069BD', fontSize: '16px', fontWeight: 500 },
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '8px',
                  },
                }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => togglePasswordVisibility('confirm')}>
                        {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </div>
            <div className="button-group">
              <Button
                variant="contained"
                color="primary"
                onClick={handlePasswordSaveClick}
                className="submit-button"
              >
                Save
              </Button>
            </div>
          </div>
          <CModal
            visible={successModal}
            onClose={handleClose}
            className="modal-center"
          >
            <CModalHeader closeButton>
              <img src={PasswordUpdationIcon} alt="Update Icon" />
              <CModalTitle>Password Updated</CModalTitle>
            </CModalHeader>
            <CModalBody>Your password has been successfully updated!</CModalBody>
            <CModalFooter>
              <Button onClick={handleClose}>OK</Button>
            </CModalFooter>
          </CModal>
        </div>
      )}
    </div>
  );
};

export default Settings;
