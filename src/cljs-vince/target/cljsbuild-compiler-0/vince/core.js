// Compiled by ClojureScript 0.0-2030
goog.provide('vince.core');
goog.require('cljs.core');
goog.require('examples.prime');
goog.require('hoare.utils');
goog.require('hoare.coroutines');
goog.require('cljs.core.async');
goog.require('examples.prime');
goog.require('hoare.coroutines');
goog.require('hoare.utils');
goog.require('cljs.core.async');
goog.require('cljs.core.async');
vince.core.testCopyWestEast = (function testCopyWestEast(){var west = cljs.core.async.chan.call(null);var east = cljs.core.async.chan.call(null);hoare.coroutines.copy.call(null,west,east);
hoare.utils.println_chan.call(null,east);
var c__5494__auto__ = cljs.core.async.chan.call(null,1);cljs.core.async.impl.dispatch.run.call(null,(function (){var f__5495__auto__ = (function (){var switch__5424__auto__ = (function (state_13797){var state_val_13798 = (state_13797[1]);if((state_val_13798 === 7))
{var inst_13795 = (state_13797[2]);var state_13797__$1 = state_13797;return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_13797__$1,inst_13795);
} else
{if((state_val_13798 === 6))
{var inst_13791 = (state_13797[2]);var inst_13792 = cljs.core.async.close_BANG_.call(null,west);var inst_13793 = cljs.core.async.timeout.call(null,1000);var state_13797__$1 = (function (){var statearr_13799 = state_13797;(statearr_13799[7] = inst_13791);
(statearr_13799[8] = inst_13792);
return statearr_13799;
})();return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_13797__$1,7,inst_13793);
} else
{if((state_val_13798 === 5))
{var inst_13789 = (state_13797[2]);var state_13797__$1 = (function (){var statearr_13800 = state_13797;(statearr_13800[9] = inst_13789);
return statearr_13800;
})();return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_13797__$1,6,west,"West");
} else
{if((state_val_13798 === 4))
{var inst_13786 = (state_13797[2]);var inst_13787 = cljs.core.async.timeout.call(null,1000);var state_13797__$1 = (function (){var statearr_13801 = state_13797;(statearr_13801[10] = inst_13786);
return statearr_13801;
})();return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_13797__$1,5,inst_13787);
} else
{if((state_val_13798 === 3))
{var inst_13784 = (state_13797[2]);var state_13797__$1 = (function (){var statearr_13802 = state_13797;(statearr_13802[11] = inst_13784);
return statearr_13802;
})();return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_13797__$1,4,west,"from");
} else
{if((state_val_13798 === 2))
{var inst_13781 = (state_13797[2]);var inst_13782 = cljs.core.async.timeout.call(null,1000);var state_13797__$1 = (function (){var statearr_13803 = state_13797;(statearr_13803[12] = inst_13781);
return statearr_13803;
})();return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_13797__$1,3,inst_13782);
} else
{if((state_val_13798 === 1))
{var state_13797__$1 = state_13797;return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_13797__$1,2,west,"Hallo");
} else
{return null;
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
var state_machine__5425__auto____0 = (function (){var statearr_13807 = (new Array(13));(statearr_13807[0] = state_machine__5425__auto__);
(statearr_13807[1] = 1);
return statearr_13807;
});
var state_machine__5425__auto____1 = (function (state_13797){while(true){
var ret_value__5426__auto__ = (function (){try{while(true){
var result__5427__auto__ = switch__5424__auto__.call(null,state_13797);if(cljs.core.keyword_identical_QMARK_.call(null,result__5427__auto__,new cljs.core.Keyword(null,"recur","recur",1122293407)))
{{
continue;
}
} else
{return result__5427__auto__;
}
break;
}
}catch (e13808){if((e13808 instanceof Object))
{var ex__5428__auto__ = e13808;var statearr_13809_13811 = state_13797;(statearr_13809_13811[5] = ex__5428__auto__);
cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_13797);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if(new cljs.core.Keyword(null,"else","else",1017020587))
{throw e13808;
} else
{return null;
}
}
}})();if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__5426__auto__,new cljs.core.Keyword(null,"recur","recur",1122293407)))
{{
var G__13812 = state_13797;
state_13797 = G__13812;
continue;
}
} else
{return ret_value__5426__auto__;
}
break;
}
});
state_machine__5425__auto__ = function(state_13797){
switch(arguments.length){
case 0:
return state_machine__5425__auto____0.call(this);
case 1:
return state_machine__5425__auto____1.call(this,state_13797);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
state_machine__5425__auto__.cljs$core$IFn$_invoke$arity$0 = state_machine__5425__auto____0;
state_machine__5425__auto__.cljs$core$IFn$_invoke$arity$1 = state_machine__5425__auto____1;
return state_machine__5425__auto__;
})()
;})(switch__5424__auto__))
})();var state__5496__auto__ = (function (){var statearr_13810 = f__5495__auto__.call(null);(statearr_13810[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__5494__auto__);
return statearr_13810;
})();return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__5496__auto__);
}));
return c__5494__auto__;
});
vince.core.testSquash = (function testSquash(){var source = cljs.core.async.chan.call(null);var out = hoare.coroutines.squash.call(null,source);hoare.utils.println_chan.call(null,out);
var c__5494__auto__ = cljs.core.async.chan.call(null,1);cljs.core.async.impl.dispatch.run.call(null,(function (){var f__5495__auto__ = (function (){var switch__5424__auto__ = (function (state_13903){var state_val_13904 = (state_13903[1]);if((state_val_13904 === 1))
{var state_13903__$1 = state_13903;return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_13903__$1,2,source,"*");
} else
{if((state_val_13904 === 2))
{var inst_13870 = (state_13903[2]);var inst_13871 = cljs.core.async.timeout.call(null,1000);var state_13903__$1 = (function (){var statearr_13905 = state_13903;(statearr_13905[7] = inst_13870);
return statearr_13905;
})();return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_13903__$1,3,inst_13871);
} else
{if((state_val_13904 === 3))
{var inst_13873 = (state_13903[2]);var state_13903__$1 = (function (){var statearr_13906 = state_13903;(statearr_13906[8] = inst_13873);
return statearr_13906;
})();return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_13903__$1,4,source,"*");
} else
{if((state_val_13904 === 4))
{var inst_13875 = (state_13903[2]);var inst_13876 = cljs.core.async.timeout.call(null,1000);var state_13903__$1 = (function (){var statearr_13907 = state_13903;(statearr_13907[9] = inst_13875);
return statearr_13907;
})();return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_13903__$1,5,inst_13876);
} else
{if((state_val_13904 === 5))
{var inst_13878 = (state_13903[2]);var state_13903__$1 = (function (){var statearr_13908 = state_13903;(statearr_13908[10] = inst_13878);
return statearr_13908;
})();return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_13903__$1,6,source,"H");
} else
{if((state_val_13904 === 6))
{var inst_13880 = (state_13903[2]);var state_13903__$1 = (function (){var statearr_13909 = state_13903;(statearr_13909[11] = inst_13880);
return statearr_13909;
})();return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_13903__$1,7,source,"e");
} else
{if((state_val_13904 === 7))
{var inst_13882 = (state_13903[2]);var state_13903__$1 = (function (){var statearr_13910 = state_13903;(statearr_13910[12] = inst_13882);
return statearr_13910;
})();return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_13903__$1,8,source,"l");
} else
{if((state_val_13904 === 8))
{var inst_13884 = (state_13903[2]);var state_13903__$1 = (function (){var statearr_13911 = state_13903;(statearr_13911[13] = inst_13884);
return statearr_13911;
})();return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_13903__$1,9,source,"l");
} else
{if((state_val_13904 === 9))
{var inst_13886 = (state_13903[2]);var state_13903__$1 = (function (){var statearr_13912 = state_13903;(statearr_13912[14] = inst_13886);
return statearr_13912;
})();return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_13903__$1,10,source,"o");
} else
{if((state_val_13904 === 10))
{var inst_13888 = (state_13903[2]);var state_13903__$1 = (function (){var statearr_13913 = state_13903;(statearr_13913[15] = inst_13888);
return statearr_13913;
})();return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_13903__$1,11,source,"*");
} else
{if((state_val_13904 === 11))
{var inst_13890 = (state_13903[2]);var inst_13891 = cljs.core.async.timeout.call(null,1000);var state_13903__$1 = (function (){var statearr_13914 = state_13903;(statearr_13914[16] = inst_13890);
return statearr_13914;
})();return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_13903__$1,12,inst_13891);
} else
{if((state_val_13904 === 12))
{var inst_13893 = (state_13903[2]);var state_13903__$1 = (function (){var statearr_13915 = state_13903;(statearr_13915[17] = inst_13893);
return statearr_13915;
})();return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_13903__$1,13,source,"2");
} else
{if((state_val_13904 === 13))
{var inst_13895 = (state_13903[2]);var state_13903__$1 = (function (){var statearr_13916 = state_13903;(statearr_13916[18] = inst_13895);
return statearr_13916;
})();return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_13903__$1,14,source,"*");
} else
{if((state_val_13904 === 14))
{var inst_13897 = (state_13903[2]);var inst_13898 = cljs.core.async.close_BANG_.call(null,source);var inst_13899 = cljs.core.async.timeout.call(null,1000);var state_13903__$1 = (function (){var statearr_13917 = state_13903;(statearr_13917[19] = inst_13898);
(statearr_13917[20] = inst_13897);
return statearr_13917;
})();return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_13903__$1,15,inst_13899);
} else
{if((state_val_13904 === 15))
{var inst_13901 = (state_13903[2]);var state_13903__$1 = state_13903;return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_13903__$1,inst_13901);
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
}
});return ((function (switch__5424__auto__){
return (function() {
var state_machine__5425__auto__ = null;
var state_machine__5425__auto____0 = (function (){var statearr_13921 = (new Array(21));(statearr_13921[0] = state_machine__5425__auto__);
(statearr_13921[1] = 1);
return statearr_13921;
});
var state_machine__5425__auto____1 = (function (state_13903){while(true){
var ret_value__5426__auto__ = (function (){try{while(true){
var result__5427__auto__ = switch__5424__auto__.call(null,state_13903);if(cljs.core.keyword_identical_QMARK_.call(null,result__5427__auto__,new cljs.core.Keyword(null,"recur","recur",1122293407)))
{{
continue;
}
} else
{return result__5427__auto__;
}
break;
}
}catch (e13922){if((e13922 instanceof Object))
{var ex__5428__auto__ = e13922;var statearr_13923_13925 = state_13903;(statearr_13923_13925[5] = ex__5428__auto__);
cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_13903);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if(new cljs.core.Keyword(null,"else","else",1017020587))
{throw e13922;
} else
{return null;
}
}
}})();if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__5426__auto__,new cljs.core.Keyword(null,"recur","recur",1122293407)))
{{
var G__13926 = state_13903;
state_13903 = G__13926;
continue;
}
} else
{return ret_value__5426__auto__;
}
break;
}
});
state_machine__5425__auto__ = function(state_13903){
switch(arguments.length){
case 0:
return state_machine__5425__auto____0.call(this);
case 1:
return state_machine__5425__auto____1.call(this,state_13903);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
state_machine__5425__auto__.cljs$core$IFn$_invoke$arity$0 = state_machine__5425__auto____0;
state_machine__5425__auto__.cljs$core$IFn$_invoke$arity$1 = state_machine__5425__auto____1;
return state_machine__5425__auto__;
})()
;})(switch__5424__auto__))
})();var state__5496__auto__ = (function (){var statearr_13924 = f__5495__auto__.call(null);(statearr_13924[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__5494__auto__);
return statearr_13924;
})();return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__5496__auto__);
}));
return c__5494__auto__;
});
vince.core.set_html_BANG_ = (function set_html_BANG_(obj,what){return obj.innerHTML = [cljs.core.str(obj.innerHTML),cljs.core.str(what),cljs.core.str("\n")].join('');
});
vince.core.by_id = (function by_id(id){return document.getElementById(cljs.core.name.call(null,id));
});
vince.core.printTA = (function printTA(ta,timeoutValue){var result = cljs.core.async.chan.call(null);var c__5494__auto___13999 = cljs.core.async.chan.call(null,1);cljs.core.async.impl.dispatch.run.call(null,(function (){var f__5495__auto__ = (function (){var switch__5424__auto__ = (function (state_13981){var state_val_13982 = (state_13981[1]);if((state_val_13982 === 8))
{var inst_13972 = (state_13981[2]);var inst_13965 = inst_13972;var state_13981__$1 = (function (){var statearr_13983 = state_13981;(statearr_13983[7] = inst_13965);
return statearr_13983;
})();var statearr_13984_14000 = state_13981__$1;(statearr_13984_14000[2] = null);
(statearr_13984_14000[1] = 3);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_13982 === 7))
{var inst_13977 = (state_13981[2]);var state_13981__$1 = state_13981;var statearr_13985_14001 = state_13981__$1;(statearr_13985_14001[2] = inst_13977);
(statearr_13985_14001[1] = 4);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_13982 === 6))
{var inst_13975 = vince.core.set_html_BANG_.call(null,ta,"Channel was closed");var state_13981__$1 = state_13981;var statearr_13986_14002 = state_13981__$1;(statearr_13986_14002[2] = inst_13975);
(statearr_13986_14002[1] = 7);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_13982 === 5))
{var inst_13965 = (state_13981[7]);var inst_13970 = vince.core.set_html_BANG_.call(null,ta,inst_13965);var state_13981__$1 = (function (){var statearr_13987 = state_13981;(statearr_13987[8] = inst_13970);
return statearr_13987;
})();return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_13981__$1,8,result);
} else
{if((state_val_13982 === 4))
{var inst_13979 = (state_13981[2]);var state_13981__$1 = state_13981;return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_13981__$1,inst_13979);
} else
{if((state_val_13982 === 3))
{var inst_13965 = (state_13981[7]);var inst_13967 = (inst_13965 == null);var inst_13968 = cljs.core.not.call(null,inst_13967);var state_13981__$1 = state_13981;if(inst_13968)
{var statearr_13988_14003 = state_13981__$1;(statearr_13988_14003[1] = 5);
} else
{var statearr_13989_14004 = state_13981__$1;(statearr_13989_14004[1] = 6);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_13982 === 2))
{var inst_13964 = (state_13981[2]);var inst_13965 = inst_13964;var state_13981__$1 = (function (){var statearr_13990 = state_13981;(statearr_13990[7] = inst_13965);
return statearr_13990;
})();var statearr_13991_14005 = state_13981__$1;(statearr_13991_14005[2] = null);
(statearr_13991_14005[1] = 3);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_13982 === 1))
{var state_13981__$1 = state_13981;return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_13981__$1,2,result);
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
});return ((function (switch__5424__auto__){
return (function() {
var state_machine__5425__auto__ = null;
var state_machine__5425__auto____0 = (function (){var statearr_13995 = (new Array(9));(statearr_13995[0] = state_machine__5425__auto__);
(statearr_13995[1] = 1);
return statearr_13995;
});
var state_machine__5425__auto____1 = (function (state_13981){while(true){
var ret_value__5426__auto__ = (function (){try{while(true){
var result__5427__auto__ = switch__5424__auto__.call(null,state_13981);if(cljs.core.keyword_identical_QMARK_.call(null,result__5427__auto__,new cljs.core.Keyword(null,"recur","recur",1122293407)))
{{
continue;
}
} else
{return result__5427__auto__;
}
break;
}
}catch (e13996){if((e13996 instanceof Object))
{var ex__5428__auto__ = e13996;var statearr_13997_14006 = state_13981;(statearr_13997_14006[5] = ex__5428__auto__);
cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_13981);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if(new cljs.core.Keyword(null,"else","else",1017020587))
{throw e13996;
} else
{return null;
}
}
}})();if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__5426__auto__,new cljs.core.Keyword(null,"recur","recur",1122293407)))
{{
var G__14007 = state_13981;
state_13981 = G__14007;
continue;
}
} else
{return ret_value__5426__auto__;
}
break;
}
});
state_machine__5425__auto__ = function(state_13981){
switch(arguments.length){
case 0:
return state_machine__5425__auto____0.call(this);
case 1:
return state_machine__5425__auto____1.call(this,state_13981);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
state_machine__5425__auto__.cljs$core$IFn$_invoke$arity$0 = state_machine__5425__auto____0;
state_machine__5425__auto__.cljs$core$IFn$_invoke$arity$1 = state_machine__5425__auto____1;
return state_machine__5425__auto__;
})()
;})(switch__5424__auto__))
})();var state__5496__auto__ = (function (){var statearr_13998 = f__5495__auto__.call(null);(statearr_13998[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__5494__auto___13999);
return statearr_13998;
})();return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__5496__auto__);
}));
return result;
});
vince.core.primeToTA = (function primeToTA(taChan,primeChan){var c__5494__auto__ = cljs.core.async.chan.call(null,1);cljs.core.async.impl.dispatch.run.call(null,(function (){var f__5495__auto__ = (function (){var switch__5424__auto__ = (function (state_14062){var state_val_14063 = (state_14062[1]);if((state_val_14063 === 8))
{var inst_14046 = (state_14062[7]);var inst_14051 = (state_14062[2]);var inst_14052 = (inst_14046 + 1);var inst_14046__$1 = inst_14052;var state_14062__$1 = (function (){var statearr_14064 = state_14062;(statearr_14064[7] = inst_14046__$1);
(statearr_14064[8] = inst_14051);
return statearr_14064;
})();var statearr_14065_14080 = state_14062__$1;(statearr_14065_14080[2] = null);
(statearr_14065_14080[1] = 3);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_14063 === 7))
{var inst_14056 = (state_14062[2]);var state_14062__$1 = state_14062;var statearr_14066_14081 = state_14062__$1;(statearr_14066_14081[2] = inst_14056);
(statearr_14066_14081[1] = 4);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_14063 === 6))
{var state_14062__$1 = state_14062;var statearr_14067_14082 = state_14062__$1;(statearr_14067_14082[2] = null);
(statearr_14067_14082[1] = 7);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_14063 === 5))
{var state_14062__$1 = state_14062;return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_14062__$1,8,primeChan);
} else
{if((state_val_14063 === 4))
{var inst_14058 = (state_14062[2]);var inst_14059 = cljs.core.async.take.call(null,1000,primeChan);var inst_14060 = cljs.core.async.pipe.call(null,inst_14059,taChan);var state_14062__$1 = (function (){var statearr_14068 = state_14062;(statearr_14068[9] = inst_14058);
return statearr_14068;
})();return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_14062__$1,inst_14060);
} else
{if((state_val_14063 === 3))
{var inst_14046 = (state_14062[7]);var inst_14048 = (inst_14046 < 1000);var state_14062__$1 = state_14062;if(cljs.core.truth_(inst_14048))
{var statearr_14069_14083 = state_14062__$1;(statearr_14069_14083[1] = 5);
} else
{var statearr_14070_14084 = state_14062__$1;(statearr_14070_14084[1] = 6);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_14063 === 2))
{var inst_14045 = (state_14062[2]);var inst_14046 = 0;var state_14062__$1 = (function (){var statearr_14071 = state_14062;(statearr_14071[7] = inst_14046);
(statearr_14071[10] = inst_14045);
return statearr_14071;
})();var statearr_14072_14085 = state_14062__$1;(statearr_14072_14085[2] = null);
(statearr_14072_14085[1] = 3);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_14063 === 1))
{var state_14062__$1 = state_14062;return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_14062__$1,2,taChan,"Ignore the first 1000 primes");
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
});return ((function (switch__5424__auto__){
return (function() {
var state_machine__5425__auto__ = null;
var state_machine__5425__auto____0 = (function (){var statearr_14076 = (new Array(11));(statearr_14076[0] = state_machine__5425__auto__);
(statearr_14076[1] = 1);
return statearr_14076;
});
var state_machine__5425__auto____1 = (function (state_14062){while(true){
var ret_value__5426__auto__ = (function (){try{while(true){
var result__5427__auto__ = switch__5424__auto__.call(null,state_14062);if(cljs.core.keyword_identical_QMARK_.call(null,result__5427__auto__,new cljs.core.Keyword(null,"recur","recur",1122293407)))
{{
continue;
}
} else
{return result__5427__auto__;
}
break;
}
}catch (e14077){if((e14077 instanceof Object))
{var ex__5428__auto__ = e14077;var statearr_14078_14086 = state_14062;(statearr_14078_14086[5] = ex__5428__auto__);
cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_14062);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if(new cljs.core.Keyword(null,"else","else",1017020587))
{throw e14077;
} else
{return null;
}
}
}})();if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__5426__auto__,new cljs.core.Keyword(null,"recur","recur",1122293407)))
{{
var G__14087 = state_14062;
state_14062 = G__14087;
continue;
}
} else
{return ret_value__5426__auto__;
}
break;
}
});
state_machine__5425__auto__ = function(state_14062){
switch(arguments.length){
case 0:
return state_machine__5425__auto____0.call(this);
case 1:
return state_machine__5425__auto____1.call(this,state_14062);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
state_machine__5425__auto__.cljs$core$IFn$_invoke$arity$0 = state_machine__5425__auto____0;
state_machine__5425__auto__.cljs$core$IFn$_invoke$arity$1 = state_machine__5425__auto____1;
return state_machine__5425__auto__;
})()
;})(switch__5424__auto__))
})();var state__5496__auto__ = (function (){var statearr_14079 = f__5495__auto__.call(null);(statearr_14079[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__5494__auto__);
return statearr_14079;
})();return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__5496__auto__);
}));
return c__5494__auto__;
});
vince.core.testPrime2 = (function testPrime2(){var prime1 = vince.core.printTA.call(null,vince.core.by_id.call(null,"prime1"),1);var prime1_chan = examples.prime.chan_primes.call(null);var prime2 = vince.core.printTA.call(null,vince.core.by_id.call(null,"prime2"),1);var prime2_chan = examples.prime.chan_primes.call(null);var prime3 = vince.core.printTA.call(null,vince.core.by_id.call(null,"prime3"),1);var prime3_chan = examples.prime.chan_primes.call(null);var prime4 = vince.core.printTA.call(null,vince.core.by_id.call(null,"prime4"),1);var prime4_chan = examples.prime.chan_primes.call(null);vince.core.primeToTA.call(null,prime1,prime1_chan);
vince.core.primeToTA.call(null,prime2,prime2_chan);
vince.core.primeToTA.call(null,prime3,prime3_chan);
return vince.core.primeToTA.call(null,prime4,prime4_chan);
});
