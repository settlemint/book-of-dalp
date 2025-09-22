"use client";

import type { TOCItemType } from "fumadocs-core/server";
import { ChevronDown } from "lucide-react";
import type { ComponentProps } from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { cn } from "@/lib/cn";

const TOC_INDENT_PX = 12;

export type InlineTocProps = ComponentProps<typeof Collapsible> & {
  items: TOCItemType[];
};

export function InlineTOC({ items, ...props }: InlineTocProps) {
  return (
    <Collapsible
      {...props}
      className={cn(
        "not-prose rounded-lg border bg-fd-card text-fd-card-foreground",
        props.className
      )}
    >
      <CollapsibleTrigger className="group inline-flex w-full items-center justify-between px-4 py-2.5 font-medium">
        {props.children ?? "Table of Contents"}
        <ChevronDown className="size-4 transition-transform duration-200 group-data-[state=open]:rotate-180" />
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div className="flex flex-col p-4 pt-0 text-fd-muted-foreground text-sm">
          {items.map((item) => (
            <a
              className="border-s py-1.5 hover:text-fd-accent-foreground"
              href={item.url}
              key={item.url}
              style={{
                paddingInlineStart: TOC_INDENT_PX * Math.max(item.depth - 1, 0),
              }}
            >
              {item.title}
            </a>
          ))}
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}
