'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.itemClass = exports.toggleClass = exports.removeClass = exports.addClass = exports.hasClass = undefined;

var _polyfill = require('./polyfill.js');

var _element = require('./element.js');

var hasClass = function hasClass(elem, className) {
  elem = (0, _element.selector2dom)(elem);

  if (!elem || !className || (0, _polyfill.indexOf)(className, ' ') !== -1) return false;
  if (elem.classList) {
    return elem.classList.contains(className);
  }
  return (0, _polyfill.indexOf)(elem.className, className) > -1;
};

var addClass = function addClass(elem, className) {
  elem = (0, _element.selector2dom)(elem);
  if (!elem || !className) return;
  var classStr = elem.className;
  var classnames = (className || '').split(' ');

  for (var i = 0, len = classnames.length; i < len; i++) {
    var classname = classnames[i];
    if (classname) {
      if (elem.classList) {
        elem.classList.add(classname);
      } else {
        if (!hasClass(elem, classname)) {
          classStr += ' ' + classname;
        }
      }
    }
  }
  if (!elem.classList) {
    elem.className = classStr;
  }
};

var removeClass = function removeClass(elem, className) {
  elem = (0, _element.selector2dom)(elem);
  if (!elem || !className) return;
  var classStr = elem.className;
  var classnames = (className || '').split(' ');

  for (var i = 0, len = classnames.length; i < len; i++) {
    var classname = classnames[i];
    if (classname) {
      if (elem.classList) {
        elem.classList.remove(classname);
      } else {
        if (hasClass(elem, classname)) {
          classStr = classStr.replace(className, '');
        }
      }
    }
  }
  if (!elem.classList) {
    elem.className = classStr;
  }
};

var toggleClass = function toggleClass(elem, className) {
  if (hasClass(elem, className)) {
    removeClass(elem, className);
  } else {
    addClass(elem, className);
  }
};

var itemClass = function itemClass(elem, number) {
  elem = (0, _element.selector2dom)(elem);
  if (!elem) return null;
  if (elem.classList) {
    return elem.classList.item(number);
  }
  var classnames = (elem.className || '').split(' ');
  if (classnames.length >= number && number >= 0) {
    return classnames[number];
  }
  return null;
};

exports.hasClass = hasClass;
exports.addClass = addClass;
exports.removeClass = removeClass;
exports.toggleClass = toggleClass;
exports.itemClass = itemClass;