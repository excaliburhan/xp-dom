'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.undelegate = exports.delegate = exports.one = exports.off = exports.on = undefined;
var _arguments = arguments;

var _element = require('./element.js');

var delegateCb = {};

var on = function () {
  if (document.addEventListener) {
    return function (elem, type, handler) {
      elem = (0, _element.selector2dom)(elem);
      if (elem && type && handler) {
        elem.addEventListener(type, handler, false);
      }
    };
  } else {
    return function (elem, type, handler) {
      elem = (0, _element.selector2dom)(elem);
      if (elem && type && handler) {
        elem.attachEvent('on' + type, handler);
      }
    };
  }
}();

var off = function () {
  if (document.removeEventListener) {
    return function (elem, type, handler) {
      elem = (0, _element.selector2dom)(elem);
      if (elem && type) {
        elem.removeEventListener(type, handler, false);
      }
    };
  } else {
    return function (elem, type, handler) {
      elem = (0, _element.selector2dom)(elem);
      if (elem && type) {
        elem.detachEvent('on' + type, handler);
      }
    };
  }
}();

var one = function one(elem, type, fn) {
  var handler = function handler() {
    if (fn) {
      fn.apply(undefined, _arguments);
    }
    off(elem, type, handler);
  };
  on(elem, type, handler);
};

var delegate = function delegate(selector, type, handler, parent, isUndelegate) {
  var handle = function handle(e) {
    var event = window.event ? window.event : e;

    var target = event.target || event.srcElement;

    var delegateTarget = (0, _element.closest)(target, selector);
    var elem = document.querySelector(selector);
    if (delegateTarget) {
      handler.call(elem, e);
    }
  };

  var parentElem = parent || document.getElementsByTagName('body')[0];
  if (!isUndelegate) {
    delegateCb[selector] || (delegateCb[selector] = handle);
    on(parentElem, type, delegateCb[selector]);
  } else {
    off(parentElem, type, delegateCb[selector]);
    delete delegateCb[selector];
  }
};

var undelegate = function undelegate(selector, type, handler, parent) {
  delegate(selector, type, handler, parent, true);
};

exports.on = on;
exports.off = off;
exports.one = one;
exports.delegate = delegate;
exports.undelegate = undelegate;