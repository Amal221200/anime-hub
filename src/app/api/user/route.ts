import { createUser } from "@/lib/actions";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    const { email, username, password } = await request.json()

    if (!email || !username || !password) {
        return NextResponse.json("Invalid credentials", { status: 401 })
    }

    const res = await createUser({ email, username, password });

    if (!res.done) {
        return NextResponse.json(res.data, { status: res.status })
    }

    return NextResponse.json(res.data, { status: 201 })

}