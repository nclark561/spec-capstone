import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL,
    },
  },
});

export async function GET(request: NextRequest) {
  const { pathname } = new URL(request.url)
  const parts = pathname.split('/')
  const id = parts.pop()

  let userBook;

  try {
    userBook = await prisma.book.findFirst({
      //@ts-ignore
      where: { id: +id },
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