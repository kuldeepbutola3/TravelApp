//It converts number to word less than 100(positive number)

export function convertNumToWord(num) {
  var ones = [
    '',
    'one',
    'two',
    'three',
    'four',
    'five',
    'six',
    'seven',
    'eight',
    'nine',
    'ten',
    'eleven',
    'twelve',
    'thirteen',
    'fourteen',
    'fifteen',
    'sixteen',
    'seventeen',
    'eighteen',
    'nineteen',
  ];
  var tens = [
    '',
    '',
    'twenty',
    'thirty',
    'forty',
    'fifty',
    'sixty',
    'seventy',
    'eighty',
    'ninety',
  ];

  var numString = num.toString();
  /*eslint curly: [2, "multi-or-nest"]*/
  if (num < 0) {
    throw new Error('Negative numbers are not supported.');
  }

  if (num === 0) {
    return 'zero';
  }

  //the case of 1 - 20
  if (num < 20) {
    return ones[num];
  }

  if (numString.length === 2) {
    return tens[numString[0]] + ' ' + ones[numString[1]];
  }
}
