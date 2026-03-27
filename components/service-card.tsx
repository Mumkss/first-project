"use client";

import { Reveal } from "@/components/reveal";

type ServiceCardProps = {
  title: string;
  description: string;
};

export function ServiceCard({ title, description }: ServiceCardProps) {
  return (
    <Reveal>
      <article className="group h-full rounded-[26px] border border-[color:var(--border)] bg-[linear-gradient(180deg,rgba(255,255,255,0.02),rgba(255,255,255,0.01))] p-6 transition duration-300 hover:scale-[1.02] hover:border-[color:rgba(78,113,214,0.3)] hover:shadow-[0_0_0_1px_rgba(78,113,214,0.14),0_20px_44px_rgba(0,0,0,0.22)] sm:p-7">
        <div className="flex h-full flex-col justify-between gap-8">
          <div className="space-y-4">
            <span className="block h-px w-12 bg-[linear-gradient(90deg,rgba(94,130,235,0.9),transparent)]" />
            <h3 className="text-2xl font-semibold tracking-[-0.04em] text-white">
              {title}
            </h3>
          </div>
          <p className="text-sm leading-7 text-[var(--muted-strong)]">
            {description}
          </p>
        </div>
      </article>
    </Reveal>
  );
}
