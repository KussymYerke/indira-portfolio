import { LeadCtaSection } from "@/components/LeadCtaSection";

export const metadata = {
  title: "Контакты — Индира Юсупова | Интерьерный фотограф",
  description: "Связаться с Индира Юсупова: Instagram, телефон. Алматы.",
};

export default function ContactsPage() {
  const instagram = "https://www.instagram.com/indira_yussupova_ph/";
  const phone = "+7 777 777 77 77";

  return (
    <LeadCtaSection instagramUrl={instagram} phone={phone} city="Алматы" />
  );
}
