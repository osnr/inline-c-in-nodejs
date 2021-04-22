const load = require('./build/Release/load');
const child_process = require('child_process');


const headers = [];
function header(code) {
  headers.push(code);
}
let k = 0;
function c(codes, ...exprs) {
  const code = [];
  codes.forEach((c, i) => { code.push(codes.raw[i]); code.push(exprs[i]); });

  const func = `func${k++}`;
  const src = `
${headers.join('\n')}

void ${func}() {
  ${code.join('')}
}
`;

  child_process.execSync(`cc -x c -shared -o ${func}.so -`, {input: src});
  load(func);
}
c.header = header;
module.exports = c;
