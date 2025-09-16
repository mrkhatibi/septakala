"use server"

import septaProducts from "@/models/Products"
import ConnectDB from "@/utils/ConnectDB"


export default async function getAllPosts() {
   try {
        await ConnectDB()
    } catch (error) {
        console.log(error)
    }
    const posts = await septaProducts.find({}) 
    return JSON.parse(JSON.stringify(posts))
}