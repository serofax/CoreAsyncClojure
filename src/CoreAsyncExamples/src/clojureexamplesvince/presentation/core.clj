(ns clojureexamplesvince.presentation
  (:require [clojure.core.async :as async :refer [<! <!! >!! >! chan close! timeout put! take! go alt! alts! filter< onto-chan go-loop]]))


;ctrl + space -> "zoom in"

;prozesse
#_(do
  (go
   (dotimes [i 5]
     (println "proc1" #_(-> (Thread/currentThread) .getName) i )
     (<! (timeout 1000))))
  (go
   (dotimes [i 5]
     (println "proc2" #_(-> (Thread/currentThread) .getName) i )
     (<! (timeout 1000)))))


;channels

#_(let [c (chan)]
  (go
   (println "i am ready")
   (println "out" (<! c)))
  (go
   (println "Wait for it")
   (<! (timeout 4000))
   (>! c "Hi from process 2")
   (println "process2 put message into c")))

;channels2


#_(def c (chan 3))
#_(go
 (dotimes [i 5]
   (>! c i)
   (println "process put" i "in c")))

#_(<!! c)



;channels3

#_(defn prime? [n]
  (cond
    (= n 2) true
    (<= n 1) false
    (odd? n)(zero?
            (count
              (filter
                #(zero? (mod n %))
                (range 3 n 2))))
    :else false))


#_(defn chan-primes[]
  (filter< prime? (async/to-chan (iterate inc 2))))


#_(def c (chan-primes))

#_(<!! c)

#_(println (<!! (async/into
  [] (async/take 5 (chan-primes)))))

#_(take!
 (async/into
  [] (async/take 5 (chan-primes)))
 println)
