'use strict';

$('document').ready(function(){
    $('button').click(function() {
        var text = $('#user-text').val();
        if (text.length > 0) {
            var n_sentences = countTextLines(text);

            var wordlist = getTokens(text);
            var n_words = wordlist.length;
            var uniquesAndChars = uniqueWordsAndSigChars(wordlist);
            
            output(n_sentences, n_words, uniquesAndChars);
        } else {
            // makes sure we're not displaying when the form data are invalid.
            $('.text-report').addClass('hidden');
        }
        return false;
    });
});

function output(n_sen, n_words, uniquesAndChars) {
    // Outputs:
    // - Total word count of the submitted text
    // - Unique word count of the submitted text
    // - Average word length in characters of the submitted text
    // - Average sentence length in characters of the submitted text.
    // - Unique words used

    var n_chars_total = uniquesAndChars.n_chars_total;
    var uniqueWords = uniquesAndChars.uniqueWords;

    $('.js-n-words').html(n_words);
    $('.js-uniques').html(uniqueWords.length);
    $('.js-word-len').html(n_chars_total / n_words);
    $('.js-sen-len').html(n_chars_total / n_sen);
    $('.js-words').html(uniqueWords.join(', '));
    $('.text-report').removeClass('hidden');
}


function uniqueWordsAndSigChars(words) {
    // Dual purpose function: Sums the chars in our words AND generates
    // an array of the unique words.
    var uniqueWords = [];
    var charCount = 0;
    for (var i = 0; i < words.length; i++) {
        var currentWord = words[i];
        if (!(uniqueWords.indexOf(currentWord) + 1)) {
            uniqueWords.push(currentWord);
        }
        charCount += currentWord.length;
    }

    return { uniqueWords:uniqueWords, n_chars_total:charCount };

}

function countTextLines(text) {
    // Our subset of English treats '\n'-terminated lines as discrete
    // sentences, as well as standard '.'-, '?'-, and '!'-terminated
    // ones.
    //
    // This function basically does two things:
    // 1. Replaces '.', '?', and '!' with '\n'
    // 2. Counts (altered) lines containing alphanumeric strings,
    //    (and arbitrary punctuation, misc. characters contained therein)
    //    terminated with '\n' (i.e. sentences).

    text = text.replace(/\.\.\./g, '');    // rids us of ellipses
    text += '\n';
    text = text.replace(/\.|\?\!/g, '\n');
    return (text.match(/.*[A-Za-z0-9]+.*\n/g) || []).length;
}

function getTokens(text) {
    // Without a dictionary lookup, we're restricted to treating
    // alphanumeric tokens as "words." RETURNS an alphanumerically sorted
    // list of tokens, removing punctuation characters
    //
    // This will also fail to filter non-ASCII punctuation.
    text = text.replace(/\u2014/g, '-');
    // /\ Hack to make em-dashes go away, since they're in our example text
    return text.toLowerCase().split(/[\n?() ,!.";:-]+/).filter(Boolean).sort();
}
