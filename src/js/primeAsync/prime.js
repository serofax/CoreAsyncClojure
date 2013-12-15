function divides(n, m) {
	return (m % n == 0);
}

function getDividers(n) {
	var dividers = Array();
	for(var i = 0; i<n; i++) {
		if(divides(i, n)) {
			dividers.push(i);
		}
	}
	return dividers;	
}

function isPrime(n) {
	if(n < 2) return false;
	var dividers = getDividers(n);
	return (dividers.length == 1);
}

function calcPrimes(count) {
	var primes = Array();
	var i=2;
	while(primes.length < count) {
		if(isPrime(i)) {
			primes.push(i);	
		}
		i++;
	}
	console.log('Done calculation.');
	return primes;
}

console.log('Before execution.');
var primes = calcPrimes(4000);
console.log('After execution.');
console.log('Some other code...');