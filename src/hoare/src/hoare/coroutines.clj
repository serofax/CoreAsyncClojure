(ns hoare.coroutines
  (:require [clojure.core.async :as async :refer [<! <!! >!! >! chan close! timeout put! take! go alt! alts! filter< go-loop to-chan]]
            [hoare.utils :refer :all]
            [clojure.core.match :refer [match]]))


(defn copy [west east]
  "Writes all objects from channel west to channel east. Closes channel east if channel west was closed.
  Channels already copy between two processes.
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
    (println "Channel east is closed:" (isChannelClosed? east)))


(defn squash [source]
  "Replacs every pair of consecutive asterisks \"**\" by an upward arrow
  "^". Assume that the final character input is not an asterisk.
  Closes channel result if channel source is closed."
  (let [result (chan)]
   (go-loop [value (<! source), state :NOASTERIX]
    (cond
     (nil? value)(do
                    (when (= state :ONEASTERIX)
                      (>! result \*))
                    (close! result))
     (and (not= value \*) (= state :NOASTERIX)) (do (>! result value) (recur (<! source) :NOASTERIX))
     (and (not= value \*) (= state :ONEASTERIX)) (do (>! result \*)(>! result value) (recur (<! source) :NOASTERIX))
     (and (= value \*) (= state :NOASTERIX)) (recur (<! source) :ONEASTERIX)
     (and (= value \*) (= state :ONEASTERIX)) (do (>! result \^) (recur (<! source) :NOASTERIX))))
    result))


#_(let [source (chan), out (squash source)]
  (println-chan out)
  (>!! source \*)
  (<!! (timeout 1000))
  (>!! source \*)
  (<!! (timeout 1000))
  (>!! source \H)
  (>!! source \e)
  (>!! source \l)
  (>!! source \l)
  (>!! source \o)
  (>!! source \*)
  (<!! (timeout 1000))
  (>!! source \2)
  (>!! source \*)
  (close! source)
  (<!! (timeout 1000))
  (println "Channel source is closed:" (isChannelClosed? source))
  (println "Channel out is closed:" (isChannelClosed? out)))

(defn disassemble[source]
  "Reads cardfiles with length 80 from source and prints every character to an outoutsteam. A Space will be placed at the end of a cardfile.
  Closes the outchanel if the inputchannel was closed."
  (let [result (chan)]
    (go-loop [file (<! source)]
             (if-not (nil? file)
               (do
                 (dotimes [i 80]
                   (>! result (get file i)))
                 (>! result \space)
                 (recur (<! source)))
               (close! result)))
    result))


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
  "Takes a source channel with characters and buffers the chars if there are 125 characters on the buffer. At the end the buffer will be written to the outputchannel.
  If the sourcechannel is closed before 125 characters are received the missing spaces will be replaced with spaces and the outputchannel will be closed."
  (let [result (chan)]
    (go-loop [i 0 , value (<! source), line "", spaces? :NO]
             (if (<= i 125)
               (if (and (not= value nil) (= spaces? :NO) )
                 (recur (inc i) (<! source) (str line value) :NO)
                 (recur (inc i) \space (str line value):YES))
               (do
                 (>! result line)
                 (close! result))))

    result))

#_(let [characters (take (rand-int 126) (repeatedly #(rand-int 10))),
      assemplerChannel (to-chan characters)]
  (println "Characters:" characters)
  (<!! (timeout 1000))
  (let [out (assemble assemplerChannel)]
    (println-chan out)
    (close! assemplerChannel)
    (<!! (timeout 1000))
    (println "Channel assemplerChannel is closed:" (isChannelClosed? assemplerChannel))
    (println "Channel out is closed:" (isChannelClosed? out))))


(defn reformat[source]
  "Reads a sequence of cards of 80 characters each, and print the characters on a lineprinter at 125 characters per line.
  Classic version more hoare-like."
  (let [connectorchannel (chan)]
    (copy (disassemble source) connectorchannel)
    (assemble connectorchannel)))

(defn reformat2[source]
  "Reads a sequence of cards of 80 characters each, and print the characters on a lineprinter at 125 characters per line.
  Without copy because channels do the same"
  (assemble (disassemble source)))

; for reformat1
#_(let [cardfile (apply str (take 80 (repeatedly #(rand-int 10)))),
      reformatchannel (chan),
      out (reformat reformatchannel) ]
  (print-chan out)
  (println "Cardfile:" cardfile)
  (>!! reformatchannel cardfile)
  (close! reformatchannel)
  (<!! (timeout 1000))
  (println "Channel reformatchannel is closed:" (isChannelClosed? reformatchannel))
  (println "Channel out is closed:" (isChannelClosed? out)))

;for reformat2
#_(let [cardfile (apply str (take 80 (repeatedly #(rand-int 10)))),
      reformatchannel (chan),
      out (reformat2 reformatchannel) ]
  (print-chan out)
  (println "Cardfile:" cardfile)
  (>!! reformatchannel cardfile)
  (close! reformatchannel)
  (<!! (timeout 1000))
  (println "Channel reformatchannel is closed:" (isChannelClosed? reformatchannel))
  (println "Channel out is closed:" (isChannelClosed? out)))

(defn conwaysproblem [source]
  "Replaces every ** in a cardfile with a ^ and assemble the characters to a 125 char long string"
  (assemble (squash (disassemble source))))



#_(let [cardfile "2904826572863778252*121375245405****8***8161003158101858872565**9*72140300182710",
      source (chan),
      out (conwaysproblem source) ]
  (print-chan out)
  (println "Cardfile:" cardfile)
  (>!! source cardfile)
  (close! source)
  (<!! (timeout 1000))
  (println "Channel source is closed:" (isChannelClosed? source))
  (println "Channel out is closed:" (isChannelClosed? out)))

