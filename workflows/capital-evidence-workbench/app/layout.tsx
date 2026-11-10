import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Neumann · YC Evidence Desk",
  description: "YC Winter 2027 feedback and product evidence tracker",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body className="antialiased">{children}</body>
    </html>
  );
}
