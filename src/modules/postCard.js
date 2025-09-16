import { formatRial, productSlicer} from "@/utils/topersianprice"
import Image from "next/image"
import styles from "./postcard.module.css"

import { TbCategory } from "react-icons/tb";
import { IoPricetagsOutline } from "react-icons/io5";
import Link from "next/link";


function PostCard({post}) {
  const image = post.images[0]
  return (
    <div className={styles.card}>
      <Link className={styles.link} href={`/products/${post._id}`}>
      <Image src={image} alt={post.name} width={200} height={150}/>
      <h3>{productSlicer(post.name) }</h3>
      <h4><IoPricetagsOutline />{formatRial(post.price)}</h4>
      <p><TbCategory />{post.category}</p>
    </Link>
    </div>
  )
}

export default PostCard