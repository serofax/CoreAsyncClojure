(ns clojureexamplesvince.concurrent
 (:import (java.util.concurrent Executors)))



(let [pool (Executors/newFixedThreadPool 5)]
  (dotimes [i 5]
    (. pool execute (fn[](println i ":" (-> (Thread/currentThread) (.getName))))))
  (. pool shutdown))


