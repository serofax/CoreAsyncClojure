(ns apiexamples.test)
(require '[clojure.core.async :as async :refer [<! >! <!! >!! timeout chan alt! alts!! go thread filter< filter> put! close! buffer dropping-buffer sliding-buffer unblocking-buffer?]])


(def c (chan 10))

(thread
 (>!! c 1)
 (>!! c 2)
 (>!! c 3)
 (>!! c 4)
 (>!! c 5)
 (>!! c 6)
 (>!! c 7)
 (>!! c 8)
 (>!! c 9)
 (>!! c 10))

(def t (async/take 4 c))

(go (println (<! t)))