(ns cljs-playground.utils
  (:require [cljs.core.async :as async :refer [<! >! chan]])
  (:require-macros [cljs.core.async.macros :refer [go-loop go]]))

(defn log[s]
  (let [div (.getElementById js/document "cljsoutput")]
    (.appendChild div
      (.createTextNode js/document s))
    (.appendChild div
      (.createElement js/document "br"))))

(defn read-chan
  ([c] (read-chan "" c))
  ([str c]
  (go
    (loop [val (<! c)]
      (when (not= val nil)
        (log val)
        (recur (<! c))))
      (log "END."))))

