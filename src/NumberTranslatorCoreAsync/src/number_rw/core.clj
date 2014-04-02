(ns number-rw.core)
(require '[clojure.core.async :as async :refer [<! >! <!! >!! timeout chan alt! alts!! go thread filter< put!]])

(def c (chan))
(def s (filter< string? c))
(def n (filter< number? c))

(thread
  (while true
    (let[val (<!! s)]
      (case val
        "one"   (put! c 1)
        "two"   (put! c 2)
        "three" (put! c 3)
        "four"  (put! c 4)
        "five"  (put! c 5)
        "six"   (put! c 6)
        "seven" (put! c 7)
        "eight" (put! c 8)
        "nine"  (put! c 9)
        "ten"   (put! c 10)))))

(thread
  (while true
    (let[val (<!! n)]
      (println val))))

(go (>! c "one"))
(go (>! c "two"))
(go (>! c "three"))
(go (>! c "four"))
(go (>! c "five"))
(go (>! c "six"))
(go (>! c "seven"))
(go (>! c "eight"))
(go (>! c "nine"))
(go (>! c "ten"))
