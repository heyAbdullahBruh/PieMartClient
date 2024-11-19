'use client';

import { useState } from "react";
import { useOrder } from "../orderContext";
import styles from './orderP.module.css';
import { api } from "@/config/api";
import { useCart } from "@/components/cart/cartContext";
import Popup from "@/components/popup/popup";
import { useRouter } from "next/navigation";

const OrderTask = () => {
    const router =useRouter();
    const [popupMsg,setPopupmsg]=useState({
        type:true,
        message:'',
        trigger:false,
     });

 const {orderProduct}=useOrder();
 const {token}=useCart();

    const [COD,setCOD]=useState(false);
    const [shippingAddress,setShippingAddress]=useState('');

 const productQuantity = () => {
    return orderProduct.reduce((total, item) => {
      return total + item.quantity;
    }, 0);
  };
 const calcSubTotalPrc = () => {
    return orderProduct.reduce((total, item) => {
      return total + item.totalPrice;
    }, 0);
  };
  
  const vat = calcSubTotalPrc()/40;

  const totalPrice = calcSubTotalPrc() +vat;

  const handleOrderProcced=()=>{
    fetch(`${api}/order/create`,{
        method:'POST',
        headers:{
            authorization:token,
            'Content-Type': 'application/json',
        },
        body:JSON.stringify({
            items:orderProduct,
            shippingAddress,
            COD,
            totalAmount:totalPrice
        })
    }).then(res=>res.json())
    .then((res)=>{
        if (res.success===true) {
            setPopupmsg({message:res.message,trigger:true,type:true});
            console.log(res.order);
            router.replace('/');
        }
    }).catch((err)=>{
        setPopupmsg({message:err.message,trigger:true,type:false});
        console.log(err);
    });
    setTimeout(() => setPopupmsg({trigger:false}), 3000);
  };

// console.log(shippingAddress);
    return (
        <section>
          <div className={styles.orderPprcSec}>
            <table>
              <tbody>
                 <tr>
                      <td>Total Product:- </td>
                      <td>{productQuantity()} peices</td>
                 </tr>
                 <tr>
                      <td>Subtotal price:- </td>
                      <td>${calcSubTotalPrc().toFixed(2)} </td>
                 </tr>
                 <tr>
                      <td style={{borderBottom:" 1px solid #2af801"}}>Vat:- </td>
                      <td style={{borderBottom:" 1px solid #2af801"}}>${vat.toFixed(2)} </td>
                 </tr>
                 <tr>
                      <td style={{border:" 1px solid #2af801"}}>Total price:- </td>
                      <td style={{border:" 1px solid #2af801"}}>${totalPrice.toFixed(2)} </td>
                 </tr>
              </tbody>
            </table>
          </div>

          <div className={styles.userInp}>
            <textarea type="text" placeholder="Add your address where place your products" name="shippingAddress" onChange={(e)=>setShippingAddress(e.target.value)} />
            <div className={styles.deliveryType}>
                 <input type="checkbox" required defaultChecked={COD} style={{transform:'scale(1.7)',margin:'1rem',cursor:"pointer"}} onChange={()=> setCOD(!COD)} />  
                 <label htmlFor="COD">Cash On Delivery</label>
            </div>
            <div className={styles.proccedDelivery}>
                <button onClick={handleOrderProcced}>Confirm Order</button>
                {
                    COD?'':<button>Add Payment Method</button>
                }
            </div>
          </div>
                <Popup trigger={popupMsg.trigger} message={popupMsg.message} type={popupMsg.type}/>
        
        </section>
    );
};

export default OrderTask;