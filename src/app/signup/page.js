"use client";
import styles from "./SignUp.module.css"
import { isValidIranPhone } from "@/modules/signup/isValidIranPhone";
import CreateUser from "@/modules/signup/Signup";
import { HassPassword } from "@/utils/HashPass";
import { getSession } from "next-auth/react";
import Link from "next/link";
import { redirect, useRouter } from "next/navigation";
import { useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";

function SignUp() {
  const router = useRouter()
  useEffect(()=>{
    async function getsession() {
      const session = await getSession()
      if (session){
        redirect("/")
      }
    }
    getsession()
  },[])
  async function onsubmit(formData) {
    
    const number = formData.get("number");
    const password = formData.get("password");
    const numberValidation = isValidIranPhone(number);
    if (!numberValidation) {
      return toast.error("شماره تلفن اشتباه است");
    }
    if (password.length < 6) {
      return toast.error("رمز عبور باید از 6 رقم بیشتر باشد");
    }
    const hashedPassword = await HassPassword(password);
    const res = await CreateUser(hashedPassword, number);
    if (!res) {
      return toast.error("مشکلی پیش آمده است");
    }else if (res === "exist"){
      toast.error("شما حساب کاربری دارید");
       setTimeout(() => {
      router.replace("/signin");
    }, 2000);
    return
    }
    toast.success("ثبت نام با موفقیت انجام شد");
    setTimeout(() => {
      router.replace("/signin");
    }, 2000);
  }

  return (
    <div className={styles.container}>
      <Toaster />
      <h3>ثبت نام</h3>
      <form action={onsubmit}>
        <label htmlFor="number">شماره موبایل :</label>
        <input name="number" type="number" placeholder="شماره تلفن همراه" />
        <label htmlFor="password">رمز :</label>
        <input name="password" type="password" placeholder="رمز حساب کاربری" />
        <button type="submit">ایجاد حساب</button>
        <Link href={"/signin"}><h3>حساب کاربری دارید ؟ ورود</h3></Link>
      </form>
    </div>
  );
}

export default SignUp;
