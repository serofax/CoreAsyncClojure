(ns quicksort.test)
(require '[clojure.core.async :as async])
(use '[clojure.core.match :only (match)])

stop


(defn sortNode [outChannel]
  (let[newObj ^{:type ::sortNode}{:outChannel outChannel, :inChannelLeft (async/chan 100), :inChannelRight (async/chan 100)}]
    ;(println "new node" (:inChannelLeft newObj) (:inChannelRight newObj) (:outChannel newObj))
    (async/go-loop
     [v1 (async/<! (:inChannelLeft newObj)), v2 (async/<! (:inChannelRight newObj))]
     ;(println "loop" v1 v2 newObj)
     (cond
       (and (not= v1 :EOS) (not= v2 :EOS))(cond
                                           (<= v1 v2)(do
                                                       ;(println "cond 1 cond 1")
                                                       (async/>! (:outChannel newObj) v1)
                                                       (recur (async/<! (:inChannelLeft newObj)) v2))
                                           (<= v2 v1)(do
                                                       ;(println "cond 1 cond 2")
                                                       (async/>! (:outChannel newObj) v2)
                                                       (recur v1 (async/<! (:inChannelRight newObj)))))
      (and (not= v1 :EOS) (= v2 :EOS))(do
                                        ;(println "cond 2")
                                        (async/>! (:outChannel newObj) v1)
                                        (recur (async/<! (:inChannelLeft newObj)) v2))
      (and (= v1 :EOS) (not= v2 :EOS))(do
                                        ;(println "cond 3")
                                        (async/>! (:outChannel newObj) v2)
                                        (recur v1 (async/<! (:inChannelRight newObj))))
      :else (do
              ;(println "SEND EOS")
              (async/>! (:outChannel newObj) :EOS)
              (async/close! (:outChannel newObj))
              )))
     newObj))

(defn notelevel
  ([rootChannel wantedEndChannels] (notelevel [rootChannel] 1 wantedEndChannels))
  ([openChannels level wantedEndChannels]
   (let [maxChannelsInThisLevel (Math/pow 2 level)]
     ;(println "level:" level "wantedEndChannels:" wantedEndChannels "openChannels:" openChannels)
     (loop [oc [], i 0]
      (cond
       (and (>= (count oc) wantedEndChannels) (>= (count oc) maxChannelsInThisLevel))oc
       (>= (count oc) maxChannelsInThisLevel)(notelevel oc (inc level) wantedEndChannels)
       :else (let [newNode (sortNode (get openChannels i))]
               ;(println "i:" i "count oc" (count oc) )
               (recur (conj oc (:inChannelLeft newNode) (:inChannelRight newNode)) (inc i)))
       )
      )
    )
   )
  )

(defn logB [value]
  (/(Math/log value) (Math/log 2)))

(defn roundUp [value]
  (if (zero? (mod value 1))
    value
    (inc (int value))))

(defn quickSortWithNodes [l]
  (let [exitChannel (async/chan 100), endChannels (notelevel exitChannel (count l)), sortList (concat l (replicate (- (Math/pow 2(roundUp (logB (count l)))) (count l)) :EOS))]
    ;(println (count endChannels))
    ;(println sortList)
    (if (<= (count l)1)
      l
      (do
        (doseq [[nextChannel nextElement] (map vector endChannels sortList)]
          (async/>!! nextChannel nextElement)
          (async/>!! nextChannel :EOS)
          (async/close! nextChannel))
        (take (count l) (iterate (fn[_](async/<!! exitChannel)) (async/<!! exitChannel)))))
  ))

(quickSortWithNodes [9])

(defn randomSeqOneTo[n]
  (repeatedly #(inc(rand-int n))))

(quickSortWithNodes (into [] (take 100 (randomSeqOneTo 10000))))
(time (def ka (quickSortWithNodes (into [] (take 1000 (randomSeqOneTo 10000))))))

(def exitChan (async/chan 100))
(def node (sortNode exitChan))

(async/>!! (:inChannelLeft node) 5)
(async/>!! (:inChannelLeft node) 7)
(async/>!! (:inChannelLeft node) 9)
(async/>!! (:inChannelRight node) 1)
(async/>!! (:inChannelRight node) 5)
(async/>!! (:inChannelRight node) 12)
(async/>!! (:inChannelLeft node) :EOS)
(async/>!! (:inChannelRight node) :EOS)
(async/>!! (:inChannelLeft node) :EOS)
(async/>!! (:inChannelRight node) :EOS)

(async/<!! exitChan)

(doc async)
