import { useCart } from '@/components/cart/cartContext';
import styles from './myor.module.css';
import { useEffect, useState } from 'react';
import { api } from '@/config/api';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import LoadingPage from '@/components/loading/Loading';

const MyOrders = () => {
  const {token}=useCart();
  const [loading,setLoading]=useState(false);

  const [orderItems,setOrderItems] =useState([]); 

  useEffect(()=>{
    fetch(`${api}/order/userorder`,{
      headers:{authorization:token}
    }).then(res=>res.json())
    .then((res)=>{
      if (res.success==true) {
        setOrderItems(res?.order);
      }
    });
  },[token]);

  const handleCencelOrder=async(id)=>{
    setLoading(true);
    await fetch(`${api}/order/cencle/${id}`,{
      method:'DELETE',
      headers:{authorization:token}
    }).then(res=>res.json())
    .then((res)=>{
      if (res.success==true) {
        setLoading(false);
        setOrderItems(orderItems.filter((item)=>item._id!==id));
      }
    });
  };


  return (
    <div className={styles.container}>
      <h1>My Orders</h1>
      {
        loading ? <LoadingPage/> :
        <table className={styles.table}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Image</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total Price</th>
              <th>Details</th>
              <th>D. Status</th>
              <th>Cencel</th>
            </tr>
          </thead>
          <tbody>
            {orderItems?.map((item,index) => (
              <tr key={item._id}>
                <td>{index+1}</td>
                <td><img src={item.productImg[0]?.photo} style={{maxWidth:'70px',maxHeight:'70px'}} alt={item.pName} /></td>
                <td>{item.pName}</td>              
                <td>${item.price}</td>
                <td>{item.quantity}</td>
                <td>{item.totalPrice}</td>
                <td><Link href={`/product/details/${item.productId}`} style={{color:'white'}}>Show more</Link></td>
                <td>{item.deliveryStatus}</td>
                {
                  item.deliveryStatus==='pending'&&
                  <td><button onClick={()=>handleCencelOrder(item._id)}><FontAwesomeIcon icon={faXmark}/></button></td>
                }
              </tr>
            ))}
          </tbody>
        </table>
      }
    </div>
  );
};

export default MyOrders;
