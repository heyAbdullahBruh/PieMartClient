import SIngleP from "@/components/product/singleProduct/SIngleP";

const IProduct =async ({params}) => {
    const {pId}=await params;
    return (
        <div>
            <SIngleP productId={pId}/>
        </div>
    );
};

export default IProduct;