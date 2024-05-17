import { Token } from "@/libs/token";
import { Connection, Table } from "@/services/database";
import { IForm, IMyResponse, IResponse } from "@/types";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const token = Token.validate(request.headers.get("authorization"));
    if (!token) {
      return Response.json({ message: "Token not found"});
    }
    
    const connection = await Connection.connect();

    const responseTabel = await Table.new<IResponse>(connection.database(), "responses");

    const body = await request.json();

    const response = await responseTabel.create({
      userId: token.userId,
      formId: body.formId,
      texts: body.texts,
      selections: body.selections,
      files: body.files,
    });

    await connection.close();

    return Response.json({ id: response.insertedId });
  } catch (e: any) {
    return Response.json({ message: "ERR: responses.post", error: e.message });
  }
}

export async function GET(request: NextRequest) {
  try {
    const token = Token.validate(request.headers.get("authorization"));
    if (!token) {
      return Response.json({ message: "Token not found"});
    }

    const connection = await Connection.connect();

    const responseTabel = await Table.new<IResponse>(connection.database(), "responses");

    const responses = await responseTabel.findMany({ userId: token.userId  });

    const formTabel = await Table.new<IForm>(connection.database(), "forms");

    let data: IMyResponse[] = [];

    for (let i = 0; i < responses.length; i++) {
      const item = responses[i];

      const form = await formTabel.findById(item.formId)!;

      data.push({
        _id: item._id,
        formId: form?._id as unknown as string,
        formName: form?.name as string,
        describtion: form?.describtion as string,
      });
    }

    await connection.close();

    return Response.json({ responses: data });
  } catch (e: any) {
    return Response.json({ message: "ERR: responses.get", error: e.message });
  }
}