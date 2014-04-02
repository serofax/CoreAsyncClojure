(ns clojureexamplesvince.unblockingbuffer
  (:require [clojure.core.async :as async :refer [<! <!! >!! >! chan close! timeout put! take! go alt! alts! filter< filter> onto-chan dropping-buffer unblocking-buffer? sliding-buffer]]))

; unblocking-buffer?
(let [c (dropping-buffer 4)]
  (unblocking-buffer? c))

(let [c (sliding-buffer 4)]
  (unblocking-buffer? c))

(let [c (chan)]
  (unblocking-buffer? c))


