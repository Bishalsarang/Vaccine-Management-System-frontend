function BasePage({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">{children}</div>
    </div>
  );
}

export default BasePage;
