
import {test, describe}    from 'ava-spec';
import {int_array_to_quad} from '../../build/is_ipv4.es5.js';
import {quad_cases}        from './__quad_data.js';





describe('int_array_to_quad bad input', async it => {

  const cases = [

    0, 1, 2130706433,                              // integer arrays only kthx.  these are numbers you see in other contexts
    -2, -1, 4294967296, 4294967297, 3.5, Math.pi,  // bad type data vol 2 - also bad range
    [], {}, "two", false, null, undefined,         // bad type data vol 3 - lol stuffs
    [1], [1,2], [1,2,3], [1,2,3,4,5],              // some wrong lengths
    [1,2,false,4], [1,[2],3,4], [1,2.5,3,4],       // some wrong member types
    [1,2,undefined,4], [1,2.2,3,4], [1, ,3,4],     // some more wrong member types
    [1,2,{'3':3},4], [1,-2,3,4], [1,2222,3,4]      // a few more wrong member types

  ];


  cases.map(tcase => it(`throws for ${JSON.stringify(tcase)}`, t => t.throws(() => int_array_to_quad(tcase)) ));

});
