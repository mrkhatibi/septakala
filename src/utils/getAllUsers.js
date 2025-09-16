"use server";

import SeptaUsers from "@/models/Users";
import ConnectDB from "./ConnectDB";

export default async function getAllUsers() {
  try {
    await ConnectDB();
    const allUsers = await SeptaUsers.find({ role: "USER" });
    return JSON.parse(JSON.stringify(allUsers));
  } catch (error) {
    console.log(error);
  }
}
export async function getAllCarts() {
  try {
    await ConnectDB();
    const allUsers = await SeptaUsers.find({
      productsCart: { $exists: true, $not: { $size: 0 } },
      role: "USER",
    });
    return JSON.parse(JSON.stringify(allUsers));
  } catch (error) {
    console.log(error);
  }
}
