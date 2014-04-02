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
vince.core.printTA = (function printTA(ta,timeoutValue){var result = cljs.core.async.chan.call(null);var c__5494__auto___14007 = cljs.core.async.chan.call(null,1);cljs.core.async.impl.dispatch.run.call(null,(function (){var f__5495__auto__ = (function (){var switch__5424__auto__ = (function (state_13988){var state_val_13989 = (state_13988[1]);if((state_val_13989 === 9))
{var inst_13979 = (state_13988[2]);var inst_13969 = inst_13979;var state_13988__$1 = (function (){var statearr_13990 = state_13988;(statearr_13990[7] = inst_13969);
return statearr_13990;
})();var statearr_13991_14008 = state_13988__$1;(statearr_13991_14008[2] = null);
(statearr_13991_14008[1] = 3);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_13989 === 8))
{var inst_13977 = (state_13988[2]);var state_13988__$1 = (function (){var statearr_13992 = state_13988;(statearr_13992[8] = inst_13977);
return statearr_13992;
})();return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_13988__$1,9,result);
} else
{if((state_val_13989 === 7))
{var inst_13984 = (state_13988[2]);var state_13988__$1 = state_13988;var statearr_13993_14009 = state_13988__$1;(statearr_13993_14009[2] = inst_13984);
(statearr_13993_14009[1] = 4);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_13989 === 6))
{var inst_13982 = vince.core.set_html_BANG_.call(null,ta,"Channel was closed");var state_13988__$1 = state_13988;var statearr_13994_14010 = state_13988__$1;(statearr_13994_14010[2] = inst_13982);
(statearr_13994_14010[1] = 7);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_13989 === 5))
{var inst_13969 = (state_13988[7]);var inst_13974 = vince.core.set_html_BANG_.call(null,ta,inst_13969);var inst_13975 = cljs.core.async.timeout.call(null,timeoutValue);var state_13988__$1 = (function (){var statearr_13995 = state_13988;(statearr_13995[9] = inst_13974);
return statearr_13995;
})();return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_13988__$1,8,inst_13975);
} else
{if((state_val_13989 === 4))
{var inst_13986 = (state_13988[2]);var state_13988__$1 = state_13988;return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_13988__$1,inst_13986);
} else
{if((state_val_13989 === 3))
{var inst_13969 = (state_13988[7]);var inst_13971 = (inst_13969 == null);var inst_13972 = cljs.core.not.call(null,inst_13971);var state_13988__$1 = state_13988;if(inst_13972)
{var statearr_13996_14011 = state_13988__$1;(statearr_13996_14011[1] = 5);
} else
{var statearr_13997_14012 = state_13988__$1;(statearr_13997_14012[1] = 6);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_13989 === 2))
{var inst_13968 = (state_13988[2]);var inst_13969 = inst_13968;var state_13988__$1 = (function (){var statearr_13998 = state_13988;(statearr_13998[7] = inst_13969);
return statearr_13998;
})();var statearr_13999_14013 = state_13988__$1;(statearr_13999_14013[2] = null);
(statearr_13999_14013[1] = 3);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_13989 === 1))
{var state_13988__$1 = state_13988;return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_13988__$1,2,result);
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
});return ((function (switch__5424__auto__){
return (function() {
var state_machine__5425__auto__ = null;
var state_machine__5425__auto____0 = (function (){var statearr_14003 = (new Array(10));(statearr_14003[0] = state_machine__5425__auto__);
(statearr_14003[1] = 1);
return statearr_14003;
});
var state_machine__5425__auto____1 = (function (state_13988){while(true){
var ret_value__5426__auto__ = (function (){try{while(true){
var result__5427__auto__ = switch__5424__auto__.call(null,state_13988);if(cljs.core.keyword_identical_QMARK_.call(null,result__5427__auto__,new cljs.core.Keyword(null,"recur","recur",1122293407)))
{{
continue;
}
} else
{return result__5427__auto__;
}
break;
}
}catch (e14004){if((e14004 instanceof Object))
{var ex__5428__auto__ = e14004;var statearr_14005_14014 = state_13988;(statearr_14005_14014[5] = ex__5428__auto__);
cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_13988);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if(new cljs.core.Keyword(null,"else","else",1017020587))
{throw e14004;
} else
{return null;
}
}
}})();if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__5426__auto__,new cljs.core.Keyword(null,"recur","recur",1122293407)))
{{
var G__14015 = state_13988;
state_13988 = G__14015;
continue;
}
} else
{return ret_value__5426__auto__;
}
break;
}
});
state_machine__5425__auto__ = function(state_13988){
switch(arguments.length){
case 0:
return state_machine__5425__auto____0.call(this);
case 1:
return state_machine__5425__auto____1.call(this,state_13988);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
state_machine__5425__auto__.cljs$core$IFn$_invoke$arity$0 = state_machine__5425__auto____0;
state_machine__5425__auto__.cljs$core$IFn$_invoke$arity$1 = state_machine__5425__auto____1;
return state_machine__5425__auto__;
})()
;})(switch__5424__auto__))
})();var state__5496__auto__ = (function (){var statearr_14006 = f__5495__auto__.call(null);(statearr_14006[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__5494__auto___14007);
return statearr_14006;
})();return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__5496__auto__);
}));
return result;
});
vince.core.primeToTA = (function primeToTA(taChan,primeChan){var c__5494__auto__ = cljs.core.async.chan.call(null,1);cljs.core.async.impl.dispatch.run.call(null,(function (){var f__5495__auto__ = (function (){var switch__5424__auto__ = (function (state_14070){var state_val_14071 = (state_14070[1]);if((state_val_14071 === 8))
{var inst_14054 = (state_14070[7]);var inst_14059 = (state_14070[2]);var inst_14060 = (inst_14054 + 1);var inst_14054__$1 = inst_14060;var state_14070__$1 = (function (){var statearr_14072 = state_14070;(statearr_14072[8] = inst_14059);
(statearr_14072[7] = inst_14054__$1);
return statearr_14072;
})();var statearr_14073_14088 = state_14070__$1;(statearr_14073_14088[2] = null);
(statearr_14073_14088[1] = 3);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_14071 === 7))
{var inst_14064 = (state_14070[2]);var state_14070__$1 = state_14070;var statearr_14074_14089 = state_14070__$1;(statearr_14074_14089[2] = inst_14064);
(statearr_14074_14089[1] = 4);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_14071 === 6))
{var state_14070__$1 = state_14070;var statearr_14075_14090 = state_14070__$1;(statearr_14075_14090[2] = null);
(statearr_14075_14090[1] = 7);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_14071 === 5))
{var state_14070__$1 = state_14070;return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_14070__$1,8,primeChan);
} else
{if((state_val_14071 === 4))
{var inst_14066 = (state_14070[2]);var inst_14067 = cljs.core.async.take.call(null,1000,primeChan);var inst_14068 = cljs.core.async.pipe.call(null,inst_14067,taChan);var state_14070__$1 = (function (){var statearr_14076 = state_14070;(statearr_14076[9] = inst_14066);
return statearr_14076;
})();return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_14070__$1,inst_14068);
} else
{if((state_val_14071 === 3))
{var inst_14054 = (state_14070[7]);var inst_14056 = (inst_14054 < 1000);var state_14070__$1 = state_14070;if(cljs.core.truth_(inst_14056))
{var statearr_14077_14091 = state_14070__$1;(statearr_14077_14091[1] = 5);
} else
{var statearr_14078_14092 = state_14070__$1;(statearr_14078_14092[1] = 6);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_14071 === 2))
{var inst_14053 = (state_14070[2]);var inst_14054 = 0;var state_14070__$1 = (function (){var statearr_14079 = state_14070;(statearr_14079[7] = inst_14054);
(statearr_14079[10] = inst_14053);
return statearr_14079;
})();var statearr_14080_14093 = state_14070__$1;(statearr_14080_14093[2] = null);
(statearr_14080_14093[1] = 3);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_14071 === 1))
{var state_14070__$1 = state_14070;return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_14070__$1,2,taChan,"Ignore the first 1000 primes");
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
var state_machine__5425__auto____0 = (function (){var statearr_14084 = (new Array(11));(statearr_14084[0] = state_machine__5425__auto__);
(statearr_14084[1] = 1);
return statearr_14084;
});
var state_machine__5425__auto____1 = (function (state_14070){while(true){
var ret_value__5426__auto__ = (function (){try{while(true){
var result__5427__auto__ = switch__5424__auto__.call(null,state_14070);if(cljs.core.keyword_identical_QMARK_.call(null,result__5427__auto__,new cljs.core.Keyword(null,"recur","recur",1122293407)))
{{
continue;
}
} else
{return result__5427__auto__;
}
break;
}
}catch (e14085){if((e14085 instanceof Object))
{var ex__5428__auto__ = e14085;var statearr_14086_14094 = state_14070;(statearr_14086_14094[5] = ex__5428__auto__);
cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_14070);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if(new cljs.core.Keyword(null,"else","else",1017020587))
{throw e14085;
} else
{return null;
}
}
}})();if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__5426__auto__,new cljs.core.Keyword(null,"recur","recur",1122293407)))
{{
var G__14095 = state_14070;
state_14070 = G__14095;
continue;
}
} else
{return ret_value__5426__auto__;
}
break;
}
});
state_machine__5425__auto__ = function(state_14070){
switch(arguments.length){
case 0:
return state_machine__5425__auto____0.call(this);
case 1:
return state_machine__5425__auto____1.call(this,state_14070);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
state_machine__5425__auto__.cljs$core$IFn$_invoke$arity$0 = state_machine__5425__auto____0;
state_machine__5425__auto__.cljs$core$IFn$_invoke$arity$1 = state_machine__5425__auto____1;
return state_machine__5425__auto__;
})()
;})(switch__5424__auto__))
})();var state__5496__auto__ = (function (){var statearr_14087 = f__5495__auto__.call(null);(statearr_14087[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__5494__auto__);
return statearr_14087;
})();return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__5496__auto__);
}));
return c__5494__auto__;
});
vince.core.testPrime2 = (function testPrime2(){var prime1 = vince.core.printTA.call(null,vince.core.by_id.call(null,"prime1"),1);var prime1_chan = examples.prime.chan_primes.call(null);var prime2 = vince.core.printTA.call(null,vince.core.by_id.call(null,"prime2"),1);var prime2_chan = examples.prime.chan_primes.call(null);var prime3 = vince.core.printTA.call(null,vince.core.by_id.call(null,"prime3"),1);var prime3_chan = examples.prime.chan_primes.call(null);var prime4 = vince.core.printTA.call(null,vince.core.by_id.call(null,"prime4"),1);var prime4_chan = examples.prime.chan_primes.call(null);vince.core.primeToTA.call(null,prime1,prime1_chan);
vince.core.primeToTA.call(null,prime2,prime2_chan);
vince.core.primeToTA.call(null,prime3,prime3_chan);
return vince.core.primeToTA.call(null,prime4,prime4_chan);
});
