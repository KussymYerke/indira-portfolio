import { Container } from "./Container";

type AboutSectionProps = {
  name: string;
  city: string;
  bio: string; // коротко: 2-3 строки
  portraitSrc?: string;
  instagramUrl: string;
  phone: string;
};

export function AboutSection({
  name,
  city,
  bio,
  portraitSrc = "/portrait.webp",
  instagramUrl,
  phone,
}: AboutSectionProps) {
  return (
    <section className="border-t border-[var(--line)] py-14 md:py-20">
      <Container>
        <div className="grid gap-10 md:grid-cols-12 md:items-center">
          {/* portrait */}
          <div className="md:col-span-5">
            <div className="overflow-hidden rounded-[28px] bg-black/5">
              <div className="aspect-[4/5]">
                <img
                  src={portraitSrc}
                  alt={name}
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* text */}
          <div className="md:col-span-7 md:pl-6">
            <div className="text-[12px] tracking-[0.22em] uppercase text-[var(--muted)]">
              обо мне
            </div>

            <h2 className="mt-3 font-serif text-[34px] leading-tight md:text-[44px]">
              {name}
            </h2>

            <p className="mt-5 text-[15px] leading-7 text-[var(--muted)] max-w-[66ch]">
              {bio}
            </p>

            {/* one clean line */}
            <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-2 text-[13px] text-[var(--muted)]">
              <a
                href={instagramUrl}
                target="_blank"
                rel="noreferrer"
                className="text-[var(--fg)]/85 hover:underline underline-offset-4"
              >
                Instagram
              </a>

              <a
                href={`tel:${phone.replace(/\s/g, "")}`}
                className="text-[var(--fg)]/85 hover:underline underline-offset-4"
              >
                {phone}
              </a>

              <span className="tracking-[0.14em] uppercase">{city}</span>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
