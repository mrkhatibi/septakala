"use client";
import { getSession, signIn } from "next-auth/react";
import Link from "next/link";
import { redirect, useRouter } from "next/navigation";
import { useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import styles from "./SignIn.module.css"
function SignIn() {
  const router = useRouter();
  useEffect(() => {
    async function getsession() {
      const session = await getSession();
      if (session) {
        redirect("/");
      }
    }
    getsession();
  }, []);
  async function onSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const number = formData.get("number");
    const password = formData.get("password");

    const res = await signIn("credentials", {
      redirect: false,
      number,
      password,
    });
    if (res.status !== 200) {
      return toast.error(res.error);
    } else {
      toast.success("ورود با موفقیت انجام شد");
      setTimeout(() => {
        router.replace("/");
      }, 3000);
    }
  }

  return (
    <div className={styles.container}>
      <Toaster />
      <h3>ورود به حساب کاربری</h3>
      <form onSubmit={onSubmit}>
        <label htmlFor="number">شماره موبایل :</label>
        <input name="number" type="text" placeholder="شماره تلفن همراه" />

        <label htmlFor="password">رمز :</label>
        <input name="password" type="password" placeholder="رمز حساب کاربری" />

        <button type="submit">ورود</button>
        <Link href={"/signup"}>
          <h3>حساب کاربری ندارید ؟ ثبت نام</h3>
        </Link>
      </form>
    </div>
  );
}

export default SignIn;
