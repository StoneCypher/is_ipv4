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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9qcy9pc19pcHY0LmpzIl0sIm5hbWVzIjpbImZhaWwiLCJ3aHkiLCJyZXN1bHQiLCJyZWFzb24iLCJjaGVjayIsIl9pcCIsImxldHRlckZpbHRlciIsIlJlZ0V4cCIsImNoZWNrX3F1YWQiLCJxdWFkIiwiaSIsImIiLCJsZW5ndGgiLCJidCIsInBhcnNlSW50IiwiaXNfcXVhZF9leCIsImlwIiwidGVzdCIsInNwbGl0IiwiaXNfcXVhZCIsImlzX2ludGVnZXIiLCJOdW1iZXIiLCJpc0ludGVnZXIiLCJpbnRlZ2VyX3RvX3F1YWQiLCJUeXBlRXJyb3IiLCJSYW5nZUVycm9yIiwiaW50X2FycmF5X3RvX3F1YWQiLCJpYSIsIkFycmF5IiwiaXNBcnJheSIsImJ5dGUiLCJ1bmRlZmluZWQiLCJpc05hTiIsInBhcnNlZF9xdWFkX3RvX3F1YWQiLCJhIiwiYyIsImQiLCJhc19xdWFkIiwiRXJyb3IiLCJhc19wYXJzZWRfcXVhZCIsImJ5dGVzIiwibWFwIiwicyIsIlBhcnNlZFF1YWQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFjQTs7OztBQVVBLElBQU1BLE9BQWlCLFNBQWpCQSxJQUFpQixDQUFDQyxHQUFEO0FBQUEsU0FFcEIsRUFBRUMsUUFBUSxLQUFWLEVBQWlCQyxRQUFRRixHQUF6QixFQUZvQjtBQUFBLENBQXZCOztBQVFBLElBQU1HLFFBQWtCLFNBQWxCQSxLQUFrQixDQUFDQyxHQUFEO0FBQUEsU0FFdEIsS0FGc0I7QUFBQSxDQUF4QixDLENBRVU7OztBQU1WLElBQU1DLGVBQXVCLElBQUlDLE1BQUosQ0FBVyxhQUFYLENBQTdCOztBQU1BLElBQU1DLGFBQXVCLFNBQXZCQSxVQUF1QixDQUFDQyxJQUFELEVBQTJDOztBQUV0RSxPQUFLLElBQUlDLElBQVksQ0FBckIsRUFBd0JBLElBQUUsQ0FBMUIsRUFBNkIsRUFBRUEsQ0FBL0IsRUFBa0M7QUFBRTs7QUFFbEMsUUFBTUMsSUFBWUYsS0FBS0MsQ0FBTCxDQUFsQjtBQUNBLFFBQUlDLEVBQUVD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QUlZLE1BQU1DLE9BQU4sQ0FBY2IsRUFBZCxDQUFKLEVBQXVCO0FBQzFCLFdBQU9VLGtCQUFrQlYsRUFBbEIsQ0FBUDtBQUNELEdBRkksTUFJQSxJQUFJRyxRQUFRSCxFQUFSLENBQUosRUFBaUI7QUFBRSxXQUFPQSxFQUFQO0FBQVk7O0FBRXBDLFFBQU0sSUFBSXNCLEtBQUosQ0FBVSx1Q0FBVixDQUFOO0FBRUQsQ0FsQkQ7O0FBd0JBOztBQUVBLElBQU1DLGlCQUEyQixTQUEzQkEsY0FBMkIsQ0FBQ3ZCLEVBQUQsRUFBd0I7O0FBRXZELE1BQUlBLG9DQUFKLEVBQThCO0FBQUUsV0FBT0EsRUFBUDtBQUFZOztBQUU1QyxNQUFNd0IsUUFBdUJILFFBQVFyQixFQUFSLEVBQVlFLEtBQVosQ0FBa0IsR0FBbEIsRUFDWXVCLEdBRFosQ0FDaUIsVUFBQ0MsQ0FBRDtBQUFBLFdBQXVCNUIsU0FBUzRCLENBQVQsRUFBWSxFQUFaLENBQXZCO0FBQUEsR0FEakIsQ0FBN0I7O0FBR0EscUdBQTBCRixLQUExQjtBQUVELENBVEQ7O1FBa0JJckIsTyxHQUFBQSxPO1FBQ0VKLFUsR0FBQUEsVTtRQUVGUSxlLEdBQUFBLGU7UUFDQUcsaUIsR0FBQUEsaUI7UUFFQWlCLFU7UUFDQVYsbUIsR0FBQUEsbUI7UUFLQWIsVSxHQUFBQSxVO1FBTUFpQixPLEdBQUFBLE87UUFDQUUsYyxHQUFBQSxjO1FBK0JBbkMsSyxHQUFBQSxLIiwiZmlsZSI6ImlzX2lwdjQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbi8vIEBmbG93XG5cbmltcG9ydCB0eXBlIHtcblxuICBJcCxcbiAgUmVzdWx0XG5cbn0gZnJvbSAnLi90eXBlcyc7XG5cblxuXG5cblxuaW1wb3J0IHtcblxuICBQYXJzZWRRdWFkXG5cbn0gZnJvbSAnLi90eXBlX2ltcGxzLmpzJztcblxuXG5cblxuXG5jb25zdCBmYWlsOiBGdW5jdGlvbiA9ICh3aHk6IHN0cmluZyk6IFJlc3VsdCA9PlxuXG4gICh7IHJlc3VsdDogZmFsc2UsIHJlYXNvbjogd2h5IH0pO1xuXG5cblxuXG5cbmNvbnN0IGNoZWNrOiBGdW5jdGlvbiA9IChfaXA6IElwKTogYm9vbGVhbiA9PlxuXG4gIGZhbHNlOyAgLy8gd2hhcmdhcmJsIHRvZG8gY29tZWJhY2tcblxuXG5cblxuXG5jb25zdCBsZXR0ZXJGaWx0ZXI6IFJlZ0V4cCA9IG5ldyBSZWdFeHAoJ15bMC05XFxcXC5dKyQnKTtcblxuXG5cblxuXG5jb25zdCBjaGVja19xdWFkOiBGdW5jdGlvbiA9IChxdWFkOiBBcnJheTxzdHJpbmc+KTogUmVzdWx0IHwgYm9vbGVhbiA9PiB7XG5cbiAgZm9yIChsZXQgaTogbnVtYmVyID0gMDsgaTw0OyArK2kpIHsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBmcC9uby1sb29wc1xuXG4gICAgY29uc3QgYjogc3RyaW5nID0gcXVhZFtpXTtcbiAgICBpZiAoYi5sZW5ndGggPT09IDApIHsgcmV0dXJuIGZhaWwoYEJ5dGUgJHtpfSBtdXN0IG5vdCBiZSBlbXB0eWApOyB9XG5cbiAgICBjb25zdCBidDogbnVtYmVyID0gcGFyc2VJbnQoYiwgMTApO1xuXG4gICAgLy8gbmVlZG4ndCBjaGVjayBiZWxvdyB6ZXJvLCBiZWNhdXNlIGNoYXJhY3RlciBmaWx0ZXIgcHJldmVudHMgbWludXMgc2lnbnNcbiAgICBpZiAoYnQgPiAyNTUpIHsgcmV0dXJuIGZhaWwoYEJ5dGUgJHtpfSBtdXN0IGJlIGJlbG93IDI1NmApOyB9XG5cbiAgICBpZiAoKGJbMF0gPT09ICcwJykgJiYgKGJ0ID4gMCkpIHtcbiAgICAgIHJldHVybiBmYWlsKGBOb256ZXJvIGJ5dGUgJHtpfSBtdXN0IG5vdCBiZWdpbiB3aXRoIHplcm9gKTtcbiAgICB9XG5cbiAgICBpZiAoKGIubGVuZ3RoID4gMSkgJiYgKGJ0ID09PSAwKSkge1xuICAgICAgcmV0dXJuIGZhaWwoYFplcm8gYnl0ZSAke2l9IG11c3Qgbm90IGhhdmUgbXVsdGlwbGUgemVyb2VzYCk7XG4gICAgfVxuXG4gIH1cblxuICByZXR1cm4geyByZXN1bHQ6IHRydWUgfTtcblxufTtcblxuXG5cblxuXG5jb25zdCBpc19xdWFkX2V4OiBGdW5jdGlvbiA9IChpcDogSXApOiBSZXN1bHQgPT4ge1xuXG4gIGlmICghKCB0eXBlb2YoaXApID09PSAnc3RyaW5nJyApKSB7XG4gICAgcmV0dXJuIGZhaWwoJ0FsbCBxdWFkcyBhcmUgc3RyaW5ncycpO1xuICB9XG5cbiAgaWYgKCEoIGxldHRlckZpbHRlci50ZXN0KGlwKSApKSB7XG4gICAgcmV0dXJuIGZhaWwoJ0EgcXVhZCBtYXkgb25seSBjb250YWluIDAtOSBhbmQgcGVyaW9kJyk7XG4gIH1cblxuXG4gIGNvbnN0IHF1YWQ6IEFycmF5PHN0cmluZz4gPSBpcC5zcGxpdCgnLicpO1xuICBpZiAoIShxdWFkLmxlbmd0aCA9PT0gNCkpIHsgcmV0dXJuIGZhaWwoJ0FsbCBjb21wbGV0ZSBxdWFkcyBoYXZlIGZvdXIgYnl0ZXMgc2VwYXJhdGVkIGJ5IHBlcmlvZHMnKTsgfVxuXG4gIHJldHVybiBjaGVja19xdWFkKHF1YWQpO1xuXG59O1xuXG5cblxuXG5cbmNvbnN0IGlzX3F1YWQ6IEZ1bmN0aW9uID0gKGlwOiBJcCk6IGJvb2xlYW4gPT5cblxuICBpc19xdWFkX2V4KGlwKS5yZXN1bHQ7XG5cblxuXG5cblxuY29uc3QgaXNfaW50ZWdlcjogRnVuY3Rpb24gPSAoaXA6IG51bWJlcik6IGJvb2xlYW4gPT5cblxuICAgIChOdW1iZXIuaXNJbnRlZ2VyKGlwKSlcbiAmJiAoaXAgPj0gMClcbiAmJiAoaXAgPD0gNDI5NDk2NzI5NSk7IC8vIDI1NS4yNTUuMjU1LjI1NVxuXG5cblxuXG5cbmNvbnN0IGludGVnZXJfdG9fcXVhZDogRnVuY3Rpb24gPSAoaXA6IG51bWJlcik6IHN0cmluZyA9PiB7XG5cbiAgaWYgKCEoTnVtYmVyLmlzSW50ZWdlcihpcCkpKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoJ2ludGVnZXJfdG9fcXVhZCBhY2NlcHRzIG9ubHkgaW50ZWdlcnMnKTsgfVxuXG4gIGlmIChpcCA8IDApICAgICAgICAgIHsgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ0lQIGludGVnZXIgbXVzdCBiZSBub24tbmVnYXRpdmUnKTsgfVxuICBpZiAoaXAgPiA0Mjk0OTY3Mjk1KSB7IHRocm93IG5ldyBSYW5nZUVycm9yKCdNYXhpbXVtIElQIGludGVnZXIgaXMgNCwyOTQsOTY3LDI5NScpOyB9XG5cbiAgcmV0dXJuIGAkeygoaXAgPj4gMjQpICYgMHhGRil9LiR7KChpcCA+PiAxNikgJiAweEZGKX0uJHsoKGlwID4+IDgpICYgMHhGRil9LiR7KGlwICYgMHhGRil9YDsgIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tYml0d2lzZVxuXG59O1xuXG5cblxuXG5cbmNvbnN0IGludF9hcnJheV90b19xdWFkOiBGdW5jdGlvbiA9IChpYTogQXJyYXk8bnVtYmVyPik6IHN0cmluZyA9PiB7XG5cbiAgaWYgKCEoQXJyYXkuaXNBcnJheShpYSkpKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignaW50X2FycmF5X3RvX3F1YWQgcmVxdWlyZXMgYW4gYXJyYXkgb2YgdW5zaWduZWQgYnl0ZSBpbnRlZ2VycycpO1xuICB9XG5cbiAgaWYgKChpYS5sZW5ndGggPCA0KSB8fCAoaWEubGVuZ3RoID4gNCkpIHtcbiAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcignaW50X2FycmF5X3RvX3F1YWQgcmVxdWlyZXMgYSA0LWJ5dGUgYXJyYXknKTtcbiAgfVxuXG4gIC8vIGNhbid0IGJlIGEgbWFwIHRvIHZhbGlkYXRlLCBiZWNhdXNlIGEgbWFwIHdpbGwgc2tpcCBob2xlc1xuICBmb3IgKGxldCBpOiBudW1iZXIgPSAwOyBpIDwgNDsgKytpKSB7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgZnAvbm8tbG9vcHNcblxuICAgIGNvbnN0IGJ5dGU6IG51bWJlciA9IGlhW2ldO1xuXG4gICAgaWYgKChieXRlID09PSB1bmRlZmluZWQpIHx8IChieXRlID09PSBudWxsKSB8fCBpc05hTihieXRlKSkge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihgYnl0ZSAke2l9IG11c3Qgbm90IGJlIHVuZGVmaW5lZCwgbnVsbCwgb3IgTmFOYCk7XG4gICAgfVxuXG4gICAgaWYgKCEoTnVtYmVyLmlzSW50ZWdlcihieXRlKSkpIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ2ludF9hcnJheV90b19xdWFkIGFjY2VwdHMgb25seSBhcnJheXMgb2YgaW50ZWdlcnMnKTtcbiAgICB9XG5cbiAgICBpZiAoYnl0ZSA8IDApIHtcbiAgICAgIHRocm93IG5ldyBSYW5nZUVycm9yKGBieXRlICR7aX0gc2hvdWxkIGJlIG5vbi1uZWdhdGl2ZWApO1xuICAgIH1cblxuICAgIGlmIChieXRlID4gMjU1KSB7XG4gICAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcihgYnl0ZSAke2l9IHNob3VsZCBiZSAyNTUgb3IgbG93ZXIgKHkna25vdywgYSBieXRlKWApO1xuICAgIH1cblxuICB9XG5cbiAgcmV0dXJuIGAke2lhWzBdfS4ke2lhWzFdfS4ke2lhWzJdfS4ke2lhWzNdfWA7XG5cbn07XG5cblxuXG5cblxuY29uc3QgcGFyc2VkX3F1YWRfdG9fcXVhZDogRnVuY3Rpb24gPSAoe2EsIGIsIGMsIGR9KTogc3RyaW5nID0+XG5cbiAgYCR7YX0uJHtifS4ke2N9LiR7ZH1gO1xuXG5cblxuXG5cbmNvbnN0IGFzX3F1YWQ6IEZ1bmN0aW9uID0gKGlwOiBJcCk6IHN0cmluZyA9PiB7XG5cbiAgaWYgKHR5cGVvZiBpcCA9PT0gJ251bWJlcicpIHtcbiAgICByZXR1cm4gaW50ZWdlcl90b19xdWFkKGlwKTtcbiAgfVxuXG4gIGVsc2UgaWYgKGlwIGluc3RhbmNlb2YgUGFyc2VkUXVhZCkge1xuICAgIHJldHVybiBwYXJzZWRfcXVhZF90b19xdWFkKGlwKTtcbiAgfVxuXG4gIGVsc2UgaWYgKEFycmF5LmlzQXJyYXkoaXApKSB7XG4gICAgcmV0dXJuIGludF9hcnJheV90b19xdWFkKGlwKTtcbiAgfVxuXG4gIGVsc2UgaWYgKGlzX3F1YWQoaXApKSB7IHJldHVybiBpcDsgfVxuXG4gIHRocm93IG5ldyBFcnJvcignY2Fubm90IGNvbnN0cnVjdCBxdWFkIGZyb20gdGhpcyBpbnB1dCcpO1xuXG59O1xuXG5cblxuXG5cbi8vIHRvZG8gd2hhcmdhcmJsIGNvbWViYWNrIG5lZWRzIHRvIGhhbmRsZSBpbnRlZ2Vyc1xuXG5jb25zdCBhc19wYXJzZWRfcXVhZDogRnVuY3Rpb24gPSAoaXA6IElwKTogUGFyc2VkUXVhZCA9PiB7XG5cbiAgaWYgKGlwIGluc3RhbmNlb2YgUGFyc2VkUXVhZCkgeyByZXR1cm4gaXA7IH1cblxuICBjb25zdCBieXRlczogQXJyYXk8bnVtYmVyPiA9IGFzX3F1YWQoaXApLnNwbGl0KCcuJylcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5tYXAoIChzOiBzdHJpbmcpOiBudW1iZXIgPT4gcGFyc2VJbnQocywgMTApKTtcblxuICByZXR1cm4gbmV3IFBhcnNlZFF1YWQoLi4uIGJ5dGVzKTtcblxufTtcblxuXG5cblxuZXhwb3J0IHtcblxuLy8gICAgaXNfc2ltcGxlLFxuXG4gICAgaXNfcXVhZCxcbiAgICAgIGlzX3F1YWRfZXgsXG5cbiAgICBpbnRlZ2VyX3RvX3F1YWQsXG4gICAgaW50X2FycmF5X3RvX3F1YWQsXG5cbiAgICBQYXJzZWRRdWFkLFxuICAgIHBhcnNlZF9xdWFkX3RvX3F1YWQsXG5cbi8vICAgIGlzX2luY29tcGxldGVfcXVhZCxcbi8vICAgICAgaXNfaW5jb21wbGV0ZV9xdWFkX2V4LFxuXG4gICAgaXNfaW50ZWdlcixcblxuIC8vICAgIGlzX2NvbXBsZXgsICAvLyBoYXMgcG9ydCBvciBzdWJuZXQgbWFza1xuIC8vICAgIGlzX2NvbXBsZXhfcXVhZCxcbiAvLyAgICBpc19jb21wbGV4X2ludGVnZXIsXG5cbiAgICBhc19xdWFkLFxuICAgIGFzX3BhcnNlZF9xdWFkLFxuIC8vICAgIGFzX2ludGVnZXIsXG5cbiAvLyAgICBpc19yYW5nZSxcbiAvLyAgICBpc19jdXJyZW50X25ldHdvcmssXG5cbiAvLyAgICBpc19zcGVjaWFsLFxuIC8vICAgIGlzX2xvb3BiYWNrLFxuIC8vICAgIGlzX2xpbmtfbG9jYWwsXG4gLy8gICAgaXNfaWV0Zl9wcm90b2NvbCxcbiAvLyAgICBpc19pcHY2X3RvX2lwdjRfcmVsYXksXG4gLy8gICAgaXNfYmVuY2htYXJrLFxuXG4gLy8gICAgaXNfdGVzdG5ldCxcbiAvLyAgICAgIGlzX3Rlc3RuZXRfMSxcbiAvLyAgICAgIGlzX3Rlc3RuZXRfMixcbiAvLyAgICAgIGlzX3Rlc3RuZXRfMyxcblxuIC8vICAgIGlzX3ByaXZhdGUsXG4gLy8gICAgICBpc19wcml2YXRlXzEwLFxuIC8vICAgICAgaXNfcHJpdmF0ZV8xNzIsXG4gLy8gICAgICBpc19wcml2YXRlXzE5MixcblxuIC8vICAgIGlzX3NoYXJlZCxcbiAvLyAgICBpc19saW5rLFxuIC8vICAgIGlzX211bHRpY2FzdCxcbiAvLyAgICBpc19icm9hZGNhc3QsXG4gLy8gICAgaXNfc3VibmV0LFxuIC8vICAgIGlzX3N1Ym5ldF9icm9hZGNhc3QsXG4gLy8gICAgaXNfcmVzZXJ2ZWQsXG5cbiAgICBjaGVja1xuXG59O1xuIl19