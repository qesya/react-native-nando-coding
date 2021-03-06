#include "example.h"//;
#include <jsi/jsi.h>//;

using namespace facebook::jsi;
using namespace std;

namespace example {
    void install(Runtime & jsiRuntime) {
        auto helloWorld = Function::createFromHostFunction(jsiRuntime, PropNameID::forAscii(jsiRuntime, "helloWorld"), 0, [](Runtime & runtime,
            const Value & thisValue,
                const Value * arguments, size_t count) -> Value {
            string helloworld = "Hello From JSI";
            return Value(runtime, String::createFromUtf8(runtime, helloworld));
        });

        
        jsiRuntime.global().setProperty(jsiRuntime, "helloWorld", move(helloWorld));
    }
}
