/**
 * Sanity schema definition — plug this into a Sanity Studio project's
 * `schemaTypes` array (see /sanity/README.md in this folder for setup).
 *
 * Written as a plain schema-shape object rather than wrapped in
 * `defineType`/`defineField` to keep this repo's dependency footprint
 * small; wrap with those helpers for better editor autocomplete once
 * copied into an actual Studio project.
 */
const project = {
  name: "project",
  title: "Project / Initiative",
  type: "document",
  fields: [
    { name: "title", title: "Title", type: "object", fields: [
      { name: "en", title: "English", type: "string" },
      { name: "ig", title: "Igbo (optional)", type: "string" },
    ]},
    { name: "slug", title: "Slug", type: "slug", options: { source: "title.en" } },
    {
      name: "status",
      title: "Status",
      type: "string",
      options: { list: ["active", "planned"] },
    },
    { name: "summary", title: "Summary", type: "object", fields: [
      { name: "en", title: "English", type: "text" },
      { name: "ig", title: "Igbo (optional)", type: "text" },
    ]},
    { name: "body", title: "Body", type: "array", of: [{ type: "block" }] },
    { name: "location", title: "Location", type: "string" },
    { name: "sector", title: "Sector", type: "string" },
    {
      name: "images",
      title: "Images",
      type: "array",
      of: [{ type: "image", options: { hotspot: true }, fields: [
        { name: "alt", title: "Alt text", type: "string", validation: (Rule: { required: () => unknown }) => Rule.required() },
      ]}],
    },
    { name: "order", title: "Display order", type: "number" },
  ],
};

export default project;
