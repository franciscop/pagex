import toregex from 'path-to-regexp';

// PageX
// A minimal engine for loading only page-specific code with regex or paths
export default (reg, negate, callback, url = window.location.pathname) => {
  // Allow it to have different signatures
  if (!callback) {
    callback = negate;
    negate = false;
  }

  if (!callback) {
    callback = (...args) => args;
  }

  if (typeof reg === 'string') {
    if (reg === '*') reg = '(.*)';
    reg = toregex(reg);
  }

  // Check whether we are in the correct page or not
  if (reg.test(url) === negate) return false;

  const matched = url.match(reg) || [{}];
  return callback(...matched.slice(1));
};
