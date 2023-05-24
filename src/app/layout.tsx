import "./globals.css";
import { Inter } from "next/font/google";
import { AuthContextProvider } from "./context/store";
import { BookContextProvider } from "./context/bookstore";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Narrative Nexus",
  description: "Make your dream books come to life.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthContextProvider>
          <BookContextProvider>
            {children}
          </BookContextProvider>
        </AuthContextProvider>
      </body>
    </html>
  );
}
