import { IUser } from "../../types";
import server from "./server";

export  async function user(token: string): Promise<IUser> {
  const result = await server.get("/api/auth/user")
    .header("Authorization", token)
    .exec();
    
  return result.user as IUser;
}