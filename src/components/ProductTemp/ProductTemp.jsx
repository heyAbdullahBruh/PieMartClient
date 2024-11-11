// components/Product.js
'use client';
import Image from 'next/image';
import styles from './productTemp.module.css';
import Link from 'next/link';

const ProductTemp = ({ product }) => {
  console.log();
  return (
    <article className={styles.card}>
      <Link href={'#'} style={{textDecoration:'none'}}>
        <div className={styles.imageWrapper}>
            <Image src={product?.pImgs[0].photo} alt={product.pName} width={200} height={200} className={styles.image} />
        </div>
        <h3 className={styles.title}>{product.pName}</h3>
        <h4 className={styles.brnad}>Brand : {product.brand} </h4>
        <p className={styles.rating}>Rating : {product.averageRat}/5</p>
        <p className={styles.price}>${product.price}</p>
      </Link>
      <button className={styles.button}>Add to Cart</button>
    </article>
  );
};

export default ProductTemp;
