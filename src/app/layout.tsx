import "@/app/global.css";
import { RootProvider } from "fumadocs-ui/provider";
import { Geist_Mono } from "next/font/google";

const geistMono = Geist_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export default function Layout({ children }: LayoutProps<"/">) {
  return (
    <html className={geistMono.className} lang="en" suppressHydrationWarning>
      <body className="flex min-h-screen flex-col">
        <RootProvider>{children}</RootProvider>
      </body>
    </html>
  );
}
