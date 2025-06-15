// Joshua Swanier
// June 14, 2025
// CPSC 3750
// Program exam #1 
// grade level completed: A

/* Check if number is prime */
function isPrime(n) {
  if (n < 2) return false;
  for (let i = 2; i <= Math.sqrt(n); i++) {
    if (n % i === 0) return false;
  }
  return true;
}
/* Function is going to loop through the number inputted
and check if number is prime or not and will sort into the proper
list and generate the numbers based on what they are appended to
*/
function generateLists() {
  const max = parseInt(document.getElementById('numberInput').value);
  const primeList = document.getElementById('primeList');
  const nonPrimeList = document.getElementById('nonPrimeList');
  const primeSumDiv = document.getElementById('primeSum');
  const nonPrimeSumDiv = document.getElementById('nonPrimeSum');

  primeList.innerHTML = '';
  nonPrimeList.innerHTML = '';
  primeSumDiv.innerHTML = '';
  nonPrimeSumDiv.innerHTML = '';

  for (let i = 1; i <= max; i++) {
    const li = document.createElement('li');
    li.textContent = i;
    if (isPrime(i)) {
      primeList.appendChild(li);
    } else {
      nonPrimeList.appendChild(li);
    }
  }
}
/* Function sums up all the numbers in the list */
function sumList(type) {
  let list = document.getElementById(type === 'prime' ? 'primeList' : 'nonPrimeList');
  let sum = 0;
  for (let li of list.children) {
    sum += parseInt(li.textContent);
  }

  document.getElementById(type === 'prime' ? 'primeSum' : 'nonPrimeSum').innerText = `Sum: ${sum}`;
}

// Color Changing every 5 seconds
setInterval(() => {
  // colors being used
  const colors = ['#ffd1dc', '#d1ffd7', '#fdfd96', '#c9c9ff', '#ffb347'];
  const primeBox = document.querySelector('.prime');
  const nonPrimeBox = document.querySelector('.non-prime');
  const randColor1 = colors[Math.floor(Math.random() * colors.length)];
  const randColor2 = colors[Math.floor(Math.random() * colors.length)];
  primeBox.style.backgroundColor = randColor1;
  nonPrimeBox.style.backgroundColor = randColor2;
}, 5000);
