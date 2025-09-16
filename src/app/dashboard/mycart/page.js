"use client";
import emptyCart from "../../../../public/5e535516c6b249395e2a3845_peep-34.png";
import PostCard from "@/modules/postCard";
import { useData } from "@/reducer/CartReducer";
import { formatRial } from "@/utils/topersianprice";
import Image from "next/image";
import styles from "./MyCart.module.css";
import { GetUsers } from "@/utils/getUserRoleQuery";
import sendProductsToServer from "@/utils/SendProductsCart";
import toast, { Toaster } from "react-hot-toast";
import { redirect } from "next/navigation";
import Spinner from "@/modules/loader/Loader";

function MyCart() {
  const { state, dispatch } = useData();
  const { data, isPending } = GetUsers();
  const checkoutHandler = async () => {
    if (!data.address){
      setTimeout(() => {
        toast.error("ابتدا اطلاعات خود را ویرایش کنید")
      }, 2000);
      return redirect("/dashboard/editUser")
    }
    const products = state.products;
    const id = data._id;
    const res = await sendProductsToServer(id, products);
    dispatch({ type: "CheckOut" });
    if (res.length > 0) {
      toast.success("سفارش شما ثبت گردید");
    }
  };
  if (isPending) {
    return <Spinner />;
  }

  return (
    <>
      <Toaster />

      <div className={styles.container}>
        {state.products.length > 0 ? (
          <div className={styles.products}>
            {state.products.map((item) => (
              <PostCard key={item._id} post={item} />
            ))}
          </div>
        ) : (
          <div className={styles.emptyCart}>
            <Image src={emptyCart} alt="empty" width={300} height={350} />
            <h3>سبد خرید شما خالی است</h3>
          </div>
        )}

        <div className={styles.summary}>
          <h3>
            جمع خرید :{" "}
            <span className={styles.highlight}>{formatRial(state.total)}</span>
          </h3>
          <h3>
            تعداد کل محصولات :{" "}
            <span className={styles.highlight}>
              {state.itemsCounter.toLocaleString("fa-IR")}
            </span>
          </h3>
          <h3>
            وضعیت پرداخت :{" "}
            <span className={styles.highlight}>
              {state.checkOut ? "پرداخت شده" : "پرداخت نشده"}
            </span>
          </h3>
        </div>
        <button
          disabled={state.products.length === 0}
          onClick={() => checkoutHandler()}
          className={styles.checkoutBtn}
        >
          نهایی کردن سفارش
        </button>
      </div>
    </>
  );
}

export default MyCart;
