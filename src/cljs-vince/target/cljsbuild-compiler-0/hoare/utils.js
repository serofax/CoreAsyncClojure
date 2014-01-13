// Compiled by ClojureScript 0.0-2030
goog.provide('hoare.utils');
goog.require('cljs.core');
goog.require('cljs.core.async');
goog.require('cljs.core.async');
goog.require('cljs.core.async');
hoare.utils.println_chan = (function println_chan(source){var c__5494__auto__ = cljs.core.async.chan.call(null,1);cljs.core.async.impl.dispatch.run.call(null,(function (){var f__5495__auto__ = (function (){var switch__5424__auto__ = (function (state_16130){var state_val_16131 = (state_16130[1]);if((state_val_16131 === 8))
{var inst_16121 = (state_16130[2]);var inst_16114 = inst_16121;var state_16130__$1 = (function (){var statearr_16132 = state_16130;(statearr_16132[7] = inst_16114);
return statearr_16132;
})();var statearr_16133_16148 = state_16130__$1;(statearr_16133_16148[2] = null);
(statearr_16133_16148[1] = 3);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_16131 === 7))
{var inst_16126 = (state_16130[2]);var state_16130__$1 = state_16130;var statearr_16134_16149 = state_16130__$1;(statearr_16134_16149[2] = inst_16126);
(statearr_16134_16149[1] = 4);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_16131 === 6))
{var inst_16124 = console.log("Channel was closed");var state_16130__$1 = state_16130;var statearr_16135_16150 = state_16130__$1;(statearr_16135_16150[2] = inst_16124);
(statearr_16135_16150[1] = 7);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_16131 === 5))
{var inst_16114 = (state_16130[7]);var inst_16119 = console.log(inst_16114);var state_16130__$1 = (function (){var statearr_16136 = state_16130;(statearr_16136[8] = inst_16119);
return statearr_16136;
})();return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_16130__$1,8,source);
} else
{if((state_val_16131 === 4))
{var inst_16128 = (state_16130[2]);var state_16130__$1 = state_16130;return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_16130__$1,inst_16128);
} else
{if((state_val_16131 === 3))
{var inst_16114 = (state_16130[7]);var inst_16116 = (inst_16114 == null);var inst_16117 = cljs.core.not.call(null,inst_16116);var state_16130__$1 = state_16130;if(inst_16117)
{var statearr_16137_16151 = state_16130__$1;(statearr_16137_16151[1] = 5);
} else
{var statearr_16138_16152 = state_16130__$1;(statearr_16138_16152[1] = 6);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_16131 === 2))
{var inst_16113 = (state_16130[2]);var inst_16114 = inst_16113;var state_16130__$1 = (function (){var statearr_16139 = state_16130;(statearr_16139[7] = inst_16114);
return statearr_16139;
})();var statearr_16140_16153 = state_16130__$1;(statearr_16140_16153[2] = null);
(statearr_16140_16153[1] = 3);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_16131 === 1))
{var state_16130__$1 = state_16130;return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_16130__$1,2,source);
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
var state_machine__5425__auto____0 = (function (){var statearr_16144 = (new Array(9));(statearr_16144[0] = state_machine__5425__auto__);
(statearr_16144[1] = 1);
return statearr_16144;
});
var state_machine__5425__auto____1 = (function (state_16130){while(true){
var ret_value__5426__auto__ = (function (){try{while(true){
var result__5427__auto__ = switch__5424__auto__.call(null,state_16130);if(cljs.core.keyword_identical_QMARK_.call(null,result__5427__auto__,new cljs.core.Keyword(null,"recur","recur",1122293407)))
{{
continue;
}
} else
{return result__5427__auto__;
}
break;
}
}catch (e16145){if((e16145 instanceof Object))
{var ex__5428__auto__ = e16145;var statearr_16146_16154 = state_16130;(statearr_16146_16154[5] = ex__5428__auto__);
cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_16130);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if(new cljs.core.Keyword(null,"else","else",1017020587))
{throw e16145;
} else
{return null;
}
}
}})();if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__5426__auto__,new cljs.core.Keyword(null,"recur","recur",1122293407)))
{{
var G__16155 = state_16130;
state_16130 = G__16155;
continue;
}
} else
{return ret_value__5426__auto__;
}
break;
}
});
state_machine__5425__auto__ = function(state_16130){
switch(arguments.length){
case 0:
return state_machine__5425__auto____0.call(this);
case 1:
return state_machine__5425__auto____1.call(this,state_16130);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
state_machine__5425__auto__.cljs$core$IFn$_invoke$arity$0 = state_machine__5425__auto____0;
state_machine__5425__auto__.cljs$core$IFn$_invoke$arity$1 = state_machine__5425__auto____1;
return state_machine__5425__auto__;
})()
;})(switch__5424__auto__))
})();var state__5496__auto__ = (function (){var statearr_16147 = f__5495__auto__.call(null);(statearr_16147[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__5494__auto__);
return statearr_16147;
})();return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__5496__auto__);
}));
return c__5494__auto__;
});
hoare.utils.print_chan = (function print_chan(source){var c__5494__auto__ = cljs.core.async.chan.call(null,1);cljs.core.async.impl.dispatch.run.call(null,(function (){var f__5495__auto__ = (function (){var switch__5424__auto__ = (function (state_16210){var state_val_16211 = (state_16210[1]);if((state_val_16211 === 8))
{var inst_16201 = (state_16210[2]);var inst_16194 = inst_16201;var state_16210__$1 = (function (){var statearr_16212 = state_16210;(statearr_16212[7] = inst_16194);
return statearr_16212;
})();var statearr_16213_16228 = state_16210__$1;(statearr_16213_16228[2] = null);
(statearr_16213_16228[1] = 3);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_16211 === 7))
{var inst_16206 = (state_16210[2]);var state_16210__$1 = state_16210;var statearr_16214_16229 = state_16210__$1;(statearr_16214_16229[2] = inst_16206);
(statearr_16214_16229[1] = 4);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_16211 === 6))
{var inst_16204 = console.log("Channel was closed");var state_16210__$1 = state_16210;var statearr_16215_16230 = state_16210__$1;(statearr_16215_16230[2] = inst_16204);
(statearr_16215_16230[1] = 7);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_16211 === 5))
{var inst_16194 = (state_16210[7]);var inst_16199 = console.log(inst_16194);var state_16210__$1 = (function (){var statearr_16216 = state_16210;(statearr_16216[8] = inst_16199);
return statearr_16216;
})();return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_16210__$1,8,source);
} else
{if((state_val_16211 === 4))
{var inst_16208 = (state_16210[2]);var state_16210__$1 = state_16210;return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_16210__$1,inst_16208);
} else
{if((state_val_16211 === 3))
{var inst_16194 = (state_16210[7]);var inst_16196 = (inst_16194 == null);var inst_16197 = cljs.core.not.call(null,inst_16196);var state_16210__$1 = state_16210;if(inst_16197)
{var statearr_16217_16231 = state_16210__$1;(statearr_16217_16231[1] = 5);
} else
{var statearr_16218_16232 = state_16210__$1;(statearr_16218_16232[1] = 6);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_16211 === 2))
{var inst_16193 = (state_16210[2]);var inst_16194 = inst_16193;var state_16210__$1 = (function (){var statearr_16219 = state_16210;(statearr_16219[7] = inst_16194);
return statearr_16219;
})();var statearr_16220_16233 = state_16210__$1;(statearr_16220_16233[2] = null);
(statearr_16220_16233[1] = 3);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_16211 === 1))
{var state_16210__$1 = state_16210;return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_16210__$1,2,source);
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
var state_machine__5425__auto____0 = (function (){var statearr_16224 = (new Array(9));(statearr_16224[0] = state_machine__5425__auto__);
(statearr_16224[1] = 1);
return statearr_16224;
});
var state_machine__5425__auto____1 = (function (state_16210){while(true){
var ret_value__5426__auto__ = (function (){try{while(true){
var result__5427__auto__ = switch__5424__auto__.call(null,state_16210);if(cljs.core.keyword_identical_QMARK_.call(null,result__5427__auto__,new cljs.core.Keyword(null,"recur","recur",1122293407)))
{{
continue;
}
} else
{return result__5427__auto__;
}
break;
}
}catch (e16225){if((e16225 instanceof Object))
{var ex__5428__auto__ = e16225;var statearr_16226_16234 = state_16210;(statearr_16226_16234[5] = ex__5428__auto__);
cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_16210);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if(new cljs.core.Keyword(null,"else","else",1017020587))
{throw e16225;
} else
{return null;
}
}
}})();if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__5426__auto__,new cljs.core.Keyword(null,"recur","recur",1122293407)))
{{
var G__16235 = state_16210;
state_16210 = G__16235;
continue;
}
} else
{return ret_value__5426__auto__;
}
break;
}
});
state_machine__5425__auto__ = function(state_16210){
switch(arguments.length){
case 0:
return state_machine__5425__auto____0.call(this);
case 1:
return state_machine__5425__auto____1.call(this,state_16210);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
state_machine__5425__auto__.cljs$core$IFn$_invoke$arity$0 = state_machine__5425__auto____0;
state_machine__5425__auto__.cljs$core$IFn$_invoke$arity$1 = state_machine__5425__auto____1;
return state_machine__5425__auto__;
})()
;})(switch__5424__auto__))
})();var state__5496__auto__ = (function (){var statearr_16227 = f__5495__auto__.call(null);(statearr_16227[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__5494__auto__);
return statearr_16227;
})();return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__5496__auto__);
}));
return c__5494__auto__;
});
