
import {test, describe} from 'ava-spec';

import {is_quad} from '../../build/is_ipv4.es5.js';





describe('Basic quad passes', async _it => {

  const must_pass = tcase => test(`${tcase} passes`, t => t.is(true, is_quad(tcase) ));

  must_pass('127.0.0.1');

});





describe('Basic quad rejects', async _it => {

  const must_fail = tcase => test(`${tcase} fails`, t => t.is(false, is_quad(tcase) ));

  must_fail('127.0.0.one');

});
