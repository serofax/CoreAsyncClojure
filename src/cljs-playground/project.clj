(defproject cljs-playground "0.1.0-SNAPSHOT"
  :description "FIXME: write description"
  :url "http://example.com/FIXME"
  :license {:name "Eclipse Public License"
            :url "http://www.eclipse.org/legal/epl-v10.html"}
  :dependencies [[org.clojure/clojure "1.5.1"]
                 [org.clojure/clojurescript "0.0-2014"]
                 [compojure "1.1.5"]
                 [jayq "2.4.0"]
                 [hiccup "1.0.4"]
                 [org.clojure/core.async "0.1.256.0-1bf8cf-alpha"]]

  :plugins [[lein-cljsbuild "1.0.1"]]
  :cljsbuild {:builds [{:source-paths ["src-cljs"]
                        :compiler {:output-to "resources/public/js/cljsbuild-main.js"
                                   :optimizations :whitespace
                                   :pretty-print true}}]})
