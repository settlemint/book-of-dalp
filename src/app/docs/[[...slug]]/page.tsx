import { createRelativeLink } from "fumadocs-ui/mdx";
import {
  DocsBody,
  DocsDescription,
  DocsPage,
  DocsTitle,
} from "fumadocs-ui/page";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import posthog from "posthog-js";
import {
  type FeedbackPayload,
  Feedback as FeedbackWidget,
} from "@/components/feedback";
import { LLMCopyButton, ViewOptions } from "@/components/page-actions";
import { source } from "@/lib/source";
import { getMDXComponents } from "@/mdx-components";

async function captureDocsFeedback(feedback: FeedbackPayload) {
  await Promise.resolve(posthog.capture("on_rate_docs", feedback));
}

export default async function Page(props: PageProps<"/docs/[[...slug]]">) {
  const params = await props.params;
  const page = source.getPage(params.slug);
  if (!page) {
    notFound();
  }

  const MDXContent = page.data.body;

  return (
    <DocsPage full={page.data.full} toc={page.data.toc}>
      <div className="flex flex-row items-center justify-between">
        <DocsTitle>{page.data.title}</DocsTitle>
        <div className="flex flex-row items-center gap-2">
          <LLMCopyButton markdownUrl={`${page.url}.mdx`} />
          <ViewOptions
            githubUrl={`https://github.com/settlemint/book-of-dalp/blob/main/content/docs/${page.path}`}
            markdownUrl={`${page.url}.mdx`}
          />
        </div>
      </div>
      <DocsDescription>{page.data.description}</DocsDescription>
      <DocsBody>
        <MDXContent
          components={getMDXComponents({
            // this allows you to link to other pages with relative file paths
            a: createRelativeLink(source, page),
          })}
        />
      </DocsBody>
      <FeedbackWidget
        onRateAction={async (_url, feedback) => {
          "use server";
          await captureDocsFeedback(feedback);
          return {
            githubUrl: `https://github.com/settlemint/book-of-dalp/blob/main/content/docs/${page.path}`,
          };
        }}
      />
    </DocsPage>
  );
}

export function generateStaticParams() {
  return source.generateParams();
}

export async function generateMetadata(
  props: PageProps<"/docs/[[...slug]]">
): Promise<Metadata> {
  const params = await props.params;
  const page = source.getPage(params.slug);
  if (!page) {
    notFound();
  }

  return {
    title: page.data.title,
    description: page.data.description,
  };
}
