#include "addon.h"
#include <stdio.h>
#include <stdlib.h>
#include <dlfcn.h>

#define NAPI_CALL(env, call)                                      \
  do {                                                            \
    napi_status status = (call);                                  \
    if (status != napi_ok) {                                      \
      const napi_extended_error_info* error_info = NULL;          \
      napi_get_last_error_info((env), &error_info);               \
      bool is_pending;                                            \
      napi_is_exception_pending((env), &is_pending);              \
      if (!is_pending) {                                          \
        const char* message = (error_info->error_message == NULL) \
            ? "empty error message"                               \
            : error_info->error_message;                          \
        napi_throw_error((env), NULL, message);                   \
        return NULL;                                              \
      }                                                           \
    }                                                             \
  } while(0)


static napi_value
Load(napi_env env, napi_callback_info info) {
    
    size_t argc = 1;
    napi_value argv[1];
    napi_get_cb_info(env, info, &argc, argv, NULL, NULL);
    /* printf("argc[%zu]\n", argc); */

    char funcName[1000];
    napi_get_value_string_utf8(env, argv[0], funcName, sizeof(funcName), NULL);
    /* printf("funcName[%s]\n", funcName); */

  // Do something useful.
    /* TCCState* s = tcc_new(); */
    /* tcc_set_output_type(s, TCC_OUTPUT_DLL); */
    /* tcc_output_file(s, "dll.so"); */

    char dllName[1000];
    snprintf(dllName, sizeof(dllName), "%s.so", funcName);

    void* handle = dlopen(dllName, RTLD_LAZY);
    void (*func)() = dlsym(handle, funcName);
    func();

    /* tcc_set_output_type(s, TCC_OUTPUT_MEMORY); */
    /* tcc_compile_string(s, code); */
    /* int size = tcc_relocate(s, NULL); */
    /* void* mem = malloc(size); */
    /* tcc_relocate(s, mem); */
    /* int (*func)() = tcc_get_symbol(s, "func"); */
    /* func(); */
  return NULL;
}

napi_value create_addon(napi_env env) {
  napi_value load;
  NAPI_CALL(env, napi_create_function(env,
                                      "load",
                                      NAPI_AUTO_LENGTH,
                                      Load,
                                      NULL,
                                      &load));
  return load;
}
