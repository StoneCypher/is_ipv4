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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9qcy9pc19pcHY0LmpzIl0sIm5hbWVzIjpbImZhaWwiLCJ3aHkiLCJyZXN1bHQiLCJyZWFzb24iLCJjaGVjayIsIl9pcCIsImxldHRlckZpbHRlciIsIlJlZ0V4cCIsImNoZWNrX3F1YWQiLCJxdWFkIiwiaSIsImIiLCJsZW5ndGgiLCJidCIsInBhcnNlSW50IiwiaXNfcXVhZF9leCIsImlwIiwidGVzdCIsInNwbGl0IiwiaXNfcXVhZCIsImlzX2ludGVnZXIiLCJOdW1iZXIiLCJpc0ludGVnZXIiLCJpbnRlZ2VyX3RvX3F1YWQiLCJUeXBlRXJyb3IiLCJSYW5nZUVycm9yIiwiaW50X2FycmF5X3RvX3F1YWQiLCJpYSIsIkFycmF5IiwiaXNBcnJheSIsImJ5dGUiLCJ1bmRlZmluZWQiLCJpc05hTiIsInBhcnNlZF9xdWFkX3RvX3F1YWQiLCJhIiwiYyIsImQiLCJhc19xdWFkIiwiUGFyc2VkUXVhZCIsIkVycm9yIiwiYXNfcGFyc2VkX3F1YWQiLCJieXRlcyIsIm1hcCIsInMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFjQTs7OztBQVVBLElBQU1BLE9BQWlCLFNBQWpCQSxJQUFpQixDQUFDQyxHQUFEO0FBQUEsU0FFcEIsRUFBRUMsUUFBUSxLQUFWLEVBQWlCQyxRQUFRRixHQUF6QixFQUZvQjtBQUFBLENBQXZCOztBQVFBLElBQU1HLFFBQWtCLFNBQWxCQSxLQUFrQixDQUFDQyxHQUFEO0FBQUEsU0FFdEIsS0FGc0I7QUFBQSxDQUF4QixDLENBRVU7OztBQU1WLElBQU1DLGVBQXVCLElBQUlDLE1BQUosQ0FBVyxhQUFYLENBQTdCOztBQU1BLElBQU1DLGFBQXVCLFNBQXZCQSxVQUF1QixDQUFDQyxJQUFELEVBQTJDOztBQUV0RSxPQUFLLElBQUlDLElBQVksQ0FBckIsRUFBd0JBLElBQUUsQ0FBMUIsRUFBNkIsRUFBRUEsQ0FBL0IsRUFBa0M7QUFBRTs7QUFFbEMsUUFBTUMsSUFBWUYsS0FBS0MsQ0FBTCxDQUFsQjtBQUNBLFFBQUlDLEVBQUVD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TUFJQSxJQUFJWSxNQUFNQyxPQUFOLENBQWNiLEVBQWQsQ0FBSixFQUF1QjtBQUMxQixXQUFPVSxrQkFBa0JWLEVBQWxCLENBQVA7QUFDRCxHQUZJLE1BSUEsSUFBSUcsUUFBUUgsRUFBUixDQUFKLEVBQWlCO0FBQUUsV0FBT0EsRUFBUDtBQUFZOztBQUVwQyxRQUFNLElBQUl1QixLQUFKLENBQVUsdUNBQVYsQ0FBTjtBQUVELENBbEJEOztBQXdCQTs7QUFFQSxJQUFNQyxpQkFBMkIsU0FBM0JBLGNBQTJCLENBQUN4QixFQUFELEVBQXdCOztBQUV2RCxNQUFJQSxjQUFjc0Isc0JBQWxCLEVBQThCO0FBQUUsV0FBT3RCLEVBQVA7QUFBWTs7QUFFNUMsTUFBTXlCLFFBQXVCSixRQUFRckIsRUFBUixFQUFZRSxLQUFaLENBQWtCLEdBQWxCLEVBQ1l3QixHQURaLENBQ2lCLFVBQUNDLENBQUQ7QUFBQSxXQUF1QjdCLFNBQVM2QixDQUFULEVBQVksRUFBWixDQUF2QjtBQUFBLEdBRGpCLENBQTdCOztBQUdBLDRDQUFXTCxzQkFBWCxtQ0FBMEJHLEtBQTFCO0FBRUQsQ0FURDs7UUFrQkl0QixPLEdBQUFBLE87UUFDRUosVSxHQUFBQSxVO1FBRUZRLGUsR0FBQUEsZTtRQUNBRyxpQixHQUFBQSxpQjtRQUVBWSxVLEdBQUFBLHNCO1FBQ0FMLG1CLEdBQUFBLG1CO1FBS0FiLFUsR0FBQUEsVTtRQU1BaUIsTyxHQUFBQSxPO1FBQ0FHLGMsR0FBQUEsYztRQStCQXBDLEssR0FBQUEsSyIsImZpbGUiOiJpc19pcHY0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbi8vIEBmbG93XHJcblxyXG5pbXBvcnQgdHlwZSB7XHJcblxyXG4gIElwLFxyXG4gIFJlc3VsdFxyXG5cclxufSBmcm9tICcuL3R5cGVzJztcclxuXHJcblxyXG5cclxuXHJcblxyXG5pbXBvcnQge1xyXG5cclxuICBQYXJzZWRRdWFkXHJcblxyXG59IGZyb20gJy4vdHlwZV9pbXBscy5qcyc7XHJcblxyXG5cclxuXHJcblxyXG5cclxuY29uc3QgZmFpbDogRnVuY3Rpb24gPSAod2h5OiBzdHJpbmcpOiBSZXN1bHQgPT5cclxuXHJcbiAgKHsgcmVzdWx0OiBmYWxzZSwgcmVhc29uOiB3aHkgfSk7XHJcblxyXG5cclxuXHJcblxyXG5cclxuY29uc3QgY2hlY2s6IEZ1bmN0aW9uID0gKF9pcDogSXApOiBib29sZWFuID0+XHJcblxyXG4gIGZhbHNlOyAgLy8gd2hhcmdhcmJsIHRvZG8gY29tZWJhY2tcclxuXHJcblxyXG5cclxuXHJcblxyXG5jb25zdCBsZXR0ZXJGaWx0ZXI6IFJlZ0V4cCA9IG5ldyBSZWdFeHAoJ15bMC05XFxcXC5dKyQnKTtcclxuXHJcblxyXG5cclxuXHJcblxyXG5jb25zdCBjaGVja19xdWFkOiBGdW5jdGlvbiA9IChxdWFkOiBBcnJheTxzdHJpbmc+KTogUmVzdWx0IHwgYm9vbGVhbiA9PiB7XHJcblxyXG4gIGZvciAobGV0IGk6IG51bWJlciA9IDA7IGk8NDsgKytpKSB7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgZnAvbm8tbG9vcHNcclxuXHJcbiAgICBjb25zdCBiOiBzdHJpbmcgPSBxdWFkW2ldO1xyXG4gICAgaWYgKGIubGVuZ3RoID09PSAwKSB7IHJldHVybiBmYWlsKGBCeXRlICR7aX0gbXVzdCBub3QgYmUgZW1wdHlgKTsgfVxyXG5cclxuICAgIGNvbnN0IGJ0OiBudW1iZXIgPSBwYXJzZUludChiLCAxMCk7XHJcblxyXG4gICAgLy8gbmVlZG4ndCBjaGVjayBiZWxvdyB6ZXJvLCBiZWNhdXNlIGNoYXJhY3RlciBmaWx0ZXIgcHJldmVudHMgbWludXMgc2lnbnNcclxuICAgIGlmIChidCA+IDI1NSkgeyByZXR1cm4gZmFpbChgQnl0ZSAke2l9IG11c3QgYmUgYmVsb3cgMjU2YCk7IH1cclxuXHJcbiAgICBpZiAoKGJbMF0gPT09ICcwJykgJiYgKGJ0ID4gMCkpIHtcclxuICAgICAgcmV0dXJuIGZhaWwoYE5vbnplcm8gYnl0ZSAke2l9IG11c3Qgbm90IGJlZ2luIHdpdGggemVyb2ApO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICgoYi5sZW5ndGggPiAxKSAmJiAoYnQgPT09IDApKSB7XHJcbiAgICAgIHJldHVybiBmYWlsKGBaZXJvIGJ5dGUgJHtpfSBtdXN0IG5vdCBoYXZlIG11bHRpcGxlIHplcm9lc2ApO1xyXG4gICAgfVxyXG5cclxuICB9XHJcblxyXG4gIHJldHVybiB7IHJlc3VsdDogdHJ1ZSB9O1xyXG5cclxufTtcclxuXHJcblxyXG5cclxuXHJcblxyXG5jb25zdCBpc19xdWFkX2V4OiBGdW5jdGlvbiA9IChpcDogSXApOiBSZXN1bHQgPT4ge1xyXG5cclxuICBpZiAoISggdHlwZW9mKGlwKSA9PT0gJ3N0cmluZycgKSkge1xyXG4gICAgcmV0dXJuIGZhaWwoJ0FsbCBxdWFkcyBhcmUgc3RyaW5ncycpO1xyXG4gIH1cclxuXHJcbiAgaWYgKCEoIGxldHRlckZpbHRlci50ZXN0KGlwKSApKSB7XHJcbiAgICByZXR1cm4gZmFpbCgnQSBxdWFkIG1heSBvbmx5IGNvbnRhaW4gMC05IGFuZCBwZXJpb2QnKTtcclxuICB9XHJcblxyXG5cclxuICBjb25zdCBxdWFkOiBBcnJheTxzdHJpbmc+ID0gaXAuc3BsaXQoJy4nKTtcclxuICBpZiAoIShxdWFkLmxlbmd0aCA9PT0gNCkpIHsgcmV0dXJuIGZhaWwoJ0FsbCBjb21wbGV0ZSBxdWFkcyBoYXZlIGZvdXIgYnl0ZXMgc2VwYXJhdGVkIGJ5IHBlcmlvZHMnKTsgfVxyXG5cclxuICByZXR1cm4gY2hlY2tfcXVhZChxdWFkKTtcclxuXHJcbn07XHJcblxyXG5cclxuXHJcblxyXG5cclxuY29uc3QgaXNfcXVhZDogRnVuY3Rpb24gPSAoaXA6IElwKTogYm9vbGVhbiA9PlxyXG5cclxuICBpc19xdWFkX2V4KGlwKS5yZXN1bHQ7XHJcblxyXG5cclxuXHJcblxyXG5cclxuY29uc3QgaXNfaW50ZWdlcjogRnVuY3Rpb24gPSAoaXA6IG51bWJlcik6IGJvb2xlYW4gPT5cclxuXHJcbiAgICAoTnVtYmVyLmlzSW50ZWdlcihpcCkpXHJcbiAmJiAoaXAgPj0gMClcclxuICYmIChpcCA8PSA0Mjk0OTY3Mjk1KTsgLy8gMjU1LjI1NS4yNTUuMjU1XHJcblxyXG5cclxuXHJcblxyXG5cclxuY29uc3QgaW50ZWdlcl90b19xdWFkOiBGdW5jdGlvbiA9IChpcDogbnVtYmVyKTogc3RyaW5nID0+IHtcclxuXHJcbiAgaWYgKCEoTnVtYmVyLmlzSW50ZWdlcihpcCkpKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoJ2ludGVnZXJfdG9fcXVhZCBhY2NlcHRzIG9ubHkgaW50ZWdlcnMnKTsgfVxyXG5cclxuICBpZiAoaXAgPCAwKSAgICAgICAgICB7IHRocm93IG5ldyBSYW5nZUVycm9yKCdJUCBpbnRlZ2VyIG11c3QgYmUgbm9uLW5lZ2F0aXZlJyk7IH1cclxuICBpZiAoaXAgPiA0Mjk0OTY3Mjk1KSB7IHRocm93IG5ldyBSYW5nZUVycm9yKCdNYXhpbXVtIElQIGludGVnZXIgaXMgNCwyOTQsOTY3LDI5NScpOyB9XHJcblxyXG4gIHJldHVybiBgJHsoKGlwID4+IDI0KSAmIDB4RkYpfS4keygoaXAgPj4gMTYpICYgMHhGRil9LiR7KChpcCA+PiA4KSAmIDB4RkYpfS4keyhpcCAmIDB4RkYpfWA7ICAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLWJpdHdpc2VcclxuXHJcbn07XHJcblxyXG5cclxuXHJcblxyXG5cclxuY29uc3QgaW50X2FycmF5X3RvX3F1YWQ6IEZ1bmN0aW9uID0gKGlhOiBBcnJheTxudW1iZXI+KTogc3RyaW5nID0+IHtcclxuXHJcbiAgaWYgKCEoQXJyYXkuaXNBcnJheShpYSkpKSB7XHJcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdpbnRfYXJyYXlfdG9fcXVhZCByZXF1aXJlcyBhbiBhcnJheSBvZiB1bnNpZ25lZCBieXRlIGludGVnZXJzJyk7XHJcbiAgfVxyXG5cclxuICBpZiAoKGlhLmxlbmd0aCA8IDQpIHx8IChpYS5sZW5ndGggPiA0KSkge1xyXG4gICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ2ludF9hcnJheV90b19xdWFkIHJlcXVpcmVzIGEgNC1ieXRlIGFycmF5Jyk7XHJcbiAgfVxyXG5cclxuICAvLyBjYW4ndCBiZSBhIG1hcCB0byB2YWxpZGF0ZSwgYmVjYXVzZSBhIG1hcCB3aWxsIHNraXAgaG9sZXNcclxuICBmb3IgKGxldCBpOiBudW1iZXIgPSAwOyBpIDwgNDsgKytpKSB7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgZnAvbm8tbG9vcHNcclxuXHJcbiAgICBjb25zdCBieXRlOiBudW1iZXIgPSBpYVtpXTtcclxuXHJcbiAgICBpZiAoKGJ5dGUgPT09IHVuZGVmaW5lZCkgfHwgKGJ5dGUgPT09IG51bGwpIHx8IGlzTmFOKGJ5dGUpKSB7XHJcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoYGJ5dGUgJHtpfSBtdXN0IG5vdCBiZSB1bmRlZmluZWQsIG51bGwsIG9yIE5hTmApO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICghKE51bWJlci5pc0ludGVnZXIoYnl0ZSkpKSB7XHJcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ2ludF9hcnJheV90b19xdWFkIGFjY2VwdHMgb25seSBhcnJheXMgb2YgaW50ZWdlcnMnKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoYnl0ZSA8IDApIHtcclxuICAgICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoYGJ5dGUgJHtpfSBzaG91bGQgYmUgbm9uLW5lZ2F0aXZlYCk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGJ5dGUgPiAyNTUpIHtcclxuICAgICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoYGJ5dGUgJHtpfSBzaG91bGQgYmUgMjU1IG9yIGxvd2VyICh5J2tub3csIGEgYnl0ZSlgKTtcclxuICAgIH1cclxuXHJcbiAgfVxyXG5cclxuICByZXR1cm4gYCR7aWFbMF19LiR7aWFbMV19LiR7aWFbMl19LiR7aWFbM119YDtcclxuXHJcbn07XHJcblxyXG5cclxuXHJcblxyXG5cclxuY29uc3QgcGFyc2VkX3F1YWRfdG9fcXVhZDogRnVuY3Rpb24gPSAoe2EsIGIsIGMsIGR9KTogc3RyaW5nID0+XHJcblxyXG4gIGAke2F9LiR7Yn0uJHtjfS4ke2R9YDtcclxuXHJcblxyXG5cclxuXHJcblxyXG5jb25zdCBhc19xdWFkOiBGdW5jdGlvbiA9IChpcDogSXApOiBzdHJpbmcgPT4ge1xyXG5cclxuICBpZiAodHlwZW9mIGlwID09PSAnbnVtYmVyJykge1xyXG4gICAgcmV0dXJuIGludGVnZXJfdG9fcXVhZChpcCk7XHJcbiAgfVxyXG5cclxuICBlbHNlIGlmIChpcCBpbnN0YW5jZW9mIFBhcnNlZFF1YWQpIHtcclxuICAgIHJldHVybiBwYXJzZWRfcXVhZF90b19xdWFkKGlwKTtcclxuICB9XHJcblxyXG4gIGVsc2UgaWYgKEFycmF5LmlzQXJyYXkoaXApKSB7XHJcbiAgICByZXR1cm4gaW50X2FycmF5X3RvX3F1YWQoaXApO1xyXG4gIH1cclxuXHJcbiAgZWxzZSBpZiAoaXNfcXVhZChpcCkpIHsgcmV0dXJuIGlwOyB9XHJcblxyXG4gIHRocm93IG5ldyBFcnJvcignY2Fubm90IGNvbnN0cnVjdCBxdWFkIGZyb20gdGhpcyBpbnB1dCcpO1xyXG5cclxufTtcclxuXHJcblxyXG5cclxuXHJcblxyXG4vLyB0b2RvIHdoYXJnYXJibCBjb21lYmFjayBuZWVkcyB0byBoYW5kbGUgaW50ZWdlcnNcclxuXHJcbmNvbnN0IGFzX3BhcnNlZF9xdWFkOiBGdW5jdGlvbiA9IChpcDogSXApOiBQYXJzZWRRdWFkID0+IHtcclxuXHJcbiAgaWYgKGlwIGluc3RhbmNlb2YgUGFyc2VkUXVhZCkgeyByZXR1cm4gaXA7IH1cclxuXHJcbiAgY29uc3QgYnl0ZXM6IEFycmF5PG51bWJlcj4gPSBhc19xdWFkKGlwKS5zcGxpdCgnLicpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5tYXAoIChzOiBzdHJpbmcpOiBudW1iZXIgPT4gcGFyc2VJbnQocywgMTApKTtcclxuXHJcbiAgcmV0dXJuIG5ldyBQYXJzZWRRdWFkKC4uLiBieXRlcyk7XHJcblxyXG59O1xyXG5cclxuXHJcblxyXG5cclxuZXhwb3J0IHtcclxuXHJcbi8vICAgIGlzX3NpbXBsZSxcclxuXHJcbiAgICBpc19xdWFkLFxyXG4gICAgICBpc19xdWFkX2V4LFxyXG5cclxuICAgIGludGVnZXJfdG9fcXVhZCxcclxuICAgIGludF9hcnJheV90b19xdWFkLFxyXG5cclxuICAgIFBhcnNlZFF1YWQsXHJcbiAgICBwYXJzZWRfcXVhZF90b19xdWFkLFxyXG5cclxuLy8gICAgaXNfaW5jb21wbGV0ZV9xdWFkLFxyXG4vLyAgICAgIGlzX2luY29tcGxldGVfcXVhZF9leCxcclxuXHJcbiAgICBpc19pbnRlZ2VyLFxyXG5cclxuIC8vICAgIGlzX2NvbXBsZXgsICAvLyBoYXMgcG9ydCBvciBzdWJuZXQgbWFza1xyXG4gLy8gICAgaXNfY29tcGxleF9xdWFkLFxyXG4gLy8gICAgaXNfY29tcGxleF9pbnRlZ2VyLFxyXG5cclxuICAgIGFzX3F1YWQsXHJcbiAgICBhc19wYXJzZWRfcXVhZCxcclxuIC8vICAgIGFzX2ludGVnZXIsXHJcblxyXG4gLy8gICAgaXNfcmFuZ2UsXHJcbiAvLyAgICBpc19jdXJyZW50X25ldHdvcmssXHJcblxyXG4gLy8gICAgaXNfc3BlY2lhbCxcclxuIC8vICAgIGlzX2xvb3BiYWNrLFxyXG4gLy8gICAgaXNfbGlua19sb2NhbCxcclxuIC8vICAgIGlzX2lldGZfcHJvdG9jb2wsXHJcbiAvLyAgICBpc19pcHY2X3RvX2lwdjRfcmVsYXksXHJcbiAvLyAgICBpc19iZW5jaG1hcmssXHJcblxyXG4gLy8gICAgaXNfdGVzdG5ldCxcclxuIC8vICAgICAgaXNfdGVzdG5ldF8xLFxyXG4gLy8gICAgICBpc190ZXN0bmV0XzIsXHJcbiAvLyAgICAgIGlzX3Rlc3RuZXRfMyxcclxuXHJcbiAvLyAgICBpc19wcml2YXRlLFxyXG4gLy8gICAgICBpc19wcml2YXRlXzEwLFxyXG4gLy8gICAgICBpc19wcml2YXRlXzE3MixcclxuIC8vICAgICAgaXNfcHJpdmF0ZV8xOTIsXHJcblxyXG4gLy8gICAgaXNfc2hhcmVkLFxyXG4gLy8gICAgaXNfbGluayxcclxuIC8vICAgIGlzX211bHRpY2FzdCxcclxuIC8vICAgIGlzX2Jyb2FkY2FzdCxcclxuIC8vICAgIGlzX3N1Ym5ldCxcclxuIC8vICAgIGlzX3N1Ym5ldF9icm9hZGNhc3QsXHJcbiAvLyAgICBpc19yZXNlcnZlZCxcclxuXHJcbiAgICBjaGVja1xyXG5cclxufTtcclxuIl19