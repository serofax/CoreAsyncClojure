// Compiled by ClojureScript 0.0-2030
goog.provide('examples.prime');
goog.require('cljs.core');
goog.require('cljs.core.async');
goog.require('cljs.core.async');
goog.require('cljs.core.async');
examples.prime.prime_QMARK_ = (function prime_QMARK_(n){if(cljs.core._EQ_.call(null,n,2))
{return true;
} else
{if((n <= 1))
{return false;
} else
{if(cljs.core.odd_QMARK_.call(null,n))
{return (cljs.core.count.call(null,cljs.core.filter.call(null,(function (p1__20802_SHARP_){return (cljs.core.mod.call(null,n,p1__20802_SHARP_) === 0);
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
examples.prime.lazyPrimes = (function lazyPrimes(){return cljs.core.filter.call(null,examples.prime.prime_QMARK_,cljs.core.iterate.call(null,cljs.core.inc,2));
});
examples.prime.chan_iterate = (function chan_iterate(){var result = cljs.core.async.chan.call(null);var c__5494__auto___20953 = cljs.core.async.chan.call(null,1);cljs.core.async.impl.dispatch.run.call(null,(function (){var f__5495__auto__ = (function (){var switch__5424__auto__ = (function (state_20922){var state_val_20923 = (state_20922[1]);if((state_val_20923 === 1))
{var inst_20882 = cljs.core.iterate.call(null,cljs.core.inc,2);var inst_20883 = cljs.core.seq.call(null,inst_20882);var inst_20884 = inst_20883;var inst_20885 = null;var inst_20886 = 0;var inst_20887 = 0;var state_20922__$1 = (function (){var statearr_20924 = state_20922;(statearr_20924[7] = inst_20884);
(statearr_20924[8] = inst_20885);
(statearr_20924[9] = inst_20886);
(statearr_20924[10] = inst_20887);
return statearr_20924;
})();var statearr_20925_20954 = state_20922__$1;(statearr_20925_20954[2] = null);
(statearr_20925_20954[1] = 2);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_20923 === 2))
{var inst_20886 = (state_20922[9]);var inst_20887 = (state_20922[10]);var inst_20889 = (inst_20887 < inst_20886);var inst_20890 = inst_20889;var state_20922__$1 = state_20922;if(cljs.core.truth_(inst_20890))
{var statearr_20926_20955 = state_20922__$1;(statearr_20926_20955[1] = 4);
} else
{var statearr_20927_20956 = state_20922__$1;(statearr_20927_20956[1] = 5);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_20923 === 3))
{var inst_20920 = (state_20922[2]);var state_20922__$1 = state_20922;return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_20922__$1,inst_20920);
} else
{if((state_val_20923 === 4))
{var inst_20885 = (state_20922[8]);var inst_20887 = (state_20922[10]);var inst_20892 = cljs.core._nth.call(null,inst_20885,inst_20887);var state_20922__$1 = state_20922;return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_20922__$1,7,result,inst_20892);
} else
{if((state_val_20923 === 5))
{var inst_20898 = (state_20922[11]);var inst_20884 = (state_20922[7]);var inst_20898__$1 = cljs.core.seq.call(null,inst_20884);var state_20922__$1 = (function (){var statearr_20931 = state_20922;(statearr_20931[11] = inst_20898__$1);
return statearr_20931;
})();if(inst_20898__$1)
{var statearr_20932_20957 = state_20922__$1;(statearr_20932_20957[1] = 8);
} else
{var statearr_20933_20958 = state_20922__$1;(statearr_20933_20958[1] = 9);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_20923 === 6))
{var inst_20918 = (state_20922[2]);var state_20922__$1 = state_20922;var statearr_20934_20959 = state_20922__$1;(statearr_20934_20959[2] = inst_20918);
(statearr_20934_20959[1] = 3);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_20923 === 7))
{var inst_20884 = (state_20922[7]);var inst_20885 = (state_20922[8]);var inst_20886 = (state_20922[9]);var inst_20887 = (state_20922[10]);var inst_20894 = (state_20922[2]);var inst_20895 = (inst_20887 + 1);var tmp20928 = inst_20884;var tmp20929 = inst_20885;var tmp20930 = inst_20886;var inst_20884__$1 = tmp20928;var inst_20885__$1 = tmp20929;var inst_20886__$1 = tmp20930;var inst_20887__$1 = inst_20895;var state_20922__$1 = (function (){var statearr_20935 = state_20922;(statearr_20935[7] = inst_20884__$1);
(statearr_20935[8] = inst_20885__$1);
(statearr_20935[9] = inst_20886__$1);
(statearr_20935[10] = inst_20887__$1);
(statearr_20935[12] = inst_20894);
return statearr_20935;
})();var statearr_20936_20960 = state_20922__$1;(statearr_20936_20960[2] = null);
(statearr_20936_20960[1] = 2);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_20923 === 8))
{var inst_20898 = (state_20922[11]);var inst_20900 = cljs.core.chunked_seq_QMARK_.call(null,inst_20898);var state_20922__$1 = state_20922;if(inst_20900)
{var statearr_20937_20961 = state_20922__$1;(statearr_20937_20961[1] = 11);
} else
{var statearr_20938_20962 = state_20922__$1;(statearr_20938_20962[1] = 12);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_20923 === 9))
{var state_20922__$1 = state_20922;var statearr_20939_20963 = state_20922__$1;(statearr_20939_20963[2] = null);
(statearr_20939_20963[1] = 10);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_20923 === 10))
{var inst_20916 = (state_20922[2]);var state_20922__$1 = state_20922;var statearr_20940_20964 = state_20922__$1;(statearr_20940_20964[2] = inst_20916);
(statearr_20940_20964[1] = 6);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_20923 === 11))
{var inst_20898 = (state_20922[11]);var inst_20902 = cljs.core.chunk_first.call(null,inst_20898);var inst_20903 = cljs.core.chunk_rest.call(null,inst_20898);var inst_20904 = cljs.core.count.call(null,inst_20902);var inst_20884 = inst_20903;var inst_20885 = inst_20902;var inst_20886 = inst_20904;var inst_20887 = 0;var state_20922__$1 = (function (){var statearr_20941 = state_20922;(statearr_20941[7] = inst_20884);
(statearr_20941[8] = inst_20885);
(statearr_20941[9] = inst_20886);
(statearr_20941[10] = inst_20887);
return statearr_20941;
})();var statearr_20942_20965 = state_20922__$1;(statearr_20942_20965[2] = null);
(statearr_20942_20965[1] = 2);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_20923 === 12))
{var inst_20898 = (state_20922[11]);var inst_20907 = cljs.core.first.call(null,inst_20898);var state_20922__$1 = state_20922;return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_20922__$1,14,result,inst_20907);
} else
{if((state_val_20923 === 13))
{var inst_20913 = (state_20922[2]);var state_20922__$1 = state_20922;var statearr_20943_20966 = state_20922__$1;(statearr_20943_20966[2] = inst_20913);
(statearr_20943_20966[1] = 10);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_20923 === 14))
{var inst_20898 = (state_20922[11]);var inst_20909 = (state_20922[2]);var inst_20910 = cljs.core.next.call(null,inst_20898);var inst_20884 = inst_20910;var inst_20885 = null;var inst_20886 = 0;var inst_20887 = 0;var state_20922__$1 = (function (){var statearr_20944 = state_20922;(statearr_20944[13] = inst_20909);
(statearr_20944[7] = inst_20884);
(statearr_20944[8] = inst_20885);
(statearr_20944[9] = inst_20886);
(statearr_20944[10] = inst_20887);
return statearr_20944;
})();var statearr_20945_20967 = state_20922__$1;(statearr_20945_20967[2] = null);
(statearr_20945_20967[1] = 2);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{return null;
}
}
}
}
}
}
}
}
}
}
}
}
}
}
});return ((function (switch__5424__auto__){
return (function() {
var state_machine__5425__auto__ = null;
var state_machine__5425__auto____0 = (function (){var statearr_20949 = (new Array(14));(statearr_20949[0] = state_machine__5425__auto__);
(statearr_20949[1] = 1);
return statearr_20949;
});
var state_machine__5425__auto____1 = (function (state_20922){while(true){
var ret_value__5426__auto__ = (function (){try{while(true){
var result__5427__auto__ = switch__5424__auto__.call(null,state_20922);if(cljs.core.keyword_identical_QMARK_.call(null,result__5427__auto__,new cljs.core.Keyword(null,"recur","recur",1122293407)))
{{
continue;
}
} else
{return result__5427__auto__;
}
break;
}
}catch (e20950){if((e20950 instanceof Object))
{var ex__5428__auto__ = e20950;var statearr_20951_20968 = state_20922;(statearr_20951_20968[5] = ex__5428__auto__);
cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_20922);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if(new cljs.core.Keyword(null,"else","else",1017020587))
{throw e20950;
} else
{return null;
}
}
}})();if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__5426__auto__,new cljs.core.Keyword(null,"recur","recur",1122293407)))
{{
var G__20969 = state_20922;
state_20922 = G__20969;
continue;
}
} else
{return ret_value__5426__auto__;
}
break;
}
});
state_machine__5425__auto__ = function(state_20922){
switch(arguments.length){
case 0:
return state_machine__5425__auto____0.call(this);
case 1:
return state_machine__5425__auto____1.call(this,state_20922);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
state_machine__5425__auto__.cljs$core$IFn$_invoke$arity$0 = state_machine__5425__auto____0;
state_machine__5425__auto__.cljs$core$IFn$_invoke$arity$1 = state_machine__5425__auto____1;
return state_machine__5425__auto__;
})()
;})(switch__5424__auto__))
})();var state__5496__auto__ = (function (){var statearr_20952 = f__5495__auto__.call(null);(statearr_20952[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__5494__auto___20953);
return statearr_20952;
})();return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__5496__auto__);
}));
return result;
});
examples.prime.chan_primes = (function chan_primes(){return cljs.core.async.filter_LT_.call(null,examples.prime.prime_QMARK_,examples.prime.chan_iterate.call(null));
});
