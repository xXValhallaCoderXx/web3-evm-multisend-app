import "@/shared/styles/globals.css";
import { FC } from "react";
import { Inter } from "next/font/google";
import RootProvider from "@/shared/Providers";

import type { Metadata } from "next";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Multisend",
  description: "Created with <3 by Renate Gouveia",
};

interface IProps {
  children: React.ReactNode;
}

const RootLayout: FC<IProps> = ({ children }) => {
  return (
    <html lang="en">
      <body className={`${inter.className}`}>
        <RootProvider>{children}</RootProvider>
      </body>
    </html>
  );
};

export default RootLayout;
