const Database = require("better-sqlite3");

// Open the SQLite database (creates the file if it doesn't exist)
export const db = new Database("./membership.db", {
  verbose: console.log,
});
db.pragma("journal_mode = WAL");

// Example: create a table if not exists
const subscriptionsTable = db.prepare(`
  CREATE TABLE IF NOT EXISTS subscriptions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL COLLATE NOCASE,
    comment TEXT,
    start_date NUMBER NOT NULL,
    end_date NUMBER NOT NULL
  );
`);
subscriptionsTable.run();

const personalTable = db.prepare(`
  CREATE TABLE IF NOT EXISTS personal (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    date NUMBER NOT NULL,
    comment TEXT
  );
`);
personalTable.run();
