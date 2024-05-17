import { Token } from "@/libs/token";
import { Connection, Table } from "@/services/database";
import { IResponse, IResponseWithUser, IUser } from "@/types";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest, context: { params: { formId: string }}) {
  try {
    const token = Token.validate(request.headers.get("authorization"));
    if (!token) {
      return Response.json({ message: "Token not found"});
    }

    const connection = await Connection.connect();

    const responseTabel = await Table.new<IResponse>(connection.database(), "responses");

    const responses = await responseTabel.findMany({ formId: context.params.formId });

    let data: IResponseWithUser[] = [];

    const userTable = await Table.new<IUser>(connection.database(), "users");

    for (let i = 0; i < responses.length; i++) {
      const item = responses[i];
      const user = await userTable.findById(item.userId)!;

      data.push({
        userName: user!.name as string,
        userEmail: user!.email as string,
        ...item
      });
    }

    await connection.close();

    return Response.json({ responses: data });
  } catch (e: any) {
    return Response.json({ message: "ERR: responses.forms.[formId].get", error: e.message });
  }
}