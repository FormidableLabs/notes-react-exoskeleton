Tasks
=====

## notes-func-test

* Start `notes-func-test` for impl-independent functional tests (hook to dev. server + sqlite in memory.)

## notes-react-ampersand

* Switch to ampersand components.
* Look to `react-router`
* Remove jQuery.
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
