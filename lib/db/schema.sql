-- IEDF Website — Form Submissions Schema
-- Run this once in Neon's SQL Editor (or via `psql`) after creating your
-- project, before the site's forms will successfully write data.
--
-- One table, differentiated by `form_type`, keeps this simple for a
-- small-volume site rather than three separate tables — easy to split
-- later if submission volume or reporting needs grow.

CREATE TABLE IF NOT EXISTS submissions (
  id            SERIAL PRIMARY KEY,
  form_type     TEXT NOT NULL CHECK (form_type IN ('contact', 'member_signup', 'newsletter')),
  -- Full submitted data as JSON — flexible across the three different
  -- form shapes (contact has inquiry_type/organization/message;
  -- member_signup has interest; newsletter has just email).
  payload       JSONB NOT NULL,
  -- Denormalized for quick filtering/searching without JSON queries
  email         TEXT NOT NULL,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_submissions_form_type ON submissions (form_type);
CREATE INDEX IF NOT EXISTS idx_submissions_created_at ON submissions (created_at DESC);
