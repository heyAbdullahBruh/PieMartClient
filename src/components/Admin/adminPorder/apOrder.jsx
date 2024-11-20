import styles from './order.module.css';

const Orders = () => {
  const dummyOrders = [
    { id: 101, customer: 'John Doe', product: 'iPhone 14', amount: 999 },
    { id: 102, customer: 'Jane Smith', product: 'Sony Headphones', amount: 199 },
  ];

  return (
    <div className={styles.container}>
      <h1>Orders from Other Users</h1>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Customer</th>
            <th>Product</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {dummyOrders.map((order) => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.customer}</td>
              <td>{order.product}</td>
              <td>${order.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Orders;
