import { notFound } from "next/navigation";
import Link from "next/link";
import { Container } from "@/components/Container";
import { ProjectGallery } from "@/components/ProjectGallery";
import { findBySlug, projects } from "@/lib/works-data";

export async function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const p = findBySlug(params.slug);
  if (!p) return {};
  return {
    title: `${p.title} — Индира Юсупова`,
    description: p.excerpt,
  };
}

export default function WorkDetailsPage({
  params,
}: {
  params: { slug: string };
}) {
  const p = findBySlug(params.slug);
  if (!p) return notFound();

  return (
    <>
      <section className="border-b border-[var(--line)]">
        <Container className="py-10 md:py-14">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="text-[11px] tracking-[0.22em] uppercase text-[var(--muted)]">
                {p.category === "designer" ? "Дизайнерская съемка" : "Коммерческая съемка"}
                {p.location ? ` · ${p.location}` : ""}
                {p.year ? ` · ${p.year}` : ""}
              </div>
              <h1 className="mt-3 font-serif text-[34px] leading-tight md:text-[48px]">
                {p.title}
              </h1>
            </div>

            <Link
              href="/works"
              className="rounded-full border border-[var(--line)] px-5 py-3 text-[12px] tracking-[0.18em] uppercase hover:bg-black/5 transition"
            >
              ← к работам
            </Link>
          </div>
        </Container>
      </section>

      <section className="py-12 md:py-16">
        <Container>
          <ProjectGallery images={p.images} />

          <div className="mt-10 max-w-[78ch]">
            <p className="text-[15px] leading-7 text-[var(--muted)]">{p.excerpt}</p>
          </div>
        </Container>
      </section>
    </>
  );
}
