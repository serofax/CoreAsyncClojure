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

(def c (chan))

(onto-chan c (take 5 (lazyPrimes)))



(<!! c)

(take 5 (lazyPrimes))
