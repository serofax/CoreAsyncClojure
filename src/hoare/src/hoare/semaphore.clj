(ns hoare.semaphore
  (:require [clojure.core.async :as async :refer [<! <!! >!! >! chan close! timeout put! take! go alt! alts! filter< go-loop to-chan]]
            [hoare.utils :refer :all]
            [clojure.core.match :refer [match]]))

;To implement an integer semaphore, S, shared
;among an array X(i:I..100) of client processes. Each
;process may increment the semaphore by S!V() or
;decrement it by S!P(), but the latter command must be
;delayed if the value of the semaphore is not positive.


(defn semaphore [users ressourcesArr]
  (go-loop[usersInQueue #{},
          freeRessources ressourcesArr,
          usedRessources {}]
          (println (count usedRessources) "ressources are in use;" (count freeRessources) "ressources are not in use;" (count usersInQueue) "users are in queue")
          (let [[value user] (alts! users)]
            (match value
                  :AQUIRE (if-not (empty? freeRessources)
                            (do
                              (>! user (first freeRessources))
                              (recur usersInQueue (rest freeRessources) (assoc usedRessources user (first freeRessources) )))
                            (recur (conj usersInQueue user) freeRessources usedRessources))
                  :RELEASE (if-not (empty? usersInQueue)
                             (do
                               #_(println "!RELEASE! VALUE:"  (get usedRessources user))
                               (>! (first usersInQueue) (get usedRessources user))
                               (recur (rest usersInQueue) freeRessources (assoc (dissoc usedRessources user) (first usersInQueue) (get usedRessources user) )))
                             (recur usersInQueue (conj freeRessources (get usedRessources user)) (dissoc usedRessources user)))



                  )

           )
          )

  )

(def controlline (chan 1000))

#_(let [myUsers (repeatedly 100 chan)
      ress (vec (take 20 (iterate inc 1)))
      sema (semaphore myUsers ress)]
  #_(<!! (timeout 1000))
  (doseq [[user i] (map vector myUsers (range 0 (count myUsers)))]

    (go-loop []
             (>! user :AQUIRE)
             (println "user" i "wants a ressource")
             (let [ress (<! user)]
               (println "user" i "aquired ressource" ress)
               (<! (timeout (rand-int 10000)))
               (println "user" i "wants to release ressource" ress)
               (>! user :RELEASE))
             (alt!
              controlline ([_](println i "- stop received"))
              (timeout 1) ([_](recur))))))


#_(doseq [i (range 0 100)]
  (>!! controlline "stop"))

;(vec (take 5 (iterate inc 1)))