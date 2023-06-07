import { NextResponse } from "next/server";
//@ts-ignore
import * as bcrypt from "bcryptjs";
//@ts-ignore
import * as jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL,
    },
  },
});

export async function POST(request: Request) {
  const res = await request.json();
  const { SECRET } = process.env;

  const { username, password } = res;

  const createToken = (username: string, id: number) => {
    return jwt.sign({ username, id }, SECRET, { expiresIn: "2 days" });
  };

  try {
    let foundUser: any;
    try {
      foundUser = await prisma.user.findFirst({
        where: { username: username },
      });
      await prisma.$disconnect()
    } catch (err) {
      console.error(err)
    }
    if (foundUser) {
      const isAuthenticated = bcrypt.compareSync(
        password,
        foundUser.hashedPass
      );
      if (isAuthenticated) {
        const token = createToken(foundUser.username, foundUser.id);
        const exp = Date.now() + 1000 * 60 * 60 * 48;
        return NextResponse.json(
          {
            username: foundUser.username,
            id: foundUser.id,
            token,
            exp,
          },
          {
            status: 200,
          }
        );
      } else {
        return NextResponse.json(
          {
            message: "cannot log in",
          },
          {
            status: 400,
          }
        );
      }
    } else {
      return NextResponse.json(
        {
          message: "cannot log in",
        },
        {
          status: 400,
        }
      );
    }
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      {
        message: err,
      },
      {
        status: 400,
      }
    );
  }
}
