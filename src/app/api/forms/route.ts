import { Token } from "@/libs/token";
import { Connection, Table } from "@/services/database";
import { IForm, IMyForm } from "@/types";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const token = Token.validate(request.headers.get("authorization"));
    if (!token) {
      return Response.json({ message: "Token not found"});
    }
    
    const connection = await Connection.connect();

    const formTabel = await Table.new<IForm>(connection.database(), "forms");

    const body = await request.json();

    const form = await formTabel.create({
      userId: token.userId,
      name: body.name,
      describtion: body.describtion,
      fields: body.fields,
    });

    await connection.close();

    return Response.json({ id: form.insertedId });
  } catch (e: any) {
    return Response.json({ message: "ERR: forms.post", error: e.message });
  }
}

export async function GET(request: NextRequest) {
  try {
    const token = Token.validate(request.headers.get("authorization"));
    if (!token) {
      return Response.json({ message: "Token not found"});
    }

    const connection = await Connection.connect();

    const formTabel = await Table.new<IForm>(connection.database(), "forms");

    const forms = await formTabel.findMany({ userId: token.userId });

    const data: IMyForm[] = forms.map(item => ({ _id: item._id, name: item.name, describtion: item.describtion, userId: item.userId }));

    await connection.close();

    return Response.json({ forms });
  } catch (e: any) {
    return Response.json({ message: "ERR: forms.get", error: e.message });
  }
}