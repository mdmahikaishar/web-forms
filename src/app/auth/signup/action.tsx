"use server";
import { cookies } from "next/headers";
import { Connection, Table } from "@/services/database";
import { IUser } from "@/types";
import { redirect } from "next/navigation";
import { Token } from "@/libs/token";

export async function signup(formdata: FormData) {
  const connection = await Connection.connect();

  const userTabel = await Table.new<IUser>(connection.database(), "users");

  const user = await userTabel.create({
    name: formdata.get("name") as string,
    email: formdata.get("email") as string,
    password: formdata.get("password") as string,
  });

  await connection.close();

  const token = Token.generate({ userId: user.insertedId });

  cookies().set("token", token);

  redirect("/");
}