import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import BottomNav from './components/nav/BottomNav';

const MainLayout = () => {
  const location = useLocation();
  // Paths where BottomNav will not appear.
  const noNavPaths = ['/login', '/register', '/'];

  const shouldShowNav = !noNavPaths.includes(location.pathname);

  return (
    <>
      {shouldShowNav && <BottomNav />}
      <Outlet />
    </>
  );
};

export default MainLayout;
