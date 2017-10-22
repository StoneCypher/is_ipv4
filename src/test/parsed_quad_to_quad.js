
import {test, describe} from 'ava-spec';

import {ParsedQuad, parsed_quad_to_quad} from '../../build/is_ipv4.es5.js';





describe('ParsedQuads to quads', async _it => {

  const must_pass = ({sample, expectation}) => test(`${sample} becomes ${expectation}`, t => t.is(expectation, parsed_quad_to_quad(sample) ));

  // test default-bind, ones, universal broadcast, localhost, google dns, inverter range
  const cases = [
    { sample: new ParsedQuad(0,0,0,0),         expectation: '0.0.0.0' },
    { sample: new ParsedQuad(1,1,1,1),         expectation: '1.1.1.1' },
    { sample: new ParsedQuad(255,255,255,255), expectation: '255.255.255.255' },
    { sample: new ParsedQuad(127,0,0,1),       expectation: '127.0.0.1' },
    { sample: new ParsedQuad(8,8,8,8),         expectation: '8.8.8.8' },
    { sample: new ParsedQuad(0,255,255,0),     expectation: '0.255.255.0' }
  ];

  cases.map(must_pass);

});
