"use client";

import PostCard from "@/modules/postCard";
import styles from "./allPosts.module.css";
import { useQuery } from "@tanstack/react-query";
import getAllPosts from "@/modules/getAllPosts";
import Spinner from "@/modules/loader/Loader";
import GetUsersession from "@/utils/getUserRoleQuery";
import { redirect } from "next/navigation";
function AllPosts() {
  const { data, isPending } = useQuery({
    queryKey: ["getAllPosts"],
    queryFn: getAllPosts,
  });
  const { data: data1, isPending: isPending1 } = GetUsersession();
  if ( isPending) return <Spinner />;
  if ( isPending1) return <Spinner />;

  if (data1 !== "ADMIN") {
    return redirect("/");
  }

  return (
    <div className={styles.container}>
      <h2>پست های ثبت شده</h2>
      <div className={styles.allCards}>
        {data.map((post) => (
          <PostCard key={post._id} post={post} />
        ))}
      </div>
    </div>
  );
}

export default AllPosts;
