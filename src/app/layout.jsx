import Navbar from "@/components/navber/nav";
import "./globals.css";
import Footer from "@/components/footer/footer";
import CartProvider from "@/components/cart/cartContext";
import { cookies } from "next/headers";



export const metadata = {
  title: "Pie Mart",
  description: "Pie mart e-commerce web site",
};

export default async function RootLayout({ children }) {
  const cookieStore=await cookies();
    const token = cookieStore.get('token')?.value;
  return (
    <html lang="en">
      <body>
          <CartProvider token={token} > 
            <Navbar/>
              {children}
            <Footer/>
          </CartProvider>
      </body>
    </html>
  );
};
