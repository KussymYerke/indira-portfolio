import { HeroCarousel } from "@/components/HeroCarousel";
import { AboutSection } from "@/components/AboutSection";
import { HomeWorksTabs } from "@/components/HomeWorkTabs";
import { FeaturedCarousel } from "@/components/FeaturedCarousel";
import { LeadCtaSection } from "@/components/LeadCtaSection";

export default function HomePage() {
  const instagram = "https://www.instagram.com/indira_yussupova_ph/";
  const phone = "+7 777 777 77 77";

  return (
    <>
      <HeroCarousel />

      {/* актуальные (3 проекта, можно свайпать) */}
      <FeaturedCarousel />

      {/* портфолио по категориям */}
      <HomeWorksTabs />

      {/* кратко о фотографе */}
      <AboutSection
        name="Индира Юсупова"
        city="Алматы"
        bio="Создаю истории вашего пространства — через свет, композицию и атмосферу. Сотрудничаю с дизайнерами и брендами: жилые и коммерческие интерьеры, портфолио проектов и контент для публикаций."
        portraitSrc="/portrait.webp"
        instagramUrl={instagram}
        phone={phone}
      />

      {/* заявка + контакты */}
      <LeadCtaSection instagramUrl={instagram} phone={phone} city="Алматы" />
    </>
  );
}
