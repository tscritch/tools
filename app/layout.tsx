import { ScrollAreaVertical } from "@components/scroll-area/scroll-area";
import { Inter } from "@next/font/google";
import classnames from "classnames";

import "./globals.css";
import { MainNav } from "./main-nav";

interface Props {
  children: React.ReactNode;
}

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }: Props) {
  const classNames = classnames("h-full w-full", inter.className);

  return (
    <html lang="en" className={classNames}>
      <body className="h-full w-full flex m-0 p-0">
        <MainNav />

        <ScrollAreaVertical className="h-full w-full">
          {children}
        </ScrollAreaVertical>
      </body>
    </html>
  );
}
