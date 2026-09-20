import type { Metadata } from "next";
import AuthProvider from "./auth/Provider";
import { ChakraProviders } from "../utils/ui/providers";
import { fonts } from '../utils/ui/fonts';

export const metadata: Metadata = {
  title: "PT Notifications",
  description: "Internal clinic tool for patient room notifications",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className = {fonts.rubik.variable} suppressHydrationWarning>
      <body suppressHydrationWarning>
        <ChakraProviders>
          <AuthProvider>
            <main>{children}</main>
          </AuthProvider>
        </ChakraProviders>
      </body>
    </html>
  );
}
