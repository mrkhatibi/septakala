"use client"

import CartsCard from "@/modules/cartsCard";
import { GetUsers } from "@/utils/getUserRoleQuery";
import styles from "./myCarts.module.css"
import Spinner from "@/modules/loader/Loader";

function MyCarts() {
     const { data, isPending } = GetUsers();
      if (isPending) return <Spinner />;
  return (
    <div className={styles.container}>
      {data.productsCart.map((item , index)=> (
        <div className={styles.card} key={index}>
        <h3>سفارش {(index+1).toLocaleString("fa-IR")}</h3>
        <CartsCard item={item}/>
        
        </div>
      ))}
    </div>
  )
}

export default MyCarts