// Compiled by ClojureScript 0.0-2030
goog.provide('cljs.core.async.impl.ioc_helpers');
goog.require('cljs.core');
goog.require('cljs.core.async.impl.protocols');
goog.require('cljs.core.async.impl.protocols');
cljs.core.async.impl.ioc_helpers.FN_IDX = 0;
cljs.core.async.impl.ioc_helpers.STATE_IDX = 1;
cljs.core.async.impl.ioc_helpers.VALUE_IDX = 2;
cljs.core.async.impl.ioc_helpers.BINDINGS_IDX = 3;
cljs.core.async.impl.ioc_helpers.EXCEPTION_FRAMES = 4;
cljs.core.async.impl.ioc_helpers.CURRENT_EXCEPTION = 5;
cljs.core.async.impl.ioc_helpers.USER_START_IDX = 6;
cljs.core.async.impl.ioc_helpers.aset_object = (function aset_object(arr,idx,o){return (arr[idx][o]);
});
cljs.core.async.impl.ioc_helpers.aget_object = (function aget_object(arr,idx){return (arr[idx]);
});
/**
* Returns true if the machine is in a finished state
*/
cljs.core.async.impl.ioc_helpers.finished_QMARK_ = (function finished_QMARK_(state_array){return cljs.core.keyword_identical_QMARK_.call(null,(state_array[cljs.core.async.impl.ioc_helpers.STATE_IDX]),new cljs.core.Keyword(null,"finished","finished",4635210724));
});
cljs.core.async.impl.ioc_helpers.fn_handler = (function fn_handler(f){if(typeof cljs.core.async.impl.ioc_helpers.t20731 !== 'undefined')
{} else
{
/**
* @constructor
*/
cljs.core.async.impl.ioc_helpers.t20731 = (function (f,fn_handler,meta20732){
this.f = f;
this.fn_handler = fn_handler;
this.meta20732 = meta20732;
this.cljs$lang$protocol_mask$partition1$ = 0;
this.cljs$lang$protocol_mask$partition0$ = 393216;
})
cljs.core.async.impl.ioc_helpers.t20731.cljs$lang$type = true;
cljs.core.async.impl.ioc_helpers.t20731.cljs$lang$ctorStr = "cljs.core.async.impl.ioc-helpers/t20731";
cljs.core.async.impl.ioc_helpers.t20731.cljs$lang$ctorPrWriter = (function (this__3670__auto__,writer__3671__auto__,opt__3672__auto__){return cljs.core._write.call(null,writer__3671__auto__,"cljs.core.async.impl.ioc-helpers/t20731");
});
cljs.core.async.impl.ioc_helpers.t20731.prototype.cljs$core$async$impl$protocols$Handler$ = true;
cljs.core.async.impl.ioc_helpers.t20731.prototype.cljs$core$async$impl$protocols$Handler$active_QMARK_$arity$1 = (function (_){var self__ = this;
var ___$1 = this;return true;
});
cljs.core.async.impl.ioc_helpers.t20731.prototype.cljs$core$async$impl$protocols$Handler$commit$arity$1 = (function (_){var self__ = this;
var ___$1 = this;return self__.f;
});
cljs.core.async.impl.ioc_helpers.t20731.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_20733){var self__ = this;
var _20733__$1 = this;return self__.meta20732;
});
cljs.core.async.impl.ioc_helpers.t20731.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_20733,meta20732__$1){var self__ = this;
var _20733__$1 = this;return (new cljs.core.async.impl.ioc_helpers.t20731(self__.f,self__.fn_handler,meta20732__$1));
});
cljs.core.async.impl.ioc_helpers.__GT_t20731 = (function __GT_t20731(f__$1,fn_handler__$1,meta20732){return (new cljs.core.async.impl.ioc_helpers.t20731(f__$1,fn_handler__$1,meta20732));
});
}
return (new cljs.core.async.impl.ioc_helpers.t20731(f,fn_handler,null));
});
cljs.core.async.impl.ioc_helpers.run_state_machine = (function run_state_machine(state){return cljs.core.async.impl.ioc_helpers.aget_object.call(null,state,cljs.core.async.impl.ioc_helpers.FN_IDX).call(null,state);
});
cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped = (function run_state_machine_wrapped(state){try{return cljs.core.async.impl.ioc_helpers.run_state_machine.call(null,state);
}catch (e20735){if((e20735 instanceof Object))
{var ex = e20735;cljs.core.async.impl.protocols.close_BANG_.call(null,cljs.core.async.impl.ioc_helpers.aget_object.call(null,state,cljs.core.async.impl.ioc_helpers.USER_START_IDX));
throw ex;
} else
{if(new cljs.core.Keyword(null,"else","else",1017020587))
{throw e20735;
} else
{return null;
}
}
}});
cljs.core.async.impl.ioc_helpers.take_BANG_ = (function take_BANG_(state,blk,c){var temp__4090__auto__ = cljs.core.async.impl.protocols.take_BANG_.call(null,c,cljs.core.async.impl.ioc_helpers.fn_handler.call(null,(function (x){var statearr_20738_20740 = state;(statearr_20738_20740[cljs.core.async.impl.ioc_helpers.VALUE_IDX] = x);
(statearr_20738_20740[cljs.core.async.impl.ioc_helpers.STATE_IDX] = blk);
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state);
})));if(cljs.core.truth_(temp__4090__auto__))
{var cb = temp__4090__auto__;var statearr_20739_20741 = state;(statearr_20739_20741[cljs.core.async.impl.ioc_helpers.VALUE_IDX] = cljs.core.deref.call(null,cb));
(statearr_20739_20741[cljs.core.async.impl.ioc_helpers.STATE_IDX] = blk);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{return null;
}
});
cljs.core.async.impl.ioc_helpers.put_BANG_ = (function put_BANG_(state,blk,c,val){var temp__4090__auto__ = cljs.core.async.impl.protocols.put_BANG_.call(null,c,val,cljs.core.async.impl.ioc_helpers.fn_handler.call(null,(function (){var statearr_20744_20746 = state;(statearr_20744_20746[cljs.core.async.impl.ioc_helpers.VALUE_IDX] = null);
(statearr_20744_20746[cljs.core.async.impl.ioc_helpers.STATE_IDX] = blk);
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state);
})));if(cljs.core.truth_(temp__4090__auto__))
{var cb = temp__4090__auto__;var statearr_20745_20747 = state;(statearr_20745_20747[cljs.core.async.impl.ioc_helpers.VALUE_IDX] = cljs.core.deref.call(null,cb));
(statearr_20745_20747[cljs.core.async.impl.ioc_helpers.STATE_IDX] = blk);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{return null;
}
});
/**
* @param {...*} var_args
*/
cljs.core.async.impl.ioc_helpers.ioc_alts_BANG_ = (function() { 
var ioc_alts_BANG___delegate = function (state,cont_block,ports,p__20748){var map__20753 = p__20748;var map__20753__$1 = ((cljs.core.seq_QMARK_.call(null,map__20753))?cljs.core.apply.call(null,cljs.core.hash_map,map__20753):map__20753);var opts = map__20753__$1;var statearr_20754_20757 = state;(statearr_20754_20757[cljs.core.async.impl.ioc_helpers.STATE_IDX] = cont_block);
var temp__4092__auto__ = cljs.core.async.do_alts.call(null,(function (val){var statearr_20755_20758 = state;(statearr_20755_20758[cljs.core.async.impl.ioc_helpers.VALUE_IDX] = val);
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state);
}),ports,opts);if(cljs.core.truth_(temp__4092__auto__))
{var cb = temp__4092__auto__;var statearr_20756_20759 = state;(statearr_20756_20759[cljs.core.async.impl.ioc_helpers.VALUE_IDX] = cljs.core.deref.call(null,cb));
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{return null;
}
};
var ioc_alts_BANG_ = function (state,cont_block,ports,var_args){
var p__20748 = null;if (arguments.length > 3) {
  p__20748 = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3),0);} 
return ioc_alts_BANG___delegate.call(this,state,cont_block,ports,p__20748);};
ioc_alts_BANG_.cljs$lang$maxFixedArity = 3;
ioc_alts_BANG_.cljs$lang$applyTo = (function (arglist__20760){
var state = cljs.core.first(arglist__20760);
arglist__20760 = cljs.core.next(arglist__20760);
var cont_block = cljs.core.first(arglist__20760);
arglist__20760 = cljs.core.next(arglist__20760);
var ports = cljs.core.first(arglist__20760);
var p__20748 = cljs.core.rest(arglist__20760);
return ioc_alts_BANG___delegate(state,cont_block,ports,p__20748);
});
ioc_alts_BANG_.cljs$core$IFn$_invoke$arity$variadic = ioc_alts_BANG___delegate;
return ioc_alts_BANG_;
})()
;
cljs.core.async.impl.ioc_helpers.return_chan = (function return_chan(state,value){var c = (state[cljs.core.async.impl.ioc_helpers.USER_START_IDX]);if((value == null))
{} else
{cljs.core.async.impl.protocols.put_BANG_.call(null,c,value,cljs.core.async.impl.ioc_helpers.fn_handler.call(null,(function (){return null;
})));
}
cljs.core.async.impl.protocols.close_BANG_.call(null,c);
return c;
});

