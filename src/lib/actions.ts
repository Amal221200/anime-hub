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
            return { done: false, data: `${userExists.email === userData.email ? 'Email' : 'User'} already exists.`, status: 401 }
        }

        const salt = await genSalt(10);
        const hashedPassword = await hash(userData.password, salt)

        const newUser = await db.user.create({ data: { username: userData.username, email: userData.email, password: hashedPassword } })
        console.log('user created');

        return { done: true, data: { username: newUser.username, email: newUser.email }, status: 201 }
    } catch (error) {
        console.log('createUser error', error);
        return { done: false, data: 'Internal Server Error.', status: 500 }
    }
}