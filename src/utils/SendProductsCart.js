"use server"

import SeptaUsers from "@/models/Users";
import ConnectDB from "./ConnectDB";

export default async function sendProductsToServer(id, product) {
  try {
    await ConnectDB();
    const user = await SeptaUsers.findById(id);
    user.productsCart.push(product)
    await user.save()
return JSON.parse(JSON.stringify(user.productsCart))
  } catch (error) {
    console.log(error.message);
  }
}
