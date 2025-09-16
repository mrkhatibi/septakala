"use client";
import Header from "@/layout/Header";
import "./globals.css";
import Footer from "@/layout/Footer";
import localFont from "next/font/local";
import { usePathname } from "next/navigation";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import DataProvider from "@/reducer/CartReducer";
import { useEffect } from "react";

const BYekan = localFont({
  src: "../../public/fonts/BYekan+.ttf",
  display: "swap",
  variable: "--font-Byekan",
});
export default function RootLayout({ children }) {
   useEffect(() => {
    document.title = " سپتاکالا | SeptaKala ";
  }, []);
  const queryClient = new QueryClient();
  const pathname = usePathname();
  return (
    <html lang="fa" dir="rtl" className={BYekan.variable}>
      
      <DataProvider>

      <QueryClientProvider client={queryClient}>
        <body className="body">
          
          <header className="header">
            <Header key={pathname} />
          </header>
          <main>{children}</main>
          <footer className="footer">
            <Footer />
          </footer>
        </body>
      </QueryClientProvider>
      </DataProvider>
    </html>
  );
}
