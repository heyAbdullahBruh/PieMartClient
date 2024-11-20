import styles from './profle.module.css';

const Profile = () => {
  const adminProfile = {
    name: 'Admin User',
    email: 'admin@example.com',
    role: 'Administrator',
  };

  return (
    <div className={styles.container}>
      <h1>Profile</h1>
      <div className={styles.profileCard}>
        <p><strong>Name:</strong> {adminProfile.name}</p>
        <p><strong>Email:</strong> {adminProfile.email}</p>
        <p><strong>Role:</strong> {adminProfile.role}</p>
      </div>
    </div>
  );
};

export default Profile;
