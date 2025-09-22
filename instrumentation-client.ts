import posthog from "posthog-js";

const posthogKey = process.env.NEXT_PUBLIC_POSTHOG_KEY;

if (!posthogKey) {
  throw new Error("Missing NEXT_PUBLIC_POSTHOG_KEY.");
}

posthog.init(posthogKey, {
  api_host: "/ingest",
  ui_host: "https://eu.posthog.com",
  defaults: "2025-05-24",
  capture_exceptions: true,
  debug: process.env.NODE_ENV === "development",
});
