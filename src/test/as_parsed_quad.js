
import {test, describe} from 'ava-spec';

import {ParsedQuad, as_parsed_quad} from '../../build/is_ipv4.es5.js';





describe('as_parsed_quad', async _it => {

  const ipqm = (thing, nums) => // is parsed quad matching
    (thing instanceof ParsedQuad) &&
    (thing.a === nums[0])         &&
    (thing.b === nums[1])         &&
    (thing.c === nums[2])         &&
    (thing.d === nums[3]);

  const must_pass = ({sample, expectation}) =>
    test(`${sample} becomes ${expectation}`, t => t.is(true, ipqm( as_parsed_quad(sample), expectation ) ));

  // test default-bind, ones, universal broadcast, localhost, google dns, inverter range
  const cases = [

    { sample: '0.0.0.0',                       expectation: [0,0,0,0] },
    { sample: '1.1.1.1',                       expectation: [1,1,1,1] },
    { sample: '255.255.255.255',               expectation: [255,255,255,255] },
    { sample: '127.0.0.1',                     expectation: [127,0,0,1] },
    { sample: '8.8.8.8',                       expectation: [8,8,8,8] },
    { sample: '0.255.255.0',                   expectation: [0,255,255,0] },

    { sample: new ParsedQuad(0,0,0,0),         expectation: [0,0,0,0] },
    { sample: new ParsedQuad(1,1,1,1),         expectation: [1,1,1,1] },
    { sample: new ParsedQuad(255,255,255,255), expectation: [255,255,255,255] },
    { sample: new ParsedQuad(127,0,0,1),       expectation: [127,0,0,1] },
    { sample: new ParsedQuad(8,8,8,8),         expectation: [8,8,8,8] },
    { sample: new ParsedQuad(0,255,255,0),     expectation: [0,255,255,0] }

  ];

  cases.map(must_pass);

});
