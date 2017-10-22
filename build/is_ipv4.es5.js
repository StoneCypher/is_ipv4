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

var letterFilter = new RegExp('^[0-9\\.]+$', 'gi');

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

    quad.map(function (b, i) {

        if (b.length === 0) {
            return fail('Byte ' + i + ' must not be empty');
        }

        var bt = parseInt(b, 16);

        if (bt < 0) {
            return fail('Byte ' + i + ' must be non-negative');
        }
        if (bt > 255) {
            return fail('Byte ' + i + ' must be below 256');
        }

        if (b[0] === '0' && bt > 0) {
            return fail('Nonzero byte ' + i + ' must not begin with zero');
        }

        return false;
    });

    return { result: true };
};

var is_quad = function is_quad(ip) {
    return is_quad_ex(ip).result;
};

exports.is_quad = is_quad;
exports.is_quad_ex = is_quad_ex;
exports.check = check;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9qcy9pc19pcHY0LmpzIl0sIm5hbWVzIjpbImZhaWwiLCJyZXN1bHQiLCJyZWFzb24iLCJ3aHkiLCJjaGVjayIsImxldHRlckZpbHRlciIsIlJlZ0V4cCIsImlzX3F1YWRfZXgiLCJpcCIsInRlc3QiLCJxdWFkIiwic3BsaXQiLCJsZW5ndGgiLCJtYXAiLCJiIiwiaSIsImJ0IiwicGFyc2VJbnQiLCJpc19xdWFkIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFDQSxJQUFNQSxPQUFPLFNBQVBBLElBQU87QUFBQSxXQUFRLEVBQUVDLFFBQVEsS0FBVixFQUFpQkMsUUFBUUMsR0FBekIsRUFBUjtBQUFBLENBQWI7O0FBTUEsSUFBTUMsUUFBUSxTQUFSQSxLQUFRO0FBQUEsV0FBTyxLQUFQO0FBQUEsQ0FBZDs7QUFNQSxJQUFNQyxlQUFlLElBQUlDLE1BQUosQ0FBVyxhQUFYLEVBQTBCLElBQTFCLENBQXJCOztBQUVBLElBQU1DLGFBQWEsU0FBYkEsVUFBYSxLQUFNOztBQUVyQixRQUFJLEVBQUcsT0FBT0MsRUFBUCxLQUFlLFFBQWxCLENBQUosRUFBa0M7QUFBRSxlQUFPUixLQUFLLHVCQUFMLENBQVA7QUFBdUM7QUFDM0UsUUFBSSxDQUFHSyxhQUFhSSxJQUFiLENBQWtCRCxFQUFsQixDQUFQLEVBQWtDO0FBQUUsZUFBT1IsS0FBSyx3Q0FBTCxDQUFQO0FBQXdEOztBQUU1RixRQUFNVSxPQUFPRixHQUFHRyxLQUFILENBQVMsR0FBVCxDQUFiO0FBQ0EsUUFBSSxFQUFFRCxLQUFLRSxNQUFMLEtBQWdCLENBQWxCLENBQUosRUFBMEI7QUFBRSxlQUFPWixLQUFLLHlEQUFMLENBQVA7QUFBeUU7O0FBRXJHVSxTQUFLRyxHQUFMLENBQVUsVUFBQ0MsQ0FBRCxFQUFHQyxDQUFILEVBQVM7O0FBRWYsWUFBSUQsRUFBRUYsTUFBRixLQUFhLENBQWpCLEVBQW9CO0FBQUUsbUJBQU9aLGVBQWFlLENBQWIsd0JBQVA7QUFBNkM7O0FBRW5FLFlBQU1DLEtBQUtDLFNBQVNILENBQVQsRUFBWSxFQUFaLENBQVg7O0FBRUEsWUFBSUUsS0FBSyxDQUFULEVBQWM7QUFBRSxtQkFBT2hCLGVBQWFlLENBQWIsMkJBQVA7QUFBZ0Q7QUFDaEUsWUFBSUMsS0FBSyxHQUFULEVBQWM7QUFBRSxtQkFBT2hCLGVBQWFlLENBQWIsd0JBQVA7QUFBNkM7O0FBRTdELFlBQUtELEVBQUUsQ0FBRixNQUFTLEdBQVYsSUFBbUJFLEtBQUssQ0FBNUIsRUFBZ0M7QUFBRSxtQkFBT2hCLHVCQUFxQmUsQ0FBckIsK0JBQVA7QUFBNEQ7O0FBRTlGLGVBQU8sS0FBUDtBQUVILEtBYkQ7O0FBZUEsV0FBTyxFQUFFZCxRQUFRLElBQVYsRUFBUDtBQUVILENBekJEOztBQStCQSxJQUFNaUIsVUFBVSxTQUFWQSxPQUFVO0FBQUEsV0FBTVgsV0FBV0MsRUFBWCxFQUFlUCxNQUFyQjtBQUFBLENBQWhCOztRQVVJaUIsTyxHQUFBQSxPO1FBQ0VYLFUsR0FBQUEsVTtRQXlDRkgsSyxHQUFBQSxLIiwiZmlsZSI6ImlzX2lwdjQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbmNvbnN0IGZhaWwgPSB3aHkgPT4gKHsgcmVzdWx0OiBmYWxzZSwgcmVhc29uOiB3aHkgfSk7XG5cblxuXG5cblxuY29uc3QgY2hlY2sgPSBfaXAgPT4gZmFsc2U7XG5cblxuXG5cblxuY29uc3QgbGV0dGVyRmlsdGVyID0gbmV3IFJlZ0V4cCgnXlswLTlcXFxcLl0rJCcsICdnaScpO1xuXG5jb25zdCBpc19xdWFkX2V4ID0gaXAgPT4ge1xuXG4gICAgaWYgKCEoIHR5cGVvZihpcCkgPT09ICdzdHJpbmcnICkpIHsgcmV0dXJuIGZhaWwoJ0FsbCBxdWFkcyBhcmUgc3RyaW5ncycpOyB9XG4gICAgaWYgKCEoIGxldHRlckZpbHRlci50ZXN0KGlwKSApKSAgIHsgcmV0dXJuIGZhaWwoJ0EgcXVhZCBtYXkgb25seSBjb250YWluIDAtOSBhbmQgcGVyaW9kJyk7IH1cblxuICAgIGNvbnN0IHF1YWQgPSBpcC5zcGxpdCgnLicpO1xuICAgIGlmICghKHF1YWQubGVuZ3RoID09PSA0KSkgeyByZXR1cm4gZmFpbCgnQWxsIGNvbXBsZXRlIHF1YWRzIGhhdmUgZm91ciBieXRlcyBzZXBhcmF0ZWQgYnkgcGVyaW9kcycpOyB9XG5cbiAgICBxdWFkLm1hcCggKGIsaSkgPT4ge1xuXG4gICAgICAgIGlmIChiLmxlbmd0aCA9PT0gMCkgeyByZXR1cm4gZmFpbChgQnl0ZSAke2l9IG11c3Qgbm90IGJlIGVtcHR5YCk7IH1cblxuICAgICAgICBjb25zdCBidCA9IHBhcnNlSW50KGIsIDE2KTtcblxuICAgICAgICBpZiAoYnQgPCAwKSAgIHsgcmV0dXJuIGZhaWwoYEJ5dGUgJHtpfSBtdXN0IGJlIG5vbi1uZWdhdGl2ZWApOyB9XG4gICAgICAgIGlmIChidCA+IDI1NSkgeyByZXR1cm4gZmFpbChgQnl0ZSAke2l9IG11c3QgYmUgYmVsb3cgMjU2YCk7IH1cblxuICAgICAgICBpZiAoKGJbMF0gPT09ICcwJykgJiYgKGJ0ID4gMCkpIHsgcmV0dXJuIGZhaWwoYE5vbnplcm8gYnl0ZSAke2l9IG11c3Qgbm90IGJlZ2luIHdpdGggemVyb2ApOyB9XG5cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuXG4gICAgfSk7XG5cbiAgICByZXR1cm4geyByZXN1bHQ6IHRydWUgfTtcblxufTtcblxuXG5cblxuXG5jb25zdCBpc19xdWFkID0gaXAgPT4gaXNfcXVhZF9leChpcCkucmVzdWx0O1xuXG5cblxuXG5cbmV4cG9ydCB7XG5cbi8vICAgIGlzX3NpbXBsZSxcblxuICAgIGlzX3F1YWQsXG4gICAgICBpc19xdWFkX2V4LFxuXG4vLyAgICBpc19pbmNvbXBsZXRlX3F1YWQsXG4vLyAgICAgIGlzX2luY29tcGxldGVfcXVhZF9leCxcbiAvLyAgICBpc19pbnRlZ2VyLFxuXG4gLy8gICAgaXNfY29tcGxleCwgIC8vIGhhcyBwb3J0IG9yIHN1Ym5ldCBtYXNrXG4gLy8gICAgaXNfY29tcGxleF9xdWFkLFxuIC8vICAgIGlzX2NvbXBsZXhfaW50ZWdlcixcblxuIC8vICAgIGFzX3F1YWQsXG4gLy8gICAgYXNfaW50ZWdlcixcblxuIC8vICAgIGlzX3JhbmdlLFxuIC8vICAgIGlzX2N1cnJlbnRfbmV0d29yayxcblxuIC8vICAgIGlzX3NwZWNpYWwsXG4gLy8gICAgaXNfbG9vcGJhY2ssXG4gLy8gICAgaXNfbGlua19sb2NhbCxcbiAvLyAgICBpc19pZXRmX3Byb3RvY29sLFxuIC8vICAgIGlzX2lwdjZfdG9faXB2NF9yZWxheSxcbiAvLyAgICBpc19iZW5jaG1hcmssXG5cbiAvLyAgICBpc190ZXN0bmV0LFxuIC8vICAgICAgaXNfdGVzdG5ldF8xLFxuIC8vICAgICAgaXNfdGVzdG5ldF8yLFxuIC8vICAgICAgaXNfdGVzdG5ldF8zLFxuXG4gLy8gICAgaXNfcHJpdmF0ZSxcbiAvLyAgICAgIGlzX3ByaXZhdGVfMTAsXG4gLy8gICAgICBpc19wcml2YXRlXzE3MixcbiAvLyAgICAgIGlzX3ByaXZhdGVfMTkyLFxuXG4gLy8gICAgaXNfc2hhcmVkLFxuIC8vICAgIGlzX2xpbmssXG4gLy8gICAgaXNfbXVsdGljYXN0LFxuIC8vICAgIGlzX2Jyb2FkY2FzdCxcbiAvLyAgICBpc19zdWJuZXQsXG4gLy8gICAgaXNfc3VibmV0X2Jyb2FkY2FzdCxcbiAvLyAgICBpc19yZXNlcnZlZCxcblxuICAgIGNoZWNrXG5cbn07XG4iXX0=