(ns cljs-playground.utils)

(defn log[s]
  (let [div (.getElementById js/document "output")]
    (.appendChild div
      (.createTextNode js/document s))
    (.appendChild div
      (.createElement js/document "br"))))