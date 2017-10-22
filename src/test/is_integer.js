
import {test, describe} from 'ava-spec';
import {is_integer}     from '../../build/is_ipv4.es5.js';
import {quad_cases}     from './__quad_data.js';
import {rand}           from './__gen.js';





describe('Basic integer passes', async it => {

  const must_pass = tcase => test(`${tcase} passes is_integer`, t => t.is(true, is_integer(tcase) ));

  quad_cases.map(tcase => must_pass(tcase.int));

  // generate and validate a thousand random test cases
  let counter = 0;
  while (counter++ < 1000) {
    const n = rand(4294967296);
    it(`${n} doesn\'t throw`, t => t.notThrows(() => is_integer(n)) );
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
