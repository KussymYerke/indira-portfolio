import { defineType, defineField } from "sanity";

export default defineType({
  name: "settings",
  title: "Настройки сайта",
  type: "document",
  fields: [
    defineField({ name: "fullName", title: "ФИО", type: "string" }),
    defineField({ name: "tagline", title: "Слоган", type: "string" }),
    defineField({ name: "bio", title: "Биография", type: "text" }),
    defineField({ name: "city", title: "Город", type: "string" }),
    defineField({ name: "phone", title: "Телефон", type: "string" }),
    defineField({ name: "instagramUrl", title: "Instagram", type: "url" }),
    defineField({
      name: "portrait",
      title: "Фото фотографа",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "featuredWorks",
      title: "Актуальные работы (3 шт.)",
      type: "array",
      of: [{ type: "reference", to: [{ type: "work" }] }],
      validation: (Rule) => Rule.max(3),
    }),
  ],
});
