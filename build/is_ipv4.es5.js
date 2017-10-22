'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var fail = function fail(why) {
  return { result: false, reason: why };
};

var check = function check(_ip) {
  return false;
};

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

  /*
    for (let i: number = 0; i<4; ++i) { // eslint-disable-line fp/no-loops
  
      const b: string = quad[i];
      if (b.length === 0) { return fail(`Byte ${i} must not be empty`); }
  
      const bt: number = parseInt(b, 10);
  
      // needn't check below zero, because character filter prevents minus signs
      if (bt > 255) { return fail(`Byte ${i} must be below 256`); }
  
      if ((b[0] === '0') && (bt > 0)) {
        return fail(`Nonzero byte ${i} must not begin with zero`);
      }
  
      if ((b.length > 1) && (bt === 0)) {
        return fail(`Zero byte ${i} must not have multiple zeroes`);
      }
  
    }
  
  
    return { result: true };
  */
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

  if (ia.length < 4) {
    throw new RangeError('int_array_to_quad requires a 4-byte array');
  }

  ia.map(function (byte, i) {

    if (!Number.isInteger(byte)) {
      throw new TypeError('int_array_to_quad accepts only arrays of integers');
    }

    if (byte < 0) {
      throw new RangeError('byte ' + i + ' should be non-negative');
    }

    if (byte > 255) {
      throw new RangeError('byte ' + i + ' should be 255 or lower (y\'know, a byte)');
    }
  });

  return ia[0] + '.' + ia[1] + '.' + ia[2] + '.' + ia[3];
};

function ParsedQuad(a, b, c, d) {

  this.a = a;
  this.b = b;
  this.c = c;
  this.d = d;

  return this;
}

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
  } else if (ip instanceof ParsedQuad) {
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

  if (ip instanceof ParsedQuad) {
    return ip;
  }

  var bytes = as_quad(ip).split('.').map(function (s) {
    return parseInt(s, 10);
  });

  return new (Function.prototype.bind.apply(ParsedQuad, [null].concat(_toConsumableArray(bytes))))();
};

