(ns hoare.utils
  (:require [cljs.core.async :as async :refer [<! >! chan close! timeout put! take! go alts! filter< go-loop]])
  (:require-macros [cljs.core.async.macros :refer [go alt! go-loop]]))

(defn println-chan[source]
  (go-loop[input (<! source)]
          (if-not (nil? input)
            (do
              (.log js/console input)
              (recur (<! source)))
            (.log js/console "Channel was closed"))))

(defn print-chan[source]
  (go-loop[input (<! source)]
          (if-not (nil? input)
            (do
              (.log js/console input)
              (recur (<! source)))
          (.log js/console "Channel was closed"))))

