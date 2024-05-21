import { getAnime } from "@/lib/actions/anime";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, { params: { animeId } }: { params: { animeId: string } }) {
    const anime = await getAnime(animeId);
    return
}

export async function POST(request: NextRequest) {

}

export async function PUT(request: NextRequest) {

}

export async function DELETE(request: NextRequest) {

}