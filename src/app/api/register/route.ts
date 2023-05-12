import User from "@/util/models/user";
import sequelize from "@/util/database";
import { NextRequest, NextResponse } from "next/server";
//@ts-ignore
import * as bcrypt from "bcryptjs";
//@ts-ignore
import * as jwt from "jsonwebtoken";

export async function POST(request: NextRequest) {
  const { SECRET } = process.env;

  const createToken = (username: string, id: number) => {
    return jwt.sign({ username, id }, SECRET, { expiresIn: "2 days" });
  };

  try {
    //@ts-ignore
    const { username, password } = request.body;
    const foundUser = await User.findOne({ where: { username: username } });
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
      const newUser = await User.create({
        username: username,
        hashedPass: hash,
      });
      const token = createToken(
        newUser.dataValues.username,
        newUser.dataValues.id
      );
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
    return NextResponse.json({
      message: err
    }, {
      status: 400
    })
  }
}
