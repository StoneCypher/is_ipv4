require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function ParsedQuad(a, b, c, d) {

  this.a = a;
  this.b = b;
  this.c = c;
  this.d = d;

  return this;
}

exports.ParsedQuad = ParsedQuad;

},{}],"is_ipv4":[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.check = exports.as_parsed_quad = exports.as_quad = exports.is_integer = exports.parsed_quad_to_quad = exports.ParsedQuad = exports.int_array_to_quad = exports.integer_to_quad = exports.is_quad_ex = exports.is_quad = undefined;

var _type_impls = require('./type_impls.js');

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var fail = function fail(why) {
  return { result: false, reason: why };
};

var check = function check(_ip) {
  return false;
}; // whargarbl todo comeback


var letterFilter = new RegExp('^[0-9\\.]+$');

var check_quad = function check_quad(quad) {

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

  return check_quad(quad);
};

var is_quad = function is_quad(ip) {
  return is_quad_ex(ip).result;
};

var is_integer = function is_integer(ip) {
  return Number.isInteger(ip) && ip >= 0 && ip <= 4294967295;
}; // 255.255.255.255


var integer_to_quad = function integer_to_quad(ip) {

  if (!Number.isInteger(ip)) {
    throw new TypeError('integer_to_quad accepts only integers');
  }

  if (ip < 0) {
    throw new RangeError('IP integer must be non-negative');
  }
  if (ip > 4294967295) {
    throw new RangeError('Maximum IP integer is 4,294,967,295');
  }

  return (ip >> 24 & 0xFF) + '.' + (ip >> 16 & 0xFF) + '.' + (ip >> 8 & 0xFF) + '.' + (ip & 0xFF); // eslint-disable-line no-bitwise
};

var int_array_to_quad = function int_array_to_quad(ia) {

  if (!Array.isArray(ia)) {
    throw new TypeError('int_array_to_quad requires an array of unsigned byte integers');
  }

  if (ia.length < 4 || ia.length > 4) {
    throw new RangeError('int_array_to_quad requires a 4-byte array');
  }

  // can't be a map to validate, because a map will skip holes
  for (var i = 0; i < 4; ++i) {
    // eslint-disable-line fp/no-loops

    var byte = ia[i];

    if (byte === undefined || byte === null || isNaN(byte)) {
      throw new TypeError('byte ' + i + ' must not be undefined, null, or NaN');
    }

    if (!Number.isInteger(byte)) {
      throw new TypeError('int_array_to_quad accepts only arrays of integers');
    }

    if (byte < 0) {
      throw new RangeError('byte ' + i + ' should be non-negative');
    }

    if (byte > 255) {
      throw new RangeError('byte ' + i + ' should be 255 or lower (y\'know, a byte)');
    }
  }

  return ia[0] + '.' + ia[1] + '.' + ia[2] + '.' + ia[3];
};

var parsed_quad_to_quad = function parsed_quad_to_quad(_ref) {
  var a = _ref.a,
      b = _ref.b,
      c = _ref.c,
      d = _ref.d;
  return a + '.' + b + '.' + c + '.' + d;
};

var as_quad = function as_quad(ip) {

  if (typeof ip === 'number') {
    return integer_to_quad(ip);
  } else if (ip instanceof _type_impls.ParsedQuad) {
    return parsed_quad_to_quad(ip);
  } else if (Array.isArray(ip)) {
    return int_array_to_quad(ip);
  } else if (is_quad(ip)) {
    return ip;
  }

  throw new Error('cannot construct quad from this input');
};

// todo whargarbl comeback needs to handle integers

var as_parsed_quad = function as_parsed_quad(ip) {

  if (ip instanceof _type_impls.ParsedQuad) {
    return ip;
  }

  var bytes = as_quad(ip).split('.').map(function (s) {
    return parseInt(s, 10);
  });

  return new (Function.prototype.bind.apply(_type_impls.ParsedQuad, [null].concat(_toConsumableArray(bytes))))();
};

exports.is_quad = is_quad;
exports.is_quad_ex = is_quad_ex;
exports.integer_to_quad = integer_to_quad;
exports.int_array_to_quad = int_array_to_quad;
exports.ParsedQuad = _type_impls.ParsedQuad;
exports.parsed_quad_to_quad = parsed_quad_to_quad;
exports.is_integer = is_integer;
exports.as_quad = as_quad;
exports.as_parsed_quad = as_parsed_quad;
exports.check = check;

},{"./type_impls.js":1}]},{},[]);
