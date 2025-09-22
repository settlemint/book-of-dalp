import { DocsLayout } from "fumadocs-ui/layouts/docs";
import { Sparkles } from "lucide-react";
import { baseOptions } from "@/lib/layout.shared";
import { source } from "@/lib/source";

export default function Layout({ children }: LayoutProps<"/docs">) {
  const base = baseOptions();
  // Append an icon link so it renders alongside the theme toggle in the sidebar footer.
  const links = [
    ...(base.links ?? []),
    {
      type: "icon" as const,
      url: "/llms-full.txt",
      label: "Open the full LLM transcript",
      text: "Full LLM transcript",
      icon: <Sparkles aria-hidden="true" className="size-4" />,
    },
  ];

  return (
    <DocsLayout {...base} links={links} tree={source.pageTree}>
      {children}
    </DocsLayout>
  );
}
