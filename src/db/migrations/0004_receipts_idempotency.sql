ALTER TABLE form_submissions ADD COLUMN idempotency_key TEXT;
ALTER TABLE form_submissions ADD COLUMN receipt_id TEXT;
CREATE UNIQUE INDEX IF NOT EXISTS idx_form_submissions_idempotency_key ON form_submissions(idempotency_key);
CREATE UNIQUE INDEX IF NOT EXISTS idx_form_submissions_receipt_id ON form_submissions(receipt_id);

ALTER TABLE page_feedback ADD COLUMN idempotency_key TEXT;
ALTER TABLE page_feedback ADD COLUMN receipt_id TEXT;
CREATE UNIQUE INDEX IF NOT EXISTS idx_page_feedback_idempotency_key ON page_feedback(idempotency_key);
CREATE UNIQUE INDEX IF NOT EXISTS idx_page_feedback_receipt_id ON page_feedback(receipt_id);
