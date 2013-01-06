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

define('contract/makeMint', [], function() {
  "use strict";
  var def = cajaVM.def;
  var Nat = cajaVM.Nat;

  return function makeMint() {
  
    var amp = WeakMap();
    function makePurse() { return mint(0); }

    return def(function mint(balance) {
      var purse = def({
        getBalance: function() { return balance; },
        makePurse: makePurse,
        deposit: function(amount, src) {
          Nat(balance + amount);
          amp.get(src)(Nat(amount));
          balance += amount;
        }
      });
      function decr(amount) {
        balance = Nat(balance - amount);
      }
      amp.set(purse, decr);
      return purse;
    });
  }
});
