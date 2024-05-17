import { IUser } from "../../types";
import server from "./server";

export  async function getUser(token: string, userId: string): Promise<IUser> {
  const result = await server.get(`/api/users/${userId}`)
    .header("Authorization", token)
    .exec();

  return result.user as IUser;
}