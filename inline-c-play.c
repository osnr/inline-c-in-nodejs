#include <libtcc.h>
#include <stdlib.h>
#include <stdio.h>

int main() {
    TCCState* s = tcc_new();
    tcc_set_output_type(s, TCC_OUTPUT_MEMORY);
    tcc_compile_string(s, "int foo(int x, int y) { return x+y; }");
    int size = tcc_relocate(s, NULL);
    void* mem = malloc(size);
    tcc_relocate(s, mem);
    int (*func)(int x, int y) = tcc_get_symbol(s, "foo");
    /* printf("23 + 42 = %d\n", func(23, 42)); */
}
