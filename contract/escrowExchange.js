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

function escrowExchange(argA, argB) {   // argA from Alice, argB from Bob

  function failOnly(cordP) {
    return Q(cordP).when(function(cord) { throw cord; });
  }

  function makeTransfer(makeEscrowPurseP) {

    return function transfer(decisionP, srcPurseP, dstPurseP, amount) {
      var escrowPurseP = Q(makeEscrowPurseP).send();

        Q(decisionP).when(function(_) {                        // setup phase 2
          Q(dstPurseP).send('deposit', amount, escrowPurseP);
        }, function(reason) {
          Q(srcPurseP).send('deposit', amount, escrowPurseP);
        });

        return Q(escrowPurseP).send('deposit', amount, srcPurseP);   // phase 1
    };
  }

  var transferMoney = makeTransfer(Q.join(argA.makeMoneyEscrowP,
                                          argB.makeMoneyEscrowP));
  var transferStock = makeTransfer(Q.join(argB.makeStockEscrowP,
                                          argA.makeStockEscrowP));
  var d = Q.defer();
  d.resolve(Q.race([Q.all([
     transferMoney(d.promise, argA.moneySrcP, argB.moneyDstP, argB.moneyNeeded),
     transferStock(d.promise, argB.stockSrcP, argA.stockDstP, argA.stockNeeded)
   ]),
   failOnly(argA.cordP),
   failOnly(argB.cordP)]));
  return d.promise;
}

