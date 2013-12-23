(ns apiexamples.test)
(require '[clojure.core.async :as async :refer [go-loop <! >! <!! >!! timeout chan alt! alts!! go thread filter< filter> put! close! buffer dropping-buffer sliding-buffer unblocking-buffer? take take! thread-call]])

(defn count[n]
  (let [c (chan (buffer 100))]
    (go-loop [i 0]
      (when (< i n)
        (>! c i)
        (recur (inc i)))
      (close! c))
  c))

(let [c (count 10)]
  (thread
    (loop [val (<!! c)]
      (when (not= val nil)
        (println val)
        (recur (<!! c))))
      (println "END.")))
