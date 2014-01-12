// Compiled by ClojureScript 0.0-2030
goog.provide('clojureexamplesvince.prime');
goog.require('cljs.core');
goog.require('clojure.core.async');
goog.require('clojure.core.async');
goog.require('clojure.core.async');
clojureexamplesvince.prime.prime_QMARK_ = (function prime_QMARK_(n){if(cljs.core._EQ_.call(null,n,2))
{return true;
} else
{if((n <= 1))
{return false;
} else
{if(cljs.core.odd_QMARK_.call(null,n))
{return (cljs.core.count.call(null,cljs.core.filter.call(null,(function (p1__20781_SHARP_){return (cljs.core.mod.call(null,n,p1__20781_SHARP_) === 0);
}),cljs.core.range.call(null,3,n,2))) === 0);
} else
{if(new cljs.core.Keyword(null,"else","else",1017020587))
{return false;
} else
{return null;
}
}
}
}
});
clojureexamplesvince.prime.lazyPrimes = (function lazyPrimes(){return cljs.core.filter.call(null,clojureexamplesvince.prime.prime_QMARK_,cljs.core.iterate.call(null,cljs.core.inc,2));
});
clojureexamplesvince.prime.chan_iterate = (function chan_iterate(){var result = clojure.core.async.chan.call(null);clojure.core.async.go.call(null,(function (){var seq__20786 = cljs.core.seq.call(null,cljs.core.iterate.call(null,cljs.core.inc,2));var chunk__20787 = null;var count__20788 = 0;var i__20789 = 0;while(true){
if((i__20789 < count__20788))
{var element = cljs.core._nth.call(null,chunk__20787,i__20789);clojure.core.async._GT__BANG_.call(null,result,element);
{
var G__20790 = seq__20786;
var G__20791 = chunk__20787;
var G__20792 = count__20788;
var G__20793 = (i__20789 + 1);
seq__20786 = G__20790;
chunk__20787 = G__20791;
count__20788 = G__20792;
i__20789 = G__20793;
continue;
}
} else
{var temp__4092__auto__ = cljs.core.seq.call(null,seq__20786);if(temp__4092__auto__)
{var seq__20786__$1 = temp__4092__auto__;if(cljs.core.chunked_seq_QMARK_.call(null,seq__20786__$1))
{var c__3850__auto__ = cljs.core.chunk_first.call(null,seq__20786__$1);{
var G__20794 = cljs.core.chunk_rest.call(null,seq__20786__$1);
var G__20795 = c__3850__auto__;
var G__20796 = cljs.core.count.call(null,c__3850__auto__);
var G__20797 = 0;
seq__20786 = G__20794;
chunk__20787 = G__20795;
count__20788 = G__20796;
i__20789 = G__20797;
continue;
}
} else
{var element = cljs.core.first.call(null,seq__20786__$1);clojure.core.async._GT__BANG_.call(null,result,element);
{
var G__20798 = cljs.core.next.call(null,seq__20786__$1);
var G__20799 = null;
var G__20800 = 0;
var G__20801 = 0;
seq__20786 = G__20798;
chunk__20787 = G__20799;
count__20788 = G__20800;
i__20789 = G__20801;
continue;
}
}
} else
{return null;
}
}
break;
}
})());
return result;
});
clojureexamplesvince.prime.chan_primes = (function chan_primes(){return clojure.core.async.filter_LT_.call(null,clojureexamplesvince.prime.prime_QMARK_,clojureexamplesvince.prime.chan_iterate.call(null));
});
clojureexamplesvince.prime.c = clojureexamplesvince.prime.chan_primes.call(null);
clojure.core.async._LT__BANG__BANG_.call(null,clojureexamplesvince.prime.c);
