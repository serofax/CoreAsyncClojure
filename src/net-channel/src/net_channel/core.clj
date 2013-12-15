(ns net-channel.core)
(require '[clojure.core.async :as async :refer [<! >! <!! >!! timeout chan alt! alts!! go]])
(import java.net.Socket)
(import java.net.ServerSocket)

(def sckt (new (ServerSocket 12000)))