exports.is_quad = is_quad;
exports.is_quad_ex = is_quad_ex;
exports.integer_to_quad = integer_to_quad;
exports.ParsedQuad = ParsedQuad;
exports.parsed_quad_to_quad = parsed_quad_to_quad;
exports.is_integer = is_integer;
exports.as_quad = as_quad;
exports.as_parsed_quad = as_parsed_quad;
exports.check = check;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9qcy9pc19pcHY0LmpzIl0sIm5hbWVzIjpbImZhaWwiLCJ3aHkiLCJyZXN1bHQiLCJyZWFzb24iLCJjaGVjayIsIl9pcCIsImxldHRlckZpbHRlciIsIlJlZ0V4cCIsImNoZWNrX3F1YWQiLCJxdWFkIiwiaSIsImIiLCJsZW5ndGgiLCJidCIsInBhcnNlSW50IiwiaXNfcXVhZF9leCIsImlwIiwidGVzdCIsInNwbGl0IiwiaXNfcXVhZCIsImlzX2ludGVnZXIiLCJOdW1iZXIiLCJpc0ludGVnZXIiLCJpbnRlZ2VyX3RvX3F1YWQiLCJUeXBlRXJyb3IiLCJSYW5nZUVycm9yIiwiaW50X2FycmF5X3RvX3F1YWQiLCJpYSIsIm1hcCIsImJ5dGUiLCJQYXJzZWRRdWFkIiwiYSIsImMiLCJkIiwicGFyc2VkX3F1YWRfdG9fcXVhZCIsImFzX3F1YWQiLCJBcnJheSIsImlzQXJyYXkiLCJFcnJvciIsImFzX3BhcnNlZF9xdWFkIiwiYnl0ZXMiLCJzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQWNBLElBQU1BLE9BQWlCLFNBQWpCQSxJQUFpQixDQUFDQyxHQUFEO0FBQUEsU0FBMEIsRUFBRUMsUUFBUSxLQUFWLEVBQWlCQyxRQUFRRixHQUF6QixFQUExQjtBQUFBLENBQXZCOztBQU1BLElBQU1HLFFBQWtCLFNBQWxCQSxLQUFrQixDQUFDQyxHQUFEO0FBQUEsU0FBc0IsS0FBdEI7QUFBQSxDQUF4Qjs7QUFNQSxJQUFNQyxlQUF1QixJQUFJQyxNQUFKLENBQVcsYUFBWCxDQUE3Qjs7QUFNQSxJQUFNQyxhQUF1QixTQUF2QkEsVUFBdUIsQ0FBQ0MsSUFBRCxFQUEyQzs7QUFFdEUsT0FBSyxJQUFJQyxJQUFZLENBQXJCLEVBQXdCQSxJQUFFLENBQTFCLEVBQTZCLEVBQUVBLENBQS9CLEVBQWtDO0FBQUU7O0FBRWxDLFFBQU1DLElBQVlGLEtBQUtDLENBQUwsQ0FBbEI7QUFDQSxRQUFJQyxFQUFFQyxNQUFGLEtBQWEsQ0FBakIsRUFBb0I7QUFBRSxhQUFPWixl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RyxRQUFRSCxFQUFSLENBQUosRUFBaUI7QUFBRSxXQUFPQSxFQUFQO0FBQVk7O0FBRXBDLFFBQU0sSUFBSXNCLEtBQUosQ0FBVSx1Q0FBVixDQUFOO0FBRUQsQ0FsQkQ7O0FBd0JBOztBQUVBLElBQU1DLGlCQUEyQixTQUEzQkEsY0FBMkIsQ0FBQ3ZCLEVBQUQsRUFBd0I7O0FBRXJELE1BQUlBLGNBQWNjLFVBQWxCLEVBQThCO0FBQUUsV0FBT2QsRUFBUDtBQUFZOztBQUU1QyxNQUFNd0IsUUFBdUJMLFFBQVFuQixFQUFSLEVBQVlFLEtBQVosQ0FBa0IsR0FBbEIsRUFDWVUsR0FEWixDQUNpQixVQUFDYSxDQUFEO0FBQUEsV0FBdUIzQixTQUFTMkIsQ0FBVCxFQUFZLEVBQVosQ0FBdkI7QUFBQSxHQURqQixDQUE3Qjs7QUFHQSw0Q0FBV1gsVUFBWCxtQ0FBMEJVLEtBQTFCO0FBRUgsQ0FURDs7UUFrQklyQixPLEdBQUFBLE87UUFDRUosVSxHQUFBQSxVO1FBRUZRLGUsR0FBQUEsZTtRQUVBTyxVLEdBQUFBLFU7UUFDQUksbUIsR0FBQUEsbUI7UUFLQWQsVSxHQUFBQSxVO1FBTUFlLE8sR0FBQUEsTztRQUNBSSxjLEdBQUFBLGM7UUErQkFuQyxLLEdBQUFBLEsiLCJmaWxlIjoiaXNfaXB2NC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuLy8gQGZsb3dcblxuaW1wb3J0IHR5cGUge1xuXG4gIElwLFxuICBSZXN1bHRcblxufSBmcm9tICcuL3R5cGVzJztcblxuXG5cblxuXG5jb25zdCBmYWlsOiBGdW5jdGlvbiA9ICh3aHk6IHN0cmluZyk6IFJlc3VsdCA9PiAoeyByZXN1bHQ6IGZhbHNlLCByZWFzb246IHdoeSB9KTtcblxuXG5cblxuXG5jb25zdCBjaGVjazogRnVuY3Rpb24gPSAoX2lwOiBJcCk6IGJvb2xlYW4gPT4gZmFsc2U7XG5cblxuXG5cblxuY29uc3QgbGV0dGVyRmlsdGVyOiBSZWdFeHAgPSBuZXcgUmVnRXhwKCdeWzAtOVxcXFwuXSskJyk7XG5cblxuXG5cblxuY29uc3QgY2hlY2tfcXVhZDogRnVuY3Rpb24gPSAocXVhZDogQXJyYXk8c3RyaW5nPik6IFJlc3VsdCB8IGJvb2xlYW4gPT4ge1xuXG4gIGZvciAobGV0IGk6IG51bWJlciA9IDA7IGk8NDsgKytpKSB7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgZnAvbm8tbG9vcHNcblxuICAgIGNvbnN0IGI6IHN0cmluZyA9IHF1YWRbaV07XG4gICAgaWYgKGIubGVuZ3RoID09PSAwKSB7IHJldHVybiBmYWlsKGBCeXRlICR7aX0gbXVzdCBub3QgYmUgZW1wdHlgKTsgfVxuXG4gICAgY29uc3QgYnQ6IG51bWJlciA9IHBhcnNlSW50KGIsIDEwKTtcblxuICAgIC8vIG5lZWRuJ3QgY2hlY2sgYmVsb3cgemVybywgYmVjYXVzZSBjaGFyYWN0ZXIgZmlsdGVyIHByZXZlbnRzIG1pbnVzIHNpZ25zXG4gICAgaWYgKGJ0ID4gMjU1KSB7IHJldHVybiBmYWlsKGBCeXRlICR7aX0gbXVzdCBiZSBiZWxvdyAyNTZgKTsgfVxuXG4gICAgaWYgKChiWzBdID09PSAnMCcpICYmIChidCA+IDApKSB7XG4gICAgICByZXR1cm4gZmFpbChgTm9uemVybyBieXRlICR7aX0gbXVzdCBub3QgYmVnaW4gd2l0aCB6ZXJvYCk7XG4gICAgfVxuXG4gICAgaWYgKChiLmxlbmd0aCA+IDEpICYmIChidCA9PT0gMCkpIHtcbiAgICAgIHJldHVybiBmYWlsKGBaZXJvIGJ5dGUgJHtpfSBtdXN0IG5vdCBoYXZlIG11bHRpcGxlIHplcm9lc2ApO1xuICAgIH1cblxuICB9XG5cbiAgcmV0dXJuIHsgcmVzdWx0OiB0cnVlIH07XG5cbn07XG5cblxuXG5cblxuY29uc3QgaXNfcXVhZF9leDogRnVuY3Rpb24gPSAoaXA6IElwKTogUmVzdWx0ID0+IHtcblxuICBpZiAoISggdHlwZW9mKGlwKSA9PT0gJ3N0cmluZycgKSkge1xuICAgIHJldHVybiBmYWlsKCdBbGwgcXVhZHMgYXJlIHN0cmluZ3MnKTtcbiAgfVxuXG4gIGlmICghKCBsZXR0ZXJGaWx0ZXIudGVzdChpcCkgKSkge1xuICAgIHJldHVybiBmYWlsKCdBIHF1YWQgbWF5IG9ubHkgY29udGFpbiAwLTkgYW5kIHBlcmlvZCcpO1xuICB9XG5cblxuICBjb25zdCBxdWFkOiBBcnJheTxzdHJpbmc+ID0gaXAuc3BsaXQoJy4nKTtcbiAgaWYgKCEocXVhZC5sZW5ndGggPT09IDQpKSB7IHJldHVybiBmYWlsKCdBbGwgY29tcGxldGUgcXVhZHMgaGF2ZSBmb3VyIGJ5dGVzIHNlcGFyYXRlZCBieSBwZXJpb2RzJyk7IH1cblxuLypcbiAgZm9yIChsZXQgaTogbnVtYmVyID0gMDsgaTw0OyArK2kpIHsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBmcC9uby1sb29wc1xuXG4gICAgY29uc3QgYjogc3RyaW5nID0gcXVhZFtpXTtcbiAgICBpZiAoYi5sZW5ndGggPT09IDApIHsgcmV0dXJuIGZhaWwoYEJ5dGUgJHtpfSBtdXN0IG5vdCBiZSBlbXB0eWApOyB9XG5cbiAgICBjb25zdCBidDogbnVtYmVyID0gcGFyc2VJbnQoYiwgMTApO1xuXG4gICAgLy8gbmVlZG4ndCBjaGVjayBiZWxvdyB6ZXJvLCBiZWNhdXNlIGNoYXJhY3RlciBmaWx0ZXIgcHJldmVudHMgbWludXMgc2lnbnNcbiAgICBpZiAoYnQgPiAyNTUpIHsgcmV0dXJuIGZhaWwoYEJ5dGUgJHtpfSBtdXN0IGJlIGJlbG93IDI1NmApOyB9XG5cbiAgICBpZiAoKGJbMF0gPT09ICcwJykgJiYgKGJ0ID4gMCkpIHtcbiAgICAgIHJldHVybiBmYWlsKGBOb256ZXJvIGJ5dGUgJHtpfSBtdXN0IG5vdCBiZWdpbiB3aXRoIHplcm9gKTtcbiAgICB9XG5cbiAgICBpZiAoKGIubGVuZ3RoID4gMSkgJiYgKGJ0ID09PSAwKSkge1xuICAgICAgcmV0dXJuIGZhaWwoYFplcm8gYnl0ZSAke2l9IG11c3Qgbm90IGhhdmUgbXVsdGlwbGUgemVyb2VzYCk7XG4gICAgfVxuXG4gIH1cblxuXG4gIHJldHVybiB7IHJlc3VsdDogdHJ1ZSB9O1xuKi9cbiAgcmV0dXJuIGNoZWNrX3F1YWQocXVhZCk7XG5cbn07XG5cblxuXG5cblxuY29uc3QgaXNfcXVhZDogRnVuY3Rpb24gPSAoaXA6IElwKTogYm9vbGVhbiA9PiBpc19xdWFkX2V4KGlwKS5yZXN1bHQ7XG5cblxuXG5cblxuY29uc3QgaXNfaW50ZWdlcjogRnVuY3Rpb24gPSAoaXA6IG51bWJlcik6IGJvb2xlYW4gPT5cblxuICAgIChOdW1iZXIuaXNJbnRlZ2VyKGlwKSlcbiAmJiAoaXAgPj0gMClcbiAmJiAoaXAgPD0gNDI5NDk2NzI5NSk7IC8vIDI1NS4yNTUuMjU1LjI1NVxuXG5cblxuXG5cbmNvbnN0IGludGVnZXJfdG9fcXVhZDogRnVuY3Rpb24gPSAoaXA6IG51bWJlcik6IHN0cmluZyA9PiB7XG5cbiAgaWYgKCEoTnVtYmVyLmlzSW50ZWdlcihpcCkpKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoJ2ludGVnZXJfdG9fcXVhZCBhY2NlcHRzIG9ubHkgaW50ZWdlcnMnKTsgfVxuXG4gIGlmIChpcCA8IDApICAgICAgICAgIHsgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ0lQIGludGVnZXIgbXVzdCBiZSBub24tbmVnYXRpdmUnKTsgfVxuICBpZiAoaXAgPiA0Mjk0OTY3Mjk1KSB7IHRocm93IG5ldyBSYW5nZUVycm9yKCdNYXhpbXVtIElQIGludGVnZXIgaXMgNCwyOTQsOTY3LDI5NScpOyB9XG5cbiAgcmV0dXJuIGAkeygoaXAgPj4gMjQpICYgMHhGRil9LiR7KChpcCA+PiAxNikgJiAweEZGKX0uJHsoKGlwID4+IDgpICYgMHhGRil9LiR7KGlwICYgMHhGRil9YDsgIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tYml0d2lzZVxuXG59O1xuXG5cblxuXG5cbmNvbnN0IGludF9hcnJheV90b19xdWFkOiBGdW5jdGlvbiA9IChpYTogQXJyYXk8bnVtYmVyPik6IHN0cmluZyA9PiB7XG5cbiAgaWYgKGlhLmxlbmd0aCA8IDQpIHtcbiAgXHR0aHJvdyBuZXcgUmFuZ2VFcnJvcignaW50X2FycmF5X3RvX3F1YWQgcmVxdWlyZXMgYSA0LWJ5dGUgYXJyYXknKTtcbiAgfVxuXG4gIGlhLm1hcCggKGJ5dGUsaSkgPT4ge1xuXG4gIFx0aWYgKCEoTnVtYmVyLmlzSW50ZWdlcihieXRlKSkpIHtcbiAgXHQgIHRocm93IG5ldyBUeXBlRXJyb3IoJ2ludF9hcnJheV90b19xdWFkIGFjY2VwdHMgb25seSBhcnJheXMgb2YgaW50ZWdlcnMnKTtcbiAgXHR9XG5cbiAgICBpZiAoYnl0ZSA8IDApIHtcbiAgICAgIHRocm93IG5ldyBSYW5nZUVycm9yKGBieXRlICR7aX0gc2hvdWxkIGJlIG5vbi1uZWdhdGl2ZWApO1xuICAgIH1cblxuICAgIGlmIChieXRlID4gMjU1KSB7XG4gICAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcihgYnl0ZSAke2l9IHNob3VsZCBiZSAyNTUgb3IgbG93ZXIgKHkna25vdywgYSBieXRlKWApO1xuICAgIH1cblxuICB9KTtcblxuICByZXR1cm4gYCR7aWFbMF19LiR7aWFbMV19LiR7aWFbMl19LiR7aWFbM119YDtcblxufTtcblxuXG5cblxuXG5mdW5jdGlvbiBQYXJzZWRRdWFkKGE6IG51bWJlciwgYjogbnVtYmVyLCBjOiBudW1iZXIsIGQ6IG51bWJlcik6IFBhcnNlZFF1YWQge1xuXG4gICAgdGhpcy5hID0gYTtcbiAgICB0aGlzLmIgPSBiO1xuICAgIHRoaXMuYyA9IGM7XG4gICAgdGhpcy5kID0gZDtcblxuICAgIHJldHVybiB0aGlzO1xuXG59XG5cblxuXG5cblxuY29uc3QgcGFyc2VkX3F1YWRfdG9fcXVhZDogRnVuY3Rpb24gPSAoe2EsIGIsIGMsIGR9KTogc3RyaW5nID0+XG5cbiAgICBgJHthfS4ke2J9LiR7Y30uJHtkfWA7XG5cblxuXG5cblxuY29uc3QgYXNfcXVhZDogRnVuY3Rpb24gPSAoaXA6IElwKTogc3RyaW5nID0+IHtcblxuICBpZiAodHlwZW9mIGlwID09PSAnbnVtYmVyJykge1xuICAgIHJldHVybiBpbnRlZ2VyX3RvX3F1YWQoaXApO1xuICB9XG5cbiAgZWxzZSBpZiAoaXAgaW5zdGFuY2VvZiBQYXJzZWRRdWFkKSB7XG4gICAgcmV0dXJuIHBhcnNlZF9xdWFkX3RvX3F1YWQoaXApO1xuICB9XG5cbiAgZWxzZSBpZiAoQXJyYXkuaXNBcnJheShpcCkpIHtcbiAgICByZXR1cm4gaW50X2FycmF5X3RvX3F1YWQoaXApO1xuICB9XG5cbiAgZWxzZSBpZiAoaXNfcXVhZChpcCkpIHsgcmV0dXJuIGlwOyB9XG5cbiAgdGhyb3cgbmV3IEVycm9yKCdjYW5ub3QgY29uc3RydWN0IHF1YWQgZnJvbSB0aGlzIGlucHV0Jyk7XG5cbn07XG5cblxuXG5cblxuLy8gdG9kbyB3aGFyZ2FyYmwgY29tZWJhY2sgbmVlZHMgdG8gaGFuZGxlIGludGVnZXJzXG5cbmNvbnN0IGFzX3BhcnNlZF9xdWFkOiBGdW5jdGlvbiA9IChpcDogSXApOiBQYXJzZWRRdWFkID0+IHtcblxuICAgIGlmIChpcCBpbnN0YW5jZW9mIFBhcnNlZFF1YWQpIHsgcmV0dXJuIGlwOyB9XG5cbiAgICBjb25zdCBieXRlczogQXJyYXk8bnVtYmVyPiA9IGFzX3F1YWQoaXApLnNwbGl0KCcuJylcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLm1hcCggKHM6IHN0cmluZyk6IG51bWJlciA9PiBwYXJzZUludChzLCAxMCkpO1xuXG4gICAgcmV0dXJuIG5ldyBQYXJzZWRRdWFkKC4uLiBieXRlcyk7XG5cbn07XG5cblxuXG5cbmV4cG9ydCB7XG5cbi8vICAgIGlzX3NpbXBsZSxcblxuICAgIGlzX3F1YWQsXG4gICAgICBpc19xdWFkX2V4LFxuXG4gICAgaW50ZWdlcl90b19xdWFkLFxuXG4gICAgUGFyc2VkUXVhZCxcbiAgICBwYXJzZWRfcXVhZF90b19xdWFkLFxuXG4vLyAgICBpc19pbmNvbXBsZXRlX3F1YWQsXG4vLyAgICAgIGlzX2luY29tcGxldGVfcXVhZF9leCxcblxuICAgIGlzX2ludGVnZXIsXG5cbiAvLyAgICBpc19jb21wbGV4LCAgLy8gaGFzIHBvcnQgb3Igc3VibmV0IG1hc2tcbiAvLyAgICBpc19jb21wbGV4X3F1YWQsXG4gLy8gICAgaXNfY29tcGxleF9pbnRlZ2VyLFxuXG4gICAgYXNfcXVhZCxcbiAgICBhc19wYXJzZWRfcXVhZCxcbiAvLyAgICBhc19pbnRlZ2VyLFxuXG4gLy8gICAgaXNfcmFuZ2UsXG4gLy8gICAgaXNfY3VycmVudF9uZXR3b3JrLFxuXG4gLy8gICAgaXNfc3BlY2lhbCxcbiAvLyAgICBpc19sb29wYmFjayxcbiAvLyAgICBpc19saW5rX2xvY2FsLFxuIC8vICAgIGlzX2lldGZfcHJvdG9jb2wsXG4gLy8gICAgaXNfaXB2Nl90b19pcHY0X3JlbGF5LFxuIC8vICAgIGlzX2JlbmNobWFyayxcblxuIC8vICAgIGlzX3Rlc3RuZXQsXG4gLy8gICAgICBpc190ZXN0bmV0XzEsXG4gLy8gICAgICBpc190ZXN0bmV0XzIsXG4gLy8gICAgICBpc190ZXN0bmV0XzMsXG5cbiAvLyAgICBpc19wcml2YXRlLFxuIC8vICAgICAgaXNfcHJpdmF0ZV8xMCxcbiAvLyAgICAgIGlzX3ByaXZhdGVfMTcyLFxuIC8vICAgICAgaXNfcHJpdmF0ZV8xOTIsXG5cbiAvLyAgICBpc19zaGFyZWQsXG4gLy8gICAgaXNfbGluayxcbiAvLyAgICBpc19tdWx0aWNhc3QsXG4gLy8gICAgaXNfYnJvYWRjYXN0LFxuIC8vICAgIGlzX3N1Ym5ldCxcbiAvLyAgICBpc19zdWJuZXRfYnJvYWRjYXN0LFxuIC8vICAgIGlzX3Jlc2VydmVkLFxuXG4gICAgY2hlY2tcblxufTtcbiJdfQ==