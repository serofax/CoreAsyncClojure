(ns cljs-playground.utils
  (:require [clojure.core.async :as async :refer [filter< go go-loop <! >! chan timeout close!]]))

(defn process[id c]
  (let[pcl (filter< #(= % id) c)]
    (go-loop [val (<! pcl)]
      (when-not (= val nil)
        (println "Process" id)
        (recur (<! pcl)))
      (println "Process " id " terminated."))))

(def c (timeout 10000))

(go
  (while true
    (<! (timeout (rand-int 1000)))
    (>! c 1)))
(go
  (while true
    (<! (timeout (rand-int 1000)))
    (>! c 2)))

(process 1 c)
(process 2 c)

