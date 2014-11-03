Notes - React
=============

[![Build Status][trav_img]][trav_site]

A version of Notes written using [React][react] and [CommonJS][cjs], built with
[Webpack][webpack].

## Application

Notes is now client-side **and** server-side rendered thanks to the magic of
React. The app uses:

* React for view logic.
* Backbone for models, collections and routers.
* Lodash for Backbone and utilities.
* jQuery (Well, we _don't_ want to include it, but BB needs it for pushstate).
* Markdown JS for markdown conversion.
* Bootstrap for CSS (not JS).

Notably, the app does _not_ include:

* Bootstrap JS

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

curl -I -H "Accept-Encoding: gzip,deflate" http://127.0.0.1:3000/app/js-dist/bundle.js | grep "Content-Encoding"

## React Notes

### Optimizations

To test out how optimized the build is, here are some useful curl commands:

```
$ gulp prod

# Minified size
$ curl -so /dev/null -w '%{size_download}\n' http://127.0.0.1:3000/app/js-dist/bundle.js
267802

# Minified gzipped size
$ curl -so /dev/null -w '%{size_download}\n' --compressed http://127.0.0.1:3000/app/js-dist/bundle.js
85223
```

And in dev (for a comparison):

```
$ gulp dev

# Unminified size
$ curl -so /dev/null -w '%{size_download}\n' http://127.0.0.1:3000/app/js-dist/bundle.js
1169512
```

### Server/Client State & Rendering

One gotcha is to make sure the DOM state renders *exactly* the same on both
client and server-side. Failing this, you will get a message like:

> React attempted to use reuse markup in a container but the checksum was
> invalid. This generally means that you are using server rendering and the
> markup generated on the server was not what the client was expecting. React
> injected new markup to compensate which works but you have lost many of the
> benefits of server rendering. Instead, figure out why the markup being
> generated is different on the client or server.

in the dev. console. One such mistake that can cause this is setting a `key`
or DOM `id` property off something like a Backbone Model `cid`, which can
vary across client / server side, instead of the more reliable, consistent
`id` property.

[trav]: https://travis-ci.org/
[trav_img]: https://api.travis-ci.org/FormidableLabs/notes-react.svg
[trav_site]: https://travis-ci.org/FormidableLabs/notes-react
[react]: http://facebook.github.io/react/
[cjs]: http://wiki.commonjs.org/wiki/CommonJS
[webpack]: http://webpack.github.io/
