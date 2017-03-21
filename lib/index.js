'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.closest = exports.matches = exports.undelegate = exports.delegate = exports.one = exports.off = exports.on = undefined;

var _event = require('./event.js');

var _element = require('./element.js');

exports.on = _event.on;
exports.off = _event.off;
exports.one = _event.one;
exports.delegate = _event.delegate;
exports.undelegate = _event.undelegate;
exports.matches = _element.matches;
exports.closest = _element.closest;