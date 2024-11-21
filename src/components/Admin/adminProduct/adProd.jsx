import Link from 'next/link';
import styles from './ap.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import { api } from '@/config/api';

const Products = ({id}) => {

  const [adminProds,setAdminProds] =useState([]); 

  useEffect(()=>{
    fetch(`${api}/product/vendor/${id}`).then(res=>res.json())
    .then((res)=>{
      if (res.success==true) {
        setAdminProds(res.products);
      }
    });
  },[id]);

  return (
    <div className={styles.container}>
      <h1>My Products</h1>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Image</th>
            <th>Name</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Details</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          {adminProds.map((product,index) => (
            <tr key={product._id}>
              <td>{index+1}</td>
              <td><img src={product.pImgs[0]?.photo} style={{maxWidth:'70px',maxHeight:'70px'}} alt={product.pName} /></td>
              <td>{product.pName}</td>
              <td>${product.price}</td>
              <td>{product.stock}</td>
              <td><Link href={`/product/details/${product._id}`} style={{color:'white'}}>Show more</Link></td>
              <td><Link href={`/product/update/${product._id}`} style={{color:'white'}}><FontAwesomeIcon icon={faPencil}/></Link></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Products;
