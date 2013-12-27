(ns apiexamples.test)
(require '[clojure.core.async :as async :refer [<! >! <!! >!! timeout partition chan alt! alts! alts!! into go thread filter< filter> put! close! buffer dropping-buffer sliding-buffer unblocking-buffer? take take! thread-call onto-chan to-chan go-loop split mult tap put!]])

(let [n 10
      cs (repeatedly n chan)]
  (doseq [c cs]
    (put! c "test"))
  (dotimes [i n]
    (go (let [[v c] (alts! cs)]
      (println "read: " v "from: " c)))))
