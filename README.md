__Just a simple example of a dynamic webpage.__

This one takes ASCII text as form input, tokenizes it, and returns some stats:

* Total word count
* Unique word count
* Average word length in characters
* Average sentence length in characters
* Unique words used (a list of words)

Ostensibly we're analyzing English, but all we have is a primitive tokenizer and the most basic of grammar rules as a parse, so we're actually parsing a constrained-grammar version of English with a really wacky (massive) superset of the English lexicon.

_Possible improvement would be doing actual dictionary look-up of our words, though that wouldn't handle the ambiguities of whether or not sentence-beginning capitalized words are unique words (i.e. proper nouns) or not. Nor would it begin to address the difficulty of parsing natural language._

DR, 12/2016
