This is a copy of the gitrepository [CSPHoareExamplesCoreAsync](https://github.com/serofax/CSPHoareExamplesCoreAsync) copied on 02. April 2014

# CSP - Hoares examples with core.async

## Introduction
1978 Tony Hoare published a paper with the title Communication Sequential Processes.
In this paper he introduced a model or algebra to describe processes and the communication between them.

This little project is just an incomplete collection of  implementation of the examples which Hoare mentioned in this paper.

[Clojure](https://github.com/clojure/clojure) and the library [core.async](https://github.com/clojure/core.async) were used to implement the examples.

Well, after I already implemented most of the examples, I found the repository [async-plgd](https://github.com/nodename/async-plgd) of Alan Shaw which is similar to this one. I was very surprised how different or similar both implementation are. So feel free to compare both by your own.

## Content

### coroutines.clj
Contains all coroutines of chapter 3.

### subroutines.clj
Contains only the devider-example (4.1) and the factorial-example (4.2).

### semaphore.clj
Contains the integer-semaphore of chapter 5.2.

### philosophers.clj
Contains the dining philosophers example of chapter 5.3.

## Usage

1. clone the repository
2. run lein deps
3. start your Clojure REPL and execute the code

## License

Distributed under the Eclipse Public License version 1.0
