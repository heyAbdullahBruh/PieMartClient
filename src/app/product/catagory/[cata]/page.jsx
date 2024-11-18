import CataProduct from "@/components/catagory/CataProduct";

const ProductCata = async({params}) => {
    const {cata}=await params;
    return (
        <>
            <CataProduct catagory={cata} endP={30}/>
        </>
    );
};

export default ProductCata;