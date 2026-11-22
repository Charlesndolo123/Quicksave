
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "QuickSave - Free Media Downloader",
  description:
    "QuickSave makes it easy to access and save supported media from popular platforms.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
