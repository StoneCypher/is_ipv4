
// @flow

import type {

  Ip,
  Result

} from './types';





const fail: Function = (why: string): Result => ({ result: false, reason: why });





const check: Function = (_ip: Ip): boolean => false;





const letterFilter: RegExp = new RegExp('^[0-9\\.]+$');





const is_quad_ex: Function = (ip: Ip): Result => {

  if (!( typeof(ip) === 'string' )) {
    return fail('All quads are strings');
  }

  if (!( letterFilter.test(ip) )) {
    return fail('A quad may only contain 0-9 and period');
  }


  const quad: Array<string> = ip.split('.');
  if (!(quad.length === 4)) { return fail('All complete quads have four bytes separated by periods'); }


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





const is_quad: Function = (ip: Ip): boolean => is_quad_ex(ip).result;





export {

//    is_simple,

    is_quad,
      is_quad_ex,

//    is_incomplete_quad,
//      is_incomplete_quad_ex,
 //    is_integer,

 //    is_complex,  // has port or subnet mask
 //    is_complex_quad,
 //    is_complex_integer,

 //    as_quad,
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
