import { query } from "@/lib/db/client";

let ready: Promise<void> | null = null;

/** Create the mail tables the admin console needs. Safe to call on every request. */
export function ensureAdminSchema() {
  if (!ready) {
    ready = (async () => {
      await query(`
        CREATE TABLE IF NOT EXISTS submissions (
          id            SERIAL PRIMARY KEY,
          form_type     TEXT NOT NULL,
          payload       JSONB NOT NULL,
          email         TEXT NOT NULL,
          created_at    TIMESTAMPTZ NOT NULL DEFAULT now()
        )
      `);
      await query(`
        ALTER TABLE submissions
        ADD COLUMN IF NOT EXISTS status TEXT NOT NULL DEFAULT 'new'
      `);
      await query(`
        CREATE TABLE IF NOT EXISTS email_replies (
          id              SERIAL PRIMARY KEY,
          submission_id   INTEGER NOT NULL REFERENCES submissions(id) ON DELETE CASCADE,
          to_email        TEXT NOT NULL,
          subject         TEXT NOT NULL,
          body            TEXT NOT NULL,
          resend_id       TEXT,
          sent_at         TIMESTAMPTZ NOT NULL DEFAULT now()
        )
      `);
      await query(`
        CREATE INDEX IF NOT EXISTS idx_email_replies_submission
        ON email_replies (submission_id, sent_at)
      `);
    })().catch((err) => {
      ready = null;
      throw err;
    });
  }
  return ready;
}
