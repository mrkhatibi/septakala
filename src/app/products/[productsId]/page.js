"use client";
import styles from "./ProductDetail.module.css";
import getAllPosts from "@/modules/getAllPosts";
import { useData } from "@/reducer/CartReducer";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useState } from "react";
//icons :
import { MdNavigateNext } from "react-icons/md";
import { MdNavigateBefore } from "react-icons/md";
import { MdOutlineDeleteSweep } from "react-icons/md";
import { FaPlus } from "react-icons/fa";
import { FaMinus } from "react-icons/fa";
import { formatRial } from "@/utils/topersianprice";
import Spinner from "@/modules/loader/Loader";

function ProductsDetail() {
  const { state, dispatch } = useData();
  const [imageIndex, setImageIndex] = useState(0);
  const { productsId } = useParams();

  //بررسی وجود این کالا در سبد خرید
  const findProduct = state.products.find((item) => item._id === productsId);

  const { data, isPending } = useQuery({
    queryKey: ["getAllPosts"],
    queryFn: getAllPosts,
  });

  if (isPending) return <Spinner />;

  const postDetail = data.find((item) => item._id === productsId);
  const lastimage = postDetail.images.length - 1;

  return (
    <div className={styles.container}>
      {postDetail.quantity < 10 ? (
        <div className={styles.quantityofproduct}>
          <h4>{postDetail.quantity}عدد مانده</h4>
        </div>
      ) : null}
      <div>
        <h3 className={styles.title}>{postDetail.name}</h3>
        <p className={styles.category}>{postDetail.category}</p>

        <h4 className={styles.sectionTitle}>ویژگی ها</h4>
        <ul className={styles.featuresList}>
          {postDetail.features.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>

        <h4 className={styles.sectionTitle}>توضیحات</h4>
        <p className={styles.description}>{postDetail.description}</p>

        <div className={styles.imageGallery}>
          <button
            disabled={imageIndex === 0}
            onClick={() => setImageIndex(imageIndex - 1)}
          >
            <MdNavigateNext />
          </button>
          <div className={styles.imgwrapper}>
            <Image
              src={postDetail.images[imageIndex]}
              alt={postDetail.name}
              fill
            />
          </div>
          <button
            disabled={imageIndex === lastimage}
            onClick={() => setImageIndex(imageIndex + 1)}
          >
            <MdNavigateBefore />
          </button>
        </div>
      </div>
      <div className={styles.price}>
        <h3>{formatRial(postDetail.price)}</h3>
      </div>
      <div className={styles.cartActions}>
        {!findProduct && (
          <button
            onClick={() => dispatch({ type: "Add", payload: postDetail })}
          >
            اضافه کردن به سبد خرید
          </button>
        )}

        {findProduct && findProduct.quantity === 1 && (
          <>
            <button
              onClick={() => dispatch({ type: "Delete", payload: postDetail })}
            >
              <MdOutlineDeleteSweep size={25} />
            </button>
            <span className={styles.quantity}>{findProduct.quantity}</span>
            <button
              disabled={postDetail.quantity === findProduct.quantity}
              onClick={() =>
                dispatch({ type: "Increase", payload: postDetail })
              }
            >
              <FaPlus size={25} />
            </button>
          </>
        )}

        {findProduct && findProduct.quantity > 1 && (
          <>
            <button
              onClick={() =>
                dispatch({ type: "Decrease", payload: postDetail })
              }
            >
              <FaMinus size={25} />
            </button>
            <span className={styles.quantity}>{findProduct.quantity}</span>
            <button
              disabled={postDetail.quantity === findProduct.quantity}
              onClick={() =>
                dispatch({ type: "Increase", payload: postDetail })
              }
            >
              <FaPlus size={25} />
            </button>
          </>
        )}
      </div>
      <div className={styles.price}>
      {postDetail.quantity === findProduct?.quantity ? <h3 style={{color : "red"}}>حداکثر موجودی</h3> : null}
      </div>
    </div>
  );
}

export default ProductsDetail;
