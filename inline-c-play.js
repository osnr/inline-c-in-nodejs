const c = require('./inline-c');
c.header`#include <stdio.h>`;

c.header`int i;`;

c`i = 0;`;
['One', 'two', 'three'].forEach(word => {
  c`printf("${word}: %d\n", i++);`;
});
