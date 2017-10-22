
import {test, describe} from 'ava-spec';
import {is_integer}     from '../../build/is_ipv4.es5.js';
import {rand}           from './__gen.js';





describe('Basic integer passes', async _it => {

  const must_pass = tcase => test(`${tcase} passes is_integer`, t => t.is(true, is_integer(tcase) ));

  // test default-bind, ones, universal broadcast, localhost, google dns, inverter range
  const cases = [
    0,          // 0.0.0.0
    16843009,   // 1.1.1.1,
    4294967295, // 255.255.255.255
    2130706433, // 127.0.0.1
    134744072,  // 8.8.8.8
    16776960    // 0.255.255.0
  ];

  cases.map(must_pass);

  // generate and validate a thousand random test cases
  let counter = 0;
  while (counter++ < 1000) {
    must_pass( rand(4294967296) );
  }

});





describe('Basic quad rejects', async _it => {

  const must_fail = tcase => test(`${tcase} fails is_integer`, t => t.is(false, is_integer(tcase) ));

  const cases = [
    -100, -1, 4294967296, 4294967495,                // out of range
    2.5,                                             // floating point
    '0.0.0.0', '1.1.1.1', '255.255.255.255',         // quads
    false, {}, []                                    // non-integers
  ];

  cases.map(must_fail);

});
