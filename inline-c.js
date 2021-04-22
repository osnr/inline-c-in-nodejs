const tcc = require('./build/Release/tcc');
const headers = [];
function header(code) {
  headers.push(code);
}
function c(codes, ...exprs) {
  const code = [];
  codes.forEach((c, i) => { code.push(codes.raw[i]); code.push(exprs[i]); });
  tcc(`
${headers.join('\n')}

void func() {
  ${code.join('')}
}
`);
}
c.header = header;
module.exports = c;
