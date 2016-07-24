# pagex

A simple front-end routing for your pages. It loads the script only when the DOM is ready. It can handle both Regex and paths

## Path

A simple parser:

```js
pagex('/hi', function(){
  alert("Hi there (:");
});
```


## Regex

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

// Home page or nothing (like in /)
pagex(/^\/(?:home)?/, function(){
  console.log("Welcome home (or root)");
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
