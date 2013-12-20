(ns clojureexamplesvince.prime
  (:require [clojure.core.async :as async :refer [<! <!! >!! >! chan close! timeout put! take! go alt! alts! filter< onto-chan]]))

(defn prime? [n]
  (cond
    (= n 2) true
    (<= n 1) false
    (odd? n)(zero?
            (count
              (filter
                #(zero? (mod n %))
                (range 3 n 2))))
    :else false
    )
  )

(defn lazyPrimes[]
  (filter prime? (iterate inc 2)))

(defn chan-iterate[]
  (let [result (chan)]
    (go
     (doseq [element (iterate inc 2)]
       (>! result element)))
    result))

(defn chan-primes[]
  (filter< prime? (chan-iterate)))


(def c (chan-primes))


(<!! c)
