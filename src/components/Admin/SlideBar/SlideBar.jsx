'use client';

import styles from './slidebar.module.css';

const Sidebar = ({ setActiveSection, activeSection }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'products', label: 'My Products' },
    { id: 'orders', label: 'User Orders' },
    { id: 'my-orders', label: 'My Orders' },
    { id: 'profile', label: 'Profile' },
  ];

  return (
    <div className={styles.sidebar}>
      <h2 className={styles.logo}>Admin Panel</h2>
      <nav>
        {menuItems.map((item) => (
          <button
            key={item.id}
            className={`${styles.menuItem} ${activeSection === item.id ? styles.active : ''}`}
            onClick={() => setActiveSection(item.id)}
          >
            {item.label}
          </button>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
