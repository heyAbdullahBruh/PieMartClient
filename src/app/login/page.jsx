"use server";
import LogIn from '@/components/logIn/LogIn';
import { cookies } from 'next/headers';

const page = async() => {
    const cookieStore=await cookies();
    const token = cookieStore.get('token')?.value;

    // if (!token) {
        
    // }
    return (
        <>
            <LogIn token={token}/>
          
        </>
    );
};

export default page;