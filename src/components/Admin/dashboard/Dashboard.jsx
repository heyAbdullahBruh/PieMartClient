import { useCart } from "@/components/cart/cartContext";
import { api } from "@/config/api";
import { useEffect, useState } from "react";
import styles from './db.module.css';


const Dashboard = ({id}) => {

  const [orderItems,setOrderItems] =useState([]); 
  const [adminProds,setAdminProds] =useState([]); 

  const {cart ,token}=useCart();

  // get admin products
    useEffect(()=>{
      fetch(`${api}/product/vendor/${id}`).then(res=>res.json())
      .then((res)=>{
        if (res.success==true) {
          setAdminProds(res.products);
        }
      });
    },[id]);

    // get admin's personal order 
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


console.log({adminProds,orderItems});




    return (
      <section className={styles.dbSec}>
        <h1>Welcome to the Dashboard</h1>

          <div className={styles.dashCard}>
                <div className={styles.card} style={{background:'linear-gradient( #e010e0 , #940394 )'}}>
                  <h3>{adminProds.length} Pieces</h3>
                  <p>Adding prodcuts</p>
                </div>
                <div className={styles.card} style={{background:'linear-gradient( #3610e0 , #2a07c5 )'}}>
                  <h3>{orderItems.length} orders</h3>
                  <p>Personnaly ordered products</p>
                </div>
                <div className={styles.card} style={{background:'linear-gradient( #10b6e0 , #0381a0 )'}}>
                  <h3>{cart.length} items</h3>
                  <p>Added in Cart</p>
                </div>
                <div className={styles.card} style={{background:'linear-gradient( #10e089 , #03a561 )'}}>
                  <h3>0 product</h3>
                  <p>Ordered your product</p>
                </div>
          </div>




      </section>
    );
  };
  
  export default Dashboard;
  