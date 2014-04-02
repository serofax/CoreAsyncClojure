(ns hoare.philosophers
  (:require [clojure.core.async :as async :refer [<! <!! >!! >! chan close! timeout put! take! go alt! alts! filter< go-loop to-chan]]
            [hoare.utils :refer :all]
            [clojure.core.match :refer [match]]))


;Five philosophers spend their lives thinking
;and eating. The philosophers share a common dining
;room where there is a circular table surrounded by five
; chairs, each belonging to one philosopher. In the center
;of the table there is a large bowl of spaghetti, and the
;table is laid with five forks (see Figure 1). On feeling
;hungry, a philosopher enters the dining room, sits in his
;own chair, and picks up the fork on the left of his place.
;Unfortunately, the spaghetti is so tangled that he needs
;to pick up and use the fork on his right as well. When he
;has finished, he puts down both forks, and leaves the
;room. The room should keep a count of the number of
;philosophers in it.

(defn state ([name state]{:name name, :state state})
  ([name state roomlink]
   {:name name, :state state :roomlink roomlink}))


(defn fork[name]
  "Construcs a fork with a name and two controlchannels for the right and the left philosoph.
  The fork will waiting on both channels and then only on the channel which was faster at the first time.
  After that the fork will waiting on both channels again."
  (let [rightphil (chan), leftphil (chan)]
    (go-loop [[value sourcephil] (alts! [rightphil leftphil])]
             #_(println name " -  is in use by" (:name value) "he sent" (:state value))
             (let [value2 (<! sourcephil)]
               #_(println name " -  is no more used by" (:name value2) "he sent" (:state value2)))
             (recur (alts! [rightphil leftphil])))
    {:rightphil rightphil, :leftphil leftphil}))

(defn room[maxphils philslinks]
  "Contructs a room.
  A room is a simple semaphore which only let access new philosphers if there is enough space.
  Every philosoph has one controlchannel which are passed together through the parameter philslinks."
  (go-loop [philsinside #{}]
           (println "In room there are" (count philsinside) "philosophers")
           (let [observed (if (>= (count philsinside) maxphils)
                            (vec philsinside)
                            philslinks),
                 [value source] (alts! observed)]
             (match (:state value)
                    :enters (recur (conj philsinside source))
                    :leaves (recur (disj philsinside source))))))

(defn phil[name, rightfork, leftfork]
  "Cronstrucs a philosoph which has one controlline to stop him and one roomlink.
  Every philosoph has a name and a right and left fork which are both the controllchannels of the forks.

  Every philosph has these endless sequence.
  1. Thinking (random 0-9999 ms)
  2. Entering room
  3. Take left fork
  4. Take right fork
  5. Eating (random 0-9999 ms)
  6. Leaving room
  \\(7. checking if there is something on the controlline and continue or abort the sequence\\)"
  (let [controlline (chan), room (chan)]
    (go
     (println name "wait")
     (<! controlline)
     (println name "- Startsignal received")
     (loop []
       (<! (timeout (rand-int 10000))) ; Phil thinks
       #_(println name "- wants to enter the room")
       (>! room (state name :enters))
       #_(println name "- entered room")
       (>! leftfork (state name :used))
       #_(println name "- has left fork")
       (>! rightfork (state name :used))
       (println name "- eating")
       (<! (timeout (rand-int 10000))) ; Phil eats
       (println name "- finished eating")
       (>! leftfork (state name :unused))
       (>! rightfork (state name :unused))
       (>! room (state name :leaves))
       (alt!
        controlline ([_](println name "- stop received"))
        (timeout 1) ([_](recur)))))
    {:controlline controlline, :room room}))


(def cancelchan (chan))
#_(let [fork0 (fork "fork0"),
      fork1 (fork "fork1"),
      fork2 (fork "fork2"),
      fork3 (fork "fork3"),
      fork4 (fork "fork4"),
      phil0 (phil "phil0" (:leftphil fork1) (:rightphil fork0)),
      phil1 (phil "phil1" (:leftphil fork2) (:rightphil fork1)),
      phil2 (phil "phil2" (:leftphil fork3) (:rightphil fork2)),
      phil3 (phil "phil3" (:leftphil fork4) (:rightphil fork3)),
      phil4 (phil "phil4" (:leftphil fork0) (:rightphil fork4)),
      phils (vector phil0 phil1 phil2 phil3 phil4),
      room (room 4 (apply vector (map #(:room %) phils)))]
  (println "philosophers START")
  (doseq [p phils]
    (>!! (:controlline p) "start"))
  (let [cancel (chan)]
    (go
      (<! cancelchan)
       (doseq [p phils]
         (>! (:controlline p) "stop")))
                cancel))

#_(>!! cancelchan "stop")





