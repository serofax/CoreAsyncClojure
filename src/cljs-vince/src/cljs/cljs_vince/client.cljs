(ns vince.core
  (:require [cljs.core.async :as async :refer [put! chan <! >! timeout close! pipe]]
            [hoare.utils :refer [println-chan print-chan]]
            [hoare.coroutines :refer [copy squash disassemble assemble reformat reformat2 conwaysproblem]]
            [examples.prime :refer [chan-primes]])
  (:require-macros [cljs.core.async.macros :refer [go alt! go-loop]]))

(defn testCopyWestEast []
  (let [west (chan), east (chan)]
    (copy west east)
    (println-chan east)
    (go
     (>! west "Hallo")
     (<! (timeout 1000))
     (>! west "from")
     (<! (timeout 1000))
     (>! west "West")
     (close! west)
     (<! (timeout 1000)))))

(defn testSquash[]
  (let [source (chan), out (squash source)]
    (println-chan out)
    (go
      (>! source \*)
      (<! (timeout 1000))
      (>! source \*)
      (<! (timeout 1000))
      (>! source \H)
      (>! source \e)
      (>! source \l)
      (>! source \l)
      (>! source \o)
      (>! source \*)
      (<! (timeout 1000))
      (>! source \2)
      (>! source \*)
      (close! source)
      (<! (timeout 1000)))))

(defn set-html! [obj what]
  (set! (.-innerHTML obj) (str (.-innerHTML obj) what "\n")))

(defn by-id [id]
  (.getElementById js/document (name id)))

(defn printTA [ta timeoutValue]
  (let [result (chan)]
    (go-loop[value (<! result)]
            (if-not (nil? value)
              (do
                (set-html! ta value)
                (<! (timeout timeoutValue))
                (recur (<! result)))
              (set-html! ta "Channel was closed")))
    result))

(defn primeToTA[taChan primeChan]
  (go
     (>! taChan "Ignore the first 1000 primes")
     (loop [i 0]
       (if (< i 1000)
         (do
           (<! primeChan)
           (recur (inc i)))))
     (pipe (async/take 1000 primeChan) taChan)))

(defn testPrime2 []
  (let [prime1 (printTA (by-id "prime1") 1), prime1-chan (chan-primes)
        prime2 (printTA (by-id "prime2") 1), prime2-chan (chan-primes)
        prime3 (printTA (by-id "prime3") 1), prime3-chan (chan-primes)
        prime4 (printTA (by-id "prime4") 1), prime4-chan (chan-primes)]
    (primeToTA prime1 prime1-chan)
    (primeToTA prime2 prime2-chan)
    (primeToTA prime3 prime3-chan)
    (primeToTA prime4 prime4-chan)))



