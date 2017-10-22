require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"is_ipv4":[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});


var fail = function fail(why) {
  return { result: false, reason: why };
};

var check = function check(_ip) {
  return false;
};

var letterFilter = new RegExp('^[0-9\\.]+$');

var is_quad_ex = function is_quad_ex(ip) {

  if (!(typeof ip === 'string')) {
    return fail('All quads are strings');
  }

  if (!letterFilter.test(ip)) {
    return fail('A quad may only contain 0-9 and period');
  }

  var quad = ip.split('.');
  if (!(quad.length === 4)) {
    return fail('All complete quads have four bytes separated by periods');
  }

  for (var i = 0; i < 4; ++i) {
    // eslint-disable-line fp/no-loops

    var b = quad[i];
    if (b.length === 0) {
      return fail('Byte ' + i + ' must not be empty');
    }

    var bt = parseInt(b, 10);

    // needn't check below zero, because character filter prevents minus signs
    if (bt > 255) {
      return fail('Byte ' + i + ' must be below 256');
    }

    if (b[0] === '0' && bt > 0) {
      return fail('Nonzero byte ' + i + ' must not begin with zero');
    }

    if (b.length > 1 && bt === 0) {
      return fail('Zero byte ' + i + ' must not have multiple zeroes');
    }
  }

  return { result: true };
};

var is_quad = function is_quad(ip) {
  return is_quad_ex(ip).result;
};

exports.is_quad = is_quad;
exports.is_quad_ex = is_quad_ex;
exports.check = check;

},{}]},{},[]);
