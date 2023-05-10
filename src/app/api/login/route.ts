import sequelize from "@/util/database"
import { NextResponse } from "next/server"

export async function POST(request: Request) {

    return NextResponse.json({
      message: 'nice'
    }, {
      status: 200
    })
  }