import { useEffect, useState } from "react";
import styles from "./cartPI.module.css";
import { api } from "@/config/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { useOrder } from "@/components/order/orderContext";
import { useRouter } from "next/navigation";

const CartPItem = ({ cartProd, token, getCartPId }) => {
  const router =useRouter();
  const updateQuantity = async (productId, quantity) => {
    try {
      await fetch(`${api}/cart/quantity/${productId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json", authorization: token },
        body: JSON.stringify({ quantity }),
      });
    } catch (error) {
      console.error("Failed to update quantity:", error);
    }
  };

  const {orderProduct,setOrderProduct}=useOrder();

  const handleOrderCheak=(productId)=>{
    setIsOrder((prevResult) => {
      const updateOrderResult = {
        ...prevResult,
        [productId]: !prevResult[productId],
      };
      return updateOrderResult;
    });
  };

  const [isOrder, setIsOrder] = useState(() => {
    const order = localStorage.getItem("isOrder");
    if (order) {
      return JSON.parse(order);
    }
    return {};
  });

 // Initialize Order from cartProd if necessary
 useEffect(() => {
  if (cartProd?.length > 0) {
    const initialOrder = cartProd.reduce((acc, item) => {
      acc[item.productId] = true;
      return acc;
    }, {});
    setIsOrder(initialOrder);
  }
}, [cartProd]);

  const [quantities, setQuantities] = useState(() => {
    const savedQuantities = localStorage.getItem("cartQuantities");
    if (savedQuantities) {
      return JSON.parse(savedQuantities);
    }
    return {};
  });


  // Initialize quantities from cartProd if necessary
  useEffect(() => {
    if (cartProd?.length > 0) {
      const initialQuantities = cartProd.reduce((acc, item) => {
        acc[item.productId] = item.quantity || 1;
        return acc;
      }, {});
      setQuantities(initialQuantities);
    }
  }, [cartProd]);


  // Sync quantities to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("cartQuantities", JSON.stringify(quantities));
    localStorage.setItem("isOrder", JSON.stringify(isOrder));
  }, [quantities,isOrder]);

  const increaseQuantity = (productId) => {
    setQuantities((prevQuantities) => {
      const updatedQuantities = {
        ...prevQuantities,
        [productId]: prevQuantities[productId] + 1,
      };
      updateQuantity(productId, updatedQuantities[productId]); // Use the updated quantity
      return updatedQuantities;
    });
  };

  const decreaseQuantity = (productId) => {
    setQuantities((prevQuantities) => {
      const updatedQuantities = {
        ...prevQuantities,
        [productId]: Math.max(1, prevQuantities[productId] - 1),
      };
      updateQuantity(productId, updatedQuantities[productId]); // Use the updated quantity
      return updatedQuantities;
    });
  };

  const calcSubTotalPrc = () => {
    return cartProd.reduce((total, item) => {
      const quantity =isOrder[item.productId]? quantities[item.productId] : 0; // Get quantity from state or fallback to initial quantity
      return total + item.price * quantity;
    }, 0);
  };
  
  const vat = calcSubTotalPrc()/40;

  const totalPrice = calcSubTotalPrc() +vat;

  useEffect(()=>{
    const filterOrderProduct = cartProd?.filter((product)=>{
      if (isOrder[product.productId]===true) {
        return product;
      }
    });
    setOrderProduct(filterOrderProduct);
  },[isOrder])

  
  return (
    <>

        <section className={styles.cartSec}>

          <section className={styles.cartPsec}>
          {cartProd.map((c) => (
            <div className={styles.cartItem} key={c.productId}>
              <input style={{transform:'scale(1.7)',cursor:'pointer'}} type="checkbox" defaultChecked={isOrder[c.productId]===true?true:false} onChange={()=>handleOrderCheak(c.productId)}/>
              <img src={c.imageUrl[0].photo} alt={c.name} className={styles.image} />
              <div className={styles.details}>
                <h3 className={styles.name}>{c.name}</h3>
                <p className={styles.price}>${c.price}</p>
              </div>
              <div className={styles.quantity}>
                <button
                  className={styles.button}
                  onClick={() => decreaseQuantity(c.productId)}
                >
                  -
                </button>
                <span className={styles.amount}>
                  {quantities[c.productId] ?? c.quantity}
                </span>
                <button
                  className={styles.button}
                  onClick={() => increaseQuantity(c.productId)}
                >
                  +
                </button>
              </div>
              <div className={styles.cutBtn}><button onClick={()=>getCartPId(c.productId)}><FontAwesomeIcon icon={faXmark}/> </button></div>
            </div>
          ))}
          </section>

          <section className={styles.cartPprcSec}>
            <h1>Product Price</h1>
            <table>
              <thead>
                <tr>
                  <th>Item</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody>
                 <tr>
                      <td>Subtotal:- </td>
                      <td>${calcSubTotalPrc().toFixed(2)} </td>
                 </tr>
                 <tr>
                      <td style={{borderBottom:" 1px solid #2af801"}}>Vat:- </td>
                      <td style={{borderBottom:" 1px solid #2af801"}}>${vat.toFixed(2)} </td>
                 </tr>
                 <tr>
                      <td style={{border:" 1px solid #2af801"}}>Total:- </td>
                      <td style={{border:" 1px solid #2af801"}}>${totalPrice.toFixed(2)} </td>
                 </tr>
              </tbody>
            </table>
            {
              orderProduct.length>0 ? <button onClick={()=>router.replace('/order')}>Procced to Order</button>: ''
            }
          </section>

        </section>
     
    </>
  );
};

export default CartPItem;
