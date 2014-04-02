(ns clojureexamplesvince.uiexamples
  (:require [clojure.core.async :as async :refer [<! <!! >!! >! chan close! timeout put! go alt! alts! filter<]])
  (:import (javax.swing JFrame JButton)
           (java.awt FlowLayout)
           (java.awt.event ActionListener ActionEvent)))

stop

;(set! *warn-on-reflection* true)

(defn actionperformed-chan [component]
  "Creates a actionlistener which puts events on a channel and bound the created actionlistener to a component."
  (let [result (chan),
        action (proxy [ActionListener][]
                 (actionPerformed [event]
                                  (put! result event)))]
    (.addActionListener component action)
    result))


;Creates a jframe and button and use a channel to display clickevent
(let [frame (new JFrame "Hello frame"),
      button (new JButton "button")]
  (.setBounds frame 400 400 400 400)
  (.setDefaultCloseOperation frame (JFrame/DISPOSE_ON_CLOSE))
  (.add frame button)
  (go
   (let [eventchan (actionperformed-chan button)]
     (while true
       (println "click:" (<! eventchan)))))
  (.setVisible frame true))



;Similar like the example before. Now we have to buttons and we are listening with alts on events.

#_(let [frame (new JFrame "Hello frame"),
      button1 (new JButton "button 1"),
      button2 (new JButton "button 2")]
  (.setBounds frame 400 400 400 400)
  (.setDefaultCloseOperation frame (JFrame/DISPOSE_ON_CLOSE))
  (.setLayout frame (new FlowLayout))
  (.add frame button1)
  (.add frame button2)
  (go
   (let [eventchan1 (actionperformed-chan button1)
         eventchan2 (actionperformed-chan button2)]
     (while true
       (let [[value sourcechannel] (alts! [eventchan1 eventchan2])]
         (println "click from channel:" sourcechannel (.getText (.getSource value)))))))
  (.setVisible frame true))



;Now with alt!.

#_(let [frame (new JFrame "Hello frame"),
      button1 (new JButton "button 1"),
      button2 (new JButton "button 2")]
  (.setBounds frame 400 400 400 400)
  (.setDefaultCloseOperation frame (JFrame/DISPOSE_ON_CLOSE))
  (.setLayout frame (new FlowLayout))
  (.add frame button1)
  (.add frame button2)
  (go
   (let [eventchan1 (actionperformed-chan button1)
         eventchan2 (actionperformed-chan button2)]
     (while true
       (alt!
        eventchan1 ([value] (println "Button 1 pressed"))
        eventchan2 ([value] (println "Button 2 pressed"))))))
  (.setVisible frame true))

;Now with a timeout

#_(let [frame (new JFrame "Hello frame"),
      button1 (new JButton "button 1"),
      button2 (new JButton "button 2")]
  (.setBounds frame 400 400 400 400)
  (.setDefaultCloseOperation frame (JFrame/DISPOSE_ON_CLOSE))
  #_(.setDefaultCloseOperation frame (JFrame/EXIT_ON_CLOSE))
  (.setLayout frame (new FlowLayout))
  (.add frame button1)
  (.add frame button2)
  (go
   (let [eventchan1 (actionperformed-chan button1)
         eventchan2 (actionperformed-chan button2)]
     (dotimes [_ 5]
       (alt!
        eventchan1 ([value] (println "Button 1 pressed"))
        eventchan2 ([value] (println "Button 2 pressed"))
        (timeout 2000) ([_] (println "you are so slow"))))))
  (.setVisible frame true))

#_(let [frame (new JFrame "Hello frame"),
      button1 (new JButton "button 1"),
      button2 (new JButton "button 2")]
  (.setBounds frame 400 400 400 400)
  (.setDefaultCloseOperation frame (JFrame/DISPOSE_ON_CLOSE))
  #_(.setDefaultCloseOperation frame (JFrame/EXIT_ON_CLOSE))
  (.setLayout frame (new FlowLayout))
  (.add frame button1)
  (.add frame button2)
  (go
   (let [eventchan1 (actionperformed-chan button1)
         eventchan2 (actionperformed-chan button2)]
     (dotimes [_ 5]
       (alt!
        eventchan1 ([value] (println "Button 1 pressed"))
        eventchan2 ([value] (println "Button 2 pressed"))
        (timeout 2000) ([_] (println "you are so slow"))))))
  (.setVisible frame true))


;Now we want to be notified from button 1 only if ctrl is pressed

(defn onlyIfCtrlIsPressed [in]
  (filter< #(= (bit-and (.getModifiers %) (ActionEvent/CTRL_MASK)) (ActionEvent/CTRL_MASK)) in))

(let [frame (new JFrame "Hello frame"),
      button1 (new JButton "button 1"),
      button2 (new JButton "button 2")]
  (.setBounds frame 400 400 400 400)
  (.setDefaultCloseOperation frame (JFrame/DISPOSE_ON_CLOSE))
  #_(.setDefaultCloseOperation frame (JFrame/EXIT_ON_CLOSE))
  (.setLayout frame (new FlowLayout))
  (.add frame button1)
  (.add frame button2)
  (go
   (let [eventchan1 (onlyIfCtrlIsPressed(actionperformed-chan button1))
         eventchan2 (actionperformed-chan button2)]
     (while true
       (alt!
        eventchan1 ([value] (println "Button 1 + CTRL pressed"))
        eventchan2 ([value] (println "Button 2 pressed"))))))
  (.setVisible frame true))

