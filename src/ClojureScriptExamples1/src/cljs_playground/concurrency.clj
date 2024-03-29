(ns cljs-playground.utils
  (:require [clojure.core.async :as async :refer [filter< go go-loop <! >! chan timeout close!]]))

(defn process[id c]
  (let[pcl (filter< #(= % id) c)]
    (go-loop [val (<! pcl)]
      (when-not (= val nil)
        (println "Process " id)
        (recur (<! pcl)))
      (println "Process " id " terminated."))))

(def c (timeout 10000)) ; Processes will be terminated after 10secs

(defn schedule[c n]
  (dotimes [i n]
    (go
      (while true
        (<! (timeout (rand-int 1000)))
        (>! c i)))))

(schedule c 2)
(process 0 c)
(process 1 c)