/**
* @constructor
* @param {*} catch_block
* @param {*} catch_exception
* @param {*} finally_block
* @param {*} continue_block
* @param {*} prev
* @param {*} __meta
* @param {*} __extmap
* @param {*=} __meta 
* @param {*=} __extmap
*/
cljs.core.async.impl.ioc_helpers.ExceptionFrame = (function (catch_block,catch_exception,finally_block,continue_block,prev,__meta,__extmap){
this.catch_block = catch_block;
this.catch_exception = catch_exception;
this.finally_block = finally_block;
this.continue_block = continue_block;
this.prev = prev;
this.__meta = __meta;
this.__extmap = __extmap;
this.cljs$lang$protocol_mask$partition1$ = 0;
this.cljs$lang$protocol_mask$partition0$ = 2229667594;
if(arguments.length>5){
this.__meta = __meta;
this.__extmap = __extmap;
} else {
this.__meta=null;
this.__extmap=null;
}
})
cljs.core.async.impl.ioc_helpers.ExceptionFrame.prototype.cljs$core$IHash$_hash$arity$1 = (function (this__3683__auto__){var self__ = this;
var this__3683__auto____$1 = this;var h__3537__auto__ = self__.__hash;if(!((h__3537__auto__ == null)))
{return h__3537__auto__;
} else
{var h__3537__auto____$1 = cljs.core.hash_imap.call(null,this__3683__auto____$1);self__.__hash = h__3537__auto____$1;
return h__3537__auto____$1;
}
});
cljs.core.async.impl.ioc_helpers.ExceptionFrame.prototype.cljs$core$ILookup$_lookup$arity$2 = (function (this__3688__auto__,k__3689__auto__){var self__ = this;
var this__3688__auto____$1 = this;return cljs.core._lookup.call(null,this__3688__auto____$1,k__3689__auto__,null);
});
cljs.core.async.impl.ioc_helpers.ExceptionFrame.prototype.cljs$core$ILookup$_lookup$arity$3 = (function (this__3690__auto__,k20762,else__3691__auto__){var self__ = this;
var this__3690__auto____$1 = this;if(cljs.core.keyword_identical_QMARK_.call(null,k20762,new cljs.core.Keyword(null,"catch-block","catch-block",2343862893)))
{return self__.catch_block;
} else
{if(cljs.core.keyword_identical_QMARK_.call(null,k20762,new cljs.core.Keyword(null,"catch-exception","catch-exception",1686480687)))
{return self__.catch_exception;
} else
{if(cljs.core.keyword_identical_QMARK_.call(null,k20762,new cljs.core.Keyword(null,"finally-block","finally-block",2846533429)))
{return self__.finally_block;
} else
{if(cljs.core.keyword_identical_QMARK_.call(null,k20762,new cljs.core.Keyword(null,"continue-block","continue-block",1486987097)))
{return self__.continue_block;
} else
{if(cljs.core.keyword_identical_QMARK_.call(null,k20762,new cljs.core.Keyword(null,"prev","prev",1017353637)))
{return self__.prev;
} else
{if(new cljs.core.Keyword(null,"else","else",1017020587))
{return cljs.core.get.call(null,self__.__extmap,k20762,else__3691__auto__);
} else
{return null;
}
}
}
}
}
}
});
cljs.core.async.impl.ioc_helpers.ExceptionFrame.prototype.cljs$core$IAssociative$_assoc$arity$3 = (function (this__3695__auto__,k__3696__auto__,G__20761){var self__ = this;
var this__3695__auto____$1 = this;var pred__20764 = cljs.core.keyword_identical_QMARK_;var expr__20765 = k__3696__auto__;if(pred__20764.call(null,new cljs.core.Keyword(null,"catch-block","catch-block",2343862893),expr__20765))
{return (new cljs.core.async.impl.ioc_helpers.ExceptionFrame(G__20761,self__.catch_exception,self__.finally_block,self__.continue_block,self__.prev,self__.__meta,self__.__extmap,null));
} else
{if(pred__20764.call(null,new cljs.core.Keyword(null,"catch-exception","catch-exception",1686480687),expr__20765))
{return (new cljs.core.async.impl.ioc_helpers.ExceptionFrame(self__.catch_block,G__20761,self__.finally_block,self__.continue_block,self__.prev,self__.__meta,self__.__extmap,null));
} else
{if(pred__20764.call(null,new cljs.core.Keyword(null,"finally-block","finally-block",2846533429),expr__20765))
{return (new cljs.core.async.impl.ioc_helpers.ExceptionFrame(self__.catch_block,self__.catch_exception,G__20761,self__.continue_block,self__.prev,self__.__meta,self__.__extmap,null));
} else
{if(pred__20764.call(null,new cljs.core.Keyword(null,"continue-block","continue-block",1486987097),expr__20765))
{return (new cljs.core.async.impl.ioc_helpers.ExceptionFrame(self__.catch_block,self__.catch_exception,self__.finally_block,G__20761,self__.prev,self__.__meta,self__.__extmap,null));
} else
{if(pred__20764.call(null,new cljs.core.Keyword(null,"prev","prev",1017353637),expr__20765))
{return (new cljs.core.async.impl.ioc_helpers.ExceptionFrame(self__.catch_block,self__.catch_exception,self__.finally_block,self__.continue_block,G__20761,self__.__meta,self__.__extmap,null));
} else
{return (new cljs.core.async.impl.ioc_helpers.ExceptionFrame(self__.catch_block,self__.catch_exception,self__.finally_block,self__.continue_block,self__.prev,self__.__meta,cljs.core.assoc.call(null,self__.__extmap,k__3696__auto__,G__20761),null));
}
}
}
}
}
});
cljs.core.async.impl.ioc_helpers.ExceptionFrame.prototype.cljs$core$IPrintWithWriter$_pr_writer$arity$3 = (function (this__3702__auto__,writer__3703__auto__,opts__3704__auto__){var self__ = this;
var this__3702__auto____$1 = this;var pr_pair__3705__auto__ = (function (keyval__3706__auto__){return cljs.core.pr_sequential_writer.call(null,writer__3703__auto__,cljs.core.pr_writer,""," ","",opts__3704__auto__,keyval__3706__auto__);
});return cljs.core.pr_sequential_writer.call(null,writer__3703__auto__,pr_pair__3705__auto__,"#cljs.core.async.impl.ioc-helpers.ExceptionFrame{",", ","}",opts__3704__auto__,cljs.core.concat.call(null,cljs.core.PersistentVector.fromArray([cljs.core.PersistentVector.fromArray.call(null,[new cljs.core.Keyword(null,"catch-block","catch-block",2343862893),self__.catch_block],true),cljs.core.PersistentVector.fromArray.call(null,[new cljs.core.Keyword(null,"catch-exception","catch-exception",1686480687),self__.catch_exception],true),cljs.core.PersistentVector.fromArray.call(null,[new cljs.core.Keyword(null,"finally-block","finally-block",2846533429),self__.finally_block],true),cljs.core.PersistentVector.fromArray.call(null,[new cljs.core.Keyword(null,"continue-block","continue-block",1486987097),self__.continue_block],true),cljs.core.PersistentVector.fromArray.call(null,[new cljs.core.Keyword(null,"prev","prev",1017353637),self__.prev],true)], true),self__.__extmap));
});
cljs.core.async.impl.ioc_helpers.ExceptionFrame.prototype.cljs$core$ICollection$_conj$arity$2 = (function (this__3693__auto__,entry__3694__auto__){var self__ = this;
var this__3693__auto____$1 = this;if(cljs.core.vector_QMARK_.call(null,entry__3694__auto__))
{return cljs.core._assoc.call(null,this__3693__auto____$1,cljs.core._nth.call(null,entry__3694__auto__,0),cljs.core._nth.call(null,entry__3694__auto__,1));
} else
{return cljs.core.reduce.call(null,cljs.core._conj,this__3693__auto____$1,entry__3694__auto__);
}
});
cljs.core.async.impl.ioc_helpers.ExceptionFrame.prototype.cljs$core$ISeqable$_seq$arity$1 = (function (this__3700__auto__){var self__ = this;
var this__3700__auto____$1 = this;return cljs.core.seq.call(null,cljs.core.concat.call(null,cljs.core.PersistentVector.fromArray([cljs.core.PersistentVector.fromArray.call(null,[new cljs.core.Keyword(null,"catch-block","catch-block",2343862893),self__.catch_block],true),cljs.core.PersistentVector.fromArray.call(null,[new cljs.core.Keyword(null,"catch-exception","catch-exception",1686480687),self__.catch_exception],true),cljs.core.PersistentVector.fromArray.call(null,[new cljs.core.Keyword(null,"finally-block","finally-block",2846533429),self__.finally_block],true),cljs.core.PersistentVector.fromArray.call(null,[new cljs.core.Keyword(null,"continue-block","continue-block",1486987097),self__.continue_block],true),cljs.core.PersistentVector.fromArray.call(null,[new cljs.core.Keyword(null,"prev","prev",1017353637),self__.prev],true)], true),self__.__extmap));
});
cljs.core.async.impl.ioc_helpers.ExceptionFrame.prototype.cljs$core$ICounted$_count$arity$1 = (function (this__3692__auto__){var self__ = this;
var this__3692__auto____$1 = this;return (5 + cljs.core.count.call(null,self__.__extmap));
});
cljs.core.async.impl.ioc_helpers.ExceptionFrame.prototype.cljs$core$IEquiv$_equiv$arity$2 = (function (this__3684__auto__,other__3685__auto__){var self__ = this;
var this__3684__auto____$1 = this;if(cljs.core.truth_((function (){var and__3124__auto__ = other__3685__auto__;if(cljs.core.truth_(and__3124__auto__))
{var and__3124__auto____$1 = (this__3684__auto____$1.constructor === other__3685__auto__.constructor);if(and__3124__auto____$1)
{return cljs.core.equiv_map.call(null,this__3684__auto____$1,other__3685__auto__);
} else
{return and__3124__auto____$1;
}
} else
{return and__3124__auto__;
}
})()))
{return true;
} else
{return false;
}
});
cljs.core.async.impl.ioc_helpers.ExceptionFrame.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (this__3687__auto__,G__20761){var self__ = this;
var this__3687__auto____$1 = this;return (new cljs.core.async.impl.ioc_helpers.ExceptionFrame(self__.catch_block,self__.catch_exception,self__.finally_block,self__.continue_block,self__.prev,G__20761,self__.__extmap,self__.__hash));
});
cljs.core.async.impl.ioc_helpers.ExceptionFrame.prototype.cljs$core$IMeta$_meta$arity$1 = (function (this__3686__auto__){var self__ = this;
var this__3686__auto____$1 = this;return self__.__meta;
});
cljs.core.async.impl.ioc_helpers.ExceptionFrame.prototype.cljs$core$IMap$_dissoc$arity$2 = (function (this__3697__auto__,k__3698__auto__){var self__ = this;
var this__3697__auto____$1 = this;if(cljs.core.contains_QMARK_.call(null,cljs.core.PersistentHashSet.fromArray([new cljs.core.Keyword(null,"finally-block","finally-block",2846533429),null,new cljs.core.Keyword(null,"catch-block","catch-block",2343862893),null,new cljs.core.Keyword(null,"catch-exception","catch-exception",1686480687),null,new cljs.core.Keyword(null,"continue-block","continue-block",1486987097),null,new cljs.core.Keyword(null,"prev","prev",1017353637),null], true),k__3698__auto__))
{return cljs.core.dissoc.call(null,cljs.core.with_meta.call(null,cljs.core.into.call(null,cljs.core.PersistentArrayMap.EMPTY,this__3697__auto____$1),self__.__meta),k__3698__auto__);
} else
{return (new cljs.core.async.impl.ioc_helpers.ExceptionFrame(self__.catch_block,self__.catch_exception,self__.finally_block,self__.continue_block,self__.prev,self__.__meta,cljs.core.not_empty.call(null,cljs.core.dissoc.call(null,self__.__extmap,k__3698__auto__)),null));
}
});
cljs.core.async.impl.ioc_helpers.ExceptionFrame.cljs$lang$type = true;
cljs.core.async.impl.ioc_helpers.ExceptionFrame.cljs$lang$ctorPrSeq = (function (this__3722__auto__){return cljs.core._conj.call(null,cljs.core.List.EMPTY,"cljs.core.async.impl.ioc-helpers/ExceptionFrame");
});
cljs.core.async.impl.ioc_helpers.ExceptionFrame.cljs$lang$ctorPrWriter = (function (this__3722__auto__,writer__3723__auto__){return cljs.core._write.call(null,writer__3723__auto__,"cljs.core.async.impl.ioc-helpers/ExceptionFrame");
});
cljs.core.async.impl.ioc_helpers.__GT_ExceptionFrame = (function __GT_ExceptionFrame(catch_block,catch_exception,finally_block,continue_block,prev){return (new cljs.core.async.impl.ioc_helpers.ExceptionFrame(catch_block,catch_exception,finally_block,continue_block,prev));
});
cljs.core.async.impl.ioc_helpers.map__GT_ExceptionFrame = (function map__GT_ExceptionFrame(G__20763){return (new cljs.core.async.impl.ioc_helpers.ExceptionFrame(new cljs.core.Keyword(null,"catch-block","catch-block",2343862893).cljs$core$IFn$_invoke$arity$1(G__20763),new cljs.core.Keyword(null,"catch-exception","catch-exception",1686480687).cljs$core$IFn$_invoke$arity$1(G__20763),new cljs.core.Keyword(null,"finally-block","finally-block",2846533429).cljs$core$IFn$_invoke$arity$1(G__20763),new cljs.core.Keyword(null,"continue-block","continue-block",1486987097).cljs$core$IFn$_invoke$arity$1(G__20763),new cljs.core.Keyword(null,"prev","prev",1017353637).cljs$core$IFn$_invoke$arity$1(G__20763),null,cljs.core.dissoc.call(null,G__20763,new cljs.core.Keyword(null,"catch-block","catch-block",2343862893),new cljs.core.Keyword(null,"catch-exception","catch-exception",1686480687),new cljs.core.Keyword(null,"finally-block","finally-block",2846533429),new cljs.core.Keyword(null,"continue-block","continue-block",1486987097),new cljs.core.Keyword(null,"prev","prev",1017353637))));
});
cljs.core.async.impl.ioc_helpers.add_exception_frame = (function add_exception_frame(state,catch_block,catch_exception,finally_block,continue_block){var statearr_20768 = state;(statearr_20768[cljs.core.async.impl.ioc_helpers.EXCEPTION_FRAMES] = cljs.core.async.impl.ioc_helpers.__GT_ExceptionFrame.call(null,catch_block,catch_exception,finally_block,continue_block,cljs.core.async.impl.ioc_helpers.aget_object.call(null,state,cljs.core.async.impl.ioc_helpers.EXCEPTION_FRAMES)));
return statearr_20768;
});
cljs.core.async.impl.ioc_helpers.process_exception = (function process_exception(state){while(true){
var exception_frame = cljs.core.async.impl.ioc_helpers.aget_object.call(null,state,cljs.core.async.impl.ioc_helpers.EXCEPTION_FRAMES);var catch_block = new cljs.core.Keyword(null,"catch-block","catch-block",2343862893).cljs$core$IFn$_invoke$arity$1(exception_frame);var catch_exception = new cljs.core.Keyword(null,"catch-exception","catch-exception",1686480687).cljs$core$IFn$_invoke$arity$1(exception_frame);var exception = cljs.core.async.impl.ioc_helpers.aget_object.call(null,state,cljs.core.async.impl.ioc_helpers.CURRENT_EXCEPTION);if(cljs.core.truth_((function (){var and__3124__auto__ = exception;if(cljs.core.truth_(and__3124__auto__))
{return cljs.core.not.call(null,exception_frame);
} else
{return and__3124__auto__;
}
})()))
{throw exception;
} else
{if(cljs.core.truth_((function (){var and__3124__auto__ = exception;if(cljs.core.truth_(and__3124__auto__))
{var and__3124__auto____$1 = catch_block;if(cljs.core.truth_(and__3124__auto____$1))
{return (exception instanceof catch_exception);
} else
{return and__3124__auto____$1;
}
} else
{return and__3124__auto__;
}
})()))
{var statearr_20774 = state;(statearr_20774[cljs.core.async.impl.ioc_helpers.STATE_IDX] = catch_block);
(statearr_20774[cljs.core.async.impl.ioc_helpers.VALUE_IDX] = exception);
(statearr_20774[cljs.core.async.impl.ioc_helpers.CURRENT_EXCEPTION] = null);
(statearr_20774[cljs.core.async.impl.ioc_helpers.EXCEPTION_FRAMES] = cljs.core.assoc.call(null,exception_frame,new cljs.core.Keyword(null,"catch-block","catch-block",2343862893),null,new cljs.core.Keyword(null,"catch-exception","catch-exception",1686480687),null));
return statearr_20774;
} else
{if(cljs.core.truth_((function (){var and__3124__auto__ = exception;if(cljs.core.truth_(and__3124__auto__))
{return (cljs.core.not.call(null,catch_block)) && (cljs.core.not.call(null,new cljs.core.Keyword(null,"finally-block","finally-block",2846533429).cljs$core$IFn$_invoke$arity$1(exception_frame)));
} else
{return and__3124__auto__;
}
})()))
{var statearr_20775_20779 = state;(statearr_20775_20779[cljs.core.async.impl.ioc_helpers.EXCEPTION_FRAMES] = new cljs.core.Keyword(null,"prev","prev",1017353637).cljs$core$IFn$_invoke$arity$1(exception_frame));
{
var G__20780 = state;
state = G__20780;
continue;
}
} else
{if(cljs.core.truth_((function (){var and__3124__auto__ = exception;if(cljs.core.truth_(and__3124__auto__))
{var and__3124__auto____$1 = cljs.core.not.call(null,catch_block);if(and__3124__auto____$1)
{return new cljs.core.Keyword(null,"finally-block","finally-block",2846533429).cljs$core$IFn$_invoke$arity$1(exception_frame);
} else
{return and__3124__auto____$1;
}
} else
{return and__3124__auto__;
}
})()))
{var statearr_20776 = state;(statearr_20776[cljs.core.async.impl.ioc_helpers.STATE_IDX] = new cljs.core.Keyword(null,"finally-block","finally-block",2846533429).cljs$core$IFn$_invoke$arity$1(exception_frame));
(statearr_20776[cljs.core.async.impl.ioc_helpers.EXCEPTION_FRAMES] = cljs.core.assoc.call(null,exception_frame,new cljs.core.Keyword(null,"finally-block","finally-block",2846533429),null));
return statearr_20776;
} else
{if(cljs.core.truth_((function (){var and__3124__auto__ = cljs.core.not.call(null,exception);if(and__3124__auto__)
{return new cljs.core.Keyword(null,"finally-block","finally-block",2846533429).cljs$core$IFn$_invoke$arity$1(exception_frame);
} else
{return and__3124__auto__;
}
})()))
{var statearr_20777 = state;(statearr_20777[cljs.core.async.impl.ioc_helpers.STATE_IDX] = new cljs.core.Keyword(null,"finally-block","finally-block",2846533429).cljs$core$IFn$_invoke$arity$1(exception_frame));
(statearr_20777[cljs.core.async.impl.ioc_helpers.EXCEPTION_FRAMES] = cljs.core.assoc.call(null,exception_frame,new cljs.core.Keyword(null,"finally-block","finally-block",2846533429),null));
return statearr_20777;
} else
{if((cljs.core.not.call(null,exception)) && (cljs.core.not.call(null,new cljs.core.Keyword(null,"finally-block","finally-block",2846533429).cljs$core$IFn$_invoke$arity$1(exception_frame))))
{var statearr_20778 = state;(statearr_20778[cljs.core.async.impl.ioc_helpers.STATE_IDX] = new cljs.core.Keyword(null,"continue-block","continue-block",1486987097).cljs$core$IFn$_invoke$arity$1(exception_frame));
(statearr_20778[cljs.core.async.impl.ioc_helpers.EXCEPTION_FRAMES] = new cljs.core.Keyword(null,"prev","prev",1017353637).cljs$core$IFn$_invoke$arity$1(exception_frame));
return statearr_20778;
} else
{if(new cljs.core.Keyword(null,"else","else",1017020587))
{if(false)
{return null;
} else
{throw (new Error([cljs.core.str("Assert failed: "),cljs.core.str("No matching clause"),cljs.core.str("\n"),cljs.core.str(cljs.core.pr_str.call(null,false))].join('')));
}
} else
{return null;
}
}
}
}
}
}
}
break;
}
});
