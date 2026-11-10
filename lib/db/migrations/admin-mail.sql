-- Admin mail: status on submissions + stored replies.
-- The admin API also applies this automatically via ensureAdminSchema().

ALTER TABLE submissions
  ADD COLUMN IF NOT EXISTS status TEXT NOT NULL DEFAULT 'new';

CREATE TABLE IF NOT EXISTS email_replies (
  id              SERIAL PRIMARY KEY,
  submission_id   INTEGER NOT NULL REFERENCES submissions(id) ON DELETE CASCADE,
  to_email        TEXT NOT NULL,
  subject         TEXT NOT NULL,
  body            TEXT NOT NULL,
  resend_id       TEXT,
  sent_at         TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_email_replies_submission
  ON email_replies (submission_id, sent_at);
