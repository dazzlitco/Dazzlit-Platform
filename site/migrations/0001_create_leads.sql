-- Dazzlit leads table (Phase 1, step 6).
-- Applied with: wrangler d1 execute dazzlit-leads --file=migrations/0001_create_leads.sql
-- (add --local for the local dev database)
CREATE TABLE IF NOT EXISTS leads (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  created_at TEXT NOT NULL,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  website TEXT NOT NULL DEFAULT '',
  services TEXT NOT NULL,
  market TEXT NOT NULL,
  budget TEXT NOT NULL DEFAULT '',
  source TEXT NOT NULL DEFAULT '/'
);
CREATE INDEX IF NOT EXISTS leads_created_at_idx ON leads (created_at);
CREATE INDEX IF NOT EXISTS leads_email_idx ON leads (email);
