const c = require('inline-c')();
c.header(`#include <stdio.h>`);

for (let i = 0; i < 10; i++) {
  c`printf("%d\n", ${i})`;
}
