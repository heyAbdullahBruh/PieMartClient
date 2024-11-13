import Link from "next/link";

// app/[...notFound]/page.js
export default function CustomNotFound() {
    return <section style={{width:'100%',display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'column',backgroundColor:'#39eed6a6',padding:'2rem 0' }}>
        <img src="https://i.postimg.cc/Jn2wdMQj/404.png" style={{width:'60%'}} alt="404Notfound" />
        <Link href={'/'}><button style={{cursor:'pointer',borderRadius:'2rem'}}>Go back Shopping</button></Link>
    </section>;
  }
  