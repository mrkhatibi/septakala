"use client";
import { useState } from "react";
import { FaAnglesDown } from "react-icons/fa6";
import styles from "../../app/admin/seecarts/AdminOrders.module.css";
import CartsCard from "../cartsCard";
function SeeuserCarts({ data }) {
  const [seeUserCarts, setSeeUserCarts] = useState(false);
  return (
    <div>
      <h3
        className={styles.toggleOrders}
        onClick={() => setSeeUserCarts(!seeUserCarts)}
      >
        سفارش <FaAnglesDown size={20} />
      </h3>
      {seeUserCarts && (
        <div className={styles.orders}>
          {data.map((cart , index) => (
            <div key={index} className={styles.orderItem}>
              <CartsCard item={cart} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default SeeuserCarts;
