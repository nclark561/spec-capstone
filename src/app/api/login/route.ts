import User from "@/util/models/user";
import { NextResponse } from "next/server";
//@ts-ignore
import * as bcrypt from "bcryptjs";
//@ts-ignore
import * as jwt from "jsonwebtoken";

export async function POST(request: Request) {
  const { SECRET } = process.env;

  const createToken = (username: string, id: number) => {
    return jwt.sign({ username, id }, SECRET, { expiresIn: "2 days" });
  };

  return NextResponse.json(
    {
      message: "nice",
    },
    {
      status: 200,
    }
  );
}
