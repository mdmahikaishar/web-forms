import { Token } from "@/libs/token";
import { Connection, Table } from "@/services/database";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest, context: { params: { formId: string }}) {
  try {
    const token = Token.validate(request.headers.get("authorization"));
    if (!token) {
      return Response.json({ message: "Token not found"});
    }

    const connection = await Connection.connect();

    const formTabel = await Table.new<{}>(connection.database(), "forms");

    const form = await formTabel.findById(context.params.formId);

    await connection.close();

    return Response.json({ form });
  } catch (e: any) {
    return Response.json({ message: "ERR: forms.[formId].get", error: e.message });
  }
}