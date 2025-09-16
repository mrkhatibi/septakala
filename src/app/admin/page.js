"use client";

import GetUsersession from "@/utils/getUserRoleQuery";
import { redirect } from "next/navigation";
import styles from "./adminpanel.module.css";
import Link from "next/link";
import { signOut } from "next-auth/react";
function AdminPage() {
  const { data, isPending } = GetUsersession();
  if (!isPending && data !== "ADMIN") {
    redirect("/");
  }
  return (
    <div className={styles.container}>
      <h3 className={styles.title}>پنل ادمین</h3>
      <div className={styles.panel}>
        <Link className={styles.panelbuttons} href={"/admin/addpost"}>
          <div>
            <h3>ثبت پست</h3>
          </div>
        </Link>
        <Link className={styles.panelbuttons} href={"/admin/allposts"}>
          <div>
            <h3>مشاهده پست های ثبت شده</h3>
          </div>
        </Link>
        <Link className={styles.panelbuttons} href={"/admin/seeusers"}>
          <div>
            <h3>مشاهده کاربرها</h3>
          </div>
        </Link>
        <Link className={styles.panelbuttons} href={"/admin/seecarts"}>
          <div>
            <h3>گزارشات فروش</h3>
          </div>
        </Link>
        <div  onClick={()=>(signOut())} className={styles.panelbuttons}>
          <h3 style={{cursor : "pointer"}}>خروج از حساب ادمین </h3>
        </div>
      </div>
    </div>
  );
}

export default AdminPage;
