import Link from "next/link";
import { Container } from "@/components/Container";
import { byCategory, WorkCategory } from "@/lib/works-data";

export const metadata = {
  title: "Работы — Индира Юсупова | Интерьерный фотограф",
  description:
    "Портфолио: дизайнерские и коммерческие интерьерные съемки. Алматы.",
};

const categoryLabel: Record<WorkCategory, string> = {
  designer: "Дизайнерские съемки",
  commercial: "Коммерческие съемки",
};

function Tabs({ active }: { active: WorkCategory }) {
  const base =
    "relative inline-flex items-center justify-center rounded-full px-6 py-3 text-[12px] tracking-[0.18em] uppercase transition cursor-pointer pointer-events-auto focus:outline-none focus-visible:ring-2 focus-visible:ring-black/40";

  const activeCls = "bg-black text-white";
  const inactiveCls =
    "border border-[var(--line)] text-[var(--fg)]/80 hover:bg-black/5";

  return (
    <div className="flex flex-wrap justify-center gap-3 w-full">
      <Link
        href="/works?type=designer"
        aria-current={active === "designer" ? "page" : undefined}
        className={`${base} ${active === "designer" ? activeCls : inactiveCls}`}
      >
        Дизайнерские съемки
      </Link>

      <Link
        href="/works?type=commercial"
        aria-current={active === "commercial" ? "page" : undefined}
        className={`${base} ${
          active === "commercial" ? activeCls : inactiveCls
        }`}
      >
        Коммерческие съемки
      </Link>
    </div>
  );
}

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
      className="group relative block overflow-hidden rounded-[22px] bg-black/5"
      aria-label={title}
    >
      <div className="aspect-[16/10] w-full">
        <img
          src={imageSrc}
          alt={title}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.04]"
          loading="lazy"
        />
      </div>

      {/* hover overlay (desktop) */}
      <div className="pointer-events-none absolute inset-0 opacity-0 transition duration-300 group-hover:opacity-100 hidden md:block">
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-x-0 bottom-0 p-6">
          <div className="font-serif text-white text-[22px] leading-snug">
            {title}
          </div>
          <div className="mt-2 text-white/80 text-[11px] tracking-[0.22em] uppercase">
            {meta}
          </div>
        </div>
      </div>

      {/* mobile caption (нет hover) */}
      <div className="md:hidden px-1 pt-4 pb-1">
        <div className="font-serif text-[18px] leading-snug">{title}</div>
        <div className="mt-1 text-[11px] tracking-[0.22em] uppercase text-[var(--muted)]">
          {meta}
        </div>
      </div>
    </Link>
  );
}

export default function WorksPage({
  searchParams,
}: {
  searchParams?: { type?: string };
}) {
  const active: WorkCategory =
    searchParams?.type === "commercial" ? "commercial" : "designer";

  const items = byCategory(active);

  return (
    <>
      {/* HEADER */}
      {/* border-b border-[var(--line)] */}
      <section className="">
        <Container className="">
          <div className="flex flex-col gap-8">
            <div className="max-w-[76ch]">
              <h1 className="mt-20 font-serif text-[40px] leading-tight md:text-[56px]">
                Работы
              </h1>

              <p className="mt-6 text-[15px] leading-7 text-[var(--muted)]">
                Выберите тип съемки — и посмотрите проекты.
              </p>
            </div>

            {/* Tabs centered */}
            <Tabs active={active} />
          </div>
        </Container>
      </section>

      {/* CATEGORY TITLE + GRID */}
      <section>
        <Container>
          <div className="pt-10 md:pt-14 text-center">
            <div className="text-[12px] tracking-[0.22em] uppercase text-[var(--muted)]">
              {active === "designer"
                ? "для портфолио дизайнеров"
                : "для брендов и бизнеса"}
            </div>

            <h2 className="mt-3 font-serif text-[30px] leading-tight md:text-[40px]">
              {categoryLabel[active]}
            </h2>
          </div>

          <div className="mt-10 pb-16">
            {items.length === 0 ? (
              <div className="border-t border-[var(--line)] py-14 text-center text-[var(--muted)]">
                Пока нет работ в этой категории.
              </div>
            ) : (
              <div className="grid gap-10 sm:grid-cols-2 xl:grid-cols-2">
                {items.map((p) => {
                  const cover = p.images?.[0];
                  const metaParts = [
                    active === "designer"
                      ? "Дизайнерская съемка"
                      : "Коммерческая съемка",
                    p.location || "Алматы",
                    p.year ? String(p.year) : null,
                  ].filter(Boolean);

                  return (
                    <WorkHoverCard
                      key={`${active}-${p.slug}`}
                      href={`/works/${p.slug}`}
                      imageSrc={cover?.src || ""}
                      title={p.title}
                      meta={metaParts.join(" • ")}
                    />
                  );
                })}
              </div>
            )}
          </div>
        </Container>
      </section>
    </>
  );
}
