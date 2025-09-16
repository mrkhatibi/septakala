"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import getAllPosts from "@/modules/getAllPosts";
import PostCard from "@/modules/postCard";
import Spinner from "@/modules/loader/Loader";
import styles from "./products.module.css";

export default function Products() {
  const router = useRouter();
  const searchParams = useSearchParams();

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

  const [filteredData, setFilteredData] = useState([]);
  const [showFiltered, setShowFiltered] = useState(false);

  // اعمال فیلتر بر اساس query پارامترها
  useEffect(() => {
    if (!data) return;

    const category = searchParams.get("category");
    const search = searchParams.get("search");

    let result = data;

    if (category) {
      result = result.filter(item => item.category === category);
    }
    if (search) {
      result = result.filter(item =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (category || search) {
      setFilteredData(result);
      setShowFiltered(true);
    } else {
      setShowFiltered(false);
    }
  }, [searchParams, data]);

  const handleCategoryClick = (category) => {
    router.push(`/products?category=${category}`);
  };

  const handleClearFilter = () => {
    router.push("/products");
    setShowFiltered(false);
  };

  if (isPending || !data) return <Spinner />;

  return (
    <div className={styles.container}>
      <div className={styles.sidebar}>
        {showFiltered && (
          <button className={styles.clearBtn} onClick={handleClearFilter}>
            حذف فیلتر
          </button>
        )}

        <h4>دسته بندی :</h4>
        <ul>
          {categories.map((cat, idx) => (
            <li key={idx} onClick={() => handleCategoryClick(cat)}>
              {cat}
            </li>
          ))}
        </ul>
      </div>

      <div className={styles.allCards}>
        {(showFiltered ? filteredData : data).length > 0 ? (
          (showFiltered ? filteredData : data).map((post) => (
            <PostCard key={post._id} post={post} />
          ))
        ) : (
          <h3 className={styles.noProduct}>
            محصولی با این مشخصات وجود ندارد
          </h3>
        )}
      </div>
    </div>
  );
}
