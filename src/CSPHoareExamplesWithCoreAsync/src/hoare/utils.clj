(ns hoare.utils
  (:require [clojure.core.async :as async :refer [<! <!! >!! >! chan close! timeout put! take! go alt!! alts! filter< go-loop]]))

(defn println-chan[source]
  (go-loop[input (<! source)]
          (when-not (nil? input)
            (println input)
            (recur (<! source)))
          (println "Channel was closed")))

(defn print-chan[source]
  (go-loop[input (<! source)]
          (when-not (nil? input)
            (print input)
            (recur (<! source)))
          (println \newline "Channel was closed")))

(defn isChannelClosed? [source]
  "WARNING: This function will take an item from the channel if there is one.
  If the channel IS NOT CLOSED the execution will be halted for 1 millisecond and then interrupted by a timeout.
  So there is a posibility that this function returns false if the channel is closed"
  (alt!!
   source ([value] (nil? value))
   (timeout 1) ([_] (do
                         (println "timeout"))
                         false)))
