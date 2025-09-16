import { formatRial } from "@/utils/topersianprice";
import Image from "next/image";
import { MdMultipleStop } from "react-icons/md";
import { FaEquals } from "react-icons/fa";
import styles from "./cartsCards.module.css";

function CartsCard({ item }) {
  const itemsCounter = item.reduce((acc, cur) => acc + cur.quantity, 0);
  const total = item.reduce((acc, cur) => acc + cur.quantity * cur.price, 0);

  return (
    <div className={styles.container}>
      {item.map((i) => (
        <div key={i._id} className={styles.card}>
          <div className={styles.image}>
            <Image src={i.images[0]} alt="image" width={170} height={80} />
          </div>
          <div className={styles.details}>
            <h3>
              نام کالا : <span>{i.name}</span>
            </h3>
            <h3>
              تعداد : <span>{i.quantity}</span> <MdMultipleStop />{" "}
              <span>{formatRial(i.price)}</span> <FaEquals />{" "}
              <span>{formatRial(i.quantity * i.price)}</span>
            </h3>
          </div>
        </div>
      ))}
      <h3>جمع مبلغ : {formatRial(total)}</h3>
      <h3>تعداد محصولات : {itemsCounter.toLocaleString("fa-IR")} عدد </h3>
    </div>
  );
}

export default CartsCard;
