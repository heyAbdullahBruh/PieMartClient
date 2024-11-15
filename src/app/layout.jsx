import Navbar from "@/components/navber/nav";
import "./globals.css";
import Footer from "@/components/footer/footer";
import CartProvider from "@/components/cart/cartContext";



export const metadata = {
  title: "Pie Mart",
  description: "Pie mart e-commerce web site",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
          <CartProvider>
            <Navbar/>
              {children}
            <Footer/>
          </CartProvider>
      </body>
    </html>
  );
};
