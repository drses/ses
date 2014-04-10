
# Secure EcmaScript

**:warning: This is not an official, working packaging of Google
Caja’s SES.  This is a project attempting to bring SES to Node.js but
will probably not be viable until Node.js 0.12 at least.**

SES is a tool that allows mutually suspicious programs to share a single
EcmaScript 5 compliant JavaScript context without interfering with each
other.  It does this by freezing everything that is accessible in global
scope, removing interfaces that would allow programs to interfe with
each-other, and providing the ability to evaluate arbitrary code in
isolation.

SES is a part of the Google Caja project.  For JavaScript contexts that
do not support EcmaScript 5, Caja depends on compiling JavaScript to a
JavaScript subset with static verification and run-time assertions to
maintain isolation.  With EcmaScript 5, it is possible to run isolated
code without a compilation step or run-time checks.

Initialize SES by executing these scripts in order.

-   `logger.js`
-   `repairES5.js`
-   `WeakMap.js`
-   `debug.js`
-   `StringMap.js`
-   `whitelist.js`
-   `atLeastFreeVarNames.js`
-   `startSES.js`
-   `ejectorsGuardsTrademarks.js`
-   `hookupSESPlus.js`

This is an example of initializing SES in a web page.

```html
<script src="logger.js"></script>
<script src="repairES5.js"></script>
<script src="WeakMap.js"></script>
<script src="debug.js"></script>
<script src="StringMap.js"></script>
<script src="whitelist.js"></script>
<script src="atLeastFreeVarNames.js"></script>
<script src="startSES.js"></script>
<script src="ejectorsGuardsTrademarks.js"></script>
<script src="hookupSESPlus.js"></script>
```

This is an example of initializing SES in Node.

```javascript
var FS = require("fs");
var VM = require("vm");
 
var source = FS.readFileSync("initSes.js");
var script = new VM.Script(source);
script.runInThisContext();
 
var f = cajaVM.compileExpr("console.log('hi')");
f({console: console});
```

Included is a binary runner under the name `ses`

```bash
ses example/code.js
```

