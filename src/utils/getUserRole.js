"use server";

import SeptaUsers from "@/models/Users";
import ConnectDB from "./ConnectDB";

export default async function getUserRole(session) {
  const id = session?.user.name;
  await ConnectDB();
  const findUserRole = await SeptaUsers.findById({ _id: id });
  return findUserRole.role;
}


export async function getUserSession(session) {
  const id = session?.user.name;
  await ConnectDB();
  const findUser = await SeptaUsers.findById({ _id: id });
  return JSON.parse(JSON.stringify(findUser));
}

