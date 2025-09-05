// Importer / استيراد
import "./globals.css";
import { Ubuntu } from "next/font/google";
import BottomNav from "@/components/BottomNav";
import UserProvider from "@/context/UserContext";
const ubuntu = Ubuntu({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-ubuntu",
});
export const viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export const metadata = {
  title: "Landrup Dans",
  description: "Find og tilmeld dig aktiviteter",
};
// Komponent / المكوّن الرئيسي

export default function RootLayout({ children }) {
  // UI
  return (
    <html lang="en" className={ubuntu.variable} suppressHydrationWarning>
      <body suppressHydrationWarning>
        <UserProvider>
          <div className="min-h-screen flex flex-col">
            <main className="flex-1 pb-24">{children}</main>
            <BottomNav />
          </div>
        </UserProvider>
      </body>
    </html>
  );
}
