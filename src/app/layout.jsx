import Navbar from "@/components/navber/nav";
import "./globals.css";
import Footer from "@/components/footer/footer";
import CartProvider from "@/components/cart/cartContext";
import { cookies } from "next/headers";
import OrderProvider from "@/components/order/orderContext";
import { api } from "@/config/api";



export const metadata = {
  title: "Pie Mart",
  description: "Pie mart e-commerce web site",
};

export default async function RootLayout({ children }) {
  const cookieStore=await cookies();
    const token = cookieStore.get('token')?.value;

    const res = await fetch(`${api}/user`,{headers:{authorization:token},cache:'no-store'});
    const data =await res.json();
  return (
    <html lang="en">
      <body>
          <CartProvider token={token} > 
            <OrderProvider user={data?.user}>
              <Navbar/>
                {children}
              <Footer/>
            </OrderProvider>
          </CartProvider>
      </body>
    </html>
  );
};
