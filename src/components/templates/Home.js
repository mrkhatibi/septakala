import ProductsSlider from "@/modules/Home/ProductsSlider";
import Slider from "@/modules/Home/Slider";
import styles from "./Home.module.css";
import DarkVeil from "../../modules/DarkVeil/DarkVeil";
import Link from "next/link";
import CategoryOnHome from "@/modules/categoyonhome/CategoryOnHome";

function HomePage() {
  return (
    <div>
      <div className={styles.derkveil}>
        <div style={{ width: "100%", height: "600px", position: "relative" }}>
          <DarkVeil
            baseColor={[0.08, 0.05, 0.15]}
            speed={0.1}
            amplitude={0.39}
            interactive={true}
          />
          <h1 className={styles.sitetitle}>SeptaKala</h1>
          <button className={styles.button}>
            <Link href={"/products"}>
            نمایش کالاها
            </Link>
          </button>
        </div>
      </div>
      <Slider />
      <h2 className={styles.title}>پیشنهاد لحظه</h2>
      <ProductsSlider />
      <h2 className={styles.title}> دسته بندی های پرفروش</h2>

      <CategoryOnHome />
    </div>
  );
}

export default HomePage;
