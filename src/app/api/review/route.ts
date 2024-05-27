import { NextRequest, NextResponse } from "next/server";

export async function GET(request:NextRequest) {
    try {
        return NextResponse.json("")
    } catch (error) {
        return NextResponse.json("Internal Server Error at GET Reviews", {status: 500})
    }
}