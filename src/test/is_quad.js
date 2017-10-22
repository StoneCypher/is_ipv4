
import {test, describe} from 'ava-spec';

import {is_quad, is_quad_ex} from '../../build/is_ipv4.es5.js';

const rand      = n  => Math.floor(Math.random() * n);
const rand_byte = () => rand(256);





describe('Basic quad passes', async _it => {

  const must_pass    = tcase => test(`${tcase} passes`, t => t.is(true, is_quad(tcase) ));
  const must_pass_ex = tcase => test(`${tcase} passes`, t => t.is(true, is_quad_ex(tcase).result ));

  const cases = [ '0.0.0.0', '1.1.1.1', '255.255.255.255', '127.0.0.1', '8.8.8.8', '0.255.255.0' ];
  cases.map(must_pass);
  cases.map(must_pass_ex);

  let counter = 0;

  while (counter++ < 1000) {
    const tcase = `${rand_byte()}.${rand_byte()}.${rand_byte()}.${rand_byte()}`;
    must_pass(tcase);
    must_pass_ex(tcase);
  }

});





describe('Basic quad rejects', async _it => {

  const must_fail    = tcase => test(`${tcase} fails`, t => t.is(false, is_quad(tcase) ));
  const must_fail_ex = tcase => test(`${tcase} fails`, t => t.is(false, is_quad_ex(tcase).result ));

  const cases = [
    '0.0.0',     '0.0.0.0.0',                           // wrong length
    '256.1.1.1', '1.256.1.1', '1.1.256.1', '1.1.1.256', // out of bounds byte high
    '-1.1.1.1',  '1.-1.1.1',  '1.1.-1.1',  '1.1.1.-1',  // out of bounds byte low
    '255.255.255.one',                                  // letters
    ' 1.1.1.1', '1.1.1.1 ', '1.1 .1.1', '1.1. 1.1',     // spaces
    '1.1.1.1:80',                                       // port
    '1.1.1.1/8',                                        // subnet
    '.1.1.1', '1..1.1', '1.1..1', '1.1.1.',             // missing byte
    '1.1.1.1.', '.1.1.1.1', '1.1..1.1',                 // spurious leading/trailing/internal period
    '01.1.1.1', '1.01.1.1', '1.1.01.1', '1.1.1.01',     // leading zeroes not-just-zero
    '00.1.1.1', '1.00.1.1', '1.1.00.1', '1.1.1.00',     // leading zeroes on-a-zero
    5, false, {}, []                                    // non-strings
  ];

  cases.map(must_fail);
  cases.map(must_fail_ex);

});
