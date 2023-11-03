/* sophisticated_code.js */

// This code generates a fibonacci sequence with a twist:
// 1. It calculates each number in the sequence by adding the two previous numbers.
// 2. It stores the sequence in an array.
// 3. It only adds prime numbers to the sequence.

(function () {
  // Function to check if a number is prime
  function isPrime(number) {
    if (number <= 1) return false;
    if (number <= 3) return true;

    if (number % 2 === 0 || number % 3 === 0) return false;

    for (var i = 5; i * i <= number; i += 6) {
      if (number % i === 0 || number % (i + 2) === 0) return false;
    }

    return true;
  }

  // Generate Fibonacci sequence
  function generateFibonacciSequence(length) {
    var sequence = [1, 1];

    while (sequence.length < length) {
      var nextNumber = sequence[sequence.length - 1] + sequence[sequence.length - 2];

      if (isPrime(nextNumber)) {
        sequence.push(nextNumber);
      }
    }

    return sequence;
  }

  // Generate Fibonacci sequence with a length of 20
  var fibonacciSequence = generateFibonacciSequence(20);

  // Display the generated sequence
  console.log("Fibonacci sequence with only prime numbers (length: " + fibonacciSequence.length + "):");
  console.log(fibonacciSequence);

  // Other complex and sophisticated code...
  // ...
  // ...
  // ...

})();

// Run this code by executing: node sophisticated_code.js