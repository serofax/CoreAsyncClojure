(ns cljs-playground.core
  (:require [cljs-playground.utils :refer [log read-chan]]
            [cljs.core.async :as async :refer [<! >! timeout chan onto-chan alt! alts! filter< filter> put! close! buffer dropping-buffer sliding-buffer unblocking-buffer? take take! to-chan reduce unique pipe into partition partition-by mult tap untap untap-all mix admix unmix unmix-all toggle solo-mode merge split remove< remove> map map< mapcat< pub sub unsub unsub-all]])
  (:require-macros [cljs.core.async.macros :refer [go go-loop]]))

(defn chanTest[]
  (let [c (chan)]
    (go (>! c "test"))
    (go (log (<! c)))))

(chanTest)