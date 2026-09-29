import Database from "better-sqlite3";

const db = new Database("../database.db");

db.exec(`
CREATE TABLE IF NOT EXISTS newsletter_history (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    post_id TEXT NOT NULL UNIQUE,
    title TEXT NOT NULL,
    published_at TEXT,
    campaign_id TEXT,
    status TEXT,
    sent_at DATETIME DEFAULT CURRENT_TIMESTAMP
)
`);

export default db;
