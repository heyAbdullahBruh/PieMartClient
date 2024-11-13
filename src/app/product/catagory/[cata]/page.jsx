import CataProduct from "@/components/catagory/CataProduct";

const ProductCata = ({params}) => {
    const {cata}=params;
    return (
        <>
            <CataProduct catagory={cata} endP={30}/>
        </>
    );
};

export default ProductCata;