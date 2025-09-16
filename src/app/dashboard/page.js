"use client";

import Link from "next/link";
import styles from "./dashboard.module.css";
import GetUsersession from "@/utils/getUserRoleQuery";
import { redirect } from "next/navigation";
import { signOut } from "next-auth/react";
import Spinner from "@/modules/loader/Loader";
function Dashboard() {
  const { data, isPending } = GetUsersession();
  if (isPending) {
    return <Spinner />;
  }
  if (!data){
    redirect("/signup")
  }
  if (data === "ADMIN"){
    redirect("/admin")
  }


  const signoutHandler = () => {
    signOut()
  }
  return (
    <div className={styles.container}>
      <h3 className={styles.title}>داشبورد</h3>
      <div className={styles.panel}>
      
          <Link className={styles.panelbuttons} href={"/dashboard/mycart"}>
            <div>
              <h3>سبد خرید</h3>
            </div>
          </Link>
        <Link className={styles.panelbuttons} href={"/dashboard/mycarts"}>
          <div>
            <h3>مشاهده سفارشات ثبت شده</h3>
          </div>
        </Link>
        <Link className={styles.panelbuttons} href={"/dashboard/editUser"}>
          <div>
            <h3>ویرایش اطلاعات کاربر</h3>
          </div>
        </Link>
          <div onClick={()=>signoutHandler()} className={styles.panelbuttons}>
            <h3>خروج از حساب</h3>
          </div>
       
      </div>
    </div>
  );
}

export default Dashboard;
