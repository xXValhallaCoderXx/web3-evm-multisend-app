import { FC } from "react";
import type { Metadata } from "next";
import "@/shared/styles/globals.css";

import RootProvider from "@/shared/Providers";

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
      <body>
        <RootProvider>{children}</RootProvider>
      </body>
    </html>
  );
};

export default RootLayout;
