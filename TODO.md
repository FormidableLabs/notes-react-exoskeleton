Tasks
=====

## notes-func-test

* Start `notes-func-test` for impl-independent functional tests (hook to dev. server + sqlite in memory.)

## notes-react-ampersand

* Goal IE8+.
    * http://facebook.github.io/react/docs/working-with-the-browser.html#browser-support-and-polyfills
    * https://github.com/es-shims/es5-shim/blob/master/es5-shim.min.js 14.315 kb
    * https://github.com/es-shims/es5-shim/blob/master/es5-sham.min.js 4.415 kb

* Switch to ampersand components.
* Replace Underscore with es5-shim / make sure we do polyfills right.
    * E.g., I have lots of `.bind()` around.
* Switch to Jade with whitespace stripping.

## Later

* Gulp: Switch to jsxhint or maybe eslint?
* Make sure tests pass.
* Implement / switch LS/no-server-side for `gh-pages` vs normal.

## Notes

* Maybe use an integration library:
    * https://github.com/jhudson8/react-backbone
    * https://github.com/clayallsopp/react.backbone
    * https://github.com/magalhas/backbone-react-component

* Examples:
    * https://github.com/jhudson8/http-dictionary

## Issues

* React Components need to be imported to work, but with JsHint ignoring
  JSX stuff, you can't tell from unused stuff.
