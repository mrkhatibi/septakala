

import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import SeptaUsers from "@/models/Users";
import ConnectDB from "@/utils/ConnectDB";
import { comparePass } from "@/utils/HashPass";
import { isValidIranPhone } from "@/modules/signup/isValidIranPhone";
export const authOptions = {
  session: { strategy: "jwt" },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        number: { label: "شماره موبایل", type: "text" },
        password: { label: "رمز عبور", type: "password" },
      },
      async authorize(credentials) {
        const { number, password } = credentials;
        
        await ConnectDB();

        if (!isValidIranPhone(number) || !password) {
          throw new Error("شماره موبایل یا پسورد معتبر نیست");
        }

        const user = await SeptaUsers.findOne({ number });
        if (!user) throw new Error("کاربر پیدا نشد");

        const valid = await comparePass(password, user.password);
        if (!valid) throw new Error("رمز عبور اشتباه است");
        return { name :user._id.toString()};
      }
    }
  )
  ]

}
export const handler = NextAuth(authOptions)


export {handler as GET , handler as POST}
