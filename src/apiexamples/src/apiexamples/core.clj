(ns apiexamples.core)
(require '[clojure.core.async :as async :refer [<! >! <!! >!! timeout chan onto-chan alt! alts!! go go-loop thread filter< filter> put! close! buffer dropping-buffer sliding-buffer unblocking-buffer? take take! thread-call to-chan reduce unique pipe into partition partition-by mult tap untap untap-all]])

; output function used in further examples
(defn read_chan
  ([c] (read_chan "" c))
  ([str c]
  (thread
    (loop [val (<!! c)]
      (when (not= val nil)
        (println str val)
        (recur (<!! c))))
      (println "END."))))

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
  (read_chan c)
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
    (close! c)
  (read_chan c))


; sliding-buffer
(let [c (chan (sliding-buffer 4))]
  (dotimes[n 10]
    (>!! c n))
    (close! c)
  (read_chan c))


; unblocking-buffer?
(let [a (buffer 2)
      b (dropping-buffer 4)
      c (sliding-buffer 4)]
  (println (unblocking-buffer? a))
  (println (unblocking-buffer? b))
  (println (unblocking-buffer? c)))

; filter<
(let [c (chan)
      c1 (filter< string? c)
      c2 (filter< number? c)]
  (thread
    (>!! c "abc")
    (>!! c 123))
  (read_chan "c1: " c1)
  (read_chan "c2: " c2))

; take
(let [c (chan 12)
      t (async/take 4 c)]
  (onto-chan c (range 0 12))
  (read_chan t))


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
(read_chan (count 10))

; to-chan
(read_chan (to-chan {:a 1 :b 2 :c 3}))
(read_chan (to-chan '(1, 2, 3)))
(read_chan (to-chan [1 2 3]))
(read_chan (to-chan #{1, 2, 3}))
(read_chan (to-chan (range 1 4)))

; onto-chan
(let [c (chan)]
  (onto-chan c [1 2 3])
  (read_chan c))

; reduce
(let [c (to-chan (range 1 10))]
  (read_chan
    (reduce + 0 c)))

; unique
(read_chan
  (unique
    (to-chan '(1, 1, 2, 2, 3, 3))))

; pipe
(let [a (to-chan (range 1 10))
      b (chan)]
  (pipe a b)
  (read_chan b))

; into
(let [c (chan 6)
      results (into [4 5 6] c)]
  (onto-chan c [1 2 3])
  (close! c)
  (read_chan results))

; partition
(let [c (chan 10)
      results (partition 2 c)]
  (onto-chan c (range 0 10))
  (read_chan results))

; partition-by
(let [c (chan 10)
      results (partition-by #(< 4 %) c)]
  (onto-chan c (range 0 10))
  (read_chan results))

; mult, tap
(let [c (chan)
      m (mult c)
      c1 (chan)
      c2 (chan)]
  (tap m c1)
  (tap m c2)
  (put! c "test")
  (read_chan "c1:" c1)
  (read_chan "c2:" c2))

; untap
(let [c (chan)
      m (mult c)
      c1 (chan)
      c2 (chan)]
  (tap m c1)
  (tap m c2)
  (untap m c1)
  (put! c "test")
  (read_chan "c1:" c1)
  (read_chan "c2:" c2))

; untap-all
(let [c (chan)
      m (mult c)
      c1 (chan)
      c2 (chan)]
  (tap m c1)
  (tap m c2)
  (untap-all m)
  (put! c "test")
  (read_chan "c1:" c1)
  (read_chan "c2:" c2))



; filter>
; admix
; alt!
; alt!!
; alts!
; alts!!
; do-alts
; map
; map<
; map>
; mapcat<
; mapcat>
; merge
; mix
; pub
; remove<
; remove>
; solo-mode
; split
; sub
; toggle
; unmix
; unmix-all
; unsub
; unsub-all




