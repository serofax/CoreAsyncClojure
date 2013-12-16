(ns net-channel.core
  (:require [clojure.core.async :as async :refer [<! >! <!! >!! timeout chan alt! alts!! go]])
  (:import (java.net Socket ServerSocket)))
;(require '[clojure.core.async :as async :refer [<! >! <!! >!! timeout chan alt! alts!! go]])
;(import java.net.Socket)
;(import java.net.ServerSocket)

(def sckt (new ServerSocket 12000))


(def ^:private ipm-print-method
  (get (methods print-method) clojure.lang.IPersistentMap))

(defmethod print-method clojure.lang.PersistentTreeMap
  [o ^java.io.Writer w]
  (.write w "#sorted/map ")
  (ipm-print-method o w))

(sorted-map :foo 1 :bar 2)

(binding [*print-dup* true] (println [1 2 3]))
