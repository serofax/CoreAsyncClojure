(ns hoare.coroutines
  (:require [clojure.core.async :as async :refer [<! <!! >!! >! chan close! timeout put! take! go alt! alts! filter< go-loop to-chan]]
            [hoare.utils :refer :all]
            [clojure.core.match :refer [match]]))


(defn copy [west east]
  "Writes all objects from channel west to channel east. Closes channel east if channel west was closed.
  Like core.async/pipe"
  (go-loop[input (<! west)]
          (when-not (nil? input)
            (>! east input)
            (recur (<! west)))
          (close! east)))

#_(let [west (chan), east (chan)]
    (copy west east)
    (println-chan east)
    (>!! west "Hallo")
    (<!! (timeout 1000))
    (>!! west "from")
    (<!! (timeout 1000))
    (>!! west "West")
    (close! west)
    (<!! (timeout 1000))
    (println "Channel west is closed:" (isChannelClosed? west))
    (println "Channel east is closed:" (isChannelClosed? east))
    )


(defn squash [west east]
  "Replacs every pair of consecutive asterisks \"**\" by an upward arrow
  "^". Assume that the final character input is not an asterisk.
  Closes channel east if channel west was closed."
  (go-loop [value (<! west), state :NOASTERIX]
    (cond
     (nil? value) (close! east)
     (and (not= value \*) (= state :NOASTERIX)) (do (>! east value) (recur (<! west) :NOASTERIX))
     (and (not= value \*) (= state :ONEASTERIX)) (do (>! east \*)(>! east value) (recur (<! west) :NOASTERIX))
     (and (= value \*) (= state :NOASTERIX)) (recur (<! west) :ONEASTERIX)
     (and (= value \*) (= state :ONEASTERIX)) (do (>! east \^) (recur (<! west) :NOASTERIX)))))


#_(let [west (chan), east (chan)]
  (squash west east)
  (println-chan east)
  (>!! west \*)
  (<!! (timeout 1000))
  (>!! west \*)
  (<!! (timeout 1000))
  (>!! west \H)
  (>!! west \e)
  (>!! west \l)
  (>!! west \l)
  (>!! west \o)
  (>!! west \*)
  (<!! (timeout 1000))
  (>!! west \2)
  (close! west)
  (<!! (timeout 1000))
  (println "Channel west is closed:" (isChannelClosed? west))
  (println "Channel east is closed:" (isChannelClosed? east)))

(defn disassemble[source]
  "Reads cardfiles with length 80 from source and prints every character to an outoutsteam. A Space will be placed at the end of a cardfile.
  loses channel east if channel west was closed."
  (let [result (chan)]
    (go-loop [file (<! source)]
             (if-not (nil? file)
               (do
                 (dotimes [i 80]
                   (>! result (.charAt file i)))
                 (>! result \space)
                 (recur (<! source)))
               (close! result))
               )
    result
    ))


#_(let [cardfile1 (apply str (take 80 (repeatedly #(rand-int 10)))),
      cardfile2 (apply str (take 80 (repeatedly #(rand-int 10))))
      cardfileChannel (chan)
      out (disassemble cardfileChannel) ]
  (print-chan out)
  (println "Cardfile1:" cardfile1)
  (println "Cardfile2:" cardfile2)
  (>!! cardfileChannel cardfile1)
  (>!! cardfileChannel cardfile2)
  (<!! (timeout 1000))
  (close! cardfileChannel)
  (println "Channel cardfileChannel is closed:" (isChannelClosed? cardfileChannel))
  (println "Channel out is closed:" (isChannelClosed? out)))

(defn assemble[source]
  (let [result (chan)]
    (go-loop [i 0 , value (<! source), line "", spaces? :NO]
             (if (<= i 125)
               (if (and (not= value nil) (= spaces? :NO) )
                 (recur (inc i) (<! source) (str line value) :NO)
                 (recur (inc i) \space (str line value):YES))
               (do
                 (>! result line)
                 (close! result))))

    result
    ))

(let [characters (take (rand-int 126) (repeatedly #(rand-int 10))),
      assemplerChannel (to-chan characters)]
  (println "Characters:" characters)
  (<!! (timeout 1000))
  (let [out (assemble assemplerChannel)]
    (println-chan out)
    (close! assemplerChannel)
    (<!! (timeout 1000))
    (println "Channel assemplerChannel is closed:" (isChannelClosed? assemplerChannel))
    (println "Channel out is closed:" (isChannelClosed? out))))







