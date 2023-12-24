import Providers from "./providers";
import type { Metadata } from "next";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
export const metadata: Metadata = {
    title: "Chzzk lives with Category",
    description: "치지직의 라이브 방송을 카테고리에 따라 분류하는 사이트입니다.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body className="bg-[#141517] text-[#9da5b6] flex items-center justify-center ">
                <Providers>{children}</Providers> <Analytics />
            </body>
        </html>
    );
}
