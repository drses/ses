// Copyright (C) 2011 Google Inc.
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

/**
 * @fileoverview Test simple contract code
 * @requires define
 */

define('contractTest', [
           'Q', 
           'contract/makeContractHost', 
           'contract/makeMint',
           'contract/escrowExchange'],
function(Q, makeContractHostFar, makeMintFar, escrowExchangeFar) {
  "use strict";

  var contractHostP = Q(makeContractHostFar).send(void 0);

  function trivContract(whiteP, blackP) {
    return 8;
  }
  var contractSrc = '' + trivContract;

  var tokensP = Q(contractHostP).send('setup', contractSrc);

  var whiteTokenP = Q(tokensP).get(0);
  Q(contractHostP).send('play', whiteTokenP, contractSrc, 0, {});

  var blackTokenP = Q(tokensP).get(1);
  return Q(contractHostP).send('play', blackTokenP, contractSrc, 1, {});
});
