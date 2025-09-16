"use server"

import SeptaUsers from "@/models/Users";
import ConnectDB from "@/utils/ConnectDB";

export default async function CreateUser(password , number) {
   
    try {
        await ConnectDB()
        const exitingUser = await SeptaUsers.findOne({number})
        if (exitingUser){
            const exist = "exist"
            return exist
        }
        const newUser = await SeptaUsers.create({password , number})
        return newUser.number
    } catch (error) {
        console.log(error.message)
    }
}