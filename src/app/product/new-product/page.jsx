import NProduct from '@/components/product/newProducts/NProduct';
import React from 'react';

const NewProduct = () => {
    return (
        <section style={{margin:'2rem 0'}}>
            <NProduct endP={20} showP={false}/>
        </section>
    );
};

export default NewProduct;