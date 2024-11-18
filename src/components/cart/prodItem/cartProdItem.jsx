import { useState } from "react";
import styles from "./cartPI.module.css";

const CartPItem = ({ cartProd }) => {
  const [quantities, setQuantities] = useState(
    cartProd.map((c) => ({ productId: c.productId, quantity: c.quantity }))
  );

  const increaseQuantity = (productId) => {
    setQuantities((prevQuantities) =>
      prevQuantities.map((q) =>
        q.productId === productId
          ? { ...q, quantity: q.quantity + 1 }
          : q
      )
    );
  };

  const decreaseQuantity = (productId) => {
    setQuantities((prevQuantities) =>
      prevQuantities.map((q) =>
        q.productId === productId && q.quantity > 1
          ? { ...q, quantity: q.quantity - 1 }
          : q
      )
    );
  };
  console.log(quantities);
  return (
    <div>
      {cartProd?.map((c) => {
        const currentQuantity = quantities.find((q) => q.productId === c.productId)?.quantity || c.quantity;

        return (
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
              <span className={styles.amount}>{currentQuantity}</span>
              <button
                className={styles.button}
                onClick={() => increaseQuantity(c.productId)}
              >
                +
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CartPItem;
