// To start SES under nodejs
// Adapted from https://gist.github.com/3669482

// Running the following command in a directory with the SES sources
//    $ node ses-usage.js
// Should print something like
//     Max Severity: Safe spec violation(1).
//     414 Apparently fine
//     24 Deleted
//     1 Skipped
//     Max Severity: Safe spec violation(1).
//     initSES succeeded.
//    hi

var FS = require("fs");
var VM = require("vm");

var context = VM.createContext({
    console: console,
    hack: function (cajaVM) {
        console.log(cajaVM);
        //var f = cajaVM.compileExpr("console.log('hi')");
        //f({console: console});
    }
});

[
    "logger.js",
    "repairES5.js",
    "WeakMap.js",
    "debug.js",
    "StringMap.js",
    "whitelist.js",
    "atLeastFreeVarNames.js",
    "startSES.js",
    "ejectorsGuardsTrademarks.js",
    "hookupSESPlus.js",
].forEach(function (path) {
    console.log("Running: " + path);
    VM.runInContext(FS.readFileSync(path), context, path);
});

VM.runInContext("hack(cajaVM)", context);

