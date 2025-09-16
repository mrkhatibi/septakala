import Image from "next/image";
import digital from "../../../public/categories/digital.jpg";
import gold from "../../../public/categories/gold.jpg";
import healthy from "../../../public/categories/healthy.jpg";
import pens from "../../../public/categories/pens.jpg";
import poshak from "../../../public/categories/poshak.jpg";
import sports from "../../../public/categories/sports.jpg";
import Link from "next/link";
import styles from "./category.module.css"
function CategoryOnHome() {
  const categories = [
    {
      title: "محصولات دیجیتال",
      image: digital,
      url: "/products?category=الکترونیک",
    },
    {
      title: "زیورآلات و طلا ",
      image: gold,
      url: "/products?category=زیورآلات%20و%20اکسسوری",
    },
    {
      title: "محصولات سلامت",
      image: healthy,
      url: "/products?category=سلامت%20و%20زیبایی",
    },
    {
      title: "کتاب و لوازم تحریر ",
      image: pens,
      url: "/products?category=کتاب%20و%20لوازم%20تحریر",
    },
    { title: "مد و پوشاک ", image: poshak, url: "/products?category=پوشاک" },
    {
      title: "ورزش و سرگرمی ",
      image: sports,
      url: "/products?category=ورزش%20و%20سرگرمی",
    },
  ];
  return (
    <div className={styles.container}>
      {categories.map((item, index) => (
        <div className={styles.cart} key={index}>
          <Link href={item.url}>
            <Image src={item.image} alt="image" />
            <h3>{item.title}</h3>
          </Link>
        </div>
      ))}
    </div>
  );
}

export default CategoryOnHome;
