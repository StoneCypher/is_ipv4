
const rand      = n  => Math.floor(Math.random() * n);
const rand_byte = () => rand(256);
const rand_quad = () => `${rand_byte()}.${rand_byte()}.${rand_byte()}.${rand_byte()}`;

export {rand, rand_byte, rand_quad};
