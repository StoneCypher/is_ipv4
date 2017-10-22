
const quad_cases = [

  { quad_str: '0.0.0.0',         int_array: [0,0,0,0],         int: 0          },
  { quad_str: '1.1.1.1',         int_array: [1,1,1,1],         int: 16843009   },
  { quad_str: '255.255.255.255', int_array: [255,255,255,255], int: 4294967295 },
  { quad_str: '127.0.0.1',       int_array: [127,0,0,1],       int: 2130706433 },
  { quad_str: '8.8.8.8',         int_array: [8,8,8,8],         int: 134744072  },
  { quad_str: '0.255.255.0',     int_array: [0,255,255,0],     int: 16776960   }

];





export { quad_cases };