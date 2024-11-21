import { useOrder } from '@/components/order/orderContext';
import styles from './profle.module.css';
import Image from 'next/image';

const Profile = () => {
  const {user}=useOrder();
  const {name,mail,profile}=user;
  return (
    <div className={styles.container}>
      <h1>Profile</h1>
      <div className={styles.userInfo}>
         <div className={styles.userInfoSec}>
             <Image src={profile?profile:'https://i.postimg.cc/T3kNzYSD/user.jpg'} alt={name} width={150} height={150} />
             <p>{name}</p>
             <strong>{mail}</strong>
         </div>
       </div>
       <button>Eidt</button>
    </div>
  );
};

export default Profile;
