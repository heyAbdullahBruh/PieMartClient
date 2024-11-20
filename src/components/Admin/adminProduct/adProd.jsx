import styles from './ap.module.css';

const Products = () => {
  const dummyProducts = [
    { id: 1, name: 'iPhone 14', price: 999, stock: 50 },
    { id: 2, name: 'Samsung Galaxy S23', price: 899, stock: 30 },
    { id: 3, name: 'Sony Headphones', price: 199, stock: 120 },
  ];

  return (
    <div className={styles.container}>
      <h1>My Products</h1>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Price</th>
            <th>Stock</th>
          </tr>
        </thead>
        <tbody>
          {dummyProducts.map((product) => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.name}</td>
              <td>${product.price}</td>
              <td>{product.stock}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Products;
