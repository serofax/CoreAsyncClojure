function divides(n, m) {
	return (m % n == 0);
}

function getDividers(n, callback) {
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

function calcPrimes(count, callback) {
	setTimeout(function() {
		var primes = Array();
		var i=2;
		while(primes.length < count) {
			if(isPrime(i)) {
				primes.push(i);	
			}
			i++;
		}
		callback(primes);
	}, 0);
}

function deliverPrimes(count, callback) {
	setTimeout(function() {
		var i=2;
		var delivered = 0;
		while(delivered < count) {
			if(isPrime(i)) {
				callback(i);
				delivered++;
			}
			i++;
		}
	}, 0);
}

function deliverPrimes(count, callback) {
	setTimeout(function() {
		var i=2;
		var delivered = 0;
		while(delivered < count) {
			if(isPrime(i)) {
				callback(i);
				delivered++;
			}
			i++;
		}
	}, 0);
}

console.log('Before execution.');
calcPrimes(4000, function(p) {
	console.log("Done calculation.");
});
console.log('After execution.');
console.log('Some other code...');


