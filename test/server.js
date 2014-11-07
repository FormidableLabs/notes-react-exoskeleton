// Test server with in-memory database.
var initDb = require("../scripts/init-db");
var server = require("../server/index");

initDb(":memory:", function (err, db) {
  if (err) { throw err; }
  server.start({
    db: db,
    port: process.env.PORT || 3002
  });
});
