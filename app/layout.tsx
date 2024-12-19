"use client";

import localFont from "next/font/local";
import "./globals.css";
import Header from "@/components/Header";
import ReactQueryProvider from "@/query/ReactQueryProvider";
import { AuthProvider } from "@/context/AuthContext";
import Footer from "@/components/Footer";
import { Provider } from "react-redux";
import { store } from "@/store/store";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Provider store={store}>
          <ReactQueryProvider>
            <AuthProvider>
              <Header />
              {children}
              <Footer />
            </AuthProvider>
          </ReactQueryProvider>
        </Provider>
      </body>
    </html>
  );
}