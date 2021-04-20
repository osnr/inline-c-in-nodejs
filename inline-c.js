const ref = require('ref-napi');
const ffi = require('ffi-napi');

const TCCState = ref.refType(ref.types.void);
const tcc = ffi.Library('libtcc', {
  'tcc_new': [ TCCState, [] ],
  'tcc_add_library_path': [ 'int', [ TCCState, 'string' ] ],
  'tcc_compile_string': [ 'int', [ TCCState, 'string' ] ],
  'tcc_relocate': [ 'int', [ TCCState, 'pointer' ] ],
  'tcc_get_symbol': [ ffi.Function('int', ['int', 'int']), [ TCCState, 'string' ]]
});
const s = tcc.tcc_new();
console.log('1');
tcc.tcc_add_library_path(s, '/usr/lib');
console.log('2');
tcc.tcc_compile_string(s, `int foo(int x, int y) { return x+y; }`);
console.log('3');
const size = tcc.tcc_relocate(s, null);
console.log('4');
tcc.tcc_relocate(s, new Buffer(size));
console.log('5');
console.log(tcc.tcc_run(s, 0, null));
console.log('6');

module.exports = function() {
  const c = function(code) {
    // invoke tcc, compile, link, run
    
  };
  c.header = function(code) {
    return this;
  };
  return c;
};
