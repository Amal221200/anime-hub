import { Blog } from "@prisma/client";

export type BlogType = Blog & { author: { username: string, imageUrl: string } }