"use client";

import { Reveal } from "@/components/reveal";

type CaseStudyProps = {
  index: number;
  title: string;
  description: string;
  context: string;
  whatIDid: string;
  outcome: string;
};

export function CaseStudy({
  index,
  title,
  description,
  context,
  whatIDid,
  outcome,
}: CaseStudyProps) {
  const reverse = index % 2 === 1;

  return (
    <Reveal>
      <article
        className={`grid gap-8 rounded-[30px] border border-[color:var(--border)] bg-[linear-gradient(180deg,rgba(255,255,255,0.024),rgba(255,255,255,0.01))] p-6 shadow-[var(--glow)] backdrop-blur-xl md:grid-cols-2 md:p-8 lg:p-10 ${
          reverse ? "md:[&>*:first-child]:order-2" : ""
        }`}
      >
        <div className="space-y-5">
          <span className="inline-flex rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs uppercase tracking-[0.24em] text-[var(--muted)]">
            Case {String(index + 1).padStart(2, "0")}
          </span>
          <div className="space-y-3">
            <h3 className="max-w-md text-2xl font-semibold tracking-[-0.04em] text-white sm:text-3xl">
              {title}
            </h3>
            <p className="max-w-lg text-base leading-7 text-[var(--muted-strong)]">
              {description}
            </p>
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-3 md:grid-cols-1 lg:grid-cols-3">
          <DetailBlock label="Context" text={context} />
          <DetailBlock label="What I did" text={whatIDid} />
          <DetailBlock label="Outcome" text={outcome} />
        </div>
      </article>
    </Reveal>
  );
}

function DetailBlock({ label, text }: { label: string; text: string }) {
  return (
    <div className="rounded-[22px] border border-white/6 bg-white/[0.018] p-5 transition duration-300 hover:scale-[1.02] hover:border-[color:rgba(78,113,214,0.3)] hover:shadow-[0_0_0_1px_rgba(78,113,214,0.12),0_18px_48px_rgba(0,0,0,0.24)]">
      <p className="text-xs uppercase tracking-[0.24em] text-[var(--muted)]">
        {label}
      </p>
      <p className="mt-3 text-sm leading-7 text-[var(--muted-strong)]">{text}</p>
    </div>
  );
}
