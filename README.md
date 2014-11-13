Notes - React + Exoskeleton
===========================

[![Build Status][trav_img]][trav_site]

A version of Notes written using [React][react] and [CommonJS][cjs], built with
[Webpack][webpack]. Test out the LocalStorage version at:
http://formidablelabs.github.io/notes-react-exoskeleton/app.html

## Application

Notes is now client-side **and** server-side rendered thanks to the magic of
React. The app uses:

* React for view logic.
* Exoskeleton for models, collections and routers.
* Markdown JS for markdown conversion.
* Bootstrap for CSS (not JS).
* HTML5Shiv, ES5 shim + sham for polyfills.
* Standalone `$.ajax` replacement.

Notably, the app does _not_ include:

* Bootstrap JS
* jQuery
* Underscore/Lodash

Instead relying on React to mostly take care of DOM work with a little bit
of VanillaJS.

## Development (REST)

This section is for the convention (REST) server, with a real backend.

### Dev Mode

Install, setup.

```
$ npm install
$ ./scripts/init-db.js
```

Run the watchers, dev and source maps servers

```
$ gulp dev
```

URLS to test things out:

* `http://127.0.0.1:3000/`: Server-side bootstrap, JS takes over.
* `http://127.0.0.1:3000/?__mode=noss`: Pure JS.
* `http://127.0.0.1:3000/?__mode=nojs`: Pure server-side. Note that while
  some links may work (e.g. clicking on a note title in list), many things
  do not since there are absolutely no JS libraries. This is intended to just
  be a small demo of SEO / "crawlable" content.

### Production

Install, setup.

```
$ npm install --production
$ npm run-script build
$ ./scripts/init-db.js
```

Run the server.

```
$ NODE_ENV=production node server/index.js
```


## Development (LocalStorage)

For public, static GitHub pages branch (`gh-pages`), we post a different
version of the app with the extra environment variable setting:
`BUILD_LOCALSTORAGE=true`. This includes the additional Backbone.LocalStorage
library in `bundle.js`, which we drive from a static, in-repo page,
`app.html`.

To develop against the local storage version,

```
$ npm install
$ gulp ls
```

URLS to test things out:

* `http://127.0.0.1:3001/app.html`: Static web page served from our static
  sources server (same as is used for source maps).

The live URL pushed to `gh-pages` is available at:
http://formidablelabs.github.io/notes-react-exoskeleton/app.html

## React Notes

### Optimizations

**Production REST App**: To test out how optimized the build is, here are some
useful curl commands:

```
$ gulp prod

# Minified size
$ curl -so /dev/null -w '%{size_download}\n' http://127.0.0.1:3000/app/js-dist/bundle.js
170775

# Minified gzipped size
$ curl -so /dev/null -w '%{size_download}\n' --compressed http://127.0.0.1:3000/app/js-dist/bundle.js
51910
```

**Demo LocalStorage Version**: And minified, unzipped in LocalStorage version

```
$ npm run-script build-ls
$ gulp server:sources

# Unminified size
$ curl -so /dev/null -w '%{size_download}\n' http://127.0.0.1:3001/app/js-dist/bundle.js
173722
```

**Development REST App**: And unminified, unzipped in dev (for a comparison):

```
$ gulp dev

# Unminified size
$ curl -so /dev/null -w '%{size_download}\n' http://127.0.0.1:3000/app/js-dist/bundle.js
770537
```

[trav]: https://travis-ci.org/
[trav_img]: https://api.travis-ci.org/FormidableLabs/notes-react-exoskeleton.svg
[trav_site]: https://travis-ci.org/FormidableLabs/notes-react-exoskeleton
[react]: http://facebook.github.io/react/
[cjs]: http://wiki.commonjs.org/wiki/CommonJS
[webpack]: http://webpack.github.io/
