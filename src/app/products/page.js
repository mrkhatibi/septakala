"use client";

import getAllPosts from "@/modules/getAllPosts";
import PostCard from "@/modules/postCard";
import { useQuery } from "@tanstack/react-query";
import styles from "./products.module.css";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Spinner from "@/modules/loader/Loader";
function Products() {
  const router = useRouter();
  const categories = [
    "الکترونیک",
    "پوشاک",
    "کفش",
    "زیورآلات و اکسسوری",
    "سلامت و زیبایی",
    "خانه و آشپزخانه",
    "کتاب و لوازم تحریر",
    "ورزش و سرگرمی",
    "مواد غذایی و نوشیدنی",
    "ابزار و خودرو",
    "متفرقه",
  ];
  const { data, isPending } = useQuery({
    queryKey: ["getAllPosts"],
    queryFn: getAllPosts,
  });

  const [showData, setShowData] = useState();
  const [showFilteredData, setshowFilteredData] = useState(false);
  const searchParams = useSearchParams();
  useEffect(() => {
    const category = searchParams.get("category");
    const search = searchParams.get("search");

    if (category && !isPending) {
      const filtered = data.filter((item) => item.category === category);
      setShowData(filtered);
      setshowFilteredData(true);
    } else if (search && !isPending) {
      console.log(search)
      const searched = data.filter((item) =>
        item.name.trim().toLowerCase().includes(search.trim().toLowerCase())
      );
      setShowData(searched);
      setshowFilteredData(true);
    }else if(category && search && !isPending){
      const filtered = data.filter((item) => item.category === category);
      const searchedOnFilter = filtered.filter((item) =>
        item.name.trim().toLowerCase().includes(search.trim().toLowerCase())
      );
      setShowData(searchedOnFilter);
      setshowFilteredData(true);
    }
  }, [data, isPending, searchParams]);

  const categoryHandler = (category) => {
    const filtered = data.filter((item) => item.category === category);
    setShowData(filtered);
    setshowFilteredData(true);
    router.push(`/products?category=${category}`);
  };
  if (isPending) return <Spinner />;

  return (
    <div className={styles.container}>
      <div>
        {showFilteredData ? (
          <button
            onClick={() => (
              setshowFilteredData(false), router.push("/products")
            )}
          >
            حذف  فیلتر
          </button>
        ) : null}
        <h4>دسته بندی : </h4>
        <ul>
          {!isPending &&
            categories.map((item, index) => (
              <li key={index} onClick={() => categoryHandler(item)}>
                {item}
              </li>
            ))}
        </ul>
      </div>
      <div className={styles.allCards}>
        {!showFilteredData ? (
          <>
            {data.map((post) => (
              <PostCard key={post._id} post={post} />
            ))}
          </>
        ) : (
          <>
            {showData.length > 0 ? (
              showData.map((post) => <PostCard key={post._id} post={post} />)
            ) : (
              <h3 className={styles.noProduct}>
                محصولی در این دسته بندی وجود ندارد
              </h3>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default Products;
