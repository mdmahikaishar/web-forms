"use server";
import { cookies } from "next/headers";
import { Connection, Table } from "@/services/database";
import { IUser } from "@/types";
import { redirect } from "next/navigation";
import { Token } from "@/libs/token";

export async function login(formdata: FormData) {
  const connection = await Connection.connect();

  const userTabel = await Table.new<IUser>(connection.database(), "users");

  const user = await userTabel.find({ email: formdata.get("email") as string });
  
  await connection.close();
  
  if (!user) { 
    return;
  }

  if (user.password !== formdata.get("password")) {
    return;
  }
  
  const token = Token.generate({ userId: user._id });

  cookies().set("token", token);

  redirect("/");
}