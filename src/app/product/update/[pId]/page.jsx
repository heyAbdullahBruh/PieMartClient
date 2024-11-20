import { api } from '@/config/api';
import React from 'react';

const page =async ({params}) => {
    const {pId}=await params;
    const res =await fetch(`${api}/product/${pId}`);
    const data = await res.json();
    // console.log(data.product);
    return (
        <div>
            <h1>{pId}</h1>
        </div>
    );
};

export default page;