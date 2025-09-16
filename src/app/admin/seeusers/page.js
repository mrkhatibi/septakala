"use client";
import Spinner from "@/modules/loader/Loader";
import styles from "./Users.module.css";

import getAllUsers from "@/utils/getAllUsers";
import GetUsersession from "@/utils/getUserRoleQuery";
import { toPersianDate } from "@/utils/toPersianDate";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

function SeeUsers() {
  const [allusers, setAllUsers] = useState([]);
  useEffect(() => {
    async function getusers() {
      const res = await getAllUsers();
      if (!res) {
        return toast.error("مشکلی پیش آمده");
      }
      setAllUsers(res);
    }
    getusers();
  }, []);
  const { data, isPending } = GetUsersession();
    if ( isPending) return <Spinner />;
  
    if (data !== "ADMIN") {
      return redirect("/");
    }
  return (
    <div className={styles.container}>
      {allusers.map((item) => (
        <div key={item._id} className={styles.userCard}>
          <h3>نام : <span>{item.name ? item.name : "وارد نشده است"}</span></h3>
          <h3>نام خانوادگی : <span>{item.lastName ? item.lastName : "وارد نشده است"}</span></h3>
          <h3>شماره تماس : <span>{item.number ? item.number : "وارد نشده است"}</span></h3>
          <h3>آدرس : <span>{item.address ? item.address : "وارد نشده است"}</span></h3>
          <h3>ایمیل : <span>{item.email ? item.email : "وارد نشده است"}</span></h3>
          <h3>
            تاریخ ثبت نام : <span>{item.createdAt ? toPersianDate(item.createdAt) : "وارد نشده است"}</span>
          </h3>
        </div>
      ))}
    </div>
   
  );
}

export default SeeUsers;
