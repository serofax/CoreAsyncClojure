(ns cljs-playground.core)

(let [div (.getElementById js/document "output")]
  (set!
    (.-innerHTML div)
    "Hello World!"))