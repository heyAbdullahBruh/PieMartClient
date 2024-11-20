import UpdateP from '@/components/product/updateP/UpdateP';
import { api } from '@/config/api';

const page =async ({params}) => {
    const {pId}=await params;
    const res =await fetch(`${api}/product/${pId}`);
    const data = await res.json();
    // console.log(data.product);
    return (
        <>
        <UpdateP product={data.product} id={pId}/>
        </>
    );
};

export default page;