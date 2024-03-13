import { NextResponse } from "next/server";
import {Prisma} from '@prisma/client';
import {prisma} from "@/libs/prisma";
interface Params {
    params: {id: string}};

export async function GET(request: Request, {params} : Params){
    try {
        const post = await prisma.post.findFirst({
            where: {
                id: Number(params.id)
            }
        });

        if (!post)
        return NextResponse.json ({message: "Post not found"}, {status : 404});
        return NextResponse.json(post)
        
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
    

export async function DELETE(request: Request, {params}: Params){

    try {
        const deletedPost = await prisma.post.delete({
            where: {
                id: Number(params.id),
    
            }
        })
        if (!deletedPost) return NextResponse.json({
            message: "Post not found"
        }, {status: 404})
        return NextResponse.json(deletedPost);
        
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            if (error.code === "P2025") {
                return NextResponse.json({
                    message: "Post not found",
                },
                {
                    status: 404,
                });
            }
            return NextResponse.json({
                message: error.message
            }, {
                status: 500,
            })
        }
    };
}

export function PUT(request: Request){
    return NextResponse.json({
        message: "updating single post..."
    })
}