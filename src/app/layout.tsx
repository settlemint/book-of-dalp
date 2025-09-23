import "@/app/global.css";
import { RootProvider } from "fumadocs-ui/provider";
import type { Metadata } from "next";
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

export const metadata: Metadata = {
  title: {
    default: "The Book of DALP | SettleMint",
    template: "%s | The Book of DALP | SettleMint",
  },
  applicationName: "The Book of DALP",
  generator: "SettleMint",
  description:
    "The Book of DALP is a comprehensive guide to the SettleMint Digital Asset Lifecycle Platform.",
  keywords: [
    "blockchain",
    "SettleMint",
    "blockchain transformation",
    "asset tokenization",
    "digital asset lifecycle platform",
    "digital asset lifecycle",
    "digital asset",
    "digital asset platform",
    "digital asset platform",
  ],
  authors: [{ name: "SettleMint", url: "https://www.settlemint.com" }],
  creator: "SettleMint",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://book-of-dalp.settlemint.com",
    title: "The Book of DALP",
    description:
      "The Book of DALP is a comprehensive guide to the SettleMint Digital Asset Lifecycle Platform.",
    siteName: "The Book of DALP",
  },
  twitter: {
    card: "summary_large_image",
    title: "The Book of DALP",
    description:
      "The Book of DALP is a comprehensive guide to the SettleMint Digital Asset Lifecycle Platform.",
    creator: "@SettleMintCom",
  },
  icons: {
    icon: "/favicon.ico",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  other: {
    "darkreader-lock": "",
  },
};
