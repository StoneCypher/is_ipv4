
import { ParsedQuad } from '../../build/type_impls.js';




const quad_cases = [

  // basic shapes
  { quad_str: '0.0.0.0',         pq: new ParsedQuad(0,0,0,0),         int_array: [0,0,0,0],         int: 0          },
  { quad_str: '1.1.1.1',         pq: new ParsedQuad(1,1,1,1),         int_array: [1,1,1,1],         int: 16843009   },
  { quad_str: '255.255.255.255', pq: new ParsedQuad(255,255,255,255), int_array: [255,255,255,255], int: 4294967295 },
  { quad_str: '127.0.0.1',       pq: new ParsedQuad(127,0,0,1),       int_array: [127,0,0,1],       int: 2130706433 },
  { quad_str: '0.255.255.0',     pq: new ParsedQuad(0,255,255,0),     int_array: [0,255,255,0],     int: 16776960   },

  // entities
  { quad_str: '8.8.8.8',         pq: new ParsedQuad(8,8,8,8),         int_array: [8,8,8,8],         int: 134744072  },  // google dns
  { quad_str: '131.107.0.89',    pq: new ParsedQuad(131,107,0,89),    int_array: [131,107,0,89],    int: 2204827737 },  // microsoft.com
  { quad_str: '104.126.37.85',   pq: new ParsedQuad(104,126,37,85),   int_array: [104,126,37,85],   int: 1753097557 },  // apple.com
  { quad_str: '151.101.53.140',  pq: new ParsedQuad(151,101,53,140),  int_array: [151,101,53,140],  int: 2539992460 }   // reddit.com

];





export { quad_cases };