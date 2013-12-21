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


;finished
(defn fork[name]
  (let [rightphil (chan), leftphil (chan)]
    (go-loop [[value sourcephil] (alts! [rightphil leftphil])]
             #_(println name " -  is in use by" (:name value) "he sent" (:state value))
             (let [value2 (<! sourcephil)]
               #_(println name " -  is no more used by" (:name value2) "he sent" (:state value2)))
             (recur (alts! [rightphil leftphil])))
    {:rightphil rightphil, :leftphil leftphil}
    ))

;finished
(defn room[maxphils philslinks]
  (go-loop [philsinside #{}]
           (println "In room there are" (count philsinside) "philosophers")
           (let [observed (if (>= (count philsinside) maxphils)(vec philsinside) philslinks), [value source] (alts! observed)]
             (match (:state value)
                    :enters (recur (conj philsinside source))
                    :leaves (recur (disj philsinside source))))))

;finished
(defn phil[name, rightfork, leftfork]
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


#_(def cancelchan (let [fork0 (fork "fork0"),
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
      (<! cancel)
       (doseq [p phils]
         (>!! (:controlline p) "stop")))
                cancel)))

#_(>!! cancelchan "stop")





