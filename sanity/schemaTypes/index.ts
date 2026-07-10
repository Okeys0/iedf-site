/**
 * Remaining Sanity schema definitions (see project.ts for the pattern
 * and rationale). Each maps directly to a content type from the Content
 * Outline / Technical Architecture Section 3.
 */

export const roadmapArea = {
  name: "roadmapArea",
  title: "Strategic Roadmap Area",
  type: "document",
  fields: [
    { name: "title", title: "Title", type: "object", fields: [
      { name: "en", type: "string" },
      { name: "ig", type: "string" },
    ]},
    { name: "summary", title: "Summary", type: "object", fields: [
      { name: "en", type: "text" },
      { name: "ig", type: "text" },
    ]},
    { name: "order", title: "Display order", type: "number" },
  ],
};

export const newsPost = {
  name: "newsPost",
  title: "News Post",
  type: "document",
  fields: [
    { name: "title", title: "Title", type: "string" },
    { name: "slug", title: "Slug", type: "slug", options: { source: "title" } },
    { name: "date", title: "Publish date", type: "datetime" },
    {
      name: "category",
      title: "Category",
      type: "string",
      options: { list: ["announcement", "press", "event"] },
    },
    { name: "body", title: "Body", type: "array", of: [{ type: "block" }] },
  ],
};

export const event = {
  name: "event",
  title: "Event",
  type: "document",
  fields: [
    { name: "title", title: "Title", type: "string" },
    { name: "date", title: "Date", type: "datetime" },
    { name: "location", title: "Location", type: "string" },
    { name: "description", title: "Description", type: "text" },
  ],
};

export const teamMember = {
  name: "teamMember",
  title: "Team Member",
  type: "document",
  fields: [
    { name: "name", title: "Name", type: "string" },
    { name: "role", title: "Role", type: "string" },
    { name: "bio", title: "Bio", type: "text" },
    {
      name: "photo",
      title: "Photo",
      type: "image",
      fields: [{ name: "alt", title: "Alt text", type: "string", validation: (Rule: { required: () => unknown }) => Rule.required() }],
    },
    { name: "isFoundingMember", title: "Founding member?", type: "boolean" },
    { name: "order", title: "Display order", type: "number" },
  ],
};

export const community = {
  name: "community",
  title: "Autonomous Community",
  type: "document",
  fields: [
    { name: "name", title: "Name", type: "string" },
    { name: "summary", title: "Summary", type: "text" },
  ],
};

export const statistic = {
  name: "statistic",
  title: "Statistic (About Ikeduru)",
  type: "document",
  fields: [
    { name: "label", title: "Label", type: "string" },
    { name: "value", title: "Value", type: "string" },
    { name: "source", title: "Source", type: "string", validation: (Rule: { required: () => unknown }) => Rule.required() },
    { name: "lastUpdated", title: "Last updated", type: "date", validation: (Rule: { required: () => unknown }) => Rule.required() },
  ],
};

export const siteSettings = {
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    { name: "apoliticalStatementShort", title: "Apolitical statement (footer, short form)", type: "text" },
    { name: "socialLinks", title: "Social links", type: "array", of: [{ type: "url" }] },
    {
      name: "givingLive",
      title: "Is live giving/payment processing enabled?",
      type: "boolean",
      description:
        "Feature flag — flip to true once IEDF's bank account and payment processor are in place (see Technical Architecture Section 5). Support IEDF page reads this flag to decide whether to render the intent-capture form or a real donate flow.",
    },
  ],
};

export const page = {
  name: "page",
  title: "Generic Page",
  type: "document",
  fields: [
    { name: "title", title: "Title", type: "string" },
    { name: "slug", title: "Slug", type: "slug", options: { source: "title" } },
    { name: "body", title: "Body", type: "array", of: [{ type: "block" }] },
  ],
};
