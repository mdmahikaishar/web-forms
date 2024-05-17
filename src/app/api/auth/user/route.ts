import { Token } from "@/libs/token";
import { Connection, Table } from "@/services/database";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const token = Token.validate(request.headers.get("authorization"));
    if (!token) {
      return Response.json({ message: "Token not found"});
    }
    
    const connection = await Connection.connect();
    
    const userTabel = await Table.new<{}>(connection.database(), "users");
    
    const user = await userTabel.findById(token.userId);

    await connection.close();

    if (!user) {
      return Response.json({ message: "User not found."});
    }

    return Response.json({ user });
  } catch (e: any) {
    return Response.json({ message: "ERR: auth.user.get", error: e.message });
  }
}

export async function POST(request: NextRequest) {
  return await GET(request);
}