// Compiled by ClojureScript 0.0-2030
goog.provide('hoare.coroutines');
goog.require('cljs.core');
goog.require('cljs.core.match');
goog.require('hoare.utils');
goog.require('cljs.core.async');
goog.require('cljs.core.match');
goog.require('hoare.utils');
goog.require('cljs.core.async');
goog.require('cljs.core.async');
hoare.coroutines.copy = (function copy(west,east){var c__5494__auto__ = cljs.core.async.chan.call(null,1);cljs.core.async.impl.dispatch.run.call(null,(function (){var f__5495__auto__ = (function (){var switch__5424__auto__ = (function (state_16292){var state_val_16293 = (state_16292[1]);if((state_val_16293 === 9))
{var inst_16283 = (state_16292[2]);var inst_16275 = inst_16283;var state_16292__$1 = (function (){var statearr_16294 = state_16292;(statearr_16294[7] = inst_16275);
return statearr_16294;
})();var statearr_16295_16310 = state_16292__$1;(statearr_16295_16310[2] = null);
(statearr_16295_16310[1] = 3);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_16293 === 8))
{var inst_16281 = (state_16292[2]);var state_16292__$1 = (function (){var statearr_16296 = state_16292;(statearr_16296[8] = inst_16281);
return statearr_16296;
})();return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_16292__$1,9,west);
} else
{if((state_val_16293 === 7))
{var inst_16288 = (state_16292[2]);var state_16292__$1 = state_16292;var statearr_16297_16311 = state_16292__$1;(statearr_16297_16311[2] = inst_16288);
(statearr_16297_16311[1] = 4);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_16293 === 6))
{var inst_16286 = cljs.core.async.close_BANG_.call(null,east);var state_16292__$1 = state_16292;var statearr_16298_16312 = state_16292__$1;(statearr_16298_16312[2] = inst_16286);
(statearr_16298_16312[1] = 7);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_16293 === 5))
{var inst_16275 = (state_16292[7]);var state_16292__$1 = state_16292;return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_16292__$1,8,east,inst_16275);
} else
{if((state_val_16293 === 4))
{var inst_16290 = (state_16292[2]);var state_16292__$1 = state_16292;return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_16292__$1,inst_16290);
} else
{if((state_val_16293 === 3))
{var inst_16275 = (state_16292[7]);var inst_16277 = (inst_16275 == null);var inst_16278 = cljs.core.not.call(null,inst_16277);var state_16292__$1 = state_16292;if(inst_16278)
{var statearr_16299_16313 = state_16292__$1;(statearr_16299_16313[1] = 5);
} else
{var statearr_16300_16314 = state_16292__$1;(statearr_16300_16314[1] = 6);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_16293 === 2))
{var inst_16274 = (state_16292[2]);var inst_16275 = inst_16274;var state_16292__$1 = (function (){var statearr_16301 = state_16292;(statearr_16301[7] = inst_16275);
return statearr_16301;
})();var statearr_16302_16315 = state_16292__$1;(statearr_16302_16315[2] = null);
(statearr_16302_16315[1] = 3);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_16293 === 1))
{var state_16292__$1 = state_16292;return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_16292__$1,2,west);
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
var state_machine__5425__auto____0 = (function (){var statearr_16306 = (new Array(9));(statearr_16306[0] = state_machine__5425__auto__);
(statearr_16306[1] = 1);
return statearr_16306;
});
var state_machine__5425__auto____1 = (function (state_16292){while(true){
var ret_value__5426__auto__ = (function (){try{while(true){
var result__5427__auto__ = switch__5424__auto__.call(null,state_16292);if(cljs.core.keyword_identical_QMARK_.call(null,result__5427__auto__,new cljs.core.Keyword(null,"recur","recur",1122293407)))
{{
continue;
}
} else
{return result__5427__auto__;
}
break;
}
}catch (e16307){if((e16307 instanceof Object))
{var ex__5428__auto__ = e16307;var statearr_16308_16316 = state_16292;(statearr_16308_16316[5] = ex__5428__auto__);
cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_16292);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if(new cljs.core.Keyword(null,"else","else",1017020587))
{throw e16307;
} else
{return null;
}
}
}})();if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__5426__auto__,new cljs.core.Keyword(null,"recur","recur",1122293407)))
{{
var G__16317 = state_16292;
state_16292 = G__16317;
continue;
}
} else
{return ret_value__5426__auto__;
}
break;
}
});
state_machine__5425__auto__ = function(state_16292){
switch(arguments.length){
case 0:
return state_machine__5425__auto____0.call(this);
case 1:
return state_machine__5425__auto____1.call(this,state_16292);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
state_machine__5425__auto__.cljs$core$IFn$_invoke$arity$0 = state_machine__5425__auto____0;
state_machine__5425__auto__.cljs$core$IFn$_invoke$arity$1 = state_machine__5425__auto____1;
return state_machine__5425__auto__;
})()
;})(switch__5424__auto__))
})();var state__5496__auto__ = (function (){var statearr_16309 = f__5495__auto__.call(null);(statearr_16309[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__5494__auto__);
return statearr_16309;
})();return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__5496__auto__);
}));
return c__5494__auto__;
});
hoare.coroutines.squash = (function squash(source){var result = cljs.core.async.chan.call(null);var c__5494__auto___16546 = cljs.core.async.chan.call(null,1);cljs.core.async.impl.dispatch.run.call(null,(function (){var f__5495__auto__ = (function (){var switch__5424__auto__ = (function (state_16501){var state_val_16502 = (state_16501[1]);if((state_val_16502 === 1))
{var state_16501__$1 = state_16501;return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_16501__$1,2,source);
} else
{if((state_val_16502 === 2))
{var inst_16433 = (state_16501[2]);var inst_16434 = inst_16433;var inst_16435 = new cljs.core.Keyword(null,"NOASTERIX","NOASTERIX",2023569039);var state_16501__$1 = (function (){var statearr_16503 = state_16501;(statearr_16503[7] = inst_16435);
(statearr_16503[8] = inst_16434);
return statearr_16503;
})();var statearr_16504_16547 = state_16501__$1;(statearr_16504_16547[2] = null);
(statearr_16504_16547[1] = 3);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_16502 === 3))
{var inst_16434 = (state_16501[8]);var inst_16437 = (inst_16434 == null);var state_16501__$1 = state_16501;if(cljs.core.truth_(inst_16437))
{var statearr_16505_16548 = state_16501__$1;(statearr_16505_16548[1] = 5);
} else
{var statearr_16506_16549 = state_16501__$1;(statearr_16506_16549[1] = 6);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_16502 === 4))
{var inst_16499 = (state_16501[2]);var state_16501__$1 = state_16501;return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_16501__$1,inst_16499);
} else
{if((state_val_16502 === 5))
{var inst_16435 = (state_16501[7]);var inst_16439 = cljs.core._EQ_.call(null,inst_16435,new cljs.core.Keyword(null,"ONEASTERIX","ONEASTERIX",3430637162));var state_16501__$1 = state_16501;if(inst_16439)
{var statearr_16507_16550 = state_16501__$1;(statearr_16507_16550[1] = 8);
} else
{var statearr_16508_16551 = state_16501__$1;(statearr_16508_16551[1] = 9);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_16502 === 6))
{var inst_16435 = (state_16501[7]);var inst_16434 = (state_16501[8]);var inst_16448 = cljs.core.not_EQ_.call(null,inst_16434,"*");var inst_16449 = cljs.core._EQ_.call(null,inst_16435,new cljs.core.Keyword(null,"NOASTERIX","NOASTERIX",2023569039));var inst_16450 = (inst_16448) && (inst_16449);var state_16501__$1 = state_16501;if(cljs.core.truth_(inst_16450))
{var statearr_16509_16552 = state_16501__$1;(statearr_16509_16552[1] = 12);
} else
{var statearr_16510_16553 = state_16501__$1;(statearr_16510_16553[1] = 13);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_16502 === 7))
{var inst_16497 = (state_16501[2]);var state_16501__$1 = state_16501;var statearr_16511_16554 = state_16501__$1;(statearr_16511_16554[2] = inst_16497);
(statearr_16511_16554[1] = 4);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_16502 === 8))
{var state_16501__$1 = state_16501;return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_16501__$1,11,result,"*");
} else
{if((state_val_16502 === 9))
{var state_16501__$1 = state_16501;var statearr_16512_16555 = state_16501__$1;(statearr_16512_16555[2] = null);
(statearr_16512_16555[1] = 10);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_16502 === 10))
{var inst_16445 = (state_16501[2]);var inst_16446 = cljs.core.async.close_BANG_.call(null,result);var state_16501__$1 = (function (){var statearr_16513 = state_16501;(statearr_16513[9] = inst_16445);
return statearr_16513;
})();var statearr_16514_16556 = state_16501__$1;(statearr_16514_16556[2] = inst_16446);
(statearr_16514_16556[1] = 7);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_16502 === 11))
{var inst_16442 = (state_16501[2]);var state_16501__$1 = state_16501;var statearr_16515_16557 = state_16501__$1;(statearr_16515_16557[2] = inst_16442);
(statearr_16515_16557[1] = 10);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_16502 === 12))
{var inst_16434 = (state_16501[8]);var state_16501__$1 = state_16501;return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_16501__$1,15,result,inst_16434);
} else
{if((state_val_16502 === 13))
{var inst_16435 = (state_16501[7]);var inst_16434 = (state_16501[8]);var inst_16458 = cljs.core.not_EQ_.call(null,inst_16434,"*");var inst_16459 = cljs.core._EQ_.call(null,inst_16435,new cljs.core.Keyword(null,"ONEASTERIX","ONEASTERIX",3430637162));var inst_16460 = (inst_16458) && (inst_16459);var state_16501__$1 = state_16501;if(cljs.core.truth_(inst_16460))
{var statearr_16516_16558 = state_16501__$1;(statearr_16516_16558[1] = 17);
} else
{var statearr_16517_16559 = state_16501__$1;(statearr_16517_16559[1] = 18);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_16502 === 14))
{var inst_16495 = (state_16501[2]);var state_16501__$1 = state_16501;var statearr_16518_16560 = state_16501__$1;(statearr_16518_16560[2] = inst_16495);
(statearr_16518_16560[1] = 7);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_16502 === 15))
{var inst_16453 = (state_16501[2]);var state_16501__$1 = (function (){var statearr_16519 = state_16501;(statearr_16519[10] = inst_16453);
return statearr_16519;
})();return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_16501__$1,16,source);
} else
{if((state_val_16502 === 16))
{var inst_16455 = (state_16501[2]);var inst_16434 = inst_16455;var inst_16435 = new cljs.core.Keyword(null,"NOASTERIX","NOASTERIX",2023569039);var state_16501__$1 = (function (){var statearr_16520 = state_16501;(statearr_16520[7] = inst_16435);
(statearr_16520[8] = inst_16434);
return statearr_16520;
})();var statearr_16521_16561 = state_16501__$1;(statearr_16521_16561[2] = null);
(statearr_16521_16561[1] = 3);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_16502 === 17))
{var state_16501__$1 = state_16501;return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_16501__$1,20,result,"*");
} else
{if((state_val_16502 === 18))
{var inst_16435 = (state_16501[7]);var inst_16434 = (state_16501[8]);var inst_16470 = cljs.core._EQ_.call(null,inst_16434,"*");var inst_16471 = cljs.core._EQ_.call(null,inst_16435,new cljs.core.Keyword(null,"NOASTERIX","NOASTERIX",2023569039));var inst_16472 = (inst_16470) && (inst_16471);var state_16501__$1 = state_16501;if(cljs.core.truth_(inst_16472))
{var statearr_16522_16562 = state_16501__$1;(statearr_16522_16562[1] = 23);
} else
{var statearr_16523_16563 = state_16501__$1;(statearr_16523_16563[1] = 24);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_16502 === 19))
{var inst_16493 = (state_16501[2]);var state_16501__$1 = state_16501;var statearr_16524_16564 = state_16501__$1;(statearr_16524_16564[2] = inst_16493);
(statearr_16524_16564[1] = 14);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_16502 === 20))
{var inst_16434 = (state_16501[8]);var inst_16463 = (state_16501[2]);var state_16501__$1 = (function (){var statearr_16525 = state_16501;(statearr_16525[11] = inst_16463);
return statearr_16525;
})();return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_16501__$1,21,result,inst_16434);
} else
{if((state_val_16502 === 21))
{var inst_16465 = (state_16501[2]);var state_16501__$1 = (function (){var statearr_16526 = state_16501;(statearr_16526[12] = inst_16465);
return statearr_16526;
})();return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_16501__$1,22,source);
} else
{if((state_val_16502 === 22))
{var inst_16467 = (state_16501[2]);var inst_16434 = inst_16467;var inst_16435 = new cljs.core.Keyword(null,"NOASTERIX","NOASTERIX",2023569039);var state_16501__$1 = (function (){var statearr_16527 = state_16501;(statearr_16527[7] = inst_16435);
(statearr_16527[8] = inst_16434);
return statearr_16527;
})();var statearr_16528_16565 = state_16501__$1;(statearr_16528_16565[2] = null);
(statearr_16528_16565[1] = 3);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_16502 === 23))
{var state_16501__$1 = state_16501;return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_16501__$1,26,source);
} else
{if((state_val_16502 === 24))
{var inst_16435 = (state_16501[7]);var inst_16434 = (state_16501[8]);var inst_16478 = cljs.core._EQ_.call(null,inst_16434,"*");var inst_16479 = cljs.core._EQ_.call(null,inst_16435,new cljs.core.Keyword(null,"ONEASTERIX","ONEASTERIX",3430637162));var inst_16480 = (inst_16478) && (inst_16479);var state_16501__$1 = state_16501;if(cljs.core.truth_(inst_16480))
{var statearr_16529_16566 = state_16501__$1;(statearr_16529_16566[1] = 27);
} else
{var statearr_16530_16567 = state_16501__$1;(statearr_16530_16567[1] = 28);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_16502 === 25))
{var inst_16491 = (state_16501[2]);var state_16501__$1 = state_16501;var statearr_16531_16568 = state_16501__$1;(statearr_16531_16568[2] = inst_16491);
(statearr_16531_16568[1] = 19);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_16502 === 26))
{var inst_16475 = (state_16501[2]);var inst_16434 = inst_16475;var inst_16435 = new cljs.core.Keyword(null,"ONEASTERIX","ONEASTERIX",3430637162);var state_16501__$1 = (function (){var statearr_16532 = state_16501;(statearr_16532[7] = inst_16435);
(statearr_16532[8] = inst_16434);
return statearr_16532;
})();var statearr_16533_16569 = state_16501__$1;(statearr_16533_16569[2] = null);
(statearr_16533_16569[1] = 3);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_16502 === 27))
{var state_16501__$1 = state_16501;return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_16501__$1,30,result,"^");
} else
{if((state_val_16502 === 28))
{var state_16501__$1 = state_16501;var statearr_16534_16570 = state_16501__$1;(statearr_16534_16570[2] = null);
(statearr_16534_16570[1] = 29);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_16502 === 29))
{var inst_16489 = (state_16501[2]);var state_16501__$1 = state_16501;var statearr_16535_16571 = state_16501__$1;(statearr_16535_16571[2] = inst_16489);
(statearr_16535_16571[1] = 25);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_16502 === 30))
{var inst_16483 = (state_16501[2]);var state_16501__$1 = (function (){var statearr_16536 = state_16501;(statearr_16536[13] = inst_16483);
return statearr_16536;
})();return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_16501__$1,31,source);
} else
{if((state_val_16502 === 31))
{var inst_16485 = (state_16501[2]);var inst_16434 = inst_16485;var inst_16435 = new cljs.core.Keyword(null,"NOASTERIX","NOASTERIX",2023569039);var state_16501__$1 = (function (){var statearr_16537 = state_16501;(statearr_16537[7] = inst_16435);
(statearr_16537[8] = inst_16434);
return statearr_16537;
})();var statearr_16538_16572 = state_16501__$1;(statearr_16538_16572[2] = null);
(statearr_16538_16572[1] = 3);
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
}
}
});return ((function (switch__5424__auto__){
return (function() {
var state_machine__5425__auto__ = null;
var state_machine__5425__auto____0 = (function (){var statearr_16542 = (new Array(14));(statearr_16542[0] = state_machine__5425__auto__);
(statearr_16542[1] = 1);
return statearr_16542;
});
var state_machine__5425__auto____1 = (function (state_16501){while(true){
var ret_value__5426__auto__ = (function (){try{while(true){
var result__5427__auto__ = switch__5424__auto__.call(null,state_16501);if(cljs.core.keyword_identical_QMARK_.call(null,result__5427__auto__,new cljs.core.Keyword(null,"recur","recur",1122293407)))
{{
continue;
}
} else
{return result__5427__auto__;
}
break;
}
}catch (e16543){if((e16543 instanceof Object))
{var ex__5428__auto__ = e16543;var statearr_16544_16573 = state_16501;(statearr_16544_16573[5] = ex__5428__auto__);
cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_16501);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if(new cljs.core.Keyword(null,"else","else",1017020587))
{throw e16543;
} else
{return null;
}
}
}})();if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__5426__auto__,new cljs.core.Keyword(null,"recur","recur",1122293407)))
{{
var G__16574 = state_16501;
state_16501 = G__16574;
continue;
}
} else
{return ret_value__5426__auto__;
}
break;
}
});
state_machine__5425__auto__ = function(state_16501){
switch(arguments.length){
case 0:
return state_machine__5425__auto____0.call(this);
case 1:
return state_machine__5425__auto____1.call(this,state_16501);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
state_machine__5425__auto__.cljs$core$IFn$_invoke$arity$0 = state_machine__5425__auto____0;
state_machine__5425__auto__.cljs$core$IFn$_invoke$arity$1 = state_machine__5425__auto____1;
return state_machine__5425__auto__;
})()
;})(switch__5424__auto__))
})();var state__5496__auto__ = (function (){var statearr_16545 = f__5495__auto__.call(null);(statearr_16545[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__5494__auto___16546);
return statearr_16545;
})();return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__5496__auto__);
}));
return result;
});
hoare.coroutines.disassemble = (function disassemble(source){var result = cljs.core.async.chan.call(null);var c__5494__auto___16695 = cljs.core.async.chan.call(null,1);cljs.core.async.impl.dispatch.run.call(null,(function (){var f__5495__auto__ = (function (){var switch__5424__auto__ = (function (state_16668){var state_val_16669 = (state_16668[1]);if((state_val_16669 === 1))
{var state_16668__$1 = state_16668;return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_16668__$1,2,source);
} else
{if((state_val_16669 === 2))
{var inst_16636 = (state_16668[2]);var inst_16637 = inst_16636;var state_16668__$1 = (function (){var statearr_16670 = state_16668;(statearr_16670[7] = inst_16637);
return statearr_16670;
})();var statearr_16671_16696 = state_16668__$1;(statearr_16671_16696[2] = null);
(statearr_16671_16696[1] = 3);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_16669 === 3))
{var inst_16637 = (state_16668[7]);var inst_16639 = (inst_16637 == null);var inst_16640 = cljs.core.not.call(null,inst_16639);var state_16668__$1 = state_16668;if(inst_16640)
{var statearr_16672_16697 = state_16668__$1;(statearr_16672_16697[1] = 5);
} else
{var statearr_16673_16698 = state_16668__$1;(statearr_16673_16698[1] = 6);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_16669 === 4))
{var inst_16666 = (state_16668[2]);var state_16668__$1 = state_16668;return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_16668__$1,inst_16666);
} else
{if((state_val_16669 === 5))
{var inst_16642 = 0;var state_16668__$1 = (function (){var statearr_16674 = state_16668;(statearr_16674[8] = inst_16642);
return statearr_16674;
})();var statearr_16675_16699 = state_16668__$1;(statearr_16675_16699[2] = null);
(statearr_16675_16699[1] = 8);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_16669 === 6))
{var inst_16662 = cljs.core.async.close_BANG_.call(null,result);var state_16668__$1 = state_16668;var statearr_16676_16700 = state_16668__$1;(statearr_16676_16700[2] = inst_16662);
(statearr_16676_16700[1] = 7);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_16669 === 7))
{var inst_16664 = (state_16668[2]);var state_16668__$1 = state_16668;var statearr_16677_16701 = state_16668__$1;(statearr_16677_16701[2] = inst_16664);
(statearr_16677_16701[1] = 4);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_16669 === 8))
{var inst_16642 = (state_16668[8]);var inst_16644 = (inst_16642 < 80);var state_16668__$1 = state_16668;if(cljs.core.truth_(inst_16644))
{var statearr_16678_16702 = state_16668__$1;(statearr_16678_16702[1] = 10);
} else
{var statearr_16679_16703 = state_16668__$1;(statearr_16679_16703[1] = 11);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_16669 === 9))
{var inst_16655 = (state_16668[2]);var state_16668__$1 = (function (){var statearr_16680 = state_16668;(statearr_16680[9] = inst_16655);
return statearr_16680;
})();return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_16668__$1,14,result," ");
} else
{if((state_val_16669 === 10))
{var inst_16642 = (state_16668[8]);var inst_16637 = (state_16668[7]);var inst_16646 = cljs.core.get.call(null,inst_16637,inst_16642);var state_16668__$1 = state_16668;return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_16668__$1,13,result,inst_16646);
} else
{if((state_val_16669 === 11))
{var state_16668__$1 = state_16668;var statearr_16681_16704 = state_16668__$1;(statearr_16681_16704[2] = null);
(statearr_16681_16704[1] = 12);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_16669 === 12))
{var inst_16653 = (state_16668[2]);var state_16668__$1 = state_16668;var statearr_16682_16705 = state_16668__$1;(statearr_16682_16705[2] = inst_16653);
(statearr_16682_16705[1] = 9);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_16669 === 13))
{var inst_16642 = (state_16668[8]);var inst_16648 = (state_16668[2]);var inst_16649 = (inst_16642 + 1);var inst_16642__$1 = inst_16649;var state_16668__$1 = (function (){var statearr_16683 = state_16668;(statearr_16683[8] = inst_16642__$1);
(statearr_16683[10] = inst_16648);
return statearr_16683;
})();var statearr_16684_16706 = state_16668__$1;(statearr_16684_16706[2] = null);
(statearr_16684_16706[1] = 8);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_16669 === 14))
{var inst_16657 = (state_16668[2]);var state_16668__$1 = (function (){var statearr_16685 = state_16668;(statearr_16685[11] = inst_16657);
return statearr_16685;
})();return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_16668__$1,15,source);
} else
{if((state_val_16669 === 15))
{var inst_16659 = (state_16668[2]);var inst_16637 = inst_16659;var state_16668__$1 = (function (){var statearr_16686 = state_16668;(statearr_16686[7] = inst_16637);
return statearr_16686;
})();var statearr_16687_16707 = state_16668__$1;(statearr_16687_16707[2] = null);
(statearr_16687_16707[1] = 3);
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
}
});return ((function (switch__5424__auto__){
return (function() {
var state_machine__5425__auto__ = null;
var state_machine__5425__auto____0 = (function (){var statearr_16691 = (new Array(12));(statearr_16691[0] = state_machine__5425__auto__);
(statearr_16691[1] = 1);
return statearr_16691;
});
var state_machine__5425__auto____1 = (function (state_16668){while(true){
var ret_value__5426__auto__ = (function (){try{while(true){
var result__5427__auto__ = switch__5424__auto__.call(null,state_16668);if(cljs.core.keyword_identical_QMARK_.call(null,result__5427__auto__,new cljs.core.Keyword(null,"recur","recur",1122293407)))
{{
continue;
}
} else
{return result__5427__auto__;
}
break;
}
}catch (e16692){if((e16692 instanceof Object))
{var ex__5428__auto__ = e16692;var statearr_16693_16708 = state_16668;(statearr_16693_16708[5] = ex__5428__auto__);
cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_16668);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if(new cljs.core.Keyword(null,"else","else",1017020587))
{throw e16692;
} else
{return null;
}
}
}})();if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__5426__auto__,new cljs.core.Keyword(null,"recur","recur",1122293407)))
{{
var G__16709 = state_16668;
state_16668 = G__16709;
continue;
}
} else
{return ret_value__5426__auto__;
}
break;
}
});
state_machine__5425__auto__ = function(state_16668){
switch(arguments.length){
case 0:
return state_machine__5425__auto____0.call(this);
case 1:
return state_machine__5425__auto____1.call(this,state_16668);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
state_machine__5425__auto__.cljs$core$IFn$_invoke$arity$0 = state_machine__5425__auto____0;
state_machine__5425__auto__.cljs$core$IFn$_invoke$arity$1 = state_machine__5425__auto____1;
return state_machine__5425__auto__;
})()
;})(switch__5424__auto__))
})();var state__5496__auto__ = (function (){var statearr_16694 = f__5495__auto__.call(null);(statearr_16694[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__5494__auto___16695);
return statearr_16694;
})();return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__5496__auto__);
}));
return result;
});
hoare.coroutines.assemble = (function assemble(source){var result = cljs.core.async.chan.call(null);var c__5494__auto___16824 = cljs.core.async.chan.call(null,1);cljs.core.async.impl.dispatch.run.call(null,(function (){var f__5495__auto__ = (function (){var switch__5424__auto__ = (function (state_16800){var state_val_16801 = (state_16800[1]);if((state_val_16801 === 1))
{var state_16800__$1 = state_16800;return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_16800__$1,2,source);
} else
{if((state_val_16801 === 2))
{var inst_16768 = (state_16800[2]);var inst_16769 = 0;var inst_16770 = inst_16768;var inst_16771 = "";var inst_16772 = new cljs.core.Keyword(null,"NO","NO",1013906739);var state_16800__$1 = (function (){var statearr_16802 = state_16800;(statearr_16802[7] = inst_16769);
(statearr_16802[8] = inst_16772);
(statearr_16802[9] = inst_16771);
(statearr_16802[10] = inst_16770);
return statearr_16802;
})();var statearr_16803_16825 = state_16800__$1;(statearr_16803_16825[2] = null);
(statearr_16803_16825[1] = 3);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_16801 === 3))
{var inst_16769 = (state_16800[7]);var inst_16774 = (inst_16769 <= 125);var state_16800__$1 = state_16800;if(cljs.core.truth_(inst_16774))
{var statearr_16804_16826 = state_16800__$1;(statearr_16804_16826[1] = 5);
} else
{var statearr_16805_16827 = state_16800__$1;(statearr_16805_16827[1] = 6);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_16801 === 4))
{var inst_16798 = (state_16800[2]);var state_16800__$1 = state_16800;return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_16800__$1,inst_16798);
} else
{if((state_val_16801 === 5))
{var inst_16772 = (state_16800[8]);var inst_16770 = (state_16800[10]);var inst_16776 = cljs.core.not_EQ_.call(null,inst_16770,null);var inst_16777 = cljs.core._EQ_.call(null,inst_16772,new cljs.core.Keyword(null,"NO","NO",1013906739));var inst_16778 = (inst_16776) && (inst_16777);var state_16800__$1 = state_16800;if(cljs.core.truth_(inst_16778))
{var statearr_16806_16828 = state_16800__$1;(statearr_16806_16828[1] = 8);
} else
{var statearr_16807_16829 = state_16800__$1;(statearr_16807_16829[1] = 9);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_16801 === 6))
{var inst_16771 = (state_16800[9]);var state_16800__$1 = state_16800;return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_16800__$1,12,result,inst_16771);
} else
{if((state_val_16801 === 7))
{var inst_16796 = (state_16800[2]);var state_16800__$1 = state_16800;var statearr_16808_16830 = state_16800__$1;(statearr_16808_16830[2] = inst_16796);
(statearr_16808_16830[1] = 4);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_16801 === 8))
{var inst_16769 = (state_16800[7]);var inst_16780 = (inst_16769 + 1);var state_16800__$1 = (function (){var statearr_16809 = state_16800;(statearr_16809[11] = inst_16780);
return statearr_16809;
})();return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_16800__$1,11,source);
} else
{if((state_val_16801 === 9))
{var inst_16769 = (state_16800[7]);var inst_16771 = (state_16800[9]);var inst_16770 = (state_16800[10]);var inst_16786 = (inst_16769 + 1);var inst_16787 = [cljs.core.str(inst_16771),cljs.core.str(inst_16770)].join('');var inst_16769__$1 = inst_16786;var inst_16770__$1 = " ";var inst_16771__$1 = inst_16787;var inst_16772 = new cljs.core.Keyword(null,"YES","YES",1013991993);var state_16800__$1 = (function (){var statearr_16810 = state_16800;(statearr_16810[7] = inst_16769__$1);
(statearr_16810[8] = inst_16772);
(statearr_16810[9] = inst_16771__$1);
(statearr_16810[10] = inst_16770__$1);
return statearr_16810;
})();var statearr_16811_16831 = state_16800__$1;(statearr_16811_16831[2] = null);
(statearr_16811_16831[1] = 3);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_16801 === 10))
{var inst_16790 = (state_16800[2]);var state_16800__$1 = state_16800;var statearr_16812_16832 = state_16800__$1;(statearr_16812_16832[2] = inst_16790);
(statearr_16812_16832[1] = 7);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_16801 === 11))
{var inst_16780 = (state_16800[11]);var inst_16771 = (state_16800[9]);var inst_16770 = (state_16800[10]);var inst_16782 = (state_16800[2]);var inst_16783 = [cljs.core.str(inst_16771),cljs.core.str(inst_16770)].join('');var inst_16769 = inst_16780;var inst_16770__$1 = inst_16782;var inst_16771__$1 = inst_16783;var inst_16772 = new cljs.core.Keyword(null,"NO","NO",1013906739);var state_16800__$1 = (function (){var statearr_16813 = state_16800;(statearr_16813[7] = inst_16769);
(statearr_16813[8] = inst_16772);
(statearr_16813[9] = inst_16771__$1);
(statearr_16813[10] = inst_16770__$1);
return statearr_16813;
})();var statearr_16814_16833 = state_16800__$1;(statearr_16814_16833[2] = null);
(statearr_16814_16833[1] = 3);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_16801 === 12))
{var inst_16793 = (state_16800[2]);var inst_16794 = cljs.core.async.close_BANG_.call(null,result);var state_16800__$1 = (function (){var statearr_16815 = state_16800;(statearr_16815[12] = inst_16793);
return statearr_16815;
})();var statearr_16816_16834 = state_16800__$1;(statearr_16816_16834[2] = inst_16794);
(statearr_16816_16834[1] = 7);
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
});return ((function (switch__5424__auto__){
return (function() {
var state_machine__5425__auto__ = null;
var state_machine__5425__auto____0 = (function (){var statearr_16820 = (new Array(13));(statearr_16820[0] = state_machine__5425__auto__);
(statearr_16820[1] = 1);
return statearr_16820;
});
var state_machine__5425__auto____1 = (function (state_16800){while(true){
var ret_value__5426__auto__ = (function (){try{while(true){
var result__5427__auto__ = switch__5424__auto__.call(null,state_16800);if(cljs.core.keyword_identical_QMARK_.call(null,result__5427__auto__,new cljs.core.Keyword(null,"recur","recur",1122293407)))
{{
continue;
}
} else
{return result__5427__auto__;
}
break;
}
}catch (e16821){if((e16821 instanceof Object))
{var ex__5428__auto__ = e16821;var statearr_16822_16835 = state_16800;(statearr_16822_16835[5] = ex__5428__auto__);
cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_16800);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if(new cljs.core.Keyword(null,"else","else",1017020587))
{throw e16821;
} else
{return null;
}
}
}})();if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__5426__auto__,new cljs.core.Keyword(null,"recur","recur",1122293407)))
{{
var G__16836 = state_16800;
state_16800 = G__16836;
continue;
}
} else
{return ret_value__5426__auto__;
}
break;
}
});
state_machine__5425__auto__ = function(state_16800){
switch(arguments.length){
case 0:
return state_machine__5425__auto____0.call(this);
case 1:
return state_machine__5425__auto____1.call(this,state_16800);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
state_machine__5425__auto__.cljs$core$IFn$_invoke$arity$0 = state_machine__5425__auto____0;
state_machine__5425__auto__.cljs$core$IFn$_invoke$arity$1 = state_machine__5425__auto____1;
return state_machine__5425__auto__;
})()
;})(switch__5424__auto__))
})();var state__5496__auto__ = (function (){var statearr_16823 = f__5495__auto__.call(null);(statearr_16823[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__5494__auto___16824);
return statearr_16823;
})();return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__5496__auto__);
}));
return result;
});
hoare.coroutines.reformat = (function reformat(source){var connectorchannel = cljs.core.async.chan.call(null);hoare.coroutines.copy.call(null,hoare.coroutines.disassemble.call(null,source),connectorchannel);
return hoare.coroutines.assemble.call(null,connectorchannel);
});
hoare.coroutines.reformat2 = (function reformat2(source){return hoare.coroutines.assemble.call(null,hoare.coroutines.disassemble.call(null,source));
});
hoare.coroutines.conwaysproblem = (function conwaysproblem(source){return hoare.coroutines.assemble.call(null,hoare.coroutines.squash.call(null,hoare.coroutines.disassemble.call(null,source)));
});
