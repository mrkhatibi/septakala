"use client";

import editUser from "@/utils/editUser";
import { GetUsers } from "@/utils/getUserRoleQuery";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import styles from "./Profile.module.css";
import Spinner from "@/modules/loader/Loader";

function EditUser() {
  const [editing, setEditing] = useState(false);
  const { data, isPending ,refetch} = GetUsers();
  if (isPending) return <Spinner />;
  const submitEdit = async(formData) => {
    const id = data._id
    const name = await formData.get("name")
    const lastName = await formData.get("lastName")
    const email = await formData.get("email")
    const address = await formData.get("address")
    if (!name || !lastName || !email || !address){
       return toast.error("لطفا تمامی فیلد ها را پر کنید")
    }
    const res = await editUser({id ,name , lastName , email , address})
   if (!res){
       return toast.error("مشکلی پیش آمده است")
    }else {
        setEditing(false)
        refetch()
       return toast.success(" ویرایش انجام شد  ")

    }
  }
  return (
<div className={styles.container}>
  <Toaster />
  {!editing ? (
    <div className={styles.info}>
      <h3>
        شماره همراه :{" "}
        <span className={styles.highlight}>
          {data.number ? data.number : "وارد نشده است"}
        </span>
      </h3>
      <h3>
        نام :{" "}
        <span className={styles.highlight}>
          {data.name ? data.name : "وارد نشده است"}
        </span>
      </h3>
      <h3>
        نام خانوادگی :{" "}
        <span className={styles.highlight}>
          {data.lastName ? data.lastName : "وارد نشده است"}
        </span>
      </h3>
      <h3>
        ایمیل :{" "}
        <span className={styles.highlight}>
          {data.email ? data.email : "وارد نشده است"}
        </span>
      </h3>
      <h3>
        آدرس :{" "}
        <span className={styles.highlight}>
          {data.address ? data.address : "وارد نشده است"}
        </span>
      </h3>
      <button className={styles.button} onClick={() => setEditing(true)}>
        ویرایش
      </button>
    </div>
  ) : (
    <div>
      <form action={submitEdit} className={styles.form}>
        <h3>نام : </h3>
        <input type="text" name="name" placeholder="نام" className={styles.input} />

        <h3>نام خانوادگی : </h3>
        <input type="text" name="lastName" placeholder="نام خانوادگی" className={styles.input} />

        <h3>ایمیل : </h3>
        <input type="text" name="email" placeholder="ایمیل" className={styles.input} />

        <h3>آدرس : </h3>
        <input type="text" name="address" placeholder="آدرس" className={styles.input} />

        <div className={styles.formActions}>
          <button
            type="button"
            className={styles.cancel}
            onClick={() => setEditing(false)}
          >
            لغو
          </button>
          <button type="submit" className={styles.button}>
            ویرایش
          </button>
        </div>
      </form>
    </div>
  )}
</div>
  );
}

export default EditUser;
