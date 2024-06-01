"use server"
import db from "../db"

export async function getUser(userId: string) {
    const user = await db.user.findUnique({ where: { externalUserId: userId } })

    return user
}