"use client";
import {
  Content as CollapsiblePrimitiveContent,
  Root as CollapsiblePrimitiveRoot,
  Trigger as CollapsiblePrimitiveTrigger,
} from "@radix-ui/react-collapsible";
import {
  type ComponentPropsWithoutRef,
  forwardRef,
  useEffect,
  useState,
} from "react";
import { cn } from "@/lib/cn";

const Collapsible = CollapsiblePrimitiveRoot;

const CollapsibleTrigger = CollapsiblePrimitiveTrigger;

const CollapsibleContent = forwardRef<
  HTMLDivElement,
  ComponentPropsWithoutRef<typeof CollapsiblePrimitiveContent>
>(({ children, ...props }, ref) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <CollapsiblePrimitiveContent
      ref={ref}
      {...props}
      className={cn(
        "overflow-hidden",
        mounted &&
          "data-[state=closed]:animate-fd-collapsible-up data-[state=open]:animate-fd-collapsible-down",
        props.className
      )}
    >
      {children}
    </CollapsiblePrimitiveContent>
  );
});

CollapsibleContent.displayName = CollapsiblePrimitiveContent.displayName;

export { Collapsible, CollapsibleTrigger, CollapsibleContent };
