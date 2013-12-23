(ns apiexamples.core)
(require '[clojure.core.async :as async :refer [<! >! <!! >!! timeout chan alt! alts!! go go-loop thread filter< filter> put! close! buffer dropping-buffer sliding-buffer unblocking-buffer? take take! thread-call]])


; go, <!, >!
; parking
(let [c (chan)]
  (go
    (>! c "test"))
  (go
    (println (<! c))))


; thread, >!!, <!!
; blocking
(let [c (chan)]
  (thread
    (>!! c "test"))
  (thread
    (println (<!! c))))

; put!
(let [c (chan)]
  (thread
    (>!! c "test thread"))
  (put! c "test put"
    (fn[] (println "done.")))
  (go
    (println (<! c)))
  (go
    (println (<! c))))

; close!
(let [c (chan)]
  (thread
    (loop [val (<!! c)]
      (when (not= val nil)
        (println val)
        (recur (<!! c))))
      (println "stop."))
  (go
    (>! c 1)
    (close! c)))

; buffer
(let [c (chan (buffer 4))]
  (dotimes[n 4]
    (>!! c n))
  (dotimes[n 4]
    (println (<!! c))))

; dropping-buffer
(let [c (chan (dropping-buffer 4))]
  (dotimes[n 10]
    (>!! c n))
  (thread
  (loop [val (<!! c)]
    (when (not= val nil)
      (println "t2" val)
      (recur (<!! c))))
    (println "thread stop."))
    (close! c))


; sliding-buffer
(let [c (chan (sliding-buffer 4))]
  (dotimes[n 10]
    (>!! c n))
  (thread
  (loop [val (<!! c)]
    (when (not= val nil)
      (println "t2" val)
      (recur (<!! c))))
    (println "thread stop."))
    (close! c))


; unblocking-buffer?
(let [b (buffer 2)]
  (unblocking-buffer? b))

(let [b (dropping-buffer 4)]
  (unblocking-buffer? b))

(let [b (sliding-buffer 4)]
  (unblocking-buffer? b))

; filter<
(let [c (chan)]
  (let [s (filter< string? c)]
  (let [n (filter< number? c)]
  (thread
    (loop [val (<!! n)]
      (when (not= val nil)
        (println "t1" val)
        (recur (<!! n))))
      (println "t1 stop."))
  (thread
    (loop [val (<!! s)]
      (when (not= val nil)
        (println "t2" val)
        (recur (<!! s))))
      (println "t2 stop."))
  (thread
    (>!! c "abc")
    (Thread/sleep 100)
    (>!! c 123)
    (Thread/sleep 100)
    (close! c)))))

; take
(let [c (chan 12)]
  (dotimes[n 12]
    (go(>!! c n)))
  (let [t (async/take 4 c)]
  (thread
    (loop [val (<!! t)]
      (when (not= val nil)
        (println val)
        (recur (<!! t))))
      (println "stop."))))

; take!
(defn callback[val] (println "callback: " val))
(let [c (chan)]
    (take! c callback)
    (put! c "test"))

; thread-call
(defn long_calculation[x] (+ x 2))
(def c (thread-call #(long_calculation 5)))
(go
  (println (<! c)))

; timeout
(let [c (timeout 4000)]
  (put! c "test")
  (thread
  (loop [val (<!! c)]
    (when (not= val nil)
      (println val)
      (recur (<!! c))))
    (println "timeout")))

; go-loop
(defn count[n]
  (let [c (chan (buffer 100))]
    (go-loop [i 0]
      (when (< i n)
        (>! c i)
        (recur (inc i)))
      (close! c))
  c))

(let [c (count 10)]
  (thread
    (loop [val (<!! c)]
      (when (not= val nil)
        (println val)
        (recur (<!! c))))
      (println "END.")))

; filter>
; admix
; alt!
; alt!!
; alts!
; alts!!
; do-alts
; into
; map
; map<
; map>
; mapcat<
; mapcat>
; merge
; mix
; mult
; onto-chan
; partition
; partition-by
; pipe
; pub
; reduce
; remove<
; remove>
; solo-mode
; split
; sub
; tap
; to-chan
; toggle
; unique
; unmix
; unmix-all
; unsub
; unsub-all
; untap
; untap-all



