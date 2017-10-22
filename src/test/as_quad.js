
import {test, describe} from 'ava-spec';

import {ParsedQuad, as_quad} from '../../build/is_ipv4.es5.js';





describe('as_quad', async _it => {

  const iqm = (thing, nums) => // is parsed quad matching
    (typeof thing === 'string') &&
    (thing === `${nums[0]}.${nums[1]}.${nums[2]}.${nums[3]}`);

  const must_pass = ({sample, expectation}) =>
    test(`${sample} becomes ${expectation}`, t => t.is(true, iqm( as_quad(sample), expectation ) ));

  // test default-bind, ones, universal broadcast, localhost, google dns, inverter range
  const cases = [

    { sample: '0.0.0.0',                       expectation: [0,0,0,0] },
    { sample: '1.1.1.1',                       expectation: [1,1,1,1] },
    { sample: '255.255.255.255',               expectation: [255,255,255,255] },
    { sample: '127.0.0.1',                     expectation: [127,0,0,1] },
    { sample: '8.8.8.8',                       expectation: [8,8,8,8] },
    { sample: '0.255.255.0',                   expectation: [0,255,255,0] },

    { sample: 0,                               expectation: [0,0,0,0] },
    { sample: 16843009,                        expectation: [1,1,1,1] },
    { sample: 4294967295,                      expectation: [255,255,255,255] },
    { sample: 2130706433,                      expectation: [127,0,0,1] },
    { sample: 134744072,                       expectation: [8,8,8,8] },
    { sample: 16776960,                        expectation: [0,255,255,0] },

    { sample: new ParsedQuad(0,0,0,0),         expectation: [0,0,0,0] },
    { sample: new ParsedQuad(1,1,1,1),         expectation: [1,1,1,1] },
    { sample: new ParsedQuad(255,255,255,255), expectation: [255,255,255,255] },
    { sample: new ParsedQuad(127,0,0,1),       expectation: [127,0,0,1] },
    { sample: new ParsedQuad(8,8,8,8),         expectation: [8,8,8,8] },
    { sample: new ParsedQuad(0,255,255,0),     expectation: [0,255,255,0] }

  ];

  cases.map(must_pass);

});
