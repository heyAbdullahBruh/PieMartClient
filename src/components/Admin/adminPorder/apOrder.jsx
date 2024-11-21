import { useEffect, useState } from 'react';
import styles from './order.module.css';
import { useCart } from '@/components/cart/cartContext';
import { api } from '@/config/api';
import Link from 'next/link';
import LoadingPage from '@/components/loading/Loading';

const Orders = () => {
  const {token}=useCart();

  const [loading,setLoading]=useState(false);
  const [orderP,setOrderP]=useState([]);
  
  useEffect(()=>{
    setLoading(true);
    fetch(`${api}/order/adminOrderProduct`,{
      headers:{authorization:token}
    }).then(res=>res.json())
    .then((res)=>{
      if (res.success==true) {
        setOrderP(res?.orders);
        setLoading(false);
      }
    });
  },[token]);

  const handleAcceptOrder=async(id)=>{
    setLoading(true);
    await fetch(`${api}/order/update/${id}`,{
      method:'PATCH',
      headers:{
        authorization:token,
        'Content-Type':'application/json'
      },
      body:JSON.stringify({deliveryStatus:'shipped'})
    }).then(res=>res.json())
    .then((res)=>{
      if (res.success === true) {
        // Update the orderP array with the updated order
        setOrderP((prevOrders) =>
          prevOrders.map((order) =>
            order._id === id ? { ...order, deliveryStatus: 'shipped' } : order
          )
        );
      }
    }).finally(()=> setLoading(false));
  };

  // console.log(orderP);
  return (
    <div className={styles.container}>
      <h1>Orders from Other Users</h1>
      {
        loading ? <LoadingPage/>:
        <table className={styles.table}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Image</th>
                <th>Name</th>
                <th>Customer Phone</th>
                <th>Quantity</th>
                <th>Total Price</th>
                <th>Accept/Detail</th>
                <th>D. Status</th>
              </tr>
            </thead>
            <tbody>
              {orderP?.map((item,index) => (
                <tr key={item._id}>
                  <td>{index+1}</td>
                  <td><img src={item.productImg[0]?.photo} style={{maxWidth:'70px',maxHeight:'70px'}} alt={item.pName} /></td>
                  <td>{item.pName}</td>              
                  <td>{item.customerPhone}</td>
                  <td>{item.quantity}</td>
                  <td>{item.totalPrice}</td>
                  <td style={{textAlign:'center'}} >
                    {
                      item.deliveryStatus === 'pending'? <button onClick={()=>handleAcceptOrder(item._id)}>✔</button>:
                      <Link href={'#'}><button>🏠</button></Link>
                    }
                  </td>
                  <td>{item.deliveryStatus}</td>
                </tr>
              ))}
            </tbody>
        </table>
      }
    </div>
  );
};

export default Orders;
