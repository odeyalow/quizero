import type { Metadata } from "next";

import '../styles/globals.css';

export const metadata: Metadata = {
  title: "Quizero",
  description: "Квизы это не только развлечение, но и отличный способ расширить кругозор, вспомнить интересные факты и просто хорошо провести время.",
  icons: {
    icon: '/icon.ico',
    shortcut: '/icon.ico',
    apple: '/apple-touch-icon',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
