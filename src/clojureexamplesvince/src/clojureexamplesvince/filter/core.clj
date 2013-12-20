(ns clojureexamplesvince.filter
  (:require [clojure.core.async :as async :refer [<! <!! >!! >! chan close! timeout put! take! go alt! alts! filter< filter> onto-chan]]))



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

;With filter<
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

;With filter>


(defn chan-iterate[sourceChannel]
  (go
   (doseq [element (iterate inc 2)]
     (>! sourceChannel element))))

(defn chan-primes-filterout[outputChannel]
  "Takes a outputChannel in which primes are placed and creates a sourceChannel in which numbers MUST be pushed"
  (filter> prime? outputChannel))

(def output (chan))

(chan-iterate (chan-primes-filterout output))

(<!! output)





