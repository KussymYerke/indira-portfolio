"use client";

import { useState } from "react";
import { Container } from "@/components/Container";
import { LeadModal } from "@/components/LeadModal";

export function LeadCtaSection({
  instagramUrl,
  phone,
  city = "Алматы",
}: {
  instagramUrl: string;
  phone: string;
  city?: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <section className="border-y border-[var(--line)] bg-black/[0.02]">
      {/* на мобильных меньше воздуха */}
      <Container className="py-14 md:py-24">
        <div className="mx-auto max-w-[980px] text-center">
          <div className="text-[11px] tracking-[0.28em] uppercase text-[var(--muted)]">
            для работы
          </div>

          <h2 className="mt-6 font-serif text-[32px] leading-[1.08] sm:text-[40px] md:text-[64px]">
            Давайте снимем ваш проект красиво и честно.
          </h2>

          <p className="mx-auto mt-6 max-w-[70ch] text-[15px] leading-7 text-[var(--muted)]">
            Интерьерные съёмки для дизайнеров и брендов — свет, фактуры, композиция
            и “воздух” в кадре.
          </p>

          <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <button
              onClick={() => setOpen(true)}
              className="rounded-full bg-black px-10 py-4 text-[12px] tracking-[0.18em] uppercase text-white hover:opacity-90 transition"
            >
              Оставить заявку
            </button>

            <a
              href={instagramUrl}
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-[var(--line)] px-10 py-4 text-[12px] tracking-[0.18em] uppercase hover:bg-black/5 transition"
            >
              Instagram
            </a>
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-[13px] text-[var(--muted)]">
            <a
              href={`tel:${phone.replace(/\s/g, "")}`}
              className="hover:text-[var(--fg)] hover:underline underline-offset-4 transition"
            >
              {phone}
            </a>
            <span className="opacity-60">•</span>
            <span>{city}</span>
          </div>
        </div>

        <LeadModal open={open} onClose={() => setOpen(false)} />
      </Container>
    </section>
  );
}
