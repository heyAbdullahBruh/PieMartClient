import AdminPanel from "@/components/Admin/AdminPanel";
import Profile from "@/components/user/profile/profile";
import { api } from "@/config/api";
import { cookies } from "next/headers";

const user =async () => {
     const cookieStore=await cookies();
    const token = cookieStore.get('token')?.value;

    const res = await fetch(`${api}/user`,{headers:{authorization:token},cache:'no-store'});
    const data =await res.json();
    // console.log(data?.user);

    return (
        <>
        {/* lorem200  */}

            {
                data?.user?.isAdmin===true? <AdminPanel user={data?.user}/>
                : <Profile user={data?.user} token={token}/>
            }
        </>
    );
};

export default user;