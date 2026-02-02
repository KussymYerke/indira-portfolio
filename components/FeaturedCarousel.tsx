"use client";

import Link from "next/link";
import { useMemo, useRef } from "react";
import { Container } from "@/components/Container";
import { projects } from "@/lib/works-data";

export function FeaturedCarousel() {
  const items = useMemo(() => projects.slice(0, 3), []);
  const scrollerRef = useRef<HTMLDivElement | null>(null);

  const scrollBy = (dir: "left" | "right") => {
    const el = scrollerRef.current;
    if (!el) return;
    const amount = Math.round(el.clientWidth * 0.9);
    el.scrollBy({ left: dir === "left" ? -amount : amount, behavior: "smooth" });
  };

  return (
    <section className="py-14 md:py-18">
      <Container>
        <div className="flex items-end justify-between gap-6">
          <div>
            <div className="text-[12px] tracking-[0.22em] uppercase text-[var(--muted)]">
              актуальные
            </div>
            <h2 className="mt-4 font-serif text-[34px] leading-tight md:text-[44px]">
              Избранные проекты
            </h2>
          </div>

          <div className="hidden md:flex items-center gap-2">
            <button
              onClick={() => scrollBy("left")}
              className="rounded-full border border-[var(--line)] px-4 py-2 text-[12px] tracking-[0.18em] uppercase hover:bg-black/5 transition"
            >
              Prev
            </button>
            <button
              onClick={() => scrollBy("right")}
              className="rounded-full border border-[var(--line)] px-4 py-2 text-[12px] tracking-[0.18em] uppercase hover:bg-black/5 transition"
            >
              Next
            </button>
          </div>
        </div>

        <div
          ref={scrollerRef}
          className="mt-10 flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory scroll-smooth [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {items.map((p) => {
            const cover = p.images?.[0]?.src;
            const meta = [
              p.category === "designer" ? "Дизайнерская съемка" : "Коммерческая съемка",
              p.location || "Алматы",
              p.year ? String(p.year) : null,
            ]
              .filter(Boolean)
              .join(" • ");

            return (
              <Link
                key={p.slug}
                href={`/works/${p.slug}`}
                className="group relative w-[82%] sm:w-[60%] md:w-[48%] lg:w-[42%] shrink-0 snap-start"
              >
                <div className="relative overflow-hidden rounded-[28px] bg-black/5">
                  <div className="aspect-[16/10]">
                    <img
                      src={cover}
                      alt={p.title}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
                      loading="lazy"
                    />
                  </div>

                  {/* overlay on hover (desktop) */}
                  <div className="pointer-events-none absolute inset-0 opacity-0 transition duration-300 group-hover:opacity-100 hidden md:block">
                    <div className="absolute inset-0 bg-black/35" />
                    <div className="absolute inset-x-0 bottom-0 p-7">
                      <div className="font-serif text-white text-[26px] leading-snug">
                        {p.title}
                      </div>
                      <div className="mt-2 text-white/80 text-[11px] tracking-[0.22em] uppercase">
                        {meta}
                      </div>
                    </div>
                  </div>
                </div>

                {/* caption for mobile */}
                <div className="mt-4 md:hidden">
                  <div className="font-serif text-[20px] leading-snug">{p.title}</div>
                  <div className="mt-1 text-[11px] tracking-[0.22em] uppercase text-[var(--muted)]">
                    {meta}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
