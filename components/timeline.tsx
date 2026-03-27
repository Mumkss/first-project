"use client";

import { Reveal } from "@/components/reveal";

type TimelineItem = {
  title: string;
  company: string;
  period: string;
  description: string;
};

export function Timeline({ items }: { items: TimelineItem[] }) {
  return (
    <div className="relative pl-6 sm:pl-8">
      <div className="absolute bottom-0 left-[9px] top-0 w-px bg-[linear-gradient(180deg,rgba(78,113,214,0.34),rgba(255,255,255,0.04))] sm:left-3" />
      <div className="space-y-8">
        {items.map((item) => (
          <Reveal key={`${item.title}-${item.company}`}>
            <article className="relative rounded-[28px] border border-[color:var(--border)] bg-[linear-gradient(180deg,rgba(255,255,255,0.022),rgba(255,255,255,0.01))] p-6 transition duration-300 hover:scale-[1.02] hover:border-[color:rgba(78,113,214,0.26)] hover:shadow-[0_0_0_1px_rgba(78,113,214,0.1),0_18px_42px_rgba(0,0,0,0.22)] sm:p-7">
              <span className="absolute -left-[23px] top-8 h-3 w-3 rounded-full border border-[color:rgba(94,130,235,0.7)] bg-[var(--background)] shadow-[0_0_0_6px_rgba(11,11,12,1)] sm:-left-[31px]" />
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div className="space-y-2">
                  <p className="text-xs uppercase tracking-[0.24em] text-[var(--muted)]">
                    {item.company}
                  </p>
                  <h3 className="text-2xl font-semibold tracking-[-0.04em] text-white">
                    {item.title}
                  </h3>
                </div>
                <p className="text-sm text-[var(--muted)]">{item.period}</p>
              </div>
              <p className="mt-5 max-w-3xl text-sm leading-7 text-[var(--muted-strong)]">
                {item.description}
              </p>
            </article>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
