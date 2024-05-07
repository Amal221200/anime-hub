"use server"

import User from "@/models/userModel"
import connectDB from "@/utils/db"
import { genSalt, hash } from "bcrypt-ts"

export async function createUser(userData: { email: string, username: string, password: string }) {
    try {
        await connectDB()
        const userExists = await User.findOne({ $or: [{ email: userData.email }, { username: userData.username }] })

        if (userExists) {
            return { done: false, data: `${userExists.email === userData.email ? 'Email' : 'User'} already exists.` }
        }

        const salt = await genSalt(10);
        const hashedPassword = await hash(userData.password, salt)

        const newUser = new User({ username: userData.username, email: userData.email, password: hashedPassword })

        await newUser.save()

        return { done: true, data: newUser.toJSON() }
    } catch (error) {
        console.log('createUser error', error);
        return { done: false, data: 'Internal Server Error.' }
    }
}