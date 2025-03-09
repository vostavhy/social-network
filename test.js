function palindromize(number) {
  let iterations = 0;
  let resultNumber = number;

  while (!isPal(resultNumber)) {
    iterations++;
    resultNumber = getNewPal(resultNumber);
  }

  return `${iterations} ${resultNumber}`;
}

function isPal(number) {
  const arr = String(number).split('');
  const reversed = [...arr].reverse();
  return arr.join('') === reversed.join('');
}

function getNewPal(number) {
  const reversedNumber = Number(String(number).split('').reverse().join(''));
  return number + reversedNumber;
}

console.log(palindromize(195)); // 4 9339
