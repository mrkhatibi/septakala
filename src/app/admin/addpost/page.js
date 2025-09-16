"use client";

import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import Features from "@/modules/admin/Features";
import AddCategory from "@/modules/admin/AddCategory";
import styles from "./addpost.module.css";
import GetUsersession from "@/utils/getUserRoleQuery";
import { redirect } from "next/navigation";

export default function Addpost() {
  const [features, setFeatures] = useState([]);
  const [value, setValue] = useState([""]);
  const [category, setCategory] = useState("متفرقه");
  const [images, setImages] = useState([]);

  const inputs = [
    { value: "name", title: "نام محصول", type: "text" },
    { value: "price", title: "قیمت محصول", type: "number" },
    { value: "quantity", title: "موجودی محصول", type: "number" },
    { value: "description", title: "توضیحات محصول", type: "text" },
  ];
const { data, isPending } = GetUsersession();
  if (!isPending && data !== "ADMIN") {
    redirect("/");
  }
  const onsubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);

    // اضافه کردن عکس‌ها و ویژگی‌ها به فرم دیتا
    images.forEach((img) => formData.append("images", img));
    features.forEach((f) => formData.append("features", f));
    formData.append("category", category);

    try {
      const res = await fetch("/api/products", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("خطا در ارسال محصول");

      toast.success("پست با موفقیت بارگذاری شد");
      form.reset();
      setImages([]);
      setFeatures([]);
      setValue([""])
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className={styles.container}>
      <Toaster />
      <h1>بارگذاری پست</h1>
      <form className={styles.form} onSubmit={onsubmit}>
        {inputs.map((item) => (
          <div className={styles.inputdiv} key={item.value}>
            <h3>{item.title}</h3>
            {item.value === "description" ? (
              <textarea name={item.value} placeholder={item.title} />
            ) : (
              <input type={item.type} name={item.value} placeholder={item.title} />
            )}
          </div>
        ))}

        <h3>ویژگی‌های محصول</h3>
        <Features
          features={features}
          setFeaturs={setFeatures}
          value={value}
          setvalue={setValue}
        />

        <h3>دسته بندی محصول</h3>
        <AddCategory setCategory={setCategory} />

        <div className={styles.inputdiv}>
          <h3>تصاویر محصول</h3>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={(e) => setImages([...e.target.files])}
          />
        </div>

        <button type="submit" className={styles.submitButton}>
          تایید
        </button>
      </form>
    </div>
  );
}
