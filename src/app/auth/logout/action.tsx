"use server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function logout(formdata: FormData) {
  cookies().set("token", "");

  redirect("/auth/login");
}