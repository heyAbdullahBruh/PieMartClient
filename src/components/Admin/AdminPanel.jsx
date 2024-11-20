'use client';

import { useState } from 'react';
import styles from './adminPanel.module.css';
import Sidebar from './SlideBar/SlideBar';
import Dashboard from './dashboard/Dashboard';
import Products from './adminProduct/adProd';
import Orders from './adminPorder/apOrder';
import MyOrders from './myOrder/myorder';
import Profile from './profile/profile';

const AdminPanel = () => {
  const [activeSection, setActiveSection] = useState('dashboard');

  const renderSection = () => {
    switch (activeSection) {
      case 'dashboard':
        return <Dashboard />;
      case 'products':
        return <Products />;
      case 'orders':
        return <Orders />;
      case 'my-orders':
        return <MyOrders />;
      case 'profile':
        return <Profile />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className={styles.container}>
      {/* Sidebar */}
      <Sidebar 
        setActiveSection={setActiveSection} 
        activeSection={activeSection} 
      />

      {/* Main Content */}
      <div className={styles.content}>
        {/* Render the active section */}
        {renderSection()}
      </div>
    </div>
  );
};

export default AdminPanel;
