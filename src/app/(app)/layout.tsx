import { Header } from "../../components/common";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={"w-screen h-screen bg-black/90 text-white"}>
      <Header />
      <main className="h-[calc(100vh-3.5rem)] flex justify-around scrollY">{children}</main>
    </div>
  );
}
