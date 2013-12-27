(ns apiexamples.core)
(require '[clojure.core.async :as async :refer [<! >! <!! >!! timeout chan onto-chan alt! alts! alts!! go go-loop thread filter< filter> put! close! buffer dropping-buffer sliding-buffer unblocking-buffer? take take! thread-call to-chan reduce unique pipe into partition partition-by mult tap untap untap-all mix admix unmix unmix-all toggle solo-mode merge split remove< remove> map map< mapcat< pub sub unsub unsub-all]])

; output function used in further examples
(defn read-chan
  ([c] (read-chan "" c))
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
  (read-chan c)
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
  (read-chan c))


; sliding-buffer
(let [c (chan (sliding-buffer 4))]
  (dotimes[n 10]
    (>!! c n))
    (close! c)
  (read-chan c))


; unblocking-buffer?
(let [a (buffer 2)
      b (dropping-buffer 4)
      c (sliding-buffer 4)]
  (println (unblocking-buffer? a))
  (println (unblocking-buffer? b))
  (println (unblocking-buffer? c)))

; filter<
(let [c  (chan)
      c1 (filter< string? c)
      c2 (filter< number? c)]
  (thread
    (>!! c "abc")
    (>!! c 123))
  (read-chan "c1: " c1)
  (read-chan "c2: " c2))

; filter>
(let [out (chan)
      c (filter> string? out)]
  (thread
    (>!! c "abc")
    (>!! c 123))
  (read-chan out))

; take
(let [c (chan 12)
      t (async/take 4 c)]
  (onto-chan c (range 0 12))
  (read-chan t))


; take!
(let [c (chan)
      callback (fn[val] (println "callback: " val))]
  (take! c callback)
  (put! c "test"))

; thread-call
(let [long_calculation (fn[x] (+ x 2))
      c (thread-call #(long_calculation 5))]
  (go
    (println (<! c))))

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
(letfn [(count[n]
  (let [c (chan (buffer 100))]
    (go-loop [i 0]
      (when (< i n)
        (>! c i)
        (recur (inc i)))
      (close! c))
  c))]
  (read-chan (count 10)))

; to-chan
(read-chan (to-chan {:a 1 :b 2 :c 3}))
(read-chan (to-chan '(1, 2, 3)))
(read-chan (to-chan [1 2 3]))
(read-chan (to-chan #{1, 2, 3}))
(read-chan (to-chan (range 1 4)))

; onto-chan
(let [c (chan)]
  (onto-chan c [1 2 3])
  (read-chan c))

; reduce
(let [c (to-chan (range 1 10))]
  (read-chan
    (reduce + 0 c)))

; unique
(read-chan
  (unique
    (to-chan '(1, 1, 2, 2, 3, 3))))

; pipe
(let [a (to-chan (range 1 10))
      b (chan)]
  (pipe a b)
  (read-chan b))

; into
(let [c (chan 6)
      results (into [4 5 6] c)]
  (onto-chan c [1 2 3])
  (close! c)
  (read-chan results))

; partition
(let [c (chan 10)
      results (partition 2 c)]
  (onto-chan c (range 0 10))
  (read-chan results))

; partition-by
(let [c (chan 10)
      results (partition-by #(< 4 %) c)]
  (onto-chan c (range 0 10))
  (read-chan results))

; merge
(let [c1 (chan 5)
      c2 (chan 5)
      c (merge [c1 c2] 10)]
  (onto-chan c1 (range 0 5))
  (onto-chan c2 (range 5 10))
  (read-chan c))

; split
(let [c (chan 10)
      v (split even? c)]
  (onto-chan c (range 0 10))
  (read-chan "even:" (v 0))
  (read-chan "odd: " (v 1)))

; remove<
(let [c (chan 10)
      results (remove< odd? c)]
  (onto-chan c (range 0 10))
  (read-chan results))

; remove>
(let [results (chan 10)
      c (remove> odd? results)]
  (onto-chan c (range 0 10))
  (read-chan results))

; map
(let [c1 (chan)
      c2 (chan)
      c (map + [c1 c2])]
  (put! c1 5)
  (put! c2 3)
  (read-chan c))

; map<
(let [c (chan)
      results (map< inc c)]
  (put! c 1)
  (put! c 2)
  (read-chan results))

; map>
(let [results (chan)
      c (map> inc results)]
  (put! c 1)
  (put! c 2)
  (close! c)
  (read-chan results))

; mapcat<
(let [c (chan)
      results (mapcat< #(conj % 5) c)]
  (put! c [1 2 3 4])
  (close! c)
  (read-chan results))

; mapcat>
(let [results (chan)
      c (mapcat> #(conj % 5) results)]
  (put! c [1 2 3 4])
  (close! c)
  (read-chan results))

; mult, tap
(let [c (chan)
      m (mult c)
      c1 (chan)
      c2 (chan)]
  (tap m c1)
  (tap m c2)
  (put! c "test")
  (read-chan "c1:" c1)
  (read-chan "c2:" c2))

; untap
(let [c (chan)
      m (mult c)
      c1 (chan)
      c2 (chan)]
  (tap m c1)
  (tap m c2)
  (untap m c1)
  (put! c "test")
  (read-chan "c1:" c1)
  (read-chan "c2:" c2))

; untap-all
(let [c (chan)
      m (mult c)
      c1 (chan)
      c2 (chan)]
  (tap m c1)
  (tap m c2)
  (untap-all m)
  (put! c "test")
  (read-chan "c1:" c1)
  (read-chan "c2:" c2))

; mix, admix
(let [c (chan)
      m (mix c)
      c1 (chan)
      c2 (chan)]
  (admix m c1)
  (admix m c2)
  (onto-chan c1 (range 0 5))
  (onto-chan c2 (range 5 10))
  (read-chan c))

; unmix
(let [c (chan)
      m (mix c)
      c1 (chan)
      c2 (chan)]
  (admix m c1)
  (admix m c2)
  (unmix m c2)
  (onto-chan c1 (range 0 5))
  (onto-chan c2 (range 5 10))
  (read-chan c))

; unmix-all
(let [c (chan)
      m (mix c)
      c1 (chan)
      c2 (chan)]
  (admix m c1)
  (admix m c2)
  (unmix-all m)
  (onto-chan c1 (range 0 5))
  (onto-chan c2 (range 5 10))
  (read-chan c))

; toggle
; Attributes:
;   :solo - when true, only this (ond other soloed) channel(s) will appear
;        in the mix output channel. :mute and :pause states of soloed
;        channels are ignored. If solo-mode is :mute, non-soloed
;        channels are muted, if :pause, non-soloed channels are
;        paused.
;  :mute - muted channels will have their contents consumed but not included in the mix
;  :pause - paused channels will not have their contents consumed (and thus also not included in the mix)
(let [c (chan)
      m (mix c)
      c1 (chan)
      c2 (chan)]
  (admix m c1)
  (admix m c2)
  (toggle m
    { c1 {:mute false}
      c2 {:mute true} })
  (onto-chan c1 (range 0 5))
  (onto-chan c2 (range 5 10))
  (read-chan c))

; solo-mode
(let [c (chan)
      m (mix c)
      c1 (chan)
      c2 (chan)]
  (admix m c1)
  (admix m c2)
  (solo-mode m :mute)
  (toggle m
    { c1 {:solo true}})
  (onto-chan c1 (range 0 5))
  (onto-chan c2 (range 5 10))
  (read-chan c))

; pub, sub
(let [c (chan 10)
      p (pub c even?)
      c1 (chan 10)
      c2 (chan 10)]
  (sub p true c1)
  (sub p false c2)
  (onto-chan c (range 0 10))
  (read-chan "c1:" c1))

; unsub
(let [c (chan 10)
      p (pub c even?)
      c1 (chan 10)
      c2 (chan 10)]
  (unsub p true c1)
  (onto-chan c (range 0 10))
  (read-chan "c1:" c1))

; unsub-all
(let [c (chan 10)
      p (pub c even?)
      c1 (chan 10)
      c2 (chan 10)]
  (unsub-all p)
  (onto-chan c (range 0 10))
  (read-chan "c1:" c1))

; alts!!
; (read)
(let [n 2
      cs (repeatedly n chan)]
  (doseq [c cs]
    (put! c "test"))
  (thread
    (dotimes [i n]
      (let [[v c] (alts!! cs)]
        (println "read: " v "from: " c)))))

; alts!
; (read)
(let [n 2
      cs (repeatedly n chan)]
  (doseq [c cs]
    (put! c "test"))
    (dotimes [i n]
      (go (let [[v c] (alts!! cs)]
        (println "read: " v "from: " c)))))

; alts!
; (write)
; TODO

; alt!
; alt!!
; do-alts






