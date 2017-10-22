
import {test, describe}      from 'ava-spec';
import {ParsedQuad, as_quad} from '../../build/is_ipv4.es5.js';
import {quad_cases}          from './__quad_data.js';





describe('as_quad', async _it => {


  const iqm = (thing, nums) => // is parsed quad matching
    (typeof thing === 'string') &&
    (thing === `${nums[0]}.${nums[1]}.${nums[2]}.${nums[3]}`);


  const must_pass = ({sample, expectation}) =>
    test(`${sample} becomes ${expectation}`, t => t.is(true, iqm( as_quad(sample), expectation ) ));


  quad_cases.map(tcase => must_pass({sample: tcase.quad_str,                      expectation: tcase.int_array}));
  quad_cases.map(tcase => must_pass({sample: tcase.int_array,                     expectation: tcase.int_array}));
  quad_cases.map(tcase => must_pass({sample: tcase.int,                           expectation: tcase.int_array}));
  quad_cases.map(tcase => must_pass({sample: new ParsedQuad(... tcase.int_array), expectation: tcase.int_array}));

});





describe('as_quad bad input', async it => {

  const cases = [

    -2, -1,                                    // too low
    4294967296, 4294967297,                    // too high
    3.5, Math.pi,                              // integers only kthx
    [], {}, "two", false, null, undefined      // i said integers only :/

  ];


  cases.map(tcase => it(`throws for ${JSON.stringify(tcase)}`, t => t.throws(() => as_quad(tcase)) ));

});
