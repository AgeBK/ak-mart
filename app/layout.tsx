import type { Metadata } from "next";
import "@/app/css/global.css";

export const metadata: Metadata = {
  title: " AK mart - The biggest range at the best prices guaranteed!!",
  description:
    "AK mart - All of your family's clothing needs at the best prices guaranteed!! Extensive range of quality clothing for all occasions",
  icons: {
    icon: "/favicon.ico",
  },
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
