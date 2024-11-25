import React from 'react';
import Settings from '../../components/User/Settings';

const UserSettingsPage = ({userData, fetchUserData}) => {
  return (
    <div>
      <Settings userData={userData} fetchUserData={fetchUserData}/>
    </div>
  );
};

export default UserSettingsPage;
