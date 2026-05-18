export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex-1 flex items-center justify-center px-4 py-12 bg-[#FAF8F3]">
      <div className="w-full max-w-md">
        {children}
      </div>
    </div>
  )
}
