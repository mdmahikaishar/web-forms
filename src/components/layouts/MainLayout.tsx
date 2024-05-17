import { Header } from "../common";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-screen h-screen bg-black/90 text-white">
      <Header />

      <main className="h-[calc(100vh-3.5rem)] flex justify-around">{children}</main>
    </div>
  )
}