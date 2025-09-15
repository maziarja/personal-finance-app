import type { Metadata } from "next";
import "./globals.css";
import { Public_Sans } from "next/font/google";
import { ModalProvider } from "./_contexts/modalContext";

export const metadata: Metadata = {
  title: {
    template: "%s | Finance",
    default: "Finance",
  },
  description:
    "A simple and powerful app to track expenses, manage budgets, and stay in control of your money.",
};

const publicSans = Public_Sans({
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${publicSans.className} antialiased`}>
        <ModalProvider>{children}</ModalProvider>
      </body>
    </html>
  );
}
