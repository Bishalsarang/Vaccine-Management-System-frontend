export function BasePage({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen items-center  justify-center bg-gray-100">
      <div className="container mx-auto items-center p-4">{children}</div>
    </div>
  );
}
