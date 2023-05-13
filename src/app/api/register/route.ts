import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
//@ts-ignore
import * as bcrypt from "bcryptjs";
//@ts-ignore
import * as jwt from "jsonwebtoken";

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  const { SECRET } = process.env;

  const createToken = (username: string, id: number) => {
    return jwt.sign({ username, id }, SECRET, { expiresIn: "2 days" });
  };

  try {
    //@ts-ignore
    const { username, password }: { username: string; password: string } =
      request.body;
    const foundUser = await prisma.user.findFirst({
      where: { username: username },
    });
    if (foundUser) {
      return NextResponse.json(
        {
          message: "cannot create user",
        },
        {
          status: 400,
        }
      );
    } else {
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(password, salt);
      const newUser: any = await prisma.user.create({
        data: {
          username: username,
          hashedPass: hash,
        },
      });
      const token = createToken(newUser.username, newUser.id);
      const exp = Date.now() + 1000 * 60 * 60 * 48;
      return NextResponse.json(
        {
          username: newUser.dataValues.username,
          id: newUser.dataValues.id,
          token,
          exp,
        },
        {
          status: 200,
        }
      );
    }
  } catch (err) {
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
