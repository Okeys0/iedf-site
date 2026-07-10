import { createClient } from "@sanity/client";

/**
 * STUB — not yet connected to a live Sanity project.
 *
 * Once a Sanity project is created (see /sanity/schemaTypes for the
 * schema to use), set these environment variables and this client is
 * ready to use in Server Components:
 *
 *   NEXT_PUBLIC_SANITY_PROJECT_ID=xxxxx
 *   NEXT_PUBLIC_SANITY_DATASET=production
 *
 * Example usage once connected (replacing lib/content/projects.ts):
 *
 *   const projects = await sanityClient.fetch(`*[_type == "project"]`)
 */
export const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "PLACEHOLDER",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2024-01-01",
  useCdn: true,
});
