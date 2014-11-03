#!/usr/bin/env node
var sql = require("sqlite3");

var DB_PATH = __dirname + "/../server/notes.sqlite";
/*jslint bitwise: true */
var OPEN_STATE = sql.OPEN_READWRITE | sql.OPEN_CREATE;
/*jslint bitwise: false */
var TABLE_NAME = "notes";

var db = new sql.Database(DB_PATH, OPEN_STATE, function (err) {
  if (err) {
    db.close();
    throw err;
  }

  db.run("drop table if exists " + TABLE_NAME, function () {
    db.run("create table " + TABLE_NAME +
      " (id integer primary key autoincrement, title text, text text)",
      function () { db.close(); });
  });
});
