import { useEffect, useState } from "react";
import styles from "./cartPI.module.css";
import { api } from "@/config/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

const CartPItem = ({ cartProd, token, getCartPId }) => {
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
  }, [quantities]);

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

  // const [allPrice,setAllPrice]=useState([]);
  // const [priceSubTotal,setPriceSubTotal] =useState(0) ;
  // useEffect(()=>{
     
  //    setAllPrice(cartProd.map((p)=>p.price * p.quantity));
  //    setPriceSubTotal(allPrice?.reduce((newPrice,currentPrice)=> newPrice+currentPrice,0))
     
  // },[cartProd,quantities]);
  // console.log("prices:", priceSubTotal);
  // let vat = 0
  const calcSubTotalPrc = () => {
    return cartProd.reduce((total, item) => {
      const quantity = quantities[item.productId] ?? item.quantity; // Get quantity from state or fallback to initial quantity
      return total + item.price * quantity;
    }, 0);
  };
  
  const vat = calcSubTotalPrc()/10;

  const totalPrice = calcSubTotalPrc() +vat;
// console.log(totalPrice);
  return (
    <>

        <section className={styles.cartSec}>

          <section className={styles.cartPsec}>
          {cartProd.map((c) => (
            <div className={styles.cartItem} key={c.productId}>
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
          </section>

        </section>
     
    </>
  );
};

export default CartPItem;
