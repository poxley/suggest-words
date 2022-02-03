let knownPattern = '**i**'; // <-- edit me
let knownAntipattern = '0!s,3!o,*!ar'; // <-- edit me
let mustUse = 'so'; // <-- edit me
let mayUse = 'typfgjlzxvm'; // <-- edit me


// -------------------------------------------------------------
const spelling = require('./spelling');
const dictionary = require('./spelling/dictionaries/en_US');
const dict = new spelling(dictionary);

function suggestWords(knownPattern, knownAntipattern, mustUse, mayUse) {
  let wildcardArray = [];
  let tryIndexArray = [];
  let suggestedWords = [];
  let charsToTry = mustUse.trim() + mayUse.trim();


  let patternArray = knownPattern.split('');
  patternArray.forEach((el, i) => {
    if (el !== '*') {
      charsToTry += el;
    }
    else {
      wildcardArray.push(i);
      tryIndexArray.push(i === patternArray.length ? -1 : 0);
    }
  });

  let antipatternArray = knownAntipattern.length ? knownAntipattern.split(',') : [];
  antipatternArray.forEach((el, i) => {
    let rule =  el.split("!").map((item) => { return item.trim(); });
    charsToTry += charsToTry.includes(rule[1]) ? '' : rule[1];
    antipatternArray[i] = rule;
  });

  while (Math.min(...tryIndexArray) < charsToTry.length - 1) {
    for (let i = tryIndexArray.length - 1; i >= 0 ; i--) {
      if (tryIndexArray[i] < charsToTry.length - 1) {
        tryIndexArray[i]++;
        break;
      }
      else {
        tryIndexArray[i] = 0;
      }
    }
    wildcardArray.forEach((el, i) => {
      patternArray[el]  = charsToTry[tryIndexArray[i]]
    });

    let candidate = patternArray.join('');
    let patternMatch = true;

    for (let j = 0; j < mustUse.length; j++) {
      if (!candidate.includes(mustUse[j])) {
        patternMatch = false;
        break;
      }
    }

    if (patternMatch) {
      antipatternArray.forEach(([idx, rule]) => {
        if (idx === '*') {
          if (candidate.includes(rule)) {
            patternMatch = false;
          }
        }
        else if (candidate.substr(idx, rule.length) === rule) {
          patternMatch = false;
        }
      });
    }

    if (patternMatch) {
      let lookup = dict.lookup(candidate, {suggest: false});
      if (!lookup.found && candidate[candidate.length -1] === "s") {
        lookup = dict.lookup(candidate.slice(0, -1));
      }
      if (lookup.found && !suggestedWords.includes(candidate)) {
        console.log(candidate);
        suggestedWords.push(candidate);
      }
    }
  }
}

suggestWords(knownPattern, knownAntipattern, mustUse, mayUse);
