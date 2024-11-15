import BrandProduct from "@/components/product/brandProduct/BrandP";

const Brand = ({params}) => {
    const {brand}=params;
    return (
        <div>
            <BrandProduct endP={20} brand={brand}/>
        </div>
    );
};

export default Brand;