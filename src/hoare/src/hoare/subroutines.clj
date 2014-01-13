(ns hoare.subroutines
  (:require [clojure.core.async :as async :refer [<! <!! >!! >! chan close! timeout put! take! go alt! alts! filter< go-loop to-chan]]
            [hoare.utils :refer :all]
            [clojure.core.match :refer [match]]))

(defn divider [source]
  "Constructs a process to represent a function-
type subroutine, which accepts a positive dividend and
divisor, and returns their integer quotient and remainder."
  (let [result (chan)]
    (go-loop[[dividend divisor :as comb] (<! source)]
            (when-not (nil? comb)
               (if (zero? divisor)
                  (>! result :ERROR_DIVISOR_ZERO)
                  (loop [quotient 0, remainder dividend]
                    (if (>= remainder divisor)
                      (recur (inc quotient) (- remainder divisor))
                      (>! result [quotient remainder]))))
               (recur (<! source)))
            (close! result))
    result))

#_(let [source (chan),
      out (divider source)]
  (println-chan out)
  (>!! source [4 2])
  (>!! source [5 2])
  (>!! source [5 0])
  (>!! source [5 1])
  ;(>!! source [5 -1]) ;forever loop
  (close! source)
  (<!! (timeout 1000))
  (println "Channel source is closed:" (isChannelClosed? source))
  (println "Channel out is closed:" (isChannelClosed? out)))

(defn factorial[source]
  "Computes a factorial by the recursive method,
  to a given limit."
  (let [result (chan)]
    (go
     (let [n (<! source)]
       (if (zero? n)
         (do
           (>! result 1)
           (close! result))
         (let [childChan (chan), childResultChan (factorial childChan)]
           (>! childChan (dec n))
           (close! childChan)
           (>! result (* n (<! childResultChan)))
           (close! result)))))
    result))


#_(let [source (chan),
      out (factorial source)]
  (println-chan out)
  (>!! source 10) ;3628800
  (close! source)
  (<!! (timeout 1000))
  (println "Channel source is closed:" (isChannelClosed? source))
  (println "Channel out is closed:" (isChannelClosed? out)))
