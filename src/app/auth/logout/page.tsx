import { Metadata } from "next";
import { logout } from "./action";

export const metadata: Metadata = {
  title: "Logout - Web Forms",
};

export default async function Logout() {  
  return (
    <div className="w-72 h-32 grid place-items-center bg-white/10">
      <form action={logout}>
        <button className="px-8 h-12 font-semibold bg-white/10 rounded-md hover:bg-white/20 active:bg-white/30" type="submit">Logout</button>
      </form>
    </div>
  )
}