import Banner from "@/components/Banner/banner";
import styles from "./page.module.css";
import BSProduct from "@/components/BestSellProd/BSProduct";
import NProduct from "@/components/newProducts/NProduct";
import OTopic from "@/components/othertopic/OTopic";

export default function Home() {

  return (
    <main className={styles.main}>
      <Banner/>

      <BSProduct/>

      <OTopic/>

      <NProduct/>
    </main>
  );
}
