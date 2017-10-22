
// @flow

import type {

  Ip,
  Result

} from './types';





const fail: Function = (why: string): Result =>

  ({ result: false, reason: why });





const check: Function = (_ip: Ip): boolean =>

  false;  // whargarbl todo comeback





const letterFilter: RegExp = new RegExp('^[0-9\\.]+$');





const check_quad: Function = (quad: Array<string>): Result | boolean => {

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

};





const is_quad_ex: Function = (ip: Ip): Result => {

  if (!( typeof(ip) === 'string' )) {
    return fail('All quads are strings');
  }

  if (!( letterFilter.test(ip) )) {
    return fail('A quad may only contain 0-9 and period');
  }


  const quad: Array<string> = ip.split('.');
  if (!(quad.length === 4)) { return fail('All complete quads have four bytes separated by periods'); }

  return check_quad(quad);

};





const is_quad: Function = (ip: Ip): boolean =>

  is_quad_ex(ip).result;





const is_integer: Function = (ip: number): boolean =>

    (Number.isInteger(ip))
 && (ip >= 0)
 && (ip <= 4294967295); // 255.255.255.255





const integer_to_quad: Function = (ip: number): string => {

  if (!(Number.isInteger(ip))) { throw new TypeError('integer_to_quad accepts only integers'); }

  if (ip < 0)          { throw new RangeError('IP integer must be non-negative'); }
  if (ip > 4294967295) { throw new RangeError('Maximum IP integer is 4,294,967,295'); }

  return `${((ip >> 24) & 0xFF)}.${((ip >> 16) & 0xFF)}.${((ip >> 8) & 0xFF)}.${(ip & 0xFF)}`;  // eslint-disable-line no-bitwise

};





const int_array_to_quad: Function = (ia: Array<number>): string => {

  if (ia.length < 4) {
    throw new RangeError('int_array_to_quad requires a 4-byte array');
  }

  ia.map( (byte,i) => {

    if (!(Number.isInteger(byte))) {
      throw new TypeError('int_array_to_quad accepts only arrays of integers');
    }

    if (byte < 0) {
      throw new RangeError(`byte ${i} should be non-negative`);
    }

    if (byte > 255) {
      throw new RangeError(`byte ${i} should be 255 or lower (y'know, a byte)`);
    }

  });

  return `${ia[0]}.${ia[1]}.${ia[2]}.${ia[3]}`;

};





function ParsedQuad(a: number, b: number, c: number, d: number): ParsedQuad {

  this.a = a;
  this.b = b;
  this.c = c;
  this.d = d;

  return this;

}





const parsed_quad_to_quad: Function = ({a, b, c, d}): string =>

  `${a}.${b}.${c}.${d}`;





const as_quad: Function = (ip: Ip): string => {

  if (typeof ip === 'number') {
    return integer_to_quad(ip);
  }

  else if (ip instanceof ParsedQuad) {
    return parsed_quad_to_quad(ip);
  }

  else if (Array.isArray(ip)) {
    return int_array_to_quad(ip);
  }

  else if (is_quad(ip)) { return ip; }

  throw new Error('cannot construct quad from this input');

};





// todo whargarbl comeback needs to handle integers

const as_parsed_quad: Function = (ip: Ip): ParsedQuad => {

  if (ip instanceof ParsedQuad) { return ip; }

  const bytes: Array<number> = as_quad(ip).split('.')
                                          .map( (s: string): number => parseInt(s, 10));

  return new ParsedQuad(... bytes);

};




export {

//    is_simple,

    is_quad,
      is_quad_ex,

    integer_to_quad,

    ParsedQuad,
    parsed_quad_to_quad,

//    is_incomplete_quad,
//      is_incomplete_quad_ex,

    is_integer,

 //    is_complex,  // has port or subnet mask
 //    is_complex_quad,
 //    is_complex_integer,

    as_quad,
    as_parsed_quad,
 //    as_integer,

 //    is_range,
 //    is_current_network,

 //    is_special,
 //    is_loopback,
 //    is_link_local,
 //    is_ietf_protocol,
 //    is_ipv6_to_ipv4_relay,
 //    is_benchmark,

 //    is_testnet,
 //      is_testnet_1,
 //      is_testnet_2,
 //      is_testnet_3,

 //    is_private,
 //      is_private_10,
 //      is_private_172,
 //      is_private_192,

 //    is_shared,
 //    is_link,
 //    is_multicast,
 //    is_broadcast,
 //    is_subnet,
 //    is_subnet_broadcast,
 //    is_reserved,

    check

};
