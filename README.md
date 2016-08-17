# pagex

A simple front-end routing for your pages. It loads the script only when the DOM is ready. It can handle both Regex and paths

## Parameters

```js
pagex(path, [negate?], callback);
```

- path: the path or regex to be matched against the current url
- negate (optional): set to true to call the function if NOT in this path. Really useful for the difficulty to do so otherwise
- callback: the callback to call if the path matches (or if it doesn't and it's negated)


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
  alert('Hi there' + username + '!');
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
