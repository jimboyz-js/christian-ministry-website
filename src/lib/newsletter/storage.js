import db from "../db";

const createTableSql = `
CREATE TABLE IF NOT EXISTS newsletter_history (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    post_id TEXT NOT NULL UNIQUE,
    title TEXT NOT NULL,
    published_at TEXT,
    campaign_id TEXT,
    status TEXT NOT NULL,
    sent_at DATETIME DEFAULT CURRENT_TIMESTAMP
)
`;

db.exec(createTableSql);

const hasPostStmt = db.prepare(`
    SELECT 1
    FROM newsletter_history
    WHERE post_id = ?
    LIMIT 1
`);

const insertStmt = db.prepare(`
    INSERT INTO newsletter_history (post_id, title, published_at, campaign_id, status)
    VALUES (?, ?, ?, ?, ?)
`);

const getStmt = db.prepare(`
    SELECT id, post_id, title, published_at, campaign_id, status, sent_at
    FROM newsletter_history
    WHERE post_id = ?
    LIMIT 1
`);

const deleteStmt = db.prepare(`
    DELETE FROM newsletter_history
    WHERE post_id = ?
`);

export function hasPostBeenSent(postId) {
  return Boolean(hasPostStmt.get(postId));
}

export function saveNewsletter({ postId, title, publishedAt, campaignId }) {
  insertStmt.run(postId, title, publishedAt, campaignId, "sent");
}

export function getNewsletter(postId) {
  return getStmt.get(postId) ?? null;
}

export function deleteNewsletter(postId) {
  return deleteStmt.run(postId);
}

export default null;
