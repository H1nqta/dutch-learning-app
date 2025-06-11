import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Navigation from "@/components/layout/Navigation";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "オランダ語学習アプリ",
  description: "インタラクティブなレッスンでオランダ語を学ぼう",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={`${inter.className} bg-gray-50 text-gray-800`}>
        <div className="flex flex-col md:flex-row min-h-screen">
          {/* デスクトップ用サイドバー */}
          <div className="hidden md:block">
            <Navigation />
          </div>
          
          <main className="flex-1 pb-20 md:pb-0">
            <Header />
            <div className="p-4 md:p-8">
              {children}
            </div>
          </main>

          {/* モバイル用ボトムナビゲーション */}
          <div className="md:hidden">
            <Navigation />
          </div>
        </div>
        <Toaster />
      </body>
    </html>
  );
}
