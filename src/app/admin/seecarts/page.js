"use client";

import { getAllCarts } from "@/utils/getAllUsers";
import { useEffect, useState } from "react";
import styles from "./AdminOrders.module.css";
import SeeuserCarts from "@/modules/admin/seeuserCarts";
import GetUsersession from "@/utils/getUserRoleQuery";
import { redirect } from "next/navigation";
import Spinner from "@/modules/loader/Loader";

function SeeCarts() {
  const [allusersWithCart, setAllUsersWithCart] = useState([]);
  useEffect(() => {
    async function getUsersCart() {
      const res = await getAllCarts();
      if (!res) {
        return toast.error("مشکلی پیش آمده");
      }
      setAllUsersWithCart(res);
    }
    getUsersCart();
  }, []);
  const { data, isPending } = GetUsersession();
  if (isPending) return <Spinner />;

if (data !== "ADMIN") {
  return redirect("/")
}

  return (
   <div className={styles.container}>
  <h3 className={styles.title}>سفارشات ثبت شده</h3>
  {allusersWithCart.map((item, index) => (
    <div key={index} className={styles.userCard}>
      <div className={styles.userInfo}>
        <h3>نام و نام خانوادگی : <span className={styles.highlight}>{item.name} {item.lastName}</span></h3>
        <h3>شماره تماس : {item.number}</h3>
        <h3>آدرس : {item.address}</h3>
      </div>
      <SeeuserCarts data={item.productsCart}/>
    </div>
  ))}
</div>
  );
}

export default SeeCarts;
