'use client';
import { useState } from 'react';
import styles from './up.module.css';
import { api } from '@/config/api';
import { useCart } from '@/components/cart/cartContext';
import { useRouter } from 'next/navigation';
import Popup from '@/components/popup/popup';
import LoadingPage from '@/components/loading/Loading';

// pName, pDesc, brand, catagory, price, stock

const UpdateP = ({id , product}) => {

    const {token}=useCart();
    const router =useRouter();
    const [isLoading,setisLoading]=useState(false);
    const [popupMsg,setPopupmsg]=useState({
        type:true,
        message:'',
        trigger:false,
     });

    const [productInp,setProductInp]=useState({
        brand:product.brand,
        catagory:product.catagory,
        price:product.price,
    });
    const [pName,setPName]=useState(product.pName);
    const [pDesc,setpDesc]=useState(product.pDesc);
    const [stock,setStock]=useState(product.stock);

    const {brand,catagory,price}=productInp;

    const handleBCP=(e)=>{
        setProductInp({
            ...productInp,
            [e.target.name]:e.target.value
        })
    };


    const [imageFile, setImageFile] = useState([]);
    const [image, setImage] = useState([]);
    
  const handleImageChange = (e) => {
    const files = e.target.files;
    const fileArray = Array.from(files);

    // Set the selected images
    setImageFile(files);

    // Create previews for the selected images
    const previews = fileArray.map((file) => URL.createObjectURL(file));
    setImage(previews);
  };


    const handleAddProduct=async(e)=>{
            e.preventDefault();
            setisLoading(true);

        const formData = new FormData();
        formData.append('pName', pName);
        formData.append('pDesc', pDesc);
        formData.append('catagory', catagory);
        formData.append('brand', brand);
        formData.append('price', price);
        formData.append('stock', stock);
        for (let i = 0; i < imageFile.length; i++) {
        formData.append('pImgs', imageFile[i]);
        }
        await fetch(`${api}/product/update/${id}`,{
            method:"PATCH",
            headers:{
                authorization:token,
            },
            body:formData,
          }).then((res)=>res.json())
          .then((res)=>{
            if (res.success===true) {
                setPopupmsg({message:res.message,trigger:true,type:true});
                 setisLoading(false);
                router.push(`/product/details/${res.id}`)
            }else{
                 setisLoading(false);
                 setPopupmsg({message:res.message,trigger:true,type:false});
            }
          }).catch((err)=>{
            console.log(err);
            setPopupmsg({message:err.message,trigger:true,type:false});
          });
    };
    console.log(imageFile);


    const [disable,setDisable]=useState(true);

    // console.log(formData);
    return (
        <section className={styles.UpdateP}>
            {/* lorem100  */}
            <h1>Create a product</h1>
            {
                isLoading ? <LoadingPage/>:
                <form onSubmit={handleAddProduct} encType="multipart/form-data">
                <div className={styles.pNamesec}>
                    <input type="text" name="pName" className={styles.pName} value={pName||''} onChange={(e)=>{
                        const value = e.target.value;
                        setDisable(true)
                        if(value.trim().length < 41 && value.trim().length >= 20){
                        setDisable(false)
                        }
                        if (value.length <= 41) {
                            setPName(value);
                        }
                    }} placeholder='Enter product name ' required/>
                    <p style={{textAlign:'right'}}>{pName.length}/41</p>
                    <p style={{color:'red'}}>{pName.length >= 40 ?'Product name must give Maximum-40 Character ' :'' }</p>
                    <p style={{color:'red'}}>{pName.length < 20 ? 'Product name must give Minimum-20 Character ' :'' }</p>
                </div>

                <div className={styles.brandCata}>
                    <div className={styles.brand}>
                        <label htmlFor="brand">Brand name : -</label>
                        <select name="brand" value={brand} onChange={handleBCP} required>
                            <option value="apple">Apple</option>
                            <option value="oppo">Oppo</option>
                            <option value="lorial">Lorial</option>
                            <option value="crystal">Crystal</option>
                            <option value="export">Export</option>
                            <option value="unilever">Unilever</option>
                            <option value="samsung">Samsung</option>
                            <option value="a4tech">A4Tech</option>
                        </select>
                    </div>
                   <div className={styles.cata}>
                     <label htmlFor="catagroy">Catagory :-</label>
                     <select name="catagory" value={catagory} onChange={handleBCP} required >
                        <option value="mens">Mens</option>
                        <option value="women">Women</option>
                        <option value="kids">Kids</option>
                        <option value="laptop">Laptop</option>
                        <option value="phone">Phone</option>
                        <option value="headphone">Headphone</option>
                        <option value="fashion">Fashion</option>
                        <option value="electronics">Electronics</option>
                    </select>
                   </div>
                </div>

                <div className={styles.prcStc}>
                    <input type="number" name="price" value={price} onChange={handleBCP} placeholder='$Price ?' required />
                    <input type="number" name="stock" value={stock} onChange={(e)=>{
                        const value = e.target.value;
                        setDisable(true)
                        if(value <101 && value >= 3){
                        setDisable(false)
                        }
                        if (value <= 101) {
                            setStock(value);
                        }
                    }} placeholder='Stcok ?'required />
                </div>
                <div className={styles.pDesc}>
                    <textarea name="pDesc" value={pDesc} onChange={(e)=>{
                            const value = e.target.value;
                            setDisable(true)
                            if(value.trim().length < 1500 && value.trim().length >= 200){
                            setDisable(false)
                            }
                            if (value.length <= 1500) {
                                setpDesc(value);
                            }
                        }} placeholder='Write a description for your product..' required></textarea>
                    <p style={{textAlign:'right'}}>{pDesc.length}/1500</p>
                    <p style={{color:'red'}}>{pDesc.length >= 1500 ?'Product description must give Maximum-1500 Character ' :'' }</p>
                    <p style={{color:'red'}}>{pDesc.length < 200 ? 'Product description must give Minimum-200 Character ' :'' }</p>
                </div>
                
                <div className={styles.imgInp}>
                    {/* Display image previews */}
                    {image.length > 0 ? (
                        <div>
                        <h3>Image Previews:</h3>
                        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                            {image.map((preview, index) => (
                            <img
                                key={index}
                                src={preview}
                                alt={`preview-${index}`}
                                style={{
                                width: '100px',
                                height: '100px',
                                objectFit: 'cover',
                                borderRadius: '5px',
                                }}
                            />
                            ))}
                        </div>
                        </div>
                    ) : 
                    (
                        <div>
                        <h3>Image Previews:</h3>
                        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                            {product.pImgs?.map((img, index) => (
                            <img
                                key={img.imgId}
                                src={img.photo}
                                alt={`preview-${index}`}
                                style={{
                                width: '100px',
                                height: '100px',
                                objectFit: 'cover',
                                borderRadius: '5px',
                                }}
                            />
                            ))}
                        </div>
                        </div>
                    )
                    } 
                    <input type='file' name='productImage' multiple onChange={handleImageChange}  accept="image/*"/>
                    <p>Image add Must be Maximam 10 images</p>
                </div>
                <button type="submit">Update</button>
                 </form>
            }
           <Popup trigger={popupMsg.trigger} message={popupMsg.message} type={popupMsg.type}/>
        </section>
    );
};

export default UpdateP;