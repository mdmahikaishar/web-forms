export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-screen grid place-items-center bg-black text-white">
      {children}
    </div>
  )
}