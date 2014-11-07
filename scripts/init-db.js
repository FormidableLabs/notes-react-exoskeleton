#!/usr/bin/env node
var sql = require("sqlite3");

var DB_PATH = __dirname + "/../server/notes.sqlite";
/*jslint bitwise: true */
var OPEN_STATE = sql.OPEN_READWRITE | sql.OPEN_CREATE;
/*jslint bitwise: false */
var TABLE_NAME = "notes";
var ROWS = "(id integer primary key autoincrement, title text, text text)";
var CB = function (err) { if (err) { throw err; } };

var init = module.exports = function (dbPath, callback) {
  dbPath = typeof dbPath !== "undefined" ? dbPath : DB_PATH;
  callback = callback || CB;

  var db = new sql.Database(dbPath, OPEN_STATE, function (err) {
    if (err) {
      db.close();
      return callback(err);
    }

    db.run("drop table if exists " + TABLE_NAME, function (err) {
      if (err) { return callback(err); }
      db.run("create table " + TABLE_NAME + " " + ROWS, function (err) {
        db.close();
        callback(err);
      });
    });
  });
};

// Script. Use defaults (init dev. database).
if (require.main === module) {
  init(DB_PATH, function (err) {
    if (err) {
      console.log("ERROR: ", err);
    }
    console.log("Finished initialization of: " + DB_PATH);
  });
}
