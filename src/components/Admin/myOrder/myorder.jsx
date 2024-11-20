import styles from './myor.module.css';

const MyOrders = () => {
  const myOrders = [
    { id: 201, product: 'MacBook Pro', amount: 1299, status: 'Delivered' },
    { id: 202, product: 'iPad Pro', amount: 799, status: 'Processing' },
  ];

  return (
    <div className={styles.container}>
      <h1>My Orders</h1>
      <ul className={styles.orderList}>
        {myOrders.map((order) => (
          <li key={order.id}>
            <p>
              <strong>{order.product}</strong> - ${order.amount}
            </p>
            <p>Status: {order.status}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MyOrders;
