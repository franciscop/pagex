/* eslint new-cap: 0 */
// PageX
// A minimal engine for loading only page-specific code with regex or paths
var pagex = function (path, negate, callback, url) {
  if (!(this instanceof pagex)) {
    return new pagex(path, negate, callback, url);
  }

  // Allow it to have different signatures
  if (!callback) {
    callback = negate;
    negate = false;
  }

  if (typeof path === 'string') {
    path = this.path(path);
  }

  // The actual function
  var fn = function () {
    // Url with leading slash. Allows for testing
    url = url || window.location.pathname.replace(/^\//, '/');

    // Check whether we are in the correct page or not
    if (path.test(url) !== negate) {
      callback.apply(null, url.match(path) ? url.match(path).slice(1) : []);
    }
  };

  // We want to execute it when the DOM is ready, but not before. So we need to
  // add the listener, but we also need to check if it was already triggered
  document.addEventListener('DOMContentLoaded', fn);

  // The DOM was lodaded already
  if (['interactive', 'complete', 'loaded'].indexOf(document.readyState) !== -1) {
    fn();
  }
};
