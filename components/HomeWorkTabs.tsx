"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { byCategory, WorkCategory } from "@/lib/works-data";

function WorkHoverCard({
  href,
  imageSrc,
  title,
  meta,
}: {
  href: string;
  imageSrc: string;
  title: string;
  meta: string;
}) {
  return (
    <Link
      href={href}
      className="group relative block overflow-hidden rounded-[18px] bg-black/5"
      aria-label={title}
    >
      <div className="aspect-[4/3] w-full">
        <img
          src={imageSrc}
          alt={title}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.04]"
          loading="lazy"
        />
      </div>

      {/* hover overlay */}
      <div className="pointer-events-none absolute inset-0 opacity-0 transition duration-300 group-hover:opacity-100 hidden md:block">
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-x-0 bottom-0 p-5">
          <div className="font-serif text-white text-[20px] leading-snug">
            {title}
          </div>
          <div className="mt-2 text-white/80 text-[11px] tracking-[0.22em] uppercase">
            {meta}
          </div>
        </div>
      </div>

      {/* mobile caption */}
      <div className="mt-3 md:hidden px-1 pb-1">
        <div className="font-serif text-[18px] leading-snug">{title}</div>
        <div className="mt-1 text-[11px] tracking-[0.22em] uppercase text-[var(--muted)]">
          {meta}
        </div>
      </div>
    </Link>
  );
}

export function HomeWorksTabs() {
  const [active, setActive] = useState<WorkCategory>("designer");

  const items = useMemo(() => byCategory(active).slice(0, 9), [active]);

  const tabBase =
    "rounded-full px-5 py-3 text-[12px] tracking-[0.18em] uppercase transition";
  const tabActive = "bg-black text-white";
  const tabInactive =
    "border border-[var(--line)] text-[var(--fg)]/80 hover:bg-black/5";

  return (
    <section className="py-14 md:py-18 border-b border-[var(--line)]">
      <div className="mx-auto max-w-[1200px] px-5 md:px-8">
        <div className="flex flex-col gap-8">
          <div className="text-center">
            <div className="text-[12px] tracking-[0.22em] uppercase text-[var(--muted)]">
              портфолио
            </div>
            <h2 className="mt-4 font-serif text-[34px] leading-tight md:text-[44px]">
              Работы
            </h2>
          </div>

          {/* Tabs centered */}
          <div className="flex flex-wrap justify-center gap-3">
            <button
              onClick={() => setActive("designer")}
              className={[
                tabBase,
                active === "designer" ? tabActive : tabInactive,
              ].join(" ")}
            >
              Дизайнерские съемки
            </button>

            <button
              onClick={() => setActive("commercial")}
              className={[
                tabBase,
                active === "commercial" ? tabActive : tabInactive,
              ].join(" ")}
            >
              Коммерческие съемки
            </button>
          </div>

          {/* Grid (like reference) */}
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((p) => {
              const cover = p.images?.[0]?.src || "";
              const meta = [
                active === "designer"
                  ? "Дизайнерская съемка"
                  : "Коммерческая съемка",
                p.location || "Алматы",
                p.year ? String(p.year) : null,
              ]
                .filter(Boolean)
                .join(" • ");

              return (
                <WorkHoverCard
                  key={`${active}-${p.slug}`}
                  href={`/works/${p.slug}`}
                  imageSrc={cover}
                  title={p.title}
                  meta={meta}
                />
              );
            })}
          </div>

          {/* CTA to full works page */}
          <div className="flex justify-center pt-4">
            <Link
              href={`/works?type=${active}`}
              className="rounded-full border border-[var(--line)] px-6 py-3 text-[12px] tracking-[0.18em] uppercase hover:bg-black/5 transition"
            >
              Смотреть все работы →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
