Notes - React + Exoskeleton
===========================

[![Build Status][trav_img]][trav_site]

A version of Notes written using [React][react] and [CommonJS][cjs], built with
[Webpack][webpack].

## Application

Notes is now client-side **and** server-side rendered thanks to the magic of
React. The app uses:

* React for view logic.
* Exoskeleton for models, collections and routers.
* Markdown JS for markdown conversion.
* Bootstrap for CSS (not JS).
* ES5 shim + sham for polyfills.

Notably, the app does _not_ include:

* Bootstrap JS
* jQuery
* Underscore/Lodash

Instead relying on React to mostly take care of DOM work with a little bit
of VanillaJS.

## Development

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

## React Notes

### Optimizations

To test out how optimized the build is, here are some useful curl commands:

```
$ gulp prod

# Minified size
$ curl -so /dev/null -w '%{size_download}\n' http://127.0.0.1:3000/app/js-dist/bundle.js
267891

# Minified gzipped size
$ curl -so /dev/null -w '%{size_download}\n' --compressed http://127.0.0.1:3000/app/js-dist/bundle.js
85427
```

And in dev (for a comparison):

```
$ gulp dev

# Unminified size
$ curl -so /dev/null -w '%{size_download}\n' http://127.0.0.1:3000/app/js-dist/bundle.js
1077174
```

[trav]: https://travis-ci.org/
[trav_img]: https://api.travis-ci.org/FormidableLabs/notes-react-ampersand.svg
[trav_site]: https://travis-ci.org/FormidableLabs/notes-react-ampersand
[react]: http://facebook.github.io/react/
[cjs]: http://wiki.commonjs.org/wiki/CommonJS
[webpack]: http://webpack.github.io/
