-- Create donations table for Paystack payment records
-- Run this migration in your Neon database console

CREATE TABLE IF NOT EXISTS donations (
  id SERIAL PRIMARY KEY,
  reference VARCHAR(255) UNIQUE NOT NULL,
  email VARCHAR(255) NOT NULL,
  amount DECIMAL(12, 2) NOT NULL, -- Amount in Naira
  currency VARCHAR(10) DEFAULT 'NGN',
  status VARCHAR(50) DEFAULT 'success',
  paid_at TIMESTAMP,
  metadata JSONB,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Index for faster lookups
CREATE INDEX idx_donations_reference ON donations(reference);
CREATE INDEX idx_donations_email ON donations(email);
CREATE INDEX idx_donations_created_at ON donations(created_at DESC);

-- Add comment
COMMENT ON TABLE donations IS 'Paystack donation transactions for IEDF';
