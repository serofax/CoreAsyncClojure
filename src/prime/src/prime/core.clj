(ns prime.core)
(require '[clojure.core.async :as async :refer [<! >! <!! >!! timeout chan alt! alts!! go thread filter< filter> put! close! buffer dropping-buffer sliding-buffer unblocking-buffer? go-loop]])

(defn divides? [n m] (= (mod m n) 0))
(defn dividers[n] (filter #(divides? % n) (range 1 n)))
(defn prime?[n] (= (count (dividers n)) 1))
(defn lazyprimes[] (filter prime? (range)))

(defn nextPrime[p]
  (loop [i 1]
    (if (prime? (+ i p))
      (+ i p)
      (recur (inc i)))))

; returns a buffered channel containing n primes
(defn asyncprimes[n]
  (let [c (chan (buffer 100))]
    (go-loop [d 0 lp 0]
      (when (< d n)
        (let[cp (nextPrime lp)]
        (>! c cp)
        (recur (inc d) cp)))
        (close! c))
  c))

(def primechannel (asyncprimes 200))

(thread
  (loop [val (<!! primechannel)]
    (when (not= val nil)
      (println val)
      (recur (<!! primechannel))))
    (println "END."))
