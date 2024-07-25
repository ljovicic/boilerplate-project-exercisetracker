const sqlite = require("sqlite3").verbose();
let sql;

const db = new sqlite.Database("users.db", sqlite.OPEN_READWRITE, (err) => {
  // error with database
  if (err) {
    console.error("Databese opening error " + err.message);
  } else {
    // check if users table already exists
    db.get(
      "SELECT name FROM sqlite_master WHERE type='table' AND name='users'",
      (err, row) => {
        if (err) {
          console.error("Error checking table existence: " + err.message);
        } else if (!row) {
          // create users table
          sql = `CREATE TABLE users(ID INTEGER PRIMARY KEY, username TEXT)`;
          db.run(sql);
        }
      }
    );

    // check if exercises table already exists
    db.get(
      "SELECT name FROM sqlite_master WHERE type='table' AND name='exercises'",
      (err, row) => {
        if (err) {
          console.error("Error checking table existence: " + err.message);
        } else if (!row) {
          // create exercises table
          sql = `CREATE TABLE exercises (ID INTEGER PRIMARY KEY, userId INTEGER, description TEXT, duration INTEGER, date TEXT)`;
          db.run(sql);
        }
      }
    );
  }
});

module.exports = { db };
