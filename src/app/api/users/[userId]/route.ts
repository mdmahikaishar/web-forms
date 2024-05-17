import { Connection, Table } from "@/services/database";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest, context: { params: { userId: string }}) {
  try {
    const connection = await Connection.connect();

    const userTabel = await Table.new<{}>(connection.database(), "users");

    const user = await userTabel.findById(context.params.userId);
 
    await connection.close();
    
    if (!user) {
      return Response.json({ message: "User not found. "});
    }

    return Response.json({ user });
  } catch (e: any) {
    return Response.json({ message: "ERR: users.[userId].get", error: e.message });
  }
}