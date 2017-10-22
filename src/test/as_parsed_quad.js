
import {test, describe}             from 'ava-spec';
import {ParsedQuad, as_parsed_quad} from '../../build/is_ipv4.es5.js';
import {quad_cases}                 from './__quad_data.js';





describe('as_parsed_quad', async _it => {


  const ipqm = (thing, nums) => // is parsed quad matching
    (thing instanceof ParsedQuad) &&
    (thing.a === nums[0])         &&
    (thing.b === nums[1])         &&
    (thing.c === nums[2])         &&
    (thing.d === nums[3]);


  const must_pass = ({sample, expectation}) =>
    test(`${sample} becomes ${expectation}`, t => t.is(true, ipqm( as_parsed_quad(sample), expectation ) ));


  quad_cases.map(tcase => must_pass({sample: tcase.quad_str,                      expectation: tcase.int_array}));
  quad_cases.map(tcase => must_pass({sample: tcase.int_array,                     expectation: tcase.int_array}));
  quad_cases.map(tcase => must_pass({sample: tcase.int,                           expectation: tcase.int_array}));
  quad_cases.map(tcase => must_pass({sample: new ParsedQuad(... tcase.int_array), expectation: tcase.int_array}));


});
