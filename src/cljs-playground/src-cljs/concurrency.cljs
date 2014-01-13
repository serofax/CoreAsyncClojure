(ns cljs-playground.core
  (:require [cljs-playground.utils :refer [log read-chan]]
            [cljs.core.async :as async :refer [<! >! timeout chan onto-chan alt! alts! filter< filter> put! close! buffer dropping-buffer sliding-buffer unblocking-buffer? take take! to-chan reduce unique pipe into partition partition-by mult tap untap untap-all mix admix unmix unmix-all toggle solo-mode merge split remove< remove> map map< mapcat< pub sub unsub unsub-all]])
  (:require-macros [cljs.core.async.macros :refer [go go-loop]]))


(defn process[id c]
  (let[pcl (filter< #(= % id) c)]
    (go-loop [val (<! pcl)]
      (when-not (= val nil)
        (log (str "Process" id))
        (recur (<! pcl)))
      (log (str "Process " id " terminated.")))))

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
