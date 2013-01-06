// Copyright (C) 2012 Google Inc.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

define('contract/escrowExchange', ['Q'], function(Q) {

  return function escrowExchange(argA, argB) { // argA from Alice, argB from Bob
  
    function failOnly(cancelP) {
      return Q(cancelP).then(function(cancel) { throw cancel; });
    }
  
    function transfer(decisionP, srcPurseP, dstPurseP, amount) {
      var makeEscrowPurseP = Q.join(Q(srcPurseP).get('makePurse'), 
                                    Q(dstPurseP).get('makePurse'));
      var escrowPurseP = Q(makeEscrowPurseP).send();
  
      Q(decisionP).then(function(_) {                        // setup phase 2
        Q(dstPurseP).send('deposit', amount, escrowPurseP);
      }, function(reason) {
        Q(srcPurseP).send('deposit', amount, escrowPurseP);
      });
  
      return Q(escrowPurseP).send('deposit', amount, srcPurseP);   // phase 1
    };

    return Q.promise(function(resolve) {
      resolve(Q.race([Q.all([
          transfer(d.promise, argA.moneySrcP, argB.moneyDstP, argB.moneyNeeded),
          transfer(d.promise, argB.stockSrcP, argA.stockDstP, argA.stockNeeded)
        ]),
        failOnly(argA.cancelP),
        failOnly(argB.cancelP)
      ]));
    });
  }
});
