import bcrypt from "bcryptjs"


async function HassPassword(password) {
    const hashedPassword = await bcrypt.hash(password , 12)
    return hashedPassword
}

async function comparePass(Password , HashedPassword) {
    const valid = await bcrypt.compare(Password , HashedPassword)
    return valid
}
export {HassPassword , comparePass}