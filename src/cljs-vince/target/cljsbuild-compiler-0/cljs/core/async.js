// Compiled by ClojureScript 0.0-2030
goog.provide('cljs.core.async');
goog.require('cljs.core');
goog.require('cljs.core.async.impl.ioc_helpers');
goog.require('cljs.core.async.impl.protocols');
goog.require('cljs.core.async.impl.buffers');
goog.require('cljs.core.async.impl.timers');
goog.require('cljs.core.async.impl.channels');
goog.require('cljs.core.async.impl.dispatch');
goog.require('cljs.core.async.impl.dispatch');
goog.require('cljs.core.async.impl.buffers');
goog.require('cljs.core.async.impl.protocols');
goog.require('cljs.core.async.impl.timers');
goog.require('cljs.core.async.impl.channels');
goog.require('cljs.core.async.impl.ioc_helpers');
cljs.core.async.fn_handler = (function fn_handler(f){if(typeof cljs.core.async.t18169 !== 'undefined')
{} else
{
/**
* @constructor
*/
cljs.core.async.t18169 = (function (f,fn_handler,meta18170){
this.f = f;
this.fn_handler = fn_handler;
this.meta18170 = meta18170;
this.cljs$lang$protocol_mask$partition1$ = 0;
this.cljs$lang$protocol_mask$partition0$ = 393216;
})
cljs.core.async.t18169.cljs$lang$type = true;
cljs.core.async.t18169.cljs$lang$ctorStr = "cljs.core.async/t18169";
cljs.core.async.t18169.cljs$lang$ctorPrWriter = (function (this__3670__auto__,writer__3671__auto__,opt__3672__auto__){return cljs.core._write.call(null,writer__3671__auto__,"cljs.core.async/t18169");
});
cljs.core.async.t18169.prototype.cljs$core$async$impl$protocols$Handler$ = true;
cljs.core.async.t18169.prototype.cljs$core$async$impl$protocols$Handler$active_QMARK_$arity$1 = (function (_){var self__ = this;
var ___$1 = this;return true;
});
cljs.core.async.t18169.prototype.cljs$core$async$impl$protocols$Handler$commit$arity$1 = (function (_){var self__ = this;
var ___$1 = this;return self__.f;
});
cljs.core.async.t18169.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_18171){var self__ = this;
var _18171__$1 = this;return self__.meta18170;
});
cljs.core.async.t18169.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_18171,meta18170__$1){var self__ = this;
var _18171__$1 = this;return (new cljs.core.async.t18169(self__.f,self__.fn_handler,meta18170__$1));
});
cljs.core.async.__GT_t18169 = (function __GT_t18169(f__$1,fn_handler__$1,meta18170){return (new cljs.core.async.t18169(f__$1,fn_handler__$1,meta18170));
});
}
return (new cljs.core.async.t18169(f,fn_handler,null));
});
/**
* Returns a fixed buffer of size n. When full, puts will block/park.
*/
cljs.core.async.buffer = (function buffer(n){return cljs.core.async.impl.buffers.fixed_buffer.call(null,n);
});
/**
* Returns a buffer of size n. When full, puts will complete but
* val will be dropped (no transfer).
*/
cljs.core.async.dropping_buffer = (function dropping_buffer(n){return cljs.core.async.impl.buffers.dropping_buffer.call(null,n);
});
/**
* Returns a buffer of size n. When full, puts will complete, and be
* buffered, but oldest elements in buffer will be dropped (not
* transferred).
*/
cljs.core.async.sliding_buffer = (function sliding_buffer(n){return cljs.core.async.impl.buffers.sliding_buffer.call(null,n);
});
/**
* Returns true if a channel created with buff will never block. That is to say,
* puts into this buffer will never cause the buffer to be full.
*/
cljs.core.async.unblocking_buffer_QMARK_ = (function unblocking_buffer_QMARK_(buff){var G__18173 = buff;if(G__18173)
{var bit__3752__auto__ = null;if(cljs.core.truth_((function (){var or__3133__auto__ = bit__3752__auto__;if(cljs.core.truth_(or__3133__auto__))
{return or__3133__auto__;
} else
{return G__18173.cljs$core$async$impl$protocols$UnblockingBuffer$;
}
})()))
{return true;
} else
{if((!G__18173.cljs$lang$protocol_mask$partition$))
{return cljs.core.native_satisfies_QMARK_.call(null,cljs.core.async.impl.protocols.UnblockingBuffer,G__18173);
} else
{return false;
}
}
} else
{return cljs.core.native_satisfies_QMARK_.call(null,cljs.core.async.impl.protocols.UnblockingBuffer,G__18173);
}
});
/**
* Creates a channel with an optional buffer. If buf-or-n is a number,
* will create and use a fixed buffer of that size.
*/
cljs.core.async.chan = (function() {
var chan = null;
var chan__0 = (function (){return chan.call(null,null);
});
var chan__1 = (function (buf_or_n){var buf_or_n__$1 = ((cljs.core._EQ_.call(null,buf_or_n,0))?null:buf_or_n);return cljs.core.async.impl.channels.chan.call(null,((typeof buf_or_n__$1 === 'number')?cljs.core.async.buffer.call(null,buf_or_n__$1):buf_or_n__$1));
});
chan = function(buf_or_n){
switch(arguments.length){
case 0:
return chan__0.call(this);
case 1:
return chan__1.call(this,buf_or_n);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
chan.cljs$core$IFn$_invoke$arity$0 = chan__0;
chan.cljs$core$IFn$_invoke$arity$1 = chan__1;
return chan;
})()
;
/**
* Returns a channel that will close after msecs
*/
cljs.core.async.timeout = (function timeout(msecs){return cljs.core.async.impl.timers.timeout.call(null,msecs);
});
/**
* takes a val from port. Must be called inside a (go ...) block. Will
* return nil if closed. Will park if nothing is available.
*/
cljs.core.async._LT__BANG_ = (function _LT__BANG_(port){if(null)
{return null;
} else
{throw (new Error([cljs.core.str("Assert failed: "),cljs.core.str("<! used not in (go ...) block"),cljs.core.str("\n"),cljs.core.str(cljs.core.pr_str.call(null,null))].join('')));
}
});
/**
* Asynchronously takes a val from port, passing to fn1. Will pass nil
* if closed. If on-caller? (default true) is true, and value is
* immediately available, will call fn1 on calling thread.
* Returns nil.
*/
cljs.core.async.take_BANG_ = (function() {
var take_BANG_ = null;
var take_BANG___2 = (function (port,fn1){return take_BANG_.call(null,port,fn1,true);
});
var take_BANG___3 = (function (port,fn1,on_caller_QMARK_){var ret = cljs.core.async.impl.protocols.take_BANG_.call(null,port,cljs.core.async.fn_handler.call(null,fn1));if(cljs.core.truth_(ret))
{var val_18174 = cljs.core.deref.call(null,ret);if(cljs.core.truth_(on_caller_QMARK_))
{fn1.call(null,val_18174);
} else
{cljs.core.async.impl.dispatch.run.call(null,(function (){return fn1.call(null,val_18174);
}));
}
} else
{}
return null;
});
take_BANG_ = function(port,fn1,on_caller_QMARK_){
switch(arguments.length){
case 2:
return take_BANG___2.call(this,port,fn1);
case 3:
return take_BANG___3.call(this,port,fn1,on_caller_QMARK_);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
take_BANG_.cljs$core$IFn$_invoke$arity$2 = take_BANG___2;
take_BANG_.cljs$core$IFn$_invoke$arity$3 = take_BANG___3;
return take_BANG_;
})()
;
cljs.core.async.nop = (function nop(){return null;
});
/**
* puts a val into port. nil values are not allowed. Must be called
* inside a (go ...) block. Will park if no buffer space is available.
*/
cljs.core.async._GT__BANG_ = (function _GT__BANG_(port,val){if(null)
{return null;
} else
{throw (new Error([cljs.core.str("Assert failed: "),cljs.core.str(">! used not in (go ...) block"),cljs.core.str("\n"),cljs.core.str(cljs.core.pr_str.call(null,null))].join('')));
}
});
/**
* Asynchronously puts a val into port, calling fn0 (if supplied) when
* complete. nil values are not allowed. Will throw if closed. If
* on-caller? (default true) is true, and the put is immediately
* accepted, will call fn0 on calling thread.  Returns nil.
*/
cljs.core.async.put_BANG_ = (function() {
var put_BANG_ = null;
var put_BANG___2 = (function (port,val){return put_BANG_.call(null,port,val,cljs.core.async.nop);
});
var put_BANG___3 = (function (port,val,fn0){return put_BANG_.call(null,port,val,fn0,true);
});
var put_BANG___4 = (function (port,val,fn0,on_caller_QMARK_){var ret = cljs.core.async.impl.protocols.put_BANG_.call(null,port,val,cljs.core.async.fn_handler.call(null,fn0));if(cljs.core.truth_((function (){var and__3124__auto__ = ret;if(cljs.core.truth_(and__3124__auto__))
{return cljs.core.not_EQ_.call(null,fn0,cljs.core.async.nop);
} else
{return and__3124__auto__;
}
})()))
{if(cljs.core.truth_(on_caller_QMARK_))
{fn0.call(null);
} else
{cljs.core.async.impl.dispatch.run.call(null,fn0);
}
} else
{}
return null;
});
put_BANG_ = function(port,val,fn0,on_caller_QMARK_){
switch(arguments.length){
case 2:
return put_BANG___2.call(this,port,val);
case 3:
return put_BANG___3.call(this,port,val,fn0);
case 4:
return put_BANG___4.call(this,port,val,fn0,on_caller_QMARK_);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
put_BANG_.cljs$core$IFn$_invoke$arity$2 = put_BANG___2;
put_BANG_.cljs$core$IFn$_invoke$arity$3 = put_BANG___3;
put_BANG_.cljs$core$IFn$_invoke$arity$4 = put_BANG___4;
return put_BANG_;
})()
;
cljs.core.async.close_BANG_ = (function close_BANG_(port){return cljs.core.async.impl.protocols.close_BANG_.call(null,port);
});
cljs.core.async.random_array = (function random_array(n){var a = (new Array(n));var n__3922__auto___18175 = n;var x_18176 = 0;while(true){
if((x_18176 < n__3922__auto___18175))
{(a[x_18176] = 0);
{
var G__18177 = (x_18176 + 1);
x_18176 = G__18177;
continue;
}
} else
{}
break;
}
var i = 1;while(true){
if(cljs.core._EQ_.call(null,i,n))
{return a;
} else
{var j = cljs.core.rand_int.call(null,i);(a[i] = (a[j]));
(a[j] = i);
{
var G__18178 = (i + 1);
i = G__18178;
continue;
}
}
break;
}
});
cljs.core.async.alt_flag = (function alt_flag(){var flag = cljs.core.atom.call(null,true);if(typeof cljs.core.async.t18182 !== 'undefined')
{} else
{
/**
* @constructor
*/
cljs.core.async.t18182 = (function (flag,alt_flag,meta18183){
this.flag = flag;
this.alt_flag = alt_flag;
this.meta18183 = meta18183;
this.cljs$lang$protocol_mask$partition1$ = 0;
this.cljs$lang$protocol_mask$partition0$ = 393216;
})
cljs.core.async.t18182.cljs$lang$type = true;
cljs.core.async.t18182.cljs$lang$ctorStr = "cljs.core.async/t18182";
cljs.core.async.t18182.cljs$lang$ctorPrWriter = (function (this__3670__auto__,writer__3671__auto__,opt__3672__auto__){return cljs.core._write.call(null,writer__3671__auto__,"cljs.core.async/t18182");
});
cljs.core.async.t18182.prototype.cljs$core$async$impl$protocols$Handler$ = true;
cljs.core.async.t18182.prototype.cljs$core$async$impl$protocols$Handler$active_QMARK_$arity$1 = (function (_){var self__ = this;
var ___$1 = this;return cljs.core.deref.call(null,self__.flag);
});
cljs.core.async.t18182.prototype.cljs$core$async$impl$protocols$Handler$commit$arity$1 = (function (_){var self__ = this;
var ___$1 = this;cljs.core.reset_BANG_.call(null,self__.flag,null);
return true;
});
cljs.core.async.t18182.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_18184){var self__ = this;
var _18184__$1 = this;return self__.meta18183;
});
cljs.core.async.t18182.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_18184,meta18183__$1){var self__ = this;
var _18184__$1 = this;return (new cljs.core.async.t18182(self__.flag,self__.alt_flag,meta18183__$1));
});
cljs.core.async.__GT_t18182 = (function __GT_t18182(flag__$1,alt_flag__$1,meta18183){return (new cljs.core.async.t18182(flag__$1,alt_flag__$1,meta18183));
});
}
return (new cljs.core.async.t18182(flag,alt_flag,null));
});
cljs.core.async.alt_handler = (function alt_handler(flag,cb){if(typeof cljs.core.async.t18188 !== 'undefined')
{} else
{
/**
* @constructor
*/
cljs.core.async.t18188 = (function (cb,flag,alt_handler,meta18189){
this.cb = cb;
this.flag = flag;
this.alt_handler = alt_handler;
this.meta18189 = meta18189;
this.cljs$lang$protocol_mask$partition1$ = 0;
this.cljs$lang$protocol_mask$partition0$ = 393216;
})
cljs.core.async.t18188.cljs$lang$type = true;
cljs.core.async.t18188.cljs$lang$ctorStr = "cljs.core.async/t18188";
cljs.core.async.t18188.cljs$lang$ctorPrWriter = (function (this__3670__auto__,writer__3671__auto__,opt__3672__auto__){return cljs.core._write.call(null,writer__3671__auto__,"cljs.core.async/t18188");
});
cljs.core.async.t18188.prototype.cljs$core$async$impl$protocols$Handler$ = true;
cljs.core.async.t18188.prototype.cljs$core$async$impl$protocols$Handler$active_QMARK_$arity$1 = (function (_){var self__ = this;
var ___$1 = this;return cljs.core.async.impl.protocols.active_QMARK_.call(null,self__.flag);
});
cljs.core.async.t18188.prototype.cljs$core$async$impl$protocols$Handler$commit$arity$1 = (function (_){var self__ = this;
var ___$1 = this;cljs.core.async.impl.protocols.commit.call(null,self__.flag);
return self__.cb;
});
cljs.core.async.t18188.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_18190){var self__ = this;
var _18190__$1 = this;return self__.meta18189;
});
cljs.core.async.t18188.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_18190,meta18189__$1){var self__ = this;
var _18190__$1 = this;return (new cljs.core.async.t18188(self__.cb,self__.flag,self__.alt_handler,meta18189__$1));
});
cljs.core.async.__GT_t18188 = (function __GT_t18188(cb__$1,flag__$1,alt_handler__$1,meta18189){return (new cljs.core.async.t18188(cb__$1,flag__$1,alt_handler__$1,meta18189));
});
}
return (new cljs.core.async.t18188(cb,flag,alt_handler,null));
});
/**
* returns derefable [val port] if immediate, nil if enqueued
*/
cljs.core.async.do_alts = (function do_alts(fret,ports,opts){var flag = cljs.core.async.alt_flag.call(null);var n = cljs.core.count.call(null,ports);var idxs = cljs.core.async.random_array.call(null,n);var priority = new cljs.core.Keyword(null,"priority","priority",4143410454).cljs$core$IFn$_invoke$arity$1(opts);var ret = (function (){var i = 0;while(true){
if((i < n))
{var idx = (cljs.core.truth_(priority)?i:(idxs[i]));var port = cljs.core.nth.call(null,ports,idx);var wport = ((cljs.core.vector_QMARK_.call(null,port))?port.call(null,0):null);var vbox = (cljs.core.truth_(wport)?(function (){var val = port.call(null,1);return cljs.core.async.impl.protocols.put_BANG_.call(null,wport,val,cljs.core.async.alt_handler.call(null,flag,((function (i,val,idx,port,wport,flag,n,idxs,priority){
return (function (){return fret.call(null,cljs.core.PersistentVector.fromArray([null,wport], true));
});})(i,val,idx,port,wport,flag,n,idxs,priority))
));
})():cljs.core.async.impl.protocols.take_BANG_.call(null,port,cljs.core.async.alt_handler.call(null,flag,((function (i,idx,port,wport,flag,n,idxs,priority){
return (function (p1__18191_SHARP_){return fret.call(null,cljs.core.PersistentVector.fromArray([p1__18191_SHARP_,port], true));
});})(i,idx,port,wport,flag,n,idxs,priority))
)));if(cljs.core.truth_(vbox))
{return cljs.core.async.impl.channels.box.call(null,cljs.core.PersistentVector.fromArray([cljs.core.deref.call(null,vbox),(function (){var or__3133__auto__ = wport;if(cljs.core.truth_(or__3133__auto__))
{return or__3133__auto__;
} else
{return port;
}
})()], true));
} else
{{
var G__18192 = (i + 1);
i = G__18192;
continue;
}
}
} else
{return null;
}
break;
}
})();var or__3133__auto__ = ret;if(cljs.core.truth_(or__3133__auto__))
{return or__3133__auto__;
} else
{if(cljs.core.contains_QMARK_.call(null,opts,new cljs.core.Keyword(null,"default","default",2558708147)))
{var temp__4092__auto__ = (function (){var and__3124__auto__ = cljs.core.async.impl.protocols.active_QMARK_.call(null,flag);if(cljs.core.truth_(and__3124__auto__))
{return cljs.core.async.impl.protocols.commit.call(null,flag);
} else
{return and__3124__auto__;
}
})();if(cljs.core.truth_(temp__4092__auto__))
{var got = temp__4092__auto__;return cljs.core.async.impl.channels.box.call(null,cljs.core.PersistentVector.fromArray([new cljs.core.Keyword(null,"default","default",2558708147).cljs$core$IFn$_invoke$arity$1(opts),new cljs.core.Keyword(null,"default","default",2558708147)], true));
} else
{return null;
}
} else
{return null;
}
}
});
/**
* Completes at most one of several channel operations. Must be called
* inside a (go ...) block. ports is a vector of channel endpoints, which
* can be either a channel to take from or a vector of
* [channel-to-put-to val-to-put], in any combination. Takes will be
* made as if by <!, and puts will be made as if by >!. Unless
* the :priority option is true, if more than one port operation is
* ready a non-deterministic choice will be made. If no operation is
* ready and a :default value is supplied, [default-val :default] will
* be returned, otherwise alts! will park until the first operation to
* become ready completes. Returns [val port] of the completed
* operation, where val is the value taken for takes, and nil for puts.
* 
* opts are passed as :key val ... Supported options:
* 
* :default val - the value to use if none of the operations are immediately ready
* :priority true - (default nil) when true, the operations will be tried in order.
* 
* Note: there is no guarantee that the port exps or val exprs will be
* used, nor in what order should they be, so they should not be
* depended upon for side effects.
* @param {...*} var_args
*/
cljs.core.async.alts_BANG_ = (function() { 
var alts_BANG___delegate = function (ports,p__18193){var map__18195 = p__18193;var map__18195__$1 = ((cljs.core.seq_QMARK_.call(null,map__18195))?cljs.core.apply.call(null,cljs.core.hash_map,map__18195):map__18195);var opts = map__18195__$1;if(null)
{return null;
} else
{throw (new Error([cljs.core.str("Assert failed: "),cljs.core.str("alts! used not in (go ...) block"),cljs.core.str("\n"),cljs.core.str(cljs.core.pr_str.call(null,null))].join('')));
}
};
var alts_BANG_ = function (ports,var_args){
var p__18193 = null;if (arguments.length > 1) {
  p__18193 = cljs.core.array_seq(Array.prototype.slice.call(arguments, 1),0);} 
return alts_BANG___delegate.call(this,ports,p__18193);};
alts_BANG_.cljs$lang$maxFixedArity = 1;
alts_BANG_.cljs$lang$applyTo = (function (arglist__18196){
var ports = cljs.core.first(arglist__18196);
var p__18193 = cljs.core.rest(arglist__18196);
return alts_BANG___delegate(ports,p__18193);
});
alts_BANG_.cljs$core$IFn$_invoke$arity$variadic = alts_BANG___delegate;
return alts_BANG_;
})()
;
/**
* Takes a function and a source channel, and returns a channel which
* contains the values produced by applying f to each value taken from
* the source channel
*/
cljs.core.async.map_LT_ = (function map_LT_(f,ch){if(typeof cljs.core.async.t18204 !== 'undefined')
{} else
{
/**
* @constructor
*/
cljs.core.async.t18204 = (function (ch,f,map_LT_,meta18205){
this.ch = ch;
this.f = f;
this.map_LT_ = map_LT_;
this.meta18205 = meta18205;
this.cljs$lang$protocol_mask$partition1$ = 0;
this.cljs$lang$protocol_mask$partition0$ = 393216;
})
cljs.core.async.t18204.cljs$lang$type = true;
cljs.core.async.t18204.cljs$lang$ctorStr = "cljs.core.async/t18204";
cljs.core.async.t18204.cljs$lang$ctorPrWriter = (function (this__3670__auto__,writer__3671__auto__,opt__3672__auto__){return cljs.core._write.call(null,writer__3671__auto__,"cljs.core.async/t18204");
});
cljs.core.async.t18204.prototype.cljs$core$async$impl$protocols$WritePort$ = true;
cljs.core.async.t18204.prototype.cljs$core$async$impl$protocols$WritePort$put_BANG_$arity$3 = (function (_,val,fn0){var self__ = this;
var ___$1 = this;return cljs.core.async.impl.protocols.put_BANG_.call(null,self__.ch,val,fn0);
});
cljs.core.async.t18204.prototype.cljs$core$async$impl$protocols$ReadPort$ = true;
cljs.core.async.t18204.prototype.cljs$core$async$impl$protocols$ReadPort$take_BANG_$arity$2 = (function (_,fn1){var self__ = this;
var ___$1 = this;var ret = cljs.core.async.impl.protocols.take_BANG_.call(null,self__.ch,(function (){if(typeof cljs.core.async.t18207 !== 'undefined')
{} else
{
/**
* @constructor
*/
cljs.core.async.t18207 = (function (fn1,_,meta18205,ch,f,map_LT_,meta18208){
this.fn1 = fn1;
this._ = _;
this.meta18205 = meta18205;
this.ch = ch;
this.f = f;
this.map_LT_ = map_LT_;
this.meta18208 = meta18208;
this.cljs$lang$protocol_mask$partition1$ = 0;
this.cljs$lang$protocol_mask$partition0$ = 393216;
})
cljs.core.async.t18207.cljs$lang$type = true;
cljs.core.async.t18207.cljs$lang$ctorStr = "cljs.core.async/t18207";
cljs.core.async.t18207.cljs$lang$ctorPrWriter = (function (this__3670__auto__,writer__3671__auto__,opt__3672__auto__){return cljs.core._write.call(null,writer__3671__auto__,"cljs.core.async/t18207");
});
cljs.core.async.t18207.prototype.cljs$core$async$impl$protocols$Handler$ = true;
cljs.core.async.t18207.prototype.cljs$core$async$impl$protocols$Handler$active_QMARK_$arity$1 = (function (___$3){var self__ = this;
var ___$4 = this;return cljs.core.async.impl.protocols.active_QMARK_.call(null,self__.fn1);
});
cljs.core.async.t18207.prototype.cljs$core$async$impl$protocols$Handler$lock_id$arity$1 = (function (___$3){var self__ = this;
var ___$4 = this;return cljs.core.async.impl.protocols.lock_id.call(null,self__.fn1);
});
cljs.core.async.t18207.prototype.cljs$core$async$impl$protocols$Handler$commit$arity$1 = (function (___$3){var self__ = this;
var ___$4 = this;var f1 = cljs.core.async.impl.protocols.commit.call(null,self__.fn1);return ((function (f1,___$4){
return (function (p1__18197_SHARP_){return f1.call(null,(((p1__18197_SHARP_ == null))?null:self__.f.call(null,p1__18197_SHARP_)));
});
;})(f1,___$4))
});
cljs.core.async.t18207.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_18209){var self__ = this;
var _18209__$1 = this;return self__.meta18208;
});
cljs.core.async.t18207.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_18209,meta18208__$1){var self__ = this;
var _18209__$1 = this;return (new cljs.core.async.t18207(self__.fn1,self__._,self__.meta18205,self__.ch,self__.f,self__.map_LT_,meta18208__$1));
});
cljs.core.async.__GT_t18207 = (function __GT_t18207(fn1__$1,___$2,meta18205__$1,ch__$2,f__$2,map_LT___$2,meta18208){return (new cljs.core.async.t18207(fn1__$1,___$2,meta18205__$1,ch__$2,f__$2,map_LT___$2,meta18208));
});
}
return (new cljs.core.async.t18207(fn1,___$1,self__.meta18205,self__.ch,self__.f,self__.map_LT_,null));
})());if(cljs.core.truth_((function (){var and__3124__auto__ = ret;if(cljs.core.truth_(and__3124__auto__))
{return !((cljs.core.deref.call(null,ret) == null));
} else
{return and__3124__auto__;
}
})()))
{return cljs.core.async.impl.channels.box.call(null,self__.f.call(null,cljs.core.deref.call(null,ret)));
} else
{return ret;
}
});
cljs.core.async.t18204.prototype.cljs$core$async$impl$protocols$Channel$ = true;
cljs.core.async.t18204.prototype.cljs$core$async$impl$protocols$Channel$close_BANG_$arity$1 = (function (_){var self__ = this;
var ___$1 = this;return cljs.core.async.impl.protocols.close_BANG_.call(null,self__.ch);
});
cljs.core.async.t18204.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_18206){var self__ = this;
var _18206__$1 = this;return self__.meta18205;
});
cljs.core.async.t18204.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_18206,meta18205__$1){var self__ = this;
var _18206__$1 = this;return (new cljs.core.async.t18204(self__.ch,self__.f,self__.map_LT_,meta18205__$1));
});
cljs.core.async.__GT_t18204 = (function __GT_t18204(ch__$1,f__$1,map_LT___$1,meta18205){return (new cljs.core.async.t18204(ch__$1,f__$1,map_LT___$1,meta18205));
});
}
return (new cljs.core.async.t18204(ch,f,map_LT_,null));
});
/**
* Takes a function and a target channel, and returns a channel which
* applies f to each value before supplying it to the target channel.
*/
cljs.core.async.map_GT_ = (function map_GT_(f,ch){if(typeof cljs.core.async.t18213 !== 'undefined')
{} else
{
/**
* @constructor
*/
cljs.core.async.t18213 = (function (ch,f,map_GT_,meta18214){
this.ch = ch;
this.f = f;
this.map_GT_ = map_GT_;
this.meta18214 = meta18214;
this.cljs$lang$protocol_mask$partition1$ = 0;
this.cljs$lang$protocol_mask$partition0$ = 393216;
})
cljs.core.async.t18213.cljs$lang$type = true;
cljs.core.async.t18213.cljs$lang$ctorStr = "cljs.core.async/t18213";
cljs.core.async.t18213.cljs$lang$ctorPrWriter = (function (this__3670__auto__,writer__3671__auto__,opt__3672__auto__){return cljs.core._write.call(null,writer__3671__auto__,"cljs.core.async/t18213");
});
cljs.core.async.t18213.prototype.cljs$core$async$impl$protocols$WritePort$ = true;
cljs.core.async.t18213.prototype.cljs$core$async$impl$protocols$WritePort$put_BANG_$arity$3 = (function (_,val,fn0){var self__ = this;
var ___$1 = this;return cljs.core.async.impl.protocols.put_BANG_.call(null,self__.ch,self__.f.call(null,val),fn0);
});
cljs.core.async.t18213.prototype.cljs$core$async$impl$protocols$ReadPort$ = true;
cljs.core.async.t18213.prototype.cljs$core$async$impl$protocols$ReadPort$take_BANG_$arity$2 = (function (_,fn1){var self__ = this;
var ___$1 = this;return cljs.core.async.impl.protocols.take_BANG_.call(null,self__.ch,fn1);
});
cljs.core.async.t18213.prototype.cljs$core$async$impl$protocols$Channel$ = true;
cljs.core.async.t18213.prototype.cljs$core$async$impl$protocols$Channel$close_BANG_$arity$1 = (function (_){var self__ = this;
var ___$1 = this;return cljs.core.async.impl.protocols.close_BANG_.call(null,self__.ch);
});
cljs.core.async.t18213.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_18215){var self__ = this;
var _18215__$1 = this;return self__.meta18214;
});
cljs.core.async.t18213.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_18215,meta18214__$1){var self__ = this;
var _18215__$1 = this;return (new cljs.core.async.t18213(self__.ch,self__.f,self__.map_GT_,meta18214__$1));
});
cljs.core.async.__GT_t18213 = (function __GT_t18213(ch__$1,f__$1,map_GT___$1,meta18214){return (new cljs.core.async.t18213(ch__$1,f__$1,map_GT___$1,meta18214));
});
}
return (new cljs.core.async.t18213(ch,f,map_GT_,null));
});
/**
* Takes a predicate and a target channel, and returns a channel which
* supplies only the values for which the predicate returns true to the
* target channel.
*/
cljs.core.async.filter_GT_ = (function filter_GT_(p,ch){if(typeof cljs.core.async.t18219 !== 'undefined')
{} else
{
/**
* @constructor
*/
cljs.core.async.t18219 = (function (ch,p,filter_GT_,meta18220){
this.ch = ch;
this.p = p;
this.filter_GT_ = filter_GT_;
this.meta18220 = meta18220;
this.cljs$lang$protocol_mask$partition1$ = 0;
this.cljs$lang$protocol_mask$partition0$ = 393216;
})
cljs.core.async.t18219.cljs$lang$type = true;
cljs.core.async.t18219.cljs$lang$ctorStr = "cljs.core.async/t18219";
cljs.core.async.t18219.cljs$lang$ctorPrWriter = (function (this__3670__auto__,writer__3671__auto__,opt__3672__auto__){return cljs.core._write.call(null,writer__3671__auto__,"cljs.core.async/t18219");
});
cljs.core.async.t18219.prototype.cljs$core$async$impl$protocols$WritePort$ = true;
cljs.core.async.t18219.prototype.cljs$core$async$impl$protocols$WritePort$put_BANG_$arity$3 = (function (_,val,fn0){var self__ = this;
var ___$1 = this;if(cljs.core.truth_(self__.p.call(null,val)))
{return cljs.core.async.impl.protocols.put_BANG_.call(null,self__.ch,val,fn0);
} else
{return cljs.core.async.impl.channels.box.call(null,null);
}
});
cljs.core.async.t18219.prototype.cljs$core$async$impl$protocols$ReadPort$ = true;
cljs.core.async.t18219.prototype.cljs$core$async$impl$protocols$ReadPort$take_BANG_$arity$2 = (function (_,fn1){var self__ = this;
var ___$1 = this;return cljs.core.async.impl.protocols.take_BANG_.call(null,self__.ch,fn1);
});
cljs.core.async.t18219.prototype.cljs$core$async$impl$protocols$Channel$ = true;
cljs.core.async.t18219.prototype.cljs$core$async$impl$protocols$Channel$close_BANG_$arity$1 = (function (_){var self__ = this;
var ___$1 = this;return cljs.core.async.impl.protocols.close_BANG_.call(null,self__.ch);
});
cljs.core.async.t18219.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_18221){var self__ = this;
var _18221__$1 = this;return self__.meta18220;
});
cljs.core.async.t18219.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_18221,meta18220__$1){var self__ = this;
var _18221__$1 = this;return (new cljs.core.async.t18219(self__.ch,self__.p,self__.filter_GT_,meta18220__$1));
});
cljs.core.async.__GT_t18219 = (function __GT_t18219(ch__$1,p__$1,filter_GT___$1,meta18220){return (new cljs.core.async.t18219(ch__$1,p__$1,filter_GT___$1,meta18220));
});
}
return (new cljs.core.async.t18219(ch,p,filter_GT_,null));
});
/**
* Takes a predicate and a target channel, and returns a channel which
* supplies only the values for which the predicate returns false to the
* target channel.
*/
cljs.core.async.remove_GT_ = (function remove_GT_(p,ch){return cljs.core.async.filter_GT_.call(null,cljs.core.complement.call(null,p),ch);
});
/**
* Takes a predicate and a source channel, and returns a channel which
* contains only the values taken from the source channel for which the
* predicate returns true. The returned channel will be unbuffered by
* default, or a buf-or-n can be supplied. The channel will close
* when the source channel closes.
*/
cljs.core.async.filter_LT_ = (function() {
var filter_LT_ = null;
var filter_LT___2 = (function (p,ch){return filter_LT_.call(null,p,ch,null);
});
var filter_LT___3 = (function (p,ch,buf_or_n){var out = cljs.core.async.chan.call(null,buf_or_n);var c__5494__auto___18304 = cljs.core.async.chan.call(null,1);cljs.core.async.impl.dispatch.run.call(null,(function (){var f__5495__auto__ = (function (){var switch__5424__auto__ = (function (state_18283){var state_val_18284 = (state_18283[1]);if((state_val_18284 === 1))
{var state_18283__$1 = state_18283;var statearr_18285_18305 = state_18283__$1;(statearr_18285_18305[2] = null);
(statearr_18285_18305[1] = 2);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_18284 === 2))
{var state_18283__$1 = state_18283;return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_18283__$1,4,ch);
} else
{if((state_val_18284 === 3))
{var inst_18281 = (state_18283[2]);var state_18283__$1 = state_18283;return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_18283__$1,inst_18281);
} else
{if((state_val_18284 === 4))
{var inst_18265 = (state_18283[7]);var inst_18265__$1 = (state_18283[2]);var inst_18266 = (inst_18265__$1 == null);var state_18283__$1 = (function (){var statearr_18286 = state_18283;(statearr_18286[7] = inst_18265__$1);
return statearr_18286;
})();if(cljs.core.truth_(inst_18266))
{var statearr_18287_18306 = state_18283__$1;(statearr_18287_18306[1] = 5);
} else
{var statearr_18288_18307 = state_18283__$1;(statearr_18288_18307[1] = 6);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_18284 === 5))
{var inst_18268 = cljs.core.async.close_BANG_.call(null,out);var state_18283__$1 = state_18283;var statearr_18289_18308 = state_18283__$1;(statearr_18289_18308[2] = inst_18268);
(statearr_18289_18308[1] = 7);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_18284 === 6))
{var inst_18265 = (state_18283[7]);var inst_18270 = p.call(null,inst_18265);var state_18283__$1 = state_18283;if(cljs.core.truth_(inst_18270))
{var statearr_18290_18309 = state_18283__$1;(statearr_18290_18309[1] = 8);
} else
{var statearr_18291_18310 = state_18283__$1;(statearr_18291_18310[1] = 9);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_18284 === 7))
{var inst_18279 = (state_18283[2]);var state_18283__$1 = state_18283;var statearr_18292_18311 = state_18283__$1;(statearr_18292_18311[2] = inst_18279);
(statearr_18292_18311[1] = 3);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_18284 === 8))
{var inst_18265 = (state_18283[7]);var state_18283__$1 = state_18283;return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_18283__$1,11,out,inst_18265);
} else
{if((state_val_18284 === 9))
{var state_18283__$1 = state_18283;var statearr_18293_18312 = state_18283__$1;(statearr_18293_18312[2] = null);
(statearr_18293_18312[1] = 10);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_18284 === 10))
{var inst_18276 = (state_18283[2]);var state_18283__$1 = (function (){var statearr_18294 = state_18283;(statearr_18294[8] = inst_18276);
return statearr_18294;
})();var statearr_18295_18313 = state_18283__$1;(statearr_18295_18313[2] = null);
(statearr_18295_18313[1] = 2);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_18284 === 11))
{var inst_18273 = (state_18283[2]);var state_18283__$1 = state_18283;var statearr_18296_18314 = state_18283__$1;(statearr_18296_18314[2] = inst_18273);
(statearr_18296_18314[1] = 10);
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
});return ((function (switch__5424__auto__){
return (function() {
var state_machine__5425__auto__ = null;
var state_machine__5425__auto____0 = (function (){var statearr_18300 = (new Array(9));(statearr_18300[0] = state_machine__5425__auto__);
(statearr_18300[1] = 1);
return statearr_18300;
});
var state_machine__5425__auto____1 = (function (state_18283){while(true){
var ret_value__5426__auto__ = (function (){try{while(true){
var result__5427__auto__ = switch__5424__auto__.call(null,state_18283);if(cljs.core.keyword_identical_QMARK_.call(null,result__5427__auto__,new cljs.core.Keyword(null,"recur","recur",1122293407)))
{{
continue;
}
} else
{return result__5427__auto__;
}
break;
}
}catch (e18301){if((e18301 instanceof Object))
{var ex__5428__auto__ = e18301;var statearr_18302_18315 = state_18283;(statearr_18302_18315[5] = ex__5428__auto__);
cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_18283);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if(new cljs.core.Keyword(null,"else","else",1017020587))
{throw e18301;
} else
{return null;
}
}
}})();if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__5426__auto__,new cljs.core.Keyword(null,"recur","recur",1122293407)))
{{
var G__18316 = state_18283;
state_18283 = G__18316;
continue;
}
} else
{return ret_value__5426__auto__;
}
break;
}
});
state_machine__5425__auto__ = function(state_18283){
switch(arguments.length){
case 0:
return state_machine__5425__auto____0.call(this);
case 1:
return state_machine__5425__auto____1.call(this,state_18283);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
state_machine__5425__auto__.cljs$core$IFn$_invoke$arity$0 = state_machine__5425__auto____0;
state_machine__5425__auto__.cljs$core$IFn$_invoke$arity$1 = state_machine__5425__auto____1;
return state_machine__5425__auto__;
})()
;})(switch__5424__auto__))
})();var state__5496__auto__ = (function (){var statearr_18303 = f__5495__auto__.call(null);(statearr_18303[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__5494__auto___18304);
return statearr_18303;
})();return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__5496__auto__);
}));
return out;
});
filter_LT_ = function(p,ch,buf_or_n){
switch(arguments.length){
case 2:
return filter_LT___2.call(this,p,ch);
case 3:
return filter_LT___3.call(this,p,ch,buf_or_n);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
filter_LT_.cljs$core$IFn$_invoke$arity$2 = filter_LT___2;
filter_LT_.cljs$core$IFn$_invoke$arity$3 = filter_LT___3;
return filter_LT_;
})()
;
/**
* Takes a predicate and a source channel, and returns a channel which
* contains only the values taken from the source channel for which the
* predicate returns false. The returned channel will be unbuffered by
* default, or a buf-or-n can be supplied. The channel will close
* when the source channel closes.
*/
cljs.core.async.remove_LT_ = (function() {
var remove_LT_ = null;
var remove_LT___2 = (function (p,ch){return remove_LT_.call(null,p,ch,null);
});
var remove_LT___3 = (function (p,ch,buf_or_n){return cljs.core.async.filter_LT_.call(null,cljs.core.complement.call(null,p),ch,buf_or_n);
});
remove_LT_ = function(p,ch,buf_or_n){
switch(arguments.length){
case 2:
return remove_LT___2.call(this,p,ch);
case 3:
return remove_LT___3.call(this,p,ch,buf_or_n);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
remove_LT_.cljs$core$IFn$_invoke$arity$2 = remove_LT___2;
remove_LT_.cljs$core$IFn$_invoke$arity$3 = remove_LT___3;
return remove_LT_;
})()
;
cljs.core.async.mapcat_STAR_ = (function mapcat_STAR_(f,in$,out){var c__5494__auto__ = cljs.core.async.chan.call(null,1);cljs.core.async.impl.dispatch.run.call(null,(function (){var f__5495__auto__ = (function (){var switch__5424__auto__ = (function (state_18468){var state_val_18469 = (state_18468[1]);if((state_val_18469 === 1))
{var state_18468__$1 = state_18468;var statearr_18470_18507 = state_18468__$1;(statearr_18470_18507[2] = null);
(statearr_18470_18507[1] = 2);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_18469 === 2))
{var state_18468__$1 = state_18468;return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_18468__$1,4,in$);
} else
{if((state_val_18469 === 3))
{var inst_18466 = (state_18468[2]);var state_18468__$1 = state_18468;return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_18468__$1,inst_18466);
} else
{if((state_val_18469 === 4))
{var inst_18414 = (state_18468[7]);var inst_18414__$1 = (state_18468[2]);var inst_18415 = (inst_18414__$1 == null);var state_18468__$1 = (function (){var statearr_18471 = state_18468;(statearr_18471[7] = inst_18414__$1);
return statearr_18471;
})();if(cljs.core.truth_(inst_18415))
{var statearr_18472_18508 = state_18468__$1;(statearr_18472_18508[1] = 5);
} else
{var statearr_18473_18509 = state_18468__$1;(statearr_18473_18509[1] = 6);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_18469 === 5))
{var inst_18417 = cljs.core.async.close_BANG_.call(null,out);var state_18468__$1 = state_18468;var statearr_18474_18510 = state_18468__$1;(statearr_18474_18510[2] = inst_18417);
(statearr_18474_18510[1] = 7);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_18469 === 6))
{var inst_18414 = (state_18468[7]);var inst_18419 = f.call(null,inst_18414);var inst_18424 = cljs.core.seq.call(null,inst_18419);var inst_18425 = inst_18424;var inst_18426 = null;var inst_18427 = 0;var inst_18428 = 0;var state_18468__$1 = (function (){var statearr_18475 = state_18468;(statearr_18475[8] = inst_18425);
(statearr_18475[9] = inst_18428);
(statearr_18475[10] = inst_18427);
(statearr_18475[11] = inst_18426);
return statearr_18475;
})();var statearr_18476_18511 = state_18468__$1;(statearr_18476_18511[2] = null);
(statearr_18476_18511[1] = 8);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_18469 === 7))
{var inst_18464 = (state_18468[2]);var state_18468__$1 = state_18468;var statearr_18477_18512 = state_18468__$1;(statearr_18477_18512[2] = inst_18464);
(statearr_18477_18512[1] = 3);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_18469 === 8))
{var inst_18428 = (state_18468[9]);var inst_18427 = (state_18468[10]);var inst_18430 = (inst_18428 < inst_18427);var inst_18431 = inst_18430;var state_18468__$1 = state_18468;if(cljs.core.truth_(inst_18431))
{var statearr_18478_18513 = state_18468__$1;(statearr_18478_18513[1] = 10);
} else
{var statearr_18479_18514 = state_18468__$1;(statearr_18479_18514[1] = 11);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_18469 === 9))
{var inst_18461 = (state_18468[2]);var state_18468__$1 = (function (){var statearr_18480 = state_18468;(statearr_18480[12] = inst_18461);
return statearr_18480;
})();var statearr_18481_18515 = state_18468__$1;(statearr_18481_18515[2] = null);
(statearr_18481_18515[1] = 2);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_18469 === 10))
{var inst_18428 = (state_18468[9]);var inst_18426 = (state_18468[11]);var inst_18433 = cljs.core._nth.call(null,inst_18426,inst_18428);var state_18468__$1 = state_18468;return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_18468__$1,13,out,inst_18433);
} else
{if((state_val_18469 === 11))
{var inst_18425 = (state_18468[8]);var inst_18439 = (state_18468[13]);var inst_18439__$1 = cljs.core.seq.call(null,inst_18425);var state_18468__$1 = (function (){var statearr_18485 = state_18468;(statearr_18485[13] = inst_18439__$1);
return statearr_18485;
})();if(inst_18439__$1)
{var statearr_18486_18516 = state_18468__$1;(statearr_18486_18516[1] = 14);
} else
{var statearr_18487_18517 = state_18468__$1;(statearr_18487_18517[1] = 15);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_18469 === 12))
{var inst_18459 = (state_18468[2]);var state_18468__$1 = state_18468;var statearr_18488_18518 = state_18468__$1;(statearr_18488_18518[2] = inst_18459);
(statearr_18488_18518[1] = 9);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_18469 === 13))
{var inst_18425 = (state_18468[8]);var inst_18428 = (state_18468[9]);var inst_18427 = (state_18468[10]);var inst_18426 = (state_18468[11]);var inst_18435 = (state_18468[2]);var inst_18436 = (inst_18428 + 1);var tmp18482 = inst_18425;var tmp18483 = inst_18427;var tmp18484 = inst_18426;var inst_18425__$1 = tmp18482;var inst_18426__$1 = tmp18484;var inst_18427__$1 = tmp18483;var inst_18428__$1 = inst_18436;var state_18468__$1 = (function (){var statearr_18489 = state_18468;(statearr_18489[8] = inst_18425__$1);
(statearr_18489[14] = inst_18435);
(statearr_18489[9] = inst_18428__$1);
(statearr_18489[10] = inst_18427__$1);
(statearr_18489[11] = inst_18426__$1);
return statearr_18489;
})();var statearr_18490_18519 = state_18468__$1;(statearr_18490_18519[2] = null);
(statearr_18490_18519[1] = 8);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_18469 === 14))
{var inst_18439 = (state_18468[13]);var inst_18441 = cljs.core.chunked_seq_QMARK_.call(null,inst_18439);var state_18468__$1 = state_18468;if(inst_18441)
{var statearr_18491_18520 = state_18468__$1;(statearr_18491_18520[1] = 17);
} else
{var statearr_18492_18521 = state_18468__$1;(statearr_18492_18521[1] = 18);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_18469 === 15))
{var state_18468__$1 = state_18468;var statearr_18493_18522 = state_18468__$1;(statearr_18493_18522[2] = null);
(statearr_18493_18522[1] = 16);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_18469 === 16))
{var inst_18457 = (state_18468[2]);var state_18468__$1 = state_18468;var statearr_18494_18523 = state_18468__$1;(statearr_18494_18523[2] = inst_18457);
(statearr_18494_18523[1] = 12);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_18469 === 17))
{var inst_18439 = (state_18468[13]);var inst_18443 = cljs.core.chunk_first.call(null,inst_18439);var inst_18444 = cljs.core.chunk_rest.call(null,inst_18439);var inst_18445 = cljs.core.count.call(null,inst_18443);var inst_18425 = inst_18444;var inst_18426 = inst_18443;var inst_18427 = inst_18445;var inst_18428 = 0;var state_18468__$1 = (function (){var statearr_18495 = state_18468;(statearr_18495[8] = inst_18425);
(statearr_18495[9] = inst_18428);
(statearr_18495[10] = inst_18427);
(statearr_18495[11] = inst_18426);
return statearr_18495;
})();var statearr_18496_18524 = state_18468__$1;(statearr_18496_18524[2] = null);
(statearr_18496_18524[1] = 8);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_18469 === 18))
{var inst_18439 = (state_18468[13]);var inst_18448 = cljs.core.first.call(null,inst_18439);var state_18468__$1 = state_18468;return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_18468__$1,20,out,inst_18448);
} else
{if((state_val_18469 === 19))
{var inst_18454 = (state_18468[2]);var state_18468__$1 = state_18468;var statearr_18497_18525 = state_18468__$1;(statearr_18497_18525[2] = inst_18454);
(statearr_18497_18525[1] = 16);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_18469 === 20))
{var inst_18439 = (state_18468[13]);var inst_18450 = (state_18468[2]);var inst_18451 = cljs.core.next.call(null,inst_18439);var inst_18425 = inst_18451;var inst_18426 = null;var inst_18427 = 0;var inst_18428 = 0;var state_18468__$1 = (function (){var statearr_18498 = state_18468;(statearr_18498[8] = inst_18425);
(statearr_18498[15] = inst_18450);
(statearr_18498[9] = inst_18428);
(statearr_18498[10] = inst_18427);
(statearr_18498[11] = inst_18426);
return statearr_18498;
})();var statearr_18499_18526 = state_18468__$1;(statearr_18499_18526[2] = null);
(statearr_18499_18526[1] = 8);
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
});return ((function (switch__5424__auto__){
return (function() {
var state_machine__5425__auto__ = null;
var state_machine__5425__auto____0 = (function (){var statearr_18503 = (new Array(16));(statearr_18503[0] = state_machine__5425__auto__);
(statearr_18503[1] = 1);
return statearr_18503;
});
var state_machine__5425__auto____1 = (function (state_18468){while(true){
var ret_value__5426__auto__ = (function (){try{while(true){
var result__5427__auto__ = switch__5424__auto__.call(null,state_18468);if(cljs.core.keyword_identical_QMARK_.call(null,result__5427__auto__,new cljs.core.Keyword(null,"recur","recur",1122293407)))
{{
continue;
}
} else
{return result__5427__auto__;
}
break;
}
}catch (e18504){if((e18504 instanceof Object))
{var ex__5428__auto__ = e18504;var statearr_18505_18527 = state_18468;(statearr_18505_18527[5] = ex__5428__auto__);
cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_18468);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if(new cljs.core.Keyword(null,"else","else",1017020587))
{throw e18504;
} else
{return null;
}
}
}})();if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__5426__auto__,new cljs.core.Keyword(null,"recur","recur",1122293407)))
{{
var G__18528 = state_18468;
state_18468 = G__18528;
continue;
}
} else
{return ret_value__5426__auto__;
}
break;
}
});
state_machine__5425__auto__ = function(state_18468){
switch(arguments.length){
case 0:
return state_machine__5425__auto____0.call(this);
case 1:
return state_machine__5425__auto____1.call(this,state_18468);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
state_machine__5425__auto__.cljs$core$IFn$_invoke$arity$0 = state_machine__5425__auto____0;
state_machine__5425__auto__.cljs$core$IFn$_invoke$arity$1 = state_machine__5425__auto____1;
return state_machine__5425__auto__;
})()
;})(switch__5424__auto__))
})();var state__5496__auto__ = (function (){var statearr_18506 = f__5495__auto__.call(null);(statearr_18506[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__5494__auto__);
return statearr_18506;
})();return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__5496__auto__);
}));
return c__5494__auto__;
});
/**
* Takes a function and a source channel, and returns a channel which
* contains the values in each collection produced by applying f to
* each value taken from the source channel. f must return a
* collection.
* 
* The returned channel will be unbuffered by default, or a buf-or-n
* can be supplied. The channel will close when the source channel
* closes.
*/
cljs.core.async.mapcat_LT_ = (function() {
var mapcat_LT_ = null;
var mapcat_LT___2 = (function (f,in$){return mapcat_LT_.call(null,f,in$,null);
});
var mapcat_LT___3 = (function (f,in$,buf_or_n){var out = cljs.core.async.chan.call(null,buf_or_n);cljs.core.async.mapcat_STAR_.call(null,f,in$,out);
return out;
});
mapcat_LT_ = function(f,in$,buf_or_n){
switch(arguments.length){
case 2:
return mapcat_LT___2.call(this,f,in$);
case 3:
return mapcat_LT___3.call(this,f,in$,buf_or_n);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
mapcat_LT_.cljs$core$IFn$_invoke$arity$2 = mapcat_LT___2;
mapcat_LT_.cljs$core$IFn$_invoke$arity$3 = mapcat_LT___3;
return mapcat_LT_;
})()
;
/**
* Takes a function and a target channel, and returns a channel which
* applies f to each value put, then supplies each element of the result
* to the target channel. f must return a collection.
* 
* The returned channel will be unbuffered by default, or a buf-or-n
* can be supplied. The target channel will be closed when the source
* channel closes.
*/
cljs.core.async.mapcat_GT_ = (function() {
var mapcat_GT_ = null;
var mapcat_GT___2 = (function (f,out){return mapcat_GT_.call(null,f,out,null);
});
var mapcat_GT___3 = (function (f,out,buf_or_n){var in$ = cljs.core.async.chan.call(null,buf_or_n);cljs.core.async.mapcat_STAR_.call(null,f,in$,out);
return in$;
});
mapcat_GT_ = function(f,out,buf_or_n){
switch(arguments.length){
case 2:
return mapcat_GT___2.call(this,f,out);
case 3:
return mapcat_GT___3.call(this,f,out,buf_or_n);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
mapcat_GT_.cljs$core$IFn$_invoke$arity$2 = mapcat_GT___2;
mapcat_GT_.cljs$core$IFn$_invoke$arity$3 = mapcat_GT___3;
return mapcat_GT_;
})()
;
/**
* Takes elements from the from channel and supplies them to the to
* channel. By default, the to channel will be closed when the
* from channel closes, but can be determined by the close?
* parameter.
*/
cljs.core.async.pipe = (function() {
var pipe = null;
var pipe__2 = (function (from,to){return pipe.call(null,from,to,true);
});
var pipe__3 = (function (from,to,close_QMARK_){var c__5494__auto___18609 = cljs.core.async.chan.call(null,1);cljs.core.async.impl.dispatch.run.call(null,(function (){var f__5495__auto__ = (function (){var switch__5424__auto__ = (function (state_18588){var state_val_18589 = (state_18588[1]);if((state_val_18589 === 1))
{var state_18588__$1 = state_18588;var statearr_18590_18610 = state_18588__$1;(statearr_18590_18610[2] = null);
(statearr_18590_18610[1] = 2);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_18589 === 2))
{var state_18588__$1 = state_18588;return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_18588__$1,4,from);
} else
{if((state_val_18589 === 3))
{var inst_18586 = (state_18588[2]);var state_18588__$1 = state_18588;return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_18588__$1,inst_18586);
} else
{if((state_val_18589 === 4))
{var inst_18571 = (state_18588[7]);var inst_18571__$1 = (state_18588[2]);var inst_18572 = (inst_18571__$1 == null);var state_18588__$1 = (function (){var statearr_18591 = state_18588;(statearr_18591[7] = inst_18571__$1);
return statearr_18591;
})();if(cljs.core.truth_(inst_18572))
{var statearr_18592_18611 = state_18588__$1;(statearr_18592_18611[1] = 5);
} else
{var statearr_18593_18612 = state_18588__$1;(statearr_18593_18612[1] = 6);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_18589 === 5))
{var state_18588__$1 = state_18588;if(cljs.core.truth_(close_QMARK_))
{var statearr_18594_18613 = state_18588__$1;(statearr_18594_18613[1] = 8);
} else
{var statearr_18595_18614 = state_18588__$1;(statearr_18595_18614[1] = 9);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_18589 === 6))
{var inst_18571 = (state_18588[7]);var state_18588__$1 = state_18588;return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_18588__$1,11,to,inst_18571);
} else
{if((state_val_18589 === 7))
{var inst_18584 = (state_18588[2]);var state_18588__$1 = state_18588;var statearr_18596_18615 = state_18588__$1;(statearr_18596_18615[2] = inst_18584);
(statearr_18596_18615[1] = 3);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_18589 === 8))
{var inst_18575 = cljs.core.async.close_BANG_.call(null,to);var state_18588__$1 = state_18588;var statearr_18597_18616 = state_18588__$1;(statearr_18597_18616[2] = inst_18575);
(statearr_18597_18616[1] = 10);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_18589 === 9))
{var state_18588__$1 = state_18588;var statearr_18598_18617 = state_18588__$1;(statearr_18598_18617[2] = null);
(statearr_18598_18617[1] = 10);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_18589 === 10))
{var inst_18578 = (state_18588[2]);var state_18588__$1 = state_18588;var statearr_18599_18618 = state_18588__$1;(statearr_18599_18618[2] = inst_18578);
(statearr_18599_18618[1] = 7);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_18589 === 11))
{var inst_18581 = (state_18588[2]);var state_18588__$1 = (function (){var statearr_18600 = state_18588;(statearr_18600[8] = inst_18581);
return statearr_18600;
})();var statearr_18601_18619 = state_18588__$1;(statearr_18601_18619[2] = null);
(statearr_18601_18619[1] = 2);
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
});return ((function (switch__5424__auto__){
return (function() {
var state_machine__5425__auto__ = null;
var state_machine__5425__auto____0 = (function (){var statearr_18605 = (new Array(9));(statearr_18605[0] = state_machine__5425__auto__);
(statearr_18605[1] = 1);
return statearr_18605;
});
var state_machine__5425__auto____1 = (function (state_18588){while(true){
var ret_value__5426__auto__ = (function (){try{while(true){
var result__5427__auto__ = switch__5424__auto__.call(null,state_18588);if(cljs.core.keyword_identical_QMARK_.call(null,result__5427__auto__,new cljs.core.Keyword(null,"recur","recur",1122293407)))
{{
continue;
}
} else
{return result__5427__auto__;
}
break;
}
}catch (e18606){if((e18606 instanceof Object))
{var ex__5428__auto__ = e18606;var statearr_18607_18620 = state_18588;(statearr_18607_18620[5] = ex__5428__auto__);
cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_18588);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if(new cljs.core.Keyword(null,"else","else",1017020587))
{throw e18606;
} else
{return null;
}
}
}})();if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__5426__auto__,new cljs.core.Keyword(null,"recur","recur",1122293407)))
{{
var G__18621 = state_18588;
state_18588 = G__18621;
continue;
}
} else
{return ret_value__5426__auto__;
}
break;
}
});
state_machine__5425__auto__ = function(state_18588){
switch(arguments.length){
case 0:
return state_machine__5425__auto____0.call(this);
case 1:
return state_machine__5425__auto____1.call(this,state_18588);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
state_machine__5425__auto__.cljs$core$IFn$_invoke$arity$0 = state_machine__5425__auto____0;
state_machine__5425__auto__.cljs$core$IFn$_invoke$arity$1 = state_machine__5425__auto____1;
return state_machine__5425__auto__;
})()
;})(switch__5424__auto__))
})();var state__5496__auto__ = (function (){var statearr_18608 = f__5495__auto__.call(null);(statearr_18608[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__5494__auto___18609);
return statearr_18608;
})();return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__5496__auto__);
}));
return to;
});
pipe = function(from,to,close_QMARK_){
switch(arguments.length){
case 2:
return pipe__2.call(this,from,to);
case 3:
return pipe__3.call(this,from,to,close_QMARK_);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
pipe.cljs$core$IFn$_invoke$arity$2 = pipe__2;
pipe.cljs$core$IFn$_invoke$arity$3 = pipe__3;
return pipe;
})()
;
/**
* Takes a predicate and a source channel and returns a vector of two
* channels, the first of which will contain the values for which the
* predicate returned true, the second those for which it returned
* false.
* 
* The out channels will be unbuffered by default, or two buf-or-ns can
* be supplied. The channels will close after the source channel has
* closed.
*/
cljs.core.async.split = (function() {
var split = null;
var split__2 = (function (p,ch){return split.call(null,p,ch,null,null);
});
var split__4 = (function (p,ch,t_buf_or_n,f_buf_or_n){var tc = cljs.core.async.chan.call(null,t_buf_or_n);var fc = cljs.core.async.chan.call(null,f_buf_or_n);var c__5494__auto___18708 = cljs.core.async.chan.call(null,1);cljs.core.async.impl.dispatch.run.call(null,(function (){var f__5495__auto__ = (function (){var switch__5424__auto__ = (function (state_18686){var state_val_18687 = (state_18686[1]);if((state_val_18687 === 1))
{var state_18686__$1 = state_18686;var statearr_18688_18709 = state_18686__$1;(statearr_18688_18709[2] = null);
(statearr_18688_18709[1] = 2);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_18687 === 2))
{var state_18686__$1 = state_18686;return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_18686__$1,4,ch);
} else
{if((state_val_18687 === 3))
{var inst_18684 = (state_18686[2]);var state_18686__$1 = state_18686;return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_18686__$1,inst_18684);
} else
{if((state_val_18687 === 4))
{var inst_18667 = (state_18686[7]);var inst_18667__$1 = (state_18686[2]);var inst_18668 = (inst_18667__$1 == null);var state_18686__$1 = (function (){var statearr_18689 = state_18686;(statearr_18689[7] = inst_18667__$1);
return statearr_18689;
})();if(cljs.core.truth_(inst_18668))
{var statearr_18690_18710 = state_18686__$1;(statearr_18690_18710[1] = 5);
} else
{var statearr_18691_18711 = state_18686__$1;(statearr_18691_18711[1] = 6);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_18687 === 5))
{var inst_18670 = cljs.core.async.close_BANG_.call(null,tc);var inst_18671 = cljs.core.async.close_BANG_.call(null,fc);var state_18686__$1 = (function (){var statearr_18692 = state_18686;(statearr_18692[8] = inst_18670);
return statearr_18692;
})();var statearr_18693_18712 = state_18686__$1;(statearr_18693_18712[2] = inst_18671);
(statearr_18693_18712[1] = 7);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_18687 === 6))
{var inst_18667 = (state_18686[7]);var inst_18673 = p.call(null,inst_18667);var state_18686__$1 = state_18686;if(cljs.core.truth_(inst_18673))
{var statearr_18694_18713 = state_18686__$1;(statearr_18694_18713[1] = 9);
} else
{var statearr_18695_18714 = state_18686__$1;(statearr_18695_18714[1] = 10);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_18687 === 7))
{var inst_18682 = (state_18686[2]);var state_18686__$1 = state_18686;var statearr_18696_18715 = state_18686__$1;(statearr_18696_18715[2] = inst_18682);
(statearr_18696_18715[1] = 3);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_18687 === 8))
{var inst_18679 = (state_18686[2]);var state_18686__$1 = (function (){var statearr_18697 = state_18686;(statearr_18697[9] = inst_18679);
return statearr_18697;
})();var statearr_18698_18716 = state_18686__$1;(statearr_18698_18716[2] = null);
(statearr_18698_18716[1] = 2);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_18687 === 9))
{var state_18686__$1 = state_18686;var statearr_18699_18717 = state_18686__$1;(statearr_18699_18717[2] = tc);
(statearr_18699_18717[1] = 11);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_18687 === 10))
{var state_18686__$1 = state_18686;var statearr_18700_18718 = state_18686__$1;(statearr_18700_18718[2] = fc);
(statearr_18700_18718[1] = 11);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_18687 === 11))
{var inst_18667 = (state_18686[7]);var inst_18677 = (state_18686[2]);var state_18686__$1 = state_18686;return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_18686__$1,8,inst_18677,inst_18667);
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
});return ((function (switch__5424__auto__){
return (function() {
var state_machine__5425__auto__ = null;
var state_machine__5425__auto____0 = (function (){var statearr_18704 = (new Array(10));(statearr_18704[0] = state_machine__5425__auto__);
(statearr_18704[1] = 1);
return statearr_18704;
});
var state_machine__5425__auto____1 = (function (state_18686){while(true){
var ret_value__5426__auto__ = (function (){try{while(true){
var result__5427__auto__ = switch__5424__auto__.call(null,state_18686);if(cljs.core.keyword_identical_QMARK_.call(null,result__5427__auto__,new cljs.core.Keyword(null,"recur","recur",1122293407)))
{{
continue;
}
} else
{return result__5427__auto__;
}
break;
}
}catch (e18705){if((e18705 instanceof Object))
{var ex__5428__auto__ = e18705;var statearr_18706_18719 = state_18686;(statearr_18706_18719[5] = ex__5428__auto__);
cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_18686);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if(new cljs.core.Keyword(null,"else","else",1017020587))
{throw e18705;
} else
{return null;
}
}
}})();if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__5426__auto__,new cljs.core.Keyword(null,"recur","recur",1122293407)))
{{
var G__18720 = state_18686;
state_18686 = G__18720;
continue;
}
} else
{return ret_value__5426__auto__;
}
break;
}
});
state_machine__5425__auto__ = function(state_18686){
switch(arguments.length){
case 0:
return state_machine__5425__auto____0.call(this);
case 1:
return state_machine__5425__auto____1.call(this,state_18686);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
state_machine__5425__auto__.cljs$core$IFn$_invoke$arity$0 = state_machine__5425__auto____0;
state_machine__5425__auto__.cljs$core$IFn$_invoke$arity$1 = state_machine__5425__auto____1;
return state_machine__5425__auto__;
})()
;})(switch__5424__auto__))
})();var state__5496__auto__ = (function (){var statearr_18707 = f__5495__auto__.call(null);(statearr_18707[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__5494__auto___18708);
return statearr_18707;
})();return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__5496__auto__);
}));
return cljs.core.PersistentVector.fromArray([tc,fc], true);
});
split = function(p,ch,t_buf_or_n,f_buf_or_n){
switch(arguments.length){
case 2:
return split__2.call(this,p,ch);
case 4:
return split__4.call(this,p,ch,t_buf_or_n,f_buf_or_n);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
split.cljs$core$IFn$_invoke$arity$2 = split__2;
split.cljs$core$IFn$_invoke$arity$4 = split__4;
return split;
})()
;
/**
* f should be a function of 2 arguments. Returns a channel containing
* the single result of applying f to init and the first item from the
* channel, then applying f to that result and the 2nd item, etc. If
* the channel closes without yielding items, returns init and f is not
* called. ch must close before reduce produces a result.
*/
cljs.core.async.reduce = (function reduce(f,init,ch){var c__5494__auto__ = cljs.core.async.chan.call(null,1);cljs.core.async.impl.dispatch.run.call(null,(function (){var f__5495__auto__ = (function (){var switch__5424__auto__ = (function (state_18767){var state_val_18768 = (state_18767[1]);if((state_val_18768 === 7))
{var inst_18763 = (state_18767[2]);var state_18767__$1 = state_18767;var statearr_18769_18785 = state_18767__$1;(statearr_18769_18785[2] = inst_18763);
(statearr_18769_18785[1] = 3);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_18768 === 6))
{var inst_18756 = (state_18767[7]);var inst_18753 = (state_18767[8]);var inst_18760 = f.call(null,inst_18753,inst_18756);var inst_18753__$1 = inst_18760;var state_18767__$1 = (function (){var statearr_18770 = state_18767;(statearr_18770[8] = inst_18753__$1);
return statearr_18770;
})();var statearr_18771_18786 = state_18767__$1;(statearr_18771_18786[2] = null);
(statearr_18771_18786[1] = 2);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_18768 === 5))
{var inst_18753 = (state_18767[8]);var state_18767__$1 = state_18767;var statearr_18772_18787 = state_18767__$1;(statearr_18772_18787[2] = inst_18753);
(statearr_18772_18787[1] = 7);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_18768 === 4))
{var inst_18756 = (state_18767[7]);var inst_18756__$1 = (state_18767[2]);var inst_18757 = (inst_18756__$1 == null);var state_18767__$1 = (function (){var statearr_18773 = state_18767;(statearr_18773[7] = inst_18756__$1);
return statearr_18773;
})();if(cljs.core.truth_(inst_18757))
{var statearr_18774_18788 = state_18767__$1;(statearr_18774_18788[1] = 5);
} else
{var statearr_18775_18789 = state_18767__$1;(statearr_18775_18789[1] = 6);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_18768 === 3))
{var inst_18765 = (state_18767[2]);var state_18767__$1 = state_18767;return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_18767__$1,inst_18765);
} else
{if((state_val_18768 === 2))
{var state_18767__$1 = state_18767;return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_18767__$1,4,ch);
} else
{if((state_val_18768 === 1))
{var inst_18753 = init;var state_18767__$1 = (function (){var statearr_18776 = state_18767;(statearr_18776[8] = inst_18753);
return statearr_18776;
})();var statearr_18777_18790 = state_18767__$1;(statearr_18777_18790[2] = null);
(statearr_18777_18790[1] = 2);
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
});return ((function (switch__5424__auto__){
return (function() {
var state_machine__5425__auto__ = null;
var state_machine__5425__auto____0 = (function (){var statearr_18781 = (new Array(9));(statearr_18781[0] = state_machine__5425__auto__);
(statearr_18781[1] = 1);
return statearr_18781;
});
var state_machine__5425__auto____1 = (function (state_18767){while(true){
var ret_value__5426__auto__ = (function (){try{while(true){
var result__5427__auto__ = switch__5424__auto__.call(null,state_18767);if(cljs.core.keyword_identical_QMARK_.call(null,result__5427__auto__,new cljs.core.Keyword(null,"recur","recur",1122293407)))
{{
continue;
}
} else
{return result__5427__auto__;
}
break;
}
}catch (e18782){if((e18782 instanceof Object))
{var ex__5428__auto__ = e18782;var statearr_18783_18791 = state_18767;(statearr_18783_18791[5] = ex__5428__auto__);
cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_18767);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if(new cljs.core.Keyword(null,"else","else",1017020587))
{throw e18782;
} else
{return null;
}
}
}})();if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__5426__auto__,new cljs.core.Keyword(null,"recur","recur",1122293407)))
{{
var G__18792 = state_18767;
state_18767 = G__18792;
continue;
}
} else
{return ret_value__5426__auto__;
}
break;
}
});
state_machine__5425__auto__ = function(state_18767){
switch(arguments.length){
case 0:
return state_machine__5425__auto____0.call(this);
case 1:
return state_machine__5425__auto____1.call(this,state_18767);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
state_machine__5425__auto__.cljs$core$IFn$_invoke$arity$0 = state_machine__5425__auto____0;
state_machine__5425__auto__.cljs$core$IFn$_invoke$arity$1 = state_machine__5425__auto____1;
return state_machine__5425__auto__;
})()
;})(switch__5424__auto__))
})();var state__5496__auto__ = (function (){var statearr_18784 = f__5495__auto__.call(null);(statearr_18784[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__5494__auto__);
return statearr_18784;
})();return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__5496__auto__);
}));
return c__5494__auto__;
});
/**
* Puts the contents of coll into the supplied channel.
* 
* By default the channel will be closed after the items are copied,
* but can be determined by the close? parameter.
* 
* Returns a channel which will close after the items are copied.
*/
cljs.core.async.onto_chan = (function() {
var onto_chan = null;
var onto_chan__2 = (function (ch,coll){return onto_chan.call(null,ch,coll,true);
});
var onto_chan__3 = (function (ch,coll,close_QMARK_){var c__5494__auto__ = cljs.core.async.chan.call(null,1);cljs.core.async.impl.dispatch.run.call(null,(function (){var f__5495__auto__ = (function (){var switch__5424__auto__ = (function (state_18854){var state_val_18855 = (state_18854[1]);if((state_val_18855 === 1))
{var inst_18834 = cljs.core.seq.call(null,coll);var inst_18835 = inst_18834;var state_18854__$1 = (function (){var statearr_18856 = state_18854;(statearr_18856[7] = inst_18835);
return statearr_18856;
})();var statearr_18857_18875 = state_18854__$1;(statearr_18857_18875[2] = null);
(statearr_18857_18875[1] = 2);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_18855 === 2))
{var inst_18835 = (state_18854[7]);var state_18854__$1 = state_18854;if(cljs.core.truth_(inst_18835))
{var statearr_18858_18876 = state_18854__$1;(statearr_18858_18876[1] = 4);
} else
{var statearr_18859_18877 = state_18854__$1;(statearr_18859_18877[1] = 5);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_18855 === 3))
{var inst_18852 = (state_18854[2]);var state_18854__$1 = state_18854;return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_18854__$1,inst_18852);
} else
{if((state_val_18855 === 4))
{var inst_18835 = (state_18854[7]);var inst_18838 = cljs.core.first.call(null,inst_18835);var state_18854__$1 = state_18854;return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_18854__$1,7,ch,inst_18838);
} else
{if((state_val_18855 === 5))
{var state_18854__$1 = state_18854;if(cljs.core.truth_(close_QMARK_))
{var statearr_18860_18878 = state_18854__$1;(statearr_18860_18878[1] = 8);
} else
{var statearr_18861_18879 = state_18854__$1;(statearr_18861_18879[1] = 9);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_18855 === 6))
{var inst_18850 = (state_18854[2]);var state_18854__$1 = state_18854;var statearr_18862_18880 = state_18854__$1;(statearr_18862_18880[2] = inst_18850);
(statearr_18862_18880[1] = 3);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_18855 === 7))
{var inst_18835 = (state_18854[7]);var inst_18840 = (state_18854[2]);var inst_18841 = cljs.core.next.call(null,inst_18835);var inst_18835__$1 = inst_18841;var state_18854__$1 = (function (){var statearr_18863 = state_18854;(statearr_18863[8] = inst_18840);
(statearr_18863[7] = inst_18835__$1);
return statearr_18863;
})();var statearr_18864_18881 = state_18854__$1;(statearr_18864_18881[2] = null);
(statearr_18864_18881[1] = 2);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_18855 === 8))
{var inst_18845 = cljs.core.async.close_BANG_.call(null,ch);var state_18854__$1 = state_18854;var statearr_18865_18882 = state_18854__$1;(statearr_18865_18882[2] = inst_18845);
(statearr_18865_18882[1] = 10);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_18855 === 9))
{var state_18854__$1 = state_18854;var statearr_18866_18883 = state_18854__$1;(statearr_18866_18883[2] = null);
(statearr_18866_18883[1] = 10);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_18855 === 10))
{var inst_18848 = (state_18854[2]);var state_18854__$1 = state_18854;var statearr_18867_18884 = state_18854__$1;(statearr_18867_18884[2] = inst_18848);
(statearr_18867_18884[1] = 6);
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
});return ((function (switch__5424__auto__){
return (function() {
var state_machine__5425__auto__ = null;
var state_machine__5425__auto____0 = (function (){var statearr_18871 = (new Array(9));(statearr_18871[0] = state_machine__5425__auto__);
(statearr_18871[1] = 1);
return statearr_18871;
});
var state_machine__5425__auto____1 = (function (state_18854){while(true){
var ret_value__5426__auto__ = (function (){try{while(true){
var result__5427__auto__ = switch__5424__auto__.call(null,state_18854);if(cljs.core.keyword_identical_QMARK_.call(null,result__5427__auto__,new cljs.core.Keyword(null,"recur","recur",1122293407)))
{{
continue;
}
} else
{return result__5427__auto__;
}
break;
}
}catch (e18872){if((e18872 instanceof Object))
{var ex__5428__auto__ = e18872;var statearr_18873_18885 = state_18854;(statearr_18873_18885[5] = ex__5428__auto__);
cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_18854);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if(new cljs.core.Keyword(null,"else","else",1017020587))
{throw e18872;
} else
{return null;
}
}
}})();if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__5426__auto__,new cljs.core.Keyword(null,"recur","recur",1122293407)))
{{
var G__18886 = state_18854;
state_18854 = G__18886;
continue;
}
} else
{return ret_value__5426__auto__;
}
break;
}
});
state_machine__5425__auto__ = function(state_18854){
switch(arguments.length){
case 0:
return state_machine__5425__auto____0.call(this);
case 1:
return state_machine__5425__auto____1.call(this,state_18854);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
state_machine__5425__auto__.cljs$core$IFn$_invoke$arity$0 = state_machine__5425__auto____0;
state_machine__5425__auto__.cljs$core$IFn$_invoke$arity$1 = state_machine__5425__auto____1;
return state_machine__5425__auto__;
})()
;})(switch__5424__auto__))
})();var state__5496__auto__ = (function (){var statearr_18874 = f__5495__auto__.call(null);(statearr_18874[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__5494__auto__);
return statearr_18874;
})();return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__5496__auto__);
}));
return c__5494__auto__;
});
onto_chan = function(ch,coll,close_QMARK_){
switch(arguments.length){
case 2:
return onto_chan__2.call(this,ch,coll);
case 3:
return onto_chan__3.call(this,ch,coll,close_QMARK_);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
onto_chan.cljs$core$IFn$_invoke$arity$2 = onto_chan__2;
onto_chan.cljs$core$IFn$_invoke$arity$3 = onto_chan__3;
return onto_chan;
})()
;
/**
* Creates and returns a channel which contains the contents of coll,
* closing when exhausted.
*/
cljs.core.async.to_chan = (function to_chan(coll){var ch = cljs.core.async.chan.call(null,cljs.core.bounded_count.call(null,100,coll));cljs.core.async.onto_chan.call(null,ch,coll);
return ch;
});
cljs.core.async.Mux = {};
cljs.core.async.muxch_STAR_ = (function muxch_STAR_(_){if((function (){var and__3124__auto__ = _;if(and__3124__auto__)
{return _.cljs$core$async$Mux$muxch_STAR_$arity$1;
} else
{return and__3124__auto__;
}
})())
{return _.cljs$core$async$Mux$muxch_STAR_$arity$1(_);
} else
{var x__3729__auto__ = (((_ == null))?null:_);return (function (){var or__3133__auto__ = (cljs.core.async.muxch_STAR_[goog.typeOf(x__3729__auto__)]);if(or__3133__auto__)
{return or__3133__auto__;
} else
{var or__3133__auto____$1 = (cljs.core.async.muxch_STAR_["_"]);if(or__3133__auto____$1)
{return or__3133__auto____$1;
} else
{throw cljs.core.missing_protocol.call(null,"Mux.muxch*",_);
}
}
})().call(null,_);
}
});
cljs.core.async.Mult = {};
cljs.core.async.tap_STAR_ = (function tap_STAR_(m,ch,close_QMARK_){if((function (){var and__3124__auto__ = m;if(and__3124__auto__)
{return m.cljs$core$async$Mult$tap_STAR_$arity$3;
} else
{return and__3124__auto__;
}
})())
{return m.cljs$core$async$Mult$tap_STAR_$arity$3(m,ch,close_QMARK_);
} else
{var x__3729__auto__ = (((m == null))?null:m);return (function (){var or__3133__auto__ = (cljs.core.async.tap_STAR_[goog.typeOf(x__3729__auto__)]);if(or__3133__auto__)
{return or__3133__auto__;
} else
{var or__3133__auto____$1 = (cljs.core.async.tap_STAR_["_"]);if(or__3133__auto____$1)
{return or__3133__auto____$1;
} else
{throw cljs.core.missing_protocol.call(null,"Mult.tap*",m);
}
}
})().call(null,m,ch,close_QMARK_);
}
});
cljs.core.async.untap_STAR_ = (function untap_STAR_(m,ch){if((function (){var and__3124__auto__ = m;if(and__3124__auto__)
{return m.cljs$core$async$Mult$untap_STAR_$arity$2;
} else
{return and__3124__auto__;
}
})())
{return m.cljs$core$async$Mult$untap_STAR_$arity$2(m,ch);
} else
{var x__3729__auto__ = (((m == null))?null:m);return (function (){var or__3133__auto__ = (cljs.core.async.untap_STAR_[goog.typeOf(x__3729__auto__)]);if(or__3133__auto__)
{return or__3133__auto__;
} else
{var or__3133__auto____$1 = (cljs.core.async.untap_STAR_["_"]);if(or__3133__auto____$1)
{return or__3133__auto____$1;
} else
{throw cljs.core.missing_protocol.call(null,"Mult.untap*",m);
}
}
})().call(null,m,ch);
}
});
cljs.core.async.untap_all_STAR_ = (function untap_all_STAR_(m){if((function (){var and__3124__auto__ = m;if(and__3124__auto__)
{return m.cljs$core$async$Mult$untap_all_STAR_$arity$1;
} else
{return and__3124__auto__;
}
})())
{return m.cljs$core$async$Mult$untap_all_STAR_$arity$1(m);
} else
{var x__3729__auto__ = (((m == null))?null:m);return (function (){var or__3133__auto__ = (cljs.core.async.untap_all_STAR_[goog.typeOf(x__3729__auto__)]);if(or__3133__auto__)
{return or__3133__auto__;
} else
{var or__3133__auto____$1 = (cljs.core.async.untap_all_STAR_["_"]);if(or__3133__auto____$1)
{return or__3133__auto____$1;
} else
{throw cljs.core.missing_protocol.call(null,"Mult.untap-all*",m);
}
}
})().call(null,m);
}
});
/**
* Creates and returns a mult(iple) of the supplied channel. Channels
* containing copies of the channel can be created with 'tap', and
* detached with 'untap'.
* 
* Each item is distributed to all taps in parallel and synchronously,
* i.e. each tap must accept before the next item is distributed. Use
* buffering/windowing to prevent slow taps from holding up the mult.
* 
* If a tap put throws an exception, it will be removed from the mult.
*/
cljs.core.async.mult = (function mult(ch){var cs = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);var m = (function (){if(typeof cljs.core.async.t19101 !== 'undefined')
{} else
{
/**
* @constructor
*/
cljs.core.async.t19101 = (function (cs,ch,mult,meta19102){
this.cs = cs;
this.ch = ch;
this.mult = mult;
this.meta19102 = meta19102;
this.cljs$lang$protocol_mask$partition1$ = 0;
this.cljs$lang$protocol_mask$partition0$ = 393216;
})
cljs.core.async.t19101.cljs$lang$type = true;
cljs.core.async.t19101.cljs$lang$ctorStr = "cljs.core.async/t19101";
cljs.core.async.t19101.cljs$lang$ctorPrWriter = ((function (cs){
return (function (this__3670__auto__,writer__3671__auto__,opt__3672__auto__){return cljs.core._write.call(null,writer__3671__auto__,"cljs.core.async/t19101");
});})(cs))
;
cljs.core.async.t19101.prototype.cljs$core$async$Mult$ = true;
cljs.core.async.t19101.prototype.cljs$core$async$Mult$tap_STAR_$arity$3 = ((function (cs){
return (function (_,ch__$2,close_QMARK_){var self__ = this;
var ___$1 = this;cljs.core.swap_BANG_.call(null,self__.cs,cljs.core.assoc,ch__$2,close_QMARK_);
return null;
});})(cs))
;
cljs.core.async.t19101.prototype.cljs$core$async$Mult$untap_STAR_$arity$2 = ((function (cs){
return (function (_,ch__$2){var self__ = this;
var ___$1 = this;cljs.core.swap_BANG_.call(null,self__.cs,cljs.core.dissoc,ch__$2);
return null;
});})(cs))
;
cljs.core.async.t19101.prototype.cljs$core$async$Mult$untap_all_STAR_$arity$1 = ((function (cs){
return (function (_){var self__ = this;
var ___$1 = this;cljs.core.reset_BANG_.call(null,self__.cs,cljs.core.PersistentArrayMap.EMPTY);
return null;
});})(cs))
;
cljs.core.async.t19101.prototype.cljs$core$async$Mux$ = true;
cljs.core.async.t19101.prototype.cljs$core$async$Mux$muxch_STAR_$arity$1 = ((function (cs){
return (function (_){var self__ = this;
var ___$1 = this;return self__.ch;
});})(cs))
;
cljs.core.async.t19101.prototype.cljs$core$IMeta$_meta$arity$1 = ((function (cs){
return (function (_19103){var self__ = this;
var _19103__$1 = this;return self__.meta19102;
});})(cs))
;
cljs.core.async.t19101.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = ((function (cs){
return (function (_19103,meta19102__$1){var self__ = this;
var _19103__$1 = this;return (new cljs.core.async.t19101(self__.cs,self__.ch,self__.mult,meta19102__$1));
});})(cs))
;
cljs.core.async.__GT_t19101 = ((function (cs){
return (function __GT_t19101(cs__$1,ch__$1,mult__$1,meta19102){return (new cljs.core.async.t19101(cs__$1,ch__$1,mult__$1,meta19102));
});})(cs))
;
}
return (new cljs.core.async.t19101(cs,ch,mult,null));
})();var dchan = cljs.core.async.chan.call(null,1);var dctr = cljs.core.atom.call(null,null);var done = ((function (cs,m,dchan,dctr){
return (function (){if((cljs.core.swap_BANG_.call(null,dctr,cljs.core.dec) === 0))
{return cljs.core.async.put_BANG_.call(null,dchan,true);
} else
{return null;
}
});})(cs,m,dchan,dctr))
;var c__5494__auto___19315 = cljs.core.async.chan.call(null,1);cljs.core.async.impl.dispatch.run.call(null,(function (){var f__5495__auto__ = (function (){var switch__5424__auto__ = (function (state_19233){var state_val_19234 = (state_19233[1]);if((state_val_19234 === 32))
{var inst_19106 = (state_19233[7]);var inst_19182 = (state_19233[8]);var _ = cljs.core.async.impl.ioc_helpers.add_exception_frame.call(null,state_19233,31,Object,null,30);var inst_19189 = cljs.core.async.put_BANG_.call(null,inst_19182,inst_19106,done);var state_19233__$1 = state_19233;var statearr_19235_19316 = state_19233__$1;(statearr_19235_19316[2] = inst_19189);
cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_19233__$1);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_19234 === 1))
{var state_19233__$1 = state_19233;var statearr_19236_19317 = state_19233__$1;(statearr_19236_19317[2] = null);
(statearr_19236_19317[1] = 2);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_19234 === 33))
{var inst_19195 = (state_19233[9]);var inst_19197 = cljs.core.chunked_seq_QMARK_.call(null,inst_19195);var state_19233__$1 = state_19233;if(inst_19197)
{var statearr_19237_19318 = state_19233__$1;(statearr_19237_19318[1] = 36);
} else
{var statearr_19238_19319 = state_19233__$1;(statearr_19238_19319[1] = 37);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_19234 === 2))
{var state_19233__$1 = state_19233;return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_19233__$1,4,ch);
} else
{if((state_val_19234 === 34))
{var state_19233__$1 = state_19233;var statearr_19239_19320 = state_19233__$1;(statearr_19239_19320[2] = null);
(statearr_19239_19320[1] = 35);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_19234 === 3))
{var inst_19231 = (state_19233[2]);var state_19233__$1 = state_19233;return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_19233__$1,inst_19231);
} else
{if((state_val_19234 === 35))
{var inst_19220 = (state_19233[2]);var state_19233__$1 = state_19233;var statearr_19240_19321 = state_19233__$1;(statearr_19240_19321[2] = inst_19220);
(statearr_19240_19321[1] = 29);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_19234 === 4))
{var inst_19106 = (state_19233[7]);var inst_19106__$1 = (state_19233[2]);var inst_19107 = (inst_19106__$1 == null);var state_19233__$1 = (function (){var statearr_19241 = state_19233;(statearr_19241[7] = inst_19106__$1);
return statearr_19241;
})();if(cljs.core.truth_(inst_19107))
{var statearr_19242_19322 = state_19233__$1;(statearr_19242_19322[1] = 5);
} else
{var statearr_19243_19323 = state_19233__$1;(statearr_19243_19323[1] = 6);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_19234 === 36))
{var inst_19195 = (state_19233[9]);var inst_19199 = cljs.core.chunk_first.call(null,inst_19195);var inst_19200 = cljs.core.chunk_rest.call(null,inst_19195);var inst_19201 = cljs.core.count.call(null,inst_19199);var inst_19174 = inst_19200;var inst_19175 = inst_19199;var inst_19176 = inst_19201;var inst_19177 = 0;var state_19233__$1 = (function (){var statearr_19244 = state_19233;(statearr_19244[10] = inst_19177);
(statearr_19244[11] = inst_19174);
(statearr_19244[12] = inst_19175);
(statearr_19244[13] = inst_19176);
return statearr_19244;
})();var statearr_19245_19324 = state_19233__$1;(statearr_19245_19324[2] = null);
(statearr_19245_19324[1] = 25);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_19234 === 5))
{var inst_19113 = cljs.core.deref.call(null,cs);var inst_19114 = cljs.core.seq.call(null,inst_19113);var inst_19115 = inst_19114;var inst_19116 = null;var inst_19117 = 0;var inst_19118 = 0;var state_19233__$1 = (function (){var statearr_19246 = state_19233;(statearr_19246[14] = inst_19117);
(statearr_19246[15] = inst_19118);
(statearr_19246[16] = inst_19115);
(statearr_19246[17] = inst_19116);
return statearr_19246;
})();var statearr_19247_19325 = state_19233__$1;(statearr_19247_19325[2] = null);
(statearr_19247_19325[1] = 8);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_19234 === 37))
{var inst_19195 = (state_19233[9]);var inst_19204 = cljs.core.first.call(null,inst_19195);var state_19233__$1 = (function (){var statearr_19248 = state_19233;(statearr_19248[18] = inst_19204);
return statearr_19248;
})();var statearr_19249_19326 = state_19233__$1;(statearr_19249_19326[2] = null);
(statearr_19249_19326[1] = 41);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_19234 === 6))
{var inst_19165 = cljs.core.deref.call(null,cs);var inst_19166 = cljs.core.keys.call(null,inst_19165);var inst_19167 = cljs.core.count.call(null,inst_19166);var inst_19168 = cljs.core.reset_BANG_.call(null,dctr,inst_19167);var inst_19173 = cljs.core.seq.call(null,inst_19166);var inst_19174 = inst_19173;var inst_19175 = null;var inst_19176 = 0;var inst_19177 = 0;var state_19233__$1 = (function (){var statearr_19250 = state_19233;(statearr_19250[10] = inst_19177);
(statearr_19250[11] = inst_19174);
(statearr_19250[12] = inst_19175);
(statearr_19250[13] = inst_19176);
(statearr_19250[19] = inst_19168);
return statearr_19250;
})();var statearr_19251_19327 = state_19233__$1;(statearr_19251_19327[2] = null);
(statearr_19251_19327[1] = 25);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_19234 === 38))
{var inst_19217 = (state_19233[2]);var state_19233__$1 = state_19233;var statearr_19252_19328 = state_19233__$1;(statearr_19252_19328[2] = inst_19217);
(statearr_19252_19328[1] = 35);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_19234 === 7))
{var inst_19229 = (state_19233[2]);var state_19233__$1 = state_19233;var statearr_19253_19329 = state_19233__$1;(statearr_19253_19329[2] = inst_19229);
(statearr_19253_19329[1] = 3);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_19234 === 39))
{var inst_19195 = (state_19233[9]);var inst_19213 = (state_19233[2]);var inst_19214 = cljs.core.next.call(null,inst_19195);var inst_19174 = inst_19214;var inst_19175 = null;var inst_19176 = 0;var inst_19177 = 0;var state_19233__$1 = (function (){var statearr_19254 = state_19233;(statearr_19254[10] = inst_19177);
(statearr_19254[20] = inst_19213);
(statearr_19254[11] = inst_19174);
(statearr_19254[12] = inst_19175);
(statearr_19254[13] = inst_19176);
return statearr_19254;
})();var statearr_19255_19330 = state_19233__$1;(statearr_19255_19330[2] = null);
(statearr_19255_19330[1] = 25);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_19234 === 8))
{var inst_19117 = (state_19233[14]);var inst_19118 = (state_19233[15]);var inst_19120 = (inst_19118 < inst_19117);var inst_19121 = inst_19120;var state_19233__$1 = state_19233;if(cljs.core.truth_(inst_19121))
{var statearr_19256_19331 = state_19233__$1;(statearr_19256_19331[1] = 10);
} else
{var statearr_19257_19332 = state_19233__$1;(statearr_19257_19332[1] = 11);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_19234 === 40))
{var inst_19204 = (state_19233[18]);var inst_19205 = (state_19233[2]);var inst_19206 = cljs.core.swap_BANG_.call(null,dctr,cljs.core.dec);var inst_19207 = cljs.core.async.untap_STAR_.call(null,m,inst_19204);var state_19233__$1 = (function (){var statearr_19258 = state_19233;(statearr_19258[21] = inst_19205);
(statearr_19258[22] = inst_19206);
return statearr_19258;
})();var statearr_19259_19333 = state_19233__$1;(statearr_19259_19333[2] = inst_19207);
cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_19233__$1);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_19234 === 9))
{var inst_19163 = (state_19233[2]);var state_19233__$1 = state_19233;var statearr_19260_19334 = state_19233__$1;(statearr_19260_19334[2] = inst_19163);
(statearr_19260_19334[1] = 7);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_19234 === 41))
{var inst_19106 = (state_19233[7]);var inst_19204 = (state_19233[18]);var _ = cljs.core.async.impl.ioc_helpers.add_exception_frame.call(null,state_19233,40,Object,null,39);var inst_19211 = cljs.core.async.put_BANG_.call(null,inst_19204,inst_19106,done);var state_19233__$1 = state_19233;var statearr_19261_19335 = state_19233__$1;(statearr_19261_19335[2] = inst_19211);
cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_19233__$1);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_19234 === 10))
{var inst_19118 = (state_19233[15]);var inst_19116 = (state_19233[17]);var inst_19124 = cljs.core._nth.call(null,inst_19116,inst_19118);var inst_19125 = cljs.core.nth.call(null,inst_19124,0,null);var inst_19126 = cljs.core.nth.call(null,inst_19124,1,null);var state_19233__$1 = (function (){var statearr_19262 = state_19233;(statearr_19262[23] = inst_19125);
return statearr_19262;
})();if(cljs.core.truth_(inst_19126))
{var statearr_19263_19336 = state_19233__$1;(statearr_19263_19336[1] = 13);
} else
{var statearr_19264_19337 = state_19233__$1;(statearr_19264_19337[1] = 14);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_19234 === 42))
{var inst_19226 = (state_19233[2]);var state_19233__$1 = (function (){var statearr_19265 = state_19233;(statearr_19265[24] = inst_19226);
return statearr_19265;
})();var statearr_19266_19338 = state_19233__$1;(statearr_19266_19338[2] = null);
(statearr_19266_19338[1] = 2);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_19234 === 11))
{var inst_19135 = (state_19233[25]);var inst_19115 = (state_19233[16]);var inst_19135__$1 = cljs.core.seq.call(null,inst_19115);var state_19233__$1 = (function (){var statearr_19267 = state_19233;(statearr_19267[25] = inst_19135__$1);
return statearr_19267;
})();if(inst_19135__$1)
{var statearr_19268_19339 = state_19233__$1;(statearr_19268_19339[1] = 16);
} else
{var statearr_19269_19340 = state_19233__$1;(statearr_19269_19340[1] = 17);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_19234 === 12))
{var inst_19161 = (state_19233[2]);var state_19233__$1 = state_19233;var statearr_19270_19341 = state_19233__$1;(statearr_19270_19341[2] = inst_19161);
(statearr_19270_19341[1] = 9);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_19234 === 13))
{var inst_19125 = (state_19233[23]);var inst_19128 = cljs.core.async.close_BANG_.call(null,inst_19125);var state_19233__$1 = state_19233;var statearr_19274_19342 = state_19233__$1;(statearr_19274_19342[2] = inst_19128);
(statearr_19274_19342[1] = 15);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_19234 === 14))
{var state_19233__$1 = state_19233;var statearr_19275_19343 = state_19233__$1;(statearr_19275_19343[2] = null);
(statearr_19275_19343[1] = 15);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_19234 === 15))
{var inst_19117 = (state_19233[14]);var inst_19118 = (state_19233[15]);var inst_19115 = (state_19233[16]);var inst_19116 = (state_19233[17]);var inst_19131 = (state_19233[2]);var inst_19132 = (inst_19118 + 1);var tmp19271 = inst_19117;var tmp19272 = inst_19115;var tmp19273 = inst_19116;var inst_19115__$1 = tmp19272;var inst_19116__$1 = tmp19273;var inst_19117__$1 = tmp19271;var inst_19118__$1 = inst_19132;var state_19233__$1 = (function (){var statearr_19276 = state_19233;(statearr_19276[14] = inst_19117__$1);
(statearr_19276[15] = inst_19118__$1);
(statearr_19276[16] = inst_19115__$1);
(statearr_19276[17] = inst_19116__$1);
(statearr_19276[26] = inst_19131);
return statearr_19276;
})();var statearr_19277_19344 = state_19233__$1;(statearr_19277_19344[2] = null);
(statearr_19277_19344[1] = 8);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_19234 === 16))
{var inst_19135 = (state_19233[25]);var inst_19137 = cljs.core.chunked_seq_QMARK_.call(null,inst_19135);var state_19233__$1 = state_19233;if(inst_19137)
{var statearr_19278_19345 = state_19233__$1;(statearr_19278_19345[1] = 19);
} else
{var statearr_19279_19346 = state_19233__$1;(statearr_19279_19346[1] = 20);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_19234 === 17))
{var state_19233__$1 = state_19233;var statearr_19280_19347 = state_19233__$1;(statearr_19280_19347[2] = null);
(statearr_19280_19347[1] = 18);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_19234 === 18))
{var inst_19159 = (state_19233[2]);var state_19233__$1 = state_19233;var statearr_19281_19348 = state_19233__$1;(statearr_19281_19348[2] = inst_19159);
(statearr_19281_19348[1] = 12);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_19234 === 19))
{var inst_19135 = (state_19233[25]);var inst_19139 = cljs.core.chunk_first.call(null,inst_19135);var inst_19140 = cljs.core.chunk_rest.call(null,inst_19135);var inst_19141 = cljs.core.count.call(null,inst_19139);var inst_19115 = inst_19140;var inst_19116 = inst_19139;var inst_19117 = inst_19141;var inst_19118 = 0;var state_19233__$1 = (function (){var statearr_19282 = state_19233;(statearr_19282[14] = inst_19117);
(statearr_19282[15] = inst_19118);
(statearr_19282[16] = inst_19115);
(statearr_19282[17] = inst_19116);
return statearr_19282;
})();var statearr_19283_19349 = state_19233__$1;(statearr_19283_19349[2] = null);
(statearr_19283_19349[1] = 8);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_19234 === 20))
{var inst_19135 = (state_19233[25]);var inst_19145 = cljs.core.first.call(null,inst_19135);var inst_19146 = cljs.core.nth.call(null,inst_19145,0,null);var inst_19147 = cljs.core.nth.call(null,inst_19145,1,null);var state_19233__$1 = (function (){var statearr_19284 = state_19233;(statearr_19284[27] = inst_19146);
return statearr_19284;
})();if(cljs.core.truth_(inst_19147))
{var statearr_19285_19350 = state_19233__$1;(statearr_19285_19350[1] = 22);
} else
{var statearr_19286_19351 = state_19233__$1;(statearr_19286_19351[1] = 23);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_19234 === 21))
{var inst_19156 = (state_19233[2]);var state_19233__$1 = state_19233;var statearr_19287_19352 = state_19233__$1;(statearr_19287_19352[2] = inst_19156);
(statearr_19287_19352[1] = 18);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_19234 === 22))
{var inst_19146 = (state_19233[27]);var inst_19149 = cljs.core.async.close_BANG_.call(null,inst_19146);var state_19233__$1 = state_19233;var statearr_19288_19353 = state_19233__$1;(statearr_19288_19353[2] = inst_19149);
(statearr_19288_19353[1] = 24);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_19234 === 23))
{var state_19233__$1 = state_19233;var statearr_19289_19354 = state_19233__$1;(statearr_19289_19354[2] = null);
(statearr_19289_19354[1] = 24);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_19234 === 24))
{var inst_19135 = (state_19233[25]);var inst_19152 = (state_19233[2]);var inst_19153 = cljs.core.next.call(null,inst_19135);var inst_19115 = inst_19153;var inst_19116 = null;var inst_19117 = 0;var inst_19118 = 0;var state_19233__$1 = (function (){var statearr_19290 = state_19233;(statearr_19290[28] = inst_19152);
(statearr_19290[14] = inst_19117);
(statearr_19290[15] = inst_19118);
(statearr_19290[16] = inst_19115);
(statearr_19290[17] = inst_19116);
return statearr_19290;
})();var statearr_19291_19355 = state_19233__$1;(statearr_19291_19355[2] = null);
(statearr_19291_19355[1] = 8);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_19234 === 25))
{var inst_19177 = (state_19233[10]);var inst_19176 = (state_19233[13]);var inst_19179 = (inst_19177 < inst_19176);var inst_19180 = inst_19179;var state_19233__$1 = state_19233;if(cljs.core.truth_(inst_19180))
{var statearr_19292_19356 = state_19233__$1;(statearr_19292_19356[1] = 27);
} else
{var statearr_19293_19357 = state_19233__$1;(statearr_19293_19357[1] = 28);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_19234 === 26))
{var inst_19224 = (state_19233[2]);var state_19233__$1 = (function (){var statearr_19294 = state_19233;(statearr_19294[29] = inst_19224);
return statearr_19294;
})();return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_19233__$1,42,dchan);
} else
{if((state_val_19234 === 27))
{var inst_19177 = (state_19233[10]);var inst_19175 = (state_19233[12]);var inst_19182 = cljs.core._nth.call(null,inst_19175,inst_19177);var state_19233__$1 = (function (){var statearr_19295 = state_19233;(statearr_19295[8] = inst_19182);
return statearr_19295;
})();var statearr_19296_19358 = state_19233__$1;(statearr_19296_19358[2] = null);
(statearr_19296_19358[1] = 32);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_19234 === 28))
{var inst_19195 = (state_19233[9]);var inst_19174 = (state_19233[11]);var inst_19195__$1 = cljs.core.seq.call(null,inst_19174);var state_19233__$1 = (function (){var statearr_19300 = state_19233;(statearr_19300[9] = inst_19195__$1);
return statearr_19300;
})();if(inst_19195__$1)
{var statearr_19301_19359 = state_19233__$1;(statearr_19301_19359[1] = 33);
} else
{var statearr_19302_19360 = state_19233__$1;(statearr_19302_19360[1] = 34);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_19234 === 29))
{var inst_19222 = (state_19233[2]);var state_19233__$1 = state_19233;var statearr_19303_19361 = state_19233__$1;(statearr_19303_19361[2] = inst_19222);
(statearr_19303_19361[1] = 26);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_19234 === 30))
{var inst_19177 = (state_19233[10]);var inst_19174 = (state_19233[11]);var inst_19175 = (state_19233[12]);var inst_19176 = (state_19233[13]);var inst_19191 = (state_19233[2]);var inst_19192 = (inst_19177 + 1);var tmp19297 = inst_19174;var tmp19298 = inst_19175;var tmp19299 = inst_19176;var inst_19174__$1 = tmp19297;var inst_19175__$1 = tmp19298;var inst_19176__$1 = tmp19299;var inst_19177__$1 = inst_19192;var state_19233__$1 = (function (){var statearr_19304 = state_19233;(statearr_19304[10] = inst_19177__$1);
(statearr_19304[30] = inst_19191);
(statearr_19304[11] = inst_19174__$1);
(statearr_19304[12] = inst_19175__$1);
(statearr_19304[13] = inst_19176__$1);
return statearr_19304;
})();var statearr_19305_19362 = state_19233__$1;(statearr_19305_19362[2] = null);
(statearr_19305_19362[1] = 25);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_19234 === 31))
{var inst_19182 = (state_19233[8]);var inst_19183 = (state_19233[2]);var inst_19184 = cljs.core.swap_BANG_.call(null,dctr,cljs.core.dec);var inst_19185 = cljs.core.async.untap_STAR_.call(null,m,inst_19182);var state_19233__$1 = (function (){var statearr_19306 = state_19233;(statearr_19306[31] = inst_19183);
(statearr_19306[32] = inst_19184);
return statearr_19306;
})();var statearr_19307_19363 = state_19233__$1;(statearr_19307_19363[2] = inst_19185);
cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_19233__$1);
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
var state_machine__5425__auto____0 = (function (){var statearr_19311 = (new Array(33));(statearr_19311[0] = state_machine__5425__auto__);
(statearr_19311[1] = 1);
return statearr_19311;
});
var state_machine__5425__auto____1 = (function (state_19233){while(true){
var ret_value__5426__auto__ = (function (){try{while(true){
var result__5427__auto__ = switch__5424__auto__.call(null,state_19233);if(cljs.core.keyword_identical_QMARK_.call(null,result__5427__auto__,new cljs.core.Keyword(null,"recur","recur",1122293407)))
{{
continue;
}
} else
{return result__5427__auto__;
}
break;
}
}catch (e19312){if((e19312 instanceof Object))
{var ex__5428__auto__ = e19312;var statearr_19313_19364 = state_19233;(statearr_19313_19364[5] = ex__5428__auto__);
cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_19233);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if(new cljs.core.Keyword(null,"else","else",1017020587))
{throw e19312;
} else
{return null;
}
}
}})();if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__5426__auto__,new cljs.core.Keyword(null,"recur","recur",1122293407)))
{{
var G__19365 = state_19233;
state_19233 = G__19365;
continue;
}
} else
{return ret_value__5426__auto__;
}
break;
}
});
state_machine__5425__auto__ = function(state_19233){
switch(arguments.length){
case 0:
return state_machine__5425__auto____0.call(this);
case 1:
return state_machine__5425__auto____1.call(this,state_19233);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
state_machine__5425__auto__.cljs$core$IFn$_invoke$arity$0 = state_machine__5425__auto____0;
state_machine__5425__auto__.cljs$core$IFn$_invoke$arity$1 = state_machine__5425__auto____1;
return state_machine__5425__auto__;
})()
;})(switch__5424__auto__))
})();var state__5496__auto__ = (function (){var statearr_19314 = f__5495__auto__.call(null);(statearr_19314[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__5494__auto___19315);
return statearr_19314;
})();return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__5496__auto__);
}));
return m;
});
/**
* Copies the mult source onto the supplied channel.
* 
* By default the channel will be closed when the source closes,
* but can be determined by the close? parameter.
*/
cljs.core.async.tap = (function() {
var tap = null;
var tap__2 = (function (mult,ch){return tap.call(null,mult,ch,true);
});
var tap__3 = (function (mult,ch,close_QMARK_){cljs.core.async.tap_STAR_.call(null,mult,ch,close_QMARK_);
return ch;
});
tap = function(mult,ch,close_QMARK_){
switch(arguments.length){
case 2:
return tap__2.call(this,mult,ch);
case 3:
return tap__3.call(this,mult,ch,close_QMARK_);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
tap.cljs$core$IFn$_invoke$arity$2 = tap__2;
tap.cljs$core$IFn$_invoke$arity$3 = tap__3;
return tap;
})()
;
/**
* Disconnects a target channel from a mult
*/
cljs.core.async.untap = (function untap(mult,ch){return cljs.core.async.untap_STAR_.call(null,mult,ch);
});
/**
* Disconnects all target channels from a mult
*/
cljs.core.async.untap_all = (function untap_all(mult){return cljs.core.async.untap_all_STAR_.call(null,mult);
});
cljs.core.async.Mix = {};
cljs.core.async.admix_STAR_ = (function admix_STAR_(m,ch){if((function (){var and__3124__auto__ = m;if(and__3124__auto__)
{return m.cljs$core$async$Mix$admix_STAR_$arity$2;
} else
{return and__3124__auto__;
}
})())
{return m.cljs$core$async$Mix$admix_STAR_$arity$2(m,ch);
} else
{var x__3729__auto__ = (((m == null))?null:m);return (function (){var or__3133__auto__ = (cljs.core.async.admix_STAR_[goog.typeOf(x__3729__auto__)]);if(or__3133__auto__)
{return or__3133__auto__;
} else
{var or__3133__auto____$1 = (cljs.core.async.admix_STAR_["_"]);if(or__3133__auto____$1)
{return or__3133__auto____$1;
} else
{throw cljs.core.missing_protocol.call(null,"Mix.admix*",m);
}
}
})().call(null,m,ch);
}
});
cljs.core.async.unmix_STAR_ = (function unmix_STAR_(m,ch){if((function (){var and__3124__auto__ = m;if(and__3124__auto__)
{return m.cljs$core$async$Mix$unmix_STAR_$arity$2;
} else
{return and__3124__auto__;
}
})())
{return m.cljs$core$async$Mix$unmix_STAR_$arity$2(m,ch);
} else
{var x__3729__auto__ = (((m == null))?null:m);return (function (){var or__3133__auto__ = (cljs.core.async.unmix_STAR_[goog.typeOf(x__3729__auto__)]);if(or__3133__auto__)
{return or__3133__auto__;
} else
{var or__3133__auto____$1 = (cljs.core.async.unmix_STAR_["_"]);if(or__3133__auto____$1)
{return or__3133__auto____$1;
} else
{throw cljs.core.missing_protocol.call(null,"Mix.unmix*",m);
}
}
})().call(null,m,ch);
}
});
cljs.core.async.unmix_all_STAR_ = (function unmix_all_STAR_(m){if((function (){var and__3124__auto__ = m;if(and__3124__auto__)
{return m.cljs$core$async$Mix$unmix_all_STAR_$arity$1;
} else
{return and__3124__auto__;
}
})())
{return m.cljs$core$async$Mix$unmix_all_STAR_$arity$1(m);
} else
{var x__3729__auto__ = (((m == null))?null:m);return (function (){var or__3133__auto__ = (cljs.core.async.unmix_all_STAR_[goog.typeOf(x__3729__auto__)]);if(or__3133__auto__)
{return or__3133__auto__;
} else
{var or__3133__auto____$1 = (cljs.core.async.unmix_all_STAR_["_"]);if(or__3133__auto____$1)
{return or__3133__auto____$1;
} else
{throw cljs.core.missing_protocol.call(null,"Mix.unmix-all*",m);
}
}
})().call(null,m);
}
});
cljs.core.async.toggle_STAR_ = (function toggle_STAR_(m,state_map){if((function (){var and__3124__auto__ = m;if(and__3124__auto__)
{return m.cljs$core$async$Mix$toggle_STAR_$arity$2;
} else
{return and__3124__auto__;
}
})())
{return m.cljs$core$async$Mix$toggle_STAR_$arity$2(m,state_map);
} else
{var x__3729__auto__ = (((m == null))?null:m);return (function (){var or__3133__auto__ = (cljs.core.async.toggle_STAR_[goog.typeOf(x__3729__auto__)]);if(or__3133__auto__)
{return or__3133__auto__;
} else
{var or__3133__auto____$1 = (cljs.core.async.toggle_STAR_["_"]);if(or__3133__auto____$1)
{return or__3133__auto____$1;
} else
{throw cljs.core.missing_protocol.call(null,"Mix.toggle*",m);
}
}
})().call(null,m,state_map);
}
});
cljs.core.async.solo_mode_STAR_ = (function solo_mode_STAR_(m,mode){if((function (){var and__3124__auto__ = m;if(and__3124__auto__)
{return m.cljs$core$async$Mix$solo_mode_STAR_$arity$2;
} else
{return and__3124__auto__;
}
})())
{return m.cljs$core$async$Mix$solo_mode_STAR_$arity$2(m,mode);
} else
{var x__3729__auto__ = (((m == null))?null:m);return (function (){var or__3133__auto__ = (cljs.core.async.solo_mode_STAR_[goog.typeOf(x__3729__auto__)]);if(or__3133__auto__)
{return or__3133__auto__;
} else
{var or__3133__auto____$1 = (cljs.core.async.solo_mode_STAR_["_"]);if(or__3133__auto____$1)
{return or__3133__auto____$1;
} else
{throw cljs.core.missing_protocol.call(null,"Mix.solo-mode*",m);
}
}
})().call(null,m,mode);
}
});
/**
* Creates and returns a mix of one or more input channels which will
* be put on the supplied out channel. Input sources can be added to
* the mix with 'admix', and removed with 'unmix'. A mix supports
* soloing, muting and pausing multiple inputs atomically using
* 'toggle', and can solo using either muting or pausing as determined
* by 'solo-mode'.
* 
* Each channel can have zero or more boolean modes set via 'toggle':
* 
* :solo - when true, only this (ond other soloed) channel(s) will appear
* in the mix output channel. :mute and :pause states of soloed
* channels are ignored. If solo-mode is :mute, non-soloed
* channels are muted, if :pause, non-soloed channels are
* paused.
* 
* :mute - muted channels will have their contents consumed but not included in the mix
* :pause - paused channels will not have their contents consumed (and thus also not included in the mix)
*/
cljs.core.async.mix = (function mix(out){var cs = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);var solo_modes = cljs.core.PersistentHashSet.fromArray([new cljs.core.Keyword(null,"pause","pause",1120344424),null,new cljs.core.Keyword(null,"mute","mute",1017267595),null], true);var attrs = cljs.core.conj.call(null,solo_modes,new cljs.core.Keyword(null,"solo","solo",1017440337));var solo_mode = cljs.core.atom.call(null,new cljs.core.Keyword(null,"mute","mute",1017267595));var change = cljs.core.async.chan.call(null);var changed = ((function (cs,solo_modes,attrs,solo_mode,change){
return (function (){return cljs.core.async.put_BANG_.call(null,change,true);
});})(cs,solo_modes,attrs,solo_mode,change))
;var pick = ((function (cs,solo_modes,attrs,solo_mode,change,changed){
return (function (attr,chs){return cljs.core.reduce_kv.call(null,((function (cs,solo_modes,attrs,solo_mode,change,changed){
return (function (ret,c,v){if(cljs.core.truth_(attr.call(null,v)))
{return cljs.core.conj.call(null,ret,c);
} else
{return ret;
}
});})(cs,solo_modes,attrs,solo_mode,change,changed))
,cljs.core.PersistentHashSet.EMPTY,chs);
});})(cs,solo_modes,attrs,solo_mode,change,changed))
;var calc_state = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick){
return (function (){var chs = cljs.core.deref.call(null,cs);var mode = cljs.core.deref.call(null,solo_mode);var solos = pick.call(null,new cljs.core.Keyword(null,"solo","solo",1017440337),chs);var pauses = pick.call(null,new cljs.core.Keyword(null,"pause","pause",1120344424),chs);return cljs.core.PersistentArrayMap.fromArray([new cljs.core.Keyword(null,"solos","solos",1123523302),solos,new cljs.core.Keyword(null,"mutes","mutes",1118168300),pick.call(null,new cljs.core.Keyword(null,"mute","mute",1017267595),chs),new cljs.core.Keyword(null,"reads","reads",1122290959),cljs.core.conj.call(null,(((cljs.core._EQ_.call(null,mode,new cljs.core.Keyword(null,"pause","pause",1120344424))) && (!(cljs.core.empty_QMARK_.call(null,solos))))?cljs.core.vec.call(null,solos):cljs.core.vec.call(null,cljs.core.remove.call(null,pauses,cljs.core.keys.call(null,chs)))),change)], true);
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick))
;var m = (function (){if(typeof cljs.core.async.t19475 !== 'undefined')
{} else
{
/**
* @constructor
*/
cljs.core.async.t19475 = (function (pick,out,attrs,cs,calc_state,solo_modes,mix,changed,change,solo_mode,meta19476){
this.pick = pick;
this.out = out;
this.attrs = attrs;
this.cs = cs;
this.calc_state = calc_state;
this.solo_modes = solo_modes;
this.mix = mix;
this.changed = changed;
this.change = change;
this.solo_mode = solo_mode;
this.meta19476 = meta19476;
this.cljs$lang$protocol_mask$partition1$ = 0;
this.cljs$lang$protocol_mask$partition0$ = 393216;
})
cljs.core.async.t19475.cljs$lang$type = true;
cljs.core.async.t19475.cljs$lang$ctorStr = "cljs.core.async/t19475";
cljs.core.async.t19475.cljs$lang$ctorPrWriter = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state){
return (function (this__3670__auto__,writer__3671__auto__,opt__3672__auto__){return cljs.core._write.call(null,writer__3671__auto__,"cljs.core.async/t19475");
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state))
;
cljs.core.async.t19475.prototype.cljs$core$async$Mix$ = true;
cljs.core.async.t19475.prototype.cljs$core$async$Mix$admix_STAR_$arity$2 = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state){
return (function (_,ch){var self__ = this;
var ___$1 = this;cljs.core.swap_BANG_.call(null,self__.cs,cljs.core.assoc,ch,cljs.core.PersistentArrayMap.EMPTY);
return self__.changed.call(null);
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state))
;
cljs.core.async.t19475.prototype.cljs$core$async$Mix$unmix_STAR_$arity$2 = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state){
return (function (_,ch){var self__ = this;
var ___$1 = this;cljs.core.swap_BANG_.call(null,self__.cs,cljs.core.dissoc,ch);
return self__.changed.call(null);
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state))
;
cljs.core.async.t19475.prototype.cljs$core$async$Mix$unmix_all_STAR_$arity$1 = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state){
return (function (_){var self__ = this;
var ___$1 = this;cljs.core.reset_BANG_.call(null,self__.cs,cljs.core.PersistentArrayMap.EMPTY);
return self__.changed.call(null);
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state))
;
cljs.core.async.t19475.prototype.cljs$core$async$Mix$toggle_STAR_$arity$2 = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state){
return (function (_,state_map){var self__ = this;
var ___$1 = this;cljs.core.swap_BANG_.call(null,self__.cs,cljs.core.partial.call(null,cljs.core.merge_with,cljs.core.merge),state_map);
return self__.changed.call(null);
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state))
;
cljs.core.async.t19475.prototype.cljs$core$async$Mix$solo_mode_STAR_$arity$2 = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state){
return (function (_,mode){var self__ = this;
var ___$1 = this;if(cljs.core.truth_(self__.solo_modes.call(null,mode)))
{} else
{throw (new Error([cljs.core.str("Assert failed: "),cljs.core.str([cljs.core.str("mode must be one of: "),cljs.core.str(self__.solo_modes)].join('')),cljs.core.str("\n"),cljs.core.str(cljs.core.pr_str.call(null,cljs.core.list(new cljs.core.Symbol(null,"solo-modes","solo-modes",-1162732933,null),new cljs.core.Symbol(null,"mode","mode",-1637174436,null))))].join('')));
}
cljs.core.reset_BANG_.call(null,self__.solo_mode,mode);
return self__.changed.call(null);
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state))
;
cljs.core.async.t19475.prototype.cljs$core$async$Mux$ = true;
cljs.core.async.t19475.prototype.cljs$core$async$Mux$muxch_STAR_$arity$1 = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state){
return (function (_){var self__ = this;
var ___$1 = this;return self__.out;
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state))
;
cljs.core.async.t19475.prototype.cljs$core$IMeta$_meta$arity$1 = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state){
return (function (_19477){var self__ = this;
var _19477__$1 = this;return self__.meta19476;
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state))
;
cljs.core.async.t19475.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state){
return (function (_19477,meta19476__$1){var self__ = this;
var _19477__$1 = this;return (new cljs.core.async.t19475(self__.pick,self__.out,self__.attrs,self__.cs,self__.calc_state,self__.solo_modes,self__.mix,self__.changed,self__.change,self__.solo_mode,meta19476__$1));
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state))
;
cljs.core.async.__GT_t19475 = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state){
return (function __GT_t19475(pick__$1,out__$1,attrs__$1,cs__$1,calc_state__$1,solo_modes__$1,mix__$1,changed__$1,change__$1,solo_mode__$1,meta19476){return (new cljs.core.async.t19475(pick__$1,out__$1,attrs__$1,cs__$1,calc_state__$1,solo_modes__$1,mix__$1,changed__$1,change__$1,solo_mode__$1,meta19476));
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state))
;
}
return (new cljs.core.async.t19475(pick,out,attrs,cs,calc_state,solo_modes,mix,changed,change,solo_mode,null));
})();var c__5494__auto___19584 = cljs.core.async.chan.call(null,1);cljs.core.async.impl.dispatch.run.call(null,(function (){var f__5495__auto__ = (function (){var switch__5424__auto__ = (function (state_19542){var state_val_19543 = (state_19542[1]);if((state_val_19543 === 1))
{var inst_19481 = (state_19542[7]);var inst_19481__$1 = calc_state.call(null);var inst_19482 = cljs.core.seq_QMARK_.call(null,inst_19481__$1);var state_19542__$1 = (function (){var statearr_19544 = state_19542;(statearr_19544[7] = inst_19481__$1);
return statearr_19544;
})();if(inst_19482)
{var statearr_19545_19585 = state_19542__$1;(statearr_19545_19585[1] = 2);
} else
{var statearr_19546_19586 = state_19542__$1;(statearr_19546_19586[1] = 3);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_19543 === 2))
{var inst_19481 = (state_19542[7]);var inst_19484 = cljs.core.apply.call(null,cljs.core.hash_map,inst_19481);var state_19542__$1 = state_19542;var statearr_19547_19587 = state_19542__$1;(statearr_19547_19587[2] = inst_19484);
(statearr_19547_19587[1] = 4);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_19543 === 3))
{var inst_19481 = (state_19542[7]);var state_19542__$1 = state_19542;var statearr_19548_19588 = state_19542__$1;(statearr_19548_19588[2] = inst_19481);
(statearr_19548_19588[1] = 4);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_19543 === 4))
{var inst_19481 = (state_19542[7]);var inst_19487 = (state_19542[2]);var inst_19488 = cljs.core.get.call(null,inst_19487,new cljs.core.Keyword(null,"reads","reads",1122290959));var inst_19489 = cljs.core.get.call(null,inst_19487,new cljs.core.Keyword(null,"mutes","mutes",1118168300));var inst_19490 = cljs.core.get.call(null,inst_19487,new cljs.core.Keyword(null,"solos","solos",1123523302));var inst_19491 = inst_19481;var state_19542__$1 = (function (){var statearr_19549 = state_19542;(statearr_19549[8] = inst_19491);
(statearr_19549[9] = inst_19490);
(statearr_19549[10] = inst_19489);
(statearr_19549[11] = inst_19488);
return statearr_19549;
})();var statearr_19550_19589 = state_19542__$1;(statearr_19550_19589[2] = null);
(statearr_19550_19589[1] = 5);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_19543 === 5))
{var inst_19491 = (state_19542[8]);var inst_19494 = cljs.core.seq_QMARK_.call(null,inst_19491);var state_19542__$1 = state_19542;if(inst_19494)
{var statearr_19551_19590 = state_19542__$1;(statearr_19551_19590[1] = 7);
} else
{var statearr_19552_19591 = state_19542__$1;(statearr_19552_19591[1] = 8);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_19543 === 6))
{var inst_19540 = (state_19542[2]);var state_19542__$1 = state_19542;return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_19542__$1,inst_19540);
} else
{if((state_val_19543 === 7))
{var inst_19491 = (state_19542[8]);var inst_19496 = cljs.core.apply.call(null,cljs.core.hash_map,inst_19491);var state_19542__$1 = state_19542;var statearr_19553_19592 = state_19542__$1;(statearr_19553_19592[2] = inst_19496);
(statearr_19553_19592[1] = 9);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_19543 === 8))
{var inst_19491 = (state_19542[8]);var state_19542__$1 = state_19542;var statearr_19554_19593 = state_19542__$1;(statearr_19554_19593[2] = inst_19491);
(statearr_19554_19593[1] = 9);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_19543 === 9))
{var inst_19499 = (state_19542[12]);var inst_19499__$1 = (state_19542[2]);var inst_19500 = cljs.core.get.call(null,inst_19499__$1,new cljs.core.Keyword(null,"reads","reads",1122290959));var inst_19501 = cljs.core.get.call(null,inst_19499__$1,new cljs.core.Keyword(null,"mutes","mutes",1118168300));var inst_19502 = cljs.core.get.call(null,inst_19499__$1,new cljs.core.Keyword(null,"solos","solos",1123523302));var state_19542__$1 = (function (){var statearr_19555 = state_19542;(statearr_19555[12] = inst_19499__$1);
(statearr_19555[13] = inst_19502);
(statearr_19555[14] = inst_19501);
return statearr_19555;
})();return cljs.core.async.impl.ioc_helpers.ioc_alts_BANG_.call(null,state_19542__$1,10,inst_19500);
} else
{if((state_val_19543 === 10))
{var inst_19507 = (state_19542[15]);var inst_19506 = (state_19542[16]);var inst_19505 = (state_19542[2]);var inst_19506__$1 = cljs.core.nth.call(null,inst_19505,0,null);var inst_19507__$1 = cljs.core.nth.call(null,inst_19505,1,null);var inst_19508 = (inst_19506__$1 == null);var inst_19509 = cljs.core._EQ_.call(null,inst_19507__$1,change);var inst_19510 = (inst_19508) || (inst_19509);var state_19542__$1 = (function (){var statearr_19556 = state_19542;(statearr_19556[15] = inst_19507__$1);
(statearr_19556[16] = inst_19506__$1);
return statearr_19556;
})();if(cljs.core.truth_(inst_19510))
{var statearr_19557_19594 = state_19542__$1;(statearr_19557_19594[1] = 11);
} else
{var statearr_19558_19595 = state_19542__$1;(statearr_19558_19595[1] = 12);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_19543 === 11))
{var inst_19506 = (state_19542[16]);var inst_19512 = (inst_19506 == null);var state_19542__$1 = state_19542;if(cljs.core.truth_(inst_19512))
{var statearr_19559_19596 = state_19542__$1;(statearr_19559_19596[1] = 14);
} else
{var statearr_19560_19597 = state_19542__$1;(statearr_19560_19597[1] = 15);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_19543 === 12))
{var inst_19507 = (state_19542[15]);var inst_19502 = (state_19542[13]);var inst_19521 = (state_19542[17]);var inst_19521__$1 = inst_19502.call(null,inst_19507);var state_19542__$1 = (function (){var statearr_19561 = state_19542;(statearr_19561[17] = inst_19521__$1);
return statearr_19561;
})();if(cljs.core.truth_(inst_19521__$1))
{var statearr_19562_19598 = state_19542__$1;(statearr_19562_19598[1] = 17);
} else
{var statearr_19563_19599 = state_19542__$1;(statearr_19563_19599[1] = 18);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_19543 === 13))
{var inst_19538 = (state_19542[2]);var state_19542__$1 = state_19542;var statearr_19564_19600 = state_19542__$1;(statearr_19564_19600[2] = inst_19538);
(statearr_19564_19600[1] = 6);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_19543 === 14))
{var inst_19507 = (state_19542[15]);var inst_19514 = cljs.core.swap_BANG_.call(null,cs,cljs.core.dissoc,inst_19507);var state_19542__$1 = state_19542;var statearr_19565_19601 = state_19542__$1;(statearr_19565_19601[2] = inst_19514);
(statearr_19565_19601[1] = 16);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_19543 === 15))
{var state_19542__$1 = state_19542;var statearr_19566_19602 = state_19542__$1;(statearr_19566_19602[2] = null);
(statearr_19566_19602[1] = 16);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_19543 === 16))
{var inst_19517 = (state_19542[2]);var inst_19518 = calc_state.call(null);var inst_19491 = inst_19518;var state_19542__$1 = (function (){var statearr_19567 = state_19542;(statearr_19567[8] = inst_19491);
(statearr_19567[18] = inst_19517);
return statearr_19567;
})();var statearr_19568_19603 = state_19542__$1;(statearr_19568_19603[2] = null);
(statearr_19568_19603[1] = 5);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_19543 === 17))
{var inst_19521 = (state_19542[17]);var state_19542__$1 = state_19542;var statearr_19569_19604 = state_19542__$1;(statearr_19569_19604[2] = inst_19521);
(statearr_19569_19604[1] = 19);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_19543 === 18))
{var inst_19507 = (state_19542[15]);var inst_19502 = (state_19542[13]);var inst_19501 = (state_19542[14]);var inst_19524 = cljs.core.empty_QMARK_.call(null,inst_19502);var inst_19525 = inst_19501.call(null,inst_19507);var inst_19526 = cljs.core.not.call(null,inst_19525);var inst_19527 = (inst_19524) && (inst_19526);var state_19542__$1 = state_19542;var statearr_19570_19605 = state_19542__$1;(statearr_19570_19605[2] = inst_19527);
(statearr_19570_19605[1] = 19);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_19543 === 19))
{var inst_19529 = (state_19542[2]);var state_19542__$1 = state_19542;if(cljs.core.truth_(inst_19529))
{var statearr_19571_19606 = state_19542__$1;(statearr_19571_19606[1] = 20);
} else
{var statearr_19572_19607 = state_19542__$1;(statearr_19572_19607[1] = 21);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_19543 === 20))
{var inst_19506 = (state_19542[16]);var state_19542__$1 = state_19542;return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_19542__$1,23,out,inst_19506);
} else
{if((state_val_19543 === 21))
{var state_19542__$1 = state_19542;var statearr_19573_19608 = state_19542__$1;(statearr_19573_19608[2] = null);
(statearr_19573_19608[1] = 22);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_19543 === 22))
{var inst_19499 = (state_19542[12]);var inst_19535 = (state_19542[2]);var inst_19491 = inst_19499;var state_19542__$1 = (function (){var statearr_19574 = state_19542;(statearr_19574[19] = inst_19535);
(statearr_19574[8] = inst_19491);
return statearr_19574;
})();var statearr_19575_19609 = state_19542__$1;(statearr_19575_19609[2] = null);
(statearr_19575_19609[1] = 5);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_19543 === 23))
{var inst_19532 = (state_19542[2]);var state_19542__$1 = state_19542;var statearr_19576_19610 = state_19542__$1;(statearr_19576_19610[2] = inst_19532);
(statearr_19576_19610[1] = 22);
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
});return ((function (switch__5424__auto__){
return (function() {
var state_machine__5425__auto__ = null;
var state_machine__5425__auto____0 = (function (){var statearr_19580 = (new Array(20));(statearr_19580[0] = state_machine__5425__auto__);
(statearr_19580[1] = 1);
return statearr_19580;
});
var state_machine__5425__auto____1 = (function (state_19542){while(true){
var ret_value__5426__auto__ = (function (){try{while(true){
var result__5427__auto__ = switch__5424__auto__.call(null,state_19542);if(cljs.core.keyword_identical_QMARK_.call(null,result__5427__auto__,new cljs.core.Keyword(null,"recur","recur",1122293407)))
{{
continue;
}
} else
{return result__5427__auto__;
}
break;
}
}catch (e19581){if((e19581 instanceof Object))
{var ex__5428__auto__ = e19581;var statearr_19582_19611 = state_19542;(statearr_19582_19611[5] = ex__5428__auto__);
cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_19542);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if(new cljs.core.Keyword(null,"else","else",1017020587))
{throw e19581;
} else
{return null;
}
}
}})();if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__5426__auto__,new cljs.core.Keyword(null,"recur","recur",1122293407)))
{{
var G__19612 = state_19542;
state_19542 = G__19612;
continue;
}
} else
{return ret_value__5426__auto__;
}
break;
}
});
state_machine__5425__auto__ = function(state_19542){
switch(arguments.length){
case 0:
return state_machine__5425__auto____0.call(this);
case 1:
return state_machine__5425__auto____1.call(this,state_19542);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
state_machine__5425__auto__.cljs$core$IFn$_invoke$arity$0 = state_machine__5425__auto____0;
state_machine__5425__auto__.cljs$core$IFn$_invoke$arity$1 = state_machine__5425__auto____1;
return state_machine__5425__auto__;
})()
;})(switch__5424__auto__))
})();var state__5496__auto__ = (function (){var statearr_19583 = f__5495__auto__.call(null);(statearr_19583[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__5494__auto___19584);
return statearr_19583;
})();return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__5496__auto__);
}));
return m;
});
/**
* Adds ch as an input to the mix
*/
cljs.core.async.admix = (function admix(mix,ch){return cljs.core.async.admix_STAR_.call(null,mix,ch);
});
/**
* Removes ch as an input to the mix
*/
cljs.core.async.unmix = (function unmix(mix,ch){return cljs.core.async.unmix_STAR_.call(null,mix,ch);
});
/**
* removes all inputs from the mix
*/
cljs.core.async.unmix_all = (function unmix_all(mix){return cljs.core.async.unmix_all_STAR_.call(null,mix);
});
/**
* Atomically sets the state(s) of one or more channels in a mix. The
* state map is a map of channels -> channel-state-map. A
* channel-state-map is a map of attrs -> boolean, where attr is one or
* more of :mute, :pause or :solo. Any states supplied are merged with
* the current state.
* 
* Note that channels can be added to a mix via toggle, which can be
* used to add channels in a particular (e.g. paused) state.
*/
cljs.core.async.toggle = (function toggle(mix,state_map){return cljs.core.async.toggle_STAR_.call(null,mix,state_map);
});
/**
* Sets the solo mode of the mix. mode must be one of :mute or :pause
*/
cljs.core.async.solo_mode = (function solo_mode(mix,mode){return cljs.core.async.solo_mode_STAR_.call(null,mix,mode);
});
cljs.core.async.Pub = {};
cljs.core.async.sub_STAR_ = (function sub_STAR_(p,v,ch,close_QMARK_){if((function (){var and__3124__auto__ = p;if(and__3124__auto__)
{return p.cljs$core$async$Pub$sub_STAR_$arity$4;
} else
{return and__3124__auto__;
}
})())
{return p.cljs$core$async$Pub$sub_STAR_$arity$4(p,v,ch,close_QMARK_);
} else
{var x__3729__auto__ = (((p == null))?null:p);return (function (){var or__3133__auto__ = (cljs.core.async.sub_STAR_[goog.typeOf(x__3729__auto__)]);if(or__3133__auto__)
{return or__3133__auto__;
} else
{var or__3133__auto____$1 = (cljs.core.async.sub_STAR_["_"]);if(or__3133__auto____$1)
{return or__3133__auto____$1;
} else
{throw cljs.core.missing_protocol.call(null,"Pub.sub*",p);
}
}
})().call(null,p,v,ch,close_QMARK_);
}
});
cljs.core.async.unsub_STAR_ = (function unsub_STAR_(p,v,ch){if((function (){var and__3124__auto__ = p;if(and__3124__auto__)
{return p.cljs$core$async$Pub$unsub_STAR_$arity$3;
} else
{return and__3124__auto__;
}
})())
{return p.cljs$core$async$Pub$unsub_STAR_$arity$3(p,v,ch);
} else
{var x__3729__auto__ = (((p == null))?null:p);return (function (){var or__3133__auto__ = (cljs.core.async.unsub_STAR_[goog.typeOf(x__3729__auto__)]);if(or__3133__auto__)
{return or__3133__auto__;
} else
{var or__3133__auto____$1 = (cljs.core.async.unsub_STAR_["_"]);if(or__3133__auto____$1)
{return or__3133__auto____$1;
} else
{throw cljs.core.missing_protocol.call(null,"Pub.unsub*",p);
}
}
})().call(null,p,v,ch);
}
});
cljs.core.async.unsub_all_STAR_ = (function() {
var unsub_all_STAR_ = null;
var unsub_all_STAR___1 = (function (p){if((function (){var and__3124__auto__ = p;if(and__3124__auto__)
{return p.cljs$core$async$Pub$unsub_all_STAR_$arity$1;
} else
{return and__3124__auto__;
}
})())
{return p.cljs$core$async$Pub$unsub_all_STAR_$arity$1(p);
} else
{var x__3729__auto__ = (((p == null))?null:p);return (function (){var or__3133__auto__ = (cljs.core.async.unsub_all_STAR_[goog.typeOf(x__3729__auto__)]);if(or__3133__auto__)
{return or__3133__auto__;
} else
{var or__3133__auto____$1 = (cljs.core.async.unsub_all_STAR_["_"]);if(or__3133__auto____$1)
{return or__3133__auto____$1;
} else
{throw cljs.core.missing_protocol.call(null,"Pub.unsub-all*",p);
}
}
})().call(null,p);
}
});
var unsub_all_STAR___2 = (function (p,v){if((function (){var and__3124__auto__ = p;if(and__3124__auto__)
{return p.cljs$core$async$Pub$unsub_all_STAR_$arity$2;
} else
{return and__3124__auto__;
}
})())
{return p.cljs$core$async$Pub$unsub_all_STAR_$arity$2(p,v);
} else
{var x__3729__auto__ = (((p == null))?null:p);return (function (){var or__3133__auto__ = (cljs.core.async.unsub_all_STAR_[goog.typeOf(x__3729__auto__)]);if(or__3133__auto__)
{return or__3133__auto__;
} else
{var or__3133__auto____$1 = (cljs.core.async.unsub_all_STAR_["_"]);if(or__3133__auto____$1)
{return or__3133__auto____$1;
} else
{throw cljs.core.missing_protocol.call(null,"Pub.unsub-all*",p);
}
}
})().call(null,p,v);
}
});
unsub_all_STAR_ = function(p,v){
switch(arguments.length){
case 1:
return unsub_all_STAR___1.call(this,p);
case 2:
return unsub_all_STAR___2.call(this,p,v);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
unsub_all_STAR_.cljs$core$IFn$_invoke$arity$1 = unsub_all_STAR___1;
unsub_all_STAR_.cljs$core$IFn$_invoke$arity$2 = unsub_all_STAR___2;
return unsub_all_STAR_;
})()
;
/**
* Creates and returns a pub(lication) of the supplied channel,
* partitioned into topics by the topic-fn. topic-fn will be applied to
* each value on the channel and the result will determine the 'topic'
* on which that value will be put. Channels can be subscribed to
* receive copies of topics using 'sub', and unsubscribed using
* 'unsub'. Each topic will be handled by an internal mult on a
* dedicated channel. By default these internal channels are
* unbuffered, but a buf-fn can be supplied which, given a topic,
* creates a buffer with desired properties.
* 
* Each item is distributed to all subs in parallel and synchronously,
* i.e. each sub must accept before the next item is distributed. Use
* buffering/windowing to prevent slow subs from holding up the pub.
* 
* Note that if buf-fns are used then each topic is handled
* asynchronously, i.e. if a channel is subscribed to more than one
* topic it should not expect them to be interleaved identically with
* the source.
*/
cljs.core.async.pub = (function() {
var pub = null;
var pub__2 = (function (ch,topic_fn){return pub.call(null,ch,topic_fn,cljs.core.constantly.call(null,null));
});
var pub__3 = (function (ch,topic_fn,buf_fn){var mults = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);var ensure_mult = ((function (mults){
return (function (topic){var or__3133__auto__ = cljs.core.get.call(null,cljs.core.deref.call(null,mults),topic);if(cljs.core.truth_(or__3133__auto__))
{return or__3133__auto__;
} else
{return cljs.core.get.call(null,cljs.core.swap_BANG_.call(null,mults,((function (or__3133__auto__,mults){
return (function (p1__19613_SHARP_){if(cljs.core.truth_(p1__19613_SHARP_.call(null,topic)))
{return p1__19613_SHARP_;
} else
{return cljs.core.assoc.call(null,p1__19613_SHARP_,topic,cljs.core.async.mult.call(null,cljs.core.async.chan.call(null,buf_fn.call(null,topic))));
}
});})(or__3133__auto__,mults))
),topic);
}
});})(mults))
;var p = (function (){if(typeof cljs.core.async.t19738 !== 'undefined')
{} else
{
/**
* @constructor
*/
cljs.core.async.t19738 = (function (ensure_mult,mults,buf_fn,topic_fn,ch,pub,meta19739){
this.ensure_mult = ensure_mult;
this.mults = mults;
this.buf_fn = buf_fn;
this.topic_fn = topic_fn;
this.ch = ch;
this.pub = pub;
this.meta19739 = meta19739;
this.cljs$lang$protocol_mask$partition1$ = 0;
this.cljs$lang$protocol_mask$partition0$ = 393216;
})
cljs.core.async.t19738.cljs$lang$type = true;
cljs.core.async.t19738.cljs$lang$ctorStr = "cljs.core.async/t19738";
cljs.core.async.t19738.cljs$lang$ctorPrWriter = ((function (mults,ensure_mult){
return (function (this__3670__auto__,writer__3671__auto__,opt__3672__auto__){return cljs.core._write.call(null,writer__3671__auto__,"cljs.core.async/t19738");
});})(mults,ensure_mult))
;
cljs.core.async.t19738.prototype.cljs$core$async$Pub$ = true;
cljs.core.async.t19738.prototype.cljs$core$async$Pub$sub_STAR_$arity$4 = ((function (mults,ensure_mult){
return (function (p,topic,ch__$2,close_QMARK_){var self__ = this;
var p__$1 = this;var m = self__.ensure_mult.call(null,topic);return cljs.core.async.tap.call(null,m,ch__$2,close_QMARK_);
});})(mults,ensure_mult))
;
cljs.core.async.t19738.prototype.cljs$core$async$Pub$unsub_STAR_$arity$3 = ((function (mults,ensure_mult){
return (function (p,topic,ch__$2){var self__ = this;
var p__$1 = this;var temp__4092__auto__ = cljs.core.get.call(null,cljs.core.deref.call(null,self__.mults),topic);if(cljs.core.truth_(temp__4092__auto__))
{var m = temp__4092__auto__;return cljs.core.async.untap.call(null,m,ch__$2);
} else
{return null;
}
});})(mults,ensure_mult))
;
cljs.core.async.t19738.prototype.cljs$core$async$Pub$unsub_all_STAR_$arity$1 = ((function (mults,ensure_mult){
return (function (_){var self__ = this;
var ___$1 = this;return cljs.core.reset_BANG_.call(null,self__.mults,cljs.core.PersistentArrayMap.EMPTY);
});})(mults,ensure_mult))
;
cljs.core.async.t19738.prototype.cljs$core$async$Pub$unsub_all_STAR_$arity$2 = ((function (mults,ensure_mult){
return (function (_,topic){var self__ = this;
var ___$1 = this;return cljs.core.swap_BANG_.call(null,self__.mults,cljs.core.dissoc,topic);
});})(mults,ensure_mult))
;
cljs.core.async.t19738.prototype.cljs$core$async$Mux$ = true;
cljs.core.async.t19738.prototype.cljs$core$async$Mux$muxch_STAR_$arity$1 = ((function (mults,ensure_mult){
return (function (_){var self__ = this;
var ___$1 = this;return self__.ch;
});})(mults,ensure_mult))
;
cljs.core.async.t19738.prototype.cljs$core$IMeta$_meta$arity$1 = ((function (mults,ensure_mult){
return (function (_19740){var self__ = this;
var _19740__$1 = this;return self__.meta19739;
});})(mults,ensure_mult))
;
cljs.core.async.t19738.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = ((function (mults,ensure_mult){
return (function (_19740,meta19739__$1){var self__ = this;
var _19740__$1 = this;return (new cljs.core.async.t19738(self__.ensure_mult,self__.mults,self__.buf_fn,self__.topic_fn,self__.ch,self__.pub,meta19739__$1));
});})(mults,ensure_mult))
;
cljs.core.async.__GT_t19738 = ((function (mults,ensure_mult){
return (function __GT_t19738(ensure_mult__$1,mults__$1,buf_fn__$1,topic_fn__$1,ch__$1,pub__$1,meta19739){return (new cljs.core.async.t19738(ensure_mult__$1,mults__$1,buf_fn__$1,topic_fn__$1,ch__$1,pub__$1,meta19739));
});})(mults,ensure_mult))
;
}
return (new cljs.core.async.t19738(ensure_mult,mults,buf_fn,topic_fn,ch,pub,null));
})();var c__5494__auto___19862 = cljs.core.async.chan.call(null,1);cljs.core.async.impl.dispatch.run.call(null,(function (){var f__5495__auto__ = (function (){var switch__5424__auto__ = (function (state_19814){var state_val_19815 = (state_19814[1]);if((state_val_19815 === 1))
{var state_19814__$1 = state_19814;var statearr_19816_19863 = state_19814__$1;(statearr_19816_19863[2] = null);
(statearr_19816_19863[1] = 2);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_19815 === 2))
{var state_19814__$1 = state_19814;return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_19814__$1,4,ch);
} else
{if((state_val_19815 === 3))
{var inst_19812 = (state_19814[2]);var state_19814__$1 = state_19814;return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_19814__$1,inst_19812);
} else
{if((state_val_19815 === 4))
{var inst_19743 = (state_19814[7]);var inst_19743__$1 = (state_19814[2]);var inst_19744 = (inst_19743__$1 == null);var state_19814__$1 = (function (){var statearr_19817 = state_19814;(statearr_19817[7] = inst_19743__$1);
return statearr_19817;
})();if(cljs.core.truth_(inst_19744))
{var statearr_19818_19864 = state_19814__$1;(statearr_19818_19864[1] = 5);
} else
{var statearr_19819_19865 = state_19814__$1;(statearr_19819_19865[1] = 6);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_19815 === 5))
{var inst_19750 = cljs.core.deref.call(null,mults);var inst_19751 = cljs.core.vals.call(null,inst_19750);var inst_19752 = cljs.core.seq.call(null,inst_19751);var inst_19753 = inst_19752;var inst_19754 = null;var inst_19755 = 0;var inst_19756 = 0;var state_19814__$1 = (function (){var statearr_19820 = state_19814;(statearr_19820[8] = inst_19755);
(statearr_19820[9] = inst_19756);
(statearr_19820[10] = inst_19753);
(statearr_19820[11] = inst_19754);
return statearr_19820;
})();var statearr_19821_19866 = state_19814__$1;(statearr_19821_19866[2] = null);
(statearr_19821_19866[1] = 8);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_19815 === 6))
{var inst_19791 = (state_19814[12]);var inst_19743 = (state_19814[7]);var inst_19793 = (state_19814[13]);var inst_19791__$1 = topic_fn.call(null,inst_19743);var inst_19792 = cljs.core.deref.call(null,mults);var inst_19793__$1 = cljs.core.get.call(null,inst_19792,inst_19791__$1);var state_19814__$1 = (function (){var statearr_19822 = state_19814;(statearr_19822[12] = inst_19791__$1);
(statearr_19822[13] = inst_19793__$1);
return statearr_19822;
})();if(cljs.core.truth_(inst_19793__$1))
{var statearr_19823_19867 = state_19814__$1;(statearr_19823_19867[1] = 19);
} else
{var statearr_19824_19868 = state_19814__$1;(statearr_19824_19868[1] = 20);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_19815 === 7))
{var inst_19810 = (state_19814[2]);var state_19814__$1 = state_19814;var statearr_19825_19869 = state_19814__$1;(statearr_19825_19869[2] = inst_19810);
(statearr_19825_19869[1] = 3);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_19815 === 8))
{var inst_19755 = (state_19814[8]);var inst_19756 = (state_19814[9]);var inst_19758 = (inst_19756 < inst_19755);var inst_19759 = inst_19758;var state_19814__$1 = state_19814;if(cljs.core.truth_(inst_19759))
{var statearr_19829_19870 = state_19814__$1;(statearr_19829_19870[1] = 10);
} else
{var statearr_19830_19871 = state_19814__$1;(statearr_19830_19871[1] = 11);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_19815 === 9))
{var inst_19789 = (state_19814[2]);var state_19814__$1 = state_19814;var statearr_19831_19872 = state_19814__$1;(statearr_19831_19872[2] = inst_19789);
(statearr_19831_19872[1] = 7);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_19815 === 10))
{var inst_19755 = (state_19814[8]);var inst_19756 = (state_19814[9]);var inst_19753 = (state_19814[10]);var inst_19754 = (state_19814[11]);var inst_19761 = cljs.core._nth.call(null,inst_19754,inst_19756);var inst_19762 = cljs.core.async.muxch_STAR_.call(null,inst_19761);var inst_19763 = cljs.core.async.close_BANG_.call(null,inst_19762);var inst_19764 = (inst_19756 + 1);var tmp19826 = inst_19755;var tmp19827 = inst_19753;var tmp19828 = inst_19754;var inst_19753__$1 = tmp19827;var inst_19754__$1 = tmp19828;var inst_19755__$1 = tmp19826;var inst_19756__$1 = inst_19764;var state_19814__$1 = (function (){var statearr_19832 = state_19814;(statearr_19832[8] = inst_19755__$1);
(statearr_19832[9] = inst_19756__$1);
(statearr_19832[10] = inst_19753__$1);
(statearr_19832[11] = inst_19754__$1);
(statearr_19832[14] = inst_19763);
return statearr_19832;
})();var statearr_19833_19873 = state_19814__$1;(statearr_19833_19873[2] = null);
(statearr_19833_19873[1] = 8);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_19815 === 11))
{var inst_19753 = (state_19814[10]);var inst_19767 = (state_19814[15]);var inst_19767__$1 = cljs.core.seq.call(null,inst_19753);var state_19814__$1 = (function (){var statearr_19834 = state_19814;(statearr_19834[15] = inst_19767__$1);
return statearr_19834;
})();if(inst_19767__$1)
{var statearr_19835_19874 = state_19814__$1;(statearr_19835_19874[1] = 13);
} else
{var statearr_19836_19875 = state_19814__$1;(statearr_19836_19875[1] = 14);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_19815 === 12))
{var inst_19787 = (state_19814[2]);var state_19814__$1 = state_19814;var statearr_19837_19876 = state_19814__$1;(statearr_19837_19876[2] = inst_19787);
(statearr_19837_19876[1] = 9);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_19815 === 13))
{var inst_19767 = (state_19814[15]);var inst_19769 = cljs.core.chunked_seq_QMARK_.call(null,inst_19767);var state_19814__$1 = state_19814;if(inst_19769)
{var statearr_19838_19877 = state_19814__$1;(statearr_19838_19877[1] = 16);
} else
{var statearr_19839_19878 = state_19814__$1;(statearr_19839_19878[1] = 17);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_19815 === 14))
{var state_19814__$1 = state_19814;var statearr_19840_19879 = state_19814__$1;(statearr_19840_19879[2] = null);
(statearr_19840_19879[1] = 15);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_19815 === 15))
{var inst_19785 = (state_19814[2]);var state_19814__$1 = state_19814;var statearr_19841_19880 = state_19814__$1;(statearr_19841_19880[2] = inst_19785);
(statearr_19841_19880[1] = 12);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_19815 === 16))
{var inst_19767 = (state_19814[15]);var inst_19771 = cljs.core.chunk_first.call(null,inst_19767);var inst_19772 = cljs.core.chunk_rest.call(null,inst_19767);var inst_19773 = cljs.core.count.call(null,inst_19771);var inst_19753 = inst_19772;var inst_19754 = inst_19771;var inst_19755 = inst_19773;var inst_19756 = 0;var state_19814__$1 = (function (){var statearr_19842 = state_19814;(statearr_19842[8] = inst_19755);
(statearr_19842[9] = inst_19756);
(statearr_19842[10] = inst_19753);
(statearr_19842[11] = inst_19754);
return statearr_19842;
})();var statearr_19843_19881 = state_19814__$1;(statearr_19843_19881[2] = null);
(statearr_19843_19881[1] = 8);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_19815 === 17))
{var inst_19767 = (state_19814[15]);var inst_19776 = cljs.core.first.call(null,inst_19767);var inst_19777 = cljs.core.async.muxch_STAR_.call(null,inst_19776);var inst_19778 = cljs.core.async.close_BANG_.call(null,inst_19777);var inst_19779 = cljs.core.next.call(null,inst_19767);var inst_19753 = inst_19779;var inst_19754 = null;var inst_19755 = 0;var inst_19756 = 0;var state_19814__$1 = (function (){var statearr_19844 = state_19814;(statearr_19844[16] = inst_19778);
(statearr_19844[8] = inst_19755);
(statearr_19844[9] = inst_19756);
(statearr_19844[10] = inst_19753);
(statearr_19844[11] = inst_19754);
return statearr_19844;
})();var statearr_19845_19882 = state_19814__$1;(statearr_19845_19882[2] = null);
(statearr_19845_19882[1] = 8);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_19815 === 18))
{var inst_19782 = (state_19814[2]);var state_19814__$1 = state_19814;var statearr_19846_19883 = state_19814__$1;(statearr_19846_19883[2] = inst_19782);
(statearr_19846_19883[1] = 15);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_19815 === 19))
{var state_19814__$1 = state_19814;var statearr_19847_19884 = state_19814__$1;(statearr_19847_19884[2] = null);
(statearr_19847_19884[1] = 24);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_19815 === 20))
{var state_19814__$1 = state_19814;var statearr_19848_19885 = state_19814__$1;(statearr_19848_19885[2] = null);
(statearr_19848_19885[1] = 21);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_19815 === 21))
{var inst_19807 = (state_19814[2]);var state_19814__$1 = (function (){var statearr_19849 = state_19814;(statearr_19849[17] = inst_19807);
return statearr_19849;
})();var statearr_19850_19886 = state_19814__$1;(statearr_19850_19886[2] = null);
(statearr_19850_19886[1] = 2);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_19815 === 22))
{var inst_19804 = (state_19814[2]);var state_19814__$1 = state_19814;var statearr_19851_19887 = state_19814__$1;(statearr_19851_19887[2] = inst_19804);
(statearr_19851_19887[1] = 21);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_19815 === 23))
{var inst_19791 = (state_19814[12]);var inst_19795 = (state_19814[2]);var inst_19796 = cljs.core.swap_BANG_.call(null,mults,cljs.core.dissoc,inst_19791);var state_19814__$1 = (function (){var statearr_19852 = state_19814;(statearr_19852[18] = inst_19795);
return statearr_19852;
})();var statearr_19853_19888 = state_19814__$1;(statearr_19853_19888[2] = inst_19796);
cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_19814__$1);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_19815 === 24))
{var inst_19743 = (state_19814[7]);var inst_19793 = (state_19814[13]);var _ = cljs.core.async.impl.ioc_helpers.add_exception_frame.call(null,state_19814,23,Object,null,22);var inst_19800 = cljs.core.async.muxch_STAR_.call(null,inst_19793);var state_19814__$1 = state_19814;return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_19814__$1,25,inst_19800,inst_19743);
} else
{if((state_val_19815 === 25))
{var inst_19802 = (state_19814[2]);var state_19814__$1 = state_19814;var statearr_19854_19889 = state_19814__$1;(statearr_19854_19889[2] = inst_19802);
cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_19814__$1);
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
});return ((function (switch__5424__auto__){
return (function() {
var state_machine__5425__auto__ = null;
var state_machine__5425__auto____0 = (function (){var statearr_19858 = (new Array(19));(statearr_19858[0] = state_machine__5425__auto__);
(statearr_19858[1] = 1);
return statearr_19858;
});
var state_machine__5425__auto____1 = (function (state_19814){while(true){
var ret_value__5426__auto__ = (function (){try{while(true){
var result__5427__auto__ = switch__5424__auto__.call(null,state_19814);if(cljs.core.keyword_identical_QMARK_.call(null,result__5427__auto__,new cljs.core.Keyword(null,"recur","recur",1122293407)))
{{
continue;
}
} else
{return result__5427__auto__;
}
break;
}
}catch (e19859){if((e19859 instanceof Object))
{var ex__5428__auto__ = e19859;var statearr_19860_19890 = state_19814;(statearr_19860_19890[5] = ex__5428__auto__);
cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_19814);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if(new cljs.core.Keyword(null,"else","else",1017020587))
{throw e19859;
} else
{return null;
}
}
}})();if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__5426__auto__,new cljs.core.Keyword(null,"recur","recur",1122293407)))
{{
var G__19891 = state_19814;
state_19814 = G__19891;
continue;
}
} else
{return ret_value__5426__auto__;
}
break;
}
});
state_machine__5425__auto__ = function(state_19814){
switch(arguments.length){
case 0:
return state_machine__5425__auto____0.call(this);
case 1:
return state_machine__5425__auto____1.call(this,state_19814);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
state_machine__5425__auto__.cljs$core$IFn$_invoke$arity$0 = state_machine__5425__auto____0;
state_machine__5425__auto__.cljs$core$IFn$_invoke$arity$1 = state_machine__5425__auto____1;
return state_machine__5425__auto__;
})()
;})(switch__5424__auto__))
})();var state__5496__auto__ = (function (){var statearr_19861 = f__5495__auto__.call(null);(statearr_19861[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__5494__auto___19862);
return statearr_19861;
})();return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__5496__auto__);
}));
return p;
});
pub = function(ch,topic_fn,buf_fn){
switch(arguments.length){
case 2:
return pub__2.call(this,ch,topic_fn);
case 3:
return pub__3.call(this,ch,topic_fn,buf_fn);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
pub.cljs$core$IFn$_invoke$arity$2 = pub__2;
pub.cljs$core$IFn$_invoke$arity$3 = pub__3;
return pub;
})()
;
/**
* Subscribes a channel to a topic of a pub.
* 
* By default the channel will be closed when the source closes,
* but can be determined by the close? parameter.
*/
cljs.core.async.sub = (function() {
var sub = null;
var sub__3 = (function (p,topic,ch){return sub.call(null,p,topic,ch,true);
});
var sub__4 = (function (p,topic,ch,close_QMARK_){return cljs.core.async.sub_STAR_.call(null,p,topic,ch,close_QMARK_);
});
sub = function(p,topic,ch,close_QMARK_){
switch(arguments.length){
case 3:
return sub__3.call(this,p,topic,ch);
case 4:
return sub__4.call(this,p,topic,ch,close_QMARK_);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
sub.cljs$core$IFn$_invoke$arity$3 = sub__3;
sub.cljs$core$IFn$_invoke$arity$4 = sub__4;
return sub;
})()
;
/**
* Unsubscribes a channel from a topic of a pub
*/
cljs.core.async.unsub = (function unsub(p,topic,ch){return cljs.core.async.unsub_STAR_.call(null,p,topic,ch);
});
/**
* Unsubscribes all channels from a pub, or a topic of a pub
*/
cljs.core.async.unsub_all = (function() {
var unsub_all = null;
var unsub_all__1 = (function (p){return cljs.core.async.unsub_all_STAR_.call(null,p);
});
var unsub_all__2 = (function (p,topic){return cljs.core.async.unsub_all_STAR_.call(null,p,topic);
});
unsub_all = function(p,topic){
switch(arguments.length){
case 1:
return unsub_all__1.call(this,p);
case 2:
return unsub_all__2.call(this,p,topic);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
unsub_all.cljs$core$IFn$_invoke$arity$1 = unsub_all__1;
unsub_all.cljs$core$IFn$_invoke$arity$2 = unsub_all__2;
return unsub_all;
})()
;
/**
* Takes a function and a collection of source channels, and returns a
* channel which contains the values produced by applying f to the set
* of first items taken from each source channel, followed by applying
* f to the set of second items from each channel, until any one of the
* channels is closed, at which point the output channel will be
* closed. The returned channel will be unbuffered by default, or a
* buf-or-n can be supplied
*/
cljs.core.async.map = (function() {
var map = null;
var map__2 = (function (f,chs){return map.call(null,f,chs,null);
});
var map__3 = (function (f,chs,buf_or_n){var chs__$1 = cljs.core.vec.call(null,chs);var out = cljs.core.async.chan.call(null,buf_or_n);var cnt = cljs.core.count.call(null,chs__$1);var rets = cljs.core.object_array.call(null,cnt);var dchan = cljs.core.async.chan.call(null,1);var dctr = cljs.core.atom.call(null,null);var done = cljs.core.mapv.call(null,((function (chs__$1,out,cnt,rets,dchan,dctr){
return (function (i){return ((function (chs__$1,out,cnt,rets,dchan,dctr){
return (function (ret){(rets[i] = ret);
if((cljs.core.swap_BANG_.call(null,dctr,cljs.core.dec) === 0))
{return cljs.core.async.put_BANG_.call(null,dchan,rets.slice(0));
} else
{return null;
}
});
;})(chs__$1,out,cnt,rets,dchan,dctr))
});})(chs__$1,out,cnt,rets,dchan,dctr))
,cljs.core.range.call(null,cnt));var c__5494__auto___20028 = cljs.core.async.chan.call(null,1);cljs.core.async.impl.dispatch.run.call(null,(function (){var f__5495__auto__ = (function (){var switch__5424__auto__ = (function (state_19998){var state_val_19999 = (state_19998[1]);if((state_val_19999 === 1))
{var state_19998__$1 = state_19998;var statearr_20000_20029 = state_19998__$1;(statearr_20000_20029[2] = null);
(statearr_20000_20029[1] = 2);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_19999 === 2))
{var inst_19961 = cljs.core.reset_BANG_.call(null,dctr,cnt);var inst_19962 = 0;var state_19998__$1 = (function (){var statearr_20001 = state_19998;(statearr_20001[7] = inst_19962);
(statearr_20001[8] = inst_19961);
return statearr_20001;
})();var statearr_20002_20030 = state_19998__$1;(statearr_20002_20030[2] = null);
(statearr_20002_20030[1] = 4);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_19999 === 3))
{var inst_19996 = (state_19998[2]);var state_19998__$1 = state_19998;return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_19998__$1,inst_19996);
} else
{if((state_val_19999 === 4))
{var inst_19962 = (state_19998[7]);var inst_19964 = (inst_19962 < cnt);var state_19998__$1 = state_19998;if(cljs.core.truth_(inst_19964))
{var statearr_20003_20031 = state_19998__$1;(statearr_20003_20031[1] = 6);
} else
{var statearr_20004_20032 = state_19998__$1;(statearr_20004_20032[1] = 7);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_19999 === 5))
{var inst_19982 = (state_19998[2]);var state_19998__$1 = (function (){var statearr_20005 = state_19998;(statearr_20005[9] = inst_19982);
return statearr_20005;
})();return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_19998__$1,12,dchan);
} else
{if((state_val_19999 === 6))
{var state_19998__$1 = state_19998;var statearr_20006_20033 = state_19998__$1;(statearr_20006_20033[2] = null);
(statearr_20006_20033[1] = 11);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_19999 === 7))
{var state_19998__$1 = state_19998;var statearr_20007_20034 = state_19998__$1;(statearr_20007_20034[2] = null);
(statearr_20007_20034[1] = 8);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_19999 === 8))
{var inst_19980 = (state_19998[2]);var state_19998__$1 = state_19998;var statearr_20008_20035 = state_19998__$1;(statearr_20008_20035[2] = inst_19980);
(statearr_20008_20035[1] = 5);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_19999 === 9))
{var inst_19962 = (state_19998[7]);var inst_19975 = (state_19998[2]);var inst_19976 = (inst_19962 + 1);var inst_19962__$1 = inst_19976;var state_19998__$1 = (function (){var statearr_20009 = state_19998;(statearr_20009[10] = inst_19975);
(statearr_20009[7] = inst_19962__$1);
return statearr_20009;
})();var statearr_20010_20036 = state_19998__$1;(statearr_20010_20036[2] = null);
(statearr_20010_20036[1] = 4);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_19999 === 10))
{var inst_19966 = (state_19998[2]);var inst_19967 = cljs.core.swap_BANG_.call(null,dctr,cljs.core.dec);var state_19998__$1 = (function (){var statearr_20011 = state_19998;(statearr_20011[11] = inst_19966);
return statearr_20011;
})();var statearr_20012_20037 = state_19998__$1;(statearr_20012_20037[2] = inst_19967);
cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_19998__$1);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_19999 === 11))
{var inst_19962 = (state_19998[7]);var _ = cljs.core.async.impl.ioc_helpers.add_exception_frame.call(null,state_19998,10,Object,null,9);var inst_19971 = chs__$1.call(null,inst_19962);var inst_19972 = done.call(null,inst_19962);var inst_19973 = cljs.core.async.take_BANG_.call(null,inst_19971,inst_19972);var state_19998__$1 = state_19998;var statearr_20013_20038 = state_19998__$1;(statearr_20013_20038[2] = inst_19973);
cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_19998__$1);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_19999 === 12))
{var inst_19984 = (state_19998[12]);var inst_19984__$1 = (state_19998[2]);var inst_19985 = cljs.core.some.call(null,cljs.core.nil_QMARK_,inst_19984__$1);var state_19998__$1 = (function (){var statearr_20014 = state_19998;(statearr_20014[12] = inst_19984__$1);
return statearr_20014;
})();if(cljs.core.truth_(inst_19985))
{var statearr_20015_20039 = state_19998__$1;(statearr_20015_20039[1] = 13);
} else
{var statearr_20016_20040 = state_19998__$1;(statearr_20016_20040[1] = 14);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_19999 === 13))
{var inst_19987 = cljs.core.async.close_BANG_.call(null,out);var state_19998__$1 = state_19998;var statearr_20017_20041 = state_19998__$1;(statearr_20017_20041[2] = inst_19987);
(statearr_20017_20041[1] = 15);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_19999 === 14))
{var inst_19984 = (state_19998[12]);var inst_19989 = cljs.core.apply.call(null,f,inst_19984);var state_19998__$1 = state_19998;return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_19998__$1,16,out,inst_19989);
} else
{if((state_val_19999 === 15))
{var inst_19994 = (state_19998[2]);var state_19998__$1 = state_19998;var statearr_20018_20042 = state_19998__$1;(statearr_20018_20042[2] = inst_19994);
(statearr_20018_20042[1] = 3);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_19999 === 16))
{var inst_19991 = (state_19998[2]);var state_19998__$1 = (function (){var statearr_20019 = state_19998;(statearr_20019[13] = inst_19991);
return statearr_20019;
})();var statearr_20020_20043 = state_19998__$1;(statearr_20020_20043[2] = null);
(statearr_20020_20043[1] = 2);
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
});return ((function (switch__5424__auto__){
return (function() {
var state_machine__5425__auto__ = null;
var state_machine__5425__auto____0 = (function (){var statearr_20024 = (new Array(14));(statearr_20024[0] = state_machine__5425__auto__);
(statearr_20024[1] = 1);
return statearr_20024;
});
var state_machine__5425__auto____1 = (function (state_19998){while(true){
var ret_value__5426__auto__ = (function (){try{while(true){
var result__5427__auto__ = switch__5424__auto__.call(null,state_19998);if(cljs.core.keyword_identical_QMARK_.call(null,result__5427__auto__,new cljs.core.Keyword(null,"recur","recur",1122293407)))
{{
continue;
}
} else
{return result__5427__auto__;
}
break;
}
}catch (e20025){if((e20025 instanceof Object))
{var ex__5428__auto__ = e20025;var statearr_20026_20044 = state_19998;(statearr_20026_20044[5] = ex__5428__auto__);
cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_19998);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if(new cljs.core.Keyword(null,"else","else",1017020587))
{throw e20025;
} else
{return null;
}
}
}})();if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__5426__auto__,new cljs.core.Keyword(null,"recur","recur",1122293407)))
{{
var G__20045 = state_19998;
state_19998 = G__20045;
continue;
}
} else
{return ret_value__5426__auto__;
}
break;
}
});
state_machine__5425__auto__ = function(state_19998){
switch(arguments.length){
case 0:
return state_machine__5425__auto____0.call(this);
case 1:
return state_machine__5425__auto____1.call(this,state_19998);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
state_machine__5425__auto__.cljs$core$IFn$_invoke$arity$0 = state_machine__5425__auto____0;
state_machine__5425__auto__.cljs$core$IFn$_invoke$arity$1 = state_machine__5425__auto____1;
return state_machine__5425__auto__;
})()
;})(switch__5424__auto__))
})();var state__5496__auto__ = (function (){var statearr_20027 = f__5495__auto__.call(null);(statearr_20027[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__5494__auto___20028);
return statearr_20027;
})();return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__5496__auto__);
}));
return out;
});
map = function(f,chs,buf_or_n){
switch(arguments.length){
case 2:
return map__2.call(this,f,chs);
case 3:
return map__3.call(this,f,chs,buf_or_n);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
map.cljs$core$IFn$_invoke$arity$2 = map__2;
map.cljs$core$IFn$_invoke$arity$3 = map__3;
return map;
})()
;
/**
* Takes a collection of source channels and returns a channel which
* contains all values taken from them. The returned channel will be
* unbuffered by default, or a buf-or-n can be supplied. The channel
* will close after all the source channels have closed.
*/
cljs.core.async.merge = (function() {
var merge = null;
var merge__1 = (function (chs){return merge.call(null,chs,null);
});
var merge__2 = (function (chs,buf_or_n){var out = cljs.core.async.chan.call(null,buf_or_n);var c__5494__auto___20153 = cljs.core.async.chan.call(null,1);cljs.core.async.impl.dispatch.run.call(null,(function (){var f__5495__auto__ = (function (){var switch__5424__auto__ = (function (state_20129){var state_val_20130 = (state_20129[1]);if((state_val_20130 === 1))
{var inst_20100 = cljs.core.vec.call(null,chs);var inst_20101 = inst_20100;var state_20129__$1 = (function (){var statearr_20131 = state_20129;(statearr_20131[7] = inst_20101);
return statearr_20131;
})();var statearr_20132_20154 = state_20129__$1;(statearr_20132_20154[2] = null);
(statearr_20132_20154[1] = 2);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_20130 === 2))
{var inst_20101 = (state_20129[7]);var inst_20103 = cljs.core.count.call(null,inst_20101);var inst_20104 = (inst_20103 > 0);var state_20129__$1 = state_20129;if(cljs.core.truth_(inst_20104))
{var statearr_20133_20155 = state_20129__$1;(statearr_20133_20155[1] = 4);
} else
{var statearr_20134_20156 = state_20129__$1;(statearr_20134_20156[1] = 5);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_20130 === 3))
{var inst_20127 = (state_20129[2]);var state_20129__$1 = state_20129;return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_20129__$1,inst_20127);
} else
{if((state_val_20130 === 4))
{var inst_20101 = (state_20129[7]);var state_20129__$1 = state_20129;return cljs.core.async.impl.ioc_helpers.ioc_alts_BANG_.call(null,state_20129__$1,7,inst_20101);
} else
{if((state_val_20130 === 5))
{var inst_20123 = cljs.core.async.close_BANG_.call(null,out);var state_20129__$1 = state_20129;var statearr_20135_20157 = state_20129__$1;(statearr_20135_20157[2] = inst_20123);
(statearr_20135_20157[1] = 6);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_20130 === 6))
{var inst_20125 = (state_20129[2]);var state_20129__$1 = state_20129;var statearr_20136_20158 = state_20129__$1;(statearr_20136_20158[2] = inst_20125);
(statearr_20136_20158[1] = 3);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_20130 === 7))
{var inst_20109 = (state_20129[8]);var inst_20108 = (state_20129[9]);var inst_20108__$1 = (state_20129[2]);var inst_20109__$1 = cljs.core.nth.call(null,inst_20108__$1,0,null);var inst_20110 = cljs.core.nth.call(null,inst_20108__$1,1,null);var inst_20111 = (inst_20109__$1 == null);var state_20129__$1 = (function (){var statearr_20137 = state_20129;(statearr_20137[8] = inst_20109__$1);
(statearr_20137[9] = inst_20108__$1);
(statearr_20137[10] = inst_20110);
return statearr_20137;
})();if(cljs.core.truth_(inst_20111))
{var statearr_20138_20159 = state_20129__$1;(statearr_20138_20159[1] = 8);
} else
{var statearr_20139_20160 = state_20129__$1;(statearr_20139_20160[1] = 9);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_20130 === 8))
{var inst_20109 = (state_20129[8]);var inst_20108 = (state_20129[9]);var inst_20110 = (state_20129[10]);var inst_20101 = (state_20129[7]);var inst_20113 = (function (){var c = inst_20110;var v = inst_20109;var vec__20106 = inst_20108;var cs = inst_20101;return ((function (c,v,vec__20106,cs,inst_20109,inst_20108,inst_20110,inst_20101,state_val_20130){
return (function (p1__20046_SHARP_){return cljs.core.not_EQ_.call(null,c,p1__20046_SHARP_);
});
;})(c,v,vec__20106,cs,inst_20109,inst_20108,inst_20110,inst_20101,state_val_20130))
})();var inst_20114 = cljs.core.filterv.call(null,inst_20113,inst_20101);var inst_20101__$1 = inst_20114;var state_20129__$1 = (function (){var statearr_20140 = state_20129;(statearr_20140[7] = inst_20101__$1);
return statearr_20140;
})();var statearr_20141_20161 = state_20129__$1;(statearr_20141_20161[2] = null);
(statearr_20141_20161[1] = 2);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_20130 === 9))
{var inst_20109 = (state_20129[8]);var state_20129__$1 = state_20129;return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_20129__$1,11,out,inst_20109);
} else
{if((state_val_20130 === 10))
{var inst_20121 = (state_20129[2]);var state_20129__$1 = state_20129;var statearr_20143_20162 = state_20129__$1;(statearr_20143_20162[2] = inst_20121);
(statearr_20143_20162[1] = 6);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_20130 === 11))
{var inst_20101 = (state_20129[7]);var inst_20118 = (state_20129[2]);var tmp20142 = inst_20101;var inst_20101__$1 = tmp20142;var state_20129__$1 = (function (){var statearr_20144 = state_20129;(statearr_20144[11] = inst_20118);
(statearr_20144[7] = inst_20101__$1);
return statearr_20144;
})();var statearr_20145_20163 = state_20129__$1;(statearr_20145_20163[2] = null);
(statearr_20145_20163[1] = 2);
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
});return ((function (switch__5424__auto__){
return (function() {
var state_machine__5425__auto__ = null;
var state_machine__5425__auto____0 = (function (){var statearr_20149 = (new Array(12));(statearr_20149[0] = state_machine__5425__auto__);
(statearr_20149[1] = 1);
return statearr_20149;
});
var state_machine__5425__auto____1 = (function (state_20129){while(true){
var ret_value__5426__auto__ = (function (){try{while(true){
var result__5427__auto__ = switch__5424__auto__.call(null,state_20129);if(cljs.core.keyword_identical_QMARK_.call(null,result__5427__auto__,new cljs.core.Keyword(null,"recur","recur",1122293407)))
{{
continue;
}
} else
{return result__5427__auto__;
}
break;
}
}catch (e20150){if((e20150 instanceof Object))
{var ex__5428__auto__ = e20150;var statearr_20151_20164 = state_20129;(statearr_20151_20164[5] = ex__5428__auto__);
cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_20129);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if(new cljs.core.Keyword(null,"else","else",1017020587))
{throw e20150;
} else
{return null;
}
}
}})();if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__5426__auto__,new cljs.core.Keyword(null,"recur","recur",1122293407)))
{{
var G__20165 = state_20129;
state_20129 = G__20165;
continue;
}
} else
{return ret_value__5426__auto__;
}
break;
}
});
state_machine__5425__auto__ = function(state_20129){
switch(arguments.length){
case 0:
return state_machine__5425__auto____0.call(this);
case 1:
return state_machine__5425__auto____1.call(this,state_20129);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
state_machine__5425__auto__.cljs$core$IFn$_invoke$arity$0 = state_machine__5425__auto____0;
state_machine__5425__auto__.cljs$core$IFn$_invoke$arity$1 = state_machine__5425__auto____1;
return state_machine__5425__auto__;
})()
;})(switch__5424__auto__))
})();var state__5496__auto__ = (function (){var statearr_20152 = f__5495__auto__.call(null);(statearr_20152[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__5494__auto___20153);
return statearr_20152;
})();return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__5496__auto__);
}));
return out;
});
merge = function(chs,buf_or_n){
switch(arguments.length){
case 1:
return merge__1.call(this,chs);
case 2:
return merge__2.call(this,chs,buf_or_n);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
merge.cljs$core$IFn$_invoke$arity$1 = merge__1;
merge.cljs$core$IFn$_invoke$arity$2 = merge__2;
return merge;
})()
;
/**
* Returns a channel containing the single (collection) result of the
* items taken from the channel conjoined to the supplied
* collection. ch must close before into produces a result.
*/
cljs.core.async.into = (function into(coll,ch){return cljs.core.async.reduce.call(null,cljs.core.conj,coll,ch);
});
/**
* Returns a channel that will return, at most, n items from ch. After n items
* have been returned, or ch has been closed, the return chanel will close.
* 
* The output channel is unbuffered by default, unless buf-or-n is given.
*/
cljs.core.async.take = (function() {
var take = null;
var take__2 = (function (n,ch){return take.call(null,n,ch,null);
});
var take__3 = (function (n,ch,buf_or_n){var out = cljs.core.async.chan.call(null,buf_or_n);var c__5494__auto___20258 = cljs.core.async.chan.call(null,1);cljs.core.async.impl.dispatch.run.call(null,(function (){var f__5495__auto__ = (function (){var switch__5424__auto__ = (function (state_20235){var state_val_20236 = (state_20235[1]);if((state_val_20236 === 1))
{var inst_20212 = 0;var state_20235__$1 = (function (){var statearr_20237 = state_20235;(statearr_20237[7] = inst_20212);
return statearr_20237;
})();var statearr_20238_20259 = state_20235__$1;(statearr_20238_20259[2] = null);
(statearr_20238_20259[1] = 2);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_20236 === 2))
{var inst_20212 = (state_20235[7]);var inst_20214 = (inst_20212 < n);var state_20235__$1 = state_20235;if(cljs.core.truth_(inst_20214))
{var statearr_20239_20260 = state_20235__$1;(statearr_20239_20260[1] = 4);
} else
{var statearr_20240_20261 = state_20235__$1;(statearr_20240_20261[1] = 5);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_20236 === 3))
{var inst_20232 = (state_20235[2]);var inst_20233 = cljs.core.async.close_BANG_.call(null,out);var state_20235__$1 = (function (){var statearr_20241 = state_20235;(statearr_20241[8] = inst_20232);
return statearr_20241;
})();return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_20235__$1,inst_20233);
} else
{if((state_val_20236 === 4))
{var state_20235__$1 = state_20235;return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_20235__$1,7,ch);
} else
{if((state_val_20236 === 5))
{var state_20235__$1 = state_20235;var statearr_20242_20262 = state_20235__$1;(statearr_20242_20262[2] = null);
(statearr_20242_20262[1] = 6);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_20236 === 6))
{var inst_20230 = (state_20235[2]);var state_20235__$1 = state_20235;var statearr_20243_20263 = state_20235__$1;(statearr_20243_20263[2] = inst_20230);
(statearr_20243_20263[1] = 3);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_20236 === 7))
{var inst_20217 = (state_20235[9]);var inst_20217__$1 = (state_20235[2]);var inst_20218 = (inst_20217__$1 == null);var inst_20219 = cljs.core.not.call(null,inst_20218);var state_20235__$1 = (function (){var statearr_20244 = state_20235;(statearr_20244[9] = inst_20217__$1);
return statearr_20244;
})();if(inst_20219)
{var statearr_20245_20264 = state_20235__$1;(statearr_20245_20264[1] = 8);
} else
{var statearr_20246_20265 = state_20235__$1;(statearr_20246_20265[1] = 9);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_20236 === 8))
{var inst_20217 = (state_20235[9]);var state_20235__$1 = state_20235;return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_20235__$1,11,out,inst_20217);
} else
{if((state_val_20236 === 9))
{var state_20235__$1 = state_20235;var statearr_20247_20266 = state_20235__$1;(statearr_20247_20266[2] = null);
(statearr_20247_20266[1] = 10);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_20236 === 10))
{var inst_20227 = (state_20235[2]);var state_20235__$1 = state_20235;var statearr_20248_20267 = state_20235__$1;(statearr_20248_20267[2] = inst_20227);
(statearr_20248_20267[1] = 6);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_20236 === 11))
{var inst_20212 = (state_20235[7]);var inst_20222 = (state_20235[2]);var inst_20223 = (inst_20212 + 1);var inst_20212__$1 = inst_20223;var state_20235__$1 = (function (){var statearr_20249 = state_20235;(statearr_20249[7] = inst_20212__$1);
(statearr_20249[10] = inst_20222);
return statearr_20249;
})();var statearr_20250_20268 = state_20235__$1;(statearr_20250_20268[2] = null);
(statearr_20250_20268[1] = 2);
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
});return ((function (switch__5424__auto__){
return (function() {
var state_machine__5425__auto__ = null;
var state_machine__5425__auto____0 = (function (){var statearr_20254 = (new Array(11));(statearr_20254[0] = state_machine__5425__auto__);
(statearr_20254[1] = 1);
return statearr_20254;
});
var state_machine__5425__auto____1 = (function (state_20235){while(true){
var ret_value__5426__auto__ = (function (){try{while(true){
var result__5427__auto__ = switch__5424__auto__.call(null,state_20235);if(cljs.core.keyword_identical_QMARK_.call(null,result__5427__auto__,new cljs.core.Keyword(null,"recur","recur",1122293407)))
{{
continue;
}
} else
{return result__5427__auto__;
}
break;
}
}catch (e20255){if((e20255 instanceof Object))
{var ex__5428__auto__ = e20255;var statearr_20256_20269 = state_20235;(statearr_20256_20269[5] = ex__5428__auto__);
cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_20235);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if(new cljs.core.Keyword(null,"else","else",1017020587))
{throw e20255;
} else
{return null;
}
}
}})();if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__5426__auto__,new cljs.core.Keyword(null,"recur","recur",1122293407)))
{{
var G__20270 = state_20235;
state_20235 = G__20270;
continue;
}
} else
{return ret_value__5426__auto__;
}
break;
}
});
state_machine__5425__auto__ = function(state_20235){
switch(arguments.length){
case 0:
return state_machine__5425__auto____0.call(this);
case 1:
return state_machine__5425__auto____1.call(this,state_20235);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
state_machine__5425__auto__.cljs$core$IFn$_invoke$arity$0 = state_machine__5425__auto____0;
state_machine__5425__auto__.cljs$core$IFn$_invoke$arity$1 = state_machine__5425__auto____1;
return state_machine__5425__auto__;
})()
;})(switch__5424__auto__))
})();var state__5496__auto__ = (function (){var statearr_20257 = f__5495__auto__.call(null);(statearr_20257[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__5494__auto___20258);
return statearr_20257;
})();return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__5496__auto__);
}));
return out;
});
take = function(n,ch,buf_or_n){
switch(arguments.length){
case 2:
return take__2.call(this,n,ch);
case 3:
return take__3.call(this,n,ch,buf_or_n);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
take.cljs$core$IFn$_invoke$arity$2 = take__2;
take.cljs$core$IFn$_invoke$arity$3 = take__3;
return take;
})()
;
/**
* Returns a channel that will contain values from ch. Consecutive duplicate
* values will be dropped.
* 
* The output channel is unbuffered by default, unless buf-or-n is given.
*/
cljs.core.async.unique = (function() {
var unique = null;
var unique__1 = (function (ch){return unique.call(null,ch,null);
});
var unique__2 = (function (ch,buf_or_n){var out = cljs.core.async.chan.call(null,buf_or_n);var c__5494__auto___20367 = cljs.core.async.chan.call(null,1);cljs.core.async.impl.dispatch.run.call(null,(function (){var f__5495__auto__ = (function (){var switch__5424__auto__ = (function (state_20342){var state_val_20343 = (state_20342[1]);if((state_val_20343 === 1))
{var inst_20319 = null;var state_20342__$1 = (function (){var statearr_20344 = state_20342;(statearr_20344[7] = inst_20319);
return statearr_20344;
})();var statearr_20345_20368 = state_20342__$1;(statearr_20345_20368[2] = null);
(statearr_20345_20368[1] = 2);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_20343 === 2))
{var state_20342__$1 = state_20342;return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_20342__$1,4,ch);
} else
{if((state_val_20343 === 3))
{var inst_20339 = (state_20342[2]);var inst_20340 = cljs.core.async.close_BANG_.call(null,out);var state_20342__$1 = (function (){var statearr_20346 = state_20342;(statearr_20346[8] = inst_20339);
return statearr_20346;
})();return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_20342__$1,inst_20340);
} else
{if((state_val_20343 === 4))
{var inst_20322 = (state_20342[9]);var inst_20322__$1 = (state_20342[2]);var inst_20323 = (inst_20322__$1 == null);var inst_20324 = cljs.core.not.call(null,inst_20323);var state_20342__$1 = (function (){var statearr_20347 = state_20342;(statearr_20347[9] = inst_20322__$1);
return statearr_20347;
})();if(inst_20324)
{var statearr_20348_20369 = state_20342__$1;(statearr_20348_20369[1] = 5);
} else
{var statearr_20349_20370 = state_20342__$1;(statearr_20349_20370[1] = 6);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_20343 === 5))
{var inst_20322 = (state_20342[9]);var inst_20319 = (state_20342[7]);var inst_20326 = cljs.core._EQ_.call(null,inst_20322,inst_20319);var state_20342__$1 = state_20342;if(inst_20326)
{var statearr_20350_20371 = state_20342__$1;(statearr_20350_20371[1] = 8);
} else
{var statearr_20351_20372 = state_20342__$1;(statearr_20351_20372[1] = 9);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_20343 === 6))
{var state_20342__$1 = state_20342;var statearr_20353_20373 = state_20342__$1;(statearr_20353_20373[2] = null);
(statearr_20353_20373[1] = 7);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_20343 === 7))
{var inst_20337 = (state_20342[2]);var state_20342__$1 = state_20342;var statearr_20354_20374 = state_20342__$1;(statearr_20354_20374[2] = inst_20337);
(statearr_20354_20374[1] = 3);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_20343 === 8))
{var inst_20319 = (state_20342[7]);var tmp20352 = inst_20319;var inst_20319__$1 = tmp20352;var state_20342__$1 = (function (){var statearr_20355 = state_20342;(statearr_20355[7] = inst_20319__$1);
return statearr_20355;
})();var statearr_20356_20375 = state_20342__$1;(statearr_20356_20375[2] = null);
(statearr_20356_20375[1] = 2);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_20343 === 9))
{var inst_20322 = (state_20342[9]);var state_20342__$1 = state_20342;return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_20342__$1,11,out,inst_20322);
} else
{if((state_val_20343 === 10))
{var inst_20334 = (state_20342[2]);var state_20342__$1 = state_20342;var statearr_20357_20376 = state_20342__$1;(statearr_20357_20376[2] = inst_20334);
(statearr_20357_20376[1] = 7);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_20343 === 11))
{var inst_20322 = (state_20342[9]);var inst_20331 = (state_20342[2]);var inst_20319 = inst_20322;var state_20342__$1 = (function (){var statearr_20358 = state_20342;(statearr_20358[10] = inst_20331);
(statearr_20358[7] = inst_20319);
return statearr_20358;
})();var statearr_20359_20377 = state_20342__$1;(statearr_20359_20377[2] = null);
(statearr_20359_20377[1] = 2);
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
});return ((function (switch__5424__auto__){
return (function() {
var state_machine__5425__auto__ = null;
var state_machine__5425__auto____0 = (function (){var statearr_20363 = (new Array(11));(statearr_20363[0] = state_machine__5425__auto__);
(statearr_20363[1] = 1);
return statearr_20363;
});
var state_machine__5425__auto____1 = (function (state_20342){while(true){
var ret_value__5426__auto__ = (function (){try{while(true){
var result__5427__auto__ = switch__5424__auto__.call(null,state_20342);if(cljs.core.keyword_identical_QMARK_.call(null,result__5427__auto__,new cljs.core.Keyword(null,"recur","recur",1122293407)))
{{
continue;
}
} else
{return result__5427__auto__;
}
break;
}
}catch (e20364){if((e20364 instanceof Object))
{var ex__5428__auto__ = e20364;var statearr_20365_20378 = state_20342;(statearr_20365_20378[5] = ex__5428__auto__);
cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_20342);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if(new cljs.core.Keyword(null,"else","else",1017020587))
{throw e20364;
} else
{return null;
}
}
}})();if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__5426__auto__,new cljs.core.Keyword(null,"recur","recur",1122293407)))
{{
var G__20379 = state_20342;
state_20342 = G__20379;
continue;
}
} else
{return ret_value__5426__auto__;
}
break;
}
});
state_machine__5425__auto__ = function(state_20342){
switch(arguments.length){
case 0:
return state_machine__5425__auto____0.call(this);
case 1:
return state_machine__5425__auto____1.call(this,state_20342);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
state_machine__5425__auto__.cljs$core$IFn$_invoke$arity$0 = state_machine__5425__auto____0;
state_machine__5425__auto__.cljs$core$IFn$_invoke$arity$1 = state_machine__5425__auto____1;
return state_machine__5425__auto__;
})()
;})(switch__5424__auto__))
})();var state__5496__auto__ = (function (){var statearr_20366 = f__5495__auto__.call(null);(statearr_20366[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__5494__auto___20367);
return statearr_20366;
})();return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__5496__auto__);
}));
return out;
});
unique = function(ch,buf_or_n){
switch(arguments.length){
case 1:
return unique__1.call(this,ch);
case 2:
return unique__2.call(this,ch,buf_or_n);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
unique.cljs$core$IFn$_invoke$arity$1 = unique__1;
unique.cljs$core$IFn$_invoke$arity$2 = unique__2;
return unique;
})()
;
/**
* Returns a channel that will contain vectors of n items taken from ch. The
* final vector in the return channel may be smaller than n if ch closed before
* the vector could be completely filled.
* 
* The output channel is unbuffered by default, unless buf-or-n is given
*/
cljs.core.async.partition = (function() {
var partition = null;
var partition__2 = (function (n,ch){return partition.call(null,n,ch,null);
});
var partition__3 = (function (n,ch,buf_or_n){var out = cljs.core.async.chan.call(null,buf_or_n);var c__5494__auto___20514 = cljs.core.async.chan.call(null,1);cljs.core.async.impl.dispatch.run.call(null,(function (){var f__5495__auto__ = (function (){var switch__5424__auto__ = (function (state_20484){var state_val_20485 = (state_20484[1]);if((state_val_20485 === 1))
{var inst_20447 = (new Array(n));var inst_20448 = inst_20447;var inst_20449 = 0;var state_20484__$1 = (function (){var statearr_20486 = state_20484;(statearr_20486[7] = inst_20448);
(statearr_20486[8] = inst_20449);
return statearr_20486;
})();var statearr_20487_20515 = state_20484__$1;(statearr_20487_20515[2] = null);
(statearr_20487_20515[1] = 2);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_20485 === 2))
{var state_20484__$1 = state_20484;return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_20484__$1,4,ch);
} else
{if((state_val_20485 === 3))
{var inst_20482 = (state_20484[2]);var state_20484__$1 = state_20484;return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_20484__$1,inst_20482);
} else
{if((state_val_20485 === 4))
{var inst_20452 = (state_20484[9]);var inst_20452__$1 = (state_20484[2]);var inst_20453 = (inst_20452__$1 == null);var inst_20454 = cljs.core.not.call(null,inst_20453);var state_20484__$1 = (function (){var statearr_20488 = state_20484;(statearr_20488[9] = inst_20452__$1);
return statearr_20488;
})();if(inst_20454)
{var statearr_20489_20516 = state_20484__$1;(statearr_20489_20516[1] = 5);
} else
{var statearr_20490_20517 = state_20484__$1;(statearr_20490_20517[1] = 6);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_20485 === 5))
{var inst_20452 = (state_20484[9]);var inst_20448 = (state_20484[7]);var inst_20449 = (state_20484[8]);var inst_20457 = (state_20484[10]);var inst_20456 = (inst_20448[inst_20449] = inst_20452);var inst_20457__$1 = (inst_20449 + 1);var inst_20458 = (inst_20457__$1 < n);var state_20484__$1 = (function (){var statearr_20491 = state_20484;(statearr_20491[11] = inst_20456);
(statearr_20491[10] = inst_20457__$1);
return statearr_20491;
})();if(cljs.core.truth_(inst_20458))
{var statearr_20492_20518 = state_20484__$1;(statearr_20492_20518[1] = 8);
} else
{var statearr_20493_20519 = state_20484__$1;(statearr_20493_20519[1] = 9);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_20485 === 6))
{var inst_20449 = (state_20484[8]);var inst_20470 = (inst_20449 > 0);var state_20484__$1 = state_20484;if(cljs.core.truth_(inst_20470))
{var statearr_20495_20520 = state_20484__$1;(statearr_20495_20520[1] = 12);
} else
{var statearr_20496_20521 = state_20484__$1;(statearr_20496_20521[1] = 13);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_20485 === 7))
{var inst_20480 = (state_20484[2]);var state_20484__$1 = state_20484;var statearr_20497_20522 = state_20484__$1;(statearr_20497_20522[2] = inst_20480);
(statearr_20497_20522[1] = 3);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_20485 === 8))
{var inst_20448 = (state_20484[7]);var inst_20457 = (state_20484[10]);var tmp20494 = inst_20448;var inst_20448__$1 = tmp20494;var inst_20449 = inst_20457;var state_20484__$1 = (function (){var statearr_20498 = state_20484;(statearr_20498[7] = inst_20448__$1);
(statearr_20498[8] = inst_20449);
return statearr_20498;
})();var statearr_20499_20523 = state_20484__$1;(statearr_20499_20523[2] = null);
(statearr_20499_20523[1] = 2);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_20485 === 9))
{var inst_20448 = (state_20484[7]);var inst_20462 = cljs.core.vec.call(null,inst_20448);var state_20484__$1 = state_20484;return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_20484__$1,11,out,inst_20462);
} else
{if((state_val_20485 === 10))
{var inst_20468 = (state_20484[2]);var state_20484__$1 = state_20484;var statearr_20500_20524 = state_20484__$1;(statearr_20500_20524[2] = inst_20468);
(statearr_20500_20524[1] = 7);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_20485 === 11))
{var inst_20464 = (state_20484[2]);var inst_20465 = (new Array(n));var inst_20448 = inst_20465;var inst_20449 = 0;var state_20484__$1 = (function (){var statearr_20501 = state_20484;(statearr_20501[7] = inst_20448);
(statearr_20501[8] = inst_20449);
(statearr_20501[12] = inst_20464);
return statearr_20501;
})();var statearr_20502_20525 = state_20484__$1;(statearr_20502_20525[2] = null);
(statearr_20502_20525[1] = 2);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_20485 === 12))
{var inst_20448 = (state_20484[7]);var inst_20472 = cljs.core.vec.call(null,inst_20448);var state_20484__$1 = state_20484;return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_20484__$1,15,out,inst_20472);
} else
{if((state_val_20485 === 13))
{var state_20484__$1 = state_20484;var statearr_20503_20526 = state_20484__$1;(statearr_20503_20526[2] = null);
(statearr_20503_20526[1] = 14);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_20485 === 14))
{var inst_20477 = (state_20484[2]);var inst_20478 = cljs.core.async.close_BANG_.call(null,out);var state_20484__$1 = (function (){var statearr_20504 = state_20484;(statearr_20504[13] = inst_20477);
return statearr_20504;
})();var statearr_20505_20527 = state_20484__$1;(statearr_20505_20527[2] = inst_20478);
(statearr_20505_20527[1] = 7);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_20485 === 15))
{var inst_20474 = (state_20484[2]);var state_20484__$1 = state_20484;var statearr_20506_20528 = state_20484__$1;(statearr_20506_20528[2] = inst_20474);
(statearr_20506_20528[1] = 14);
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
var state_machine__5425__auto____0 = (function (){var statearr_20510 = (new Array(14));(statearr_20510[0] = state_machine__5425__auto__);
(statearr_20510[1] = 1);
return statearr_20510;
});
var state_machine__5425__auto____1 = (function (state_20484){while(true){
var ret_value__5426__auto__ = (function (){try{while(true){
var result__5427__auto__ = switch__5424__auto__.call(null,state_20484);if(cljs.core.keyword_identical_QMARK_.call(null,result__5427__auto__,new cljs.core.Keyword(null,"recur","recur",1122293407)))
{{
continue;
}
} else
{return result__5427__auto__;
}
break;
}
}catch (e20511){if((e20511 instanceof Object))
{var ex__5428__auto__ = e20511;var statearr_20512_20529 = state_20484;(statearr_20512_20529[5] = ex__5428__auto__);
cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_20484);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if(new cljs.core.Keyword(null,"else","else",1017020587))
{throw e20511;
} else
{return null;
}
}
}})();if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__5426__auto__,new cljs.core.Keyword(null,"recur","recur",1122293407)))
{{
var G__20530 = state_20484;
state_20484 = G__20530;
continue;
}
} else
{return ret_value__5426__auto__;
}
break;
}
});
state_machine__5425__auto__ = function(state_20484){
switch(arguments.length){
case 0:
return state_machine__5425__auto____0.call(this);
case 1:
return state_machine__5425__auto____1.call(this,state_20484);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
state_machine__5425__auto__.cljs$core$IFn$_invoke$arity$0 = state_machine__5425__auto____0;
state_machine__5425__auto__.cljs$core$IFn$_invoke$arity$1 = state_machine__5425__auto____1;
return state_machine__5425__auto__;
})()
;})(switch__5424__auto__))
})();var state__5496__auto__ = (function (){var statearr_20513 = f__5495__auto__.call(null);(statearr_20513[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__5494__auto___20514);
return statearr_20513;
})();return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__5496__auto__);
}));
return out;
});
partition = function(n,ch,buf_or_n){
switch(arguments.length){
case 2:
return partition__2.call(this,n,ch);
case 3:
return partition__3.call(this,n,ch,buf_or_n);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
partition.cljs$core$IFn$_invoke$arity$2 = partition__2;
partition.cljs$core$IFn$_invoke$arity$3 = partition__3;
return partition;
})()
;
/**
* Returns a channel that will contain vectors of items taken from ch. New
* vectors will be created whenever (f itm) returns a value that differs from
* the previous item's (f itm).
* 
* The output channel is unbuffered, unless buf-or-n is given
*/
cljs.core.async.partition_by = (function() {
var partition_by = null;
var partition_by__2 = (function (f,ch){return partition_by.call(null,f,ch,null);
});
var partition_by__3 = (function (f,ch,buf_or_n){var out = cljs.core.async.chan.call(null,buf_or_n);var c__5494__auto___20673 = cljs.core.async.chan.call(null,1);cljs.core.async.impl.dispatch.run.call(null,(function (){var f__5495__auto__ = (function (){var switch__5424__auto__ = (function (state_20643){var state_val_20644 = (state_20643[1]);if((state_val_20644 === 1))
{var inst_20602 = (new Array(0));var inst_20603 = inst_20602;var inst_20604 = new cljs.core.Keyword("cljs.core.async","nothing","cljs.core.async/nothing",4382193538);var state_20643__$1 = (function (){var statearr_20645 = state_20643;(statearr_20645[7] = inst_20604);
(statearr_20645[8] = inst_20603);
return statearr_20645;
})();var statearr_20646_20674 = state_20643__$1;(statearr_20646_20674[2] = null);
(statearr_20646_20674[1] = 2);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_20644 === 2))
{var state_20643__$1 = state_20643;return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_20643__$1,4,ch);
} else
{if((state_val_20644 === 3))
{var inst_20641 = (state_20643[2]);var state_20643__$1 = state_20643;return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_20643__$1,inst_20641);
} else
{if((state_val_20644 === 4))
{var inst_20607 = (state_20643[9]);var inst_20607__$1 = (state_20643[2]);var inst_20608 = (inst_20607__$1 == null);var inst_20609 = cljs.core.not.call(null,inst_20608);var state_20643__$1 = (function (){var statearr_20647 = state_20643;(statearr_20647[9] = inst_20607__$1);
return statearr_20647;
})();if(inst_20609)
{var statearr_20648_20675 = state_20643__$1;(statearr_20648_20675[1] = 5);
} else
{var statearr_20649_20676 = state_20643__$1;(statearr_20649_20676[1] = 6);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_20644 === 5))
{var inst_20604 = (state_20643[7]);var inst_20607 = (state_20643[9]);var inst_20611 = (state_20643[10]);var inst_20611__$1 = f.call(null,inst_20607);var inst_20612 = cljs.core._EQ_.call(null,inst_20611__$1,inst_20604);var inst_20613 = cljs.core.keyword_identical_QMARK_.call(null,inst_20604,new cljs.core.Keyword("cljs.core.async","nothing","cljs.core.async/nothing",4382193538));var inst_20614 = (inst_20612) || (inst_20613);var state_20643__$1 = (function (){var statearr_20650 = state_20643;(statearr_20650[10] = inst_20611__$1);
return statearr_20650;
})();if(cljs.core.truth_(inst_20614))
{var statearr_20651_20677 = state_20643__$1;(statearr_20651_20677[1] = 8);
} else
{var statearr_20652_20678 = state_20643__$1;(statearr_20652_20678[1] = 9);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_20644 === 6))
{var inst_20603 = (state_20643[8]);var inst_20628 = inst_20603.length;var inst_20629 = (inst_20628 > 0);var state_20643__$1 = state_20643;if(cljs.core.truth_(inst_20629))
{var statearr_20654_20679 = state_20643__$1;(statearr_20654_20679[1] = 12);
} else
{var statearr_20655_20680 = state_20643__$1;(statearr_20655_20680[1] = 13);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_20644 === 7))
{var inst_20639 = (state_20643[2]);var state_20643__$1 = state_20643;var statearr_20656_20681 = state_20643__$1;(statearr_20656_20681[2] = inst_20639);
(statearr_20656_20681[1] = 3);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_20644 === 8))
{var inst_20603 = (state_20643[8]);var inst_20607 = (state_20643[9]);var inst_20611 = (state_20643[10]);var inst_20616 = inst_20603.push(inst_20607);var tmp20653 = inst_20603;var inst_20603__$1 = tmp20653;var inst_20604 = inst_20611;var state_20643__$1 = (function (){var statearr_20657 = state_20643;(statearr_20657[11] = inst_20616);
(statearr_20657[7] = inst_20604);
(statearr_20657[8] = inst_20603__$1);
return statearr_20657;
})();var statearr_20658_20682 = state_20643__$1;(statearr_20658_20682[2] = null);
(statearr_20658_20682[1] = 2);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_20644 === 9))
{var inst_20603 = (state_20643[8]);var inst_20619 = cljs.core.vec.call(null,inst_20603);var state_20643__$1 = state_20643;return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_20643__$1,11,out,inst_20619);
} else
{if((state_val_20644 === 10))
{var inst_20626 = (state_20643[2]);var state_20643__$1 = state_20643;var statearr_20659_20683 = state_20643__$1;(statearr_20659_20683[2] = inst_20626);
(statearr_20659_20683[1] = 7);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_20644 === 11))
{var inst_20607 = (state_20643[9]);var inst_20611 = (state_20643[10]);var inst_20621 = (state_20643[2]);var inst_20622 = (new Array(0));var inst_20623 = inst_20622.push(inst_20607);var inst_20603 = inst_20622;var inst_20604 = inst_20611;var state_20643__$1 = (function (){var statearr_20660 = state_20643;(statearr_20660[12] = inst_20623);
(statearr_20660[13] = inst_20621);
(statearr_20660[7] = inst_20604);
(statearr_20660[8] = inst_20603);
return statearr_20660;
})();var statearr_20661_20684 = state_20643__$1;(statearr_20661_20684[2] = null);
(statearr_20661_20684[1] = 2);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_20644 === 12))
{var inst_20603 = (state_20643[8]);var inst_20631 = cljs.core.vec.call(null,inst_20603);var state_20643__$1 = state_20643;return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_20643__$1,15,out,inst_20631);
} else
{if((state_val_20644 === 13))
{var state_20643__$1 = state_20643;var statearr_20662_20685 = state_20643__$1;(statearr_20662_20685[2] = null);
(statearr_20662_20685[1] = 14);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_20644 === 14))
{var inst_20636 = (state_20643[2]);var inst_20637 = cljs.core.async.close_BANG_.call(null,out);var state_20643__$1 = (function (){var statearr_20663 = state_20643;(statearr_20663[14] = inst_20636);
return statearr_20663;
})();var statearr_20664_20686 = state_20643__$1;(statearr_20664_20686[2] = inst_20637);
(statearr_20664_20686[1] = 7);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_20644 === 15))
{var inst_20633 = (state_20643[2]);var state_20643__$1 = state_20643;var statearr_20665_20687 = state_20643__$1;(statearr_20665_20687[2] = inst_20633);
(statearr_20665_20687[1] = 14);
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
var state_machine__5425__auto____0 = (function (){var statearr_20669 = (new Array(15));(statearr_20669[0] = state_machine__5425__auto__);
(statearr_20669[1] = 1);
return statearr_20669;
});
var state_machine__5425__auto____1 = (function (state_20643){while(true){
var ret_value__5426__auto__ = (function (){try{while(true){
var result__5427__auto__ = switch__5424__auto__.call(null,state_20643);if(cljs.core.keyword_identical_QMARK_.call(null,result__5427__auto__,new cljs.core.Keyword(null,"recur","recur",1122293407)))
{{
continue;
}
} else
{return result__5427__auto__;
}
break;
}
}catch (e20670){if((e20670 instanceof Object))
{var ex__5428__auto__ = e20670;var statearr_20671_20688 = state_20643;(statearr_20671_20688[5] = ex__5428__auto__);
cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_20643);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if(new cljs.core.Keyword(null,"else","else",1017020587))
{throw e20670;
} else
{return null;
}
}
}})();if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__5426__auto__,new cljs.core.Keyword(null,"recur","recur",1122293407)))
{{
var G__20689 = state_20643;
state_20643 = G__20689;
continue;
}
} else
{return ret_value__5426__auto__;
}
break;
}
});
state_machine__5425__auto__ = function(state_20643){
switch(arguments.length){
case 0:
return state_machine__5425__auto____0.call(this);
case 1:
return state_machine__5425__auto____1.call(this,state_20643);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
state_machine__5425__auto__.cljs$core$IFn$_invoke$arity$0 = state_machine__5425__auto____0;
state_machine__5425__auto__.cljs$core$IFn$_invoke$arity$1 = state_machine__5425__auto____1;
return state_machine__5425__auto__;
})()
;})(switch__5424__auto__))
})();var state__5496__auto__ = (function (){var statearr_20672 = f__5495__auto__.call(null);(statearr_20672[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__5494__auto___20673);
return statearr_20672;
})();return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__5496__auto__);
}));
return out;
});
partition_by = function(f,ch,buf_or_n){
switch(arguments.length){
case 2:
return partition_by__2.call(this,f,ch);
case 3:
return partition_by__3.call(this,f,ch,buf_or_n);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
partition_by.cljs$core$IFn$_invoke$arity$2 = partition_by__2;
partition_by.cljs$core$IFn$_invoke$arity$3 = partition_by__3;
return partition_by;
})()
;
