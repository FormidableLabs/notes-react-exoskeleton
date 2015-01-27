// TODO: Renable shebang
// https://github.com/jscs-dev/node-jscs/issues/730
// #!/usr/bin/env node
// Initialize dev. database
var path = require("path");
var sql = require("sqlite3");

var DB_PATH = path.join(__dirname, "../server/notes.sqlite");
/*jslint bitwise: true */
var OPEN_STATE = sql.OPEN_READWRITE | sql.OPEN_CREATE;
/*jslint bitwise: false */
var TABLE_NAME = "notes";
var ROWS = "(id integer primary key autoincrement, title text, text text)";
var CB = function (err) { if (err) { throw err; } };

var db;

var init = module.exports = function (dbPath, callback) {
  dbPath = typeof dbPath !== "undefined" ? dbPath : DB_PATH;
  callback = callback || CB;

  db = new sql.Database(dbPath, OPEN_STATE, function (err) {
    if (err) {
      return callback(err);
    }

    db.run("drop table if exists " + TABLE_NAME, function (dropErr) {
      if (dropErr) { return callback(dropErr); }
      db.run("create table " + TABLE_NAME + " " + ROWS, function (createErr) {
        callback(createErr, db);
      });
    });
  });
};

// Script. Use defaults (init dev. database).
if (require.main === module) {
  init(DB_PATH, function (err) {
    if (err)  { console.log("ERROR: ", err); }
    if (db)   { db.close(); }
    console.log("Finished initialization of: " + DB_PATH);
  });
}
