import { NextResponse } from "next/server"
import {prisma} from "@/libs/prisma"

export async function GET(){
    try{
        const posts = await prisma.post.findMany()
        return NextResponse.json(posts);
    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json({
                message: error.message
            }, {
                status: 500,
            })
        }
    };
}

export async function POST(request: Request){
    try {
        const {userId, title, content} = await request.json();
        const newPost = await prisma.post.create({
        data:{
            userId,
            title,
            content
        },
    });

    return NextResponse.json(newPost)
    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json({
                message: error.message
            }, {
                status: 500,
            })
        }
    };
}