import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("id");

  let userBook;

  try {
    userBook = await prisma.book.findMany({
      //@ts-ignore
      where: { userId: +userId },
    });
    await prisma.$disconnect();
  } catch (err) {
    console.error(err);
    await prisma.$disconnect();
    process.exit(1);
  }
  return NextResponse.json(
    {
      userBook,
    },
    {
      status: 200,
    }
  );
}

export async function POST(request: NextRequest) {
  const { userId, title, summary, setting } = await request.json();

  let newBook;
  try {
    newBook = await prisma.book.create({
      data: {
        title,
        summary,
        setting,
        userId: +userId
      },
    });
    await prisma.$disconnect();
  } catch (err) {
    console.error(err);
    await prisma.$disconnect();
    process.exit(1);
  }
  return NextResponse.json(
    {
      message: "book successfully created",
      newBook,
    },
    {
      status: 200,
    }
  );
}

export async function DELETE(request: NextRequest){
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  let deleteBook

  try {
    deleteBook = await prisma.book.delete({
      //@ts-ignore
      where: {id: +id}
    })
    await prisma.$disconnect()
  } catch (err) {
    console.error(err)
    await prisma.$disconnect()
    process.exit(1)
  }

  if (deleteBook) {
    return NextResponse.json({
      message: 'book successfully deleted'
    },{
      status: 200
    })
  }
  return NextResponse.json({
    message: 'error deleting book'
  },{
    status: 400
  })
}

export async function PUT(request: NextRequest){
  const { title, summary, setting } = await request.json();
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  let updateBook

  try {
    updateBook = await prisma.book.update({
      //@ts-ignore
      where: {id: +id},
      data: {
        title: title,
        setting: setting,
        summary: summary
      }
    })
    await prisma.$disconnect()
  } catch (err) {
    console.error(err)
    await prisma.$disconnect()
    process.exit(1)
  }

  if (updateBook) {
    return NextResponse.json({
      updateBook
    },{
      status: 200
    })
  }
  return NextResponse.json({
    message: 'error updating book'
  },{
    status: 400
  })
}