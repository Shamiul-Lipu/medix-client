import { Footer } from "@/components/layouts/commonLayouts/Footer";
import { Navbar } from "@/components/layouts/commonLayouts/Navbar";

export default function CommonLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
