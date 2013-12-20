(ns prime.core)

(defn divides? [n m] (= (mod m n) 0))
(defn dividers[n] (filter #(divides? % n) (range 1 n)))
(defn prime?[n] (= (count (dividers n)) 1))
(defn primes_seq[] (filter prime? (range)))
(defn primes[n m] (filter prime? (range n m)))

(defn nextPrime[l] ())


(time (primes 1 1000))
