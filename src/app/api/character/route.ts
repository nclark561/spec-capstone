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
  const { searchParams } = new URL(request.url);
  const bookIdString = searchParams.get("bookId");
  const bookId = Number(bookIdString)

  let charList;

  try {
    charList = await prisma.character.findMany({
      where: { bookId },
    });
    await prisma.$disconnect();
  } catch (err) {
    console.error(err);
    await prisma.$disconnect();
    process.exit(1);
  }

  if (charList) {
    return NextResponse.json(
      {
        charList,
      },
      {
        status: 200,
      }
    );
  }
  return NextResponse.json(
    {
      message: "ERROR retrieving character data",
    },
    {
      status: 400,
    }
  );
}

export async function POST(request: NextRequest) {
  const { name, role, description } = await request.json();
  const { searchParams } = new URL(request.url);
  const bookId = searchParams.get("bookId");

  let newChar;

  try {
    newChar = await prisma.character.create({
      data: {
        name,
        role,
        description,
        //@ts-ignore
        bookId: +bookId,
      },
    });
    await prisma.$disconnect();
  } catch (err) {
    console.error(err);
    await prisma.$disconnect();
    process.exit(1);
  }

  if (newChar) {
    return NextResponse.json(
      {
        newChar,
      },
      {
        status: 200,
      }
    );
  }
  return NextResponse.json(
    {
      message: "ERROR creating character",
    },
    {
      status: 400,
    }
  );
}

export async function DELETE(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  let deleteUser

  try {
    deleteUser = await prisma.character.delete({
      //@ts-ignore
      where: { id: +id },
    });
    await prisma.$disconnect();
  } catch (err) {
    console.error(err);
    await prisma.$disconnect();
    process.exit(1);
  }
  if(deleteUser) {
    return NextResponse.json({
      message: 'character successfully deleted'
    },
    {
      status: 200
    })
  }
  return NextResponse.json({
    message: 'character not deleted'
  }, {
    status: 400
  })
}

export async function PUT(request: NextRequest){
  const { name, role, description } = await request.json();
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  let updateChar

  try {
    updateChar = await prisma.character.update({
      //@ts-ignore
      where: {id: +id},
      data: {
        name: name,
        role: role,
        description: description
      }
    })
    await prisma.$disconnect()
  } catch (err) {
    console.error(err)
    await prisma.$disconnect()
    process.exit(1)
  }
  if (updateChar) {
    return NextResponse.json({
      updateChar
    },{
      status:200
    })
  }
  return NextResponse.json({
    message: 'error updating character'
  },{
    status: 400
  })
}