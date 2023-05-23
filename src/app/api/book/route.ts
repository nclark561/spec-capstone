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
        userId,
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
