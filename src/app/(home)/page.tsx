import { Callout } from "fumadocs-ui/components/callout";
import { Card, Cards } from "fumadocs-ui/components/card";
import { Step, Steps } from "fumadocs-ui/components/steps";
import { buttonVariants } from "fumadocs-ui/components/ui/button";
import { cn } from "fumadocs-ui/utils/cn";
import {
  ArrowRight,
  CircuitBoard,
  Landmark,
  ShieldCheck,
  TimerReset,
  Workflow,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import heroBg from "./bg.png";

const pressurePoints = [
  {
    title: "Five vendors, one stalled launch",
    description:
      "Issuers stitch issuance, compliance, custody, trading, settlement, and reporting across brittle APIs. Every handoff multiplies risk and delays go-live dates.",
    icon: <CircuitBoard className="size-6 text-fd-foreground" />,
  },
  {
    title: "Compliance runs outside the asset",
    description:
      "Jurisdiction rules sit in spreadsheets while tokens move unchecked. False positives block clients while edge transfers sneak through and invite regulator questions.",
    icon: <ShieldCheck className="size-6 text-fd-foreground" />,
  },
  {
    title: "Custody fails the diligence call",
    description:
      "Single-sig wallets, missing policy engines, and no recovery flows keep risk committees from approving the plan. Capital never boards the plane.",
    icon: <Landmark className="size-6 text-fd-foreground" />,
  },
  {
    title: "DvP still hides a T+2 spreadsheet",
    description:
      "Cash legs trail tokens across banks, so settlement teams reconcile by hand and investors lose trust in the timeline.",
    icon: <TimerReset className="size-6 text-fd-foreground" />,
  },
];

const dalpLaws = [
  {
    title: "Unified lifecycle core",
    description:
      "Issuance, servicing, secondary trading, settlement, and reporting share one control plane so cap-table truth never drifts.",
  },
  {
    title: "Compliance before state change",
    description:
      "KYC/KYB, accreditation, and jurisdiction policies run in code with on-chain whitelists and audit trails regulators can test.",
  },
  {
    title: "Bank-grade custody + settlement",
    description:
      "MPC or HSM controls, multi-sig policies, recovery workflows, and atomic or near-atomic DvP across tokenized cash and fiat rails.",
  },
  {
    title: "Enterprise control over deployment",
    description:
      "Run on-prem, BYOC, or hardened SaaS with white-label theming, SSO/MFA/SAML/OIDC, RBAC/ABAC, and SIEM-ready logging.",
  },
  {
    title: "Developer + operator instrumentation",
    description:
      "Typed APIs, SDKs, sandboxes, webhooks, and diagnostics mean teams build new products instead of rebuilding plumbing.",
  },
  {
    title: "Proof in the numbers",
    description:
      "Target 99% first-attempt settlement, T+0 outcomes on nearly every lifecycle event, and zero compliance breaches.",
  },
];

const proofPoints = [
  {
    value: "$50B+",
    label: "Real-world assets already tokenized on-chain (2024)",
  },
  {
    value: "$500B+",
    label: "Projected tokenized volume by 2025 without counting stablecoins",
  },
  {
    value: "$230T",
    label: "Addressable real-world asset market waiting on trustworthy rails",
  },
];

const scoreboard = [
  {
    value: "99% T+0",
    label: "Lifecycle settlement success when DALP runs the rails",
  },
  {
    value: "<24h",
    label: "Average KYC turnaround with compliance in the asset path",
  },
  {
    value: "0",
    label:
      "Regulatory incidents tolerated. Audit teams see evidence before settlement.",
  },
];

export default function HomePage() {
  return (
    <main className="flex flex-1 flex-col gap-20 pb-24">
      <section className="relative overflow-hidden border border-fd-border border-r-0 border-l-0 bg-gradient-to-b from-fd-muted/60 via-background to-background px-6 py-16 sm:px-12">
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <Image
            alt=""
            className="object-cover"
            fill
            priority
            src={heroBg}
            style={{
              maskImage:
                "linear-gradient(to bottom left, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.35) 35%, rgba(0,0,0,0.75) 75%, rgba(0,0,0,1) 100%)",
              WebkitMaskImage:
                "linear-gradient(to bottom left, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.35) 35%, rgba(0,0,0,0.75) 75%, rgba(0,0,0,1) 100%)",
            }}
          />
        </div>
        <div className="relative z-[1] flex flex-col">
          <p className="font-semibold text-fd-muted-foreground text-sm uppercase tracking-wider">
            Digital Asset Lifecycle Platform
          </p>
          <h1 className="mt-4 max-w-3xl text-left font-semibold text-4xl leading-tight sm:text-5xl">
            Ground-truth infrastructure for tokenized assets
          </h1>
          <p className="mt-6 max-w-2xl text-left text-fd-muted-foreground text-lg">
            SettleMint&rsquo;s DALP collapses issuance, compliance, custody,
            settlement, and servicing into one programmable system. Regulators
            get ex-ante proof, operations drop the spreadsheets, and investors
            experience predictable settlement windows.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link
              className={cn(
                buttonVariants({ color: "primary" }),
                "gap-2 text-base"
              )}
              href="/docs/dalp"
            >
              Read the DALP story
              <ArrowRight className="size-4" />
            </Link>
            <Link
              className={cn(
                buttonVariants({ color: "ghost" }),
                "gap-1 text-base"
              )}
              href="/docs"
            >
              Browse the book
            </Link>
          </div>
          <dl className="mt-12 grid gap-6 sm:grid-cols-3">
            {proofPoints.map((stat) => (
              <div
                className="rounded-2xl border border-fd-border/60 bg-background/70 px-4 py-6 text-left shadow-fd-border/40 shadow-sm"
                key={stat.label}
              >
                <dt className="font-medium text-fd-muted-foreground text-sm">
                  {stat.label}
                </dt>
                <dd className="mt-2 font-semibold text-2xl text-fd-foreground">
                  {stat.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="mx-auto flex w-full max-w-5xl flex-col gap-10 px-6 sm:px-0">
        <Callout
          className="rounded-3xl border-0 bg-background/90 px-6 py-5"
          title="The stall is real"
          type="warn"
        >
          Real-world assets passed $50B on-chain in 2024 and could top $500B in
          2025. Yet tokenization pilots still snag on fragmentation: compliance
          bolted on after the fact, custody without policy control, and cash
          legs that lag two days behind. Sound familiar?
        </Callout>

        <div className="space-y-6">
          <h2 className="font-semibold text-3xl">
            Why the old stack keeps failing
          </h2>
          <p className="max-w-3xl text-fd-muted-foreground text-lg">
            Chapter one of the Book of Dalp called out the painful truth:
            patchwork solutions invite risk, latency, reconciliation churn, and
            low trust. The table stakes for institutions, investors, and
            developers are much higher than yet another wizard with promises.
          </p>
        </div>

        <Cards className="grid gap-6 sm:grid-cols-2">
          {pressurePoints.map((item) => (
            <Card
              className="h-full rounded-2xl border border-fd-border bg-background/80 p-6"
              description={item.description}
              icon={item.icon}
              key={item.title}
              title={
                <span className="font-semibold text-xl">{item.title}</span>
              }
            />
          ))}
        </Cards>
      </section>

      <section className="w-full bg-fd-muted/20 py-16">
        <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 px-6 sm:px-0">
          <div className="space-y-5 text-left">
            <h2 className="font-semibold text-3xl">
              What makes a true Digital Asset Lifecycle Platform
            </h2>
            <p className="max-w-3xl text-fd-muted-foreground text-lg">
              The Dalp chapter laid down six laws. Miss one and you are back to
              integration theatre. Meet all six and regulators finally nod
              before the first transfer clears.
            </p>
          </div>
          <Cards className="grid gap-6 md:grid-cols-2">
            {dalpLaws.map((law) => (
              <Card
                className="h-full rounded-2xl border border-fd-border bg-background p-6"
                description={law.description}
                key={law.title}
                title={
                  <span className="font-semibold text-lg">{law.title}</span>
                }
              />
            ))}
          </Cards>
        </div>
      </section>

      <section className="mx-auto flex w-full max-w-5xl flex-col gap-10 px-6 sm:px-0">
        <div className="space-y-5">
          <h2 className="font-semibold text-3xl">
            How the DALP moves teams from pilot to production
          </h2>
          <p className="max-w-3xl text-fd-muted-foreground text-lg">
            The experience plane stays human-friendly while the planes beneath
            keep compliance, custody, settlement, and deployment honest. Here is
            the practical flow.
          </p>
        </div>
        <Steps>
          <Step>
            <div className="rounded-2xl border border-fd-border bg-background/80 p-6">
              <div className="mb-4 flex items-center gap-3 text-fd-foreground">
                <Workflow className="size-6" />
                <h3 className="font-semibold text-xl">Experience plane</h3>
              </div>
              <p className="text-fd-muted-foreground">
                Issuer, investor, admin, and developer portals share the same
                cap-table truth. Eligibility calls surface in real time,
                documents settle into anchored storage, and corporate actions
                trigger without hallway triage.
              </p>
            </div>
          </Step>
          <Step>
            <div className="rounded-2xl border border-fd-border bg-background/80 p-6">
              <div className="mb-4 flex items-center gap-3 text-fd-foreground">
                <ShieldCheck className="size-6" />
                <h3 className="font-semibold text-xl">
                  Control, asset, and custody planes
                </h3>
              </div>
              <p className="text-fd-muted-foreground">
                Identity registry, jurisdiction rules, ERC-3643 token factory,
                MPC/HSM key control, and multi-sig policies run before transfers
                execute. Emergency hooks and audit trails are ready for the
                boardroom.
              </p>
            </div>
          </Step>
          <Step>
            <div className="rounded-2xl border border-fd-border bg-background/80 p-6">
              <div className="mb-4 flex items-center gap-3 text-fd-foreground">
                <TimerReset className="size-6" />
                <h3 className="font-semibold text-xl">
                  Settlement and deployment planes
                </h3>
              </div>
              <p className="text-fd-muted-foreground">
                Atomic DvP when rails match, near-simultaneous settlement when
                they do not, ISO 20022 adapters for core banking, cross-chain
                continuity, and deployment choice across on-prem, BYOC, or
                hardened SaaS.
              </p>
            </div>
          </Step>
        </Steps>
      </section>

      <section className="mx-auto flex w-full max-w-5xl flex-col gap-10 px-6 sm:px-0">
        <div className="space-y-5 text-left">
          <h2 className="font-semibold text-3xl">
            Scoreboard executives actually quote
          </h2>
          <p className="max-w-3xl text-fd-muted-foreground text-lg">
            Delivering on the DALP laws means every steering committee sees hard
            evidence instead of hope. These are the targets teams run with
            SettleMint today.
          </p>
        </div>
        <dl className="grid gap-6 sm:grid-cols-3">
          {scoreboard.map((item) => (
            <div
              className="rounded-2xl border border-fd-border bg-background px-4 py-6 text-left shadow-sm"
              key={item.label}
            >
              <dt className="font-medium text-fd-muted-foreground text-sm">
                {item.label}
              </dt>
              <dd className="mt-2 font-semibold text-2xl text-fd-foreground">
                {item.value}
              </dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="mx-auto w-full max-w-4xl rounded-3xl border border-fd-border bg-gradient-to-r from-fd-muted/50 via-background to-fd-muted/30 px-6 py-12 text-left sm:px-12">
        <h2 className="font-semibold text-3xl">Ready to keep reading?</h2>
        <p className="mt-4 max-w-2xl text-fd-muted-foreground text-lg">
          Chapter two shows how SettleMint&rsquo;s DALP collapses fragmentation
          into one programmable platform. Chapter three drills into compliance
          and identity. Grab a coffee and keep the momentum.
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-3">
          <Link
            className={cn(
              buttonVariants({ color: "primary" }),
              "gap-2 text-base"
            )}
            href="/docs"
          >
            Start with chapter one
            <ArrowRight className="size-4" />
          </Link>
          <Link
            className={cn(
              buttonVariants({ color: "secondary" }),
              "gap-1 text-base"
            )}
            href="/docs/dalp"
          >
            Jump to the DALP blueprint
          </Link>
        </div>
      </section>
    </main>
  );
}
