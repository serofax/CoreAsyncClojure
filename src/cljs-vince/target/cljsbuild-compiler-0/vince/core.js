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
var c__5494__auto__ = cljs.core.async.chan.call(null,1);cljs.core.async.impl.dispatch.run.call(null,(function (){var f__5495__auto__ = (function (){var switch__5424__auto__ = (function (state_30328){var state_val_30329 = (state_30328[1]);if((state_val_30329 === 7))
{var inst_30326 = (state_30328[2]);var state_30328__$1 = state_30328;return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_30328__$1,inst_30326);
} else
{if((state_val_30329 === 6))
{var inst_30322 = (state_30328[2]);var inst_30323 = cljs.core.async.close_BANG_.call(null,west);var inst_30324 = cljs.core.async.timeout.call(null,1000);var state_30328__$1 = (function (){var statearr_30330 = state_30328;(statearr_30330[7] = inst_30322);
(statearr_30330[8] = inst_30323);
return statearr_30330;
})();return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_30328__$1,7,inst_30324);
} else
{if((state_val_30329 === 5))
{var inst_30320 = (state_30328[2]);var state_30328__$1 = (function (){var statearr_30331 = state_30328;(statearr_30331[9] = inst_30320);
return statearr_30331;
})();return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_30328__$1,6,west,"West");
} else
{if((state_val_30329 === 4))
{var inst_30317 = (state_30328[2]);var inst_30318 = cljs.core.async.timeout.call(null,1000);var state_30328__$1 = (function (){var statearr_30332 = state_30328;(statearr_30332[10] = inst_30317);
return statearr_30332;
})();return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_30328__$1,5,inst_30318);
} else
{if((state_val_30329 === 3))
{var inst_30315 = (state_30328[2]);var state_30328__$1 = (function (){var statearr_30333 = state_30328;(statearr_30333[11] = inst_30315);
return statearr_30333;
})();return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_30328__$1,4,west,"from");
} else
{if((state_val_30329 === 2))
{var inst_30312 = (state_30328[2]);var inst_30313 = cljs.core.async.timeout.call(null,1000);var state_30328__$1 = (function (){var statearr_30334 = state_30328;(statearr_30334[12] = inst_30312);
return statearr_30334;
})();return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_30328__$1,3,inst_30313);
} else
{if((state_val_30329 === 1))
{var state_30328__$1 = state_30328;return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_30328__$1,2,west,"Hallo");
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
var state_machine__5425__auto____0 = (function (){var statearr_30338 = (new Array(13));(statearr_30338[0] = state_machine__5425__auto__);
(statearr_30338[1] = 1);
return statearr_30338;
});
var state_machine__5425__auto____1 = (function (state_30328){while(true){
var ret_value__5426__auto__ = (function (){try{while(true){
var result__5427__auto__ = switch__5424__auto__.call(null,state_30328);if(cljs.core.keyword_identical_QMARK_.call(null,result__5427__auto__,new cljs.core.Keyword(null,"recur","recur",1122293407)))
{{
continue;
}
} else
{return result__5427__auto__;
}
break;
}
}catch (e30339){if((e30339 instanceof Object))
{var ex__5428__auto__ = e30339;var statearr_30340_30342 = state_30328;(statearr_30340_30342[5] = ex__5428__auto__);
cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_30328);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if(new cljs.core.Keyword(null,"else","else",1017020587))
{throw e30339;
} else
{return null;
}
}
}})();if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__5426__auto__,new cljs.core.Keyword(null,"recur","recur",1122293407)))
{{
var G__30343 = state_30328;
state_30328 = G__30343;
continue;
}
} else
{return ret_value__5426__auto__;
}
break;
}
});
state_machine__5425__auto__ = function(state_30328){
switch(arguments.length){
case 0:
return state_machine__5425__auto____0.call(this);
case 1:
return state_machine__5425__auto____1.call(this,state_30328);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
state_machine__5425__auto__.cljs$core$IFn$_invoke$arity$0 = state_machine__5425__auto____0;
state_machine__5425__auto__.cljs$core$IFn$_invoke$arity$1 = state_machine__5425__auto____1;
return state_machine__5425__auto__;
})()
;})(switch__5424__auto__))
})();var state__5496__auto__ = (function (){var statearr_30341 = f__5495__auto__.call(null);(statearr_30341[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__5494__auto__);
return statearr_30341;
})();return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__5496__auto__);
}));
return c__5494__auto__;
});
vince.core.testSquash = (function testSquash(){var source = cljs.core.async.chan.call(null);var out = hoare.coroutines.squash.call(null,source);hoare.utils.println_chan.call(null,out);
var c__5494__auto__ = cljs.core.async.chan.call(null,1);cljs.core.async.impl.dispatch.run.call(null,(function (){var f__5495__auto__ = (function (){var switch__5424__auto__ = (function (state_30434){var state_val_30435 = (state_30434[1]);if((state_val_30435 === 1))
{var state_30434__$1 = state_30434;return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_30434__$1,2,source,"*");
} else
{if((state_val_30435 === 2))
{var inst_30401 = (state_30434[2]);var inst_30402 = cljs.core.async.timeout.call(null,1000);var state_30434__$1 = (function (){var statearr_30436 = state_30434;(statearr_30436[7] = inst_30401);
return statearr_30436;
})();return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_30434__$1,3,inst_30402);
} else
{if((state_val_30435 === 3))
{var inst_30404 = (state_30434[2]);var state_30434__$1 = (function (){var statearr_30437 = state_30434;(statearr_30437[8] = inst_30404);
return statearr_30437;
})();return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_30434__$1,4,source,"*");
} else
{if((state_val_30435 === 4))
{var inst_30406 = (state_30434[2]);var inst_30407 = cljs.core.async.timeout.call(null,1000);var state_30434__$1 = (function (){var statearr_30438 = state_30434;(statearr_30438[9] = inst_30406);
return statearr_30438;
})();return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_30434__$1,5,inst_30407);
} else
{if((state_val_30435 === 5))
{var inst_30409 = (state_30434[2]);var state_30434__$1 = (function (){var statearr_30439 = state_30434;(statearr_30439[10] = inst_30409);
return statearr_30439;
})();return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_30434__$1,6,source,"H");
} else
{if((state_val_30435 === 6))
{var inst_30411 = (state_30434[2]);var state_30434__$1 = (function (){var statearr_30440 = state_30434;(statearr_30440[11] = inst_30411);
return statearr_30440;
})();return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_30434__$1,7,source,"e");
} else
{if((state_val_30435 === 7))
{var inst_30413 = (state_30434[2]);var state_30434__$1 = (function (){var statearr_30441 = state_30434;(statearr_30441[12] = inst_30413);
return statearr_30441;
})();return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_30434__$1,8,source,"l");
} else
{if((state_val_30435 === 8))
{var inst_30415 = (state_30434[2]);var state_30434__$1 = (function (){var statearr_30442 = state_30434;(statearr_30442[13] = inst_30415);
return statearr_30442;
})();return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_30434__$1,9,source,"l");
} else
{if((state_val_30435 === 9))
{var inst_30417 = (state_30434[2]);var state_30434__$1 = (function (){var statearr_30443 = state_30434;(statearr_30443[14] = inst_30417);
return statearr_30443;
})();return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_30434__$1,10,source,"o");
} else
{if((state_val_30435 === 10))
{var inst_30419 = (state_30434[2]);var state_30434__$1 = (function (){var statearr_30444 = state_30434;(statearr_30444[15] = inst_30419);
return statearr_30444;
})();return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_30434__$1,11,source,"*");
} else
{if((state_val_30435 === 11))
{var inst_30421 = (state_30434[2]);var inst_30422 = cljs.core.async.timeout.call(null,1000);var state_30434__$1 = (function (){var statearr_30445 = state_30434;(statearr_30445[16] = inst_30421);
return statearr_30445;
})();return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_30434__$1,12,inst_30422);
} else
{if((state_val_30435 === 12))
{var inst_30424 = (state_30434[2]);var state_30434__$1 = (function (){var statearr_30446 = state_30434;(statearr_30446[17] = inst_30424);
return statearr_30446;
})();return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_30434__$1,13,source,"2");
} else
{if((state_val_30435 === 13))
{var inst_30426 = (state_30434[2]);var state_30434__$1 = (function (){var statearr_30447 = state_30434;(statearr_30447[18] = inst_30426);
return statearr_30447;
})();return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_30434__$1,14,source,"*");
} else
{if((state_val_30435 === 14))
{var inst_30428 = (state_30434[2]);var inst_30429 = cljs.core.async.close_BANG_.call(null,source);var inst_30430 = cljs.core.async.timeout.call(null,1000);var state_30434__$1 = (function (){var statearr_30448 = state_30434;(statearr_30448[19] = inst_30428);
(statearr_30448[20] = inst_30429);
return statearr_30448;
})();return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_30434__$1,15,inst_30430);
} else
{if((state_val_30435 === 15))
{var inst_30432 = (state_30434[2]);var state_30434__$1 = state_30434;return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_30434__$1,inst_30432);
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
var state_machine__5425__auto____0 = (function (){var statearr_30452 = (new Array(21));(statearr_30452[0] = state_machine__5425__auto__);
(statearr_30452[1] = 1);
return statearr_30452;
});
var state_machine__5425__auto____1 = (function (state_30434){while(true){
var ret_value__5426__auto__ = (function (){try{while(true){
var result__5427__auto__ = switch__5424__auto__.call(null,state_30434);if(cljs.core.keyword_identical_QMARK_.call(null,result__5427__auto__,new cljs.core.Keyword(null,"recur","recur",1122293407)))
{{
continue;
}
} else
{return result__5427__auto__;
}
break;
}
}catch (e30453){if((e30453 instanceof Object))
{var ex__5428__auto__ = e30453;var statearr_30454_30456 = state_30434;(statearr_30454_30456[5] = ex__5428__auto__);
cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_30434);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if(new cljs.core.Keyword(null,"else","else",1017020587))
{throw e30453;
} else
{return null;
}
}
}})();if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__5426__auto__,new cljs.core.Keyword(null,"recur","recur",1122293407)))
{{
var G__30457 = state_30434;
state_30434 = G__30457;
continue;
}
} else
{return ret_value__5426__auto__;
}
break;
}
});
state_machine__5425__auto__ = function(state_30434){
switch(arguments.length){
case 0:
return state_machine__5425__auto____0.call(this);
case 1:
return state_machine__5425__auto____1.call(this,state_30434);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
state_machine__5425__auto__.cljs$core$IFn$_invoke$arity$0 = state_machine__5425__auto____0;
state_machine__5425__auto__.cljs$core$IFn$_invoke$arity$1 = state_machine__5425__auto____1;
return state_machine__5425__auto__;
})()
;})(switch__5424__auto__))
})();var state__5496__auto__ = (function (){var statearr_30455 = f__5495__auto__.call(null);(statearr_30455[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__5494__auto__);
return statearr_30455;
})();return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__5496__auto__);
}));
return c__5494__auto__;
});
vince.core.set_html_BANG_ = (function set_html_BANG_(obj,what){return obj.innerHTML = [cljs.core.str(obj.innerHTML),cljs.core.str(what),cljs.core.str("\n")].join('');
});
vince.core.by_id = (function by_id(id){return document.getElementById(cljs.core.name.call(null,id));
});
vince.core.printTA = (function printTA(ta,timeoutValue){var result = cljs.core.async.chan.call(null);var c__5494__auto___30538 = cljs.core.async.chan.call(null,1);cljs.core.async.impl.dispatch.run.call(null,(function (){var f__5495__auto__ = (function (){var switch__5424__auto__ = (function (state_30519){var state_val_30520 = (state_30519[1]);if((state_val_30520 === 9))
{var inst_30510 = (state_30519[2]);var inst_30500 = inst_30510;var state_30519__$1 = (function (){var statearr_30521 = state_30519;(statearr_30521[7] = inst_30500);
return statearr_30521;
})();var statearr_30522_30539 = state_30519__$1;(statearr_30522_30539[2] = null);
(statearr_30522_30539[1] = 3);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_30520 === 8))
{var inst_30508 = (state_30519[2]);var state_30519__$1 = (function (){var statearr_30523 = state_30519;(statearr_30523[8] = inst_30508);
return statearr_30523;
})();return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_30519__$1,9,result);
} else
{if((state_val_30520 === 7))
{var inst_30515 = (state_30519[2]);var state_30519__$1 = state_30519;var statearr_30524_30540 = state_30519__$1;(statearr_30524_30540[2] = inst_30515);
(statearr_30524_30540[1] = 4);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_30520 === 6))
{var inst_30513 = vince.core.set_html_BANG_.call(null,ta,"Channel was closed");var state_30519__$1 = state_30519;var statearr_30525_30541 = state_30519__$1;(statearr_30525_30541[2] = inst_30513);
(statearr_30525_30541[1] = 7);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_30520 === 5))
{var inst_30500 = (state_30519[7]);var inst_30505 = vince.core.set_html_BANG_.call(null,ta,inst_30500);var inst_30506 = cljs.core.async.timeout.call(null,timeoutValue);var state_30519__$1 = (function (){var statearr_30526 = state_30519;(statearr_30526[9] = inst_30505);
return statearr_30526;
})();return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_30519__$1,8,inst_30506);
} else
{if((state_val_30520 === 4))
{var inst_30517 = (state_30519[2]);var state_30519__$1 = state_30519;return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_30519__$1,inst_30517);
} else
{if((state_val_30520 === 3))
{var inst_30500 = (state_30519[7]);var inst_30502 = (inst_30500 == null);var inst_30503 = cljs.core.not.call(null,inst_30502);var state_30519__$1 = state_30519;if(inst_30503)
{var statearr_30527_30542 = state_30519__$1;(statearr_30527_30542[1] = 5);
} else
{var statearr_30528_30543 = state_30519__$1;(statearr_30528_30543[1] = 6);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_30520 === 2))
{var inst_30499 = (state_30519[2]);var inst_30500 = inst_30499;var state_30519__$1 = (function (){var statearr_30529 = state_30519;(statearr_30529[7] = inst_30500);
return statearr_30529;
})();var statearr_30530_30544 = state_30519__$1;(statearr_30530_30544[2] = null);
(statearr_30530_30544[1] = 3);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_30520 === 1))
{var state_30519__$1 = state_30519;return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_30519__$1,2,result);
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
var state_machine__5425__auto____0 = (function (){var statearr_30534 = (new Array(10));(statearr_30534[0] = state_machine__5425__auto__);
(statearr_30534[1] = 1);
return statearr_30534;
});
var state_machine__5425__auto____1 = (function (state_30519){while(true){
var ret_value__5426__auto__ = (function (){try{while(true){
var result__5427__auto__ = switch__5424__auto__.call(null,state_30519);if(cljs.core.keyword_identical_QMARK_.call(null,result__5427__auto__,new cljs.core.Keyword(null,"recur","recur",1122293407)))
{{
continue;
}
} else
{return result__5427__auto__;
}
break;
}
}catch (e30535){if((e30535 instanceof Object))
{var ex__5428__auto__ = e30535;var statearr_30536_30545 = state_30519;(statearr_30536_30545[5] = ex__5428__auto__);
cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_30519);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if(new cljs.core.Keyword(null,"else","else",1017020587))
{throw e30535;
} else
{return null;
}
}
}})();if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__5426__auto__,new cljs.core.Keyword(null,"recur","recur",1122293407)))
{{
var G__30546 = state_30519;
state_30519 = G__30546;
continue;
}
} else
{return ret_value__5426__auto__;
}
break;
}
});
state_machine__5425__auto__ = function(state_30519){
switch(arguments.length){
case 0:
return state_machine__5425__auto____0.call(this);
case 1:
return state_machine__5425__auto____1.call(this,state_30519);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
state_machine__5425__auto__.cljs$core$IFn$_invoke$arity$0 = state_machine__5425__auto____0;
state_machine__5425__auto__.cljs$core$IFn$_invoke$arity$1 = state_machine__5425__auto____1;
return state_machine__5425__auto__;
})()
;})(switch__5424__auto__))
})();var state__5496__auto__ = (function (){var statearr_30537 = f__5495__auto__.call(null);(statearr_30537[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__5494__auto___30538);
return statearr_30537;
})();return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__5496__auto__);
}));
return result;
});
vince.core.primeToTA = (function primeToTA(taChan,primeChan){var c__5494__auto__ = cljs.core.async.chan.call(null,1);cljs.core.async.impl.dispatch.run.call(null,(function (){var f__5495__auto__ = (function (){var switch__5424__auto__ = (function (state_30601){var state_val_30602 = (state_30601[1]);if((state_val_30602 === 8))
{var inst_30585 = (state_30601[7]);var inst_30590 = (state_30601[2]);var inst_30591 = (inst_30585 + 1);var inst_30585__$1 = inst_30591;var state_30601__$1 = (function (){var statearr_30603 = state_30601;(statearr_30603[7] = inst_30585__$1);
(statearr_30603[8] = inst_30590);
return statearr_30603;
})();var statearr_30604_30619 = state_30601__$1;(statearr_30604_30619[2] = null);
(statearr_30604_30619[1] = 3);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_30602 === 7))
{var inst_30595 = (state_30601[2]);var state_30601__$1 = state_30601;var statearr_30605_30620 = state_30601__$1;(statearr_30605_30620[2] = inst_30595);
(statearr_30605_30620[1] = 4);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_30602 === 6))
{var state_30601__$1 = state_30601;var statearr_30606_30621 = state_30601__$1;(statearr_30606_30621[2] = null);
(statearr_30606_30621[1] = 7);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_30602 === 5))
{var state_30601__$1 = state_30601;return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_30601__$1,8,primeChan);
} else
{if((state_val_30602 === 4))
{var inst_30597 = (state_30601[2]);var inst_30598 = cljs.core.async.take.call(null,1000,primeChan);var inst_30599 = cljs.core.async.pipe.call(null,inst_30598,taChan);var state_30601__$1 = (function (){var statearr_30607 = state_30601;(statearr_30607[9] = inst_30597);
return statearr_30607;
})();return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_30601__$1,inst_30599);
} else
{if((state_val_30602 === 3))
{var inst_30585 = (state_30601[7]);var inst_30587 = (inst_30585 < 1000);var state_30601__$1 = state_30601;if(cljs.core.truth_(inst_30587))
{var statearr_30608_30622 = state_30601__$1;(statearr_30608_30622[1] = 5);
} else
{var statearr_30609_30623 = state_30601__$1;(statearr_30609_30623[1] = 6);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_30602 === 2))
{var inst_30584 = (state_30601[2]);var inst_30585 = 0;var state_30601__$1 = (function (){var statearr_30610 = state_30601;(statearr_30610[7] = inst_30585);
(statearr_30610[10] = inst_30584);
return statearr_30610;
})();var statearr_30611_30624 = state_30601__$1;(statearr_30611_30624[2] = null);
(statearr_30611_30624[1] = 3);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_30602 === 1))
{var state_30601__$1 = state_30601;return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_30601__$1,2,taChan,"Ignore the first 1000 primes");
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
var state_machine__5425__auto____0 = (function (){var statearr_30615 = (new Array(11));(statearr_30615[0] = state_machine__5425__auto__);
(statearr_30615[1] = 1);
return statearr_30615;
});
var state_machine__5425__auto____1 = (function (state_30601){while(true){
var ret_value__5426__auto__ = (function (){try{while(true){
var result__5427__auto__ = switch__5424__auto__.call(null,state_30601);if(cljs.core.keyword_identical_QMARK_.call(null,result__5427__auto__,new cljs.core.Keyword(null,"recur","recur",1122293407)))
{{
continue;
}
} else
{return result__5427__auto__;
}
break;
}
}catch (e30616){if((e30616 instanceof Object))
{var ex__5428__auto__ = e30616;var statearr_30617_30625 = state_30601;(statearr_30617_30625[5] = ex__5428__auto__);
cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_30601);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if(new cljs.core.Keyword(null,"else","else",1017020587))
{throw e30616;
} else
{return null;
}
}
}})();if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__5426__auto__,new cljs.core.Keyword(null,"recur","recur",1122293407)))
{{
var G__30626 = state_30601;
state_30601 = G__30626;
continue;
}
} else
{return ret_value__5426__auto__;
}
break;
}
});
state_machine__5425__auto__ = function(state_30601){
switch(arguments.length){
case 0:
return state_machine__5425__auto____0.call(this);
case 1:
return state_machine__5425__auto____1.call(this,state_30601);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
state_machine__5425__auto__.cljs$core$IFn$_invoke$arity$0 = state_machine__5425__auto____0;
state_machine__5425__auto__.cljs$core$IFn$_invoke$arity$1 = state_machine__5425__auto____1;
return state_machine__5425__auto__;
})()
;})(switch__5424__auto__))
})();var state__5496__auto__ = (function (){var statearr_30618 = f__5495__auto__.call(null);(statearr_30618[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__5494__auto__);
return statearr_30618;
})();return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__5496__auto__);
}));
return c__5494__auto__;
});
vince.core.testPrime2 = (function testPrime2(){var prime1 = vince.core.printTA.call(null,vince.core.by_id.call(null,"prime1"),1);var prime1_chan = examples.prime.chan_primes.call(null);var prime2 = vince.core.printTA.call(null,vince.core.by_id.call(null,"prime2"),1);var prime2_chan = examples.prime.chan_primes.call(null);var prime3 = vince.core.printTA.call(null,vince.core.by_id.call(null,"prime3"),1);var prime3_chan = examples.prime.chan_primes.call(null);var prime4 = vince.core.printTA.call(null,vince.core.by_id.call(null,"prime4"),1);var prime4_chan = examples.prime.chan_primes.call(null);vince.core.primeToTA.call(null,prime1,prime1_chan);
vince.core.primeToTA.call(null,prime2,prime2_chan);
vince.core.primeToTA.call(null,prime3,prime3_chan);
return vince.core.primeToTA.call(null,prime4,prime4_chan);
});
