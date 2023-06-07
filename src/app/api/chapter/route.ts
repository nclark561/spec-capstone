import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({
    datasources: {
      db: {
        url: process.env.DATABASE_URL,
      },
    },
  })

export async function GET(request: NextRequest){
    const { searchParams } = new URL(request.url)
    const bookId = searchParams.get("bookId")

    let chapterList

    try {
        chapterList = await prisma.chapter.findMany({
            //@ts-ignore
            where: {bookId: +bookId}
        })
        await prisma.$disconnect()
    } catch (err) {
        console.error(err)
        prisma.$disconnect()
        process.exit(1)
    }

    if(chapterList) {
        return NextResponse.json({
            chapterList
        },{
            status: 200
        })
    }
    return NextResponse.json({
        message: 'error retrieving chapters'
    },{
        status: 400
    })
}

export async function POST(request: NextRequest){
    const { num, name, outline } = await request.json()
    const { searchParams } = new URL(request.url)
    const bookId = searchParams.get("bookId")

    let newChapter

    try {
        newChapter = await prisma.chapter.create({
            data: {
                num: +num,
                name,
                outline,
                //@ts-ignore
                bookId: +bookId
            }
        })
        await prisma.$disconnect()
    } catch (err) {
        console.error(err) 
        await prisma.$disconnect()
        process.exit(1)
    }

    if(newChapter) {
        return NextResponse.json({
            newChapter
        },{
            status: 200
        })
    }
    return NextResponse.json({
        message: 'error creating chapter'
    },{
        status: 400
    })
}

export async function PUT(request: NextRequest){
    const { num, name, outline } = await request.json()
    const { searchParams } = new URL(request.url)
    const id = searchParams.get("id")

    let updateChapter

    try {
        updateChapter = await prisma.chapter.update({
            //@ts-ignore
            where: {id: +id},
            data: {
                num: +num,
                name,
                outline,
            }
        })
        await prisma.$disconnect()
    } catch (err) {
        console.error(err) 
        await prisma.$disconnect()
        process.exit(1)
    }

    if(updateChapter) {
        return NextResponse.json({
            updateChapter
        },{
            status: 200
        })
    }
    return NextResponse.json({
        message: 'error updating chapter'
    },{
        status: 400
    })
}

export async function DELETE(request: NextRequest){
    const { searchParams } = new URL(request.url)
    const id = searchParams.get("id")

    let deleteChapter

    try {
        deleteChapter = await prisma.chapter.delete({
            //@ts-ignore
            where: {id: +id}
        })
        await prisma.$disconnect()
    } catch (err) {
        console.error(err)
        await prisma.$disconnect()
        process.exit(1)
    }

    if(deleteChapter) {
        return NextResponse.json({
            message: 'chapter successfully deleted'
        },{
            status: 200
        })
    }
    return NextResponse.json({
        message: 'error deleting chapter'
    },{
        status: 400
    })
}