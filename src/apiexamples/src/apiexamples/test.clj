(ns apiexamples.test)
(require '[clojure.core.async :as async :refer [<! >! <!! >!! timeout partition chan alt! alts! alts!! into go thread filter< filter> put! close! buffer dropping-buffer sliding-buffer unblocking-buffer? take take! thread-call onto-chan to-chan go-loop split mult tap put! map map< map> mapcat< mapcat>]])

(defn read-chan
  ([c] (read-chan "" c))
  ([str c]
  (thread
    (loop [val (<!! c)]
      (when (not= val nil)
        (println str val)
        (recur (<!! c))))
      (prn "END."))))

