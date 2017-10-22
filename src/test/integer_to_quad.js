
import {test, describe} from 'ava-spec';

import {integer_to_quad} from '../../build/is_ipv4.es5.js';





describe('Basic integers to quads', async _it => {

  const must_pass = ({sample, expectation}) => test(`${sample} becomes ${expectation}`, t => t.is(expectation, integer_to_quad(sample) ));

  // test default-bind, ones, universal broadcast, localhost, google dns, inverter range
  const cases = [
    { sample: 0,          expectation: '0.0.0.0' },
    { sample: 16843009,   expectation: '1.1.1.1' },
    { sample: 4294967295, expectation: '255.255.255.255' },
    { sample: 2130706433, expectation: '127.0.0.1' },
    { sample: 134744072,  expectation: '8.8.8.8' },
    { sample: 16776960,   expectation: '0.255.255.0' }
  ];

  cases.map(must_pass);

});
