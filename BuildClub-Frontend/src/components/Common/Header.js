import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import UserCard from './UserCard';
import { useAuth } from '../../Routes/AuthContext';
import { useBreadcrumb } from './BreadcrumbContext';

const Header = ({ user }) => {
  const location = useLocation();
  const { motorName } = useBreadcrumb(); // Access motor name from context
  const [activeBreadcrumbs, setActiveBreadcrumbs] = useState([]);

  const navigate = useNavigate();
  const { logoff } = useAuth();

  const handleLogout = () => {
    console.log('User logged out');
    navigate('/Auth/login');
    logoff();
  };

  useEffect(() => {
    const currentPath = location.pathname;

    // Start with an empty breadcrumb list
    let breadcrumbs = [];

    // Add "Motor Log" only if we're not on specific paths like /user/motor-wiz, /user/motor-wiz-output, and /user/loading
    if (
      !currentPath.includes('/user/loading') &&
      !currentPath.includes('/user/feedback') &&
      !currentPath.includes('/user/settings')
    ) {
      breadcrumbs.push({ title: 'Motor Log', path: '/user/motor-log' });
    }
    
    // Add specific breadcrumbs for 'Feedback' and 'Settings' paths
    if (currentPath.includes('/user/feedback')) {
      breadcrumbs.push({ title: 'Feedback', path: '/user/feedback' });
    } else if (currentPath.includes('/user/settings')) {
      breadcrumbs.push({ title: 'Settings', path: '/user/settings' });
    }
    // Add motor name if available and we're on motor-wiz or motor-wiz-output pages
    if (motorName && (currentPath.includes('/user/motor-wiz') || currentPath.includes('/user/motor-wiz-output'))) {
      breadcrumbs.push({ title: motorName, path: currentPath });
    }

    // Add Motor Wiz and Motor Wiz Output based on the current path
    if (currentPath.includes('/user/motor-wiz')) {
      breadcrumbs.push({ title: 'Motor Wiz', path: '/user/motor-wiz' });
    }
    if (currentPath.includes('/user/motor-wiz-output')) {
      breadcrumbs.push({ title: 'Motor Wiz Output', path: '/user/motor-wiz-output' });
    }

    // Set the final breadcrumbs state
    setActiveBreadcrumbs(breadcrumbs);
  }, [location.pathname, motorName]);

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px', fontFamily: 'Poppins' }}>
      <div style={{ fontWeight: '500', color: '#0069bd' }}>
        {activeBreadcrumbs.map((breadcrumb, index) => (
          <React.Fragment key={index}>
            <Link 
              to={breadcrumb.path}
              style={{
                textDecoration: 'none',
                color: location.pathname === breadcrumb.path ? '#222222' : '#0069bd',
                fontWeight: '500',
                fontSize: 'clamp(11.37px, 1.111vw, 20.62px)'
              }}
            >
              {breadcrumb.title}
            </Link>
            {index < activeBreadcrumbs.length - 1 && (
              <span 
                style={{
                  color: location.pathname === breadcrumb.path ? '#222222' : '#0069bd',
                  margin: '0 8px'
                }}
              >
                {' > '}
              </span>
            )}
          </React.Fragment>
        ))}
      </div>
      <div>
        <UserCard
          username={user.username}
          email={user.email}
          avatar={user.avatar}
          onLogout={handleLogout}
        />
      </div>
    </div>
  );
};

export default Header;
