
import {test, describe}  from 'ava-spec';
import {integer_to_quad} from '../../build/is_ipv4.es5.js';
import {quad_cases}      from './__quad_data.js';





describe('Basic integers to quads', async _it => {

  const must_pass = ({sample, expectation}) =>
    test(`${sample} becomes ${expectation}`, t => t.is(expectation, integer_to_quad(sample) ));

  quad_cases.map(tcase => must_pass({sample: tcase.int, expectation: tcase.quad_str}));

});
