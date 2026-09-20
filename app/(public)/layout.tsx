import Header from "@/components/global/header/Header";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="app-layout">
      <Header />
      <main>{children}</main>
    </div>
  );
}
