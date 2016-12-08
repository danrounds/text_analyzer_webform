'use strict';

$('document').ready(function(){
    $('button').click(function() {
        var text = $('#user-text').val();

        var n_sentences = countTextLines(text);
        var wordlist = getTokens(text);
        var n_words = wordlist.length;
        var uniquesAndChars = uniqueWordsAndTotalChars(wordlist);

        output(n_sentences, n_words, uniquesAndChars);
        return false;
    });
});

function output(n_sen, n_words, uniquesAndChars) {
    // Outputs:
    // - Total word count of the submitted text
    // - Unique word count of the submitted text
    // - Average word length in characters of the submitted text
    // - Average sentence length in characters of the submitted text.
    // - Words used

    var n_chars = uniquesAndChars.n_chars;

    // var return_string = 'Word Count: ' + n_words + '\n';
    // return_string += 'Sentences: ' + n_sen + '\n';
    // return_string += 'Wordcharacters: ' + n_chars + '\n';
    // return_string += 'Average word length: ' + n_chars / n_words + '\n';
    // return_string += 'Average sentence length: ' + n_chars / n_sen + '\n';
    // return_string += 'Unique words: ' + uniquesAndChars.n_uniques + '\n';
    // return_string += 'Words: ' + uniquesAndChars.uniques.join(', ') + '\n';
    // alert(return_string);

    $('.text-report').removeClass('hidden');
    $('.js-n-words').html(n_words);
    $('.js-uniques').html(uniquesAndChars.n_uniques);
    $('.js-word-len').html(n_chars / n_words);
    $('.js-sen-len').html(n_chars / n_sen);
    $('.js-words').html(uniquesAndChars.uniques.join(', '));

}


function uniqueWordsAndTotalChars(words) {
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

    return {uniques:uniqueWords, n_uniques:uniqueWords.length,
            n_chars:charCount };
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

function getTokens(rawString) {
    // Without a dictionary lookup, we're restricted to treating
    // alphanumeric tokens as "words." RETURNS an alphanumerically sorted
    // list of tokens, removing punctuation characters
    return rawString.toLowerCase().split(/[\n?() ,!.";:-]+/).filter(Boolean).sort();
}
