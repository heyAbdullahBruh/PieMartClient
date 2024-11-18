'use client';
import styles from './regi.module.css';
import { useState } from "react";
import { useRouter } from 'next/navigation';
import { api } from '@/config/api';
import PopUp from '../popup/popup';
import Link from 'next/link';

const Register = () => {
const router=useRouter();
 const [popupMsg,setPopupmsg]=useState({
    type:true,
    message:'',
    trigger:false,
 });

  const [data,setData]=useState({
      name:'',
      mail:'',
      password:'',
  });
  const {name,mail,password}=data;
  const handleChange = (e) => {
      setData({
          ...data,
          [e.target.name]:e.target.value
      });
  };
  const handleSubmit =async(e)=>{
      e.preventDefault();
          await fetch(`${api}/user/register`, {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify({name,mail,password}),
          })
          .then((res)=>res.json())
          .then((res) => {
              if (res.success === true) {
                router.replace('/auth/login');
                setPopupmsg({message:res.message,trigger:true,type:true});
            } else {
                setPopupmsg({message:res.message,trigger:true,type:false});
                  location.reload();
              };
          });
          
        
        setTimeout(() => setPopupmsg({trigger:false}), 3000);
    };
  return (
      <section>
      
      <div className={styles.register}>
              <h1 style={{fontSize:'2.5rem',margin:'2rem'}}>Registration</h1>
              <form onSubmit={handleSubmit}>
                   <input placeholder='Write your Name' value={name} type="text" onChange={handleChange} required name="name" />

                  <input placeholder='Write your Eamil' value={mail} type="email" onChange={handleChange} required name="mail" />

                  <input placeholder='Write your Password' value={password} type="password" onChange={handleChange} required name="password" />
                  <button type='submit'>SIGN UP</button>
                  <p>Already have an account.? Please Sign in / <Link href={'/auth/login'}>Sign In</Link> </p>
              </form>
              <PopUp message={popupMsg.message} trigger={popupMsg.trigger} type={popupMsg.type}/>
          </div> 
      </section>
  );
};

export default Register;