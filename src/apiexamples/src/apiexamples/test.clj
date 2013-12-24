(ns apiexamples.test)
(require '[clojure.core.async :as async :refer [<! >! <!! >!! timeout partition chan alt! alts!! into go thread filter< filter> put! close! buffer dropping-buffer sliding-buffer unblocking-buffer? take take! thread-call onto-chan to-chan go-loop split mult tap put!]])



(def c (chan 10))
(onto-chan c (range 1 10))

(defn read_chan
  ([c] (read_chan "" c))
  ([str c]
  (thread
    (loop [val (<!! c)]
      (when (not= val nil)
        (println str val)
        (recur (<!! c))))
      (println "END."))))

(read_chan "t1:" c)
