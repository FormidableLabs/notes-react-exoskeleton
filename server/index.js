// Patch require.
require("node-jsx").install({ extension: ".jsx" });

// Server
var express = require("express");
var compress = require("compression");
var exphbs = require("express-handlebars");
var bodyParser = require("body-parser");
var sql = require("sqlite3");

var app = express();
var db = null;
var DB_PATH = __dirname + "/notes.sqlite";
var PORT = process.env.PORT || 3000;

// Client
var React = require("react");
var NotesView = React.createFactory(require("../client/components/notes.jsx"));
var NoteView = React.createFactory(require("../client/components/note.jsx"));
var NotesCollection = require("../client/collections/notes");

// ----------------------------------------------------------------------------
// Setup, Static Routes
// ----------------------------------------------------------------------------
app.use(compress());
app.use(bodyParser());
app.engine(".hbs", exphbs({ extname: ".hbs" }));
app.set("view engine", ".hbs");
app.set("views", __dirname + "/../templates");

// ----------------------------------------------------------------------------
// Static Routes
// ----------------------------------------------------------------------------
app.use("/app/js-dist/*.map", function (req, res) {
  res.send(404, "404"); // Prevent sourcemap serving.
});
app.use("/app/js-dist", express["static"]("app/js-dist"));
app.use("/bootstrap", express["static"]("node_modules/bootstrap/dist"));
app.use("/ie8", express["static"]("node_modules/ie8/build"));
app.use("/html5shiv", express["static"]("node_modules/html5shiv/dist"));
app.use("/css", express["static"]("app/css"));

// ----------------------------------------------------------------------------
// API
// ----------------------------------------------------------------------------
var _errOrData = function (res, dataOverride) {
  return function (err, data) {
    if (err) {
      res.status(500).json({ error: err.message || err.toString() });
    }

    res.json(dataOverride || data);
  };
};

var _getAllNotes = function (cb) {
  db.prepare("select * from notes").all(cb);
};

app.get("/api/notes", function (req, res) {
  _getAllNotes(_errOrData(res));
});

app.post("/api/notes", function (req, res) {
  var title = req.body.title || "",
    text = req.body.text || "";

  db.run("insert into notes (title, text) values(?,?)", title, text)
    .prepare("select * from notes order by id desc limit 1")
    .get(_errOrData(res));
});

app.put("/api/notes/:id", function (req, res) {
  var title = req.body.title,
    text = req.body.text,
    id = req.params.id;

  db.run("update notes set title=?, text=? where id=?", title, text, id)
    .prepare("select * from notes where id=?", id)
    .get(_errOrData(res));
});

app["delete"]("/api/notes/:id", function (req, res) {
  db.run("delete from notes where id=?", req.params.id, _errOrData(res, {}));
});

// ----------------------------------------------------------------------------
// Dynamic Routes
// ----------------------------------------------------------------------------
// Common query params:
// * `__mode`: `noss` for "no server side html", `nojs` for "no client side".

// Helper for JSON injections.
// See: http://benalpert.com/2012/08/03/preventing-xss-json.html
var _toJSON = function (data) {
  return JSON.stringify(data).replace(/<\//g, "<\\/");
};

// Mode helper.
var _getMode = function (req) {
  if (process.env.NODE_ENV === "production") {
    return null;
  }

  return req.query.__mode;
};

// Render a page with special "content" function.
var _renderPage = function (contentFn) {
  return function (req, res) {
    if (_getMode(req) === "noss") {
      // No server-side render.
      return res.render("index", { layout: false });
    }

    _getAllNotes(function (err, data) {
      if (err) {
        return res.status(500).send(err.message || err.toString() || "error");
      }

      // New collection from scratch for data for concurrency ease.
      var notesCol = new NotesCollection(data);
      var content = contentFn(notesCol, req, res);
      if (content === false) {
        return; // Short-circuit out. Already handled.
      }

      // Render with bootstrapped data.
      res.render("index", {
        layout: false,
        noJs: _getMode(req) === "nojs",
        initialData: _toJSON(notesCol.toJSON()),
        content: content
      });
    });
  };
};

app.get("/", _renderPage(function (notesCol) {
  return React.renderToString(new NotesView({
    notes: notesCol
  }));
}));

app.get("/note/:id/:action", _renderPage(function (notesCol, req, res) {
  var noteModel = notesCol.get(req.params.id);
  if (!noteModel) {
    // Go to home page on missing note model.
    res.redirect("/");
    return false;
  }

  return React.renderToString(new NoteView({
    note: noteModel,
    action: req.params.action
  }));
}));

// ----------------------------------------------------------------------------
// Bootstrap
// ----------------------------------------------------------------------------
db = new sql.Database(DB_PATH, sql.OPEN_READWRITE, function (err) {
  if (err) {
    global.console.log("DB ERROR", err);
    throw err;
  }

  app.listen(PORT);
});
