(ns clojureexamplesvince.tests
  (:require [clojure.core.async :as async :refer [<! <!! >!! >! chan close! timeout put! take! go alt! alts! filter< filter> onto-chan]]))

(def c (chan))


(go
 (while true?
   (println "msg:" (<! c))))
(>!! c "hi")
