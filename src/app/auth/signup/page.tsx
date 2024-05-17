import Link from "next/link";
import { signup } from "./action";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Signup - Web Forms",
};

export default async function SignupPage() {  
  return (
    <div className="w-72 px-8 py-8 bg-white/10">
      <div className="mb-8 text-center">
        <h1 className="mb-2 text-2xl font-semibold">Signup</h1>
        <p className="text-sm text-white/50">Connected with the world.</p>
      </div>

      <div className="">
        <form className="flex flex-col gap-4" action={signup}>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold" htmlFor="name">Name</label>
            <input className="w-full px-4 py-2 bg-white/10 outline-none" type="text" name="name" id="name" placeholder="Example User" required />
            {false && <span className="block text-xs font-semibold text-right text-red-500/50">Error message.</span>}
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold" htmlFor="email">Email</label>
            <input className="w-full px-4 py-2 bg-white/10 outline-none" type="text" name="email" id="email" placeholder="example@email.com" required  />
            {false && <span className="block text-xs font-semibold text-right text-red-500/50">Error message.</span>}
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold" htmlFor="password">Password</label>
            <input className="w-full px-4 py-2 bg-white/10 outline-none" type="password" name="password" id="password" placeholder="********" required  />
            {false && <span className="block text-xs font-semibold text-right text-red-500/50">Error message.</span>}
          </div>

          <div className="mt-4">
            <button className="w-full h-10 text-sm font-semibold bg-white/10 disabled:bg-white/5 hover:bg-white/20" type="submit" disabled={false}>Signup</button>
            
            <div className="mt-2 text-center text-sm text-white/50 select-none">
              Have an account? <Link className="font-semibold text-blue-500 hover:text-blue-300" href="/auth/login">Login</Link>
            </div>
          </div>

        </form>
      </div>
    </div>
  )
}