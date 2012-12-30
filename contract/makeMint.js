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

function makeMint() {
  function Nat(allegedNum) {
    if (typeof allegedNum !== 'number') { throw new Error("not a number"); }
    if (allegedNum !== allegedNum) { throw new Error("number not a number"); }
    if (allegedNumber < 0)         { throw new Error("negative"); }
    if (allegedNumber % 1 !== 0)   { throw new Error("not integral"); }
    if (allegedNumber > MAX_NAT)   { throw new Error("too big"); }
    return allegedNum;
  }

  var amp = WeakMap();
  return function mint(balance) {
    var purse = def({
      getBalance: function() { return balance; },
      makePurse: function() { return mint(0); },
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
  };
}

function makePurseMaker(purse) {
  return function makePurse() { return purse.makePurse(); };
}
