import LoadingPage from '@/components/loading/Loading';
import Popup from '@/components/popup/popup';
import { api } from '@/config/api';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

const DeleteProduct = ({id,token}) => {

    const [isLoading,setisLoading]=useState(false);
    
    const router =useRouter();
    const [popupMsg,setPopupmsg]=useState({
        type:true,
        message:'',
        trigger:false,
     });

     const handleDelete=async(id)=>{
        setisLoading(true)
         fetch(`${api}/product/delete/${id}`,{
            method:'DELETE',
            headers:{
                authorization:token
            }
         }).then(res=>res.json())
         .then((res) => {
            if (res.success === true) {
                setisLoading(false);
                setPopupmsg({message:res.message,trigger:true,type:true});
                router.push('/');
            } else {
                setPopupmsg({message:res.message,trigger:true,type:false});
                // location.reload();
                setisLoading(false);
            }
        })
        .catch((error) => {
            console.error("Fetch error:", error);
            setPopupmsg({message:error.message,trigger:true,type:false});
            setisLoading(false);
        });
        setTimeout(() => setPopupmsg({trigger:false}), 3000);;
     }
    return (
        <>
        {/* lorem150  */}
         {
            isLoading? 
            <div style={{ textAlign: 'center' }}>
                <div style={{ border: '4px solid #f3f3f3', borderTop: '4px solid #3498db', borderRadius: '50%', width: '50px', height: '50px', animation: 'spin 1s linear infinite' }} />
                <style jsx>{`
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
                `}</style>
            </div> :
            <button style={{borderRadius:'2rem',backgroundColor:'red'}} onClick={()=>handleDelete(id)}>Delete</button>
         }
         <Popup trigger={popupMsg.trigger} message={popupMsg.message} type={popupMsg.type}/>

        </>
    );
};

export default DeleteProduct;