import BrandProduct from "@/components/product/brandProduct/BrandP";

const Brand = async({params}) => {
    const {brand}=await params;
    return (
        <div>
            <BrandProduct endP={20} brand={brand}/>
        </div>
    );
};

export default Brand;