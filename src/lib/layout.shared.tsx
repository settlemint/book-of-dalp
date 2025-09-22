import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared";
import Image from "next/image";
import logo from "./settlemint-icon.svg";
/**
 * Shared layout configurations
 *
 * you can customise layouts individually from:
 * Home Layout: app/(home)/layout.tsx
 * Docs Layout: app/docs/layout.tsx
 */
export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: (
        <>
          <Image
            alt="Logo"
            aria-label="Logo"
            height="24"
            src={logo}
            width="24"
          />
          Book of DALP
        </>
      ),
    },
    // see https://fumadocs.dev/docs/ui/navigation/links
    links: [],
  };
}
