
import {test, describe}                  from 'ava-spec';
import {ParsedQuad, parsed_quad_to_quad} from '../../build/is_ipv4.es5.js';
import {rand, rand_quad}                 from './__gen.js';
import {quad_cases}                      from './__quad_data.js';





describe('ParsedQuads to quads', async _it => {

  const must_pass = ({sample, expectation}) => test(`${sample} becomes ${expectation}`, t => t.is(expectation, parsed_quad_to_quad(sample) ));

  quad_cases.map(tcase => must_pass({sample: tcase.pq, expectation: tcase.quad_str}));

});
