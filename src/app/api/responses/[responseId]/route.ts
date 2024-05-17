import { Token } from "@/libs/token";
import { Connection, Table } from "@/services/database";
import { IResponse, IUser } from "@/types";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest, context: { params: { responseId: string }}) {
  try {
    const token = Token.validate(request.headers.get("authorization"));
    if (!token) {
      return Response.json({ message: "Token not found"});
    }

    const connection = await Connection.connect();

    const responseTabel = await Table.new<IResponse>(connection.database(), "responses");

    const response = await responseTabel.findById(context.params.responseId);

    const userTable = await Table.new<IUser>(connection.database(), "users");

    const user = await userTable.findById(response!.userId);

    await connection.close();

    return Response.json({ response: { ...response, userName: user!.name, userEmail: user!.email } });
  } catch (e: any) {
    return Response.json({ message: "ERR: responses.[responseId].get", error: e.message });
  }
}