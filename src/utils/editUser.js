"use server"

import SeptaUsers from "@/models/Users"
import ConnectDB from "./ConnectDB"



export default async function editUser({id ,name , lastName , email , address}) {
    try {
        await ConnectDB()
        const findUser  = await SeptaUsers.findByIdAndUpdate(id , {name , lastName , email , address})
        return JSON.parse(JSON.stringify(findUser))
    } catch (error) {
       console.log(error.message) 
    }
}