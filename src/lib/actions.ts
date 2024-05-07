"use server"

import db from "@/utils/db"
import { genSalt, hash } from "bcrypt-ts"

export async function createUser(userData: { email: string, username: string, password: string }) {
    try {
        const userExists = await db.user.findFirst({
            where: {
                OR: [{ email: userData.email }, { username: userData.username }]
            }
        })

        if (userExists) {
            return { done: false, data: `${userExists.email === userData.email ? 'Email' : 'User'} already exists.` }
        }

        const salt = await genSalt(10);
        const hashedPassword = await hash(userData.password, salt)

        const newUser = await db.user.create({ data: { username: userData.username, email: userData.email, password: hashedPassword } })

        return { done: true, data: newUser }
    } catch (error) {
        console.log('createUser error', error);
        return { done: false, data: 'Internal Server Error.' }
    }
}