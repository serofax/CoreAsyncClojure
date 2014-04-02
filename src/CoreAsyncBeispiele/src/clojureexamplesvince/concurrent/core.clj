(ns clojureexamplesvince.concurrent
 (:import (java.util.concurrent Executors)))

(defn prime? [n]
  (cond
    (= n 2) true
    (<= n 1) false
    (odd? n)(zero?
            (count
              (filter
                #(zero? (mod n %))
                (range 3 n 2))))
    :else false
    )
  )



(let [pool (Executors/newFixedThreadPool 5)]
  (dotimes [i 5]
    (. pool execute (fn[](println i ":" (-> (Thread/currentThread) (.getName))))))
  (. pool shutdown))

(let [t (Thread. #(dotimes [i 5]
            (println (-> (Thread/currentThread) (.getName)) i)))]
  (println (-> (Thread/currentThread) (.getName)) "before")
  (. t start)
  (println (-> (Thread/currentThread) (.getName)) "after"))

(println (-> (Thread/currentThread) (.getName)))
(let [f (future
          (Thread/sleep 1000)
          (println (-> (Thread/currentThread) (.getName)) " I'm done")
          42)]
  (println (future? f))
  (println (realized? f))
  (Thread/sleep 2000)
  (println (realized? f))
  (println @f))



