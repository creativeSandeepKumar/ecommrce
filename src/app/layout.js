
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Layout/Navbar/Navbar";


const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
 

  return (
    <html lang="en" className="light">
      <body className={inter.className}>
        <Navbar />
        {children}
        </body>
    </html>
  );
}
