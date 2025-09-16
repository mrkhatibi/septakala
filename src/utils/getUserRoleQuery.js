import { useQuery } from "@tanstack/react-query";
import { getSession } from "next-auth/react";
import getUserRole, { getUserSession } from "./getUserRole";

export default function GetUsersession() {
  return useQuery({
    queryKey: ["getsession"],
    queryFn: async () => {
      const session = await getSession();
      if (session){
        const res = await getUserRole(session);
        return res;
      } else {
        return null
      }
      
    },
  });
}
export  function GetUsers() {
  return useQuery({
    queryKey: ["getsession1"],
    queryFn: async () => {
      const session = await getSession();
      if (session){
        const res = await getUserSession(session);
        return res;
      } else {
        return null
      }
      
    },
  });
}