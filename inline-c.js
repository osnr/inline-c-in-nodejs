const load = require('./build/Release/load');
const child_process = require('child_process');


const headers = [];
function header(codes, ...exprs) {
  const code = [];
  codes.forEach((c, i) => { code.push(codes.raw[i]); code.push(exprs[i]); });
  headers.push(code.join(''));
}

let k = 0;
function externizeHeader(code) {
  if (k > 1 && code.includes('=')) {
    return 'extern ' + code.replace(/\s*=[^;]*/, '');
  }
  return code;
}
function c(codes, ...exprs) {
  const code = [];
  codes.forEach((c, i) => { code.push(codes.raw[i]); code.push(exprs[i]); });

  const func = `func${k++}`;
  const src = `
${headers.map(externizeHeader).join('\n')}

void ${func}() {
  ${code.join('')}
}
`;
  // console.log(src);

  child_process.execSync(`cc -x c -undefined dynamic_lookup -shared -o ${func}.so -`, {input: src});
  load(func);
}
c.header = header;
module.exports = c;
