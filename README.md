
# suggest-words

This script will suggest some words based on characters available to use and any requirements about where they should
(or should not) go. I built this as a Wordle solver, but it could also suggest solutions for other games
where a certain number of letters are available to use and may have limits or requirements for their positions.

## Inputs

The first four lines in the suggest-words.js file are the input fields - look for `// <-- edit me`  
Here's how to use them:

### knownPattern

knownPattern: a string where known characters are indicated, and unknown characters are represented with an asterisk.  
Exampe: for a five-letter word where the middle letter is known to be an "i", the pattern string would be:  
`"**i**"`

### knownAntipattern

 knownAntiPattern: a string indicating any chars that are known not to be at a position (zero-indexed) in the word
the string is given as key/value pairs. keys and values separated by "!", rules separated by ",". An asterisk for 
the key means the paired letter is known not to exist anywhere in the word. The paired value can be one or more chars.  
Example: If it is known that the letter at position 0 is not "s" and the letter at position 3 is not "o"
and the string "ar" should not be anywhere in the word, then the antipattern string would be:  
 `"0!s,3!o,*!ar"`
 
### mustUse

mustUse: a string indicating chars that must be included in the suggested words.  
Example: If there must be an "s" and an "o" but their position is unknown, the mustUse string would be:  
`"so"`

### mayUse

mayUse: a string indicating chars that may (or may not) be included in the suggested words. These are letters that
have not been eliminated from consideration