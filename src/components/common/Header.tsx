import Link from "next/link";
import { BiLogOut } from "react-icons/bi";

export default function Header() {
  return (
    <header className="border-b-2 border-white/20">
      <div className="mx-auto container h-14 px-8 flex items-center justify-between">
        <div className="">
          <Link className="font-semibold text-xl text-white/90" href="/">WebForms</Link>
        </div>

        <div className="flex items-center space-x-1">
          <Link className="h-10 w-10 grid place-items-center text-sm font-semibold rounded-md hover:bg-red-500/20 active:bg-red-500/50" href="/auth/logout">
            <BiLogOut className="text-xl text-whtie/90" />
          </Link>
        </div>
      </div>
    </header>
  )
}