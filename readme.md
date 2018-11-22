# pagex [![Circle CI](https://circleci.com/gh/franciscop/pagex/tree/master.svg?style=shield)](https://circleci.com/gh/franciscop/pagex/tree/master) [![js-semistandard-style](https://img.shields.io/badge/code%20style-semistandard-brightgreen.svg)](https://github.com/Flet/semistandard) [![gzip size](https://img.badgesize.io/franciscop/pagex/master/pagex.min.js.svg?compression=gzip)](https://github.com/franciscop/pagex/blob/master/pagex.min.js) [![License MIT](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/franciscop/pagex/blob/master/LICENSE)

:page_facing_up: A simple router for the browser in Javascript. It works with RegExp and Paths:

```js
pagex(path, [negate], callback, [pathname]);

// Call a function if the current page is exactly `/users`
pagex('/users', () => {
  // ...
});

// Execute only if the current page is exactly `/books`
if (pagex('/books')) {
  // ...
}
```

Due to the API that it has, it's also highly compatible with React (though purely accidentally):

```js
// Basic routing in React
export default () => (
  <div>
    {pagex('/', () => <Homepage />)}
    {pagex('/books', () => <Library />)}
    {pagex('/books/:id', id => <Book id={id} />)}
  </div>
);
```


## Parameters

```js
pagex(path, [callback = (...a) => a], [negate = false], [url = window.location.pathname]);
```

- [`path`](#path): the path or regex to be matched against the current url. This is the only required parameter and it has to be the first one.
- `callback = (...args) => args` (optional): the function that will be called if the path matches (or if it doesn't and it's negated). Any value returned here will be the final value returned by `pagex()`. The default function will return an array if matched, with any matched parameter inside. So it's always *truthy* when it's matched so you can do `if (pagex('/hello')) {...}`.
- `negate = false` (optional): set to true to call the function if NOT in this path. Really useful for the difficulty to do so otherwise in RegExp.
- `url = window.location.pathname` (optional): the url path to compare it against. Will default to the current browser pathname if it's not provided.

Note: the `callback`, `negate` and `url` can be in any order since they are of different type. The `path` always has to be the first argument though.


## Pseudo Example

If you have a large javascript codebase, you can split it the following way:

```js
// Logic for all your pages. For example, analytics
analytics();

// Logic specific for your /users page and subpages
pagex('/users', function(){
  // ...
});

// Logic specific for your /books page and subpages
pagex('/books', function(){
  // ...
});
```


## Path

A simple front-end router based on [express.js router](https://expressjs.com/en/guide/routing.html), which is based on [path-to-regexp](https://www.npmjs.com/package/path-to-regexp):

```js
pagex('/hi', function(){
  alert('Hi there!');
});
```

You can get the url parameters easily:

```js
pagex('/users/:username', function(username){
  alert('Hi there ' + username + '!');
});
```

Make them optional:

```js
// Note: ES6 default parameter shown here
pagex('/users/:username?', function(username = 'everyone'){
  alert('Hi there ' + username + '!');
});
```


## Regex

Originally the main way of doing this was with pure regex (that's why it's called pagex, from Page + Regex). However, the main way now is with paths that get converted internally to regex. If you want to use regex you can do so:

```js
// Starts by a string
pagex(/^\/user/, function(){
  console.log("User section loaded");
});

// When NOT in this page, since negating in regex is complex: stackoverflow.com/a/1240337
pagex(/^\/user/, true, function(){
  console.log("User index");
});

// Strict page
pagex(/^\/user$/, function(){
  console.log("User index");
});

// Parameters from capturing groups, with required id
pagex(/^\/user\/([A-Za-z0-9]+)/, function(id){
  console.log("Hello user " + id + "!");
});

// Parameters from capturing groups, with optional id
pagex(/^\/user\/?([A-Za-z0-9]+)?/, function(id){
  console.log("Are you there, user " + id + "?");
});
```
