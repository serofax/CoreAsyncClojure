var COMPILED = !0, goog = goog || {};
goog.global = this;
goog.DEBUG = !0;
goog.LOCALE = "en";
goog.TRUSTED_SITE = !0;
goog.provide = function(a) {
  if(!COMPILED) {
    if(goog.isProvided_(a)) {
      throw Error('Namespace "' + a + '" already declared.');
    }
    delete goog.implicitNamespaces_[a];
    for(var b = a;(b = b.substring(0, b.lastIndexOf("."))) && !goog.getObjectByName(b);) {
      goog.implicitNamespaces_[b] = !0
    }
  }
  goog.exportPath_(a)
};
goog.setTestOnly = function(a) {
  if(COMPILED && !goog.DEBUG) {
    throw a = a || "", Error("Importing test-only code into non-debug environment" + a ? ": " + a : ".");
  }
};
COMPILED || (goog.isProvided_ = function(a) {
  return!goog.implicitNamespaces_[a] && !!goog.getObjectByName(a)
}, goog.implicitNamespaces_ = {});
goog.exportPath_ = function(a, b, c) {
  a = a.split(".");
  c = c || goog.global;
  a[0] in c || !c.execScript || c.execScript("var " + a[0]);
  for(var d;a.length && (d = a.shift());) {
    !a.length && goog.isDef(b) ? c[d] = b : c = c[d] ? c[d] : c[d] = {}
  }
};
goog.getObjectByName = function(a, b) {
  for(var c = a.split("."), d = b || goog.global, e;e = c.shift();) {
    if(goog.isDefAndNotNull(d[e])) {
      d = d[e]
    }else {
      return null
    }
  }
  return d
};
goog.globalize = function(a, b) {
  var c = b || goog.global, d;
  for(d in a) {
    c[d] = a[d]
  }
};
goog.addDependency = function(a, b, c) {
  if(!COMPILED) {
    var d;
    a = a.replace(/\\/g, "/");
    for(var e = goog.dependencies_, f = 0;d = b[f];f++) {
      e.nameToPath[d] = a, a in e.pathToNames || (e.pathToNames[a] = {}), e.pathToNames[a][d] = !0
    }
    for(d = 0;b = c[d];d++) {
      a in e.requires || (e.requires[a] = {}), e.requires[a][b] = !0
    }
  }
};
goog.ENABLE_DEBUG_LOADER = !0;
goog.require = function(a) {
  if(!COMPILED && !goog.isProvided_(a)) {
    if(goog.ENABLE_DEBUG_LOADER) {
      var b = goog.getPathFromDeps_(a);
      if(b) {
        goog.included_[b] = !0;
        goog.writeScripts_();
        return
      }
    }
    a = "goog.require could not find: " + a;
    goog.global.console && goog.global.console.error(a);
    throw Error(a);
  }
};
goog.basePath = "";
goog.nullFunction = function() {
};
goog.identityFunction = function(a, b) {
  return a
};
goog.abstractMethod = function() {
  throw Error("unimplemented abstract method");
};
goog.addSingletonGetter = function(a) {
  a.getInstance = function() {
    if(a.instance_) {
      return a.instance_
    }
    goog.DEBUG && (goog.instantiatedSingletons_[goog.instantiatedSingletons_.length] = a);
    return a.instance_ = new a
  }
};
goog.instantiatedSingletons_ = [];
!COMPILED && goog.ENABLE_DEBUG_LOADER && (goog.included_ = {}, goog.dependencies_ = {pathToNames:{}, nameToPath:{}, requires:{}, visited:{}, written:{}}, goog.inHtmlDocument_ = function() {
  var a = goog.global.document;
  return"undefined" != typeof a && "write" in a
}, goog.findBasePath_ = function() {
  if(goog.global.CLOSURE_BASE_PATH) {
    goog.basePath = goog.global.CLOSURE_BASE_PATH
  }else {
    if(goog.inHtmlDocument_()) {
      for(var a = goog.global.document.getElementsByTagName("script"), b = a.length - 1;0 <= b;--b) {
        var c = a[b].src, d = c.lastIndexOf("?"), d = -1 == d ? c.length : d;
        if("base.js" == c.substr(d - 7, 7)) {
          goog.basePath = c.substr(0, d - 7);
          break
        }
      }
    }
  }
}, goog.importScript_ = function(a) {
  var b = goog.global.CLOSURE_IMPORT_SCRIPT || goog.writeScriptTag_;
  !goog.dependencies_.written[a] && b(a) && (goog.dependencies_.written[a] = !0)
}, goog.writeScriptTag_ = function(a) {
  if(goog.inHtmlDocument_()) {
    var b = goog.global.document;
    if("complete" == b.readyState) {
      if(/\bdeps.js$/.test(a)) {
        return!1
      }
      throw Error('Cannot write "' + a + '" after document load');
    }
    b.write('\x3cscript type\x3d"text/javascript" src\x3d"' + a + '"\x3e\x3c/script\x3e');
    return!0
  }
  return!1
}, goog.writeScripts_ = function() {
  function a(e) {
    if(!(e in d.written)) {
      if(!(e in d.visited) && (d.visited[e] = !0, e in d.requires)) {
        for(var g in d.requires[e]) {
          if(!goog.isProvided_(g)) {
            if(g in d.nameToPath) {
              a(d.nameToPath[g])
            }else {
              throw Error("Undefined nameToPath for " + g);
            }
          }
        }
      }
      e in c || (c[e] = !0, b.push(e))
    }
  }
  var b = [], c = {}, d = goog.dependencies_, e;
  for(e in goog.included_) {
    d.written[e] || a(e)
  }
  for(e = 0;e < b.length;e++) {
    if(b[e]) {
      goog.importScript_(goog.basePath + b[e])
    }else {
      throw Error("Undefined script input");
    }
  }
}, goog.getPathFromDeps_ = function(a) {
  return a in goog.dependencies_.nameToPath ? goog.dependencies_.nameToPath[a] : null
}, goog.findBasePath_(), goog.global.CLOSURE_NO_DEPS || goog.importScript_(goog.basePath + "deps.js"));
goog.typeOf = function(a) {
  var b = typeof a;
  if("object" == b) {
    if(a) {
      if(a instanceof Array) {
        return"array"
      }
      if(a instanceof Object) {
        return b
      }
      var c = Object.prototype.toString.call(a);
      if("[object Window]" == c) {
        return"object"
      }
      if("[object Array]" == c || "number" == typeof a.length && "undefined" != typeof a.splice && "undefined" != typeof a.propertyIsEnumerable && !a.propertyIsEnumerable("splice")) {
        return"array"
      }
      if("[object Function]" == c || "undefined" != typeof a.call && "undefined" != typeof a.propertyIsEnumerable && !a.propertyIsEnumerable("call")) {
        return"function"
      }
    }else {
      return"null"
    }
  }else {
    if("function" == b && "undefined" == typeof a.call) {
      return"object"
    }
  }
  return b
};
goog.isDef = function(a) {
  return void 0 !== a
};
goog.isNull = function(a) {
  return null === a
};
goog.isDefAndNotNull = function(a) {
  return null != a
};
goog.isArray = function(a) {
  return"array" == goog.typeOf(a)
};
goog.isArrayLike = function(a) {
  var b = goog.typeOf(a);
  return"array" == b || "object" == b && "number" == typeof a.length
};
goog.isDateLike = function(a) {
  return goog.isObject(a) && "function" == typeof a.getFullYear
};
goog.isString = function(a) {
  return"string" == typeof a
};
goog.isBoolean = function(a) {
  return"boolean" == typeof a
};
goog.isNumber = function(a) {
  return"number" == typeof a
};
goog.isFunction = function(a) {
  return"function" == goog.typeOf(a)
};
goog.isObject = function(a) {
  var b = typeof a;
  return"object" == b && null != a || "function" == b
};
goog.getUid = function(a) {
  return a[goog.UID_PROPERTY_] || (a[goog.UID_PROPERTY_] = ++goog.uidCounter_)
};
goog.removeUid = function(a) {
  "removeAttribute" in a && a.removeAttribute(goog.UID_PROPERTY_);
  try {
    delete a[goog.UID_PROPERTY_]
  }catch(b) {
  }
};
goog.UID_PROPERTY_ = "closure_uid_" + (1E9 * Math.random() >>> 0);
goog.uidCounter_ = 0;
goog.getHashCode = goog.getUid;
goog.removeHashCode = goog.removeUid;
goog.cloneObject = function(a) {
  var b = goog.typeOf(a);
  if("object" == b || "array" == b) {
    if(a.clone) {
      return a.clone()
    }
    var b = "array" == b ? [] : {}, c;
    for(c in a) {
      b[c] = goog.cloneObject(a[c])
    }
    return b
  }
  return a
};
goog.bindNative_ = function(a, b, c) {
  return a.call.apply(a.bind, arguments)
};
goog.bindJs_ = function(a, b, c) {
  if(!a) {
    throw Error();
  }
  if(2 < arguments.length) {
    var d = Array.prototype.slice.call(arguments, 2);
    return function() {
      var c = Array.prototype.slice.call(arguments);
      Array.prototype.unshift.apply(c, d);
      return a.apply(b, c)
    }
  }
  return function() {
    return a.apply(b, arguments)
  }
};
goog.bind = function(a, b, c) {
  Function.prototype.bind && -1 != Function.prototype.bind.toString().indexOf("native code") ? goog.bind = goog.bindNative_ : goog.bind = goog.bindJs_;
  return goog.bind.apply(null, arguments)
};
goog.partial = function(a, b) {
  var c = Array.prototype.slice.call(arguments, 1);
  return function() {
    var b = Array.prototype.slice.call(arguments);
    b.unshift.apply(b, c);
    return a.apply(this, b)
  }
};
goog.mixin = function(a, b) {
  for(var c in b) {
    a[c] = b[c]
  }
};
goog.now = goog.TRUSTED_SITE && Date.now || function() {
  return+new Date
};
goog.globalEval = function(a) {
  if(goog.global.execScript) {
    goog.global.execScript(a, "JavaScript")
  }else {
    if(goog.global.eval) {
      if(null == goog.evalWorksForGlobals_ && (goog.global.eval("var _et_ \x3d 1;"), "undefined" != typeof goog.global._et_ ? (delete goog.global._et_, goog.evalWorksForGlobals_ = !0) : goog.evalWorksForGlobals_ = !1), goog.evalWorksForGlobals_) {
        goog.global.eval(a)
      }else {
        var b = goog.global.document, c = b.createElement("script");
        c.type = "text/javascript";
        c.defer = !1;
        c.appendChild(b.createTextNode(a));
        b.body.appendChild(c);
        b.body.removeChild(c)
      }
    }else {
      throw Error("goog.globalEval not available");
    }
  }
};
goog.evalWorksForGlobals_ = null;
goog.getCssName = function(a, b) {
  var c = function(a) {
    return goog.cssNameMapping_[a] || a
  }, d = function(a) {
    a = a.split("-");
    for(var b = [], d = 0;d < a.length;d++) {
      b.push(c(a[d]))
    }
    return b.join("-")
  }, d = goog.cssNameMapping_ ? "BY_WHOLE" == goog.cssNameMappingStyle_ ? c : d : function(a) {
    return a
  };
  return b ? a + "-" + d(b) : d(a)
};
goog.setCssNameMapping = function(a, b) {
  goog.cssNameMapping_ = a;
  goog.cssNameMappingStyle_ = b
};
!COMPILED && goog.global.CLOSURE_CSS_NAME_MAPPING && (goog.cssNameMapping_ = goog.global.CLOSURE_CSS_NAME_MAPPING);
goog.getMsg = function(a, b) {
  var c = b || {}, d;
  for(d in c) {
    var e = ("" + c[d]).replace(/\$/g, "$$$$");
    a = a.replace(RegExp("\\{\\$" + d + "\\}", "gi"), e)
  }
  return a
};
goog.getMsgWithFallback = function(a, b) {
  return a
};
goog.exportSymbol = function(a, b, c) {
  goog.exportPath_(a, b, c)
};
goog.exportProperty = function(a, b, c) {
  a[b] = c
};
goog.inherits = function(a, b) {
  function c() {
  }
  c.prototype = b.prototype;
  a.superClass_ = b.prototype;
  a.prototype = new c;
  a.prototype.constructor = a
};
goog.base = function(a, b, c) {
  var d = arguments.callee.caller;
  if(d.superClass_) {
    return d.superClass_.constructor.apply(a, Array.prototype.slice.call(arguments, 1))
  }
  for(var e = Array.prototype.slice.call(arguments, 2), f = !1, g = a.constructor;g;g = g.superClass_ && g.superClass_.constructor) {
    if(g.prototype[b] === d) {
      f = !0
    }else {
      if(f) {
        return g.prototype[b].apply(a, e)
      }
    }
  }
  if(a[b] === d) {
    return a.constructor.prototype[b].apply(a, e)
  }
  throw Error("goog.base called from a method of one name to a method of a different name");
};
goog.scope = function(a) {
  a.call(goog.global)
};
goog.string = {};
goog.string.Unicode = {NBSP:"\u00a0"};
goog.string.startsWith = function(a, b) {
  return 0 == a.lastIndexOf(b, 0)
};
goog.string.endsWith = function(a, b) {
  var c = a.length - b.length;
  return 0 <= c && a.indexOf(b, c) == c
};
goog.string.caseInsensitiveStartsWith = function(a, b) {
  return 0 == goog.string.caseInsensitiveCompare(b, a.substr(0, b.length))
};
goog.string.caseInsensitiveEndsWith = function(a, b) {
  return 0 == goog.string.caseInsensitiveCompare(b, a.substr(a.length - b.length, b.length))
};
goog.string.subs = function(a, b) {
  for(var c = 1;c < arguments.length;c++) {
    var d = String(arguments[c]).replace(/\$/g, "$$$$");
    a = a.replace(/\%s/, d)
  }
  return a
};
goog.string.collapseWhitespace = function(a) {
  return a.replace(/[\s\xa0]+/g, " ").replace(/^\s+|\s+$/g, "")
};
goog.string.isEmpty = function(a) {
  return/^[\s\xa0]*$/.test(a)
};
goog.string.isEmptySafe = function(a) {
  return goog.string.isEmpty(goog.string.makeSafe(a))
};
goog.string.isBreakingWhitespace = function(a) {
  return!/[^\t\n\r ]/.test(a)
};
goog.string.isAlpha = function(a) {
  return!/[^a-zA-Z]/.test(a)
};
goog.string.isNumeric = function(a) {
  return!/[^0-9]/.test(a)
};
goog.string.isAlphaNumeric = function(a) {
  return!/[^a-zA-Z0-9]/.test(a)
};
goog.string.isSpace = function(a) {
  return" " == a
};
goog.string.isUnicodeChar = function(a) {
  return 1 == a.length && " " <= a && "~" >= a || "\u0080" <= a && "\ufffd" >= a
};
goog.string.stripNewlines = function(a) {
  return a.replace(/(\r\n|\r|\n)+/g, " ")
};
goog.string.canonicalizeNewlines = function(a) {
  return a.replace(/(\r\n|\r|\n)/g, "\n")
};
goog.string.normalizeWhitespace = function(a) {
  return a.replace(/\xa0|\s/g, " ")
};
goog.string.normalizeSpaces = function(a) {
  return a.replace(/\xa0|[ \t]+/g, " ")
};
goog.string.collapseBreakingSpaces = function(a) {
  return a.replace(/[\t\r\n ]+/g, " ").replace(/^[\t\r\n ]+|[\t\r\n ]+$/g, "")
};
goog.string.trim = function(a) {
  return a.replace(/^[\s\xa0]+|[\s\xa0]+$/g, "")
};
goog.string.trimLeft = function(a) {
  return a.replace(/^[\s\xa0]+/, "")
};
goog.string.trimRight = function(a) {
  return a.replace(/[\s\xa0]+$/, "")
};
goog.string.caseInsensitiveCompare = function(a, b) {
  var c = String(a).toLowerCase(), d = String(b).toLowerCase();
  return c < d ? -1 : c == d ? 0 : 1
};
goog.string.numerateCompareRegExp_ = /(\.\d+)|(\d+)|(\D+)/g;
goog.string.numerateCompare = function(a, b) {
  if(a == b) {
    return 0
  }
  if(!a) {
    return-1
  }
  if(!b) {
    return 1
  }
  for(var c = a.toLowerCase().match(goog.string.numerateCompareRegExp_), d = b.toLowerCase().match(goog.string.numerateCompareRegExp_), e = Math.min(c.length, d.length), f = 0;f < e;f++) {
    var g = c[f], h = d[f];
    if(g != h) {
      return c = parseInt(g, 10), !isNaN(c) && (d = parseInt(h, 10), !isNaN(d) && c - d) ? c - d : g < h ? -1 : 1
    }
  }
  return c.length != d.length ? c.length - d.length : a < b ? -1 : 1
};
goog.string.urlEncode = function(a) {
  return encodeURIComponent(String(a))
};
goog.string.urlDecode = function(a) {
  return decodeURIComponent(a.replace(/\+/g, " "))
};
goog.string.newLineToBr = function(a, b) {
  return a.replace(/(\r\n|\r|\n)/g, b ? "\x3cbr /\x3e" : "\x3cbr\x3e")
};
goog.string.htmlEscape = function(a, b) {
  if(b) {
    return a.replace(goog.string.amperRe_, "\x26amp;").replace(goog.string.ltRe_, "\x26lt;").replace(goog.string.gtRe_, "\x26gt;").replace(goog.string.quotRe_, "\x26quot;")
  }
  if(!goog.string.allRe_.test(a)) {
    return a
  }
  -1 != a.indexOf("\x26") && (a = a.replace(goog.string.amperRe_, "\x26amp;"));
  -1 != a.indexOf("\x3c") && (a = a.replace(goog.string.ltRe_, "\x26lt;"));
  -1 != a.indexOf("\x3e") && (a = a.replace(goog.string.gtRe_, "\x26gt;"));
  -1 != a.indexOf('"') && (a = a.replace(goog.string.quotRe_, "\x26quot;"));
  return a
};
goog.string.amperRe_ = /&/g;
goog.string.ltRe_ = /</g;
goog.string.gtRe_ = />/g;
goog.string.quotRe_ = /\"/g;
goog.string.allRe_ = /[&<>\"]/;
goog.string.unescapeEntities = function(a) {
  return goog.string.contains(a, "\x26") ? "document" in goog.global ? goog.string.unescapeEntitiesUsingDom_(a) : goog.string.unescapePureXmlEntities_(a) : a
};
goog.string.unescapeEntitiesUsingDom_ = function(a) {
  var b = {"\x26amp;":"\x26", "\x26lt;":"\x3c", "\x26gt;":"\x3e", "\x26quot;":'"'}, c = document.createElement("div");
  return a.replace(goog.string.HTML_ENTITY_PATTERN_, function(a, e) {
    var f = b[a];
    if(f) {
      return f
    }
    if("#" == e.charAt(0)) {
      var g = Number("0" + e.substr(1));
      isNaN(g) || (f = String.fromCharCode(g))
    }
    f || (c.innerHTML = a + " ", f = c.firstChild.nodeValue.slice(0, -1));
    return b[a] = f
  })
};
goog.string.unescapePureXmlEntities_ = function(a) {
  return a.replace(/&([^;]+);/g, function(a, c) {
    switch(c) {
      case "amp":
        return"\x26";
      case "lt":
        return"\x3c";
      case "gt":
        return"\x3e";
      case "quot":
        return'"';
      default:
        if("#" == c.charAt(0)) {
          var d = Number("0" + c.substr(1));
          if(!isNaN(d)) {
            return String.fromCharCode(d)
          }
        }
        return a
    }
  })
};
goog.string.HTML_ENTITY_PATTERN_ = /&([^;\s<&]+);?/g;
goog.string.whitespaceEscape = function(a, b) {
  return goog.string.newLineToBr(a.replace(/  /g, " \x26#160;"), b)
};
goog.string.stripQuotes = function(a, b) {
  for(var c = b.length, d = 0;d < c;d++) {
    var e = 1 == c ? b : b.charAt(d);
    if(a.charAt(0) == e && a.charAt(a.length - 1) == e) {
      return a.substring(1, a.length - 1)
    }
  }
  return a
};
goog.string.truncate = function(a, b, c) {
  c && (a = goog.string.unescapeEntities(a));
  a.length > b && (a = a.substring(0, b - 3) + "...");
  c && (a = goog.string.htmlEscape(a));
  return a
};
goog.string.truncateMiddle = function(a, b, c, d) {
  c && (a = goog.string.unescapeEntities(a));
  if(d && a.length > b) {
    d > b && (d = b);
    var e = a.length - d;
    a = a.substring(0, b - d) + "..." + a.substring(e)
  }else {
    a.length > b && (d = Math.floor(b / 2), e = a.length - d, a = a.substring(0, d + b % 2) + "..." + a.substring(e))
  }
  c && (a = goog.string.htmlEscape(a));
  return a
};
goog.string.specialEscapeChars_ = {"\x00":"\\0", "\b":"\\b", "\f":"\\f", "\n":"\\n", "\r":"\\r", "\t":"\\t", "\x0B":"\\x0B", '"':'\\"', "\\":"\\\\"};
goog.string.jsEscapeCache_ = {"'":"\\'"};
goog.string.quote = function(a) {
  a = String(a);
  if(a.quote) {
    return a.quote()
  }
  for(var b = ['"'], c = 0;c < a.length;c++) {
    var d = a.charAt(c), e = d.charCodeAt(0);
    b[c + 1] = goog.string.specialEscapeChars_[d] || (31 < e && 127 > e ? d : goog.string.escapeChar(d))
  }
  b.push('"');
  return b.join("")
};
goog.string.escapeString = function(a) {
  for(var b = [], c = 0;c < a.length;c++) {
    b[c] = goog.string.escapeChar(a.charAt(c))
  }
  return b.join("")
};
goog.string.escapeChar = function(a) {
  if(a in goog.string.jsEscapeCache_) {
    return goog.string.jsEscapeCache_[a]
  }
  if(a in goog.string.specialEscapeChars_) {
    return goog.string.jsEscapeCache_[a] = goog.string.specialEscapeChars_[a]
  }
  var b = a, c = a.charCodeAt(0);
  if(31 < c && 127 > c) {
    b = a
  }else {
    if(256 > c) {
      if(b = "\\x", 16 > c || 256 < c) {
        b += "0"
      }
    }else {
      b = "\\u", 4096 > c && (b += "0")
    }
    b += c.toString(16).toUpperCase()
  }
  return goog.string.jsEscapeCache_[a] = b
};
goog.string.toMap = function(a) {
  for(var b = {}, c = 0;c < a.length;c++) {
    b[a.charAt(c)] = !0
  }
  return b
};
goog.string.contains = function(a, b) {
  return-1 != a.indexOf(b)
};
goog.string.countOf = function(a, b) {
  return a && b ? a.split(b).length - 1 : 0
};
goog.string.removeAt = function(a, b, c) {
  var d = a;
  0 <= b && (b < a.length && 0 < c) && (d = a.substr(0, b) + a.substr(b + c, a.length - b - c));
  return d
};
goog.string.remove = function(a, b) {
  var c = RegExp(goog.string.regExpEscape(b), "");
  return a.replace(c, "")
};
goog.string.removeAll = function(a, b) {
  var c = RegExp(goog.string.regExpEscape(b), "g");
  return a.replace(c, "")
};
goog.string.regExpEscape = function(a) {
  return String(a).replace(/([-()\[\]{}+?*.$\^|,:#<!\\])/g, "\\$1").replace(/\x08/g, "\\x08")
};
goog.string.repeat = function(a, b) {
  return Array(b + 1).join(a)
};
goog.string.padNumber = function(a, b, c) {
  a = goog.isDef(c) ? a.toFixed(c) : String(a);
  c = a.indexOf(".");
  -1 == c && (c = a.length);
  return goog.string.repeat("0", Math.max(0, b - c)) + a
};
goog.string.makeSafe = function(a) {
  return null == a ? "" : String(a)
};
goog.string.buildString = function(a) {
  return Array.prototype.join.call(arguments, "")
};
goog.string.getRandomString = function() {
  return Math.floor(2147483648 * Math.random()).toString(36) + Math.abs(Math.floor(2147483648 * Math.random()) ^ goog.now()).toString(36)
};
goog.string.compareVersions = function(a, b) {
  for(var c = 0, d = goog.string.trim(String(a)).split("."), e = goog.string.trim(String(b)).split("."), f = Math.max(d.length, e.length), g = 0;0 == c && g < f;g++) {
    var h = d[g] || "", l = e[g] || "", m = RegExp("(\\d*)(\\D*)", "g"), k = RegExp("(\\d*)(\\D*)", "g");
    do {
      var n = m.exec(h) || ["", "", ""], p = k.exec(l) || ["", "", ""];
      if(0 == n[0].length && 0 == p[0].length) {
        break
      }
      var c = 0 == n[1].length ? 0 : parseInt(n[1], 10), s = 0 == p[1].length ? 0 : parseInt(p[1], 10), c = goog.string.compareElements_(c, s) || goog.string.compareElements_(0 == n[2].length, 0 == p[2].length) || goog.string.compareElements_(n[2], p[2])
    }while(0 == c)
  }
  return c
};
goog.string.compareElements_ = function(a, b) {
  return a < b ? -1 : a > b ? 1 : 0
};
goog.string.HASHCODE_MAX_ = 4294967296;
goog.string.hashCode = function(a) {
  for(var b = 0, c = 0;c < a.length;++c) {
    b = 31 * b + a.charCodeAt(c), b %= goog.string.HASHCODE_MAX_
  }
  return b
};
goog.string.uniqueStringCounter_ = 2147483648 * Math.random() | 0;
goog.string.createUniqueString = function() {
  return"goog_" + goog.string.uniqueStringCounter_++
};
goog.string.toNumber = function(a) {
  var b = Number(a);
  return 0 == b && goog.string.isEmpty(a) ? NaN : b
};
goog.string.toCamelCase = function(a) {
  return String(a).replace(/\-([a-z])/g, function(a, c) {
    return c.toUpperCase()
  })
};
goog.string.toSelectorCase = function(a) {
  return String(a).replace(/([A-Z])/g, "-$1").toLowerCase()
};
goog.string.toTitleCase = function(a, b) {
  var c = goog.isString(b) ? goog.string.regExpEscape(b) : "\\s";
  return a.replace(RegExp("(^" + (c ? "|[" + c + "]+" : "") + ")([a-z])", "g"), function(a, b, c) {
    return b + c.toUpperCase()
  })
};
goog.string.parseInt = function(a) {
  isFinite(a) && (a = String(a));
  return goog.isString(a) ? /^\s*-?0x/i.test(a) ? parseInt(a, 16) : parseInt(a, 10) : NaN
};
goog.debug = {};
goog.debug.Error = function(a) {
  Error.captureStackTrace ? Error.captureStackTrace(this, goog.debug.Error) : this.stack = Error().stack || "";
  a && (this.message = String(a))
};
goog.inherits(goog.debug.Error, Error);
goog.debug.Error.prototype.name = "CustomError";
goog.asserts = {};
goog.asserts.ENABLE_ASSERTS = goog.DEBUG;
goog.asserts.AssertionError = function(a, b) {
  b.unshift(a);
  goog.debug.Error.call(this, goog.string.subs.apply(null, b));
  b.shift();
  this.messagePattern = a
};
goog.inherits(goog.asserts.AssertionError, goog.debug.Error);
goog.asserts.AssertionError.prototype.name = "AssertionError";
goog.asserts.doAssertFailure_ = function(a, b, c, d) {
  var e = "Assertion failed";
  if(c) {
    var e = e + (": " + c), f = d
  }else {
    a && (e += ": " + a, f = b)
  }
  throw new goog.asserts.AssertionError("" + e, f || []);
};
goog.asserts.assert = function(a, b, c) {
  goog.asserts.ENABLE_ASSERTS && !a && goog.asserts.doAssertFailure_("", null, b, Array.prototype.slice.call(arguments, 2));
  return a
};
goog.asserts.fail = function(a, b) {
  if(goog.asserts.ENABLE_ASSERTS) {
    throw new goog.asserts.AssertionError("Failure" + (a ? ": " + a : ""), Array.prototype.slice.call(arguments, 1));
  }
};
goog.asserts.assertNumber = function(a, b, c) {
  goog.asserts.ENABLE_ASSERTS && !goog.isNumber(a) && goog.asserts.doAssertFailure_("Expected number but got %s: %s.", [goog.typeOf(a), a], b, Array.prototype.slice.call(arguments, 2));
  return a
};
goog.asserts.assertString = function(a, b, c) {
  goog.asserts.ENABLE_ASSERTS && !goog.isString(a) && goog.asserts.doAssertFailure_("Expected string but got %s: %s.", [goog.typeOf(a), a], b, Array.prototype.slice.call(arguments, 2));
  return a
};
goog.asserts.assertFunction = function(a, b, c) {
  goog.asserts.ENABLE_ASSERTS && !goog.isFunction(a) && goog.asserts.doAssertFailure_("Expected function but got %s: %s.", [goog.typeOf(a), a], b, Array.prototype.slice.call(arguments, 2));
  return a
};
goog.asserts.assertObject = function(a, b, c) {
  goog.asserts.ENABLE_ASSERTS && !goog.isObject(a) && goog.asserts.doAssertFailure_("Expected object but got %s: %s.", [goog.typeOf(a), a], b, Array.prototype.slice.call(arguments, 2));
  return a
};
goog.asserts.assertArray = function(a, b, c) {
  goog.asserts.ENABLE_ASSERTS && !goog.isArray(a) && goog.asserts.doAssertFailure_("Expected array but got %s: %s.", [goog.typeOf(a), a], b, Array.prototype.slice.call(arguments, 2));
  return a
};
goog.asserts.assertBoolean = function(a, b, c) {
  goog.asserts.ENABLE_ASSERTS && !goog.isBoolean(a) && goog.asserts.doAssertFailure_("Expected boolean but got %s: %s.", [goog.typeOf(a), a], b, Array.prototype.slice.call(arguments, 2));
  return a
};
goog.asserts.assertInstanceof = function(a, b, c, d) {
  !goog.asserts.ENABLE_ASSERTS || a instanceof b || goog.asserts.doAssertFailure_("instanceof check failed.", null, c, Array.prototype.slice.call(arguments, 3));
  return a
};
goog.array = {};
goog.NATIVE_ARRAY_PROTOTYPES = goog.TRUSTED_SITE;
goog.array.peek = function(a) {
  return a[a.length - 1]
};
goog.array.ARRAY_PROTOTYPE_ = Array.prototype;
goog.array.indexOf = goog.NATIVE_ARRAY_PROTOTYPES && goog.array.ARRAY_PROTOTYPE_.indexOf ? function(a, b, c) {
  goog.asserts.assert(null != a.length);
  return goog.array.ARRAY_PROTOTYPE_.indexOf.call(a, b, c)
} : function(a, b, c) {
  c = null == c ? 0 : 0 > c ? Math.max(0, a.length + c) : c;
  if(goog.isString(a)) {
    return goog.isString(b) && 1 == b.length ? a.indexOf(b, c) : -1
  }
  for(;c < a.length;c++) {
    if(c in a && a[c] === b) {
      return c
    }
  }
  return-1
};
goog.array.lastIndexOf = goog.NATIVE_ARRAY_PROTOTYPES && goog.array.ARRAY_PROTOTYPE_.lastIndexOf ? function(a, b, c) {
  goog.asserts.assert(null != a.length);
  return goog.array.ARRAY_PROTOTYPE_.lastIndexOf.call(a, b, null == c ? a.length - 1 : c)
} : function(a, b, c) {
  c = null == c ? a.length - 1 : c;
  0 > c && (c = Math.max(0, a.length + c));
  if(goog.isString(a)) {
    return goog.isString(b) && 1 == b.length ? a.lastIndexOf(b, c) : -1
  }
  for(;0 <= c;c--) {
    if(c in a && a[c] === b) {
      return c
    }
  }
  return-1
};
goog.array.forEach = goog.NATIVE_ARRAY_PROTOTYPES && goog.array.ARRAY_PROTOTYPE_.forEach ? function(a, b, c) {
  goog.asserts.assert(null != a.length);
  goog.array.ARRAY_PROTOTYPE_.forEach.call(a, b, c)
} : function(a, b, c) {
  for(var d = a.length, e = goog.isString(a) ? a.split("") : a, f = 0;f < d;f++) {
    f in e && b.call(c, e[f], f, a)
  }
};
goog.array.forEachRight = function(a, b, c) {
  for(var d = a.length, e = goog.isString(a) ? a.split("") : a, d = d - 1;0 <= d;--d) {
    d in e && b.call(c, e[d], d, a)
  }
};
goog.array.filter = goog.NATIVE_ARRAY_PROTOTYPES && goog.array.ARRAY_PROTOTYPE_.filter ? function(a, b, c) {
  goog.asserts.assert(null != a.length);
  return goog.array.ARRAY_PROTOTYPE_.filter.call(a, b, c)
} : function(a, b, c) {
  for(var d = a.length, e = [], f = 0, g = goog.isString(a) ? a.split("") : a, h = 0;h < d;h++) {
    if(h in g) {
      var l = g[h];
      b.call(c, l, h, a) && (e[f++] = l)
    }
  }
  return e
};
goog.array.map = goog.NATIVE_ARRAY_PROTOTYPES && goog.array.ARRAY_PROTOTYPE_.map ? function(a, b, c) {
  goog.asserts.assert(null != a.length);
  return goog.array.ARRAY_PROTOTYPE_.map.call(a, b, c)
} : function(a, b, c) {
  for(var d = a.length, e = Array(d), f = goog.isString(a) ? a.split("") : a, g = 0;g < d;g++) {
    g in f && (e[g] = b.call(c, f[g], g, a))
  }
  return e
};
goog.array.reduce = function(a, b, c, d) {
  if(a.reduce) {
    return d ? a.reduce(goog.bind(b, d), c) : a.reduce(b, c)
  }
  var e = c;
  goog.array.forEach(a, function(c, g) {
    e = b.call(d, e, c, g, a)
  });
  return e
};
goog.array.reduceRight = function(a, b, c, d) {
  if(a.reduceRight) {
    return d ? a.reduceRight(goog.bind(b, d), c) : a.reduceRight(b, c)
  }
  var e = c;
  goog.array.forEachRight(a, function(c, g) {
    e = b.call(d, e, c, g, a)
  });
  return e
};
goog.array.some = goog.NATIVE_ARRAY_PROTOTYPES && goog.array.ARRAY_PROTOTYPE_.some ? function(a, b, c) {
  goog.asserts.assert(null != a.length);
  return goog.array.ARRAY_PROTOTYPE_.some.call(a, b, c)
} : function(a, b, c) {
  for(var d = a.length, e = goog.isString(a) ? a.split("") : a, f = 0;f < d;f++) {
    if(f in e && b.call(c, e[f], f, a)) {
      return!0
    }
  }
  return!1
};
goog.array.every = goog.NATIVE_ARRAY_PROTOTYPES && goog.array.ARRAY_PROTOTYPE_.every ? function(a, b, c) {
  goog.asserts.assert(null != a.length);
  return goog.array.ARRAY_PROTOTYPE_.every.call(a, b, c)
} : function(a, b, c) {
  for(var d = a.length, e = goog.isString(a) ? a.split("") : a, f = 0;f < d;f++) {
    if(f in e && !b.call(c, e[f], f, a)) {
      return!1
    }
  }
  return!0
};
goog.array.count = function(a, b, c) {
  var d = 0;
  goog.array.forEach(a, function(a, f, g) {
    b.call(c, a, f, g) && ++d
  }, c);
  return d
};
goog.array.find = function(a, b, c) {
  b = goog.array.findIndex(a, b, c);
  return 0 > b ? null : goog.isString(a) ? a.charAt(b) : a[b]
};
goog.array.findIndex = function(a, b, c) {
  for(var d = a.length, e = goog.isString(a) ? a.split("") : a, f = 0;f < d;f++) {
    if(f in e && b.call(c, e[f], f, a)) {
      return f
    }
  }
  return-1
};
goog.array.findRight = function(a, b, c) {
  b = goog.array.findIndexRight(a, b, c);
  return 0 > b ? null : goog.isString(a) ? a.charAt(b) : a[b]
};
goog.array.findIndexRight = function(a, b, c) {
  for(var d = a.length, e = goog.isString(a) ? a.split("") : a, d = d - 1;0 <= d;d--) {
    if(d in e && b.call(c, e[d], d, a)) {
      return d
    }
  }
  return-1
};
goog.array.contains = function(a, b) {
  return 0 <= goog.array.indexOf(a, b)
};
goog.array.isEmpty = function(a) {
  return 0 == a.length
};
goog.array.clear = function(a) {
  if(!goog.isArray(a)) {
    for(var b = a.length - 1;0 <= b;b--) {
      delete a[b]
    }
  }
  a.length = 0
};
goog.array.insert = function(a, b) {
  goog.array.contains(a, b) || a.push(b)
};
goog.array.insertAt = function(a, b, c) {
  goog.array.splice(a, c, 0, b)
};
goog.array.insertArrayAt = function(a, b, c) {
  goog.partial(goog.array.splice, a, c, 0).apply(null, b)
};
goog.array.insertBefore = function(a, b, c) {
  var d;
  2 == arguments.length || 0 > (d = goog.array.indexOf(a, c)) ? a.push(b) : goog.array.insertAt(a, b, d)
};
goog.array.remove = function(a, b) {
  var c = goog.array.indexOf(a, b), d;
  (d = 0 <= c) && goog.array.removeAt(a, c);
  return d
};
goog.array.removeAt = function(a, b) {
  goog.asserts.assert(null != a.length);
  return 1 == goog.array.ARRAY_PROTOTYPE_.splice.call(a, b, 1).length
};
goog.array.removeIf = function(a, b, c) {
  b = goog.array.findIndex(a, b, c);
  return 0 <= b ? (goog.array.removeAt(a, b), !0) : !1
};
goog.array.concat = function(a) {
  return goog.array.ARRAY_PROTOTYPE_.concat.apply(goog.array.ARRAY_PROTOTYPE_, arguments)
};
goog.array.toArray = function(a) {
  var b = a.length;
  if(0 < b) {
    for(var c = Array(b), d = 0;d < b;d++) {
      c[d] = a[d]
    }
    return c
  }
  return[]
};
goog.array.clone = goog.array.toArray;
goog.array.extend = function(a, b) {
  for(var c = 1;c < arguments.length;c++) {
    var d = arguments[c], e;
    if(goog.isArray(d) || (e = goog.isArrayLike(d)) && Object.prototype.hasOwnProperty.call(d, "callee")) {
      a.push.apply(a, d)
    }else {
      if(e) {
        for(var f = a.length, g = d.length, h = 0;h < g;h++) {
          a[f + h] = d[h]
        }
      }else {
        a.push(d)
      }
    }
  }
};
goog.array.splice = function(a, b, c, d) {
  goog.asserts.assert(null != a.length);
  return goog.array.ARRAY_PROTOTYPE_.splice.apply(a, goog.array.slice(arguments, 1))
};
goog.array.slice = function(a, b, c) {
  goog.asserts.assert(null != a.length);
  return 2 >= arguments.length ? goog.array.ARRAY_PROTOTYPE_.slice.call(a, b) : goog.array.ARRAY_PROTOTYPE_.slice.call(a, b, c)
};
goog.array.removeDuplicates = function(a, b) {
  for(var c = b || a, d = {}, e = 0, f = 0;f < a.length;) {
    var g = a[f++], h = goog.isObject(g) ? "o" + goog.getUid(g) : (typeof g).charAt(0) + g;
    Object.prototype.hasOwnProperty.call(d, h) || (d[h] = !0, c[e++] = g)
  }
  c.length = e
};
goog.array.binarySearch = function(a, b, c) {
  return goog.array.binarySearch_(a, c || goog.array.defaultCompare, !1, b)
};
goog.array.binarySelect = function(a, b, c) {
  return goog.array.binarySearch_(a, b, !0, void 0, c)
};
goog.array.binarySearch_ = function(a, b, c, d, e) {
  for(var f = 0, g = a.length, h;f < g;) {
    var l = f + g >> 1, m;
    m = c ? b.call(e, a[l], l, a) : b(d, a[l]);
    0 < m ? f = l + 1 : (g = l, h = !m)
  }
  return h ? f : ~f
};
goog.array.sort = function(a, b) {
  goog.asserts.assert(null != a.length);
  goog.array.ARRAY_PROTOTYPE_.sort.call(a, b || goog.array.defaultCompare)
};
goog.array.stableSort = function(a, b) {
  for(var c = 0;c < a.length;c++) {
    a[c] = {index:c, value:a[c]}
  }
  var d = b || goog.array.defaultCompare;
  goog.array.sort(a, function(a, b) {
    return d(a.value, b.value) || a.index - b.index
  });
  for(c = 0;c < a.length;c++) {
    a[c] = a[c].value
  }
};
goog.array.sortObjectsByKey = function(a, b, c) {
  var d = c || goog.array.defaultCompare;
  goog.array.sort(a, function(a, c) {
    return d(a[b], c[b])
  })
};
goog.array.isSorted = function(a, b, c) {
  b = b || goog.array.defaultCompare;
  for(var d = 1;d < a.length;d++) {
    var e = b(a[d - 1], a[d]);
    if(0 < e || 0 == e && c) {
      return!1
    }
  }
  return!0
};
goog.array.equals = function(a, b, c) {
  if(!goog.isArrayLike(a) || !goog.isArrayLike(b) || a.length != b.length) {
    return!1
  }
  var d = a.length;
  c = c || goog.array.defaultCompareEquality;
  for(var e = 0;e < d;e++) {
    if(!c(a[e], b[e])) {
      return!1
    }
  }
  return!0
};
goog.array.compare = function(a, b, c) {
  return goog.array.equals(a, b, c)
};
goog.array.compare3 = function(a, b, c) {
  c = c || goog.array.defaultCompare;
  for(var d = Math.min(a.length, b.length), e = 0;e < d;e++) {
    var f = c(a[e], b[e]);
    if(0 != f) {
      return f
    }
  }
  return goog.array.defaultCompare(a.length, b.length)
};
goog.array.defaultCompare = function(a, b) {
  return a > b ? 1 : a < b ? -1 : 0
};
goog.array.defaultCompareEquality = function(a, b) {
  return a === b
};
goog.array.binaryInsert = function(a, b, c) {
  c = goog.array.binarySearch(a, b, c);
  return 0 > c ? (goog.array.insertAt(a, b, -(c + 1)), !0) : !1
};
goog.array.binaryRemove = function(a, b, c) {
  b = goog.array.binarySearch(a, b, c);
  return 0 <= b ? goog.array.removeAt(a, b) : !1
};
goog.array.bucket = function(a, b) {
  for(var c = {}, d = 0;d < a.length;d++) {
    var e = a[d], f = b(e, d, a);
    goog.isDef(f) && (c[f] || (c[f] = [])).push(e)
  }
  return c
};
goog.array.toObject = function(a, b, c) {
  var d = {};
  goog.array.forEach(a, function(e, f) {
    d[b.call(c, e, f, a)] = e
  });
  return d
};
goog.array.range = function(a, b, c) {
  var d = [], e = 0, f = a;
  c = c || 1;
  void 0 !== b && (e = a, f = b);
  if(0 > c * (f - e)) {
    return[]
  }
  if(0 < c) {
    for(a = e;a < f;a += c) {
      d.push(a)
    }
  }else {
    for(a = e;a > f;a += c) {
      d.push(a)
    }
  }
  return d
};
goog.array.repeat = function(a, b) {
  for(var c = [], d = 0;d < b;d++) {
    c[d] = a
  }
  return c
};
goog.array.flatten = function(a) {
  for(var b = [], c = 0;c < arguments.length;c++) {
    var d = arguments[c];
    goog.isArray(d) ? b.push.apply(b, goog.array.flatten.apply(null, d)) : b.push(d)
  }
  return b
};
goog.array.rotate = function(a, b) {
  goog.asserts.assert(null != a.length);
  a.length && (b %= a.length, 0 < b ? goog.array.ARRAY_PROTOTYPE_.unshift.apply(a, a.splice(-b, b)) : 0 > b && goog.array.ARRAY_PROTOTYPE_.push.apply(a, a.splice(0, -b)));
  return a
};
goog.array.zip = function(a) {
  if(!arguments.length) {
    return[]
  }
  for(var b = [], c = 0;;c++) {
    for(var d = [], e = 0;e < arguments.length;e++) {
      var f = arguments[e];
      if(c >= f.length) {
        return b
      }
      d.push(f[c])
    }
    b.push(d)
  }
};
goog.array.shuffle = function(a, b) {
  for(var c = b || Math.random, d = a.length - 1;0 < d;d--) {
    var e = Math.floor(c() * (d + 1)), f = a[d];
    a[d] = a[e];
    a[e] = f
  }
};
goog.object = {};
goog.object.forEach = function(a, b, c) {
  for(var d in a) {
    b.call(c, a[d], d, a)
  }
};
goog.object.filter = function(a, b, c) {
  var d = {}, e;
  for(e in a) {
    b.call(c, a[e], e, a) && (d[e] = a[e])
  }
  return d
};
goog.object.map = function(a, b, c) {
  var d = {}, e;
  for(e in a) {
    d[e] = b.call(c, a[e], e, a)
  }
  return d
};
goog.object.some = function(a, b, c) {
  for(var d in a) {
    if(b.call(c, a[d], d, a)) {
      return!0
    }
  }
  return!1
};
goog.object.every = function(a, b, c) {
  for(var d in a) {
    if(!b.call(c, a[d], d, a)) {
      return!1
    }
  }
  return!0
};
goog.object.getCount = function(a) {
  var b = 0, c;
  for(c in a) {
    b++
  }
  return b
};
goog.object.getAnyKey = function(a) {
  for(var b in a) {
    return b
  }
};
goog.object.getAnyValue = function(a) {
  for(var b in a) {
    return a[b]
  }
};
goog.object.contains = function(a, b) {
  return goog.object.containsValue(a, b)
};
goog.object.getValues = function(a) {
  var b = [], c = 0, d;
  for(d in a) {
    b[c++] = a[d]
  }
  return b
};
goog.object.getKeys = function(a) {
  var b = [], c = 0, d;
  for(d in a) {
    b[c++] = d
  }
  return b
};
goog.object.getValueByKeys = function(a, b) {
  for(var c = goog.isArrayLike(b), d = c ? b : arguments, c = c ? 0 : 1;c < d.length && (a = a[d[c]], goog.isDef(a));c++) {
  }
  return a
};
goog.object.containsKey = function(a, b) {
  return b in a
};
goog.object.containsValue = function(a, b) {
  for(var c in a) {
    if(a[c] == b) {
      return!0
    }
  }
  return!1
};
goog.object.findKey = function(a, b, c) {
  for(var d in a) {
    if(b.call(c, a[d], d, a)) {
      return d
    }
  }
};
goog.object.findValue = function(a, b, c) {
  return(b = goog.object.findKey(a, b, c)) && a[b]
};
goog.object.isEmpty = function(a) {
  for(var b in a) {
    return!1
  }
  return!0
};
goog.object.clear = function(a) {
  for(var b in a) {
    delete a[b]
  }
};
goog.object.remove = function(a, b) {
  var c;
  (c = b in a) && delete a[b];
  return c
};
goog.object.add = function(a, b, c) {
  if(b in a) {
    throw Error('The object already contains the key "' + b + '"');
  }
  goog.object.set(a, b, c)
};
goog.object.get = function(a, b, c) {
  return b in a ? a[b] : c
};
goog.object.set = function(a, b, c) {
  a[b] = c
};
goog.object.setIfUndefined = function(a, b, c) {
  return b in a ? a[b] : a[b] = c
};
goog.object.clone = function(a) {
  var b = {}, c;
  for(c in a) {
    b[c] = a[c]
  }
  return b
};
goog.object.unsafeClone = function(a) {
  var b = goog.typeOf(a);
  if("object" == b || "array" == b) {
    if(a.clone) {
      return a.clone()
    }
    var b = "array" == b ? [] : {}, c;
    for(c in a) {
      b[c] = goog.object.unsafeClone(a[c])
    }
    return b
  }
  return a
};
goog.object.transpose = function(a) {
  var b = {}, c;
  for(c in a) {
    b[a[c]] = c
  }
  return b
};
goog.object.PROTOTYPE_FIELDS_ = "constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");
goog.object.extend = function(a, b) {
  for(var c, d, e = 1;e < arguments.length;e++) {
    d = arguments[e];
    for(c in d) {
      a[c] = d[c]
    }
    for(var f = 0;f < goog.object.PROTOTYPE_FIELDS_.length;f++) {
      c = goog.object.PROTOTYPE_FIELDS_[f], Object.prototype.hasOwnProperty.call(d, c) && (a[c] = d[c])
    }
  }
};
goog.object.create = function(a) {
  var b = arguments.length;
  if(1 == b && goog.isArray(arguments[0])) {
    return goog.object.create.apply(null, arguments[0])
  }
  if(b % 2) {
    throw Error("Uneven number of arguments");
  }
  for(var c = {}, d = 0;d < b;d += 2) {
    c[arguments[d]] = arguments[d + 1]
  }
  return c
};
goog.object.createSet = function(a) {
  var b = arguments.length;
  if(1 == b && goog.isArray(arguments[0])) {
    return goog.object.createSet.apply(null, arguments[0])
  }
  for(var c = {}, d = 0;d < b;d++) {
    c[arguments[d]] = !0
  }
  return c
};
goog.object.createImmutableView = function(a) {
  var b = a;
  Object.isFrozen && !Object.isFrozen(a) && (b = Object.create(a), Object.freeze(b));
  return b
};
goog.object.isImmutableView = function(a) {
  return!!Object.isFrozen && Object.isFrozen(a)
};
goog.string.StringBuffer = function(a, b) {
  null != a && this.append.apply(this, arguments)
};
goog.string.StringBuffer.prototype.buffer_ = "";
goog.string.StringBuffer.prototype.set = function(a) {
  this.buffer_ = "" + a
};
goog.string.StringBuffer.prototype.append = function(a, b, c) {
  this.buffer_ += a;
  if(null != b) {
    for(var d = 1;d < arguments.length;d++) {
      this.buffer_ += arguments[d]
    }
  }
  return this
};
goog.string.StringBuffer.prototype.clear = function() {
  this.buffer_ = ""
};
goog.string.StringBuffer.prototype.getLength = function() {
  return this.buffer_.length
};
goog.string.StringBuffer.prototype.toString = function() {
  return this.buffer_
};
var cljs = {core:{}};
cljs.core._STAR_clojurescript_version_STAR_ = "0.0-2030";
cljs.core._STAR_unchecked_if_STAR_ = !1;
cljs.core._STAR_print_fn_STAR_ = function(a) {
  throw Error("No *print-fn* fn set for evaluation environment");
};
cljs.core.set_print_fn_BANG_ = function(a) {
  return cljs.core._STAR_print_fn_STAR_ = a
};
cljs.core._STAR_flush_on_newline_STAR_ = !0;
cljs.core._STAR_print_readably_STAR_ = !0;
cljs.core._STAR_print_meta_STAR_ = !1;
cljs.core._STAR_print_dup_STAR_ = !1;
cljs.core.pr_opts = function() {
  return cljs.core.PersistentArrayMap.fromArray([new cljs.core.Keyword(null, "flush-on-newline", "flush-on-newline", 4338025857), cljs.core._STAR_flush_on_newline_STAR_, new cljs.core.Keyword(null, "readably", "readably", 4441712502), cljs.core._STAR_print_readably_STAR_, new cljs.core.Keyword(null, "meta", "meta", 1017252215), cljs.core._STAR_print_meta_STAR_, new cljs.core.Keyword(null, "dup", "dup", 1014004081), cljs.core._STAR_print_dup_STAR_], !0)
};
cljs.core.truth_ = function(a) {
  return null != a && !1 !== a
};
cljs.core.not_native = null;
cljs.core.identical_QMARK_ = function(a, b) {
  return a === b
};
cljs.core.nil_QMARK_ = function(a) {
  return null == a
};
cljs.core.array_QMARK_ = function(a) {
  return a instanceof Array
};
cljs.core.number_QMARK_ = function(a) {
  return"number" === typeof a
};
cljs.core.not = function(a) {
  return cljs.core.truth_(a) ? !1 : !0
};
cljs.core.string_QMARK_ = function(a) {
  return goog.isString(a)
};
cljs.core.native_satisfies_QMARK_ = function(a, b) {
  return a[goog.typeOf(null == b ? null : b)] ? !0 : a._ ? !0 : new cljs.core.Keyword(null, "else", "else", 1017020587) ? !1 : null
};
cljs.core.is_proto_ = function(a) {
  return a.constructor.prototype === a
};
cljs.core._STAR_main_cli_fn_STAR_ = null;
cljs.core.type = function(a) {
  return null == a ? null : a.constructor
};
cljs.core.missing_protocol = function(a, b) {
  var c = cljs.core.type.call(null, b), c = cljs.core.truth_(cljs.core.truth_(c) ? c.cljs$lang$type : c) ? c.cljs$lang$ctorStr : goog.typeOf(b);
  return Error(["No protocol method ", a, " defined for type ", c, ": ", b].join(""))
};
cljs.core.type__GT_str = function(a) {
  var b = a.cljs$lang$ctorStr;
  return cljs.core.truth_(b) ? b : "" + cljs.core.str(a)
};
cljs.core.aclone = function(a) {
  return a.slice()
};
cljs.core.array = function(a) {
  return Array.prototype.slice.call(arguments)
};
cljs.core.make_array = function() {
  var a = null, b = function(b, d) {
    return a.call(null, d)
  }, a = function(a, d) {
    switch(arguments.length) {
      case 1:
        return Array(a);
      case 2:
        return b.call(this, a, d)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$core$IFn$_invoke$arity$1 = function(a) {
    return Array(a)
  };
  a.cljs$core$IFn$_invoke$arity$2 = b;
  return a
}();
cljs.core.aget = function() {
  var a = null, b = function() {
    var b = function(b, c, d) {
      return cljs.core.apply.call(null, a, a.call(null, b, c), d)
    }, d = function(a, d, g) {
      var h = null;
      2 < arguments.length && (h = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2), 0));
      return b.call(this, a, d, h)
    };
    d.cljs$lang$maxFixedArity = 2;
    d.cljs$lang$applyTo = function(a) {
      var d = cljs.core.first(a);
      a = cljs.core.next(a);
      var g = cljs.core.first(a);
      a = cljs.core.rest(a);
      return b(d, g, a)
    };
    d.cljs$core$IFn$_invoke$arity$variadic = b;
    return d
  }(), a = function(a, d, e) {
    switch(arguments.length) {
      case 2:
        return a[d];
      default:
        return b.cljs$core$IFn$_invoke$arity$variadic(a, d, cljs.core.array_seq(arguments, 2))
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$lang$maxFixedArity = 2;
  a.cljs$lang$applyTo = b.cljs$lang$applyTo;
  a.cljs$core$IFn$_invoke$arity$2 = function(a, b) {
    return a[b]
  };
  a.cljs$core$IFn$_invoke$arity$variadic = b.cljs$core$IFn$_invoke$arity$variadic;
  return a
}();
cljs.core.aset = function() {
  var a = null, b = function() {
    var b = function(b, c, d, h) {
      return cljs.core.apply.call(null, a, b[c], d, h)
    }, d = function(a, d, g, h) {
      var l = null;
      3 < arguments.length && (l = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3), 0));
      return b.call(this, a, d, g, l)
    };
    d.cljs$lang$maxFixedArity = 3;
    d.cljs$lang$applyTo = function(a) {
      var d = cljs.core.first(a);
      a = cljs.core.next(a);
      var g = cljs.core.first(a);
      a = cljs.core.next(a);
      var h = cljs.core.first(a);
      a = cljs.core.rest(a);
      return b(d, g, h, a)
    };
    d.cljs$core$IFn$_invoke$arity$variadic = b;
    return d
  }(), a = function(a, d, e, f) {
    switch(arguments.length) {
      case 3:
        return a[d] = e;
      default:
        return b.cljs$core$IFn$_invoke$arity$variadic(a, d, e, cljs.core.array_seq(arguments, 3))
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$lang$maxFixedArity = 3;
  a.cljs$lang$applyTo = b.cljs$lang$applyTo;
  a.cljs$core$IFn$_invoke$arity$3 = function(a, b, e) {
    return a[b] = e
  };
  a.cljs$core$IFn$_invoke$arity$variadic = b.cljs$core$IFn$_invoke$arity$variadic;
  return a
}();
cljs.core.alength = function(a) {
  return a.length
};
cljs.core.into_array = function() {
  var a = null, b = function(b) {
    return a.call(null, null, b)
  }, c = function(a, b) {
    return cljs.core.reduce.call(null, function(a, b) {
      a.push(b);
      return a
    }, [], b)
  }, a = function(a, e) {
    switch(arguments.length) {
      case 1:
        return b.call(this, a);
      case 2:
        return c.call(this, a, e)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$core$IFn$_invoke$arity$1 = b;
  a.cljs$core$IFn$_invoke$arity$2 = c;
  return a
}();
cljs.core.Fn = {};
cljs.core.IFn = {};
cljs.core._invoke = function() {
  var a = null, b = function(a) {
    if(a ? a.cljs$core$IFn$_invoke$arity$1 : a) {
      return a.cljs$core$IFn$_invoke$arity$1(a)
    }
    var b;
    b = cljs.core._invoke[goog.typeOf(null == a ? null : a)];
    if(!b && (b = cljs.core._invoke._, !b)) {
      throw cljs.core.missing_protocol.call(null, "IFn.-invoke", a);
    }
    return b.call(null, a)
  }, c = function(a, b) {
    if(a ? a.cljs$core$IFn$_invoke$arity$2 : a) {
      return a.cljs$core$IFn$_invoke$arity$2(a, b)
    }
    var c;
    c = cljs.core._invoke[goog.typeOf(null == a ? null : a)];
    if(!c && (c = cljs.core._invoke._, !c)) {
      throw cljs.core.missing_protocol.call(null, "IFn.-invoke", a);
    }
    return c.call(null, a, b)
  }, d = function(a, b, c) {
    if(a ? a.cljs$core$IFn$_invoke$arity$3 : a) {
      return a.cljs$core$IFn$_invoke$arity$3(a, b, c)
    }
    var d;
    d = cljs.core._invoke[goog.typeOf(null == a ? null : a)];
    if(!d && (d = cljs.core._invoke._, !d)) {
      throw cljs.core.missing_protocol.call(null, "IFn.-invoke", a);
    }
    return d.call(null, a, b, c)
  }, e = function(a, b, c, d) {
    if(a ? a.cljs$core$IFn$_invoke$arity$4 : a) {
      return a.cljs$core$IFn$_invoke$arity$4(a, b, c, d)
    }
    var e;
    e = cljs.core._invoke[goog.typeOf(null == a ? null : a)];
    if(!e && (e = cljs.core._invoke._, !e)) {
      throw cljs.core.missing_protocol.call(null, "IFn.-invoke", a);
    }
    return e.call(null, a, b, c, d)
  }, f = function(a, b, c, d, e) {
    if(a ? a.cljs$core$IFn$_invoke$arity$5 : a) {
      return a.cljs$core$IFn$_invoke$arity$5(a, b, c, d, e)
    }
    var f;
    f = cljs.core._invoke[goog.typeOf(null == a ? null : a)];
    if(!f && (f = cljs.core._invoke._, !f)) {
      throw cljs.core.missing_protocol.call(null, "IFn.-invoke", a);
    }
    return f.call(null, a, b, c, d, e)
  }, g = function(a, b, c, d, e, f) {
    if(a ? a.cljs$core$IFn$_invoke$arity$6 : a) {
      return a.cljs$core$IFn$_invoke$arity$6(a, b, c, d, e, f)
    }
    var g;
    g = cljs.core._invoke[goog.typeOf(null == a ? null : a)];
    if(!g && (g = cljs.core._invoke._, !g)) {
      throw cljs.core.missing_protocol.call(null, "IFn.-invoke", a);
    }
    return g.call(null, a, b, c, d, e, f)
  }, h = function(a, b, c, d, e, f, g) {
    if(a ? a.cljs$core$IFn$_invoke$arity$7 : a) {
      return a.cljs$core$IFn$_invoke$arity$7(a, b, c, d, e, f, g)
    }
    var h;
    h = cljs.core._invoke[goog.typeOf(null == a ? null : a)];
    if(!h && (h = cljs.core._invoke._, !h)) {
      throw cljs.core.missing_protocol.call(null, "IFn.-invoke", a);
    }
    return h.call(null, a, b, c, d, e, f, g)
  }, l = function(a, b, c, d, e, f, g, h) {
    if(a ? a.cljs$core$IFn$_invoke$arity$8 : a) {
      return a.cljs$core$IFn$_invoke$arity$8(a, b, c, d, e, f, g, h)
    }
    var k;
    k = cljs.core._invoke[goog.typeOf(null == a ? null : a)];
    if(!k && (k = cljs.core._invoke._, !k)) {
      throw cljs.core.missing_protocol.call(null, "IFn.-invoke", a);
    }
    return k.call(null, a, b, c, d, e, f, g, h)
  }, m = function(a, b, c, d, e, f, g, h, k) {
    if(a ? a.cljs$core$IFn$_invoke$arity$9 : a) {
      return a.cljs$core$IFn$_invoke$arity$9(a, b, c, d, e, f, g, h, k)
    }
    var n;
    n = cljs.core._invoke[goog.typeOf(null == a ? null : a)];
    if(!n && (n = cljs.core._invoke._, !n)) {
      throw cljs.core.missing_protocol.call(null, "IFn.-invoke", a);
    }
    return n.call(null, a, b, c, d, e, f, g, h, k)
  }, k = function(a, b, c, d, e, f, g, h, k, n) {
    if(a ? a.cljs$core$IFn$_invoke$arity$10 : a) {
      return a.cljs$core$IFn$_invoke$arity$10(a, b, c, d, e, f, g, h, k, n)
    }
    var l;
    l = cljs.core._invoke[goog.typeOf(null == a ? null : a)];
    if(!l && (l = cljs.core._invoke._, !l)) {
      throw cljs.core.missing_protocol.call(null, "IFn.-invoke", a);
    }
    return l.call(null, a, b, c, d, e, f, g, h, k, n)
  }, n = function(a, b, c, d, e, f, g, h, k, n, l) {
    if(a ? a.cljs$core$IFn$_invoke$arity$11 : a) {
      return a.cljs$core$IFn$_invoke$arity$11(a, b, c, d, e, f, g, h, k, n, l)
    }
    var p;
    p = cljs.core._invoke[goog.typeOf(null == a ? null : a)];
    if(!p && (p = cljs.core._invoke._, !p)) {
      throw cljs.core.missing_protocol.call(null, "IFn.-invoke", a);
    }
    return p.call(null, a, b, c, d, e, f, g, h, k, n, l)
  }, p = function(a, b, c, d, e, f, g, h, k, n, l, p) {
    if(a ? a.cljs$core$IFn$_invoke$arity$12 : a) {
      return a.cljs$core$IFn$_invoke$arity$12(a, b, c, d, e, f, g, h, k, n, l, p)
    }
    var m;
    m = cljs.core._invoke[goog.typeOf(null == a ? null : a)];
    if(!m && (m = cljs.core._invoke._, !m)) {
      throw cljs.core.missing_protocol.call(null, "IFn.-invoke", a);
    }
    return m.call(null, a, b, c, d, e, f, g, h, k, n, l, p)
  }, s = function(a, b, c, d, e, f, g, h, k, n, l, p, m) {
    if(a ? a.cljs$core$IFn$_invoke$arity$13 : a) {
      return a.cljs$core$IFn$_invoke$arity$13(a, b, c, d, e, f, g, h, k, n, l, p, m)
    }
    var s;
    s = cljs.core._invoke[goog.typeOf(null == a ? null : a)];
    if(!s && (s = cljs.core._invoke._, !s)) {
      throw cljs.core.missing_protocol.call(null, "IFn.-invoke", a);
    }
    return s.call(null, a, b, c, d, e, f, g, h, k, n, l, p, m)
  }, r = function(a, b, c, d, e, f, g, h, k, n, l, p, m, s) {
    if(a ? a.cljs$core$IFn$_invoke$arity$14 : a) {
      return a.cljs$core$IFn$_invoke$arity$14(a, b, c, d, e, f, g, h, k, n, l, p, m, s)
    }
    var r;
    r = cljs.core._invoke[goog.typeOf(null == a ? null : a)];
    if(!r && (r = cljs.core._invoke._, !r)) {
      throw cljs.core.missing_protocol.call(null, "IFn.-invoke", a);
    }
    return r.call(null, a, b, c, d, e, f, g, h, k, n, l, p, m, s)
  }, q = function(a, b, c, d, e, f, g, h, k, n, l, p, m, s, r) {
    if(a ? a.cljs$core$IFn$_invoke$arity$15 : a) {
      return a.cljs$core$IFn$_invoke$arity$15(a, b, c, d, e, f, g, h, k, n, l, p, m, s, r)
    }
    var q;
    q = cljs.core._invoke[goog.typeOf(null == a ? null : a)];
    if(!q && (q = cljs.core._invoke._, !q)) {
      throw cljs.core.missing_protocol.call(null, "IFn.-invoke", a);
    }
    return q.call(null, a, b, c, d, e, f, g, h, k, n, l, p, m, s, r)
  }, t = function(a, b, c, d, e, f, g, h, k, n, l, p, m, s, r, q) {
    if(a ? a.cljs$core$IFn$_invoke$arity$16 : a) {
      return a.cljs$core$IFn$_invoke$arity$16(a, b, c, d, e, f, g, h, k, n, l, p, m, s, r, q)
    }
    var t;
    t = cljs.core._invoke[goog.typeOf(null == a ? null : a)];
    if(!t && (t = cljs.core._invoke._, !t)) {
      throw cljs.core.missing_protocol.call(null, "IFn.-invoke", a);
    }
    return t.call(null, a, b, c, d, e, f, g, h, k, n, l, p, m, s, r, q)
  }, u = function(a, b, c, d, e, f, g, h, k, n, l, p, m, s, r, q, t) {
    if(a ? a.cljs$core$IFn$_invoke$arity$17 : a) {
      return a.cljs$core$IFn$_invoke$arity$17(a, b, c, d, e, f, g, h, k, n, l, p, m, s, r, q, t)
    }
    var u;
    u = cljs.core._invoke[goog.typeOf(null == a ? null : a)];
    if(!u && (u = cljs.core._invoke._, !u)) {
      throw cljs.core.missing_protocol.call(null, "IFn.-invoke", a);
    }
    return u.call(null, a, b, c, d, e, f, g, h, k, n, l, p, m, s, r, q, t)
  }, v = function(a, b, c, d, e, f, g, h, k, n, l, p, m, s, r, q, t, u) {
    if(a ? a.cljs$core$IFn$_invoke$arity$18 : a) {
      return a.cljs$core$IFn$_invoke$arity$18(a, b, c, d, e, f, g, h, k, n, l, p, m, s, r, q, t, u)
    }
    var v;
    v = cljs.core._invoke[goog.typeOf(null == a ? null : a)];
    if(!v && (v = cljs.core._invoke._, !v)) {
      throw cljs.core.missing_protocol.call(null, "IFn.-invoke", a);
    }
    return v.call(null, a, b, c, d, e, f, g, h, k, n, l, p, m, s, r, q, t, u)
  }, w = function(a, b, c, d, e, f, g, h, k, n, l, p, m, s, r, q, t, u, v) {
    if(a ? a.cljs$core$IFn$_invoke$arity$19 : a) {
      return a.cljs$core$IFn$_invoke$arity$19(a, b, c, d, e, f, g, h, k, n, l, p, m, s, r, q, t, u, v)
    }
    var w;
    w = cljs.core._invoke[goog.typeOf(null == a ? null : a)];
    if(!w && (w = cljs.core._invoke._, !w)) {
      throw cljs.core.missing_protocol.call(null, "IFn.-invoke", a);
    }
    return w.call(null, a, b, c, d, e, f, g, h, k, n, l, p, m, s, r, q, t, u, v)
  }, B = function(a, b, c, d, e, f, g, h, k, n, l, p, m, s, r, q, t, u, v, w) {
    if(a ? a.cljs$core$IFn$_invoke$arity$20 : a) {
      return a.cljs$core$IFn$_invoke$arity$20(a, b, c, d, e, f, g, h, k, n, l, p, m, s, r, q, t, u, v, w)
    }
    var B;
    B = cljs.core._invoke[goog.typeOf(null == a ? null : a)];
    if(!B && (B = cljs.core._invoke._, !B)) {
      throw cljs.core.missing_protocol.call(null, "IFn.-invoke", a);
    }
    return B.call(null, a, b, c, d, e, f, g, h, k, n, l, p, m, s, r, q, t, u, v, w)
  }, I = function(a, b, c, d, e, f, g, h, k, n, l, p, m, s, r, q, t, u, v, w, B) {
    if(a ? a.cljs$core$IFn$_invoke$arity$21 : a) {
      return a.cljs$core$IFn$_invoke$arity$21(a, b, c, d, e, f, g, h, k, n, l, p, m, s, r, q, t, u, v, w, B)
    }
    var I;
    I = cljs.core._invoke[goog.typeOf(null == a ? null : a)];
    if(!I && (I = cljs.core._invoke._, !I)) {
      throw cljs.core.missing_protocol.call(null, "IFn.-invoke", a);
    }
    return I.call(null, a, b, c, d, e, f, g, h, k, n, l, p, m, s, r, q, t, u, v, w, B)
  }, a = function(a, x, y, z, A, C, D, E, F, G, H, J, K, L, M, N, O, P, Q, S, T) {
    switch(arguments.length) {
      case 1:
        return b.call(this, a);
      case 2:
        return c.call(this, a, x);
      case 3:
        return d.call(this, a, x, y);
      case 4:
        return e.call(this, a, x, y, z);
      case 5:
        return f.call(this, a, x, y, z, A);
      case 6:
        return g.call(this, a, x, y, z, A, C);
      case 7:
        return h.call(this, a, x, y, z, A, C, D);
      case 8:
        return l.call(this, a, x, y, z, A, C, D, E);
      case 9:
        return m.call(this, a, x, y, z, A, C, D, E, F);
      case 10:
        return k.call(this, a, x, y, z, A, C, D, E, F, G);
      case 11:
        return n.call(this, a, x, y, z, A, C, D, E, F, G, H);
      case 12:
        return p.call(this, a, x, y, z, A, C, D, E, F, G, H, J);
      case 13:
        return s.call(this, a, x, y, z, A, C, D, E, F, G, H, J, K);
      case 14:
        return r.call(this, a, x, y, z, A, C, D, E, F, G, H, J, K, L);
      case 15:
        return q.call(this, a, x, y, z, A, C, D, E, F, G, H, J, K, L, M);
      case 16:
        return t.call(this, a, x, y, z, A, C, D, E, F, G, H, J, K, L, M, N);
      case 17:
        return u.call(this, a, x, y, z, A, C, D, E, F, G, H, J, K, L, M, N, O);
      case 18:
        return v.call(this, a, x, y, z, A, C, D, E, F, G, H, J, K, L, M, N, O, P);
      case 19:
        return w.call(this, a, x, y, z, A, C, D, E, F, G, H, J, K, L, M, N, O, P, Q);
      case 20:
        return B.call(this, a, x, y, z, A, C, D, E, F, G, H, J, K, L, M, N, O, P, Q, S);
      case 21:
        return I.call(this, a, x, y, z, A, C, D, E, F, G, H, J, K, L, M, N, O, P, Q, S, T)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$core$IFn$_invoke$arity$1 = b;
  a.cljs$core$IFn$_invoke$arity$2 = c;
  a.cljs$core$IFn$_invoke$arity$3 = d;
  a.cljs$core$IFn$_invoke$arity$4 = e;
  a.cljs$core$IFn$_invoke$arity$5 = f;
  a.cljs$core$IFn$_invoke$arity$6 = g;
  a.cljs$core$IFn$_invoke$arity$7 = h;
  a.cljs$core$IFn$_invoke$arity$8 = l;
  a.cljs$core$IFn$_invoke$arity$9 = m;
  a.cljs$core$IFn$_invoke$arity$10 = k;
  a.cljs$core$IFn$_invoke$arity$11 = n;
  a.cljs$core$IFn$_invoke$arity$12 = p;
  a.cljs$core$IFn$_invoke$arity$13 = s;
  a.cljs$core$IFn$_invoke$arity$14 = r;
  a.cljs$core$IFn$_invoke$arity$15 = q;
  a.cljs$core$IFn$_invoke$arity$16 = t;
  a.cljs$core$IFn$_invoke$arity$17 = u;
  a.cljs$core$IFn$_invoke$arity$18 = v;
  a.cljs$core$IFn$_invoke$arity$19 = w;
  a.cljs$core$IFn$_invoke$arity$20 = B;
  a.cljs$core$IFn$_invoke$arity$21 = I;
  return a
}();
cljs.core.ICounted = {};
cljs.core._count = function(a) {
  if(a ? a.cljs$core$ICounted$_count$arity$1 : a) {
    return a.cljs$core$ICounted$_count$arity$1(a)
  }
  var b;
  b = cljs.core._count[goog.typeOf(null == a ? null : a)];
  if(!b && (b = cljs.core._count._, !b)) {
    throw cljs.core.missing_protocol.call(null, "ICounted.-count", a);
  }
  return b.call(null, a)
};
cljs.core.IEmptyableCollection = {};
cljs.core._empty = function(a) {
  if(a ? a.cljs$core$IEmptyableCollection$_empty$arity$1 : a) {
    return a.cljs$core$IEmptyableCollection$_empty$arity$1(a)
  }
  var b;
  b = cljs.core._empty[goog.typeOf(null == a ? null : a)];
  if(!b && (b = cljs.core._empty._, !b)) {
    throw cljs.core.missing_protocol.call(null, "IEmptyableCollection.-empty", a);
  }
  return b.call(null, a)
};
cljs.core.ICollection = {};
cljs.core._conj = function(a, b) {
  if(a ? a.cljs$core$ICollection$_conj$arity$2 : a) {
    return a.cljs$core$ICollection$_conj$arity$2(a, b)
  }
  var c;
  c = cljs.core._conj[goog.typeOf(null == a ? null : a)];
  if(!c && (c = cljs.core._conj._, !c)) {
    throw cljs.core.missing_protocol.call(null, "ICollection.-conj", a);
  }
  return c.call(null, a, b)
};
cljs.core.IIndexed = {};
cljs.core._nth = function() {
  var a = null, b = function(a, b) {
    if(a ? a.cljs$core$IIndexed$_nth$arity$2 : a) {
      return a.cljs$core$IIndexed$_nth$arity$2(a, b)
    }
    var c;
    c = cljs.core._nth[goog.typeOf(null == a ? null : a)];
    if(!c && (c = cljs.core._nth._, !c)) {
      throw cljs.core.missing_protocol.call(null, "IIndexed.-nth", a);
    }
    return c.call(null, a, b)
  }, c = function(a, b, c) {
    if(a ? a.cljs$core$IIndexed$_nth$arity$3 : a) {
      return a.cljs$core$IIndexed$_nth$arity$3(a, b, c)
    }
    var g;
    g = cljs.core._nth[goog.typeOf(null == a ? null : a)];
    if(!g && (g = cljs.core._nth._, !g)) {
      throw cljs.core.missing_protocol.call(null, "IIndexed.-nth", a);
    }
    return g.call(null, a, b, c)
  }, a = function(a, e, f) {
    switch(arguments.length) {
      case 2:
        return b.call(this, a, e);
      case 3:
        return c.call(this, a, e, f)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$core$IFn$_invoke$arity$2 = b;
  a.cljs$core$IFn$_invoke$arity$3 = c;
  return a
}();
cljs.core.ASeq = {};
cljs.core.ISeq = {};
cljs.core._first = function(a) {
  if(a ? a.cljs$core$ISeq$_first$arity$1 : a) {
    return a.cljs$core$ISeq$_first$arity$1(a)
  }
  var b;
  b = cljs.core._first[goog.typeOf(null == a ? null : a)];
  if(!b && (b = cljs.core._first._, !b)) {
    throw cljs.core.missing_protocol.call(null, "ISeq.-first", a);
  }
  return b.call(null, a)
};
cljs.core._rest = function(a) {
  if(a ? a.cljs$core$ISeq$_rest$arity$1 : a) {
    return a.cljs$core$ISeq$_rest$arity$1(a)
  }
  var b;
  b = cljs.core._rest[goog.typeOf(null == a ? null : a)];
  if(!b && (b = cljs.core._rest._, !b)) {
    throw cljs.core.missing_protocol.call(null, "ISeq.-rest", a);
  }
  return b.call(null, a)
};
cljs.core.INext = {};
cljs.core._next = function(a) {
  if(a ? a.cljs$core$INext$_next$arity$1 : a) {
    return a.cljs$core$INext$_next$arity$1(a)
  }
  var b;
  b = cljs.core._next[goog.typeOf(null == a ? null : a)];
  if(!b && (b = cljs.core._next._, !b)) {
    throw cljs.core.missing_protocol.call(null, "INext.-next", a);
  }
  return b.call(null, a)
};
cljs.core.ILookup = {};
cljs.core._lookup = function() {
  var a = null, b = function(a, b) {
    if(a ? a.cljs$core$ILookup$_lookup$arity$2 : a) {
      return a.cljs$core$ILookup$_lookup$arity$2(a, b)
    }
    var c;
    c = cljs.core._lookup[goog.typeOf(null == a ? null : a)];
    if(!c && (c = cljs.core._lookup._, !c)) {
      throw cljs.core.missing_protocol.call(null, "ILookup.-lookup", a);
    }
    return c.call(null, a, b)
  }, c = function(a, b, c) {
    if(a ? a.cljs$core$ILookup$_lookup$arity$3 : a) {
      return a.cljs$core$ILookup$_lookup$arity$3(a, b, c)
    }
    var g;
    g = cljs.core._lookup[goog.typeOf(null == a ? null : a)];
    if(!g && (g = cljs.core._lookup._, !g)) {
      throw cljs.core.missing_protocol.call(null, "ILookup.-lookup", a);
    }
    return g.call(null, a, b, c)
  }, a = function(a, e, f) {
    switch(arguments.length) {
      case 2:
        return b.call(this, a, e);
      case 3:
        return c.call(this, a, e, f)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$core$IFn$_invoke$arity$2 = b;
  a.cljs$core$IFn$_invoke$arity$3 = c;
  return a
}();
cljs.core.IAssociative = {};
cljs.core._contains_key_QMARK_ = function(a, b) {
  if(a ? a.cljs$core$IAssociative$_contains_key_QMARK_$arity$2 : a) {
    return a.cljs$core$IAssociative$_contains_key_QMARK_$arity$2(a, b)
  }
  var c;
  c = cljs.core._contains_key_QMARK_[goog.typeOf(null == a ? null : a)];
  if(!c && (c = cljs.core._contains_key_QMARK_._, !c)) {
    throw cljs.core.missing_protocol.call(null, "IAssociative.-contains-key?", a);
  }
  return c.call(null, a, b)
};
cljs.core._assoc = function(a, b, c) {
  if(a ? a.cljs$core$IAssociative$_assoc$arity$3 : a) {
    return a.cljs$core$IAssociative$_assoc$arity$3(a, b, c)
  }
  var d;
  d = cljs.core._assoc[goog.typeOf(null == a ? null : a)];
  if(!d && (d = cljs.core._assoc._, !d)) {
    throw cljs.core.missing_protocol.call(null, "IAssociative.-assoc", a);
  }
  return d.call(null, a, b, c)
};
cljs.core.IMap = {};
cljs.core._dissoc = function(a, b) {
  if(a ? a.cljs$core$IMap$_dissoc$arity$2 : a) {
    return a.cljs$core$IMap$_dissoc$arity$2(a, b)
  }
  var c;
  c = cljs.core._dissoc[goog.typeOf(null == a ? null : a)];
  if(!c && (c = cljs.core._dissoc._, !c)) {
    throw cljs.core.missing_protocol.call(null, "IMap.-dissoc", a);
  }
  return c.call(null, a, b)
};
cljs.core.IMapEntry = {};
cljs.core._key = function(a) {
  if(a ? a.cljs$core$IMapEntry$_key$arity$1 : a) {
    return a.cljs$core$IMapEntry$_key$arity$1(a)
  }
  var b;
  b = cljs.core._key[goog.typeOf(null == a ? null : a)];
  if(!b && (b = cljs.core._key._, !b)) {
    throw cljs.core.missing_protocol.call(null, "IMapEntry.-key", a);
  }
  return b.call(null, a)
};
cljs.core._val = function(a) {
  if(a ? a.cljs$core$IMapEntry$_val$arity$1 : a) {
    return a.cljs$core$IMapEntry$_val$arity$1(a)
  }
  var b;
  b = cljs.core._val[goog.typeOf(null == a ? null : a)];
  if(!b && (b = cljs.core._val._, !b)) {
    throw cljs.core.missing_protocol.call(null, "IMapEntry.-val", a);
  }
  return b.call(null, a)
};
cljs.core.ISet = {};
cljs.core._disjoin = function(a, b) {
  if(a ? a.cljs$core$ISet$_disjoin$arity$2 : a) {
    return a.cljs$core$ISet$_disjoin$arity$2(a, b)
  }
  var c;
  c = cljs.core._disjoin[goog.typeOf(null == a ? null : a)];
  if(!c && (c = cljs.core._disjoin._, !c)) {
    throw cljs.core.missing_protocol.call(null, "ISet.-disjoin", a);
  }
  return c.call(null, a, b)
};
cljs.core.IStack = {};
cljs.core._peek = function(a) {
  if(a ? a.cljs$core$IStack$_peek$arity$1 : a) {
    return a.cljs$core$IStack$_peek$arity$1(a)
  }
  var b;
  b = cljs.core._peek[goog.typeOf(null == a ? null : a)];
  if(!b && (b = cljs.core._peek._, !b)) {
    throw cljs.core.missing_protocol.call(null, "IStack.-peek", a);
  }
  return b.call(null, a)
};
cljs.core._pop = function(a) {
  if(a ? a.cljs$core$IStack$_pop$arity$1 : a) {
    return a.cljs$core$IStack$_pop$arity$1(a)
  }
  var b;
  b = cljs.core._pop[goog.typeOf(null == a ? null : a)];
  if(!b && (b = cljs.core._pop._, !b)) {
    throw cljs.core.missing_protocol.call(null, "IStack.-pop", a);
  }
  return b.call(null, a)
};
cljs.core.IVector = {};
cljs.core._assoc_n = function(a, b, c) {
  if(a ? a.cljs$core$IVector$_assoc_n$arity$3 : a) {
    return a.cljs$core$IVector$_assoc_n$arity$3(a, b, c)
  }
  var d;
  d = cljs.core._assoc_n[goog.typeOf(null == a ? null : a)];
  if(!d && (d = cljs.core._assoc_n._, !d)) {
    throw cljs.core.missing_protocol.call(null, "IVector.-assoc-n", a);
  }
  return d.call(null, a, b, c)
};
cljs.core.IDeref = {};
cljs.core._deref = function(a) {
  if(a ? a.cljs$core$IDeref$_deref$arity$1 : a) {
    return a.cljs$core$IDeref$_deref$arity$1(a)
  }
  var b;
  b = cljs.core._deref[goog.typeOf(null == a ? null : a)];
  if(!b && (b = cljs.core._deref._, !b)) {
    throw cljs.core.missing_protocol.call(null, "IDeref.-deref", a);
  }
  return b.call(null, a)
};
cljs.core.IDerefWithTimeout = {};
cljs.core._deref_with_timeout = function(a, b, c) {
  if(a ? a.cljs$core$IDerefWithTimeout$_deref_with_timeout$arity$3 : a) {
    return a.cljs$core$IDerefWithTimeout$_deref_with_timeout$arity$3(a, b, c)
  }
  var d;
  d = cljs.core._deref_with_timeout[goog.typeOf(null == a ? null : a)];
  if(!d && (d = cljs.core._deref_with_timeout._, !d)) {
    throw cljs.core.missing_protocol.call(null, "IDerefWithTimeout.-deref-with-timeout", a);
  }
  return d.call(null, a, b, c)
};
cljs.core.IMeta = {};
cljs.core._meta = function(a) {
  if(a ? a.cljs$core$IMeta$_meta$arity$1 : a) {
    return a.cljs$core$IMeta$_meta$arity$1(a)
  }
  var b;
  b = cljs.core._meta[goog.typeOf(null == a ? null : a)];
  if(!b && (b = cljs.core._meta._, !b)) {
    throw cljs.core.missing_protocol.call(null, "IMeta.-meta", a);
  }
  return b.call(null, a)
};
cljs.core.IWithMeta = {};
cljs.core._with_meta = function(a, b) {
  if(a ? a.cljs$core$IWithMeta$_with_meta$arity$2 : a) {
    return a.cljs$core$IWithMeta$_with_meta$arity$2(a, b)
  }
  var c;
  c = cljs.core._with_meta[goog.typeOf(null == a ? null : a)];
  if(!c && (c = cljs.core._with_meta._, !c)) {
    throw cljs.core.missing_protocol.call(null, "IWithMeta.-with-meta", a);
  }
  return c.call(null, a, b)
};
cljs.core.IReduce = {};
cljs.core._reduce = function() {
  var a = null, b = function(a, b) {
    if(a ? a.cljs$core$IReduce$_reduce$arity$2 : a) {
      return a.cljs$core$IReduce$_reduce$arity$2(a, b)
    }
    var c;
    c = cljs.core._reduce[goog.typeOf(null == a ? null : a)];
    if(!c && (c = cljs.core._reduce._, !c)) {
      throw cljs.core.missing_protocol.call(null, "IReduce.-reduce", a);
    }
    return c.call(null, a, b)
  }, c = function(a, b, c) {
    if(a ? a.cljs$core$IReduce$_reduce$arity$3 : a) {
      return a.cljs$core$IReduce$_reduce$arity$3(a, b, c)
    }
    var g;
    g = cljs.core._reduce[goog.typeOf(null == a ? null : a)];
    if(!g && (g = cljs.core._reduce._, !g)) {
      throw cljs.core.missing_protocol.call(null, "IReduce.-reduce", a);
    }
    return g.call(null, a, b, c)
  }, a = function(a, e, f) {
    switch(arguments.length) {
      case 2:
        return b.call(this, a, e);
      case 3:
        return c.call(this, a, e, f)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$core$IFn$_invoke$arity$2 = b;
  a.cljs$core$IFn$_invoke$arity$3 = c;
  return a
}();
cljs.core.IKVReduce = {};
cljs.core._kv_reduce = function(a, b, c) {
  if(a ? a.cljs$core$IKVReduce$_kv_reduce$arity$3 : a) {
    return a.cljs$core$IKVReduce$_kv_reduce$arity$3(a, b, c)
  }
  var d;
  d = cljs.core._kv_reduce[goog.typeOf(null == a ? null : a)];
  if(!d && (d = cljs.core._kv_reduce._, !d)) {
    throw cljs.core.missing_protocol.call(null, "IKVReduce.-kv-reduce", a);
  }
  return d.call(null, a, b, c)
};
cljs.core.IEquiv = {};
cljs.core._equiv = function(a, b) {
  if(a ? a.cljs$core$IEquiv$_equiv$arity$2 : a) {
    return a.cljs$core$IEquiv$_equiv$arity$2(a, b)
  }
  var c;
  c = cljs.core._equiv[goog.typeOf(null == a ? null : a)];
  if(!c && (c = cljs.core._equiv._, !c)) {
    throw cljs.core.missing_protocol.call(null, "IEquiv.-equiv", a);
  }
  return c.call(null, a, b)
};
cljs.core.IHash = {};
cljs.core._hash = function(a) {
  if(a ? a.cljs$core$IHash$_hash$arity$1 : a) {
    return a.cljs$core$IHash$_hash$arity$1(a)
  }
  var b;
  b = cljs.core._hash[goog.typeOf(null == a ? null : a)];
  if(!b && (b = cljs.core._hash._, !b)) {
    throw cljs.core.missing_protocol.call(null, "IHash.-hash", a);
  }
  return b.call(null, a)
};
cljs.core.ISeqable = {};
cljs.core._seq = function(a) {
  if(a ? a.cljs$core$ISeqable$_seq$arity$1 : a) {
    return a.cljs$core$ISeqable$_seq$arity$1(a)
  }
  var b;
  b = cljs.core._seq[goog.typeOf(null == a ? null : a)];
  if(!b && (b = cljs.core._seq._, !b)) {
    throw cljs.core.missing_protocol.call(null, "ISeqable.-seq", a);
  }
  return b.call(null, a)
};
cljs.core.ISequential = {};
cljs.core.IList = {};
cljs.core.IRecord = {};
cljs.core.IReversible = {};
cljs.core._rseq = function(a) {
  if(a ? a.cljs$core$IReversible$_rseq$arity$1 : a) {
    return a.cljs$core$IReversible$_rseq$arity$1(a)
  }
  var b;
  b = cljs.core._rseq[goog.typeOf(null == a ? null : a)];
  if(!b && (b = cljs.core._rseq._, !b)) {
    throw cljs.core.missing_protocol.call(null, "IReversible.-rseq", a);
  }
  return b.call(null, a)
};
cljs.core.ISorted = {};
cljs.core._sorted_seq = function(a, b) {
  if(a ? a.cljs$core$ISorted$_sorted_seq$arity$2 : a) {
    return a.cljs$core$ISorted$_sorted_seq$arity$2(a, b)
  }
  var c;
  c = cljs.core._sorted_seq[goog.typeOf(null == a ? null : a)];
  if(!c && (c = cljs.core._sorted_seq._, !c)) {
    throw cljs.core.missing_protocol.call(null, "ISorted.-sorted-seq", a);
  }
  return c.call(null, a, b)
};
cljs.core._sorted_seq_from = function(a, b, c) {
  if(a ? a.cljs$core$ISorted$_sorted_seq_from$arity$3 : a) {
    return a.cljs$core$ISorted$_sorted_seq_from$arity$3(a, b, c)
  }
  var d;
  d = cljs.core._sorted_seq_from[goog.typeOf(null == a ? null : a)];
  if(!d && (d = cljs.core._sorted_seq_from._, !d)) {
    throw cljs.core.missing_protocol.call(null, "ISorted.-sorted-seq-from", a);
  }
  return d.call(null, a, b, c)
};
cljs.core._entry_key = function(a, b) {
  if(a ? a.cljs$core$ISorted$_entry_key$arity$2 : a) {
    return a.cljs$core$ISorted$_entry_key$arity$2(a, b)
  }
  var c;
  c = cljs.core._entry_key[goog.typeOf(null == a ? null : a)];
  if(!c && (c = cljs.core._entry_key._, !c)) {
    throw cljs.core.missing_protocol.call(null, "ISorted.-entry-key", a);
  }
  return c.call(null, a, b)
};
cljs.core._comparator = function(a) {
  if(a ? a.cljs$core$ISorted$_comparator$arity$1 : a) {
    return a.cljs$core$ISorted$_comparator$arity$1(a)
  }
  var b;
  b = cljs.core._comparator[goog.typeOf(null == a ? null : a)];
  if(!b && (b = cljs.core._comparator._, !b)) {
    throw cljs.core.missing_protocol.call(null, "ISorted.-comparator", a);
  }
  return b.call(null, a)
};
cljs.core.IWriter = {};
cljs.core._write = function(a, b) {
  if(a ? a.cljs$core$IWriter$_write$arity$2 : a) {
    return a.cljs$core$IWriter$_write$arity$2(a, b)
  }
  var c;
  c = cljs.core._write[goog.typeOf(null == a ? null : a)];
  if(!c && (c = cljs.core._write._, !c)) {
    throw cljs.core.missing_protocol.call(null, "IWriter.-write", a);
  }
  return c.call(null, a, b)
};
cljs.core._flush = function(a) {
  if(a ? a.cljs$core$IWriter$_flush$arity$1 : a) {
    return a.cljs$core$IWriter$_flush$arity$1(a)
  }
  var b;
  b = cljs.core._flush[goog.typeOf(null == a ? null : a)];
  if(!b && (b = cljs.core._flush._, !b)) {
    throw cljs.core.missing_protocol.call(null, "IWriter.-flush", a);
  }
  return b.call(null, a)
};
cljs.core.IPrintWithWriter = {};
cljs.core._pr_writer = function(a, b, c) {
  if(a ? a.cljs$core$IPrintWithWriter$_pr_writer$arity$3 : a) {
    return a.cljs$core$IPrintWithWriter$_pr_writer$arity$3(a, b, c)
  }
  var d;
  d = cljs.core._pr_writer[goog.typeOf(null == a ? null : a)];
  if(!d && (d = cljs.core._pr_writer._, !d)) {
    throw cljs.core.missing_protocol.call(null, "IPrintWithWriter.-pr-writer", a);
  }
  return d.call(null, a, b, c)
};
cljs.core.IPending = {};
cljs.core._realized_QMARK_ = function(a) {
  if(a ? a.cljs$core$IPending$_realized_QMARK_$arity$1 : a) {
    return a.cljs$core$IPending$_realized_QMARK_$arity$1(a)
  }
  var b;
  b = cljs.core._realized_QMARK_[goog.typeOf(null == a ? null : a)];
  if(!b && (b = cljs.core._realized_QMARK_._, !b)) {
    throw cljs.core.missing_protocol.call(null, "IPending.-realized?", a);
  }
  return b.call(null, a)
};
cljs.core.IWatchable = {};
cljs.core._notify_watches = function(a, b, c) {
  if(a ? a.cljs$core$IWatchable$_notify_watches$arity$3 : a) {
    return a.cljs$core$IWatchable$_notify_watches$arity$3(a, b, c)
  }
  var d;
  d = cljs.core._notify_watches[goog.typeOf(null == a ? null : a)];
  if(!d && (d = cljs.core._notify_watches._, !d)) {
    throw cljs.core.missing_protocol.call(null, "IWatchable.-notify-watches", a);
  }
  return d.call(null, a, b, c)
};
cljs.core._add_watch = function(a, b, c) {
  if(a ? a.cljs$core$IWatchable$_add_watch$arity$3 : a) {
    return a.cljs$core$IWatchable$_add_watch$arity$3(a, b, c)
  }
  var d;
  d = cljs.core._add_watch[goog.typeOf(null == a ? null : a)];
  if(!d && (d = cljs.core._add_watch._, !d)) {
    throw cljs.core.missing_protocol.call(null, "IWatchable.-add-watch", a);
  }
  return d.call(null, a, b, c)
};
cljs.core._remove_watch = function(a, b) {
  if(a ? a.cljs$core$IWatchable$_remove_watch$arity$2 : a) {
    return a.cljs$core$IWatchable$_remove_watch$arity$2(a, b)
  }
  var c;
  c = cljs.core._remove_watch[goog.typeOf(null == a ? null : a)];
  if(!c && (c = cljs.core._remove_watch._, !c)) {
    throw cljs.core.missing_protocol.call(null, "IWatchable.-remove-watch", a);
  }
  return c.call(null, a, b)
};
cljs.core.IEditableCollection = {};
cljs.core._as_transient = function(a) {
  if(a ? a.cljs$core$IEditableCollection$_as_transient$arity$1 : a) {
    return a.cljs$core$IEditableCollection$_as_transient$arity$1(a)
  }
  var b;
  b = cljs.core._as_transient[goog.typeOf(null == a ? null : a)];
  if(!b && (b = cljs.core._as_transient._, !b)) {
    throw cljs.core.missing_protocol.call(null, "IEditableCollection.-as-transient", a);
  }
  return b.call(null, a)
};
cljs.core.ITransientCollection = {};
cljs.core._conj_BANG_ = function(a, b) {
  if(a ? a.cljs$core$ITransientCollection$_conj_BANG_$arity$2 : a) {
    return a.cljs$core$ITransientCollection$_conj_BANG_$arity$2(a, b)
  }
  var c;
  c = cljs.core._conj_BANG_[goog.typeOf(null == a ? null : a)];
  if(!c && (c = cljs.core._conj_BANG_._, !c)) {
    throw cljs.core.missing_protocol.call(null, "ITransientCollection.-conj!", a);
  }
  return c.call(null, a, b)
};
cljs.core._persistent_BANG_ = function(a) {
  if(a ? a.cljs$core$ITransientCollection$_persistent_BANG_$arity$1 : a) {
    return a.cljs$core$ITransientCollection$_persistent_BANG_$arity$1(a)
  }
  var b;
  b = cljs.core._persistent_BANG_[goog.typeOf(null == a ? null : a)];
  if(!b && (b = cljs.core._persistent_BANG_._, !b)) {
    throw cljs.core.missing_protocol.call(null, "ITransientCollection.-persistent!", a);
  }
  return b.call(null, a)
};
cljs.core.ITransientAssociative = {};
cljs.core._assoc_BANG_ = function(a, b, c) {
  if(a ? a.cljs$core$ITransientAssociative$_assoc_BANG_$arity$3 : a) {
    return a.cljs$core$ITransientAssociative$_assoc_BANG_$arity$3(a, b, c)
  }
  var d;
  d = cljs.core._assoc_BANG_[goog.typeOf(null == a ? null : a)];
  if(!d && (d = cljs.core._assoc_BANG_._, !d)) {
    throw cljs.core.missing_protocol.call(null, "ITransientAssociative.-assoc!", a);
  }
  return d.call(null, a, b, c)
};
cljs.core.ITransientMap = {};
cljs.core._dissoc_BANG_ = function(a, b) {
  if(a ? a.cljs$core$ITransientMap$_dissoc_BANG_$arity$2 : a) {
    return a.cljs$core$ITransientMap$_dissoc_BANG_$arity$2(a, b)
  }
  var c;
  c = cljs.core._dissoc_BANG_[goog.typeOf(null == a ? null : a)];
  if(!c && (c = cljs.core._dissoc_BANG_._, !c)) {
    throw cljs.core.missing_protocol.call(null, "ITransientMap.-dissoc!", a);
  }
  return c.call(null, a, b)
};
cljs.core.ITransientVector = {};
cljs.core._assoc_n_BANG_ = function(a, b, c) {
  if(a ? a.cljs$core$ITransientVector$_assoc_n_BANG_$arity$3 : a) {
    return a.cljs$core$ITransientVector$_assoc_n_BANG_$arity$3(a, b, c)
  }
  var d;
  d = cljs.core._assoc_n_BANG_[goog.typeOf(null == a ? null : a)];
  if(!d && (d = cljs.core._assoc_n_BANG_._, !d)) {
    throw cljs.core.missing_protocol.call(null, "ITransientVector.-assoc-n!", a);
  }
  return d.call(null, a, b, c)
};
cljs.core._pop_BANG_ = function(a) {
  if(a ? a.cljs$core$ITransientVector$_pop_BANG_$arity$1 : a) {
    return a.cljs$core$ITransientVector$_pop_BANG_$arity$1(a)
  }
  var b;
  b = cljs.core._pop_BANG_[goog.typeOf(null == a ? null : a)];
  if(!b && (b = cljs.core._pop_BANG_._, !b)) {
    throw cljs.core.missing_protocol.call(null, "ITransientVector.-pop!", a);
  }
  return b.call(null, a)
};
cljs.core.ITransientSet = {};
cljs.core._disjoin_BANG_ = function(a, b) {
  if(a ? a.cljs$core$ITransientSet$_disjoin_BANG_$arity$2 : a) {
    return a.cljs$core$ITransientSet$_disjoin_BANG_$arity$2(a, b)
  }
  var c;
  c = cljs.core._disjoin_BANG_[goog.typeOf(null == a ? null : a)];
  if(!c && (c = cljs.core._disjoin_BANG_._, !c)) {
    throw cljs.core.missing_protocol.call(null, "ITransientSet.-disjoin!", a);
  }
  return c.call(null, a, b)
};
cljs.core.IComparable = {};
cljs.core._compare = function(a, b) {
  if(a ? a.cljs$core$IComparable$_compare$arity$2 : a) {
    return a.cljs$core$IComparable$_compare$arity$2(a, b)
  }
  var c;
  c = cljs.core._compare[goog.typeOf(null == a ? null : a)];
  if(!c && (c = cljs.core._compare._, !c)) {
    throw cljs.core.missing_protocol.call(null, "IComparable.-compare", a);
  }
  return c.call(null, a, b)
};
cljs.core.IChunk = {};
cljs.core._drop_first = function(a) {
  if(a ? a.cljs$core$IChunk$_drop_first$arity$1 : a) {
    return a.cljs$core$IChunk$_drop_first$arity$1(a)
  }
  var b;
  b = cljs.core._drop_first[goog.typeOf(null == a ? null : a)];
  if(!b && (b = cljs.core._drop_first._, !b)) {
    throw cljs.core.missing_protocol.call(null, "IChunk.-drop-first", a);
  }
  return b.call(null, a)
};
cljs.core.IChunkedSeq = {};
cljs.core._chunked_first = function(a) {
  if(a ? a.cljs$core$IChunkedSeq$_chunked_first$arity$1 : a) {
    return a.cljs$core$IChunkedSeq$_chunked_first$arity$1(a)
  }
  var b;
  b = cljs.core._chunked_first[goog.typeOf(null == a ? null : a)];
  if(!b && (b = cljs.core._chunked_first._, !b)) {
    throw cljs.core.missing_protocol.call(null, "IChunkedSeq.-chunked-first", a);
  }
  return b.call(null, a)
};
cljs.core._chunked_rest = function(a) {
  if(a ? a.cljs$core$IChunkedSeq$_chunked_rest$arity$1 : a) {
    return a.cljs$core$IChunkedSeq$_chunked_rest$arity$1(a)
  }
  var b;
  b = cljs.core._chunked_rest[goog.typeOf(null == a ? null : a)];
  if(!b && (b = cljs.core._chunked_rest._, !b)) {
    throw cljs.core.missing_protocol.call(null, "IChunkedSeq.-chunked-rest", a);
  }
  return b.call(null, a)
};
cljs.core.IChunkedNext = {};
cljs.core._chunked_next = function(a) {
  if(a ? a.cljs$core$IChunkedNext$_chunked_next$arity$1 : a) {
    return a.cljs$core$IChunkedNext$_chunked_next$arity$1(a)
  }
  var b;
  b = cljs.core._chunked_next[goog.typeOf(null == a ? null : a)];
  if(!b && (b = cljs.core._chunked_next._, !b)) {
    throw cljs.core.missing_protocol.call(null, "IChunkedNext.-chunked-next", a);
  }
  return b.call(null, a)
};
cljs.core.INamed = {};
cljs.core._name = function(a) {
  if(a ? a.cljs$core$INamed$_name$arity$1 : a) {
    return a.cljs$core$INamed$_name$arity$1(a)
  }
  var b;
  b = cljs.core._name[goog.typeOf(null == a ? null : a)];
  if(!b && (b = cljs.core._name._, !b)) {
    throw cljs.core.missing_protocol.call(null, "INamed.-name", a);
  }
  return b.call(null, a)
};
cljs.core._namespace = function(a) {
  if(a ? a.cljs$core$INamed$_namespace$arity$1 : a) {
    return a.cljs$core$INamed$_namespace$arity$1(a)
  }
  var b;
  b = cljs.core._namespace[goog.typeOf(null == a ? null : a)];
  if(!b && (b = cljs.core._namespace._, !b)) {
    throw cljs.core.missing_protocol.call(null, "INamed.-namespace", a);
  }
  return b.call(null, a)
};
cljs.core.StringBufferWriter = function(a) {
  this.sb = a;
  this.cljs$lang$protocol_mask$partition1$ = 0;
  this.cljs$lang$protocol_mask$partition0$ = 1073741824
};
cljs.core.StringBufferWriter.cljs$lang$type = !0;
cljs.core.StringBufferWriter.cljs$lang$ctorStr = "cljs.core/StringBufferWriter";
cljs.core.StringBufferWriter.cljs$lang$ctorPrWriter = function(a, b, c) {
  return cljs.core._write.call(null, b, "cljs.core/StringBufferWriter")
};
cljs.core.StringBufferWriter.prototype.cljs$core$IWriter$_write$arity$2 = function(a, b) {
  return this.sb.append(b)
};
cljs.core.StringBufferWriter.prototype.cljs$core$IWriter$_flush$arity$1 = function(a) {
  return null
};
cljs.core.__GT_StringBufferWriter = function(a) {
  return new cljs.core.StringBufferWriter(a)
};
cljs.core.pr_str_STAR_ = function(a) {
  var b = new goog.string.StringBuffer, c = new cljs.core.StringBufferWriter(b);
  cljs.core._pr_writer.call(null, a, c, cljs.core.pr_opts.call(null));
  cljs.core._flush.call(null, c);
  return"" + cljs.core.str(b)
};
cljs.core.instance_QMARK_ = function(a, b) {
  return b instanceof a
};
cljs.core.symbol_QMARK_ = function(a) {
  return a instanceof cljs.core.Symbol
};
cljs.core.hash_symbol = function(a) {
  return cljs.core.hash_combine.call(null, cljs.core.hash.call(null, a.ns), cljs.core.hash.call(null, a.name))
};
cljs.core.Symbol = function(a, b, c, d, e) {
  this.ns = a;
  this.name = b;
  this.str = c;
  this._hash = d;
  this._meta = e;
  this.cljs$lang$protocol_mask$partition0$ = 2154168321;
  this.cljs$lang$protocol_mask$partition1$ = 4096
};
cljs.core.Symbol.cljs$lang$type = !0;
cljs.core.Symbol.cljs$lang$ctorStr = "cljs.core/Symbol";
cljs.core.Symbol.cljs$lang$ctorPrWriter = function(a, b, c) {
  return cljs.core._write.call(null, b, "cljs.core/Symbol")
};
cljs.core.Symbol.prototype.cljs$core$IPrintWithWriter$_pr_writer$arity$3 = function(a, b, c) {
  return cljs.core._write.call(null, b, this.str)
};
cljs.core.Symbol.prototype.cljs$core$INamed$_name$arity$1 = function(a) {
  return this.name
};
cljs.core.Symbol.prototype.cljs$core$INamed$_namespace$arity$1 = function(a) {
  return this.ns
};
cljs.core.Symbol.prototype.cljs$core$IHash$_hash$arity$1 = function(a) {
  a = this._hash;
  return null != a ? a : this._hash = a = cljs.core.hash_symbol.call(null, this)
};
cljs.core.Symbol.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = function(a, b) {
  return new cljs.core.Symbol(this.ns, this.name, this.str, this._hash, b)
};
cljs.core.Symbol.prototype.cljs$core$IMeta$_meta$arity$1 = function(a) {
  return this._meta
};
cljs.core.Symbol.prototype.call = function() {
  var a = null;
  return a = function(a, c, d) {
    switch(arguments.length) {
      case 2:
        return cljs.core._lookup.call(null, c, this, null);
      case 3:
        return cljs.core._lookup.call(null, c, this, d)
    }
    throw Error("Invalid arity: " + arguments.length);
  }
}();
cljs.core.Symbol.prototype.apply = function(a, b) {
  return this.call.apply(this, [this].concat(b.slice()))
};
cljs.core.Symbol.prototype.cljs$core$IFn$_invoke$arity$1 = function(a) {
  return cljs.core._lookup.call(null, a, this, null)
};
cljs.core.Symbol.prototype.cljs$core$IFn$_invoke$arity$2 = function(a, b) {
  return cljs.core._lookup.call(null, a, this, b)
};
cljs.core.Symbol.prototype.cljs$core$IEquiv$_equiv$arity$2 = function(a, b) {
  return b instanceof cljs.core.Symbol ? this.str === b.str : !1
};
cljs.core.Symbol.prototype.toString = function() {
  return this.str
};
cljs.core.__GT_Symbol = function(a, b, c, d, e) {
  return new cljs.core.Symbol(a, b, c, d, e)
};
cljs.core.symbol = function() {
  var a = null, b = function(b) {
    return b instanceof cljs.core.Symbol ? b : a.call(null, null, b)
  }, c = function(a, b) {
    var c = null != a ? [cljs.core.str(a), cljs.core.str("/"), cljs.core.str(b)].join("") : b;
    return new cljs.core.Symbol(a, b, c, null, null)
  }, a = function(a, e) {
    switch(arguments.length) {
      case 1:
        return b.call(this, a);
      case 2:
        return c.call(this, a, e)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$core$IFn$_invoke$arity$1 = b;
  a.cljs$core$IFn$_invoke$arity$2 = c;
  return a
}();
cljs.core.seq = function(a) {
  if(null == a) {
    return null
  }
  if(a && (a.cljs$lang$protocol_mask$partition0$ & 8388608 || a.cljs$core$ISeqable$)) {
    return cljs.core._seq.call(null, a)
  }
  if(a instanceof Array || "string" === typeof a) {
    return 0 === a.length ? null : new cljs.core.IndexedSeq(a, 0)
  }
  if(cljs.core.native_satisfies_QMARK_.call(null, cljs.core.ISeqable, a)) {
    return cljs.core._seq.call(null, a)
  }
  if(new cljs.core.Keyword(null, "else", "else", 1017020587)) {
    throw Error([cljs.core.str(a), cljs.core.str("is not ISeqable")].join(""));
  }
  return null
};
cljs.core.first = function(a) {
  if(null == a) {
    return null
  }
  if(a && (a.cljs$lang$protocol_mask$partition0$ & 64 || a.cljs$core$ISeq$)) {
    return cljs.core._first.call(null, a)
  }
  a = cljs.core.seq.call(null, a);
  return null == a ? null : cljs.core._first.call(null, a)
};
cljs.core.rest = function(a) {
  return null != a ? a && (a.cljs$lang$protocol_mask$partition0$ & 64 || a.cljs$core$ISeq$) ? cljs.core._rest.call(null, a) : (a = cljs.core.seq.call(null, a)) ? cljs.core._rest.call(null, a) : cljs.core.List.EMPTY : cljs.core.List.EMPTY
};
cljs.core.next = function(a) {
  return null == a ? null : a && (a.cljs$lang$protocol_mask$partition0$ & 128 || a.cljs$core$INext$) ? cljs.core._next.call(null, a) : cljs.core.seq.call(null, cljs.core.rest.call(null, a))
};
cljs.core._EQ_ = function() {
  var a = null, b = function(a, b) {
    return a === b || cljs.core._equiv.call(null, a, b)
  }, c = function() {
    var b = function(b, c, d) {
      for(;;) {
        if(a.call(null, b, c)) {
          if(cljs.core.next.call(null, d)) {
            b = c, c = cljs.core.first.call(null, d), d = cljs.core.next.call(null, d)
          }else {
            return a.call(null, c, cljs.core.first.call(null, d))
          }
        }else {
          return!1
        }
      }
    }, c = function(a, c, e) {
      var l = null;
      2 < arguments.length && (l = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2), 0));
      return b.call(this, a, c, l)
    };
    c.cljs$lang$maxFixedArity = 2;
    c.cljs$lang$applyTo = function(a) {
      var c = cljs.core.first(a);
      a = cljs.core.next(a);
      var e = cljs.core.first(a);
      a = cljs.core.rest(a);
      return b(c, e, a)
    };
    c.cljs$core$IFn$_invoke$arity$variadic = b;
    return c
  }(), a = function(a, e, f) {
    switch(arguments.length) {
      case 1:
        return!0;
      case 2:
        return b.call(this, a, e);
      default:
        return c.cljs$core$IFn$_invoke$arity$variadic(a, e, cljs.core.array_seq(arguments, 2))
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$lang$maxFixedArity = 2;
  a.cljs$lang$applyTo = c.cljs$lang$applyTo;
  a.cljs$core$IFn$_invoke$arity$1 = function(a) {
    return!0
  };
  a.cljs$core$IFn$_invoke$arity$2 = b;
  a.cljs$core$IFn$_invoke$arity$variadic = c.cljs$core$IFn$_invoke$arity$variadic;
  return a
}();
cljs.core.IHash["null"] = !0;
cljs.core._hash["null"] = function(a) {
  return 0
};
cljs.core.INext["null"] = !0;
cljs.core._next["null"] = function(a) {
  return null
};
cljs.core.IKVReduce["null"] = !0;
cljs.core._kv_reduce["null"] = function(a, b, c) {
  return c
};
cljs.core.ISet["null"] = !0;
cljs.core._disjoin["null"] = function(a, b) {
  return null
};
cljs.core.ICounted["null"] = !0;
cljs.core._count["null"] = function(a) {
  return 0
};
cljs.core.IStack["null"] = !0;
cljs.core._peek["null"] = function(a) {
  return null
};
cljs.core._pop["null"] = function(a) {
  return null
};
cljs.core.IEquiv["null"] = !0;
cljs.core._equiv["null"] = function(a, b) {
  return null == b
};
cljs.core.IWithMeta["null"] = !0;
cljs.core._with_meta["null"] = function(a, b) {
  return null
};
cljs.core.IMeta["null"] = !0;
cljs.core._meta["null"] = function(a) {
  return null
};
cljs.core.IEmptyableCollection["null"] = !0;
cljs.core._empty["null"] = function(a) {
  return null
};
cljs.core.IMap["null"] = !0;
cljs.core._dissoc["null"] = function(a, b) {
  return null
};
Date.prototype.cljs$core$IEquiv$ = !0;
Date.prototype.cljs$core$IEquiv$_equiv$arity$2 = function(a, b) {
  return b instanceof Date && this.toString() === b.toString()
};
cljs.core.IEquiv.number = !0;
cljs.core._equiv.number = function(a, b) {
  return a === b
};
cljs.core.IMeta["function"] = !0;
cljs.core._meta["function"] = function(a) {
  return null
};
cljs.core.Fn["function"] = !0;
cljs.core.IHash._ = !0;
cljs.core._hash._ = function(a) {
  return goog.getUid(a)
};
cljs.core.inc = function(a) {
  return a + 1
};
cljs.core.Reduced = function(a) {
  this.val = a;
  this.cljs$lang$protocol_mask$partition1$ = 0;
  this.cljs$lang$protocol_mask$partition0$ = 32768
};
cljs.core.Reduced.cljs$lang$type = !0;
cljs.core.Reduced.cljs$lang$ctorStr = "cljs.core/Reduced";
cljs.core.Reduced.cljs$lang$ctorPrWriter = function(a, b, c) {
  return cljs.core._write.call(null, b, "cljs.core/Reduced")
};
cljs.core.Reduced.prototype.cljs$core$IDeref$_deref$arity$1 = function(a) {
  return this.val
};
cljs.core.__GT_Reduced = function(a) {
  return new cljs.core.Reduced(a)
};
cljs.core.reduced = function(a) {
  return new cljs.core.Reduced(a)
};
cljs.core.reduced_QMARK_ = function(a) {
  return a instanceof cljs.core.Reduced
};
cljs.core.ci_reduce = function() {
  var a = null, b = function(a, b) {
    var c = cljs.core._count.call(null, a);
    if(0 === c) {
      return b.call(null)
    }
    for(var d = cljs.core._nth.call(null, a, 0), l = 1;;) {
      if(l < c) {
        d = b.call(null, d, cljs.core._nth.call(null, a, l));
        if(cljs.core.reduced_QMARK_.call(null, d)) {
          return cljs.core.deref.call(null, d)
        }
        l += 1
      }else {
        return d
      }
    }
  }, c = function(a, b, c) {
    for(var d = cljs.core._count.call(null, a), l = 0;;) {
      if(l < d) {
        c = b.call(null, c, cljs.core._nth.call(null, a, l));
        if(cljs.core.reduced_QMARK_.call(null, c)) {
          return cljs.core.deref.call(null, c)
        }
        l += 1
      }else {
        return c
      }
    }
  }, d = function(a, b, c, d) {
    for(var l = cljs.core._count.call(null, a);;) {
      if(d < l) {
        c = b.call(null, c, cljs.core._nth.call(null, a, d));
        if(cljs.core.reduced_QMARK_.call(null, c)) {
          return cljs.core.deref.call(null, c)
        }
        d += 1
      }else {
        return c
      }
    }
  }, a = function(a, f, g, h) {
    switch(arguments.length) {
      case 2:
        return b.call(this, a, f);
      case 3:
        return c.call(this, a, f, g);
      case 4:
        return d.call(this, a, f, g, h)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$core$IFn$_invoke$arity$2 = b;
  a.cljs$core$IFn$_invoke$arity$3 = c;
  a.cljs$core$IFn$_invoke$arity$4 = d;
  return a
}();
cljs.core.array_reduce = function() {
  var a = null, b = function(a, b) {
    var c = a.length;
    if(0 === a.length) {
      return b.call(null)
    }
    for(var d = a[0], l = 1;;) {
      if(l < c) {
        d = b.call(null, d, a[l]);
        if(cljs.core.reduced_QMARK_.call(null, d)) {
          return cljs.core.deref.call(null, d)
        }
        l += 1
      }else {
        return d
      }
    }
  }, c = function(a, b, c) {
    for(var d = a.length, l = 0;;) {
      if(l < d) {
        c = b.call(null, c, a[l]);
        if(cljs.core.reduced_QMARK_.call(null, c)) {
          return cljs.core.deref.call(null, c)
        }
        l += 1
      }else {
        return c
      }
    }
  }, d = function(a, b, c, d) {
    for(var l = a.length;;) {
      if(d < l) {
        c = b.call(null, c, a[d]);
        if(cljs.core.reduced_QMARK_.call(null, c)) {
          return cljs.core.deref.call(null, c)
        }
        d += 1
      }else {
        return c
      }
    }
  }, a = function(a, f, g, h) {
    switch(arguments.length) {
      case 2:
        return b.call(this, a, f);
      case 3:
        return c.call(this, a, f, g);
      case 4:
        return d.call(this, a, f, g, h)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$core$IFn$_invoke$arity$2 = b;
  a.cljs$core$IFn$_invoke$arity$3 = c;
  a.cljs$core$IFn$_invoke$arity$4 = d;
  return a
}();
cljs.core.counted_QMARK_ = function(a) {
  return a ? a.cljs$lang$protocol_mask$partition0$ & 2 || a.cljs$core$ICounted$ ? !0 : a.cljs$lang$protocol_mask$partition0$ ? !1 : cljs.core.native_satisfies_QMARK_.call(null, cljs.core.ICounted, a) : cljs.core.native_satisfies_QMARK_.call(null, cljs.core.ICounted, a)
};
cljs.core.indexed_QMARK_ = function(a) {
  return a ? a.cljs$lang$protocol_mask$partition0$ & 16 || a.cljs$core$IIndexed$ ? !0 : a.cljs$lang$protocol_mask$partition0$ ? !1 : cljs.core.native_satisfies_QMARK_.call(null, cljs.core.IIndexed, a) : cljs.core.native_satisfies_QMARK_.call(null, cljs.core.IIndexed, a)
};
cljs.core.IndexedSeq = function(a, b) {
  this.arr = a;
  this.i = b;
  this.cljs$lang$protocol_mask$partition1$ = 0;
  this.cljs$lang$protocol_mask$partition0$ = 166199550
};
cljs.core.IndexedSeq.cljs$lang$type = !0;
cljs.core.IndexedSeq.cljs$lang$ctorStr = "cljs.core/IndexedSeq";
cljs.core.IndexedSeq.cljs$lang$ctorPrWriter = function(a, b, c) {
  return cljs.core._write.call(null, b, "cljs.core/IndexedSeq")
};
cljs.core.IndexedSeq.prototype.cljs$core$IHash$_hash$arity$1 = function(a) {
  return cljs.core.hash_coll.call(null, this)
};
cljs.core.IndexedSeq.prototype.cljs$core$INext$_next$arity$1 = function(a) {
  return this.i + 1 < this.arr.length ? new cljs.core.IndexedSeq(this.arr, this.i + 1) : null
};
cljs.core.IndexedSeq.prototype.cljs$core$ICollection$_conj$arity$2 = function(a, b) {
  return cljs.core.cons.call(null, b, this)
};
cljs.core.IndexedSeq.prototype.cljs$core$IReversible$_rseq$arity$1 = function(a) {
  a = cljs.core._count.call(null, this);
  return 0 < a ? new cljs.core.RSeq(this, a - 1, null) : null
};
cljs.core.IndexedSeq.prototype.toString = function() {
  return cljs.core.pr_str_STAR_.call(null, this)
};
cljs.core.IndexedSeq.prototype.cljs$core$IReduce$_reduce$arity$2 = function(a, b) {
  return cljs.core.array_reduce.call(null, this.arr, b, this.arr[this.i], this.i + 1)
};
cljs.core.IndexedSeq.prototype.cljs$core$IReduce$_reduce$arity$3 = function(a, b, c) {
  return cljs.core.array_reduce.call(null, this.arr, b, c, this.i)
};
cljs.core.IndexedSeq.prototype.cljs$core$ISeqable$_seq$arity$1 = function(a) {
  return this
};
cljs.core.IndexedSeq.prototype.cljs$core$ICounted$_count$arity$1 = function(a) {
  return this.arr.length - this.i
};
cljs.core.IndexedSeq.prototype.cljs$core$ISeq$_first$arity$1 = function(a) {
  return this.arr[this.i]
};
cljs.core.IndexedSeq.prototype.cljs$core$ISeq$_rest$arity$1 = function(a) {
  return this.i + 1 < this.arr.length ? new cljs.core.IndexedSeq(this.arr, this.i + 1) : cljs.core.List.EMPTY
};
cljs.core.IndexedSeq.prototype.cljs$core$IEquiv$_equiv$arity$2 = function(a, b) {
  return cljs.core.equiv_sequential.call(null, this, b)
};
cljs.core.IndexedSeq.prototype.cljs$core$IIndexed$_nth$arity$2 = function(a, b) {
  var c = b + this.i;
  return c < this.arr.length ? this.arr[c] : null
};
cljs.core.IndexedSeq.prototype.cljs$core$IIndexed$_nth$arity$3 = function(a, b, c) {
  a = b + this.i;
  return a < this.arr.length ? this.arr[a] : c
};
cljs.core.IndexedSeq.prototype.cljs$core$IEmptyableCollection$_empty$arity$1 = function(a) {
  return cljs.core.List.EMPTY
};
cljs.core.__GT_IndexedSeq = function(a, b) {
  return new cljs.core.IndexedSeq(a, b)
};
cljs.core.prim_seq = function() {
  var a = null, b = function(b) {
    return a.call(null, b, 0)
  }, c = function(a, b) {
    return b < a.length ? new cljs.core.IndexedSeq(a, b) : null
  }, a = function(a, e) {
    switch(arguments.length) {
      case 1:
        return b.call(this, a);
      case 2:
        return c.call(this, a, e)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$core$IFn$_invoke$arity$1 = b;
  a.cljs$core$IFn$_invoke$arity$2 = c;
  return a
}();
cljs.core.array_seq = function() {
  var a = null, b = function(a) {
    return cljs.core.prim_seq.call(null, a, 0)
  }, c = function(a, b) {
    return cljs.core.prim_seq.call(null, a, b)
  }, a = function(a, e) {
    switch(arguments.length) {
      case 1:
        return b.call(this, a);
      case 2:
        return c.call(this, a, e)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$core$IFn$_invoke$arity$1 = b;
  a.cljs$core$IFn$_invoke$arity$2 = c;
  return a
}();
cljs.core.RSeq = function(a, b, c) {
  this.ci = a;
  this.i = b;
  this.meta = c;
  this.cljs$lang$protocol_mask$partition1$ = 0;
  this.cljs$lang$protocol_mask$partition0$ = 32374862
};
cljs.core.RSeq.cljs$lang$type = !0;
cljs.core.RSeq.cljs$lang$ctorStr = "cljs.core/RSeq";
cljs.core.RSeq.cljs$lang$ctorPrWriter = function(a, b, c) {
  return cljs.core._write.call(null, b, "cljs.core/RSeq")
};
cljs.core.RSeq.prototype.cljs$core$IHash$_hash$arity$1 = function(a) {
  return cljs.core.hash_coll.call(null, this)
};
cljs.core.RSeq.prototype.cljs$core$ICollection$_conj$arity$2 = function(a, b) {
  return cljs.core.cons.call(null, b, this)
};
cljs.core.RSeq.prototype.toString = function() {
  return cljs.core.pr_str_STAR_.call(null, this)
};
cljs.core.RSeq.prototype.cljs$core$IReduce$_reduce$arity$2 = function(a, b) {
  return cljs.core.seq_reduce.call(null, b, this)
};
cljs.core.RSeq.prototype.cljs$core$IReduce$_reduce$arity$3 = function(a, b, c) {
  return cljs.core.seq_reduce.call(null, b, c, this)
};
cljs.core.RSeq.prototype.cljs$core$ISeqable$_seq$arity$1 = function(a) {
  return this
};
cljs.core.RSeq.prototype.cljs$core$ICounted$_count$arity$1 = function(a) {
  return this.i + 1
};
cljs.core.RSeq.prototype.cljs$core$ISeq$_first$arity$1 = function(a) {
  return cljs.core._nth.call(null, this.ci, this.i)
};
cljs.core.RSeq.prototype.cljs$core$ISeq$_rest$arity$1 = function(a) {
  return 0 < this.i ? new cljs.core.RSeq(this.ci, this.i - 1, null) : null
};
cljs.core.RSeq.prototype.cljs$core$IEquiv$_equiv$arity$2 = function(a, b) {
  return cljs.core.equiv_sequential.call(null, this, b)
};
cljs.core.RSeq.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = function(a, b) {
  return new cljs.core.RSeq(this.ci, this.i, b)
};
cljs.core.RSeq.prototype.cljs$core$IMeta$_meta$arity$1 = function(a) {
  return this.meta
};
cljs.core.RSeq.prototype.cljs$core$IEmptyableCollection$_empty$arity$1 = function(a) {
  return cljs.core.with_meta.call(null, cljs.core.List.EMPTY, this.meta)
};
cljs.core.__GT_RSeq = function(a, b, c) {
  return new cljs.core.RSeq(a, b, c)
};
cljs.core.second = function(a) {
  return cljs.core.first.call(null, cljs.core.next.call(null, a))
};
cljs.core.ffirst = function(a) {
  return cljs.core.first.call(null, cljs.core.first.call(null, a))
};
cljs.core.nfirst = function(a) {
  return cljs.core.next.call(null, cljs.core.first.call(null, a))
};
cljs.core.fnext = function(a) {
  return cljs.core.first.call(null, cljs.core.next.call(null, a))
};
cljs.core.nnext = function(a) {
  return cljs.core.next.call(null, cljs.core.next.call(null, a))
};
cljs.core.last = function(a) {
  for(;;) {
    var b = cljs.core.next.call(null, a);
    if(null != b) {
      a = b
    }else {
      return cljs.core.first.call(null, a)
    }
  }
};
cljs.core.IEquiv._ = !0;
cljs.core._equiv._ = function(a, b) {
  return a === b
};
cljs.core.conj = function() {
  var a = null, b = function(a, b) {
    return null != a ? cljs.core._conj.call(null, a, b) : cljs.core._conj.call(null, cljs.core.List.EMPTY, b)
  }, c = function() {
    var b = function(b, c, d) {
      for(;;) {
        if(cljs.core.truth_(d)) {
          b = a.call(null, b, c), c = cljs.core.first.call(null, d), d = cljs.core.next.call(null, d)
        }else {
          return a.call(null, b, c)
        }
      }
    }, c = function(a, c, e) {
      var l = null;
      2 < arguments.length && (l = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2), 0));
      return b.call(this, a, c, l)
    };
    c.cljs$lang$maxFixedArity = 2;
    c.cljs$lang$applyTo = function(a) {
      var c = cljs.core.first(a);
      a = cljs.core.next(a);
      var e = cljs.core.first(a);
      a = cljs.core.rest(a);
      return b(c, e, a)
    };
    c.cljs$core$IFn$_invoke$arity$variadic = b;
    return c
  }(), a = function(a, e, f) {
    switch(arguments.length) {
      case 2:
        return b.call(this, a, e);
      default:
        return c.cljs$core$IFn$_invoke$arity$variadic(a, e, cljs.core.array_seq(arguments, 2))
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$lang$maxFixedArity = 2;
  a.cljs$lang$applyTo = c.cljs$lang$applyTo;
  a.cljs$core$IFn$_invoke$arity$2 = b;
  a.cljs$core$IFn$_invoke$arity$variadic = c.cljs$core$IFn$_invoke$arity$variadic;
  return a
}();
cljs.core.empty = function(a) {
  return cljs.core._empty.call(null, a)
};
cljs.core.accumulating_seq_count = function(a) {
  a = cljs.core.seq.call(null, a);
  for(var b = 0;;) {
    if(cljs.core.counted_QMARK_.call(null, a)) {
      return b + cljs.core._count.call(null, a)
    }
    a = cljs.core.next.call(null, a);
    b += 1
  }
};
cljs.core.count = function(a) {
  return null != a ? a && (a.cljs$lang$protocol_mask$partition0$ & 2 || a.cljs$core$ICounted$) ? cljs.core._count.call(null, a) : a instanceof Array ? a.length : "string" === typeof a ? a.length : cljs.core.native_satisfies_QMARK_.call(null, cljs.core.ICounted, a) ? cljs.core._count.call(null, a) : new cljs.core.Keyword(null, "else", "else", 1017020587) ? cljs.core.accumulating_seq_count.call(null, a) : null : 0
};
cljs.core.linear_traversal_nth = function() {
  var a = null, b = function(a, b) {
    for(;;) {
      if(null == a) {
        throw Error("Index out of bounds");
      }
      if(0 === b) {
        if(cljs.core.seq.call(null, a)) {
          return cljs.core.first.call(null, a)
        }
        throw Error("Index out of bounds");
      }
      if(cljs.core.indexed_QMARK_.call(null, a)) {
        return cljs.core._nth.call(null, a, b)
      }
      if(cljs.core.seq.call(null, a)) {
        var c = cljs.core.next.call(null, a), g = b - 1;
        a = c;
        b = g
      }else {
        if(new cljs.core.Keyword(null, "else", "else", 1017020587)) {
          throw Error("Index out of bounds");
        }
        return null
      }
    }
  }, c = function(a, b, c) {
    for(;;) {
      if(null == a) {
        return c
      }
      if(0 === b) {
        return cljs.core.seq.call(null, a) ? cljs.core.first.call(null, a) : c
      }
      if(cljs.core.indexed_QMARK_.call(null, a)) {
        return cljs.core._nth.call(null, a, b, c)
      }
      if(cljs.core.seq.call(null, a)) {
        a = cljs.core.next.call(null, a), b -= 1
      }else {
        return new cljs.core.Keyword(null, "else", "else", 1017020587) ? c : null
      }
    }
  }, a = function(a, e, f) {
    switch(arguments.length) {
      case 2:
        return b.call(this, a, e);
      case 3:
        return c.call(this, a, e, f)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$core$IFn$_invoke$arity$2 = b;
  a.cljs$core$IFn$_invoke$arity$3 = c;
  return a
}();
cljs.core.nth = function() {
  var a = null, b = function(a, b) {
    if(null == a) {
      return null
    }
    if(a && (a.cljs$lang$protocol_mask$partition0$ & 16 || a.cljs$core$IIndexed$)) {
      return cljs.core._nth.call(null, a, b)
    }
    if(a instanceof Array || "string" === typeof a) {
      return b < a.length ? a[b] : null
    }
    if(cljs.core.native_satisfies_QMARK_.call(null, cljs.core.IIndexed, a)) {
      return cljs.core._nth.call(null, a, b)
    }
    if(new cljs.core.Keyword(null, "else", "else", 1017020587)) {
      if(a ? a.cljs$lang$protocol_mask$partition0$ & 64 || a.cljs$core$ISeq$ || (a.cljs$lang$protocol_mask$partition0$ ? 0 : cljs.core.native_satisfies_QMARK_.call(null, cljs.core.ISeq, a)) : cljs.core.native_satisfies_QMARK_.call(null, cljs.core.ISeq, a)) {
        return cljs.core.linear_traversal_nth.call(null, a, b)
      }
      throw Error([cljs.core.str("nth not supported on this type "), cljs.core.str(cljs.core.type__GT_str.call(null, cljs.core.type.call(null, a)))].join(""));
    }
    return null
  }, c = function(a, b, c) {
    if(null != a) {
      if(a && (a.cljs$lang$protocol_mask$partition0$ & 16 || a.cljs$core$IIndexed$)) {
        return cljs.core._nth.call(null, a, b, c)
      }
      if(a instanceof Array || "string" === typeof a) {
        return b < a.length ? a[b] : c
      }
      if(cljs.core.native_satisfies_QMARK_.call(null, cljs.core.IIndexed, a)) {
        return cljs.core._nth.call(null, a, b)
      }
      if(new cljs.core.Keyword(null, "else", "else", 1017020587)) {
        if(a ? a.cljs$lang$protocol_mask$partition0$ & 64 || a.cljs$core$ISeq$ || (a.cljs$lang$protocol_mask$partition0$ ? 0 : cljs.core.native_satisfies_QMARK_.call(null, cljs.core.ISeq, a)) : cljs.core.native_satisfies_QMARK_.call(null, cljs.core.ISeq, a)) {
          return cljs.core.linear_traversal_nth.call(null, a, b, c)
        }
        throw Error([cljs.core.str("nth not supported on this type "), cljs.core.str(cljs.core.type__GT_str.call(null, cljs.core.type.call(null, a)))].join(""));
      }
      return null
    }
    return c
  }, a = function(a, e, f) {
    switch(arguments.length) {
      case 2:
        return b.call(this, a, e);
      case 3:
        return c.call(this, a, e, f)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$core$IFn$_invoke$arity$2 = b;
  a.cljs$core$IFn$_invoke$arity$3 = c;
  return a
}();
cljs.core.get = function() {
  var a = null, b = function(a, b) {
    if(null == a) {
      return null
    }
    if(a && (a.cljs$lang$protocol_mask$partition0$ & 256 || a.cljs$core$ILookup$)) {
      return cljs.core._lookup.call(null, a, b)
    }
    if(a instanceof Array || "string" === typeof a) {
      return b < a.length ? a[b] : null
    }
    if(cljs.core.native_satisfies_QMARK_.call(null, cljs.core.ILookup, a)) {
      return cljs.core._lookup.call(null, a, b)
    }
    new cljs.core.Keyword(null, "else", "else", 1017020587);
    return null
  }, c = function(a, b, c) {
    return null != a ? a && (a.cljs$lang$protocol_mask$partition0$ & 256 || a.cljs$core$ILookup$) ? cljs.core._lookup.call(null, a, b, c) : a instanceof Array ? b < a.length ? a[b] : c : "string" === typeof a ? b < a.length ? a[b] : c : cljs.core.native_satisfies_QMARK_.call(null, cljs.core.ILookup, a) ? cljs.core._lookup.call(null, a, b, c) : new cljs.core.Keyword(null, "else", "else", 1017020587) ? c : null : c
  }, a = function(a, e, f) {
    switch(arguments.length) {
      case 2:
        return b.call(this, a, e);
      case 3:
        return c.call(this, a, e, f)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$core$IFn$_invoke$arity$2 = b;
  a.cljs$core$IFn$_invoke$arity$3 = c;
  return a
}();
cljs.core.assoc = function() {
  var a = null, b = function(a, b, c) {
    return null != a ? cljs.core._assoc.call(null, a, b, c) : cljs.core.PersistentHashMap.fromArrays.call(null, [b], [c])
  }, c = function() {
    var b = function(b, c, d, e) {
      for(;;) {
        if(b = a.call(null, b, c, d), cljs.core.truth_(e)) {
          c = cljs.core.first.call(null, e), d = cljs.core.second.call(null, e), e = cljs.core.nnext.call(null, e)
        }else {
          return b
        }
      }
    }, c = function(a, c, e, l) {
      var m = null;
      3 < arguments.length && (m = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3), 0));
      return b.call(this, a, c, e, m)
    };
    c.cljs$lang$maxFixedArity = 3;
    c.cljs$lang$applyTo = function(a) {
      var c = cljs.core.first(a);
      a = cljs.core.next(a);
      var e = cljs.core.first(a);
      a = cljs.core.next(a);
      var l = cljs.core.first(a);
      a = cljs.core.rest(a);
      return b(c, e, l, a)
    };
    c.cljs$core$IFn$_invoke$arity$variadic = b;
    return c
  }(), a = function(a, e, f, g) {
    switch(arguments.length) {
      case 3:
        return b.call(this, a, e, f);
      default:
        return c.cljs$core$IFn$_invoke$arity$variadic(a, e, f, cljs.core.array_seq(arguments, 3))
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$lang$maxFixedArity = 3;
  a.cljs$lang$applyTo = c.cljs$lang$applyTo;
  a.cljs$core$IFn$_invoke$arity$3 = b;
  a.cljs$core$IFn$_invoke$arity$variadic = c.cljs$core$IFn$_invoke$arity$variadic;
  return a
}();
cljs.core.dissoc = function() {
  var a = null, b = function(a, b) {
    return cljs.core._dissoc.call(null, a, b)
  }, c = function() {
    var b = function(b, c, d) {
      for(;;) {
        if(b = a.call(null, b, c), cljs.core.truth_(d)) {
          c = cljs.core.first.call(null, d), d = cljs.core.next.call(null, d)
        }else {
          return b
        }
      }
    }, c = function(a, c, e) {
      var l = null;
      2 < arguments.length && (l = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2), 0));
      return b.call(this, a, c, l)
    };
    c.cljs$lang$maxFixedArity = 2;
    c.cljs$lang$applyTo = function(a) {
      var c = cljs.core.first(a);
      a = cljs.core.next(a);
      var e = cljs.core.first(a);
      a = cljs.core.rest(a);
      return b(c, e, a)
    };
    c.cljs$core$IFn$_invoke$arity$variadic = b;
    return c
  }(), a = function(a, e, f) {
    switch(arguments.length) {
      case 1:
        return a;
      case 2:
        return b.call(this, a, e);
      default:
        return c.cljs$core$IFn$_invoke$arity$variadic(a, e, cljs.core.array_seq(arguments, 2))
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$lang$maxFixedArity = 2;
  a.cljs$lang$applyTo = c.cljs$lang$applyTo;
  a.cljs$core$IFn$_invoke$arity$1 = function(a) {
    return a
  };
  a.cljs$core$IFn$_invoke$arity$2 = b;
  a.cljs$core$IFn$_invoke$arity$variadic = c.cljs$core$IFn$_invoke$arity$variadic;
  return a
}();
cljs.core.fn_QMARK_ = function(a) {
  var b = goog.isFunction(a);
  return b ? b : a ? cljs.core.truth_(cljs.core.truth_(null) ? null : a.cljs$core$Fn$) ? !0 : a.cljs$lang$protocol_mask$partition$ ? !1 : cljs.core.native_satisfies_QMARK_.call(null, cljs.core.Fn, a) : cljs.core.native_satisfies_QMARK_.call(null, cljs.core.Fn, a)
};
cljs.core.with_meta = function with_meta(b, c) {
  return cljs.core.fn_QMARK_.call(null, b) && !(b ? b.cljs$lang$protocol_mask$partition0$ & 262144 || b.cljs$core$IWithMeta$ || (b.cljs$lang$protocol_mask$partition0$ ? 0 : cljs.core.native_satisfies_QMARK_.call(null, cljs.core.IWithMeta, b)) : cljs.core.native_satisfies_QMARK_.call(null, cljs.core.IWithMeta, b)) ? with_meta.call(null, function() {
    "undefined" === typeof cljs.core.t17389 && (cljs.core.t17389 = function(b, c, f, g) {
      this.meta = b;
      this.o = c;
      this.with_meta = f;
      this.meta17390 = g;
      this.cljs$lang$protocol_mask$partition1$ = 0;
      this.cljs$lang$protocol_mask$partition0$ = 393217
    }, cljs.core.t17389.cljs$lang$type = !0, cljs.core.t17389.cljs$lang$ctorStr = "cljs.core/t17389", cljs.core.t17389.cljs$lang$ctorPrWriter = function(b, c, f) {
      return cljs.core._write.call(null, c, "cljs.core/t17389")
    }, cljs.core.t17389.prototype.call = function() {
      var b = function(b, c) {
        return cljs.core.apply.call(null, b.o, c)
      }, c = function(c, e) {
        c = this;
        var h = null;
        1 < arguments.length && (h = cljs.core.array_seq(Array.prototype.slice.call(arguments, 1), 0));
        return b.call(this, c, h)
      };
      c.cljs$lang$maxFixedArity = 1;
      c.cljs$lang$applyTo = function(c) {
        var e = cljs.core.first(c);
        c = cljs.core.rest(c);
        return b(e, c)
      };
      c.cljs$core$IFn$_invoke$arity$variadic = b;
      return c
    }(), cljs.core.t17389.prototype.apply = function(b, c) {
      return this.call.apply(this, [this].concat(c.slice()))
    }, cljs.core.t17389.prototype.cljs$core$IFn$_invoke$arity$2 = function() {
      var b = function(b) {
        return cljs.core.apply.call(null, self__.o, b)
      }, c = function(c) {
        var e = null;
        0 < arguments.length && (e = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0), 0));
        return b.call(this, e)
      };
      c.cljs$lang$maxFixedArity = 0;
      c.cljs$lang$applyTo = function(c) {
        c = cljs.core.seq(c);
        return b(c)
      };
      c.cljs$core$IFn$_invoke$arity$variadic = b;
      return c
    }(), cljs.core.t17389.prototype.cljs$core$Fn$ = !0, cljs.core.t17389.prototype.cljs$core$IMeta$_meta$arity$1 = function(b) {
      return this.meta17390
    }, cljs.core.t17389.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = function(b, c) {
      return new cljs.core.t17389(this.meta, this.o, this.with_meta, c)
    }, cljs.core.__GT_t17389 = function(b, c, f, g) {
      return new cljs.core.t17389(b, c, f, g)
    });
    return new cljs.core.t17389(c, b, with_meta, null)
  }(), c) : cljs.core._with_meta.call(null, b, c)
};
cljs.core.meta = function(a) {
  return(a ? a.cljs$lang$protocol_mask$partition0$ & 131072 || a.cljs$core$IMeta$ || (a.cljs$lang$protocol_mask$partition0$ ? 0 : cljs.core.native_satisfies_QMARK_.call(null, cljs.core.IMeta, a)) : cljs.core.native_satisfies_QMARK_.call(null, cljs.core.IMeta, a)) ? cljs.core._meta.call(null, a) : null
};
cljs.core.peek = function(a) {
  return cljs.core._peek.call(null, a)
};
cljs.core.pop = function(a) {
  return cljs.core._pop.call(null, a)
};
cljs.core.disj = function() {
  var a = null, b = function(a, b) {
    return cljs.core._disjoin.call(null, a, b)
  }, c = function() {
    var b = function(b, c, d) {
      for(;;) {
        if(b = a.call(null, b, c), cljs.core.truth_(d)) {
          c = cljs.core.first.call(null, d), d = cljs.core.next.call(null, d)
        }else {
          return b
        }
      }
    }, c = function(a, c, e) {
      var l = null;
      2 < arguments.length && (l = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2), 0));
      return b.call(this, a, c, l)
    };
    c.cljs$lang$maxFixedArity = 2;
    c.cljs$lang$applyTo = function(a) {
      var c = cljs.core.first(a);
      a = cljs.core.next(a);
      var e = cljs.core.first(a);
      a = cljs.core.rest(a);
      return b(c, e, a)
    };
    c.cljs$core$IFn$_invoke$arity$variadic = b;
    return c
  }(), a = function(a, e, f) {
    switch(arguments.length) {
      case 1:
        return a;
      case 2:
        return b.call(this, a, e);
      default:
        return c.cljs$core$IFn$_invoke$arity$variadic(a, e, cljs.core.array_seq(arguments, 2))
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$lang$maxFixedArity = 2;
  a.cljs$lang$applyTo = c.cljs$lang$applyTo;
  a.cljs$core$IFn$_invoke$arity$1 = function(a) {
    return a
  };
  a.cljs$core$IFn$_invoke$arity$2 = b;
  a.cljs$core$IFn$_invoke$arity$variadic = c.cljs$core$IFn$_invoke$arity$variadic;
  return a
}();
cljs.core.string_hash_cache = {};
cljs.core.string_hash_cache_count = 0;
cljs.core.add_to_string_hash_cache = function(a) {
  var b = goog.string.hashCode(a);
  cljs.core.string_hash_cache[a] = b;
  cljs.core.string_hash_cache_count += 1;
  return b
};
cljs.core.check_string_hash_cache = function(a) {
  255 < cljs.core.string_hash_cache_count && (cljs.core.string_hash_cache = {}, cljs.core.string_hash_cache_count = 0);
  var b = cljs.core.string_hash_cache[a];
  return"number" === typeof b ? b : cljs.core.add_to_string_hash_cache.call(null, a)
};
cljs.core.hash = function(a) {
  return a && (a.cljs$lang$protocol_mask$partition0$ & 4194304 || a.cljs$core$IHash$) ? cljs.core._hash.call(null, a) : "number" === typeof a ? Math.floor(a) % 2147483647 : !0 === a ? 1 : !1 === a ? 0 : "string" === typeof a ? cljs.core.check_string_hash_cache.call(null, a) : new cljs.core.Keyword(null, "else", "else", 1017020587) ? cljs.core._hash.call(null, a) : null
};
cljs.core.empty_QMARK_ = function(a) {
  return null == a || cljs.core.not.call(null, cljs.core.seq.call(null, a))
};
cljs.core.coll_QMARK_ = function(a) {
  return null == a ? !1 : a ? a.cljs$lang$protocol_mask$partition0$ & 8 || a.cljs$core$ICollection$ ? !0 : a.cljs$lang$protocol_mask$partition0$ ? !1 : cljs.core.native_satisfies_QMARK_.call(null, cljs.core.ICollection, a) : cljs.core.native_satisfies_QMARK_.call(null, cljs.core.ICollection, a)
};
cljs.core.set_QMARK_ = function(a) {
  return null == a ? !1 : a ? a.cljs$lang$protocol_mask$partition0$ & 4096 || a.cljs$core$ISet$ ? !0 : a.cljs$lang$protocol_mask$partition0$ ? !1 : cljs.core.native_satisfies_QMARK_.call(null, cljs.core.ISet, a) : cljs.core.native_satisfies_QMARK_.call(null, cljs.core.ISet, a)
};
cljs.core.associative_QMARK_ = function(a) {
  return a ? a.cljs$lang$protocol_mask$partition0$ & 512 || a.cljs$core$IAssociative$ ? !0 : a.cljs$lang$protocol_mask$partition0$ ? !1 : cljs.core.native_satisfies_QMARK_.call(null, cljs.core.IAssociative, a) : cljs.core.native_satisfies_QMARK_.call(null, cljs.core.IAssociative, a)
};
cljs.core.sequential_QMARK_ = function(a) {
  return a ? a.cljs$lang$protocol_mask$partition0$ & 16777216 || a.cljs$core$ISequential$ ? !0 : a.cljs$lang$protocol_mask$partition0$ ? !1 : cljs.core.native_satisfies_QMARK_.call(null, cljs.core.ISequential, a) : cljs.core.native_satisfies_QMARK_.call(null, cljs.core.ISequential, a)
};
cljs.core.reduceable_QMARK_ = function(a) {
  return a ? a.cljs$lang$protocol_mask$partition0$ & 524288 || a.cljs$core$IReduce$ ? !0 : a.cljs$lang$protocol_mask$partition0$ ? !1 : cljs.core.native_satisfies_QMARK_.call(null, cljs.core.IReduce, a) : cljs.core.native_satisfies_QMARK_.call(null, cljs.core.IReduce, a)
};
cljs.core.map_QMARK_ = function(a) {
  return null == a ? !1 : a ? a.cljs$lang$protocol_mask$partition0$ & 1024 || a.cljs$core$IMap$ ? !0 : a.cljs$lang$protocol_mask$partition0$ ? !1 : cljs.core.native_satisfies_QMARK_.call(null, cljs.core.IMap, a) : cljs.core.native_satisfies_QMARK_.call(null, cljs.core.IMap, a)
};
cljs.core.vector_QMARK_ = function(a) {
  return a ? a.cljs$lang$protocol_mask$partition0$ & 16384 || a.cljs$core$IVector$ ? !0 : a.cljs$lang$protocol_mask$partition0$ ? !1 : cljs.core.native_satisfies_QMARK_.call(null, cljs.core.IVector, a) : cljs.core.native_satisfies_QMARK_.call(null, cljs.core.IVector, a)
};
cljs.core.chunked_seq_QMARK_ = function(a) {
  return a ? a.cljs$lang$protocol_mask$partition1$ & 512 || a.cljs$core$IChunkedSeq$ ? !0 : !1 : !1
};
cljs.core.js_obj = function() {
  var a = null, b = function() {
    var a = function(a) {
      return cljs.core.apply.call(null, goog.object.create, a)
    }, b = function(b) {
      var d = null;
      0 < arguments.length && (d = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0), 0));
      return a.call(this, d)
    };
    b.cljs$lang$maxFixedArity = 0;
    b.cljs$lang$applyTo = function(b) {
      b = cljs.core.seq(b);
      return a(b)
    };
    b.cljs$core$IFn$_invoke$arity$variadic = a;
    return b
  }(), a = function(a) {
    switch(arguments.length) {
      case 0:
        return{};
      default:
        return b.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(arguments, 0))
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$lang$maxFixedArity = 0;
  a.cljs$lang$applyTo = b.cljs$lang$applyTo;
  a.cljs$core$IFn$_invoke$arity$0 = function() {
    return{}
  };
  a.cljs$core$IFn$_invoke$arity$variadic = b.cljs$core$IFn$_invoke$arity$variadic;
  return a
}();
cljs.core.js_keys = function(a) {
  var b = [];
  goog.object.forEach(a, function(a, d, e) {
    return b.push(d)
  });
  return b
};
cljs.core.js_delete = function(a, b) {
  return delete a[b]
};
cljs.core.array_copy = function(a, b, c, d, e) {
  for(;;) {
    if(0 === e) {
      return c
    }
    c[d] = a[b];
    d += 1;
    e -= 1;
    b += 1
  }
};
cljs.core.array_copy_downward = function(a, b, c, d, e) {
  b += e - 1;
  for(d += e - 1;;) {
    if(0 === e) {
      return c
    }
    c[d] = a[b];
    d -= 1;
    e -= 1;
    b -= 1
  }
};
cljs.core.lookup_sentinel = {};
cljs.core.false_QMARK_ = function(a) {
  return!1 === a
};
cljs.core.true_QMARK_ = function(a) {
  return!0 === a
};
cljs.core.undefined_QMARK_ = function(a) {
  return void 0 === a
};
cljs.core.seq_QMARK_ = function(a) {
  return null == a ? !1 : a ? a.cljs$lang$protocol_mask$partition0$ & 64 || a.cljs$core$ISeq$ ? !0 : a.cljs$lang$protocol_mask$partition0$ ? !1 : cljs.core.native_satisfies_QMARK_.call(null, cljs.core.ISeq, a) : cljs.core.native_satisfies_QMARK_.call(null, cljs.core.ISeq, a)
};
cljs.core.seqable_QMARK_ = function(a) {
  return a ? a.cljs$lang$protocol_mask$partition0$ & 8388608 || a.cljs$core$ISeqable$ ? !0 : a.cljs$lang$protocol_mask$partition0$ ? !1 : cljs.core.native_satisfies_QMARK_.call(null, cljs.core.ISeqable, a) : cljs.core.native_satisfies_QMARK_.call(null, cljs.core.ISeqable, a)
};
cljs.core.boolean$ = function(a) {
  return cljs.core.truth_(a) ? !0 : !1
};
cljs.core.ifn_QMARK_ = function(a) {
  var b = cljs.core.fn_QMARK_.call(null, a);
  return b ? b : a ? a.cljs$lang$protocol_mask$partition0$ & 1 || a.cljs$core$IFn$ ? !0 : a.cljs$lang$protocol_mask$partition0$ ? !1 : cljs.core.native_satisfies_QMARK_.call(null, cljs.core.IFn, a) : cljs.core.native_satisfies_QMARK_.call(null, cljs.core.IFn, a)
};
cljs.core.integer_QMARK_ = function(a) {
  return"number" === typeof a && !isNaN(a) && Infinity !== a && parseFloat(a) === parseInt(a, 10)
};
cljs.core.contains_QMARK_ = function(a, b) {
  return cljs.core.get.call(null, a, b, cljs.core.lookup_sentinel) === cljs.core.lookup_sentinel ? !1 : !0
};
cljs.core.find = function(a, b) {
  return null != a && cljs.core.associative_QMARK_.call(null, a) && cljs.core.contains_QMARK_.call(null, a, b) ? cljs.core.PersistentVector.fromArray([b, cljs.core.get.call(null, a, b)], !0) : null
};
cljs.core.distinct_QMARK_ = function() {
  var a = null, b = function(a, b) {
    return!cljs.core._EQ_.call(null, a, b)
  }, c = function() {
    var a = function(a, b, c) {
      if(cljs.core._EQ_.call(null, a, b)) {
        return!1
      }
      a = cljs.core.PersistentHashSet.fromArray([b, null, a, null], !0);
      for(b = c;;) {
        var d = cljs.core.first.call(null, b);
        c = cljs.core.next.call(null, b);
        if(cljs.core.truth_(b)) {
          if(cljs.core.contains_QMARK_.call(null, a, d)) {
            return!1
          }
          a = cljs.core.conj.call(null, a, d);
          b = c
        }else {
          return!0
        }
      }
    }, b = function(b, c, e) {
      var l = null;
      2 < arguments.length && (l = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2), 0));
      return a.call(this, b, c, l)
    };
    b.cljs$lang$maxFixedArity = 2;
    b.cljs$lang$applyTo = function(b) {
      var c = cljs.core.first(b);
      b = cljs.core.next(b);
      var e = cljs.core.first(b);
      b = cljs.core.rest(b);
      return a(c, e, b)
    };
    b.cljs$core$IFn$_invoke$arity$variadic = a;
    return b
  }(), a = function(a, e, f) {
    switch(arguments.length) {
      case 1:
        return!0;
      case 2:
        return b.call(this, a, e);
      default:
        return c.cljs$core$IFn$_invoke$arity$variadic(a, e, cljs.core.array_seq(arguments, 2))
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$lang$maxFixedArity = 2;
  a.cljs$lang$applyTo = c.cljs$lang$applyTo;
  a.cljs$core$IFn$_invoke$arity$1 = function(a) {
    return!0
  };
  a.cljs$core$IFn$_invoke$arity$2 = b;
  a.cljs$core$IFn$_invoke$arity$variadic = c.cljs$core$IFn$_invoke$arity$variadic;
  return a
}();
cljs.core.compare = function(a, b) {
  if(a === b) {
    return 0
  }
  if(null == a) {
    return-1
  }
  if(null == b) {
    return 1
  }
  if(cljs.core.type.call(null, a) === cljs.core.type.call(null, b)) {
    return a && (a.cljs$lang$protocol_mask$partition1$ & 2048 || a.cljs$core$IComparable$) ? cljs.core._compare.call(null, a, b) : goog.array.defaultCompare(a, b)
  }
  if(new cljs.core.Keyword(null, "else", "else", 1017020587)) {
    throw Error("compare on non-nil objects of different types");
  }
  return null
};
cljs.core.compare_indexed = function() {
  var a = null, b = function(b, c) {
    var f = cljs.core.count.call(null, b), g = cljs.core.count.call(null, c);
    return f < g ? -1 : f > g ? 1 : new cljs.core.Keyword(null, "else", "else", 1017020587) ? a.call(null, b, c, f, 0) : null
  }, c = function(a, b, c, g) {
    for(;;) {
      var h = cljs.core.compare.call(null, cljs.core.nth.call(null, a, g), cljs.core.nth.call(null, b, g));
      if(0 === h && g + 1 < c) {
        g += 1
      }else {
        return h
      }
    }
  }, a = function(a, e, f, g) {
    switch(arguments.length) {
      case 2:
        return b.call(this, a, e);
      case 4:
        return c.call(this, a, e, f, g)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$core$IFn$_invoke$arity$2 = b;
  a.cljs$core$IFn$_invoke$arity$4 = c;
  return a
}();
cljs.core.fn__GT_comparator = function(a) {
  return cljs.core._EQ_.call(null, a, cljs.core.compare) ? cljs.core.compare : function(b, c) {
    var d = a.call(null, b, c);
    return"number" === typeof d ? d : cljs.core.truth_(d) ? -1 : cljs.core.truth_(a.call(null, c, b)) ? 1 : 0
  }
};
cljs.core.sort = function() {
  var a = null, b = function(b) {
    return a.call(null, cljs.core.compare, b)
  }, c = function(a, b) {
    if(cljs.core.seq.call(null, b)) {
      var c = cljs.core.to_array.call(null, b);
      goog.array.stableSort(c, cljs.core.fn__GT_comparator.call(null, a));
      return cljs.core.seq.call(null, c)
    }
    return cljs.core.List.EMPTY
  }, a = function(a, e) {
    switch(arguments.length) {
      case 1:
        return b.call(this, a);
      case 2:
        return c.call(this, a, e)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$core$IFn$_invoke$arity$1 = b;
  a.cljs$core$IFn$_invoke$arity$2 = c;
  return a
}();
cljs.core.sort_by = function() {
  var a = null, b = function(b, c) {
    return a.call(null, b, cljs.core.compare, c)
  }, c = function(a, b, c) {
    return cljs.core.sort.call(null, function(c, f) {
      return cljs.core.fn__GT_comparator.call(null, b).call(null, a.call(null, c), a.call(null, f))
    }, c)
  }, a = function(a, e, f) {
    switch(arguments.length) {
      case 2:
        return b.call(this, a, e);
      case 3:
        return c.call(this, a, e, f)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$core$IFn$_invoke$arity$2 = b;
  a.cljs$core$IFn$_invoke$arity$3 = c;
  return a
}();
cljs.core.seq_reduce = function() {
  var a = null, b = function(a, b) {
    var c = cljs.core.seq.call(null, b);
    return c ? cljs.core.reduce.call(null, a, cljs.core.first.call(null, c), cljs.core.next.call(null, c)) : a.call(null)
  }, c = function(a, b, c) {
    for(c = cljs.core.seq.call(null, c);;) {
      if(c) {
        b = a.call(null, b, cljs.core.first.call(null, c));
        if(cljs.core.reduced_QMARK_.call(null, b)) {
          return cljs.core.deref.call(null, b)
        }
        c = cljs.core.next.call(null, c)
      }else {
        return b
      }
    }
  }, a = function(a, e, f) {
    switch(arguments.length) {
      case 2:
        return b.call(this, a, e);
      case 3:
        return c.call(this, a, e, f)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$core$IFn$_invoke$arity$2 = b;
  a.cljs$core$IFn$_invoke$arity$3 = c;
  return a
}();
cljs.core.shuffle = function(a) {
  a = cljs.core.to_array.call(null, a);
  goog.array.shuffle(a);
  return cljs.core.vec.call(null, a)
};
cljs.core.reduce = function() {
  var a = null, b = function(a, b) {
    return b && (b.cljs$lang$protocol_mask$partition0$ & 524288 || b.cljs$core$IReduce$) ? cljs.core._reduce.call(null, b, a) : b instanceof Array ? cljs.core.array_reduce.call(null, b, a) : "string" === typeof b ? cljs.core.array_reduce.call(null, b, a) : cljs.core.native_satisfies_QMARK_.call(null, cljs.core.IReduce, b) ? cljs.core._reduce.call(null, b, a) : new cljs.core.Keyword(null, "else", "else", 1017020587) ? cljs.core.seq_reduce.call(null, a, b) : null
  }, c = function(a, b, c) {
    return c && (c.cljs$lang$protocol_mask$partition0$ & 524288 || c.cljs$core$IReduce$) ? cljs.core._reduce.call(null, c, a, b) : c instanceof Array ? cljs.core.array_reduce.call(null, c, a, b) : "string" === typeof c ? cljs.core.array_reduce.call(null, c, a, b) : cljs.core.native_satisfies_QMARK_.call(null, cljs.core.IReduce, c) ? cljs.core._reduce.call(null, c, a, b) : new cljs.core.Keyword(null, "else", "else", 1017020587) ? cljs.core.seq_reduce.call(null, a, b, c) : null
  }, a = function(a, e, f) {
    switch(arguments.length) {
      case 2:
        return b.call(this, a, e);
      case 3:
        return c.call(this, a, e, f)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$core$IFn$_invoke$arity$2 = b;
  a.cljs$core$IFn$_invoke$arity$3 = c;
  return a
}();
cljs.core.reduce_kv = function(a, b, c) {
  return cljs.core._kv_reduce.call(null, c, a, b)
};
cljs.core._PLUS_ = function() {
  var a = null, b = function() {
    var b = function(b, c, d) {
      return cljs.core.reduce.call(null, a, b + c, d)
    }, d = function(a, d, g) {
      var h = null;
      2 < arguments.length && (h = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2), 0));
      return b.call(this, a, d, h)
    };
    d.cljs$lang$maxFixedArity = 2;
    d.cljs$lang$applyTo = function(a) {
      var d = cljs.core.first(a);
      a = cljs.core.next(a);
      var g = cljs.core.first(a);
      a = cljs.core.rest(a);
      return b(d, g, a)
    };
    d.cljs$core$IFn$_invoke$arity$variadic = b;
    return d
  }(), a = function(a, d, e) {
    switch(arguments.length) {
      case 0:
        return 0;
      case 1:
        return a;
      case 2:
        return a + d;
      default:
        return b.cljs$core$IFn$_invoke$arity$variadic(a, d, cljs.core.array_seq(arguments, 2))
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$lang$maxFixedArity = 2;
  a.cljs$lang$applyTo = b.cljs$lang$applyTo;
  a.cljs$core$IFn$_invoke$arity$0 = function() {
    return 0
  };
  a.cljs$core$IFn$_invoke$arity$1 = function(a) {
    return a
  };
  a.cljs$core$IFn$_invoke$arity$2 = function(a, b) {
    return a + b
  };
  a.cljs$core$IFn$_invoke$arity$variadic = b.cljs$core$IFn$_invoke$arity$variadic;
  return a
}();
cljs.core._ = function() {
  var a = null, b = function() {
    var b = function(b, c, d) {
      return cljs.core.reduce.call(null, a, b - c, d)
    }, d = function(a, d, g) {
      var h = null;
      2 < arguments.length && (h = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2), 0));
      return b.call(this, a, d, h)
    };
    d.cljs$lang$maxFixedArity = 2;
    d.cljs$lang$applyTo = function(a) {
      var d = cljs.core.first(a);
      a = cljs.core.next(a);
      var g = cljs.core.first(a);
      a = cljs.core.rest(a);
      return b(d, g, a)
    };
    d.cljs$core$IFn$_invoke$arity$variadic = b;
    return d
  }(), a = function(a, d, e) {
    switch(arguments.length) {
      case 1:
        return-a;
      case 2:
        return a - d;
      default:
        return b.cljs$core$IFn$_invoke$arity$variadic(a, d, cljs.core.array_seq(arguments, 2))
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$lang$maxFixedArity = 2;
  a.cljs$lang$applyTo = b.cljs$lang$applyTo;
  a.cljs$core$IFn$_invoke$arity$1 = function(a) {
    return-a
  };
  a.cljs$core$IFn$_invoke$arity$2 = function(a, b) {
    return a - b
  };
  a.cljs$core$IFn$_invoke$arity$variadic = b.cljs$core$IFn$_invoke$arity$variadic;
  return a
}();
cljs.core._STAR_ = function() {
  var a = null, b = function() {
    var b = function(b, c, d) {
      return cljs.core.reduce.call(null, a, b * c, d)
    }, d = function(a, d, g) {
      var h = null;
      2 < arguments.length && (h = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2), 0));
      return b.call(this, a, d, h)
    };
    d.cljs$lang$maxFixedArity = 2;
    d.cljs$lang$applyTo = function(a) {
      var d = cljs.core.first(a);
      a = cljs.core.next(a);
      var g = cljs.core.first(a);
      a = cljs.core.rest(a);
      return b(d, g, a)
    };
    d.cljs$core$IFn$_invoke$arity$variadic = b;
    return d
  }(), a = function(a, d, e) {
    switch(arguments.length) {
      case 0:
        return 1;
      case 1:
        return a;
      case 2:
        return a * d;
      default:
        return b.cljs$core$IFn$_invoke$arity$variadic(a, d, cljs.core.array_seq(arguments, 2))
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$lang$maxFixedArity = 2;
  a.cljs$lang$applyTo = b.cljs$lang$applyTo;
  a.cljs$core$IFn$_invoke$arity$0 = function() {
    return 1
  };
  a.cljs$core$IFn$_invoke$arity$1 = function(a) {
    return a
  };
  a.cljs$core$IFn$_invoke$arity$2 = function(a, b) {
    return a * b
  };
  a.cljs$core$IFn$_invoke$arity$variadic = b.cljs$core$IFn$_invoke$arity$variadic;
  return a
}();
cljs.core._SLASH_ = function() {
  var a = null, b = function(b) {
    return a.call(null, 1, b)
  }, c = function() {
    var b = function(b, c, d) {
      return cljs.core.reduce.call(null, a, a.call(null, b, c), d)
    }, c = function(a, c, e) {
      var l = null;
      2 < arguments.length && (l = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2), 0));
      return b.call(this, a, c, l)
    };
    c.cljs$lang$maxFixedArity = 2;
    c.cljs$lang$applyTo = function(a) {
      var c = cljs.core.first(a);
      a = cljs.core.next(a);
      var e = cljs.core.first(a);
      a = cljs.core.rest(a);
      return b(c, e, a)
    };
    c.cljs$core$IFn$_invoke$arity$variadic = b;
    return c
  }(), a = function(a, e, f) {
    switch(arguments.length) {
      case 1:
        return b.call(this, a);
      case 2:
        return a / e;
      default:
        return c.cljs$core$IFn$_invoke$arity$variadic(a, e, cljs.core.array_seq(arguments, 2))
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$lang$maxFixedArity = 2;
  a.cljs$lang$applyTo = c.cljs$lang$applyTo;
  a.cljs$core$IFn$_invoke$arity$1 = b;
  a.cljs$core$IFn$_invoke$arity$2 = function(a, b) {
    return a / b
  };
  a.cljs$core$IFn$_invoke$arity$variadic = c.cljs$core$IFn$_invoke$arity$variadic;
  return a
}();
cljs.core._LT_ = function() {
  var a = null, b = function() {
    var a = function(a, b, c) {
      for(;;) {
        if(a < b) {
          if(cljs.core.next.call(null, c)) {
            a = b, b = cljs.core.first.call(null, c), c = cljs.core.next.call(null, c)
          }else {
            return b < cljs.core.first.call(null, c)
          }
        }else {
          return!1
        }
      }
    }, b = function(b, d, g) {
      var h = null;
      2 < arguments.length && (h = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2), 0));
      return a.call(this, b, d, h)
    };
    b.cljs$lang$maxFixedArity = 2;
    b.cljs$lang$applyTo = function(b) {
      var d = cljs.core.first(b);
      b = cljs.core.next(b);
      var g = cljs.core.first(b);
      b = cljs.core.rest(b);
      return a(d, g, b)
    };
    b.cljs$core$IFn$_invoke$arity$variadic = a;
    return b
  }(), a = function(a, d, e) {
    switch(arguments.length) {
      case 1:
        return!0;
      case 2:
        return a < d;
      default:
        return b.cljs$core$IFn$_invoke$arity$variadic(a, d, cljs.core.array_seq(arguments, 2))
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$lang$maxFixedArity = 2;
  a.cljs$lang$applyTo = b.cljs$lang$applyTo;
  a.cljs$core$IFn$_invoke$arity$1 = function(a) {
    return!0
  };
  a.cljs$core$IFn$_invoke$arity$2 = function(a, b) {
    return a < b
  };
  a.cljs$core$IFn$_invoke$arity$variadic = b.cljs$core$IFn$_invoke$arity$variadic;
  return a
}();
cljs.core._LT__EQ_ = function() {
  var a = null, b = function() {
    var a = function(a, b, c) {
      for(;;) {
        if(a <= b) {
          if(cljs.core.next.call(null, c)) {
            a = b, b = cljs.core.first.call(null, c), c = cljs.core.next.call(null, c)
          }else {
            return b <= cljs.core.first.call(null, c)
          }
        }else {
          return!1
        }
      }
    }, b = function(b, d, g) {
      var h = null;
      2 < arguments.length && (h = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2), 0));
      return a.call(this, b, d, h)
    };
    b.cljs$lang$maxFixedArity = 2;
    b.cljs$lang$applyTo = function(b) {
      var d = cljs.core.first(b);
      b = cljs.core.next(b);
      var g = cljs.core.first(b);
      b = cljs.core.rest(b);
      return a(d, g, b)
    };
    b.cljs$core$IFn$_invoke$arity$variadic = a;
    return b
  }(), a = function(a, d, e) {
    switch(arguments.length) {
      case 1:
        return!0;
      case 2:
        return a <= d;
      default:
        return b.cljs$core$IFn$_invoke$arity$variadic(a, d, cljs.core.array_seq(arguments, 2))
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$lang$maxFixedArity = 2;
  a.cljs$lang$applyTo = b.cljs$lang$applyTo;
  a.cljs$core$IFn$_invoke$arity$1 = function(a) {
    return!0
  };
  a.cljs$core$IFn$_invoke$arity$2 = function(a, b) {
    return a <= b
  };
  a.cljs$core$IFn$_invoke$arity$variadic = b.cljs$core$IFn$_invoke$arity$variadic;
  return a
}();
cljs.core._GT_ = function() {
  var a = null, b = function() {
    var a = function(a, b, c) {
      for(;;) {
        if(a > b) {
          if(cljs.core.next.call(null, c)) {
            a = b, b = cljs.core.first.call(null, c), c = cljs.core.next.call(null, c)
          }else {
            return b > cljs.core.first.call(null, c)
          }
        }else {
          return!1
        }
      }
    }, b = function(b, d, g) {
      var h = null;
      2 < arguments.length && (h = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2), 0));
      return a.call(this, b, d, h)
    };
    b.cljs$lang$maxFixedArity = 2;
    b.cljs$lang$applyTo = function(b) {
      var d = cljs.core.first(b);
      b = cljs.core.next(b);
      var g = cljs.core.first(b);
      b = cljs.core.rest(b);
      return a(d, g, b)
    };
    b.cljs$core$IFn$_invoke$arity$variadic = a;
    return b
  }(), a = function(a, d, e) {
    switch(arguments.length) {
      case 1:
        return!0;
      case 2:
        return a > d;
      default:
        return b.cljs$core$IFn$_invoke$arity$variadic(a, d, cljs.core.array_seq(arguments, 2))
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$lang$maxFixedArity = 2;
  a.cljs$lang$applyTo = b.cljs$lang$applyTo;
  a.cljs$core$IFn$_invoke$arity$1 = function(a) {
    return!0
  };
  a.cljs$core$IFn$_invoke$arity$2 = function(a, b) {
    return a > b
  };
  a.cljs$core$IFn$_invoke$arity$variadic = b.cljs$core$IFn$_invoke$arity$variadic;
  return a
}();
cljs.core._GT__EQ_ = function() {
  var a = null, b = function() {
    var a = function(a, b, c) {
      for(;;) {
        if(a >= b) {
          if(cljs.core.next.call(null, c)) {
            a = b, b = cljs.core.first.call(null, c), c = cljs.core.next.call(null, c)
          }else {
            return b >= cljs.core.first.call(null, c)
          }
        }else {
          return!1
        }
      }
    }, b = function(b, d, g) {
      var h = null;
      2 < arguments.length && (h = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2), 0));
      return a.call(this, b, d, h)
    };
    b.cljs$lang$maxFixedArity = 2;
    b.cljs$lang$applyTo = function(b) {
      var d = cljs.core.first(b);
      b = cljs.core.next(b);
      var g = cljs.core.first(b);
      b = cljs.core.rest(b);
      return a(d, g, b)
    };
    b.cljs$core$IFn$_invoke$arity$variadic = a;
    return b
  }(), a = function(a, d, e) {
    switch(arguments.length) {
      case 1:
        return!0;
      case 2:
        return a >= d;
      default:
        return b.cljs$core$IFn$_invoke$arity$variadic(a, d, cljs.core.array_seq(arguments, 2))
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$lang$maxFixedArity = 2;
  a.cljs$lang$applyTo = b.cljs$lang$applyTo;
  a.cljs$core$IFn$_invoke$arity$1 = function(a) {
    return!0
  };
  a.cljs$core$IFn$_invoke$arity$2 = function(a, b) {
    return a >= b
  };
  a.cljs$core$IFn$_invoke$arity$variadic = b.cljs$core$IFn$_invoke$arity$variadic;
  return a
}();
cljs.core.dec = function(a) {
  return a - 1
};
cljs.core.max = function() {
  var a = null, b = function(a, b) {
    return a > b ? a : b
  }, c = function() {
    var b = function(b, c, d) {
      return cljs.core.reduce.call(null, a, b > c ? b : c, d)
    }, c = function(a, c, e) {
      var l = null;
      2 < arguments.length && (l = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2), 0));
      return b.call(this, a, c, l)
    };
    c.cljs$lang$maxFixedArity = 2;
    c.cljs$lang$applyTo = function(a) {
      var c = cljs.core.first(a);
      a = cljs.core.next(a);
      var e = cljs.core.first(a);
      a = cljs.core.rest(a);
      return b(c, e, a)
    };
    c.cljs$core$IFn$_invoke$arity$variadic = b;
    return c
  }(), a = function(a, e, f) {
    switch(arguments.length) {
      case 1:
        return a;
      case 2:
        return b.call(this, a, e);
      default:
        return c.cljs$core$IFn$_invoke$arity$variadic(a, e, cljs.core.array_seq(arguments, 2))
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$lang$maxFixedArity = 2;
  a.cljs$lang$applyTo = c.cljs$lang$applyTo;
  a.cljs$core$IFn$_invoke$arity$1 = function(a) {
    return a
  };
  a.cljs$core$IFn$_invoke$arity$2 = b;
  a.cljs$core$IFn$_invoke$arity$variadic = c.cljs$core$IFn$_invoke$arity$variadic;
  return a
}();
cljs.core.min = function() {
  var a = null, b = function(a, b) {
    return a < b ? a : b
  }, c = function() {
    var b = function(b, c, d) {
      return cljs.core.reduce.call(null, a, b < c ? b : c, d)
    }, c = function(a, c, e) {
      var l = null;
      2 < arguments.length && (l = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2), 0));
      return b.call(this, a, c, l)
    };
    c.cljs$lang$maxFixedArity = 2;
    c.cljs$lang$applyTo = function(a) {
      var c = cljs.core.first(a);
      a = cljs.core.next(a);
      var e = cljs.core.first(a);
      a = cljs.core.rest(a);
      return b(c, e, a)
    };
    c.cljs$core$IFn$_invoke$arity$variadic = b;
    return c
  }(), a = function(a, e, f) {
    switch(arguments.length) {
      case 1:
        return a;
      case 2:
        return b.call(this, a, e);
      default:
        return c.cljs$core$IFn$_invoke$arity$variadic(a, e, cljs.core.array_seq(arguments, 2))
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$lang$maxFixedArity = 2;
  a.cljs$lang$applyTo = c.cljs$lang$applyTo;
  a.cljs$core$IFn$_invoke$arity$1 = function(a) {
    return a
  };
  a.cljs$core$IFn$_invoke$arity$2 = b;
  a.cljs$core$IFn$_invoke$arity$variadic = c.cljs$core$IFn$_invoke$arity$variadic;
  return a
}();
cljs.core.byte$ = function(a) {
  return a
};
cljs.core.char$ = function(a) {
  if("number" === typeof a) {
    return String.fromCharCode(a)
  }
  if("string" === typeof a && 1 === a.length) {
    return a
  }
  if(new cljs.core.Keyword(null, "else", "else", 1017020587)) {
    throw Error("Argument to char must be a character or number");
  }
  return null
};
cljs.core.short$ = function(a) {
  return a
};
cljs.core.float$ = function(a) {
  return a
};
cljs.core.double$ = function(a) {
  return a
};
cljs.core.unchecked_byte = function(a) {
  return a
};
cljs.core.unchecked_char = function(a) {
  return a
};
cljs.core.unchecked_short = function(a) {
  return a
};
cljs.core.unchecked_float = function(a) {
  return a
};
cljs.core.unchecked_double = function(a) {
  return a
};
cljs.core.unchecked_add = function() {
  var a = null, b = function() {
    var b = function(b, c, d) {
      return cljs.core.reduce.call(null, a, b + c, d)
    }, d = function(a, d, g) {
      var h = null;
      2 < arguments.length && (h = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2), 0));
      return b.call(this, a, d, h)
    };
    d.cljs$lang$maxFixedArity = 2;
    d.cljs$lang$applyTo = function(a) {
      var d = cljs.core.first(a);
      a = cljs.core.next(a);
      var g = cljs.core.first(a);
      a = cljs.core.rest(a);
      return b(d, g, a)
    };
    d.cljs$core$IFn$_invoke$arity$variadic = b;
    return d
  }(), a = function(a, d, e) {
    switch(arguments.length) {
      case 0:
        return 0;
      case 1:
        return a;
      case 2:
        return a + d;
      default:
        return b.cljs$core$IFn$_invoke$arity$variadic(a, d, cljs.core.array_seq(arguments, 2))
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$lang$maxFixedArity = 2;
  a.cljs$lang$applyTo = b.cljs$lang$applyTo;
  a.cljs$core$IFn$_invoke$arity$0 = function() {
    return 0
  };
  a.cljs$core$IFn$_invoke$arity$1 = function(a) {
    return a
  };
  a.cljs$core$IFn$_invoke$arity$2 = function(a, b) {
    return a + b
  };
  a.cljs$core$IFn$_invoke$arity$variadic = b.cljs$core$IFn$_invoke$arity$variadic;
  return a
}();
cljs.core.unchecked_add_int = function() {
  var a = null, b = function() {
    var b = function(b, c, d) {
      return cljs.core.reduce.call(null, a, b + c, d)
    }, d = function(a, d, g) {
      var h = null;
      2 < arguments.length && (h = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2), 0));
      return b.call(this, a, d, h)
    };
    d.cljs$lang$maxFixedArity = 2;
    d.cljs$lang$applyTo = function(a) {
      var d = cljs.core.first(a);
      a = cljs.core.next(a);
      var g = cljs.core.first(a);
      a = cljs.core.rest(a);
      return b(d, g, a)
    };
    d.cljs$core$IFn$_invoke$arity$variadic = b;
    return d
  }(), a = function(a, d, e) {
    switch(arguments.length) {
      case 0:
        return 0;
      case 1:
        return a;
      case 2:
        return a + d;
      default:
        return b.cljs$core$IFn$_invoke$arity$variadic(a, d, cljs.core.array_seq(arguments, 2))
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$lang$maxFixedArity = 2;
  a.cljs$lang$applyTo = b.cljs$lang$applyTo;
  a.cljs$core$IFn$_invoke$arity$0 = function() {
    return 0
  };
  a.cljs$core$IFn$_invoke$arity$1 = function(a) {
    return a
  };
  a.cljs$core$IFn$_invoke$arity$2 = function(a, b) {
    return a + b
  };
  a.cljs$core$IFn$_invoke$arity$variadic = b.cljs$core$IFn$_invoke$arity$variadic;
  return a
}();
cljs.core.unchecked_dec = function(a) {
  return a - 1
};
cljs.core.unchecked_dec_int = function(a) {
  return a - 1
};
cljs.core.unchecked_divide_int = function() {
  var a = null, b = function(b) {
    return a.call(null, 1, b)
  }, c = function() {
    var b = function(b, c, d) {
      return cljs.core.reduce.call(null, a, a.call(null, b, c), d)
    }, c = function(a, c, e) {
      var l = null;
      2 < arguments.length && (l = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2), 0));
      return b.call(this, a, c, l)
    };
    c.cljs$lang$maxFixedArity = 2;
    c.cljs$lang$applyTo = function(a) {
      var c = cljs.core.first(a);
      a = cljs.core.next(a);
      var e = cljs.core.first(a);
      a = cljs.core.rest(a);
      return b(c, e, a)
    };
    c.cljs$core$IFn$_invoke$arity$variadic = b;
    return c
  }(), a = function(a, e, f) {
    switch(arguments.length) {
      case 1:
        return b.call(this, a);
      case 2:
        return a / e;
      default:
        return c.cljs$core$IFn$_invoke$arity$variadic(a, e, cljs.core.array_seq(arguments, 2))
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$lang$maxFixedArity = 2;
  a.cljs$lang$applyTo = c.cljs$lang$applyTo;
  a.cljs$core$IFn$_invoke$arity$1 = b;
  a.cljs$core$IFn$_invoke$arity$2 = function(a, b) {
    return a / b
  };
  a.cljs$core$IFn$_invoke$arity$variadic = c.cljs$core$IFn$_invoke$arity$variadic;
  return a
}();
cljs.core.unchecked_inc = function(a) {
  return a + 1
};
cljs.core.unchecked_inc_int = function(a) {
  return a + 1
};
cljs.core.unchecked_multiply = function() {
  var a = null, b = function() {
    var b = function(b, c, d) {
      return cljs.core.reduce.call(null, a, b * c, d)
    }, d = function(a, d, g) {
      var h = null;
      2 < arguments.length && (h = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2), 0));
      return b.call(this, a, d, h)
    };
    d.cljs$lang$maxFixedArity = 2;
    d.cljs$lang$applyTo = function(a) {
      var d = cljs.core.first(a);
      a = cljs.core.next(a);
      var g = cljs.core.first(a);
      a = cljs.core.rest(a);
      return b(d, g, a)
    };
    d.cljs$core$IFn$_invoke$arity$variadic = b;
    return d
  }(), a = function(a, d, e) {
    switch(arguments.length) {
      case 0:
        return 1;
      case 1:
        return a;
      case 2:
        return a * d;
      default:
        return b.cljs$core$IFn$_invoke$arity$variadic(a, d, cljs.core.array_seq(arguments, 2))
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$lang$maxFixedArity = 2;
  a.cljs$lang$applyTo = b.cljs$lang$applyTo;
  a.cljs$core$IFn$_invoke$arity$0 = function() {
    return 1
  };
  a.cljs$core$IFn$_invoke$arity$1 = function(a) {
    return a
  };
  a.cljs$core$IFn$_invoke$arity$2 = function(a, b) {
    return a * b
  };
  a.cljs$core$IFn$_invoke$arity$variadic = b.cljs$core$IFn$_invoke$arity$variadic;
  return a
}();
cljs.core.unchecked_multiply_int = function() {
  var a = null, b = function() {
    var b = function(b, c, d) {
      return cljs.core.reduce.call(null, a, b * c, d)
    }, d = function(a, d, g) {
      var h = null;
      2 < arguments.length && (h = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2), 0));
      return b.call(this, a, d, h)
    };
    d.cljs$lang$maxFixedArity = 2;
    d.cljs$lang$applyTo = function(a) {
      var d = cljs.core.first(a);
      a = cljs.core.next(a);
      var g = cljs.core.first(a);
      a = cljs.core.rest(a);
      return b(d, g, a)
    };
    d.cljs$core$IFn$_invoke$arity$variadic = b;
    return d
  }(), a = function(a, d, e) {
    switch(arguments.length) {
      case 0:
        return 1;
      case 1:
        return a;
      case 2:
        return a * d;
      default:
        return b.cljs$core$IFn$_invoke$arity$variadic(a, d, cljs.core.array_seq(arguments, 2))
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$lang$maxFixedArity = 2;
  a.cljs$lang$applyTo = b.cljs$lang$applyTo;
  a.cljs$core$IFn$_invoke$arity$0 = function() {
    return 1
  };
  a.cljs$core$IFn$_invoke$arity$1 = function(a) {
    return a
  };
  a.cljs$core$IFn$_invoke$arity$2 = function(a, b) {
    return a * b
  };
  a.cljs$core$IFn$_invoke$arity$variadic = b.cljs$core$IFn$_invoke$arity$variadic;
  return a
}();
cljs.core.unchecked_negate = function(a) {
  return-a
};
cljs.core.unchecked_negate_int = function(a) {
  return-a
};
cljs.core.unchecked_remainder_int = function(a, b) {
  return cljs.core.mod.call(null, a, b)
};
cljs.core.unchecked_substract = function() {
  var a = null, b = function() {
    var b = function(b, c, d) {
      return cljs.core.reduce.call(null, a, b - c, d)
    }, d = function(a, d, g) {
      var h = null;
      2 < arguments.length && (h = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2), 0));
      return b.call(this, a, d, h)
    };
    d.cljs$lang$maxFixedArity = 2;
    d.cljs$lang$applyTo = function(a) {
      var d = cljs.core.first(a);
      a = cljs.core.next(a);
      var g = cljs.core.first(a);
      a = cljs.core.rest(a);
      return b(d, g, a)
    };
    d.cljs$core$IFn$_invoke$arity$variadic = b;
    return d
  }(), a = function(a, d, e) {
    switch(arguments.length) {
      case 1:
        return-a;
      case 2:
        return a - d;
      default:
        return b.cljs$core$IFn$_invoke$arity$variadic(a, d, cljs.core.array_seq(arguments, 2))
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$lang$maxFixedArity = 2;
  a.cljs$lang$applyTo = b.cljs$lang$applyTo;
  a.cljs$core$IFn$_invoke$arity$1 = function(a) {
    return-a
  };
  a.cljs$core$IFn$_invoke$arity$2 = function(a, b) {
    return a - b
  };
  a.cljs$core$IFn$_invoke$arity$variadic = b.cljs$core$IFn$_invoke$arity$variadic;
  return a
}();
cljs.core.unchecked_substract_int = function() {
  var a = null, b = function() {
    var b = function(b, c, d) {
      return cljs.core.reduce.call(null, a, b - c, d)
    }, d = function(a, d, g) {
      var h = null;
      2 < arguments.length && (h = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2), 0));
      return b.call(this, a, d, h)
    };
    d.cljs$lang$maxFixedArity = 2;
    d.cljs$lang$applyTo = function(a) {
      var d = cljs.core.first(a);
      a = cljs.core.next(a);
      var g = cljs.core.first(a);
      a = cljs.core.rest(a);
      return b(d, g, a)
    };
    d.cljs$core$IFn$_invoke$arity$variadic = b;
    return d
  }(), a = function(a, d, e) {
    switch(arguments.length) {
      case 1:
        return-a;
      case 2:
        return a - d;
      default:
        return b.cljs$core$IFn$_invoke$arity$variadic(a, d, cljs.core.array_seq(arguments, 2))
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$lang$maxFixedArity = 2;
  a.cljs$lang$applyTo = b.cljs$lang$applyTo;
  a.cljs$core$IFn$_invoke$arity$1 = function(a) {
    return-a
  };
  a.cljs$core$IFn$_invoke$arity$2 = function(a, b) {
    return a - b
  };
  a.cljs$core$IFn$_invoke$arity$variadic = b.cljs$core$IFn$_invoke$arity$variadic;
  return a
}();
cljs.core.fix = function(a) {
  return 0 <= a ? Math.floor.call(null, a) : Math.ceil.call(null, a)
};
cljs.core.int$ = function(a) {
  return a | 0
};
cljs.core.unchecked_int = function(a) {
  return cljs.core.fix.call(null, a)
};
cljs.core.long$ = function(a) {
  return cljs.core.fix.call(null, a)
};
cljs.core.unchecked_long = function(a) {
  return cljs.core.fix.call(null, a)
};
cljs.core.booleans = function(a) {
  return a
};
cljs.core.bytes = function(a) {
  return a
};
cljs.core.chars = function(a) {
  return a
};
cljs.core.shorts = function(a) {
  return a
};
cljs.core.ints = function(a) {
  return a
};
cljs.core.floats = function(a) {
  return a
};
cljs.core.doubles = function(a) {
  return a
};
cljs.core.longs = function(a) {
  return a
};
cljs.core.js_mod = function(a, b) {
  return a % b
};
cljs.core.mod = function(a, b) {
  return(a % b + b) % b
};
cljs.core.quot = function(a, b) {
  return cljs.core.fix.call(null, (a - a % b) / b)
};
cljs.core.rem = function(a, b) {
  var c = cljs.core.quot.call(null, a, b);
  return a - b * c
};
cljs.core.rand = function() {
  var a = null, b = function() {
    return Math.random.call(null)
  }, c = function(b) {
    return b * a.call(null)
  }, a = function(a) {
    switch(arguments.length) {
      case 0:
        return b.call(this);
      case 1:
        return c.call(this, a)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$core$IFn$_invoke$arity$0 = b;
  a.cljs$core$IFn$_invoke$arity$1 = c;
  return a
}();
cljs.core.rand_int = function(a) {
  return cljs.core.fix.call(null, cljs.core.rand.call(null, a))
};
cljs.core.bit_xor = function(a, b) {
  return a ^ b
};
cljs.core.bit_and = function(a, b) {
  return a & b
};
cljs.core.bit_or = function(a, b) {
  return a | b
};
cljs.core.bit_and_not = function(a, b) {
  return a & ~b
};
cljs.core.bit_clear = function(a, b) {
  return a & ~(1 << b)
};
cljs.core.bit_flip = function(a, b) {
  return a ^ 1 << b
};
cljs.core.bit_not = function(a) {
  return~a
};
cljs.core.bit_set = function(a, b) {
  return a | 1 << b
};
cljs.core.bit_test = function(a, b) {
  return 0 != (a & 1 << b)
};
cljs.core.bit_shift_left = function(a, b) {
  return a << b
};
cljs.core.bit_shift_right = function(a, b) {
  return a >> b
};
cljs.core.bit_shift_right_zero_fill = function(a, b) {
  return a >>> b
};
cljs.core.bit_count = function(a) {
  a -= a >> 1 & 1431655765;
  a = (a & 858993459) + (a >> 2 & 858993459);
  return 16843009 * (a + (a >> 4) & 252645135) >> 24
};
cljs.core._EQ__EQ_ = function() {
  var a = null, b = function(a, b) {
    return cljs.core._equiv.call(null, a, b)
  }, c = function() {
    var b = function(b, c, d) {
      for(;;) {
        if(a.call(null, b, c)) {
          if(cljs.core.next.call(null, d)) {
            b = c, c = cljs.core.first.call(null, d), d = cljs.core.next.call(null, d)
          }else {
            return a.call(null, c, cljs.core.first.call(null, d))
          }
        }else {
          return!1
        }
      }
    }, c = function(a, c, e) {
      var l = null;
      2 < arguments.length && (l = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2), 0));
      return b.call(this, a, c, l)
    };
    c.cljs$lang$maxFixedArity = 2;
    c.cljs$lang$applyTo = function(a) {
      var c = cljs.core.first(a);
      a = cljs.core.next(a);
      var e = cljs.core.first(a);
      a = cljs.core.rest(a);
      return b(c, e, a)
    };
    c.cljs$core$IFn$_invoke$arity$variadic = b;
    return c
  }(), a = function(a, e, f) {
    switch(arguments.length) {
      case 1:
        return!0;
      case 2:
        return b.call(this, a, e);
      default:
        return c.cljs$core$IFn$_invoke$arity$variadic(a, e, cljs.core.array_seq(arguments, 2))
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$lang$maxFixedArity = 2;
  a.cljs$lang$applyTo = c.cljs$lang$applyTo;
  a.cljs$core$IFn$_invoke$arity$1 = function(a) {
    return!0
  };
  a.cljs$core$IFn$_invoke$arity$2 = b;
  a.cljs$core$IFn$_invoke$arity$variadic = c.cljs$core$IFn$_invoke$arity$variadic;
  return a
}();
cljs.core.pos_QMARK_ = function(a) {
  return 0 < a
};
cljs.core.zero_QMARK_ = function(a) {
  return 0 === a
};
cljs.core.neg_QMARK_ = function(a) {
  return 0 > a
};
cljs.core.nthnext = function(a, b) {
  for(var c = b, d = cljs.core.seq.call(null, a);;) {
    if(d && 0 < c) {
      c -= 1, d = cljs.core.next.call(null, d)
    }else {
      return d
    }
  }
};
cljs.core.str = function() {
  var a = null, b = function(a) {
    return null == a ? "" : a.toString()
  }, c = function() {
    var b = function(b, c) {
      for(var d = new goog.string.StringBuffer(a.call(null, b)), e = c;;) {
        if(cljs.core.truth_(e)) {
          d = d.append(a.call(null, cljs.core.first.call(null, e))), e = cljs.core.next.call(null, e)
        }else {
          return d.toString()
        }
      }
    }, c = function(a, c) {
      var e = null;
      1 < arguments.length && (e = cljs.core.array_seq(Array.prototype.slice.call(arguments, 1), 0));
      return b.call(this, a, e)
    };
    c.cljs$lang$maxFixedArity = 1;
    c.cljs$lang$applyTo = function(a) {
      var c = cljs.core.first(a);
      a = cljs.core.rest(a);
      return b(c, a)
    };
    c.cljs$core$IFn$_invoke$arity$variadic = b;
    return c
  }(), a = function(a, e) {
    switch(arguments.length) {
      case 0:
        return"";
      case 1:
        return b.call(this, a);
      default:
        return c.cljs$core$IFn$_invoke$arity$variadic(a, cljs.core.array_seq(arguments, 1))
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$lang$maxFixedArity = 1;
  a.cljs$lang$applyTo = c.cljs$lang$applyTo;
  a.cljs$core$IFn$_invoke$arity$0 = function() {
    return""
  };
  a.cljs$core$IFn$_invoke$arity$1 = b;
  a.cljs$core$IFn$_invoke$arity$variadic = c.cljs$core$IFn$_invoke$arity$variadic;
  return a
}();
cljs.core.subs = function() {
  var a = null, a = function(a, c, d) {
    switch(arguments.length) {
      case 2:
        return a.substring(c);
      case 3:
        return a.substring(c, d)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$core$IFn$_invoke$arity$2 = function(a, c) {
    return a.substring(c)
  };
  a.cljs$core$IFn$_invoke$arity$3 = function(a, c, d) {
    return a.substring(c, d)
  };
  return a
}();
cljs.core.equiv_sequential = function(a, b) {
  return cljs.core.boolean$.call(null, cljs.core.sequential_QMARK_.call(null, b) ? function() {
    for(var c = cljs.core.seq.call(null, a), d = cljs.core.seq.call(null, b);;) {
      if(null == c) {
        return null == d
      }
      if(null == d) {
        return!1
      }
      if(cljs.core._EQ_.call(null, cljs.core.first.call(null, c), cljs.core.first.call(null, d))) {
        c = cljs.core.next.call(null, c), d = cljs.core.next.call(null, d)
      }else {
        return new cljs.core.Keyword(null, "else", "else", 1017020587) ? !1 : null
      }
    }
  }() : null)
};
cljs.core.hash_combine = function(a, b) {
  return a ^ b + 2654435769 + (a << 6) + (a >> 2)
};
cljs.core.hash_coll = function(a) {
  if(cljs.core.seq.call(null, a)) {
    var b = cljs.core.hash.call(null, cljs.core.first.call(null, a));
    for(a = cljs.core.next.call(null, a);;) {
      if(null == a) {
        return b
      }
      b = cljs.core.hash_combine.call(null, b, cljs.core.hash.call(null, cljs.core.first.call(null, a)));
      a = cljs.core.next.call(null, a)
    }
  }else {
    return 0
  }
};
cljs.core.hash_imap = function(a) {
  var b = 0;
  for(a = cljs.core.seq.call(null, a);;) {
    if(a) {
      var c = cljs.core.first.call(null, a), b = (b + (cljs.core.hash.call(null, cljs.core.key.call(null, c)) ^ cljs.core.hash.call(null, cljs.core.val.call(null, c)))) % 4503599627370496;
      a = cljs.core.next.call(null, a)
    }else {
      return b
    }
  }
};
cljs.core.hash_iset = function(a) {
  var b = 0;
  for(a = cljs.core.seq.call(null, a);;) {
    if(a) {
      var c = cljs.core.first.call(null, a), b = (b + cljs.core.hash.call(null, c)) % 4503599627370496;
      a = cljs.core.next.call(null, a)
    }else {
      return b
    }
  }
};
cljs.core.extend_object_BANG_ = function(a, b) {
  for(var c = cljs.core.seq.call(null, b), d = null, e = 0, f = 0;;) {
    if(f < e) {
      var g = cljs.core._nth.call(null, d, f), h = cljs.core.nth.call(null, g, 0, null), g = cljs.core.nth.call(null, g, 1, null), h = cljs.core.name.call(null, h);
      a[h] = g;
      f += 1
    }else {
      if(c = cljs.core.seq.call(null, c)) {
        cljs.core.chunked_seq_QMARK_.call(null, c) ? (e = cljs.core.chunk_first.call(null, c), c = cljs.core.chunk_rest.call(null, c), d = e, e = cljs.core.count.call(null, e)) : (e = cljs.core.first.call(null, c), d = cljs.core.nth.call(null, e, 0, null), e = cljs.core.nth.call(null, e, 1, null), d = cljs.core.name.call(null, d), a[d] = e, c = cljs.core.next.call(null, c), d = null, e = 0), f = 0
      }else {
        break
      }
    }
  }
  return a
};
cljs.core.List = function(a, b, c, d, e) {
  this.meta = a;
  this.first = b;
  this.rest = c;
  this.count = d;
  this.__hash = e;
  this.cljs$lang$protocol_mask$partition1$ = 0;
  this.cljs$lang$protocol_mask$partition0$ = 65937646
};
cljs.core.List.cljs$lang$type = !0;
cljs.core.List.cljs$lang$ctorStr = "cljs.core/List";
cljs.core.List.cljs$lang$ctorPrWriter = function(a, b, c) {
  return cljs.core._write.call(null, b, "cljs.core/List")
};
cljs.core.List.prototype.cljs$core$IHash$_hash$arity$1 = function(a) {
  a = this.__hash;
  return null != a ? a : this.__hash = a = cljs.core.hash_coll.call(null, this)
};
cljs.core.List.prototype.cljs$core$INext$_next$arity$1 = function(a) {
  return 1 === this.count ? null : this.rest
};
cljs.core.List.prototype.cljs$core$ICollection$_conj$arity$2 = function(a, b) {
  return new cljs.core.List(this.meta, b, this, this.count + 1, null)
};
cljs.core.List.prototype.toString = function() {
  return cljs.core.pr_str_STAR_.call(null, this)
};
cljs.core.List.prototype.cljs$core$IReduce$_reduce$arity$2 = function(a, b) {
  return cljs.core.seq_reduce.call(null, b, this)
};
cljs.core.List.prototype.cljs$core$IReduce$_reduce$arity$3 = function(a, b, c) {
  return cljs.core.seq_reduce.call(null, b, c, this)
};
cljs.core.List.prototype.cljs$core$ISeqable$_seq$arity$1 = function(a) {
  return this
};
cljs.core.List.prototype.cljs$core$ICounted$_count$arity$1 = function(a) {
  return this.count
};
cljs.core.List.prototype.cljs$core$IStack$_peek$arity$1 = function(a) {
  return this.first
};
cljs.core.List.prototype.cljs$core$IStack$_pop$arity$1 = function(a) {
  return cljs.core._rest.call(null, this)
};
cljs.core.List.prototype.cljs$core$ISeq$_first$arity$1 = function(a) {
  return this.first
};
cljs.core.List.prototype.cljs$core$ISeq$_rest$arity$1 = function(a) {
  return 1 === this.count ? cljs.core.List.EMPTY : this.rest
};
cljs.core.List.prototype.cljs$core$IEquiv$_equiv$arity$2 = function(a, b) {
  return cljs.core.equiv_sequential.call(null, this, b)
};
cljs.core.List.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = function(a, b) {
  return new cljs.core.List(b, this.first, this.rest, this.count, this.__hash)
};
cljs.core.List.prototype.cljs$core$IMeta$_meta$arity$1 = function(a) {
  return this.meta
};
cljs.core.List.prototype.cljs$core$IEmptyableCollection$_empty$arity$1 = function(a) {
  return cljs.core.List.EMPTY
};
cljs.core.__GT_List = function(a, b, c, d, e) {
  return new cljs.core.List(a, b, c, d, e)
};
cljs.core.EmptyList = function(a) {
  this.meta = a;
  this.cljs$lang$protocol_mask$partition1$ = 0;
  this.cljs$lang$protocol_mask$partition0$ = 65937614
};
cljs.core.EmptyList.cljs$lang$type = !0;
cljs.core.EmptyList.cljs$lang$ctorStr = "cljs.core/EmptyList";
cljs.core.EmptyList.cljs$lang$ctorPrWriter = function(a, b, c) {
  return cljs.core._write.call(null, b, "cljs.core/EmptyList")
};
cljs.core.EmptyList.prototype.cljs$core$IHash$_hash$arity$1 = function(a) {
  return 0
};
cljs.core.EmptyList.prototype.cljs$core$INext$_next$arity$1 = function(a) {
  return null
};
cljs.core.EmptyList.prototype.cljs$core$ICollection$_conj$arity$2 = function(a, b) {
  return new cljs.core.List(this.meta, b, null, 1, null)
};
cljs.core.EmptyList.prototype.toString = function() {
  return cljs.core.pr_str_STAR_.call(null, this)
};
cljs.core.EmptyList.prototype.cljs$core$IReduce$_reduce$arity$2 = function(a, b) {
  return cljs.core.seq_reduce.call(null, b, this)
};
cljs.core.EmptyList.prototype.cljs$core$IReduce$_reduce$arity$3 = function(a, b, c) {
  return cljs.core.seq_reduce.call(null, b, c, this)
};
cljs.core.EmptyList.prototype.cljs$core$ISeqable$_seq$arity$1 = function(a) {
  return null
};
cljs.core.EmptyList.prototype.cljs$core$ICounted$_count$arity$1 = function(a) {
  return 0
};
cljs.core.EmptyList.prototype.cljs$core$IStack$_peek$arity$1 = function(a) {
  return null
};
cljs.core.EmptyList.prototype.cljs$core$IStack$_pop$arity$1 = function(a) {
  throw Error("Can't pop empty list");
};
cljs.core.EmptyList.prototype.cljs$core$ISeq$_first$arity$1 = function(a) {
  return null
};
cljs.core.EmptyList.prototype.cljs$core$ISeq$_rest$arity$1 = function(a) {
  return cljs.core.List.EMPTY
};
cljs.core.EmptyList.prototype.cljs$core$IEquiv$_equiv$arity$2 = function(a, b) {
  return cljs.core.equiv_sequential.call(null, this, b)
};
cljs.core.EmptyList.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = function(a, b) {
  return new cljs.core.EmptyList(b)
};
cljs.core.EmptyList.prototype.cljs$core$IMeta$_meta$arity$1 = function(a) {
  return this.meta
};
cljs.core.EmptyList.prototype.cljs$core$IEmptyableCollection$_empty$arity$1 = function(a) {
  return this
};
cljs.core.__GT_EmptyList = function(a) {
  return new cljs.core.EmptyList(a)
};
cljs.core.List.EMPTY = new cljs.core.EmptyList(null);
cljs.core.reversible_QMARK_ = function(a) {
  return a ? a.cljs$lang$protocol_mask$partition0$ & 134217728 || a.cljs$core$IReversible$ ? !0 : a.cljs$lang$protocol_mask$partition0$ ? !1 : cljs.core.native_satisfies_QMARK_.call(null, cljs.core.IReversible, a) : cljs.core.native_satisfies_QMARK_.call(null, cljs.core.IReversible, a)
};
cljs.core.rseq = function(a) {
  return cljs.core._rseq.call(null, a)
};
cljs.core.reverse = function(a) {
  return cljs.core.reversible_QMARK_.call(null, a) ? cljs.core.rseq.call(null, a) : cljs.core.reduce.call(null, cljs.core.conj, cljs.core.List.EMPTY, a)
};
cljs.core.list = function() {
  var a = function(a) {
    var b;
    if(a instanceof cljs.core.IndexedSeq) {
      b = a.arr
    }else {
      a: {
        for(b = [];;) {
          if(null != a) {
            b.push(cljs.core._first.call(null, a)), a = cljs.core._next.call(null, a)
          }else {
            break a
          }
        }
        b = void 0
      }
    }
    a = b.length;
    for(var e = cljs.core.List.EMPTY;;) {
      if(0 < a) {
        var f = a - 1, e = cljs.core._conj.call(null, e, b[a - 1]);
        a = f
      }else {
        return e
      }
    }
  }, b = function(b) {
    var d = null;
    0 < arguments.length && (d = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0), 0));
    return a.call(this, d)
  };
  b.cljs$lang$maxFixedArity = 0;
  b.cljs$lang$applyTo = function(b) {
    b = cljs.core.seq(b);
    return a(b)
  };
  b.cljs$core$IFn$_invoke$arity$variadic = a;
  return b
}();
cljs.core.Cons = function(a, b, c, d) {
  this.meta = a;
  this.first = b;
  this.rest = c;
  this.__hash = d;
  this.cljs$lang$protocol_mask$partition1$ = 0;
  this.cljs$lang$protocol_mask$partition0$ = 65929452
};
cljs.core.Cons.cljs$lang$type = !0;
cljs.core.Cons.cljs$lang$ctorStr = "cljs.core/Cons";
cljs.core.Cons.cljs$lang$ctorPrWriter = function(a, b, c) {
  return cljs.core._write.call(null, b, "cljs.core/Cons")
};
cljs.core.Cons.prototype.cljs$core$IHash$_hash$arity$1 = function(a) {
  a = this.__hash;
  return null != a ? a : this.__hash = a = cljs.core.hash_coll.call(null, this)
};
cljs.core.Cons.prototype.cljs$core$INext$_next$arity$1 = function(a) {
  return null == this.rest ? null : cljs.core.seq.call(null, this.rest)
};
cljs.core.Cons.prototype.cljs$core$ICollection$_conj$arity$2 = function(a, b) {
  return new cljs.core.Cons(null, b, this, this.__hash)
};
cljs.core.Cons.prototype.toString = function() {
  return cljs.core.pr_str_STAR_.call(null, this)
};
cljs.core.Cons.prototype.cljs$core$IReduce$_reduce$arity$2 = function(a, b) {
  return cljs.core.seq_reduce.call(null, b, this)
};
cljs.core.Cons.prototype.cljs$core$IReduce$_reduce$arity$3 = function(a, b, c) {
  return cljs.core.seq_reduce.call(null, b, c, this)
};
cljs.core.Cons.prototype.cljs$core$ISeqable$_seq$arity$1 = function(a) {
  return this
};
cljs.core.Cons.prototype.cljs$core$ISeq$_first$arity$1 = function(a) {
  return this.first
};
cljs.core.Cons.prototype.cljs$core$ISeq$_rest$arity$1 = function(a) {
  return null == this.rest ? cljs.core.List.EMPTY : this.rest
};
cljs.core.Cons.prototype.cljs$core$IEquiv$_equiv$arity$2 = function(a, b) {
  return cljs.core.equiv_sequential.call(null, this, b)
};
cljs.core.Cons.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = function(a, b) {
  return new cljs.core.Cons(b, this.first, this.rest, this.__hash)
};
cljs.core.Cons.prototype.cljs$core$IMeta$_meta$arity$1 = function(a) {
  return this.meta
};
cljs.core.Cons.prototype.cljs$core$IEmptyableCollection$_empty$arity$1 = function(a) {
  return cljs.core.with_meta.call(null, cljs.core.List.EMPTY, this.meta)
};
cljs.core.__GT_Cons = function(a, b, c, d) {
  return new cljs.core.Cons(a, b, c, d)
};
cljs.core.cons = function(a, b) {
  var c;
  c = (c = null == b) ? c : b ? b.cljs$lang$protocol_mask$partition0$ & 64 || b.cljs$core$ISeq$ ? !0 : !1 : !1;
  return c ? new cljs.core.Cons(null, a, b, null) : new cljs.core.Cons(null, a, cljs.core.seq.call(null, b), null)
};
cljs.core.list_QMARK_ = function(a) {
  return a ? a.cljs$lang$protocol_mask$partition0$ & 33554432 || a.cljs$core$IList$ ? !0 : a.cljs$lang$protocol_mask$partition0$ ? !1 : cljs.core.native_satisfies_QMARK_.call(null, cljs.core.IList, a) : cljs.core.native_satisfies_QMARK_.call(null, cljs.core.IList, a)
};
cljs.core.Keyword = function(a, b, c, d) {
  this.ns = a;
  this.name = b;
  this.fqn = c;
  this._hash = d;
  this.cljs$lang$protocol_mask$partition0$ = 2153775105;
  this.cljs$lang$protocol_mask$partition1$ = 4096
};
cljs.core.Keyword.cljs$lang$type = !0;
cljs.core.Keyword.cljs$lang$ctorStr = "cljs.core/Keyword";
cljs.core.Keyword.cljs$lang$ctorPrWriter = function(a, b, c) {
  return cljs.core._write.call(null, b, "cljs.core/Keyword")
};
cljs.core.Keyword.prototype.cljs$core$IPrintWithWriter$_pr_writer$arity$3 = function(a, b, c) {
  return cljs.core._write.call(null, b, [cljs.core.str(":"), cljs.core.str(this.fqn)].join(""))
};
cljs.core.Keyword.prototype.cljs$core$INamed$_name$arity$1 = function(a) {
  return this.name
};
cljs.core.Keyword.prototype.cljs$core$INamed$_namespace$arity$1 = function(a) {
  return this.ns
};
cljs.core.Keyword.prototype.cljs$core$IHash$_hash$arity$1 = function(a) {
  null == this._hash && (this._hash = cljs.core.hash_combine.call(null, cljs.core.hash.call(null, this.ns), cljs.core.hash.call(null, this.name)) + 2654435769);
  return this._hash
};
cljs.core.Keyword.prototype.call = function() {
  var a = null;
  return a = function(a, c, d) {
    switch(arguments.length) {
      case 2:
        return cljs.core.get.call(null, c, this);
      case 3:
        return cljs.core.get.call(null, c, this, d)
    }
    throw Error("Invalid arity: " + arguments.length);
  }
}();
cljs.core.Keyword.prototype.apply = function(a, b) {
  return this.call.apply(this, [this].concat(b.slice()))
};
cljs.core.Keyword.prototype.cljs$core$IFn$_invoke$arity$1 = function(a) {
  return cljs.core.get.call(null, a, this)
};
cljs.core.Keyword.prototype.cljs$core$IFn$_invoke$arity$2 = function(a, b) {
  return cljs.core.get.call(null, a, this, b)
};
cljs.core.Keyword.prototype.cljs$core$IEquiv$_equiv$arity$2 = function(a, b) {
  return b instanceof cljs.core.Keyword ? this.fqn === b.fqn : !1
};
cljs.core.Keyword.prototype.toString = function() {
  return[cljs.core.str(":"), cljs.core.str(this.fqn)].join("")
};
cljs.core.__GT_Keyword = function(a, b, c, d) {
  return new cljs.core.Keyword(a, b, c, d)
};
cljs.core.keyword_QMARK_ = function(a) {
  return a instanceof cljs.core.Keyword
};
cljs.core.keyword_identical_QMARK_ = function(a, b) {
  return a === b ? !0 : a instanceof cljs.core.Keyword && b instanceof cljs.core.Keyword ? a.fqn === b.fqn : !1
};
cljs.core.namespace = function(a) {
  if(a && (a.cljs$lang$protocol_mask$partition1$ & 4096 || a.cljs$core$INamed$)) {
    return cljs.core._namespace.call(null, a)
  }
  throw Error([cljs.core.str("Doesn't support namespace: "), cljs.core.str(a)].join(""));
};
cljs.core.keyword = function() {
  var a = null, b = function(a) {
    if(a instanceof cljs.core.Keyword) {
      return a
    }
    if(a instanceof cljs.core.Symbol) {
      return new cljs.core.Keyword(cljs.core.namespace.call(null, a), cljs.core.name.call(null, a), a.str, null)
    }
    if("string" === typeof a) {
      var b = a.split("/");
      return 2 === b.length ? new cljs.core.Keyword(b[0], b[1], a, null) : new cljs.core.Keyword(null, b[0], a, null)
    }
    return null
  }, c = function(a, b) {
    return new cljs.core.Keyword(a, b, [cljs.core.str(cljs.core.truth_(a) ? [cljs.core.str(a), cljs.core.str("/")].join("") : null), cljs.core.str(b)].join(""), null)
  }, a = function(a, e) {
    switch(arguments.length) {
      case 1:
        return b.call(this, a);
      case 2:
        return c.call(this, a, e)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$core$IFn$_invoke$arity$1 = b;
  a.cljs$core$IFn$_invoke$arity$2 = c;
  return a
}();
cljs.core.LazySeq = function(a, b, c, d) {
  this.meta = a;
  this.fn = b;
  this.s = c;
  this.__hash = d;
  this.cljs$lang$protocol_mask$partition1$ = 0;
  this.cljs$lang$protocol_mask$partition0$ = 32374988
};
cljs.core.LazySeq.cljs$lang$type = !0;
cljs.core.LazySeq.cljs$lang$ctorStr = "cljs.core/LazySeq";
cljs.core.LazySeq.cljs$lang$ctorPrWriter = function(a, b, c) {
  return cljs.core._write.call(null, b, "cljs.core/LazySeq")
};
cljs.core.LazySeq.prototype.cljs$core$IHash$_hash$arity$1 = function(a) {
  a = this.__hash;
  return null != a ? a : this.__hash = a = cljs.core.hash_coll.call(null, this)
};
cljs.core.LazySeq.prototype.cljs$core$INext$_next$arity$1 = function(a) {
  cljs.core._seq.call(null, this);
  return null == this.s ? null : cljs.core.next.call(null, this.s)
};
cljs.core.LazySeq.prototype.cljs$core$ICollection$_conj$arity$2 = function(a, b) {
  return cljs.core.cons.call(null, b, this)
};
cljs.core.LazySeq.prototype.toString = function() {
  return cljs.core.pr_str_STAR_.call(null, this)
};
cljs.core.LazySeq.prototype.sval = function() {
  null != this.fn && (this.s = this.fn.call(null), this.fn = null);
  return this.s
};
cljs.core.LazySeq.prototype.cljs$core$IReduce$_reduce$arity$2 = function(a, b) {
  return cljs.core.seq_reduce.call(null, b, this)
};
cljs.core.LazySeq.prototype.cljs$core$IReduce$_reduce$arity$3 = function(a, b, c) {
  return cljs.core.seq_reduce.call(null, b, c, this)
};
cljs.core.LazySeq.prototype.cljs$core$ISeqable$_seq$arity$1 = function(a) {
  this.sval();
  if(null == this.s) {
    return null
  }
  for(a = this.s;;) {
    if(a instanceof cljs.core.LazySeq) {
      a = a.sval()
    }else {
      return this.s = a, cljs.core.seq.call(null, this.s)
    }
  }
};
cljs.core.LazySeq.prototype.cljs$core$ISeq$_first$arity$1 = function(a) {
  cljs.core._seq.call(null, this);
  return null == this.s ? null : cljs.core.first.call(null, this.s)
};
cljs.core.LazySeq.prototype.cljs$core$ISeq$_rest$arity$1 = function(a) {
  cljs.core._seq.call(null, this);
  return null != this.s ? cljs.core.rest.call(null, this.s) : cljs.core.List.EMPTY
};
cljs.core.LazySeq.prototype.cljs$core$IEquiv$_equiv$arity$2 = function(a, b) {
  return cljs.core.equiv_sequential.call(null, this, b)
};
cljs.core.LazySeq.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = function(a, b) {
  return new cljs.core.LazySeq(b, this.fn, this.s, this.__hash)
};
cljs.core.LazySeq.prototype.cljs$core$IMeta$_meta$arity$1 = function(a) {
  return this.meta
};
cljs.core.LazySeq.prototype.cljs$core$IEmptyableCollection$_empty$arity$1 = function(a) {
  return cljs.core.with_meta.call(null, cljs.core.List.EMPTY, this.meta)
};
cljs.core.__GT_LazySeq = function(a, b, c, d) {
  return new cljs.core.LazySeq(a, b, c, d)
};
cljs.core.ChunkBuffer = function(a, b) {
  this.buf = a;
  this.end = b;
  this.cljs$lang$protocol_mask$partition1$ = 0;
  this.cljs$lang$protocol_mask$partition0$ = 2
};
cljs.core.ChunkBuffer.cljs$lang$type = !0;
cljs.core.ChunkBuffer.cljs$lang$ctorStr = "cljs.core/ChunkBuffer";
cljs.core.ChunkBuffer.cljs$lang$ctorPrWriter = function(a, b, c) {
  return cljs.core._write.call(null, b, "cljs.core/ChunkBuffer")
};
cljs.core.ChunkBuffer.prototype.cljs$core$ICounted$_count$arity$1 = function(a) {
  return this.end
};
cljs.core.ChunkBuffer.prototype.add = function(a) {
  this.buf[this.end] = a;
  return this.end += 1
};
cljs.core.ChunkBuffer.prototype.chunk = function(a) {
  a = new cljs.core.ArrayChunk(this.buf, 0, this.end);
  this.buf = null;
  return a
};
cljs.core.__GT_ChunkBuffer = function(a, b) {
  return new cljs.core.ChunkBuffer(a, b)
};
cljs.core.chunk_buffer = function(a) {
  return new cljs.core.ChunkBuffer(Array(a), 0)
};
cljs.core.ArrayChunk = function(a, b, c) {
  this.arr = a;
  this.off = b;
  this.end = c;
  this.cljs$lang$protocol_mask$partition1$ = 0;
  this.cljs$lang$protocol_mask$partition0$ = 524306
};
cljs.core.ArrayChunk.cljs$lang$type = !0;
cljs.core.ArrayChunk.cljs$lang$ctorStr = "cljs.core/ArrayChunk";
cljs.core.ArrayChunk.cljs$lang$ctorPrWriter = function(a, b, c) {
  return cljs.core._write.call(null, b, "cljs.core/ArrayChunk")
};
cljs.core.ArrayChunk.prototype.cljs$core$IReduce$_reduce$arity$2 = function(a, b) {
  return cljs.core.array_reduce.call(null, this.arr, b, this.arr[this.off], this.off + 1)
};
cljs.core.ArrayChunk.prototype.cljs$core$IReduce$_reduce$arity$3 = function(a, b, c) {
  return cljs.core.array_reduce.call(null, this.arr, b, c, this.off)
};
cljs.core.ArrayChunk.prototype.cljs$core$IChunk$ = !0;
cljs.core.ArrayChunk.prototype.cljs$core$IChunk$_drop_first$arity$1 = function(a) {
  if(this.off === this.end) {
    throw Error("-drop-first of empty chunk");
  }
  return new cljs.core.ArrayChunk(this.arr, this.off + 1, this.end)
};
cljs.core.ArrayChunk.prototype.cljs$core$IIndexed$_nth$arity$2 = function(a, b) {
  return this.arr[this.off + b]
};
cljs.core.ArrayChunk.prototype.cljs$core$IIndexed$_nth$arity$3 = function(a, b, c) {
  return 0 <= b && b < this.end - this.off ? this.arr[this.off + b] : c
};
cljs.core.ArrayChunk.prototype.cljs$core$ICounted$_count$arity$1 = function(a) {
  return this.end - this.off
};
cljs.core.__GT_ArrayChunk = function(a, b, c) {
  return new cljs.core.ArrayChunk(a, b, c)
};
cljs.core.array_chunk = function() {
  var a = null, b = function(a) {
    return new cljs.core.ArrayChunk(a, 0, a.length)
  }, c = function(a, b) {
    return new cljs.core.ArrayChunk(a, b, a.length)
  }, d = function(a, b, c) {
    return new cljs.core.ArrayChunk(a, b, c)
  }, a = function(a, f, g) {
    switch(arguments.length) {
      case 1:
        return b.call(this, a);
      case 2:
        return c.call(this, a, f);
      case 3:
        return d.call(this, a, f, g)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$core$IFn$_invoke$arity$1 = b;
  a.cljs$core$IFn$_invoke$arity$2 = c;
  a.cljs$core$IFn$_invoke$arity$3 = d;
  return a
}();
cljs.core.ChunkedCons = function(a, b, c, d) {
  this.chunk = a;
  this.more = b;
  this.meta = c;
  this.__hash = d;
  this.cljs$lang$protocol_mask$partition0$ = 31850732;
  this.cljs$lang$protocol_mask$partition1$ = 1536
};
cljs.core.ChunkedCons.cljs$lang$type = !0;
cljs.core.ChunkedCons.cljs$lang$ctorStr = "cljs.core/ChunkedCons";
cljs.core.ChunkedCons.cljs$lang$ctorPrWriter = function(a, b, c) {
  return cljs.core._write.call(null, b, "cljs.core/ChunkedCons")
};
cljs.core.ChunkedCons.prototype.cljs$core$IHash$_hash$arity$1 = function(a) {
  a = this.__hash;
  return null != a ? a : this.__hash = a = cljs.core.hash_coll.call(null, this)
};
cljs.core.ChunkedCons.prototype.cljs$core$INext$_next$arity$1 = function(a) {
  if(1 < cljs.core._count.call(null, this.chunk)) {
    return new cljs.core.ChunkedCons(cljs.core._drop_first.call(null, this.chunk), this.more, this.meta, null)
  }
  a = cljs.core._seq.call(null, this.more);
  return null == a ? null : a
};
cljs.core.ChunkedCons.prototype.cljs$core$ICollection$_conj$arity$2 = function(a, b) {
  return cljs.core.cons.call(null, b, this)
};
cljs.core.ChunkedCons.prototype.toString = function() {
  return cljs.core.pr_str_STAR_.call(null, this)
};
cljs.core.ChunkedCons.prototype.cljs$core$ISeqable$_seq$arity$1 = function(a) {
  return this
};
cljs.core.ChunkedCons.prototype.cljs$core$ISeq$_first$arity$1 = function(a) {
  return cljs.core._nth.call(null, this.chunk, 0)
};
cljs.core.ChunkedCons.prototype.cljs$core$ISeq$_rest$arity$1 = function(a) {
  return 1 < cljs.core._count.call(null, this.chunk) ? new cljs.core.ChunkedCons(cljs.core._drop_first.call(null, this.chunk), this.more, this.meta, null) : null == this.more ? cljs.core.List.EMPTY : this.more
};
cljs.core.ChunkedCons.prototype.cljs$core$IChunkedNext$_chunked_next$arity$1 = function(a) {
  return null == this.more ? null : this.more
};
cljs.core.ChunkedCons.prototype.cljs$core$IEquiv$_equiv$arity$2 = function(a, b) {
  return cljs.core.equiv_sequential.call(null, this, b)
};
cljs.core.ChunkedCons.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = function(a, b) {
  return new cljs.core.ChunkedCons(this.chunk, this.more, b, this.__hash)
};
cljs.core.ChunkedCons.prototype.cljs$core$IMeta$_meta$arity$1 = function(a) {
  return this.meta
};
cljs.core.ChunkedCons.prototype.cljs$core$IEmptyableCollection$_empty$arity$1 = function(a) {
  return cljs.core.with_meta.call(null, cljs.core.List.EMPTY, this.meta)
};
cljs.core.ChunkedCons.prototype.cljs$core$IChunkedSeq$_chunked_first$arity$1 = function(a) {
  return this.chunk
};
cljs.core.ChunkedCons.prototype.cljs$core$IChunkedSeq$_chunked_rest$arity$1 = function(a) {
  return null == this.more ? cljs.core.List.EMPTY : this.more
};
cljs.core.__GT_ChunkedCons = function(a, b, c, d) {
  return new cljs.core.ChunkedCons(a, b, c, d)
};
cljs.core.chunk_cons = function(a, b) {
  return 0 === cljs.core._count.call(null, a) ? b : new cljs.core.ChunkedCons(a, b, null, null)
};
cljs.core.chunk_append = function(a, b) {
  return a.add(b)
};
cljs.core.chunk = function(a) {
  return a.chunk()
};
cljs.core.chunk_first = function(a) {
  return cljs.core._chunked_first.call(null, a)
};
cljs.core.chunk_rest = function(a) {
  return cljs.core._chunked_rest.call(null, a)
};
cljs.core.chunk_next = function(a) {
  return a && (a.cljs$lang$protocol_mask$partition1$ & 1024 || a.cljs$core$IChunkedNext$) ? cljs.core._chunked_next.call(null, a) : cljs.core.seq.call(null, cljs.core._chunked_rest.call(null, a))
};
cljs.core.to_array = function(a) {
  for(var b = [];;) {
    if(cljs.core.seq.call(null, a)) {
      b.push(cljs.core.first.call(null, a)), a = cljs.core.next.call(null, a)
    }else {
      return b
    }
  }
};
cljs.core.to_array_2d = function(a) {
  var b = Array(cljs.core.count.call(null, a)), c = 0;
  for(a = cljs.core.seq.call(null, a);;) {
    if(a) {
      b[c] = cljs.core.to_array.call(null, cljs.core.first.call(null, a)), c += 1, a = cljs.core.next.call(null, a)
    }else {
      break
    }
  }
  return b
};
cljs.core.int_array = function() {
  var a = null, b = function(b) {
    return"number" === typeof b ? a.call(null, b, null) : cljs.core.into_array.call(null, b)
  }, c = function(a, b) {
    var c = Array(a);
    if(cljs.core.seq_QMARK_.call(null, b)) {
      for(var g = 0, h = cljs.core.seq.call(null, b);;) {
        if(h && g < a) {
          c[g] = cljs.core.first.call(null, h), g += 1, h = cljs.core.next.call(null, h)
        }else {
          return c
        }
      }
    }else {
      for(g = 0;;) {
        if(g < a) {
          c[g] = b, g += 1
        }else {
          break
        }
      }
      return c
    }
  }, a = function(a, e) {
    switch(arguments.length) {
      case 1:
        return b.call(this, a);
      case 2:
        return c.call(this, a, e)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$core$IFn$_invoke$arity$1 = b;
  a.cljs$core$IFn$_invoke$arity$2 = c;
  return a
}();
cljs.core.long_array = function() {
  var a = null, b = function(b) {
    return"number" === typeof b ? a.call(null, b, null) : cljs.core.into_array.call(null, b)
  }, c = function(a, b) {
    var c = Array(a);
    if(cljs.core.seq_QMARK_.call(null, b)) {
      for(var g = 0, h = cljs.core.seq.call(null, b);;) {
        if(h && g < a) {
          c[g] = cljs.core.first.call(null, h), g += 1, h = cljs.core.next.call(null, h)
        }else {
          return c
        }
      }
    }else {
      for(g = 0;;) {
        if(g < a) {
          c[g] = b, g += 1
        }else {
          break
        }
      }
      return c
    }
  }, a = function(a, e) {
    switch(arguments.length) {
      case 1:
        return b.call(this, a);
      case 2:
        return c.call(this, a, e)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$core$IFn$_invoke$arity$1 = b;
  a.cljs$core$IFn$_invoke$arity$2 = c;
  return a
}();
cljs.core.double_array = function() {
  var a = null, b = function(b) {
    return"number" === typeof b ? a.call(null, b, null) : cljs.core.into_array.call(null, b)
  }, c = function(a, b) {
    var c = Array(a);
    if(cljs.core.seq_QMARK_.call(null, b)) {
      for(var g = 0, h = cljs.core.seq.call(null, b);;) {
        if(h && g < a) {
          c[g] = cljs.core.first.call(null, h), g += 1, h = cljs.core.next.call(null, h)
        }else {
          return c
        }
      }
    }else {
      for(g = 0;;) {
        if(g < a) {
          c[g] = b, g += 1
        }else {
          break
        }
      }
      return c
    }
  }, a = function(a, e) {
    switch(arguments.length) {
      case 1:
        return b.call(this, a);
      case 2:
        return c.call(this, a, e)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$core$IFn$_invoke$arity$1 = b;
  a.cljs$core$IFn$_invoke$arity$2 = c;
  return a
}();
cljs.core.object_array = function() {
  var a = null, b = function(b) {
    return"number" === typeof b ? a.call(null, b, null) : cljs.core.into_array.call(null, b)
  }, c = function(a, b) {
    var c = Array(a);
    if(cljs.core.seq_QMARK_.call(null, b)) {
      for(var g = 0, h = cljs.core.seq.call(null, b);;) {
        if(h && g < a) {
          c[g] = cljs.core.first.call(null, h), g += 1, h = cljs.core.next.call(null, h)
        }else {
          return c
        }
      }
    }else {
      for(g = 0;;) {
        if(g < a) {
          c[g] = b, g += 1
        }else {
          break
        }
      }
      return c
    }
  }, a = function(a, e) {
    switch(arguments.length) {
      case 1:
        return b.call(this, a);
      case 2:
        return c.call(this, a, e)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$core$IFn$_invoke$arity$1 = b;
  a.cljs$core$IFn$_invoke$arity$2 = c;
  return a
}();
cljs.core.bounded_count = function(a, b) {
  if(cljs.core.counted_QMARK_.call(null, a)) {
    return cljs.core.count.call(null, a)
  }
  for(var c = a, d = b, e = 0;;) {
    if(0 < d && cljs.core.seq.call(null, c)) {
      c = cljs.core.next.call(null, c), d -= 1, e += 1
    }else {
      return e
    }
  }
};
cljs.core.spread = function spread(b) {
  return null == b ? null : null == cljs.core.next.call(null, b) ? cljs.core.seq.call(null, cljs.core.first.call(null, b)) : new cljs.core.Keyword(null, "else", "else", 1017020587) ? cljs.core.cons.call(null, cljs.core.first.call(null, b), spread.call(null, cljs.core.next.call(null, b))) : null
};
cljs.core.concat = function() {
  var a = null, b = function() {
    return new cljs.core.LazySeq(null, function() {
      return null
    }, null, null)
  }, c = function(a) {
    return new cljs.core.LazySeq(null, function() {
      return a
    }, null, null)
  }, d = function(b, c) {
    return new cljs.core.LazySeq(null, function() {
      var d = cljs.core.seq.call(null, b);
      return d ? cljs.core.chunked_seq_QMARK_.call(null, d) ? cljs.core.chunk_cons.call(null, cljs.core.chunk_first.call(null, d), a.call(null, cljs.core.chunk_rest.call(null, d), c)) : cljs.core.cons.call(null, cljs.core.first.call(null, d), a.call(null, cljs.core.rest.call(null, d), c)) : c
    }, null, null)
  }, e = function() {
    var b = function(b, c, d) {
      return function n(a, b) {
        return new cljs.core.LazySeq(null, function() {
          var c = cljs.core.seq.call(null, a);
          return c ? cljs.core.chunked_seq_QMARK_.call(null, c) ? cljs.core.chunk_cons.call(null, cljs.core.chunk_first.call(null, c), n.call(null, cljs.core.chunk_rest.call(null, c), b)) : cljs.core.cons.call(null, cljs.core.first.call(null, c), n.call(null, cljs.core.rest.call(null, c), b)) : cljs.core.truth_(b) ? n.call(null, cljs.core.first.call(null, b), cljs.core.next.call(null, b)) : null
        }, null, null)
      }.call(null, a.call(null, b, c), d)
    }, c = function(a, c, d) {
      var e = null;
      2 < arguments.length && (e = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2), 0));
      return b.call(this, a, c, e)
    };
    c.cljs$lang$maxFixedArity = 2;
    c.cljs$lang$applyTo = function(a) {
      var c = cljs.core.first(a);
      a = cljs.core.next(a);
      var d = cljs.core.first(a);
      a = cljs.core.rest(a);
      return b(c, d, a)
    };
    c.cljs$core$IFn$_invoke$arity$variadic = b;
    return c
  }(), a = function(a, g, h) {
    switch(arguments.length) {
      case 0:
        return b.call(this);
      case 1:
        return c.call(this, a);
      case 2:
        return d.call(this, a, g);
      default:
        return e.cljs$core$IFn$_invoke$arity$variadic(a, g, cljs.core.array_seq(arguments, 2))
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$lang$maxFixedArity = 2;
  a.cljs$lang$applyTo = e.cljs$lang$applyTo;
  a.cljs$core$IFn$_invoke$arity$0 = b;
  a.cljs$core$IFn$_invoke$arity$1 = c;
  a.cljs$core$IFn$_invoke$arity$2 = d;
  a.cljs$core$IFn$_invoke$arity$variadic = e.cljs$core$IFn$_invoke$arity$variadic;
  return a
}();
cljs.core.list_STAR_ = function() {
  var a = null, b = function(a) {
    return cljs.core.seq.call(null, a)
  }, c = function(a, b) {
    return cljs.core.cons.call(null, a, b)
  }, d = function(a, b, c) {
    return cljs.core.cons.call(null, a, cljs.core.cons.call(null, b, c))
  }, e = function(a, b, c, d) {
    return cljs.core.cons.call(null, a, cljs.core.cons.call(null, b, cljs.core.cons.call(null, c, d)))
  }, f = function() {
    var a = function(a, b, c, d, e) {
      return cljs.core.cons.call(null, a, cljs.core.cons.call(null, b, cljs.core.cons.call(null, c, cljs.core.cons.call(null, d, cljs.core.spread.call(null, e)))))
    }, b = function(b, c, d, e, f) {
      var h = null;
      4 < arguments.length && (h = cljs.core.array_seq(Array.prototype.slice.call(arguments, 4), 0));
      return a.call(this, b, c, d, e, h)
    };
    b.cljs$lang$maxFixedArity = 4;
    b.cljs$lang$applyTo = function(b) {
      var c = cljs.core.first(b);
      b = cljs.core.next(b);
      var d = cljs.core.first(b);
      b = cljs.core.next(b);
      var e = cljs.core.first(b);
      b = cljs.core.next(b);
      var f = cljs.core.first(b);
      b = cljs.core.rest(b);
      return a(c, d, e, f, b)
    };
    b.cljs$core$IFn$_invoke$arity$variadic = a;
    return b
  }(), a = function(a, h, l, m, k) {
    switch(arguments.length) {
      case 1:
        return b.call(this, a);
      case 2:
        return c.call(this, a, h);
      case 3:
        return d.call(this, a, h, l);
      case 4:
        return e.call(this, a, h, l, m);
      default:
        return f.cljs$core$IFn$_invoke$arity$variadic(a, h, l, m, cljs.core.array_seq(arguments, 4))
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$lang$maxFixedArity = 4;
  a.cljs$lang$applyTo = f.cljs$lang$applyTo;
  a.cljs$core$IFn$_invoke$arity$1 = b;
  a.cljs$core$IFn$_invoke$arity$2 = c;
  a.cljs$core$IFn$_invoke$arity$3 = d;
  a.cljs$core$IFn$_invoke$arity$4 = e;
  a.cljs$core$IFn$_invoke$arity$variadic = f.cljs$core$IFn$_invoke$arity$variadic;
  return a
}();
cljs.core.transient$ = function(a) {
  return cljs.core._as_transient.call(null, a)
};
cljs.core.persistent_BANG_ = function(a) {
  return cljs.core._persistent_BANG_.call(null, a)
};
cljs.core.conj_BANG_ = function(a, b) {
  return cljs.core._conj_BANG_.call(null, a, b)
};
cljs.core.assoc_BANG_ = function(a, b, c) {
  return cljs.core._assoc_BANG_.call(null, a, b, c)
};
cljs.core.dissoc_BANG_ = function(a, b) {
  return cljs.core._dissoc_BANG_.call(null, a, b)
};
cljs.core.pop_BANG_ = function(a) {
  return cljs.core._pop_BANG_.call(null, a)
};
cljs.core.disj_BANG_ = function(a, b) {
  return cljs.core._disjoin_BANG_.call(null, a, b)
};
cljs.core.apply_to = function(a, b, c) {
  var d = cljs.core.seq.call(null, c);
  if(0 === b) {
    return a.call(null)
  }
  c = cljs.core._first.call(null, d);
  var e = cljs.core._rest.call(null, d);
  if(1 === b) {
    return a.cljs$core$IFn$_invoke$arity$1 ? a.cljs$core$IFn$_invoke$arity$1(c) : a.call(null, c)
  }
  var d = cljs.core._first.call(null, e), f = cljs.core._rest.call(null, e);
  if(2 === b) {
    return a.cljs$core$IFn$_invoke$arity$2 ? a.cljs$core$IFn$_invoke$arity$2(c, d) : a.call(null, c, d)
  }
  var e = cljs.core._first.call(null, f), g = cljs.core._rest.call(null, f);
  if(3 === b) {
    return a.cljs$core$IFn$_invoke$arity$3 ? a.cljs$core$IFn$_invoke$arity$3(c, d, e) : a.call(null, c, d, e)
  }
  var f = cljs.core._first.call(null, g), h = cljs.core._rest.call(null, g);
  if(4 === b) {
    return a.cljs$core$IFn$_invoke$arity$4 ? a.cljs$core$IFn$_invoke$arity$4(c, d, e, f) : a.call(null, c, d, e, f)
  }
  g = cljs.core._first.call(null, h);
  h = cljs.core._rest.call(null, h);
  if(5 === b) {
    return a.cljs$core$IFn$_invoke$arity$5 ? a.cljs$core$IFn$_invoke$arity$5(c, d, e, f, g) : a.call(null, c, d, e, f, g)
  }
  a = cljs.core._first.call(null, h);
  var l = cljs.core._rest.call(null, h);
  if(6 === b) {
    return a.cljs$core$IFn$_invoke$arity$6 ? a.cljs$core$IFn$_invoke$arity$6(c, d, e, f, g, a) : a.call(null, c, d, e, f, g, a)
  }
  var h = cljs.core._first.call(null, l), m = cljs.core._rest.call(null, l);
  if(7 === b) {
    return a.cljs$core$IFn$_invoke$arity$7 ? a.cljs$core$IFn$_invoke$arity$7(c, d, e, f, g, a, h) : a.call(null, c, d, e, f, g, a, h)
  }
  var l = cljs.core._first.call(null, m), k = cljs.core._rest.call(null, m);
  if(8 === b) {
    return a.cljs$core$IFn$_invoke$arity$8 ? a.cljs$core$IFn$_invoke$arity$8(c, d, e, f, g, a, h, l) : a.call(null, c, d, e, f, g, a, h, l)
  }
  var m = cljs.core._first.call(null, k), n = cljs.core._rest.call(null, k);
  if(9 === b) {
    return a.cljs$core$IFn$_invoke$arity$9 ? a.cljs$core$IFn$_invoke$arity$9(c, d, e, f, g, a, h, l, m) : a.call(null, c, d, e, f, g, a, h, l, m)
  }
  var k = cljs.core._first.call(null, n), p = cljs.core._rest.call(null, n);
  if(10 === b) {
    return a.cljs$core$IFn$_invoke$arity$10 ? a.cljs$core$IFn$_invoke$arity$10(c, d, e, f, g, a, h, l, m, k) : a.call(null, c, d, e, f, g, a, h, l, m, k)
  }
  var n = cljs.core._first.call(null, p), s = cljs.core._rest.call(null, p);
  if(11 === b) {
    return a.cljs$core$IFn$_invoke$arity$11 ? a.cljs$core$IFn$_invoke$arity$11(c, d, e, f, g, a, h, l, m, k, n) : a.call(null, c, d, e, f, g, a, h, l, m, k, n)
  }
  var p = cljs.core._first.call(null, s), r = cljs.core._rest.call(null, s);
  if(12 === b) {
    return a.cljs$core$IFn$_invoke$arity$12 ? a.cljs$core$IFn$_invoke$arity$12(c, d, e, f, g, a, h, l, m, k, n, p) : a.call(null, c, d, e, f, g, a, h, l, m, k, n, p)
  }
  var s = cljs.core._first.call(null, r), q = cljs.core._rest.call(null, r);
  if(13 === b) {
    return a.cljs$core$IFn$_invoke$arity$13 ? a.cljs$core$IFn$_invoke$arity$13(c, d, e, f, g, a, h, l, m, k, n, p, s) : a.call(null, c, d, e, f, g, a, h, l, m, k, n, p, s)
  }
  var r = cljs.core._first.call(null, q), t = cljs.core._rest.call(null, q);
  if(14 === b) {
    return a.cljs$core$IFn$_invoke$arity$14 ? a.cljs$core$IFn$_invoke$arity$14(c, d, e, f, g, a, h, l, m, k, n, p, s, r) : a.call(null, c, d, e, f, g, a, h, l, m, k, n, p, s, r)
  }
  var q = cljs.core._first.call(null, t), u = cljs.core._rest.call(null, t);
  if(15 === b) {
    return a.cljs$core$IFn$_invoke$arity$15 ? a.cljs$core$IFn$_invoke$arity$15(c, d, e, f, g, a, h, l, m, k, n, p, s, r, q) : a.call(null, c, d, e, f, g, a, h, l, m, k, n, p, s, r, q)
  }
  var t = cljs.core._first.call(null, u), v = cljs.core._rest.call(null, u);
  if(16 === b) {
    return a.cljs$core$IFn$_invoke$arity$16 ? a.cljs$core$IFn$_invoke$arity$16(c, d, e, f, g, a, h, l, m, k, n, p, s, r, q, t) : a.call(null, c, d, e, f, g, a, h, l, m, k, n, p, s, r, q, t)
  }
  var u = cljs.core._first.call(null, v), w = cljs.core._rest.call(null, v);
  if(17 === b) {
    return a.cljs$core$IFn$_invoke$arity$17 ? a.cljs$core$IFn$_invoke$arity$17(c, d, e, f, g, a, h, l, m, k, n, p, s, r, q, t, u) : a.call(null, c, d, e, f, g, a, h, l, m, k, n, p, s, r, q, t, u)
  }
  var v = cljs.core._first.call(null, w), B = cljs.core._rest.call(null, w);
  if(18 === b) {
    return a.cljs$core$IFn$_invoke$arity$18 ? a.cljs$core$IFn$_invoke$arity$18(c, d, e, f, g, a, h, l, m, k, n, p, s, r, q, t, u, v) : a.call(null, c, d, e, f, g, a, h, l, m, k, n, p, s, r, q, t, u, v)
  }
  w = cljs.core._first.call(null, B);
  B = cljs.core._rest.call(null, B);
  if(19 === b) {
    return a.cljs$core$IFn$_invoke$arity$19 ? a.cljs$core$IFn$_invoke$arity$19(c, d, e, f, g, a, h, l, m, k, n, p, s, r, q, t, u, v, w) : a.call(null, c, d, e, f, g, a, h, l, m, k, n, p, s, r, q, t, u, v, w)
  }
  var I = cljs.core._first.call(null, B);
  cljs.core._rest.call(null, B);
  if(20 === b) {
    return a.cljs$core$IFn$_invoke$arity$20 ? a.cljs$core$IFn$_invoke$arity$20(c, d, e, f, g, a, h, l, m, k, n, p, s, r, q, t, u, v, w, I) : a.call(null, c, d, e, f, g, a, h, l, m, k, n, p, s, r, q, t, u, v, w, I)
  }
  throw Error("Only up to 20 arguments supported on functions");
};
cljs.core.apply = function() {
  var a = null, b = function(a, b) {
    var c = a.cljs$lang$maxFixedArity;
    if(a.cljs$lang$applyTo) {
      var d = cljs.core.bounded_count.call(null, b, c + 1);
      return d <= c ? cljs.core.apply_to.call(null, a, d, b) : a.cljs$lang$applyTo(b)
    }
    return a.apply(a, cljs.core.to_array.call(null, b))
  }, c = function(a, b, c) {
    b = cljs.core.list_STAR_.call(null, b, c);
    c = a.cljs$lang$maxFixedArity;
    if(a.cljs$lang$applyTo) {
      var d = cljs.core.bounded_count.call(null, b, c + 1);
      return d <= c ? cljs.core.apply_to.call(null, a, d, b) : a.cljs$lang$applyTo(b)
    }
    return a.apply(a, cljs.core.to_array.call(null, b))
  }, d = function(a, b, c, d) {
    b = cljs.core.list_STAR_.call(null, b, c, d);
    c = a.cljs$lang$maxFixedArity;
    return a.cljs$lang$applyTo ? (d = cljs.core.bounded_count.call(null, b, c + 1), d <= c ? cljs.core.apply_to.call(null, a, d, b) : a.cljs$lang$applyTo(b)) : a.apply(a, cljs.core.to_array.call(null, b))
  }, e = function(a, b, c, d, e) {
    b = cljs.core.list_STAR_.call(null, b, c, d, e);
    c = a.cljs$lang$maxFixedArity;
    return a.cljs$lang$applyTo ? (d = cljs.core.bounded_count.call(null, b, c + 1), d <= c ? cljs.core.apply_to.call(null, a, d, b) : a.cljs$lang$applyTo(b)) : a.apply(a, cljs.core.to_array.call(null, b))
  }, f = function() {
    var a = function(a, b, c, d, e, f) {
      b = cljs.core.cons.call(null, b, cljs.core.cons.call(null, c, cljs.core.cons.call(null, d, cljs.core.cons.call(null, e, cljs.core.spread.call(null, f)))));
      c = a.cljs$lang$maxFixedArity;
      return a.cljs$lang$applyTo ? (d = cljs.core.bounded_count.call(null, b, c + 1), d <= c ? cljs.core.apply_to.call(null, a, d, b) : a.cljs$lang$applyTo(b)) : a.apply(a, cljs.core.to_array.call(null, b))
    }, b = function(b, c, d, e, f, h) {
      var r = null;
      5 < arguments.length && (r = cljs.core.array_seq(Array.prototype.slice.call(arguments, 5), 0));
      return a.call(this, b, c, d, e, f, r)
    };
    b.cljs$lang$maxFixedArity = 5;
    b.cljs$lang$applyTo = function(b) {
      var c = cljs.core.first(b);
      b = cljs.core.next(b);
      var d = cljs.core.first(b);
      b = cljs.core.next(b);
      var e = cljs.core.first(b);
      b = cljs.core.next(b);
      var f = cljs.core.first(b);
      b = cljs.core.next(b);
      var h = cljs.core.first(b);
      b = cljs.core.rest(b);
      return a(c, d, e, f, h, b)
    };
    b.cljs$core$IFn$_invoke$arity$variadic = a;
    return b
  }(), a = function(a, h, l, m, k, n) {
    switch(arguments.length) {
      case 2:
        return b.call(this, a, h);
      case 3:
        return c.call(this, a, h, l);
      case 4:
        return d.call(this, a, h, l, m);
      case 5:
        return e.call(this, a, h, l, m, k);
      default:
        return f.cljs$core$IFn$_invoke$arity$variadic(a, h, l, m, k, cljs.core.array_seq(arguments, 5))
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$lang$maxFixedArity = 5;
  a.cljs$lang$applyTo = f.cljs$lang$applyTo;
  a.cljs$core$IFn$_invoke$arity$2 = b;
  a.cljs$core$IFn$_invoke$arity$3 = c;
  a.cljs$core$IFn$_invoke$arity$4 = d;
  a.cljs$core$IFn$_invoke$arity$5 = e;
  a.cljs$core$IFn$_invoke$arity$variadic = f.cljs$core$IFn$_invoke$arity$variadic;
  return a
}();
cljs.core.vary_meta = function() {
  var a = function(a, b, e) {
    return cljs.core.with_meta.call(null, a, cljs.core.apply.call(null, b, cljs.core.meta.call(null, a), e))
  }, b = function(b, d, e) {
    var f = null;
    2 < arguments.length && (f = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2), 0));
    return a.call(this, b, d, f)
  };
  b.cljs$lang$maxFixedArity = 2;
  b.cljs$lang$applyTo = function(b) {
    var d = cljs.core.first(b);
    b = cljs.core.next(b);
    var e = cljs.core.first(b);
    b = cljs.core.rest(b);
    return a(d, e, b)
  };
  b.cljs$core$IFn$_invoke$arity$variadic = a;
  return b
}();
cljs.core.not_EQ_ = function() {
  var a = null, b = function(a, b) {
    return!cljs.core._EQ_.call(null, a, b)
  }, c = function() {
    var a = function(a, b, c) {
      return cljs.core.not.call(null, cljs.core.apply.call(null, cljs.core._EQ_, a, b, c))
    }, b = function(b, c, e) {
      var l = null;
      2 < arguments.length && (l = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2), 0));
      return a.call(this, b, c, l)
    };
    b.cljs$lang$maxFixedArity = 2;
    b.cljs$lang$applyTo = function(b) {
      var c = cljs.core.first(b);
      b = cljs.core.next(b);
      var e = cljs.core.first(b);
      b = cljs.core.rest(b);
      return a(c, e, b)
    };
    b.cljs$core$IFn$_invoke$arity$variadic = a;
    return b
  }(), a = function(a, e, f) {
    switch(arguments.length) {
      case 1:
        return!1;
      case 2:
        return b.call(this, a, e);
      default:
        return c.cljs$core$IFn$_invoke$arity$variadic(a, e, cljs.core.array_seq(arguments, 2))
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$lang$maxFixedArity = 2;
  a.cljs$lang$applyTo = c.cljs$lang$applyTo;
  a.cljs$core$IFn$_invoke$arity$1 = function(a) {
    return!1
  };
  a.cljs$core$IFn$_invoke$arity$2 = b;
  a.cljs$core$IFn$_invoke$arity$variadic = c.cljs$core$IFn$_invoke$arity$variadic;
  return a
}();
cljs.core.not_empty = function(a) {
  return cljs.core.seq.call(null, a) ? a : null
};
cljs.core.every_QMARK_ = function(a, b) {
  for(;;) {
    if(null == cljs.core.seq.call(null, b)) {
      return!0
    }
    if(cljs.core.truth_(a.call(null, cljs.core.first.call(null, b)))) {
      var c = a, d = cljs.core.next.call(null, b);
      a = c;
      b = d
    }else {
      return new cljs.core.Keyword(null, "else", "else", 1017020587) ? !1 : null
    }
  }
};
cljs.core.not_every_QMARK_ = function(a, b) {
  return!cljs.core.every_QMARK_.call(null, a, b)
};
cljs.core.some = function(a, b) {
  for(;;) {
    if(cljs.core.seq.call(null, b)) {
      var c = a.call(null, cljs.core.first.call(null, b));
      if(cljs.core.truth_(c)) {
        return c
      }
      var c = a, d = cljs.core.next.call(null, b);
      a = c;
      b = d
    }else {
      return null
    }
  }
};
cljs.core.not_any_QMARK_ = function(a, b) {
  return cljs.core.not.call(null, cljs.core.some.call(null, a, b))
};
cljs.core.even_QMARK_ = function(a) {
  if(cljs.core.integer_QMARK_.call(null, a)) {
    return 0 === (a & 1)
  }
  throw Error([cljs.core.str("Argument must be an integer: "), cljs.core.str(a)].join(""));
};
cljs.core.odd_QMARK_ = function(a) {
  return!cljs.core.even_QMARK_.call(null, a)
};
cljs.core.identity = function(a) {
  return a
};
cljs.core.complement = function(a) {
  return function() {
    var b = null, c = function() {
      var b = function(b, c, d) {
        return cljs.core.not.call(null, cljs.core.apply.call(null, a, b, c, d))
      }, c = function(a, c, e) {
        var l = null;
        2 < arguments.length && (l = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2), 0));
        return b.call(this, a, c, l)
      };
      c.cljs$lang$maxFixedArity = 2;
      c.cljs$lang$applyTo = function(a) {
        var c = cljs.core.first(a);
        a = cljs.core.next(a);
        var e = cljs.core.first(a);
        a = cljs.core.rest(a);
        return b(c, e, a)
      };
      c.cljs$core$IFn$_invoke$arity$variadic = b;
      return c
    }(), b = function(b, e, f) {
      switch(arguments.length) {
        case 0:
          return cljs.core.not.call(null, a.call(null));
        case 1:
          return cljs.core.not.call(null, a.call(null, b));
        case 2:
          return cljs.core.not.call(null, a.call(null, b, e));
        default:
          return c.cljs$core$IFn$_invoke$arity$variadic(b, e, cljs.core.array_seq(arguments, 2))
      }
      throw Error("Invalid arity: " + arguments.length);
    };
    b.cljs$lang$maxFixedArity = 2;
    b.cljs$lang$applyTo = c.cljs$lang$applyTo;
    return b
  }()
};
cljs.core.constantly = function(a) {
  return function() {
    var b = function(b) {
      0 < arguments.length && cljs.core.array_seq(Array.prototype.slice.call(arguments, 0), 0);
      return a
    };
    b.cljs$lang$maxFixedArity = 0;
    b.cljs$lang$applyTo = function(b) {
      cljs.core.seq(b);
      return a
    };
    b.cljs$core$IFn$_invoke$arity$variadic = function(b) {
      return a
    };
    return b
  }()
};
cljs.core.comp = function() {
  var a = null, b = function() {
    return cljs.core.identity
  }, c = function(a, b) {
    return function() {
      var c = null, d = function() {
        var c = function(c, d, e, h) {
          return a.call(null, cljs.core.apply.call(null, b, c, d, e, h))
        }, d = function(a, b, d, e) {
          var f = null;
          3 < arguments.length && (f = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3), 0));
          return c.call(this, a, b, d, f)
        };
        d.cljs$lang$maxFixedArity = 3;
        d.cljs$lang$applyTo = function(a) {
          var b = cljs.core.first(a);
          a = cljs.core.next(a);
          var d = cljs.core.first(a);
          a = cljs.core.next(a);
          var e = cljs.core.first(a);
          a = cljs.core.rest(a);
          return c(b, d, e, a)
        };
        d.cljs$core$IFn$_invoke$arity$variadic = c;
        return d
      }(), c = function(c, e, h, p) {
        switch(arguments.length) {
          case 0:
            return a.call(null, b.call(null));
          case 1:
            return a.call(null, b.call(null, c));
          case 2:
            return a.call(null, b.call(null, c, e));
          case 3:
            return a.call(null, b.call(null, c, e, h));
          default:
            return d.cljs$core$IFn$_invoke$arity$variadic(c, e, h, cljs.core.array_seq(arguments, 3))
        }
        throw Error("Invalid arity: " + arguments.length);
      };
      c.cljs$lang$maxFixedArity = 3;
      c.cljs$lang$applyTo = d.cljs$lang$applyTo;
      return c
    }()
  }, d = function(a, b, c) {
    return function() {
      var d = null, e = function() {
        var d = function(d, e, k, n) {
          return a.call(null, b.call(null, cljs.core.apply.call(null, c, d, e, k, n)))
        }, e = function(a, b, c, e) {
          var f = null;
          3 < arguments.length && (f = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3), 0));
          return d.call(this, a, b, c, f)
        };
        e.cljs$lang$maxFixedArity = 3;
        e.cljs$lang$applyTo = function(a) {
          var b = cljs.core.first(a);
          a = cljs.core.next(a);
          var c = cljs.core.first(a);
          a = cljs.core.next(a);
          var e = cljs.core.first(a);
          a = cljs.core.rest(a);
          return d(b, c, e, a)
        };
        e.cljs$core$IFn$_invoke$arity$variadic = d;
        return e
      }(), d = function(d, n, l, s) {
        switch(arguments.length) {
          case 0:
            return a.call(null, b.call(null, c.call(null)));
          case 1:
            return a.call(null, b.call(null, c.call(null, d)));
          case 2:
            return a.call(null, b.call(null, c.call(null, d, n)));
          case 3:
            return a.call(null, b.call(null, c.call(null, d, n, l)));
          default:
            return e.cljs$core$IFn$_invoke$arity$variadic(d, n, l, cljs.core.array_seq(arguments, 3))
        }
        throw Error("Invalid arity: " + arguments.length);
      };
      d.cljs$lang$maxFixedArity = 3;
      d.cljs$lang$applyTo = e.cljs$lang$applyTo;
      return d
    }()
  }, e = function() {
    var a = function(a, b, c, d) {
      var e = cljs.core.reverse.call(null, cljs.core.list_STAR_.call(null, a, b, c, d));
      return function() {
        var a = function(a) {
          a = cljs.core.apply.call(null, cljs.core.first.call(null, e), a);
          for(var b = cljs.core.next.call(null, e);;) {
            if(b) {
              a = cljs.core.first.call(null, b).call(null, a), b = cljs.core.next.call(null, b)
            }else {
              return a
            }
          }
        }, b = function(b) {
          var c = null;
          0 < arguments.length && (c = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0), 0));
          return a.call(this, c)
        };
        b.cljs$lang$maxFixedArity = 0;
        b.cljs$lang$applyTo = function(b) {
          b = cljs.core.seq(b);
          return a(b)
        };
        b.cljs$core$IFn$_invoke$arity$variadic = a;
        return b
      }()
    }, b = function(b, c, d, e) {
      var g = null;
      3 < arguments.length && (g = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3), 0));
      return a.call(this, b, c, d, g)
    };
    b.cljs$lang$maxFixedArity = 3;
    b.cljs$lang$applyTo = function(b) {
      var c = cljs.core.first(b);
      b = cljs.core.next(b);
      var d = cljs.core.first(b);
      b = cljs.core.next(b);
      var e = cljs.core.first(b);
      b = cljs.core.rest(b);
      return a(c, d, e, b)
    };
    b.cljs$core$IFn$_invoke$arity$variadic = a;
    return b
  }(), a = function(a, g, h, l) {
    switch(arguments.length) {
      case 0:
        return b.call(this);
      case 1:
        return a;
      case 2:
        return c.call(this, a, g);
      case 3:
        return d.call(this, a, g, h);
      default:
        return e.cljs$core$IFn$_invoke$arity$variadic(a, g, h, cljs.core.array_seq(arguments, 3))
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$lang$maxFixedArity = 3;
  a.cljs$lang$applyTo = e.cljs$lang$applyTo;
  a.cljs$core$IFn$_invoke$arity$0 = b;
  a.cljs$core$IFn$_invoke$arity$1 = function(a) {
    return a
  };
  a.cljs$core$IFn$_invoke$arity$2 = c;
  a.cljs$core$IFn$_invoke$arity$3 = d;
  a.cljs$core$IFn$_invoke$arity$variadic = e.cljs$core$IFn$_invoke$arity$variadic;
  return a
}();
cljs.core.partial = function() {
  var a = null, b = function(a, b) {
    return function() {
      var c = function(c) {
        return cljs.core.apply.call(null, a, b, c)
      }, d = function(a) {
        var b = null;
        0 < arguments.length && (b = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0), 0));
        return c.call(this, b)
      };
      d.cljs$lang$maxFixedArity = 0;
      d.cljs$lang$applyTo = function(a) {
        a = cljs.core.seq(a);
        return c(a)
      };
      d.cljs$core$IFn$_invoke$arity$variadic = c;
      return d
    }()
  }, c = function(a, b, c) {
    return function() {
      var d = function(d) {
        return cljs.core.apply.call(null, a, b, c, d)
      }, e = function(a) {
        var b = null;
        0 < arguments.length && (b = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0), 0));
        return d.call(this, b)
      };
      e.cljs$lang$maxFixedArity = 0;
      e.cljs$lang$applyTo = function(a) {
        a = cljs.core.seq(a);
        return d(a)
      };
      e.cljs$core$IFn$_invoke$arity$variadic = d;
      return e
    }()
  }, d = function(a, b, c, d) {
    return function() {
      var e = function(e) {
        return cljs.core.apply.call(null, a, b, c, d, e)
      }, k = function(a) {
        var b = null;
        0 < arguments.length && (b = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0), 0));
        return e.call(this, b)
      };
      k.cljs$lang$maxFixedArity = 0;
      k.cljs$lang$applyTo = function(a) {
        a = cljs.core.seq(a);
        return e(a)
      };
      k.cljs$core$IFn$_invoke$arity$variadic = e;
      return k
    }()
  }, e = function() {
    var a = function(a, b, c, d, e) {
      return function() {
        var f = function(f) {
          return cljs.core.apply.call(null, a, b, c, d, cljs.core.concat.call(null, e, f))
        }, g = function(a) {
          var b = null;
          0 < arguments.length && (b = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0), 0));
          return f.call(this, b)
        };
        g.cljs$lang$maxFixedArity = 0;
        g.cljs$lang$applyTo = function(a) {
          a = cljs.core.seq(a);
          return f(a)
        };
        g.cljs$core$IFn$_invoke$arity$variadic = f;
        return g
      }()
    }, b = function(b, c, d, e, g) {
      var p = null;
      4 < arguments.length && (p = cljs.core.array_seq(Array.prototype.slice.call(arguments, 4), 0));
      return a.call(this, b, c, d, e, p)
    };
    b.cljs$lang$maxFixedArity = 4;
    b.cljs$lang$applyTo = function(b) {
      var c = cljs.core.first(b);
      b = cljs.core.next(b);
      var d = cljs.core.first(b);
      b = cljs.core.next(b);
      var e = cljs.core.first(b);
      b = cljs.core.next(b);
      var g = cljs.core.first(b);
      b = cljs.core.rest(b);
      return a(c, d, e, g, b)
    };
    b.cljs$core$IFn$_invoke$arity$variadic = a;
    return b
  }(), a = function(a, g, h, l, m) {
    switch(arguments.length) {
      case 1:
        return a;
      case 2:
        return b.call(this, a, g);
      case 3:
        return c.call(this, a, g, h);
      case 4:
        return d.call(this, a, g, h, l);
      default:
        return e.cljs$core$IFn$_invoke$arity$variadic(a, g, h, l, cljs.core.array_seq(arguments, 4))
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$lang$maxFixedArity = 4;
  a.cljs$lang$applyTo = e.cljs$lang$applyTo;
  a.cljs$core$IFn$_invoke$arity$1 = function(a) {
    return a
  };
  a.cljs$core$IFn$_invoke$arity$2 = b;
  a.cljs$core$IFn$_invoke$arity$3 = c;
  a.cljs$core$IFn$_invoke$arity$4 = d;
  a.cljs$core$IFn$_invoke$arity$variadic = e.cljs$core$IFn$_invoke$arity$variadic;
  return a
}();
cljs.core.fnil = function() {
  var a = null, b = function(a, b) {
    return function() {
      var c = null, d = function() {
        var c = function(c, d, g, h) {
          return cljs.core.apply.call(null, a, null == c ? b : c, d, g, h)
        }, d = function(a, b, d, e) {
          var f = null;
          3 < arguments.length && (f = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3), 0));
          return c.call(this, a, b, d, f)
        };
        d.cljs$lang$maxFixedArity = 3;
        d.cljs$lang$applyTo = function(a) {
          var b = cljs.core.first(a);
          a = cljs.core.next(a);
          var d = cljs.core.first(a);
          a = cljs.core.next(a);
          var e = cljs.core.first(a);
          a = cljs.core.rest(a);
          return c(b, d, e, a)
        };
        d.cljs$core$IFn$_invoke$arity$variadic = c;
        return d
      }(), c = function(c, g, k, n) {
        switch(arguments.length) {
          case 1:
            return a.call(null, null == c ? b : c);
          case 2:
            return a.call(null, null == c ? b : c, g);
          case 3:
            return a.call(null, null == c ? b : c, g, k);
          default:
            return d.cljs$core$IFn$_invoke$arity$variadic(c, g, k, cljs.core.array_seq(arguments, 3))
        }
        throw Error("Invalid arity: " + arguments.length);
      };
      c.cljs$lang$maxFixedArity = 3;
      c.cljs$lang$applyTo = d.cljs$lang$applyTo;
      return c
    }()
  }, c = function(a, b, c) {
    return function() {
      var d = null, l = function() {
        var d = function(d, h, k, l) {
          return cljs.core.apply.call(null, a, null == d ? b : d, null == h ? c : h, k, l)
        }, h = function(a, b, c, e) {
          var f = null;
          3 < arguments.length && (f = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3), 0));
          return d.call(this, a, b, c, f)
        };
        h.cljs$lang$maxFixedArity = 3;
        h.cljs$lang$applyTo = function(a) {
          var b = cljs.core.first(a);
          a = cljs.core.next(a);
          var c = cljs.core.first(a);
          a = cljs.core.next(a);
          var e = cljs.core.first(a);
          a = cljs.core.rest(a);
          return d(b, c, e, a)
        };
        h.cljs$core$IFn$_invoke$arity$variadic = d;
        return h
      }(), d = function(d, h, n, p) {
        switch(arguments.length) {
          case 2:
            return a.call(null, null == d ? b : d, null == h ? c : h);
          case 3:
            return a.call(null, null == d ? b : d, null == h ? c : h, n);
          default:
            return l.cljs$core$IFn$_invoke$arity$variadic(d, h, n, cljs.core.array_seq(arguments, 3))
        }
        throw Error("Invalid arity: " + arguments.length);
      };
      d.cljs$lang$maxFixedArity = 3;
      d.cljs$lang$applyTo = l.cljs$lang$applyTo;
      return d
    }()
  }, d = function(a, b, c, d) {
    return function() {
      var l = null, m = function() {
        var k = function(k, n, l, m) {
          return cljs.core.apply.call(null, a, null == k ? b : k, null == n ? c : n, null == l ? d : l, m)
        }, n = function(a, b, c, d) {
          var e = null;
          3 < arguments.length && (e = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3), 0));
          return k.call(this, a, b, c, e)
        };
        n.cljs$lang$maxFixedArity = 3;
        n.cljs$lang$applyTo = function(a) {
          var b = cljs.core.first(a);
          a = cljs.core.next(a);
          var c = cljs.core.first(a);
          a = cljs.core.next(a);
          var d = cljs.core.first(a);
          a = cljs.core.rest(a);
          return k(b, c, d, a)
        };
        n.cljs$core$IFn$_invoke$arity$variadic = k;
        return n
      }(), l = function(k, n, l, s) {
        switch(arguments.length) {
          case 2:
            return a.call(null, null == k ? b : k, null == n ? c : n);
          case 3:
            return a.call(null, null == k ? b : k, null == n ? c : n, null == l ? d : l);
          default:
            return m.cljs$core$IFn$_invoke$arity$variadic(k, n, l, cljs.core.array_seq(arguments, 3))
        }
        throw Error("Invalid arity: " + arguments.length);
      };
      l.cljs$lang$maxFixedArity = 3;
      l.cljs$lang$applyTo = m.cljs$lang$applyTo;
      return l
    }()
  }, a = function(a, f, g, h) {
    switch(arguments.length) {
      case 2:
        return b.call(this, a, f);
      case 3:
        return c.call(this, a, f, g);
      case 4:
        return d.call(this, a, f, g, h)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$core$IFn$_invoke$arity$2 = b;
  a.cljs$core$IFn$_invoke$arity$3 = c;
  a.cljs$core$IFn$_invoke$arity$4 = d;
  return a
}();
cljs.core.map_indexed = function(a, b) {
  return function d(b, f) {
    return new cljs.core.LazySeq(null, function() {
      var g = cljs.core.seq.call(null, f);
      if(g) {
        if(cljs.core.chunked_seq_QMARK_.call(null, g)) {
          for(var h = cljs.core.chunk_first.call(null, g), l = cljs.core.count.call(null, h), m = cljs.core.chunk_buffer.call(null, l), k = 0;;) {
            if(k < l) {
              cljs.core.chunk_append.call(null, m, a.call(null, b + k, cljs.core._nth.call(null, h, k))), k += 1
            }else {
              break
            }
          }
          return cljs.core.chunk_cons.call(null, cljs.core.chunk.call(null, m), d.call(null, b + l, cljs.core.chunk_rest.call(null, g)))
        }
        return cljs.core.cons.call(null, a.call(null, b, cljs.core.first.call(null, g)), d.call(null, b + 1, cljs.core.rest.call(null, g)))
      }
      return null
    }, null, null)
  }.call(null, 0, b)
};
cljs.core.keep = function keep(b, c) {
  return new cljs.core.LazySeq(null, function() {
    var d = cljs.core.seq.call(null, c);
    if(d) {
      if(cljs.core.chunked_seq_QMARK_.call(null, d)) {
        for(var e = cljs.core.chunk_first.call(null, d), f = cljs.core.count.call(null, e), g = cljs.core.chunk_buffer.call(null, f), h = 0;;) {
          if(h < f) {
            var l = b.call(null, cljs.core._nth.call(null, e, h));
            null != l && cljs.core.chunk_append.call(null, g, l);
            h += 1
          }else {
            break
          }
        }
        return cljs.core.chunk_cons.call(null, cljs.core.chunk.call(null, g), keep.call(null, b, cljs.core.chunk_rest.call(null, d)))
      }
      e = b.call(null, cljs.core.first.call(null, d));
      return null == e ? keep.call(null, b, cljs.core.rest.call(null, d)) : cljs.core.cons.call(null, e, keep.call(null, b, cljs.core.rest.call(null, d)))
    }
    return null
  }, null, null)
};
cljs.core.keep_indexed = function(a, b) {
  return function d(b, f) {
    return new cljs.core.LazySeq(null, function() {
      var g = cljs.core.seq.call(null, f);
      if(g) {
        if(cljs.core.chunked_seq_QMARK_.call(null, g)) {
          for(var h = cljs.core.chunk_first.call(null, g), l = cljs.core.count.call(null, h), m = cljs.core.chunk_buffer.call(null, l), k = 0;;) {
            if(k < l) {
              var n = a.call(null, b + k, cljs.core._nth.call(null, h, k));
              null != n && cljs.core.chunk_append.call(null, m, n);
              k += 1
            }else {
              break
            }
          }
          return cljs.core.chunk_cons.call(null, cljs.core.chunk.call(null, m), d.call(null, b + l, cljs.core.chunk_rest.call(null, g)))
        }
        h = a.call(null, b, cljs.core.first.call(null, g));
        return null == h ? d.call(null, b + 1, cljs.core.rest.call(null, g)) : cljs.core.cons.call(null, h, d.call(null, b + 1, cljs.core.rest.call(null, g)))
      }
      return null
    }, null, null)
  }.call(null, 0, b)
};
cljs.core.every_pred = function() {
  var a = null, b = function(a) {
    return function() {
      var b = null, c = function(b) {
        return cljs.core.boolean$.call(null, a.call(null, b))
      }, d = function(b, c) {
        return cljs.core.boolean$.call(null, function() {
          var d = a.call(null, b);
          return cljs.core.truth_(d) ? a.call(null, c) : d
        }())
      }, e = function(b, c, d) {
        return cljs.core.boolean$.call(null, function() {
          var e = a.call(null, b);
          return cljs.core.truth_(e) ? (e = a.call(null, c), cljs.core.truth_(e) ? a.call(null, d) : e) : e
        }())
      }, k = function() {
        var c = function(c, d, e, h) {
          return cljs.core.boolean$.call(null, function() {
            var k = b.call(null, c, d, e);
            return cljs.core.truth_(k) ? cljs.core.every_QMARK_.call(null, a, h) : k
          }())
        }, d = function(a, b, d, e) {
          var f = null;
          3 < arguments.length && (f = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3), 0));
          return c.call(this, a, b, d, f)
        };
        d.cljs$lang$maxFixedArity = 3;
        d.cljs$lang$applyTo = function(a) {
          var b = cljs.core.first(a);
          a = cljs.core.next(a);
          var d = cljs.core.first(a);
          a = cljs.core.next(a);
          var e = cljs.core.first(a);
          a = cljs.core.rest(a);
          return c(b, d, e, a)
        };
        d.cljs$core$IFn$_invoke$arity$variadic = c;
        return d
      }(), b = function(a, b, f, g) {
        switch(arguments.length) {
          case 0:
            return!0;
          case 1:
            return c.call(this, a);
          case 2:
            return d.call(this, a, b);
          case 3:
            return e.call(this, a, b, f);
          default:
            return k.cljs$core$IFn$_invoke$arity$variadic(a, b, f, cljs.core.array_seq(arguments, 3))
        }
        throw Error("Invalid arity: " + arguments.length);
      };
      b.cljs$lang$maxFixedArity = 3;
      b.cljs$lang$applyTo = k.cljs$lang$applyTo;
      b.cljs$core$IFn$_invoke$arity$0 = function() {
        return!0
      };
      b.cljs$core$IFn$_invoke$arity$1 = c;
      b.cljs$core$IFn$_invoke$arity$2 = d;
      b.cljs$core$IFn$_invoke$arity$3 = e;
      b.cljs$core$IFn$_invoke$arity$variadic = k.cljs$core$IFn$_invoke$arity$variadic;
      return b
    }()
  }, c = function(a, b) {
    return function() {
      var c = null, d = function(c) {
        return cljs.core.boolean$.call(null, function() {
          var d = a.call(null, c);
          return cljs.core.truth_(d) ? b.call(null, c) : d
        }())
      }, e = function(c, d) {
        return cljs.core.boolean$.call(null, function() {
          var e = a.call(null, c);
          return cljs.core.truth_(e) && (e = a.call(null, d), cljs.core.truth_(e)) ? (e = b.call(null, c), cljs.core.truth_(e) ? b.call(null, d) : e) : e
        }())
      }, k = function(c, d, e) {
        return cljs.core.boolean$.call(null, function() {
          var h = a.call(null, c);
          return cljs.core.truth_(h) && (h = a.call(null, d), cljs.core.truth_(h) && (h = a.call(null, e), cljs.core.truth_(h) && (h = b.call(null, c), cljs.core.truth_(h)))) ? (h = b.call(null, d), cljs.core.truth_(h) ? b.call(null, e) : h) : h
        }())
      }, n = function() {
        var d = function(d, e, k, n) {
          return cljs.core.boolean$.call(null, function() {
            var l = c.call(null, d, e, k);
            return cljs.core.truth_(l) ? cljs.core.every_QMARK_.call(null, function(c) {
              var d = a.call(null, c);
              return cljs.core.truth_(d) ? b.call(null, c) : d
            }, n) : l
          }())
        }, e = function(a, b, c, e) {
          var f = null;
          3 < arguments.length && (f = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3), 0));
          return d.call(this, a, b, c, f)
        };
        e.cljs$lang$maxFixedArity = 3;
        e.cljs$lang$applyTo = function(a) {
          var b = cljs.core.first(a);
          a = cljs.core.next(a);
          var c = cljs.core.first(a);
          a = cljs.core.next(a);
          var e = cljs.core.first(a);
          a = cljs.core.rest(a);
          return d(b, c, e, a)
        };
        e.cljs$core$IFn$_invoke$arity$variadic = d;
        return e
      }(), c = function(a, b, c, f) {
        switch(arguments.length) {
          case 0:
            return!0;
          case 1:
            return d.call(this, a);
          case 2:
            return e.call(this, a, b);
          case 3:
            return k.call(this, a, b, c);
          default:
            return n.cljs$core$IFn$_invoke$arity$variadic(a, b, c, cljs.core.array_seq(arguments, 3))
        }
        throw Error("Invalid arity: " + arguments.length);
      };
      c.cljs$lang$maxFixedArity = 3;
      c.cljs$lang$applyTo = n.cljs$lang$applyTo;
      c.cljs$core$IFn$_invoke$arity$0 = function() {
        return!0
      };
      c.cljs$core$IFn$_invoke$arity$1 = d;
      c.cljs$core$IFn$_invoke$arity$2 = e;
      c.cljs$core$IFn$_invoke$arity$3 = k;
      c.cljs$core$IFn$_invoke$arity$variadic = n.cljs$core$IFn$_invoke$arity$variadic;
      return c
    }()
  }, d = function(a, b, c) {
    return function() {
      var d = null, e = function(d) {
        return cljs.core.boolean$.call(null, function() {
          var e = a.call(null, d);
          return cljs.core.truth_(e) ? (e = b.call(null, d), cljs.core.truth_(e) ? c.call(null, d) : e) : e
        }())
      }, k = function(d, e) {
        return cljs.core.boolean$.call(null, function() {
          var k = a.call(null, d);
          return cljs.core.truth_(k) && (k = b.call(null, d), cljs.core.truth_(k) && (k = c.call(null, d), cljs.core.truth_(k) && (k = a.call(null, e), cljs.core.truth_(k)))) ? (k = b.call(null, e), cljs.core.truth_(k) ? c.call(null, e) : k) : k
        }())
      }, n = function(d, e, k) {
        return cljs.core.boolean$.call(null, function() {
          var n = a.call(null, d);
          return cljs.core.truth_(n) && (n = b.call(null, d), cljs.core.truth_(n) && (n = c.call(null, d), cljs.core.truth_(n) && (n = a.call(null, e), cljs.core.truth_(n) && (n = b.call(null, e), cljs.core.truth_(n) && (n = c.call(null, e), cljs.core.truth_(n) && (n = a.call(null, k), cljs.core.truth_(n))))))) ? (n = b.call(null, k), cljs.core.truth_(n) ? c.call(null, k) : n) : n
        }())
      }, p = function() {
        var e = function(e, k, n, m) {
          return cljs.core.boolean$.call(null, function() {
            var p = d.call(null, e, k, n);
            return cljs.core.truth_(p) ? cljs.core.every_QMARK_.call(null, function(d) {
              var e = a.call(null, d);
              return cljs.core.truth_(e) ? (e = b.call(null, d), cljs.core.truth_(e) ? c.call(null, d) : e) : e
            }, m) : p
          }())
        }, k = function(a, b, c, d) {
          var f = null;
          3 < arguments.length && (f = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3), 0));
          return e.call(this, a, b, c, f)
        };
        k.cljs$lang$maxFixedArity = 3;
        k.cljs$lang$applyTo = function(a) {
          var b = cljs.core.first(a);
          a = cljs.core.next(a);
          var c = cljs.core.first(a);
          a = cljs.core.next(a);
          var d = cljs.core.first(a);
          a = cljs.core.rest(a);
          return e(b, c, d, a)
        };
        k.cljs$core$IFn$_invoke$arity$variadic = e;
        return k
      }(), d = function(a, b, c, d) {
        switch(arguments.length) {
          case 0:
            return!0;
          case 1:
            return e.call(this, a);
          case 2:
            return k.call(this, a, b);
          case 3:
            return n.call(this, a, b, c);
          default:
            return p.cljs$core$IFn$_invoke$arity$variadic(a, b, c, cljs.core.array_seq(arguments, 3))
        }
        throw Error("Invalid arity: " + arguments.length);
      };
      d.cljs$lang$maxFixedArity = 3;
      d.cljs$lang$applyTo = p.cljs$lang$applyTo;
      d.cljs$core$IFn$_invoke$arity$0 = function() {
        return!0
      };
      d.cljs$core$IFn$_invoke$arity$1 = e;
      d.cljs$core$IFn$_invoke$arity$2 = k;
      d.cljs$core$IFn$_invoke$arity$3 = n;
      d.cljs$core$IFn$_invoke$arity$variadic = p.cljs$core$IFn$_invoke$arity$variadic;
      return d
    }()
  }, e = function() {
    var a = function(a, b, c, d) {
      var e = cljs.core.list_STAR_.call(null, a, b, c, d);
      return function() {
        var a = null, b = function(a) {
          return cljs.core.every_QMARK_.call(null, function(b) {
            return b.call(null, a)
          }, e)
        }, c = function(a, b) {
          return cljs.core.every_QMARK_.call(null, function(c) {
            var d = c.call(null, a);
            return cljs.core.truth_(d) ? c.call(null, b) : d
          }, e)
        }, d = function(a, b, c) {
          return cljs.core.every_QMARK_.call(null, function(d) {
            var e = d.call(null, a);
            return cljs.core.truth_(e) ? (e = d.call(null, b), cljs.core.truth_(e) ? d.call(null, c) : e) : e
          }, e)
        }, f = function() {
          var b = function(b, c, d, f) {
            return cljs.core.boolean$.call(null, function() {
              var g = a.call(null, b, c, d);
              return cljs.core.truth_(g) ? cljs.core.every_QMARK_.call(null, function(a) {
                return cljs.core.every_QMARK_.call(null, a, f)
              }, e) : g
            }())
          }, c = function(a, c, d, e) {
            var f = null;
            3 < arguments.length && (f = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3), 0));
            return b.call(this, a, c, d, f)
          };
          c.cljs$lang$maxFixedArity = 3;
          c.cljs$lang$applyTo = function(a) {
            var c = cljs.core.first(a);
            a = cljs.core.next(a);
            var d = cljs.core.first(a);
            a = cljs.core.next(a);
            var e = cljs.core.first(a);
            a = cljs.core.rest(a);
            return b(c, d, e, a)
          };
          c.cljs$core$IFn$_invoke$arity$variadic = b;
          return c
        }(), a = function(a, e, g, h) {
          switch(arguments.length) {
            case 0:
              return!0;
            case 1:
              return b.call(this, a);
            case 2:
              return c.call(this, a, e);
            case 3:
              return d.call(this, a, e, g);
            default:
              return f.cljs$core$IFn$_invoke$arity$variadic(a, e, g, cljs.core.array_seq(arguments, 3))
          }
          throw Error("Invalid arity: " + arguments.length);
        };
        a.cljs$lang$maxFixedArity = 3;
        a.cljs$lang$applyTo = f.cljs$lang$applyTo;
        a.cljs$core$IFn$_invoke$arity$0 = function() {
          return!0
        };
        a.cljs$core$IFn$_invoke$arity$1 = b;
        a.cljs$core$IFn$_invoke$arity$2 = c;
        a.cljs$core$IFn$_invoke$arity$3 = d;
        a.cljs$core$IFn$_invoke$arity$variadic = f.cljs$core$IFn$_invoke$arity$variadic;
        return a
      }()
    }, b = function(b, c, d, e) {
      var g = null;
      3 < arguments.length && (g = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3), 0));
      return a.call(this, b, c, d, g)
    };
    b.cljs$lang$maxFixedArity = 3;
    b.cljs$lang$applyTo = function(b) {
      var c = cljs.core.first(b);
      b = cljs.core.next(b);
      var d = cljs.core.first(b);
      b = cljs.core.next(b);
      var e = cljs.core.first(b);
      b = cljs.core.rest(b);
      return a(c, d, e, b)
    };
    b.cljs$core$IFn$_invoke$arity$variadic = a;
    return b
  }(), a = function(a, g, h, l) {
    switch(arguments.length) {
      case 1:
        return b.call(this, a);
      case 2:
        return c.call(this, a, g);
      case 3:
        return d.call(this, a, g, h);
      default:
        return e.cljs$core$IFn$_invoke$arity$variadic(a, g, h, cljs.core.array_seq(arguments, 3))
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$lang$maxFixedArity = 3;
  a.cljs$lang$applyTo = e.cljs$lang$applyTo;
  a.cljs$core$IFn$_invoke$arity$1 = b;
  a.cljs$core$IFn$_invoke$arity$2 = c;
  a.cljs$core$IFn$_invoke$arity$3 = d;
  a.cljs$core$IFn$_invoke$arity$variadic = e.cljs$core$IFn$_invoke$arity$variadic;
  return a
}();
cljs.core.some_fn = function() {
  var a = null, b = function(a) {
    return function() {
      var b = null, c = function(b) {
        return a.call(null, b)
      }, d = function(b, c) {
        var d = a.call(null, b);
        return cljs.core.truth_(d) ? d : a.call(null, c)
      }, e = function(b, c, d) {
        b = a.call(null, b);
        if(cljs.core.truth_(b)) {
          return b
        }
        c = a.call(null, c);
        return cljs.core.truth_(c) ? c : a.call(null, d)
      }, k = function() {
        var c = function(c, d, e, h) {
          c = b.call(null, c, d, e);
          return cljs.core.truth_(c) ? c : cljs.core.some.call(null, a, h)
        }, d = function(a, b, d, e) {
          var f = null;
          3 < arguments.length && (f = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3), 0));
          return c.call(this, a, b, d, f)
        };
        d.cljs$lang$maxFixedArity = 3;
        d.cljs$lang$applyTo = function(a) {
          var b = cljs.core.first(a);
          a = cljs.core.next(a);
          var d = cljs.core.first(a);
          a = cljs.core.next(a);
          var e = cljs.core.first(a);
          a = cljs.core.rest(a);
          return c(b, d, e, a)
        };
        d.cljs$core$IFn$_invoke$arity$variadic = c;
        return d
      }(), b = function(a, b, f, g) {
        switch(arguments.length) {
          case 0:
            return null;
          case 1:
            return c.call(this, a);
          case 2:
            return d.call(this, a, b);
          case 3:
            return e.call(this, a, b, f);
          default:
            return k.cljs$core$IFn$_invoke$arity$variadic(a, b, f, cljs.core.array_seq(arguments, 3))
        }
        throw Error("Invalid arity: " + arguments.length);
      };
      b.cljs$lang$maxFixedArity = 3;
      b.cljs$lang$applyTo = k.cljs$lang$applyTo;
      b.cljs$core$IFn$_invoke$arity$0 = function() {
        return null
      };
      b.cljs$core$IFn$_invoke$arity$1 = c;
      b.cljs$core$IFn$_invoke$arity$2 = d;
      b.cljs$core$IFn$_invoke$arity$3 = e;
      b.cljs$core$IFn$_invoke$arity$variadic = k.cljs$core$IFn$_invoke$arity$variadic;
      return b
    }()
  }, c = function(a, b) {
    return function() {
      var c = null, d = function(c) {
        var d = a.call(null, c);
        return cljs.core.truth_(d) ? d : b.call(null, c)
      }, e = function(c, d) {
        var e = a.call(null, c);
        if(cljs.core.truth_(e)) {
          return e
        }
        e = a.call(null, d);
        if(cljs.core.truth_(e)) {
          return e
        }
        e = b.call(null, c);
        return cljs.core.truth_(e) ? e : b.call(null, d)
      }, k = function(c, d, e) {
        var h = a.call(null, c);
        if(cljs.core.truth_(h)) {
          return h
        }
        h = a.call(null, d);
        if(cljs.core.truth_(h)) {
          return h
        }
        h = a.call(null, e);
        if(cljs.core.truth_(h)) {
          return h
        }
        c = b.call(null, c);
        if(cljs.core.truth_(c)) {
          return c
        }
        d = b.call(null, d);
        return cljs.core.truth_(d) ? d : b.call(null, e)
      }, n = function() {
        var d = function(d, e, k, n) {
          d = c.call(null, d, e, k);
          return cljs.core.truth_(d) ? d : cljs.core.some.call(null, function(c) {
            var d = a.call(null, c);
            return cljs.core.truth_(d) ? d : b.call(null, c)
          }, n)
        }, e = function(a, b, c, e) {
          var f = null;
          3 < arguments.length && (f = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3), 0));
          return d.call(this, a, b, c, f)
        };
        e.cljs$lang$maxFixedArity = 3;
        e.cljs$lang$applyTo = function(a) {
          var b = cljs.core.first(a);
          a = cljs.core.next(a);
          var c = cljs.core.first(a);
          a = cljs.core.next(a);
          var e = cljs.core.first(a);
          a = cljs.core.rest(a);
          return d(b, c, e, a)
        };
        e.cljs$core$IFn$_invoke$arity$variadic = d;
        return e
      }(), c = function(a, b, c, f) {
        switch(arguments.length) {
          case 0:
            return null;
          case 1:
            return d.call(this, a);
          case 2:
            return e.call(this, a, b);
          case 3:
            return k.call(this, a, b, c);
          default:
            return n.cljs$core$IFn$_invoke$arity$variadic(a, b, c, cljs.core.array_seq(arguments, 3))
        }
        throw Error("Invalid arity: " + arguments.length);
      };
      c.cljs$lang$maxFixedArity = 3;
      c.cljs$lang$applyTo = n.cljs$lang$applyTo;
      c.cljs$core$IFn$_invoke$arity$0 = function() {
        return null
      };
      c.cljs$core$IFn$_invoke$arity$1 = d;
      c.cljs$core$IFn$_invoke$arity$2 = e;
      c.cljs$core$IFn$_invoke$arity$3 = k;
      c.cljs$core$IFn$_invoke$arity$variadic = n.cljs$core$IFn$_invoke$arity$variadic;
      return c
    }()
  }, d = function(a, b, c) {
    return function() {
      var d = null, e = function(d) {
        var e = a.call(null, d);
        if(cljs.core.truth_(e)) {
          return e
        }
        e = b.call(null, d);
        return cljs.core.truth_(e) ? e : c.call(null, d)
      }, k = function(d, e) {
        var k = a.call(null, d);
        if(cljs.core.truth_(k)) {
          return k
        }
        k = b.call(null, d);
        if(cljs.core.truth_(k)) {
          return k
        }
        k = c.call(null, d);
        if(cljs.core.truth_(k)) {
          return k
        }
        k = a.call(null, e);
        if(cljs.core.truth_(k)) {
          return k
        }
        k = b.call(null, e);
        return cljs.core.truth_(k) ? k : c.call(null, e)
      }, n = function(d, e, k) {
        var n = a.call(null, d);
        if(cljs.core.truth_(n)) {
          return n
        }
        n = b.call(null, d);
        if(cljs.core.truth_(n)) {
          return n
        }
        d = c.call(null, d);
        if(cljs.core.truth_(d)) {
          return d
        }
        d = a.call(null, e);
        if(cljs.core.truth_(d)) {
          return d
        }
        d = b.call(null, e);
        if(cljs.core.truth_(d)) {
          return d
        }
        e = c.call(null, e);
        if(cljs.core.truth_(e)) {
          return e
        }
        e = a.call(null, k);
        if(cljs.core.truth_(e)) {
          return e
        }
        e = b.call(null, k);
        return cljs.core.truth_(e) ? e : c.call(null, k)
      }, p = function() {
        var e = function(e, k, n, m) {
          e = d.call(null, e, k, n);
          return cljs.core.truth_(e) ? e : cljs.core.some.call(null, function(d) {
            var e = a.call(null, d);
            if(cljs.core.truth_(e)) {
              return e
            }
            e = b.call(null, d);
            return cljs.core.truth_(e) ? e : c.call(null, d)
          }, m)
        }, k = function(a, b, c, d) {
          var f = null;
          3 < arguments.length && (f = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3), 0));
          return e.call(this, a, b, c, f)
        };
        k.cljs$lang$maxFixedArity = 3;
        k.cljs$lang$applyTo = function(a) {
          var b = cljs.core.first(a);
          a = cljs.core.next(a);
          var c = cljs.core.first(a);
          a = cljs.core.next(a);
          var d = cljs.core.first(a);
          a = cljs.core.rest(a);
          return e(b, c, d, a)
        };
        k.cljs$core$IFn$_invoke$arity$variadic = e;
        return k
      }(), d = function(a, b, c, d) {
        switch(arguments.length) {
          case 0:
            return null;
          case 1:
            return e.call(this, a);
          case 2:
            return k.call(this, a, b);
          case 3:
            return n.call(this, a, b, c);
          default:
            return p.cljs$core$IFn$_invoke$arity$variadic(a, b, c, cljs.core.array_seq(arguments, 3))
        }
        throw Error("Invalid arity: " + arguments.length);
      };
      d.cljs$lang$maxFixedArity = 3;
      d.cljs$lang$applyTo = p.cljs$lang$applyTo;
      d.cljs$core$IFn$_invoke$arity$0 = function() {
        return null
      };
      d.cljs$core$IFn$_invoke$arity$1 = e;
      d.cljs$core$IFn$_invoke$arity$2 = k;
      d.cljs$core$IFn$_invoke$arity$3 = n;
      d.cljs$core$IFn$_invoke$arity$variadic = p.cljs$core$IFn$_invoke$arity$variadic;
      return d
    }()
  }, e = function() {
    var a = function(a, b, c, d) {
      var e = cljs.core.list_STAR_.call(null, a, b, c, d);
      return function() {
        var a = null, b = function(a) {
          return cljs.core.some.call(null, function(b) {
            return b.call(null, a)
          }, e)
        }, c = function(a, b) {
          return cljs.core.some.call(null, function(c) {
            var d = c.call(null, a);
            return cljs.core.truth_(d) ? d : c.call(null, b)
          }, e)
        }, d = function(a, b, c) {
          return cljs.core.some.call(null, function(d) {
            var e = d.call(null, a);
            if(cljs.core.truth_(e)) {
              return e
            }
            e = d.call(null, b);
            return cljs.core.truth_(e) ? e : d.call(null, c)
          }, e)
        }, f = function() {
          var b = function(b, c, d, f) {
            b = a.call(null, b, c, d);
            return cljs.core.truth_(b) ? b : cljs.core.some.call(null, function(a) {
              return cljs.core.some.call(null, a, f)
            }, e)
          }, c = function(a, c, d, e) {
            var f = null;
            3 < arguments.length && (f = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3), 0));
            return b.call(this, a, c, d, f)
          };
          c.cljs$lang$maxFixedArity = 3;
          c.cljs$lang$applyTo = function(a) {
            var c = cljs.core.first(a);
            a = cljs.core.next(a);
            var d = cljs.core.first(a);
            a = cljs.core.next(a);
            var e = cljs.core.first(a);
            a = cljs.core.rest(a);
            return b(c, d, e, a)
          };
          c.cljs$core$IFn$_invoke$arity$variadic = b;
          return c
        }(), a = function(a, e, g, h) {
          switch(arguments.length) {
            case 0:
              return null;
            case 1:
              return b.call(this, a);
            case 2:
              return c.call(this, a, e);
            case 3:
              return d.call(this, a, e, g);
            default:
              return f.cljs$core$IFn$_invoke$arity$variadic(a, e, g, cljs.core.array_seq(arguments, 3))
          }
          throw Error("Invalid arity: " + arguments.length);
        };
        a.cljs$lang$maxFixedArity = 3;
        a.cljs$lang$applyTo = f.cljs$lang$applyTo;
        a.cljs$core$IFn$_invoke$arity$0 = function() {
          return null
        };
        a.cljs$core$IFn$_invoke$arity$1 = b;
        a.cljs$core$IFn$_invoke$arity$2 = c;
        a.cljs$core$IFn$_invoke$arity$3 = d;
        a.cljs$core$IFn$_invoke$arity$variadic = f.cljs$core$IFn$_invoke$arity$variadic;
        return a
      }()
    }, b = function(b, c, d, e) {
      var g = null;
      3 < arguments.length && (g = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3), 0));
      return a.call(this, b, c, d, g)
    };
    b.cljs$lang$maxFixedArity = 3;
    b.cljs$lang$applyTo = function(b) {
      var c = cljs.core.first(b);
      b = cljs.core.next(b);
      var d = cljs.core.first(b);
      b = cljs.core.next(b);
      var e = cljs.core.first(b);
      b = cljs.core.rest(b);
      return a(c, d, e, b)
    };
    b.cljs$core$IFn$_invoke$arity$variadic = a;
    return b
  }(), a = function(a, g, h, l) {
    switch(arguments.length) {
      case 1:
        return b.call(this, a);
      case 2:
        return c.call(this, a, g);
      case 3:
        return d.call(this, a, g, h);
      default:
        return e.cljs$core$IFn$_invoke$arity$variadic(a, g, h, cljs.core.array_seq(arguments, 3))
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$lang$maxFixedArity = 3;
  a.cljs$lang$applyTo = e.cljs$lang$applyTo;
  a.cljs$core$IFn$_invoke$arity$1 = b;
  a.cljs$core$IFn$_invoke$arity$2 = c;
  a.cljs$core$IFn$_invoke$arity$3 = d;
  a.cljs$core$IFn$_invoke$arity$variadic = e.cljs$core$IFn$_invoke$arity$variadic;
  return a
}();
cljs.core.map = function() {
  var a = null, b = function(b, c) {
    return new cljs.core.LazySeq(null, function() {
      var d = cljs.core.seq.call(null, c);
      if(d) {
        if(cljs.core.chunked_seq_QMARK_.call(null, d)) {
          for(var e = cljs.core.chunk_first.call(null, d), m = cljs.core.count.call(null, e), k = cljs.core.chunk_buffer.call(null, m), n = 0;;) {
            if(n < m) {
              cljs.core.chunk_append.call(null, k, b.call(null, cljs.core._nth.call(null, e, n))), n += 1
            }else {
              break
            }
          }
          return cljs.core.chunk_cons.call(null, cljs.core.chunk.call(null, k), a.call(null, b, cljs.core.chunk_rest.call(null, d)))
        }
        return cljs.core.cons.call(null, b.call(null, cljs.core.first.call(null, d)), a.call(null, b, cljs.core.rest.call(null, d)))
      }
      return null
    }, null, null)
  }, c = function(b, c, d) {
    return new cljs.core.LazySeq(null, function() {
      var e = cljs.core.seq.call(null, c), m = cljs.core.seq.call(null, d);
      return e && m ? cljs.core.cons.call(null, b.call(null, cljs.core.first.call(null, e), cljs.core.first.call(null, m)), a.call(null, b, cljs.core.rest.call(null, e), cljs.core.rest.call(null, m))) : null
    }, null, null)
  }, d = function(b, c, d, e) {
    return new cljs.core.LazySeq(null, function() {
      var m = cljs.core.seq.call(null, c), k = cljs.core.seq.call(null, d), n = cljs.core.seq.call(null, e);
      return m && k && n ? cljs.core.cons.call(null, b.call(null, cljs.core.first.call(null, m), cljs.core.first.call(null, k), cljs.core.first.call(null, n)), a.call(null, b, cljs.core.rest.call(null, m), cljs.core.rest.call(null, k), cljs.core.rest.call(null, n))) : null
    }, null, null)
  }, e = function() {
    var b = function(b, c, d, e, f) {
      return a.call(null, function(a) {
        return cljs.core.apply.call(null, b, a)
      }, function s(b) {
        return new cljs.core.LazySeq(null, function() {
          var c = a.call(null, cljs.core.seq, b);
          return cljs.core.every_QMARK_.call(null, cljs.core.identity, c) ? cljs.core.cons.call(null, a.call(null, cljs.core.first, c), s.call(null, a.call(null, cljs.core.rest, c))) : null
        }, null, null)
      }.call(null, cljs.core.conj.call(null, f, e, d, c)))
    }, c = function(a, c, d, e, g) {
      var p = null;
      4 < arguments.length && (p = cljs.core.array_seq(Array.prototype.slice.call(arguments, 4), 0));
      return b.call(this, a, c, d, e, p)
    };
    c.cljs$lang$maxFixedArity = 4;
    c.cljs$lang$applyTo = function(a) {
      var c = cljs.core.first(a);
      a = cljs.core.next(a);
      var d = cljs.core.first(a);
      a = cljs.core.next(a);
      var e = cljs.core.first(a);
      a = cljs.core.next(a);
      var g = cljs.core.first(a);
      a = cljs.core.rest(a);
      return b(c, d, e, g, a)
    };
    c.cljs$core$IFn$_invoke$arity$variadic = b;
    return c
  }(), a = function(a, g, h, l, m) {
    switch(arguments.length) {
      case 2:
        return b.call(this, a, g);
      case 3:
        return c.call(this, a, g, h);
      case 4:
        return d.call(this, a, g, h, l);
      default:
        return e.cljs$core$IFn$_invoke$arity$variadic(a, g, h, l, cljs.core.array_seq(arguments, 4))
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$lang$maxFixedArity = 4;
  a.cljs$lang$applyTo = e.cljs$lang$applyTo;
  a.cljs$core$IFn$_invoke$arity$2 = b;
  a.cljs$core$IFn$_invoke$arity$3 = c;
  a.cljs$core$IFn$_invoke$arity$4 = d;
  a.cljs$core$IFn$_invoke$arity$variadic = e.cljs$core$IFn$_invoke$arity$variadic;
  return a
}();
cljs.core.take = function take(b, c) {
  return new cljs.core.LazySeq(null, function() {
    if(0 < b) {
      var d = cljs.core.seq.call(null, c);
      return d ? cljs.core.cons.call(null, cljs.core.first.call(null, d), take.call(null, b - 1, cljs.core.rest.call(null, d))) : null
    }
    return null
  }, null, null)
};
cljs.core.drop = function(a, b) {
  var c = function(a, b) {
    for(;;) {
      var c = cljs.core.seq.call(null, b);
      if(0 < a && c) {
        var g = a - 1, c = cljs.core.rest.call(null, c);
        a = g;
        b = c
      }else {
        return c
      }
    }
  };
  return new cljs.core.LazySeq(null, function() {
    return c.call(null, a, b)
  }, null, null)
};
cljs.core.drop_last = function() {
  var a = null, b = function(b) {
    return a.call(null, 1, b)
  }, c = function(a, b) {
    return cljs.core.map.call(null, function(a, b) {
      return a
    }, b, cljs.core.drop.call(null, a, b))
  }, a = function(a, e) {
    switch(arguments.length) {
      case 1:
        return b.call(this, a);
      case 2:
        return c.call(this, a, e)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$core$IFn$_invoke$arity$1 = b;
  a.cljs$core$IFn$_invoke$arity$2 = c;
  return a
}();
cljs.core.take_last = function(a, b) {
  for(var c = cljs.core.seq.call(null, b), d = cljs.core.seq.call(null, cljs.core.drop.call(null, a, b));;) {
    if(d) {
      c = cljs.core.next.call(null, c), d = cljs.core.next.call(null, d)
    }else {
      return c
    }
  }
};
cljs.core.drop_while = function(a, b) {
  var c = function(a, b) {
    for(;;) {
      var c = cljs.core.seq.call(null, b);
      if(cljs.core.truth_(function() {
        var b = c;
        return b ? a.call(null, cljs.core.first.call(null, c)) : b
      }())) {
        var g = a, h = cljs.core.rest.call(null, c);
        a = g;
        b = h
      }else {
        return c
      }
    }
  };
  return new cljs.core.LazySeq(null, function() {
    return c.call(null, a, b)
  }, null, null)
};
cljs.core.cycle = function cycle(b) {
  return new cljs.core.LazySeq(null, function() {
    var c = cljs.core.seq.call(null, b);
    return c ? cljs.core.concat.call(null, c, cycle.call(null, c)) : null
  }, null, null)
};
cljs.core.split_at = function(a, b) {
  return cljs.core.PersistentVector.fromArray([cljs.core.take.call(null, a, b), cljs.core.drop.call(null, a, b)], !0)
};
cljs.core.repeat = function() {
  var a = null, b = function(b) {
    return new cljs.core.LazySeq(null, function() {
      return cljs.core.cons.call(null, b, a.call(null, b))
    }, null, null)
  }, c = function(b, c) {
    return cljs.core.take.call(null, b, a.call(null, c))
  }, a = function(a, e) {
    switch(arguments.length) {
      case 1:
        return b.call(this, a);
      case 2:
        return c.call(this, a, e)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$core$IFn$_invoke$arity$1 = b;
  a.cljs$core$IFn$_invoke$arity$2 = c;
  return a
}();
cljs.core.replicate = function(a, b) {
  return cljs.core.take.call(null, a, cljs.core.repeat.call(null, b))
};
cljs.core.repeatedly = function() {
  var a = null, b = function(b) {
    return new cljs.core.LazySeq(null, function() {
      return cljs.core.cons.call(null, b.call(null), a.call(null, b))
    }, null, null)
  }, c = function(b, c) {
    return cljs.core.take.call(null, b, a.call(null, c))
  }, a = function(a, e) {
    switch(arguments.length) {
      case 1:
        return b.call(this, a);
      case 2:
        return c.call(this, a, e)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$core$IFn$_invoke$arity$1 = b;
  a.cljs$core$IFn$_invoke$arity$2 = c;
  return a
}();
cljs.core.iterate = function iterate(b, c) {
  return cljs.core.cons.call(null, c, new cljs.core.LazySeq(null, function() {
    return iterate.call(null, b, b.call(null, c))
  }, null, null))
};
cljs.core.interleave = function() {
  var a = null, b = function(b, c) {
    return new cljs.core.LazySeq(null, function() {
      var f = cljs.core.seq.call(null, b), g = cljs.core.seq.call(null, c);
      return f && g ? cljs.core.cons.call(null, cljs.core.first.call(null, f), cljs.core.cons.call(null, cljs.core.first.call(null, g), a.call(null, cljs.core.rest.call(null, f), cljs.core.rest.call(null, g)))) : null
    }, null, null)
  }, c = function() {
    var b = function(b, c, d) {
      return new cljs.core.LazySeq(null, function() {
        var e = cljs.core.map.call(null, cljs.core.seq, cljs.core.conj.call(null, d, c, b));
        return cljs.core.every_QMARK_.call(null, cljs.core.identity, e) ? cljs.core.concat.call(null, cljs.core.map.call(null, cljs.core.first, e), cljs.core.apply.call(null, a, cljs.core.map.call(null, cljs.core.rest, e))) : null
      }, null, null)
    }, c = function(a, c, e) {
      var l = null;
      2 < arguments.length && (l = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2), 0));
      return b.call(this, a, c, l)
    };
    c.cljs$lang$maxFixedArity = 2;
    c.cljs$lang$applyTo = function(a) {
      var c = cljs.core.first(a);
      a = cljs.core.next(a);
      var e = cljs.core.first(a);
      a = cljs.core.rest(a);
      return b(c, e, a)
    };
    c.cljs$core$IFn$_invoke$arity$variadic = b;
    return c
  }(), a = function(a, e, f) {
    switch(arguments.length) {
      case 2:
        return b.call(this, a, e);
      default:
        return c.cljs$core$IFn$_invoke$arity$variadic(a, e, cljs.core.array_seq(arguments, 2))
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$lang$maxFixedArity = 2;
  a.cljs$lang$applyTo = c.cljs$lang$applyTo;
  a.cljs$core$IFn$_invoke$arity$2 = b;
  a.cljs$core$IFn$_invoke$arity$variadic = c.cljs$core$IFn$_invoke$arity$variadic;
  return a
}();
cljs.core.interpose = function(a, b) {
  return cljs.core.drop.call(null, 1, cljs.core.interleave.call(null, cljs.core.repeat.call(null, a), b))
};
cljs.core.flatten1 = function(a) {
  return function c(a, e) {
    return new cljs.core.LazySeq(null, function() {
      var f = cljs.core.seq.call(null, a);
      return f ? cljs.core.cons.call(null, cljs.core.first.call(null, f), c.call(null, cljs.core.rest.call(null, f), e)) : cljs.core.seq.call(null, e) ? c.call(null, cljs.core.first.call(null, e), cljs.core.rest.call(null, e)) : null
    }, null, null)
  }.call(null, null, a)
};
cljs.core.mapcat = function() {
  var a = null, b = function(a, b) {
    return cljs.core.flatten1.call(null, cljs.core.map.call(null, a, b))
  }, c = function() {
    var a = function(a, b, c) {
      return cljs.core.flatten1.call(null, cljs.core.apply.call(null, cljs.core.map, a, b, c))
    }, b = function(b, c, e) {
      var l = null;
      2 < arguments.length && (l = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2), 0));
      return a.call(this, b, c, l)
    };
    b.cljs$lang$maxFixedArity = 2;
    b.cljs$lang$applyTo = function(b) {
      var c = cljs.core.first(b);
      b = cljs.core.next(b);
      var e = cljs.core.first(b);
      b = cljs.core.rest(b);
      return a(c, e, b)
    };
    b.cljs$core$IFn$_invoke$arity$variadic = a;
    return b
  }(), a = function(a, e, f) {
    switch(arguments.length) {
      case 2:
        return b.call(this, a, e);
      default:
        return c.cljs$core$IFn$_invoke$arity$variadic(a, e, cljs.core.array_seq(arguments, 2))
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$lang$maxFixedArity = 2;
  a.cljs$lang$applyTo = c.cljs$lang$applyTo;
  a.cljs$core$IFn$_invoke$arity$2 = b;
  a.cljs$core$IFn$_invoke$arity$variadic = c.cljs$core$IFn$_invoke$arity$variadic;
  return a
}();
cljs.core.filter = function filter(b, c) {
  return new cljs.core.LazySeq(null, function() {
    var d = cljs.core.seq.call(null, c);
    if(d) {
      if(cljs.core.chunked_seq_QMARK_.call(null, d)) {
        for(var e = cljs.core.chunk_first.call(null, d), f = cljs.core.count.call(null, e), g = cljs.core.chunk_buffer.call(null, f), h = 0;;) {
          if(h < f) {
            cljs.core.truth_(b.call(null, cljs.core._nth.call(null, e, h))) && cljs.core.chunk_append.call(null, g, cljs.core._nth.call(null, e, h)), h += 1
          }else {
            break
          }
        }
        return cljs.core.chunk_cons.call(null, cljs.core.chunk.call(null, g), filter.call(null, b, cljs.core.chunk_rest.call(null, d)))
      }
      e = cljs.core.first.call(null, d);
      d = cljs.core.rest.call(null, d);
      return cljs.core.truth_(b.call(null, e)) ? cljs.core.cons.call(null, e, filter.call(null, b, d)) : filter.call(null, b, d)
    }
    return null
  }, null, null)
};
cljs.core.remove = function(a, b) {
  return cljs.core.filter.call(null, cljs.core.complement.call(null, a), b)
};
cljs.core.tree_seq = function(a, b, c) {
  return function e(c) {
    return new cljs.core.LazySeq(null, function() {
      return cljs.core.cons.call(null, c, cljs.core.truth_(a.call(null, c)) ? cljs.core.mapcat.call(null, e, b.call(null, c)) : null)
    }, null, null)
  }.call(null, c)
};
cljs.core.flatten = function(a) {
  return cljs.core.filter.call(null, function(a) {
    return!cljs.core.sequential_QMARK_.call(null, a)
  }, cljs.core.rest.call(null, cljs.core.tree_seq.call(null, cljs.core.sequential_QMARK_, cljs.core.seq, a)))
};
cljs.core.into = function(a, b) {
  return null != a ? a && (a.cljs$lang$protocol_mask$partition1$ & 4 || a.cljs$core$IEditableCollection$) ? cljs.core.persistent_BANG_.call(null, cljs.core.reduce.call(null, cljs.core._conj_BANG_, cljs.core.transient$.call(null, a), b)) : cljs.core.reduce.call(null, cljs.core._conj, a, b) : cljs.core.reduce.call(null, cljs.core.conj, cljs.core.List.EMPTY, b)
};
cljs.core.mapv = function() {
  var a = null, b = function(a, b) {
    return cljs.core.persistent_BANG_.call(null, cljs.core.reduce.call(null, function(b, c) {
      return cljs.core.conj_BANG_.call(null, b, a.call(null, c))
    }, cljs.core.transient$.call(null, cljs.core.PersistentVector.EMPTY), b))
  }, c = function(a, b, c) {
    return cljs.core.into.call(null, cljs.core.PersistentVector.EMPTY, cljs.core.map.call(null, a, b, c))
  }, d = function(a, b, c, d) {
    return cljs.core.into.call(null, cljs.core.PersistentVector.EMPTY, cljs.core.map.call(null, a, b, c, d))
  }, e = function() {
    var a = function(a, b, c, d, e) {
      return cljs.core.into.call(null, cljs.core.PersistentVector.EMPTY, cljs.core.apply.call(null, cljs.core.map, a, b, c, d, e))
    }, b = function(b, c, d, e, g) {
      var p = null;
      4 < arguments.length && (p = cljs.core.array_seq(Array.prototype.slice.call(arguments, 4), 0));
      return a.call(this, b, c, d, e, p)
    };
    b.cljs$lang$maxFixedArity = 4;
    b.cljs$lang$applyTo = function(b) {
      var c = cljs.core.first(b);
      b = cljs.core.next(b);
      var d = cljs.core.first(b);
      b = cljs.core.next(b);
      var e = cljs.core.first(b);
      b = cljs.core.next(b);
      var g = cljs.core.first(b);
      b = cljs.core.rest(b);
      return a(c, d, e, g, b)
    };
    b.cljs$core$IFn$_invoke$arity$variadic = a;
    return b
  }(), a = function(a, g, h, l, m) {
    switch(arguments.length) {
      case 2:
        return b.call(this, a, g);
      case 3:
        return c.call(this, a, g, h);
      case 4:
        return d.call(this, a, g, h, l);
      default:
        return e.cljs$core$IFn$_invoke$arity$variadic(a, g, h, l, cljs.core.array_seq(arguments, 4))
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$lang$maxFixedArity = 4;
  a.cljs$lang$applyTo = e.cljs$lang$applyTo;
  a.cljs$core$IFn$_invoke$arity$2 = b;
  a.cljs$core$IFn$_invoke$arity$3 = c;
  a.cljs$core$IFn$_invoke$arity$4 = d;
  a.cljs$core$IFn$_invoke$arity$variadic = e.cljs$core$IFn$_invoke$arity$variadic;
  return a
}();
cljs.core.filterv = function(a, b) {
  return cljs.core.persistent_BANG_.call(null, cljs.core.reduce.call(null, function(b, d) {
    return cljs.core.truth_(a.call(null, d)) ? cljs.core.conj_BANG_.call(null, b, d) : b
  }, cljs.core.transient$.call(null, cljs.core.PersistentVector.EMPTY), b))
};
cljs.core.partition = function() {
  var a = null, b = function(b, c) {
    return a.call(null, b, b, c)
  }, c = function(b, c, d) {
    return new cljs.core.LazySeq(null, function() {
      var h = cljs.core.seq.call(null, d);
      if(h) {
        var l = cljs.core.take.call(null, b, h);
        return b === cljs.core.count.call(null, l) ? cljs.core.cons.call(null, l, a.call(null, b, c, cljs.core.drop.call(null, c, h))) : null
      }
      return null
    }, null, null)
  }, d = function(b, c, d, h) {
    return new cljs.core.LazySeq(null, function() {
      var l = cljs.core.seq.call(null, h);
      if(l) {
        var m = cljs.core.take.call(null, b, l);
        return b === cljs.core.count.call(null, m) ? cljs.core.cons.call(null, m, a.call(null, b, c, d, cljs.core.drop.call(null, c, l))) : cljs.core._conj.call(null, cljs.core.List.EMPTY, cljs.core.take.call(null, b, cljs.core.concat.call(null, m, d)))
      }
      return null
    }, null, null)
  }, a = function(a, f, g, h) {
    switch(arguments.length) {
      case 2:
        return b.call(this, a, f);
      case 3:
        return c.call(this, a, f, g);
      case 4:
        return d.call(this, a, f, g, h)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$core$IFn$_invoke$arity$2 = b;
  a.cljs$core$IFn$_invoke$arity$3 = c;
  a.cljs$core$IFn$_invoke$arity$4 = d;
  return a
}();
cljs.core.get_in = function() {
  var a = null, b = function(b, c) {
    return a.call(null, b, c, null)
  }, c = function(a, b, c) {
    var g = cljs.core.lookup_sentinel;
    for(b = cljs.core.seq.call(null, b);;) {
      if(b) {
        var h = a;
        if(h ? h.cljs$lang$protocol_mask$partition0$ & 256 || h.cljs$core$ILookup$ || (h.cljs$lang$protocol_mask$partition0$ ? 0 : cljs.core.native_satisfies_QMARK_.call(null, cljs.core.ILookup, h)) : cljs.core.native_satisfies_QMARK_.call(null, cljs.core.ILookup, h)) {
          a = cljs.core.get.call(null, a, cljs.core.first.call(null, b), g);
          if(g === a) {
            return c
          }
          b = cljs.core.next.call(null, b)
        }else {
          return c
        }
      }else {
        return a
      }
    }
  }, a = function(a, e, f) {
    switch(arguments.length) {
      case 2:
        return b.call(this, a, e);
      case 3:
        return c.call(this, a, e, f)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$core$IFn$_invoke$arity$2 = b;
  a.cljs$core$IFn$_invoke$arity$3 = c;
  return a
}();
cljs.core.assoc_in = function assoc_in(b, c, d) {
  var e = cljs.core.nth.call(null, c, 0, null);
  c = cljs.core.nthnext.call(null, c, 1);
  return cljs.core.truth_(c) ? cljs.core.assoc.call(null, b, e, assoc_in.call(null, cljs.core.get.call(null, b, e), c, d)) : cljs.core.assoc.call(null, b, e, d)
};
cljs.core.update_in = function() {
  var a = null, b = function(b, c, d) {
    var e = cljs.core.nth.call(null, c, 0, null);
    c = cljs.core.nthnext.call(null, c, 1);
    return cljs.core.truth_(c) ? cljs.core.assoc.call(null, b, e, a.call(null, cljs.core.get.call(null, b, e), c, d)) : cljs.core.assoc.call(null, b, e, d.call(null, cljs.core.get.call(null, b, e)))
  }, c = function(b, c, d, e) {
    var f = cljs.core.nth.call(null, c, 0, null);
    c = cljs.core.nthnext.call(null, c, 1);
    return cljs.core.truth_(c) ? cljs.core.assoc.call(null, b, f, a.call(null, cljs.core.get.call(null, b, f), c, d, e)) : cljs.core.assoc.call(null, b, f, d.call(null, cljs.core.get.call(null, b, f), e))
  }, d = function(b, c, d, e, f) {
    var n = cljs.core.nth.call(null, c, 0, null);
    c = cljs.core.nthnext.call(null, c, 1);
    return cljs.core.truth_(c) ? cljs.core.assoc.call(null, b, n, a.call(null, cljs.core.get.call(null, b, n), c, d, e, f)) : cljs.core.assoc.call(null, b, n, d.call(null, cljs.core.get.call(null, b, n), e, f))
  }, e = function(b, c, d, e, f, n) {
    var p = cljs.core.nth.call(null, c, 0, null);
    c = cljs.core.nthnext.call(null, c, 1);
    return cljs.core.truth_(c) ? cljs.core.assoc.call(null, b, p, a.call(null, cljs.core.get.call(null, b, p), c, d, e, f, n)) : cljs.core.assoc.call(null, b, p, d.call(null, cljs.core.get.call(null, b, p), e, f, n))
  }, f = function() {
    var b = function(b, c, d, e, f, g, h) {
      var q = cljs.core.nth.call(null, c, 0, null);
      c = cljs.core.nthnext.call(null, c, 1);
      return cljs.core.truth_(c) ? cljs.core.assoc.call(null, b, q, cljs.core.apply.call(null, a, cljs.core.get.call(null, b, q), c, d, e, f, g, h)) : cljs.core.assoc.call(null, b, q, cljs.core.apply.call(null, d, cljs.core.get.call(null, b, q), e, f, g, h))
    }, c = function(a, c, d, e, f, h, r) {
      var q = null;
      6 < arguments.length && (q = cljs.core.array_seq(Array.prototype.slice.call(arguments, 6), 0));
      return b.call(this, a, c, d, e, f, h, q)
    };
    c.cljs$lang$maxFixedArity = 6;
    c.cljs$lang$applyTo = function(a) {
      var c = cljs.core.first(a);
      a = cljs.core.next(a);
      var d = cljs.core.first(a);
      a = cljs.core.next(a);
      var e = cljs.core.first(a);
      a = cljs.core.next(a);
      var f = cljs.core.first(a);
      a = cljs.core.next(a);
      var h = cljs.core.first(a);
      a = cljs.core.next(a);
      var r = cljs.core.first(a);
      a = cljs.core.rest(a);
      return b(c, d, e, f, h, r, a)
    };
    c.cljs$core$IFn$_invoke$arity$variadic = b;
    return c
  }(), a = function(a, h, l, m, k, n, p) {
    switch(arguments.length) {
      case 3:
        return b.call(this, a, h, l);
      case 4:
        return c.call(this, a, h, l, m);
      case 5:
        return d.call(this, a, h, l, m, k);
      case 6:
        return e.call(this, a, h, l, m, k, n);
      default:
        return f.cljs$core$IFn$_invoke$arity$variadic(a, h, l, m, k, n, cljs.core.array_seq(arguments, 6))
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$lang$maxFixedArity = 6;
  a.cljs$lang$applyTo = f.cljs$lang$applyTo;
  a.cljs$core$IFn$_invoke$arity$3 = b;
  a.cljs$core$IFn$_invoke$arity$4 = c;
  a.cljs$core$IFn$_invoke$arity$5 = d;
  a.cljs$core$IFn$_invoke$arity$6 = e;
  a.cljs$core$IFn$_invoke$arity$variadic = f.cljs$core$IFn$_invoke$arity$variadic;
  return a
}();
cljs.core.VectorNode = function(a, b) {
  this.edit = a;
  this.arr = b
};
cljs.core.VectorNode.cljs$lang$type = !0;
cljs.core.VectorNode.cljs$lang$ctorStr = "cljs.core/VectorNode";
cljs.core.VectorNode.cljs$lang$ctorPrWriter = function(a, b, c) {
  return cljs.core._write.call(null, b, "cljs.core/VectorNode")
};
cljs.core.__GT_VectorNode = function(a, b) {
  return new cljs.core.VectorNode(a, b)
};
cljs.core.pv_fresh_node = function(a) {
  return new cljs.core.VectorNode(a, Array(32))
};
cljs.core.pv_aget = function(a, b) {
  return a.arr[b]
};
cljs.core.pv_aset = function(a, b, c) {
  return a.arr[b] = c
};
cljs.core.pv_clone_node = function(a) {
  return new cljs.core.VectorNode(a.edit, a.arr.slice())
};
cljs.core.tail_off = function(a) {
  a = a.cnt;
  return 32 > a ? 0 : a - 1 >>> 5 << 5
};
cljs.core.new_path = function(a, b, c) {
  for(;;) {
    if(0 === b) {
      return c
    }
    var d = cljs.core.pv_fresh_node.call(null, a);
    cljs.core.pv_aset.call(null, d, 0, c);
    c = d;
    b -= 5
  }
};
cljs.core.push_tail = function push_tail(b, c, d, e) {
  var f = cljs.core.pv_clone_node.call(null, d), g = b.cnt - 1 >>> c & 31;
  5 === c ? cljs.core.pv_aset.call(null, f, g, e) : (d = cljs.core.pv_aget.call(null, d, g), b = null != d ? push_tail.call(null, b, c - 5, d, e) : cljs.core.new_path.call(null, null, c - 5, e), cljs.core.pv_aset.call(null, f, g, b));
  return f
};
cljs.core.vector_index_out_of_bounds = function(a, b) {
  throw Error([cljs.core.str("No item "), cljs.core.str(a), cljs.core.str(" in vector of length "), cljs.core.str(b)].join(""));
};
cljs.core.array_for = function(a, b) {
  if(0 <= b && b < a.cnt) {
    if(b >= cljs.core.tail_off.call(null, a)) {
      return a.tail
    }
    for(var c = a.root, d = a.shift;;) {
      if(0 < d) {
        c = cljs.core.pv_aget.call(null, c, b >>> d & 31), d -= 5
      }else {
        return c.arr
      }
    }
  }else {
    return cljs.core.vector_index_out_of_bounds.call(null, b, a.cnt)
  }
};
cljs.core.do_assoc = function do_assoc(b, c, d, e, f) {
  var g = cljs.core.pv_clone_node.call(null, d);
  if(0 === c) {
    cljs.core.pv_aset.call(null, g, e & 31, f)
  }else {
    var h = e >>> c & 31;
    cljs.core.pv_aset.call(null, g, h, do_assoc.call(null, b, c - 5, cljs.core.pv_aget.call(null, d, h), e, f))
  }
  return g
};
cljs.core.pop_tail = function pop_tail(b, c, d) {
  var e = b.cnt - 2 >>> c & 31;
  if(5 < c) {
    b = pop_tail.call(null, b, c - 5, cljs.core.pv_aget.call(null, d, e));
    if(null == b && 0 === e) {
      return null
    }
    d = cljs.core.pv_clone_node.call(null, d);
    cljs.core.pv_aset.call(null, d, e, b);
    return d
  }
  return 0 === e ? null : new cljs.core.Keyword(null, "else", "else", 1017020587) ? (d = cljs.core.pv_clone_node.call(null, d), cljs.core.pv_aset.call(null, d, e, null), d) : null
};
cljs.core.PersistentVector = function(a, b, c, d, e, f) {
  this.meta = a;
  this.cnt = b;
  this.shift = c;
  this.root = d;
  this.tail = e;
  this.__hash = f;
  this.cljs$lang$protocol_mask$partition1$ = 4;
  this.cljs$lang$protocol_mask$partition0$ = 167668511
};
cljs.core.PersistentVector.cljs$lang$type = !0;
cljs.core.PersistentVector.cljs$lang$ctorStr = "cljs.core/PersistentVector";
cljs.core.PersistentVector.cljs$lang$ctorPrWriter = function(a, b, c) {
  return cljs.core._write.call(null, b, "cljs.core/PersistentVector")
};
cljs.core.PersistentVector.prototype.cljs$core$IEditableCollection$_as_transient$arity$1 = function(a) {
  return new cljs.core.TransientVector(this.cnt, this.shift, cljs.core.tv_editable_root.call(null, this.root), cljs.core.tv_editable_tail.call(null, this.tail))
};
cljs.core.PersistentVector.prototype.cljs$core$IHash$_hash$arity$1 = function(a) {
  a = this.__hash;
  return null != a ? a : this.__hash = a = cljs.core.hash_coll.call(null, this)
};
cljs.core.PersistentVector.prototype.cljs$core$ILookup$_lookup$arity$2 = function(a, b) {
  return cljs.core._nth.call(null, this, b, null)
};
cljs.core.PersistentVector.prototype.cljs$core$ILookup$_lookup$arity$3 = function(a, b, c) {
  return cljs.core._nth.call(null, this, b, c)
};
cljs.core.PersistentVector.prototype.cljs$core$IAssociative$_assoc$arity$3 = function(a, b, c) {
  if(0 <= b && b < this.cnt) {
    return cljs.core.tail_off.call(null, this) <= b ? (a = this.tail.slice(), a[b & 31] = c, new cljs.core.PersistentVector(this.meta, this.cnt, this.shift, this.root, a, null)) : new cljs.core.PersistentVector(this.meta, this.cnt, this.shift, cljs.core.do_assoc.call(null, this, this.shift, this.root, b, c), this.tail, null)
  }
  if(b === this.cnt) {
    return cljs.core._conj.call(null, this, c)
  }
  if(new cljs.core.Keyword(null, "else", "else", 1017020587)) {
    throw Error([cljs.core.str("Index "), cljs.core.str(b), cljs.core.str(" out of bounds  [0,"), cljs.core.str(this.cnt), cljs.core.str("]")].join(""));
  }
  return null
};
cljs.core.PersistentVector.prototype.call = function() {
  var a = null;
  return a = function(a, c, d) {
    switch(arguments.length) {
      case 2:
        return this.cljs$core$IIndexed$_nth$arity$2(null, c);
      case 3:
        return this.cljs$core$IIndexed$_nth$arity$3(null, c, d)
    }
    throw Error("Invalid arity: " + arguments.length);
  }
}();
cljs.core.PersistentVector.prototype.apply = function(a, b) {
  return this.call.apply(this, [this].concat(b.slice()))
};
cljs.core.PersistentVector.prototype.cljs$core$IFn$_invoke$arity$1 = function(a) {
  return this.cljs$core$IIndexed$_nth$arity$2(null, a)
};
cljs.core.PersistentVector.prototype.cljs$core$IFn$_invoke$arity$2 = function(a, b) {
  return this.cljs$core$IIndexed$_nth$arity$3(null, a, b)
};
cljs.core.PersistentVector.prototype.cljs$core$IKVReduce$_kv_reduce$arity$3 = function(a, b, c) {
  a = [0, c];
  for(c = 0;;) {
    if(c < this.cnt) {
      var d = cljs.core.array_for.call(null, this, c), e = d.length;
      a: {
        for(var f = 0, g = a[1];;) {
          if(f < e) {
            if(g = b.call(null, g, f + c, d[f]), cljs.core.reduced_QMARK_.call(null, g)) {
              d = g;
              break a
            }else {
              f += 1
            }
          }else {
            a[0] = e;
            d = a[1] = g;
            break a
          }
        }
        d = void 0
      }
      if(cljs.core.reduced_QMARK_.call(null, d)) {
        return cljs.core.deref.call(null, d)
      }
      c += a[0]
    }else {
      return a[1]
    }
  }
};
cljs.core.PersistentVector.prototype.cljs$core$ICollection$_conj$arity$2 = function(a, b) {
  if(32 > this.cnt - cljs.core.tail_off.call(null, this)) {
    var c = this.tail.slice();
    c.push(b);
    return new cljs.core.PersistentVector(this.meta, this.cnt + 1, this.shift, this.root, c, null)
  }
  var d = this.cnt >>> 5 > 1 << this.shift, c = d ? this.shift + 5 : this.shift;
  d ? (d = cljs.core.pv_fresh_node.call(null, null), cljs.core.pv_aset.call(null, d, 0, this.root), cljs.core.pv_aset.call(null, d, 1, cljs.core.new_path.call(null, null, this.shift, new cljs.core.VectorNode(null, this.tail)))) : d = cljs.core.push_tail.call(null, this, this.shift, this.root, new cljs.core.VectorNode(null, this.tail));
  return new cljs.core.PersistentVector(this.meta, this.cnt + 1, c, d, [b], null)
};
cljs.core.PersistentVector.prototype.cljs$core$IReversible$_rseq$arity$1 = function(a) {
  return 0 < this.cnt ? new cljs.core.RSeq(this, this.cnt - 1, null) : null
};
cljs.core.PersistentVector.prototype.cljs$core$IMapEntry$_key$arity$1 = function(a) {
  return cljs.core._nth.call(null, this, 0)
};
cljs.core.PersistentVector.prototype.cljs$core$IMapEntry$_val$arity$1 = function(a) {
  return cljs.core._nth.call(null, this, 1)
};
cljs.core.PersistentVector.prototype.toString = function() {
  return cljs.core.pr_str_STAR_.call(null, this)
};
cljs.core.PersistentVector.prototype.cljs$core$IReduce$_reduce$arity$2 = function(a, b) {
  return cljs.core.ci_reduce.call(null, this, b)
};
cljs.core.PersistentVector.prototype.cljs$core$IReduce$_reduce$arity$3 = function(a, b, c) {
  return cljs.core.ci_reduce.call(null, this, b, c)
};
cljs.core.PersistentVector.prototype.cljs$core$ISeqable$_seq$arity$1 = function(a) {
  return 0 === this.cnt ? null : 32 > this.cnt ? cljs.core.array_seq.call(null, this.tail) : new cljs.core.Keyword(null, "else", "else", 1017020587) ? cljs.core.chunked_seq.call(null, this, 0, 0) : null
};
cljs.core.PersistentVector.prototype.cljs$core$ICounted$_count$arity$1 = function(a) {
  return this.cnt
};
cljs.core.PersistentVector.prototype.cljs$core$IStack$_peek$arity$1 = function(a) {
  return 0 < this.cnt ? cljs.core._nth.call(null, this, this.cnt - 1) : null
};
cljs.core.PersistentVector.prototype.cljs$core$IStack$_pop$arity$1 = function(a) {
  if(0 === this.cnt) {
    throw Error("Can't pop empty vector");
  }
  if(1 === this.cnt) {
    return cljs.core._with_meta.call(null, cljs.core.PersistentVector.EMPTY, this.meta)
  }
  if(1 < this.cnt - cljs.core.tail_off.call(null, this)) {
    return new cljs.core.PersistentVector(this.meta, this.cnt - 1, this.shift, this.root, this.tail.slice(0, -1), null)
  }
  if(new cljs.core.Keyword(null, "else", "else", 1017020587)) {
    a = cljs.core.array_for.call(null, this, this.cnt - 2);
    var b = cljs.core.pop_tail.call(null, this, this.shift, this.root), b = null == b ? cljs.core.PersistentVector.EMPTY_NODE : b, c = this.cnt - 1;
    return 5 < this.shift && null == cljs.core.pv_aget.call(null, b, 1) ? new cljs.core.PersistentVector(this.meta, c, this.shift - 5, cljs.core.pv_aget.call(null, b, 0), a, null) : new cljs.core.PersistentVector(this.meta, c, this.shift, b, a, null)
  }
  return null
};
cljs.core.PersistentVector.prototype.cljs$core$IVector$_assoc_n$arity$3 = function(a, b, c) {
  return cljs.core._assoc.call(null, this, b, c)
};
cljs.core.PersistentVector.prototype.cljs$core$IEquiv$_equiv$arity$2 = function(a, b) {
  return cljs.core.equiv_sequential.call(null, this, b)
};
cljs.core.PersistentVector.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = function(a, b) {
  return new cljs.core.PersistentVector(b, this.cnt, this.shift, this.root, this.tail, this.__hash)
};
cljs.core.PersistentVector.prototype.cljs$core$IMeta$_meta$arity$1 = function(a) {
  return this.meta
};
cljs.core.PersistentVector.prototype.cljs$core$IIndexed$_nth$arity$2 = function(a, b) {
  return cljs.core.array_for.call(null, this, b)[b & 31]
};
cljs.core.PersistentVector.prototype.cljs$core$IIndexed$_nth$arity$3 = function(a, b, c) {
  return 0 <= b && b < this.cnt ? cljs.core._nth.call(null, this, b) : c
};
cljs.core.PersistentVector.prototype.cljs$core$IEmptyableCollection$_empty$arity$1 = function(a) {
  return cljs.core.with_meta.call(null, cljs.core.PersistentVector.EMPTY, this.meta)
};
cljs.core.__GT_PersistentVector = function(a, b, c, d, e, f) {
  return new cljs.core.PersistentVector(a, b, c, d, e, f)
};
cljs.core.PersistentVector.EMPTY_NODE = new cljs.core.VectorNode(null, Array(32));
cljs.core.PersistentVector.EMPTY = new cljs.core.PersistentVector(null, 0, 5, cljs.core.PersistentVector.EMPTY_NODE, [], 0);
cljs.core.PersistentVector.fromArray = function(a, b) {
  var c = a.length, d = b ? a : a.slice();
  if(32 > c) {
    return new cljs.core.PersistentVector(null, c, 5, cljs.core.PersistentVector.EMPTY_NODE, d, null)
  }
  for(var e = d.slice(0, 32), f = new cljs.core.PersistentVector(null, 32, 5, cljs.core.PersistentVector.EMPTY_NODE, e, null), e = 32, g = cljs.core._as_transient.call(null, f);;) {
    if(e < c) {
      f = e + 1, g = cljs.core.conj_BANG_.call(null, g, d[e]), e = f
    }else {
      return cljs.core.persistent_BANG_.call(null, g)
    }
  }
};
cljs.core.vec = function(a) {
  return cljs.core._persistent_BANG_.call(null, cljs.core.reduce.call(null, cljs.core._conj_BANG_, cljs.core._as_transient.call(null, cljs.core.PersistentVector.EMPTY), a))
};
cljs.core.vector = function() {
  var a = function(a) {
    return a instanceof cljs.core.IndexedSeq ? cljs.core.PersistentVector.fromArray.call(null, a.arr, !0) : cljs.core.vec.call(null, a)
  }, b = function(b) {
    var d = null;
    0 < arguments.length && (d = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0), 0));
    return a.call(this, d)
  };
  b.cljs$lang$maxFixedArity = 0;
  b.cljs$lang$applyTo = function(b) {
    b = cljs.core.seq(b);
    return a(b)
  };
  b.cljs$core$IFn$_invoke$arity$variadic = a;
  return b
}();
cljs.core.ChunkedSeq = function(a, b, c, d, e, f) {
  this.vec = a;
  this.node = b;
  this.i = c;
  this.off = d;
  this.meta = e;
  this.__hash = f;
  this.cljs$lang$protocol_mask$partition0$ = 32243948;
  this.cljs$lang$protocol_mask$partition1$ = 1536
};
cljs.core.ChunkedSeq.cljs$lang$type = !0;
cljs.core.ChunkedSeq.cljs$lang$ctorStr = "cljs.core/ChunkedSeq";
cljs.core.ChunkedSeq.cljs$lang$ctorPrWriter = function(a, b, c) {
  return cljs.core._write.call(null, b, "cljs.core/ChunkedSeq")
};
cljs.core.ChunkedSeq.prototype.cljs$core$IHash$_hash$arity$1 = function(a) {
  a = this.__hash;
  return null != a ? a : this.__hash = a = cljs.core.hash_coll.call(null, this)
};
cljs.core.ChunkedSeq.prototype.cljs$core$INext$_next$arity$1 = function(a) {
  return this.off + 1 < this.node.length ? (a = cljs.core.chunked_seq.call(null, this.vec, this.node, this.i, this.off + 1), null == a ? null : a) : cljs.core._chunked_next.call(null, this)
};
cljs.core.ChunkedSeq.prototype.cljs$core$ICollection$_conj$arity$2 = function(a, b) {
  return cljs.core.cons.call(null, b, this)
};
cljs.core.ChunkedSeq.prototype.toString = function() {
  return cljs.core.pr_str_STAR_.call(null, this)
};
cljs.core.ChunkedSeq.prototype.cljs$core$IReduce$_reduce$arity$2 = function(a, b) {
  return cljs.core.ci_reduce.call(null, cljs.core.subvec.call(null, this.vec, this.i + this.off, cljs.core.count.call(null, this.vec)), b)
};
cljs.core.ChunkedSeq.prototype.cljs$core$IReduce$_reduce$arity$3 = function(a, b, c) {
  return cljs.core.ci_reduce.call(null, cljs.core.subvec.call(null, this.vec, this.i + this.off, cljs.core.count.call(null, this.vec)), b, c)
};
cljs.core.ChunkedSeq.prototype.cljs$core$ISeqable$_seq$arity$1 = function(a) {
  return this
};
cljs.core.ChunkedSeq.prototype.cljs$core$ISeq$_first$arity$1 = function(a) {
  return this.node[this.off]
};
cljs.core.ChunkedSeq.prototype.cljs$core$ISeq$_rest$arity$1 = function(a) {
  return this.off + 1 < this.node.length ? (a = cljs.core.chunked_seq.call(null, this.vec, this.node, this.i, this.off + 1), null == a ? cljs.core.List.EMPTY : a) : cljs.core._chunked_rest.call(null, this)
};
cljs.core.ChunkedSeq.prototype.cljs$core$IChunkedNext$_chunked_next$arity$1 = function(a) {
  a = this.node.length;
  a = this.i + a < cljs.core._count.call(null, this.vec) ? cljs.core.chunked_seq.call(null, this.vec, this.i + a, 0) : null;
  return null == a ? null : a
};
cljs.core.ChunkedSeq.prototype.cljs$core$IEquiv$_equiv$arity$2 = function(a, b) {
  return cljs.core.equiv_sequential.call(null, this, b)
};
cljs.core.ChunkedSeq.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = function(a, b) {
  return cljs.core.chunked_seq.call(null, this.vec, this.node, this.i, this.off, b)
};
cljs.core.ChunkedSeq.prototype.cljs$core$IWithMeta$_meta$arity$1 = function(a) {
  return this.meta
};
cljs.core.ChunkedSeq.prototype.cljs$core$IEmptyableCollection$_empty$arity$1 = function(a) {
  return cljs.core.with_meta.call(null, cljs.core.PersistentVector.EMPTY, this.meta)
};
cljs.core.ChunkedSeq.prototype.cljs$core$IChunkedSeq$_chunked_first$arity$1 = function(a) {
  return cljs.core.array_chunk.call(null, this.node, this.off)
};
cljs.core.ChunkedSeq.prototype.cljs$core$IChunkedSeq$_chunked_rest$arity$1 = function(a) {
  a = this.node.length;
  a = this.i + a < cljs.core._count.call(null, this.vec) ? cljs.core.chunked_seq.call(null, this.vec, this.i + a, 0) : null;
  return null == a ? cljs.core.List.EMPTY : a
};
cljs.core.__GT_ChunkedSeq = function(a, b, c, d, e, f) {
  return new cljs.core.ChunkedSeq(a, b, c, d, e, f)
};
cljs.core.chunked_seq = function() {
  var a = null, b = function(a, b, c) {
    return new cljs.core.ChunkedSeq(a, cljs.core.array_for.call(null, a, b), b, c, null, null)
  }, c = function(a, b, c, d) {
    return new cljs.core.ChunkedSeq(a, b, c, d, null, null)
  }, d = function(a, b, c, d, l) {
    return new cljs.core.ChunkedSeq(a, b, c, d, l, null)
  }, a = function(a, f, g, h, l) {
    switch(arguments.length) {
      case 3:
        return b.call(this, a, f, g);
      case 4:
        return c.call(this, a, f, g, h);
      case 5:
        return d.call(this, a, f, g, h, l)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$core$IFn$_invoke$arity$3 = b;
  a.cljs$core$IFn$_invoke$arity$4 = c;
  a.cljs$core$IFn$_invoke$arity$5 = d;
  return a
}();
cljs.core.Subvec = function(a, b, c, d, e) {
  this.meta = a;
  this.v = b;
  this.start = c;
  this.end = d;
  this.__hash = e;
  this.cljs$lang$protocol_mask$partition1$ = 0;
  this.cljs$lang$protocol_mask$partition0$ = 32400159
};
cljs.core.Subvec.cljs$lang$type = !0;
cljs.core.Subvec.cljs$lang$ctorStr = "cljs.core/Subvec";
cljs.core.Subvec.cljs$lang$ctorPrWriter = function(a, b, c) {
  return cljs.core._write.call(null, b, "cljs.core/Subvec")
};
cljs.core.Subvec.prototype.cljs$core$IHash$_hash$arity$1 = function(a) {
  a = this.__hash;
  return null != a ? a : this.__hash = a = cljs.core.hash_coll.call(null, this)
};
cljs.core.Subvec.prototype.cljs$core$ILookup$_lookup$arity$2 = function(a, b) {
  return cljs.core._nth.call(null, this, b, null)
};
cljs.core.Subvec.prototype.cljs$core$ILookup$_lookup$arity$3 = function(a, b, c) {
  return cljs.core._nth.call(null, this, b, c)
};
cljs.core.Subvec.prototype.cljs$core$IAssociative$_assoc$arity$3 = function(a, b, c) {
  var d = this, e = d.start + b;
  return cljs.core.build_subvec.call(null, d.meta, cljs.core.assoc.call(null, d.v, e, c), d.start, function() {
    var a = d.end, b = e + 1;
    return a > b ? a : b
  }(), null)
};
cljs.core.Subvec.prototype.call = function() {
  var a = null;
  return a = function(a, c, d) {
    switch(arguments.length) {
      case 2:
        return this.cljs$core$IIndexed$_nth$arity$2(null, c);
      case 3:
        return this.cljs$core$IIndexed$_nth$arity$3(null, c, d)
    }
    throw Error("Invalid arity: " + arguments.length);
  }
}();
cljs.core.Subvec.prototype.apply = function(a, b) {
  return this.call.apply(this, [this].concat(b.slice()))
};
cljs.core.Subvec.prototype.cljs$core$IFn$_invoke$arity$1 = function(a) {
  return this.cljs$core$IIndexed$_nth$arity$2(null, a)
};
cljs.core.Subvec.prototype.cljs$core$IFn$_invoke$arity$2 = function(a, b) {
  return this.cljs$core$IIndexed$_nth$arity$3(null, a, b)
};
cljs.core.Subvec.prototype.cljs$core$ICollection$_conj$arity$2 = function(a, b) {
  return cljs.core.build_subvec.call(null, this.meta, cljs.core._assoc_n.call(null, this.v, this.end, b), this.start, this.end + 1, null)
};
cljs.core.Subvec.prototype.toString = function() {
  return cljs.core.pr_str_STAR_.call(null, this)
};
cljs.core.Subvec.prototype.cljs$core$IReduce$_reduce$arity$2 = function(a, b) {
  return cljs.core.ci_reduce.call(null, this, b)
};
cljs.core.Subvec.prototype.cljs$core$IReduce$_reduce$arity$3 = function(a, b, c) {
  return cljs.core.ci_reduce.call(null, this, b, c)
};
cljs.core.Subvec.prototype.cljs$core$ISeqable$_seq$arity$1 = function(a) {
  var b = this;
  return function d(a) {
    return a === b.end ? null : cljs.core.cons.call(null, cljs.core._nth.call(null, b.v, a), new cljs.core.LazySeq(null, function() {
      return d.call(null, a + 1)
    }, null, null))
  }.call(null, b.start)
};
cljs.core.Subvec.prototype.cljs$core$ICounted$_count$arity$1 = function(a) {
  return this.end - this.start
};
cljs.core.Subvec.prototype.cljs$core$IStack$_peek$arity$1 = function(a) {
  return cljs.core._nth.call(null, this.v, this.end - 1)
};
cljs.core.Subvec.prototype.cljs$core$IStack$_pop$arity$1 = function(a) {
  if(this.start === this.end) {
    throw Error("Can't pop empty vector");
  }
  return cljs.core.build_subvec.call(null, this.meta, this.v, this.start, this.end - 1, null)
};
cljs.core.Subvec.prototype.cljs$core$IVector$_assoc_n$arity$3 = function(a, b, c) {
  return cljs.core._assoc.call(null, this, b, c)
};
cljs.core.Subvec.prototype.cljs$core$IEquiv$_equiv$arity$2 = function(a, b) {
  return cljs.core.equiv_sequential.call(null, this, b)
};
cljs.core.Subvec.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = function(a, b) {
  return cljs.core.build_subvec.call(null, b, this.v, this.start, this.end, this.__hash)
};
cljs.core.Subvec.prototype.cljs$core$IMeta$_meta$arity$1 = function(a) {
  return this.meta
};
cljs.core.Subvec.prototype.cljs$core$IIndexed$_nth$arity$2 = function(a, b) {
  return 0 > b || this.end <= this.start + b ? cljs.core.vector_index_out_of_bounds.call(null, b, this.end - this.start) : cljs.core._nth.call(null, this.v, this.start + b)
};
cljs.core.Subvec.prototype.cljs$core$IIndexed$_nth$arity$3 = function(a, b, c) {
  return 0 > b || this.end <= this.start + b ? c : cljs.core._nth.call(null, this.v, this.start + b, c)
};
cljs.core.Subvec.prototype.cljs$core$IEmptyableCollection$_empty$arity$1 = function(a) {
  return cljs.core.with_meta.call(null, cljs.core.PersistentVector.EMPTY, this.meta)
};
cljs.core.__GT_Subvec = function(a, b, c, d, e) {
  return new cljs.core.Subvec(a, b, c, d, e)
};
cljs.core.build_subvec = function(a, b, c, d, e) {
  for(;;) {
    if(b instanceof cljs.core.Subvec) {
      c = b.start + c, d = b.start + d, b = b.v
    }else {
      var f = cljs.core.count.call(null, b);
      if(0 > c || 0 > d || c > f || d > f) {
        throw Error("Index out of bounds");
      }
      return new cljs.core.Subvec(a, b, c, d, e)
    }
  }
};
cljs.core.subvec = function() {
  var a = null, b = function(b, c) {
    return a.call(null, b, c, cljs.core.count.call(null, b))
  }, c = function(a, b, c) {
    return cljs.core.build_subvec.call(null, null, a, b, c, null)
  }, a = function(a, e, f) {
    switch(arguments.length) {
      case 2:
        return b.call(this, a, e);
      case 3:
        return c.call(this, a, e, f)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$core$IFn$_invoke$arity$2 = b;
  a.cljs$core$IFn$_invoke$arity$3 = c;
  return a
}();
cljs.core.tv_ensure_editable = function(a, b) {
  return a === b.edit ? b : new cljs.core.VectorNode(a, b.arr.slice())
};
cljs.core.tv_editable_root = function(a) {
  return new cljs.core.VectorNode({}, a.arr.slice())
};
cljs.core.tv_editable_tail = function(a) {
  var b = Array(32);
  cljs.core.array_copy.call(null, a, 0, b, 0, a.length);
  return b
};
cljs.core.tv_push_tail = function tv_push_tail(b, c, d, e) {
  var f = cljs.core.tv_ensure_editable.call(null, b.root.edit, d), g = b.cnt - 1 >>> c & 31;
  cljs.core.pv_aset.call(null, f, g, 5 === c ? e : function() {
    var d = cljs.core.pv_aget.call(null, f, g);
    return null != d ? tv_push_tail.call(null, b, c - 5, d, e) : cljs.core.new_path.call(null, b.root.edit, c - 5, e)
  }());
  return f
};
cljs.core.tv_pop_tail = function tv_pop_tail(b, c, d) {
  d = cljs.core.tv_ensure_editable.call(null, b.root.edit, d);
  var e = b.cnt - 2 >>> c & 31;
  if(5 < c) {
    b = tv_pop_tail.call(null, b, c - 5, cljs.core.pv_aget.call(null, d, e));
    if(null == b && 0 === e) {
      return null
    }
    cljs.core.pv_aset.call(null, d, e, b);
    return d
  }
  return 0 === e ? null : new cljs.core.Keyword(null, "else", "else", 1017020587) ? (cljs.core.pv_aset.call(null, d, e, null), d) : null
};
cljs.core.editable_array_for = function(a, b) {
  if(0 <= b && b < a.cnt) {
    if(b >= cljs.core.tail_off.call(null, a)) {
      return a.tail
    }
    for(var c = a.root, d = c, e = a.shift;;) {
      if(0 < e) {
        d = cljs.core.tv_ensure_editable.call(null, c.edit, cljs.core.pv_aget.call(null, d, b >>> e & 31)), e -= 5
      }else {
        return d.arr
      }
    }
  }else {
    throw Error([cljs.core.str("No item "), cljs.core.str(b), cljs.core.str(" in transient vector of length "), cljs.core.str(a.cnt)].join(""));
  }
};
cljs.core.TransientVector = function(a, b, c, d) {
  this.cnt = a;
  this.shift = b;
  this.root = c;
  this.tail = d;
  this.cljs$lang$protocol_mask$partition0$ = 275;
  this.cljs$lang$protocol_mask$partition1$ = 88
};
cljs.core.TransientVector.cljs$lang$type = !0;
cljs.core.TransientVector.cljs$lang$ctorStr = "cljs.core/TransientVector";
cljs.core.TransientVector.cljs$lang$ctorPrWriter = function(a, b, c) {
  return cljs.core._write.call(null, b, "cljs.core/TransientVector")
};
cljs.core.TransientVector.prototype.call = function() {
  var a = null;
  return a = function(a, c, d) {
    switch(arguments.length) {
      case 2:
        return this.cljs$core$ILookup$_lookup$arity$2(null, c);
      case 3:
        return this.cljs$core$ILookup$_lookup$arity$3(null, c, d)
    }
    throw Error("Invalid arity: " + arguments.length);
  }
}();
cljs.core.TransientVector.prototype.apply = function(a, b) {
  return this.call.apply(this, [this].concat(b.slice()))
};
cljs.core.TransientVector.prototype.cljs$core$IFn$_invoke$arity$1 = function(a) {
  return this.cljs$core$ILookup$_lookup$arity$2(null, a)
};
cljs.core.TransientVector.prototype.cljs$core$IFn$_invoke$arity$2 = function(a, b) {
  return this.cljs$core$ILookup$_lookup$arity$3(null, a, b)
};
cljs.core.TransientVector.prototype.cljs$core$ILookup$_lookup$arity$2 = function(a, b) {
  return cljs.core._nth.call(null, this, b, null)
};
cljs.core.TransientVector.prototype.cljs$core$ILookup$_lookup$arity$3 = function(a, b, c) {
  return cljs.core._nth.call(null, this, b, c)
};
cljs.core.TransientVector.prototype.cljs$core$IIndexed$_nth$arity$2 = function(a, b) {
  if(this.root.edit) {
    return cljs.core.array_for.call(null, this, b)[b & 31]
  }
  throw Error("nth after persistent!");
};
cljs.core.TransientVector.prototype.cljs$core$IIndexed$_nth$arity$3 = function(a, b, c) {
  return 0 <= b && b < this.cnt ? cljs.core._nth.call(null, this, b) : c
};
cljs.core.TransientVector.prototype.cljs$core$ICounted$_count$arity$1 = function(a) {
  if(this.root.edit) {
    return this.cnt
  }
  throw Error("count after persistent!");
};
cljs.core.TransientVector.prototype.cljs$core$ITransientVector$_assoc_n_BANG_$arity$3 = function(a, b, c) {
  var d = this;
  if(d.root.edit) {
    if(0 <= b && b < d.cnt) {
      return cljs.core.tail_off.call(null, this) <= b ? d.tail[b & 31] = c : (a = function f(a, h) {
        var l = cljs.core.tv_ensure_editable.call(null, d.root.edit, h);
        if(0 === a) {
          cljs.core.pv_aset.call(null, l, b & 31, c)
        }else {
          var m = b >>> a & 31;
          cljs.core.pv_aset.call(null, l, m, f.call(null, a - 5, cljs.core.pv_aget.call(null, l, m)))
        }
        return l
      }.call(null, d.shift, d.root), d.root = a), this
    }
    if(b === d.cnt) {
      return cljs.core._conj_BANG_.call(null, this, c)
    }
    if(new cljs.core.Keyword(null, "else", "else", 1017020587)) {
      throw Error([cljs.core.str("Index "), cljs.core.str(b), cljs.core.str(" out of bounds for TransientVector of length"), cljs.core.str(d.cnt)].join(""));
    }
    return null
  }
  throw Error("assoc! after persistent!");
};
cljs.core.TransientVector.prototype.cljs$core$ITransientVector$_pop_BANG_$arity$1 = function(a) {
  if(this.root.edit) {
    if(0 === this.cnt) {
      throw Error("Can't pop empty vector");
    }
    if(1 === this.cnt) {
      return this.cnt = 0, this
    }
    if(0 < (this.cnt - 1 & 31)) {
      return this.cnt -= 1, this
    }
    if(new cljs.core.Keyword(null, "else", "else", 1017020587)) {
      a = cljs.core.editable_array_for.call(null, this, this.cnt - 2);
      var b;
      b = cljs.core.tv_pop_tail.call(null, this, this.shift, this.root);
      b = null != b ? b : new cljs.core.VectorNode(this.root.edit, Array(32));
      5 < this.shift && null == cljs.core.pv_aget.call(null, b, 1) ? (this.root = cljs.core.tv_ensure_editable.call(null, this.root.edit, cljs.core.pv_aget.call(null, b, 0)), this.shift -= 5) : this.root = b;
      this.cnt -= 1;
      this.tail = a;
      return this
    }
    return null
  }
  throw Error("pop! after persistent!");
};
cljs.core.TransientVector.prototype.cljs$core$ITransientAssociative$_assoc_BANG_$arity$3 = function(a, b, c) {
  return cljs.core._assoc_n_BANG_.call(null, this, b, c)
};
cljs.core.TransientVector.prototype.cljs$core$ITransientCollection$_conj_BANG_$arity$2 = function(a, b) {
  if(this.root.edit) {
    if(32 > this.cnt - cljs.core.tail_off.call(null, this)) {
      this.tail[this.cnt & 31] = b
    }else {
      var c = new cljs.core.VectorNode(this.root.edit, this.tail), d = Array(32);
      d[0] = b;
      this.tail = d;
      if(this.cnt >>> 5 > 1 << this.shift) {
        var d = Array(32), e = this.shift + 5;
        d[0] = this.root;
        d[1] = cljs.core.new_path.call(null, this.root.edit, this.shift, c);
        this.root = new cljs.core.VectorNode(this.root.edit, d);
        this.shift = e
      }else {
        this.root = cljs.core.tv_push_tail.call(null, this, this.shift, this.root, c)
      }
    }
    this.cnt += 1;
    return this
  }
  throw Error("conj! after persistent!");
};
cljs.core.TransientVector.prototype.cljs$core$ITransientCollection$_persistent_BANG_$arity$1 = function(a) {
  if(this.root.edit) {
    this.root.edit = null;
    a = this.cnt - cljs.core.tail_off.call(null, this);
    var b = Array(a);
    cljs.core.array_copy.call(null, this.tail, 0, b, 0, a);
    return new cljs.core.PersistentVector(null, this.cnt, this.shift, this.root, b, null)
  }
  throw Error("persistent! called twice");
};
cljs.core.__GT_TransientVector = function(a, b, c, d) {
  return new cljs.core.TransientVector(a, b, c, d)
};
cljs.core.PersistentQueueSeq = function(a, b, c, d) {
  this.meta = a;
  this.front = b;
  this.rear = c;
  this.__hash = d;
  this.cljs$lang$protocol_mask$partition1$ = 0;
  this.cljs$lang$protocol_mask$partition0$ = 31850572
};
cljs.core.PersistentQueueSeq.cljs$lang$type = !0;
cljs.core.PersistentQueueSeq.cljs$lang$ctorStr = "cljs.core/PersistentQueueSeq";
cljs.core.PersistentQueueSeq.cljs$lang$ctorPrWriter = function(a, b, c) {
  return cljs.core._write.call(null, b, "cljs.core/PersistentQueueSeq")
};
cljs.core.PersistentQueueSeq.prototype.cljs$core$IHash$_hash$arity$1 = function(a) {
  a = this.__hash;
  return null != a ? a : this.__hash = a = cljs.core.hash_coll.call(null, this)
};
cljs.core.PersistentQueueSeq.prototype.cljs$core$ICollection$_conj$arity$2 = function(a, b) {
  return cljs.core.cons.call(null, b, this)
};
cljs.core.PersistentQueueSeq.prototype.toString = function() {
  return cljs.core.pr_str_STAR_.call(null, this)
};
cljs.core.PersistentQueueSeq.prototype.cljs$core$ISeqable$_seq$arity$1 = function(a) {
  return this
};
cljs.core.PersistentQueueSeq.prototype.cljs$core$ISeq$_first$arity$1 = function(a) {
  return cljs.core.first.call(null, this.front)
};
cljs.core.PersistentQueueSeq.prototype.cljs$core$ISeq$_rest$arity$1 = function(a) {
  return(a = cljs.core.next.call(null, this.front)) ? new cljs.core.PersistentQueueSeq(this.meta, a, this.rear, null) : null == this.rear ? cljs.core._empty.call(null, this) : new cljs.core.PersistentQueueSeq(this.meta, this.rear, null, null)
};
cljs.core.PersistentQueueSeq.prototype.cljs$core$IEquiv$_equiv$arity$2 = function(a, b) {
  return cljs.core.equiv_sequential.call(null, this, b)
};
cljs.core.PersistentQueueSeq.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = function(a, b) {
  return new cljs.core.PersistentQueueSeq(b, this.front, this.rear, this.__hash)
};
cljs.core.PersistentQueueSeq.prototype.cljs$core$IMeta$_meta$arity$1 = function(a) {
  return this.meta
};
cljs.core.PersistentQueueSeq.prototype.cljs$core$IEmptyableCollection$_empty$arity$1 = function(a) {
  return cljs.core.with_meta.call(null, cljs.core.List.EMPTY, this.meta)
};
cljs.core.__GT_PersistentQueueSeq = function(a, b, c, d) {
  return new cljs.core.PersistentQueueSeq(a, b, c, d)
};
cljs.core.PersistentQueue = function(a, b, c, d, e) {
  this.meta = a;
  this.count = b;
  this.front = c;
  this.rear = d;
  this.__hash = e;
  this.cljs$lang$protocol_mask$partition1$ = 0;
  this.cljs$lang$protocol_mask$partition0$ = 31858766
};
cljs.core.PersistentQueue.cljs$lang$type = !0;
cljs.core.PersistentQueue.cljs$lang$ctorStr = "cljs.core/PersistentQueue";
cljs.core.PersistentQueue.cljs$lang$ctorPrWriter = function(a, b, c) {
  return cljs.core._write.call(null, b, "cljs.core/PersistentQueue")
};
cljs.core.PersistentQueue.prototype.cljs$core$IHash$_hash$arity$1 = function(a) {
  a = this.__hash;
  return null != a ? a : this.__hash = a = cljs.core.hash_coll.call(null, this)
};
cljs.core.PersistentQueue.prototype.cljs$core$ICollection$_conj$arity$2 = function(a, b) {
  var c = this;
  return cljs.core.truth_(c.front) ? new cljs.core.PersistentQueue(c.meta, c.count + 1, c.front, cljs.core.conj.call(null, function() {
    var a = c.rear;
    return cljs.core.truth_(a) ? a : cljs.core.PersistentVector.EMPTY
  }(), b), null) : new cljs.core.PersistentQueue(c.meta, c.count + 1, cljs.core.conj.call(null, c.front, b), cljs.core.PersistentVector.EMPTY, null)
};
cljs.core.PersistentQueue.prototype.toString = function() {
  return cljs.core.pr_str_STAR_.call(null, this)
};
cljs.core.PersistentQueue.prototype.cljs$core$ISeqable$_seq$arity$1 = function(a) {
  var b = this, c = cljs.core.seq.call(null, b.rear);
  return cljs.core.truth_(function() {
    var a = b.front;
    return cljs.core.truth_(a) ? a : c
  }()) ? new cljs.core.PersistentQueueSeq(null, b.front, cljs.core.seq.call(null, c), null) : null
};
cljs.core.PersistentQueue.prototype.cljs$core$ICounted$_count$arity$1 = function(a) {
  return this.count
};
cljs.core.PersistentQueue.prototype.cljs$core$IStack$_peek$arity$1 = function(a) {
  return cljs.core.first.call(null, this.front)
};
cljs.core.PersistentQueue.prototype.cljs$core$IStack$_pop$arity$1 = function(a) {
  return cljs.core.truth_(this.front) ? (a = cljs.core.next.call(null, this.front)) ? new cljs.core.PersistentQueue(this.meta, this.count - 1, a, this.rear, null) : new cljs.core.PersistentQueue(this.meta, this.count - 1, cljs.core.seq.call(null, this.rear), cljs.core.PersistentVector.EMPTY, null) : this
};
cljs.core.PersistentQueue.prototype.cljs$core$ISeq$_first$arity$1 = function(a) {
  return cljs.core.first.call(null, this.front)
};
cljs.core.PersistentQueue.prototype.cljs$core$ISeq$_rest$arity$1 = function(a) {
  return cljs.core.rest.call(null, cljs.core.seq.call(null, this))
};
cljs.core.PersistentQueue.prototype.cljs$core$IEquiv$_equiv$arity$2 = function(a, b) {
  return cljs.core.equiv_sequential.call(null, this, b)
};
cljs.core.PersistentQueue.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = function(a, b) {
  return new cljs.core.PersistentQueue(b, this.count, this.front, this.rear, this.__hash)
};
cljs.core.PersistentQueue.prototype.cljs$core$IMeta$_meta$arity$1 = function(a) {
  return this.meta
};
cljs.core.PersistentQueue.prototype.cljs$core$IEmptyableCollection$_empty$arity$1 = function(a) {
  return cljs.core.PersistentQueue.EMPTY
};
cljs.core.__GT_PersistentQueue = function(a, b, c, d, e) {
  return new cljs.core.PersistentQueue(a, b, c, d, e)
};
cljs.core.PersistentQueue.EMPTY = new cljs.core.PersistentQueue(null, 0, null, cljs.core.PersistentVector.EMPTY, 0);
cljs.core.NeverEquiv = function() {
  this.cljs$lang$protocol_mask$partition1$ = 0;
  this.cljs$lang$protocol_mask$partition0$ = 2097152
};
cljs.core.NeverEquiv.cljs$lang$type = !0;
cljs.core.NeverEquiv.cljs$lang$ctorStr = "cljs.core/NeverEquiv";
cljs.core.NeverEquiv.cljs$lang$ctorPrWriter = function(a, b, c) {
  return cljs.core._write.call(null, b, "cljs.core/NeverEquiv")
};
cljs.core.NeverEquiv.prototype.cljs$core$IEquiv$_equiv$arity$2 = function(a, b) {
  return!1
};
cljs.core.__GT_NeverEquiv = function() {
  return new cljs.core.NeverEquiv
};
cljs.core.never_equiv = new cljs.core.NeverEquiv;
cljs.core.equiv_map = function(a, b) {
  return cljs.core.boolean$.call(null, cljs.core.map_QMARK_.call(null, b) ? cljs.core.count.call(null, a) === cljs.core.count.call(null, b) ? cljs.core.every_QMARK_.call(null, cljs.core.identity, cljs.core.map.call(null, function(a) {
    return cljs.core._EQ_.call(null, cljs.core.get.call(null, b, cljs.core.first.call(null, a), cljs.core.never_equiv), cljs.core.second.call(null, a))
  }, a)) : null : null)
};
cljs.core.scan_array = function(a, b, c) {
  for(var d = c.length, e = 0;;) {
    if(e < d) {
      if(b === c[e]) {
        return e
      }
      e += a
    }else {
      return null
    }
  }
};
cljs.core.obj_map_compare_keys = function(a, b) {
  var c = cljs.core.hash.call(null, a), d = cljs.core.hash.call(null, b);
  return c < d ? -1 : c > d ? 1 : new cljs.core.Keyword(null, "else", "else", 1017020587) ? 0 : null
};
cljs.core.obj_map__GT_hash_map = function(a, b, c) {
  var d = a.keys, e = d.length, f = a.strobj;
  a = cljs.core.meta.call(null, a);
  for(var g = 0, h = cljs.core.transient$.call(null, cljs.core.PersistentHashMap.EMPTY);;) {
    if(g < e) {
      var l = d[g], g = g + 1, h = cljs.core.assoc_BANG_.call(null, h, l, f[l])
    }else {
      return cljs.core.with_meta.call(null, cljs.core.persistent_BANG_.call(null, cljs.core.assoc_BANG_.call(null, h, b, c)), a)
    }
  }
};
cljs.core.obj_clone = function(a, b) {
  for(var c = {}, d = b.length, e = 0;;) {
    if(e < d) {
      var f = b[e];
      c[f] = a[f];
      e += 1
    }else {
      break
    }
  }
  return c
};
cljs.core.ObjMap = function(a, b, c, d, e) {
  this.meta = a;
  this.keys = b;
  this.strobj = c;
  this.update_count = d;
  this.__hash = e;
  this.cljs$lang$protocol_mask$partition1$ = 4;
  this.cljs$lang$protocol_mask$partition0$ = 16123663
};
cljs.core.ObjMap.cljs$lang$type = !0;
cljs.core.ObjMap.cljs$lang$ctorStr = "cljs.core/ObjMap";
cljs.core.ObjMap.cljs$lang$ctorPrWriter = function(a, b, c) {
  return cljs.core._write.call(null, b, "cljs.core/ObjMap")
};
cljs.core.ObjMap.prototype.cljs$core$IEditableCollection$_as_transient$arity$1 = function(a) {
  return cljs.core.transient$.call(null, cljs.core.into.call(null, cljs.core.PersistentHashMap.EMPTY, this))
};
cljs.core.ObjMap.prototype.cljs$core$IHash$_hash$arity$1 = function(a) {
  a = this.__hash;
  return null != a ? a : this.__hash = a = cljs.core.hash_imap.call(null, this)
};
cljs.core.ObjMap.prototype.cljs$core$ILookup$_lookup$arity$2 = function(a, b) {
  return cljs.core._lookup.call(null, this, b, null)
};
cljs.core.ObjMap.prototype.cljs$core$ILookup$_lookup$arity$3 = function(a, b, c) {
  return goog.isString(b) && null != cljs.core.scan_array.call(null, 1, b, this.keys) ? this.strobj[b] : c
};
cljs.core.ObjMap.prototype.cljs$core$IAssociative$_assoc$arity$3 = function(a, b, c) {
  if(goog.isString(b)) {
    if(this.update_count > cljs.core.ObjMap.HASHMAP_THRESHOLD || this.keys.length >= cljs.core.ObjMap.HASHMAP_THRESHOLD) {
      return cljs.core.obj_map__GT_hash_map.call(null, this, b, c)
    }
    if(null != cljs.core.scan_array.call(null, 1, b, this.keys)) {
      return a = cljs.core.obj_clone.call(null, this.strobj, this.keys), a[b] = c, new cljs.core.ObjMap(this.meta, this.keys, a, this.update_count + 1, null)
    }
    a = cljs.core.obj_clone.call(null, this.strobj, this.keys);
    var d = this.keys.slice();
    a[b] = c;
    d.push(b);
    return new cljs.core.ObjMap(this.meta, d, a, this.update_count + 1, null)
  }
  return cljs.core.obj_map__GT_hash_map.call(null, this, b, c)
};
cljs.core.ObjMap.prototype.cljs$core$IAssociative$_contains_key_QMARK_$arity$2 = function(a, b) {
  return goog.isString(b) && null != cljs.core.scan_array.call(null, 1, b, this.keys) ? !0 : !1
};
cljs.core.ObjMap.prototype.call = function() {
  var a = null;
  return a = function(a, c, d) {
    switch(arguments.length) {
      case 2:
        return this.cljs$core$ILookup$_lookup$arity$2(null, c);
      case 3:
        return this.cljs$core$ILookup$_lookup$arity$3(null, c, d)
    }
    throw Error("Invalid arity: " + arguments.length);
  }
}();
cljs.core.ObjMap.prototype.apply = function(a, b) {
  return this.call.apply(this, [this].concat(b.slice()))
};
cljs.core.ObjMap.prototype.cljs$core$IFn$_invoke$arity$1 = function(a) {
  return this.cljs$core$ILookup$_lookup$arity$2(null, a)
};
cljs.core.ObjMap.prototype.cljs$core$IFn$_invoke$arity$2 = function(a, b) {
  return this.cljs$core$ILookup$_lookup$arity$3(null, a, b)
};
cljs.core.ObjMap.prototype.cljs$core$IKVReduce$_kv_reduce$arity$3 = function(a, b, c) {
  for(a = this.keys.sort(cljs.core.obj_map_compare_keys);;) {
    if(cljs.core.seq.call(null, a)) {
      var d = cljs.core.first.call(null, a);
      c = b.call(null, c, d, this.strobj[d]);
      if(cljs.core.reduced_QMARK_.call(null, c)) {
        return cljs.core.deref.call(null, c)
      }
      a = cljs.core.rest.call(null, a)
    }else {
      return c
    }
  }
};
cljs.core.ObjMap.prototype.cljs$core$ICollection$_conj$arity$2 = function(a, b) {
  return cljs.core.vector_QMARK_.call(null, b) ? cljs.core._assoc.call(null, this, cljs.core._nth.call(null, b, 0), cljs.core._nth.call(null, b, 1)) : cljs.core.reduce.call(null, cljs.core._conj, this, b)
};
cljs.core.ObjMap.prototype.toString = function() {
  return cljs.core.pr_str_STAR_.call(null, this)
};
cljs.core.ObjMap.prototype.cljs$core$ISeqable$_seq$arity$1 = function(a) {
  var b = this;
  return 0 < b.keys.length ? cljs.core.map.call(null, function(a) {
    return cljs.core.PersistentVector.fromArray.call(null, [a, b.strobj[a]], !0)
  }, b.keys.sort(cljs.core.obj_map_compare_keys)) : null
};
cljs.core.ObjMap.prototype.cljs$core$ICounted$_count$arity$1 = function(a) {
  return this.keys.length
};
cljs.core.ObjMap.prototype.cljs$core$IEquiv$_equiv$arity$2 = function(a, b) {
  return cljs.core.equiv_map.call(null, this, b)
};
cljs.core.ObjMap.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = function(a, b) {
  return new cljs.core.ObjMap(b, this.keys, this.strobj, this.update_count, this.__hash)
};
cljs.core.ObjMap.prototype.cljs$core$IMeta$_meta$arity$1 = function(a) {
  return this.meta
};
cljs.core.ObjMap.prototype.cljs$core$IEmptyableCollection$_empty$arity$1 = function(a) {
  return cljs.core.with_meta.call(null, cljs.core.ObjMap.EMPTY, this.meta)
};
cljs.core.ObjMap.prototype.cljs$core$IMap$_dissoc$arity$2 = function(a, b) {
  if(goog.isString(b) && null != cljs.core.scan_array.call(null, 1, b, this.keys)) {
    var c = this.keys.slice(), d = cljs.core.obj_clone.call(null, this.strobj, this.keys);
    c.splice(cljs.core.scan_array.call(null, 1, b, c), 1);
    delete d[b];
    return new cljs.core.ObjMap(this.meta, c, d, this.update_count + 1, null)
  }
  return this
};
cljs.core.__GT_ObjMap = function(a, b, c, d, e) {
  return new cljs.core.ObjMap(a, b, c, d, e)
};
cljs.core.ObjMap.EMPTY = new cljs.core.ObjMap(null, [], {}, 0, 0);
cljs.core.ObjMap.HASHMAP_THRESHOLD = 8;
cljs.core.ObjMap.fromObject = function(a, b) {
  return new cljs.core.ObjMap(null, a, b, 0, null)
};
cljs.core.array_map_index_of_nil_QMARK_ = function(a, b, c) {
  b = a.length;
  for(c = 0;;) {
    if(b <= c) {
      return-1
    }
    if(null == a[c]) {
      return c
    }
    if(new cljs.core.Keyword(null, "else", "else", 1017020587)) {
      c += 2
    }else {
      return null
    }
  }
};
cljs.core.array_map_index_of_keyword_QMARK_ = function(a, b, c) {
  b = a.length;
  c = c.fqn;
  for(var d = 0;;) {
    if(b <= d) {
      return-1
    }
    var e = a[d];
    if(e instanceof cljs.core.Keyword && c === e.fqn) {
      return d
    }
    if(new cljs.core.Keyword(null, "else", "else", 1017020587)) {
      d += 2
    }else {
      return null
    }
  }
};
cljs.core.array_map_index_of_symbol_QMARK_ = function(a, b, c) {
  b = a.length;
  c = c.str;
  for(var d = 0;;) {
    if(b <= d) {
      return-1
    }
    var e = a[d];
    if(e instanceof cljs.core.Symbol && c === e.str) {
      return d
    }
    if(new cljs.core.Keyword(null, "else", "else", 1017020587)) {
      d += 2
    }else {
      return null
    }
  }
};
cljs.core.array_map_index_of_identical_QMARK_ = function(a, b, c) {
  b = a.length;
  for(var d = 0;;) {
    if(b <= d) {
      return-1
    }
    if(c === a[d]) {
      return d
    }
    if(new cljs.core.Keyword(null, "else", "else", 1017020587)) {
      d += 2
    }else {
      return null
    }
  }
};
cljs.core.array_map_index_of_equiv_QMARK_ = function(a, b, c) {
  b = a.length;
  for(var d = 0;;) {
    if(b <= d) {
      return-1
    }
    if(cljs.core._EQ_.call(null, c, a[d])) {
      return d
    }
    if(new cljs.core.Keyword(null, "else", "else", 1017020587)) {
      d += 2
    }else {
      return null
    }
  }
};
cljs.core.array_map_index_of = function(a, b) {
  var c = a.arr;
  return b instanceof cljs.core.Keyword ? cljs.core.array_map_index_of_keyword_QMARK_.call(null, c, a, b) : goog.isString(b) || "number" === typeof b ? cljs.core.array_map_index_of_identical_QMARK_.call(null, c, a, b) : b instanceof cljs.core.Symbol ? cljs.core.array_map_index_of_symbol_QMARK_.call(null, c, a, b) : null == b ? cljs.core.array_map_index_of_nil_QMARK_.call(null, c, a, b) : new cljs.core.Keyword(null, "else", "else", 1017020587) ? cljs.core.array_map_index_of_equiv_QMARK_.call(null, 
  c, a, b) : null
};
cljs.core.array_map_extend_kv = function(a, b, c) {
  a = a.arr;
  for(var d = a.length, e = Array(d + 2), f = 0;;) {
    if(f < d) {
      e[f] = a[f], f += 1
    }else {
      break
    }
  }
  e[d] = b;
  e[d + 1] = c;
  return e
};
cljs.core.PersistentArrayMapSeq = function(a, b, c) {
  this.arr = a;
  this.i = b;
  this._meta = c;
  this.cljs$lang$protocol_mask$partition1$ = 0;
  this.cljs$lang$protocol_mask$partition0$ = 32374990
};
cljs.core.PersistentArrayMapSeq.cljs$lang$type = !0;
cljs.core.PersistentArrayMapSeq.cljs$lang$ctorStr = "cljs.core/PersistentArrayMapSeq";
cljs.core.PersistentArrayMapSeq.cljs$lang$ctorPrWriter = function(a, b, c) {
  return cljs.core._write.call(null, b, "cljs.core/PersistentArrayMapSeq")
};
cljs.core.PersistentArrayMapSeq.prototype.cljs$core$IHash$_hash$arity$1 = function(a) {
  return cljs.core.hash_coll.call(null, this)
};
cljs.core.PersistentArrayMapSeq.prototype.cljs$core$INext$_next$arity$1 = function(a) {
  return this.i < this.arr.length - 2 ? new cljs.core.PersistentArrayMapSeq(this.arr, this.i + 2, this._meta) : null
};
cljs.core.PersistentArrayMapSeq.prototype.cljs$core$ICollection$_conj$arity$2 = function(a, b) {
  return cljs.core.cons.call(null, b, this)
};
cljs.core.PersistentArrayMapSeq.prototype.toString = function() {
  return cljs.core.pr_str_STAR_.call(null, this)
};
cljs.core.PersistentArrayMapSeq.prototype.cljs$core$IReduce$_reduce$arity$2 = function(a, b) {
  return cljs.core.seq_reduce.call(null, b, this)
};
cljs.core.PersistentArrayMapSeq.prototype.cljs$core$IReduce$_reduce$arity$3 = function(a, b, c) {
  return cljs.core.seq_reduce.call(null, b, c, this)
};
cljs.core.PersistentArrayMapSeq.prototype.cljs$core$ISeqable$_seq$arity$1 = function(a) {
  return this
};
cljs.core.PersistentArrayMapSeq.prototype.cljs$core$ICounted$_count$arity$1 = function(a) {
  return(this.arr.length - this.i) / 2
};
cljs.core.PersistentArrayMapSeq.prototype.cljs$core$ISeq$_first$arity$1 = function(a) {
  return cljs.core.PersistentVector.fromArray([this.arr[this.i], this.arr[this.i + 1]], !0)
};
cljs.core.PersistentArrayMapSeq.prototype.cljs$core$ISeq$_rest$arity$1 = function(a) {
  return this.i < this.arr.length - 2 ? new cljs.core.PersistentArrayMapSeq(this.arr, this.i + 2, this._meta) : cljs.core.List.EMPTY
};
cljs.core.PersistentArrayMapSeq.prototype.cljs$core$IEquiv$_equiv$arity$2 = function(a, b) {
  return cljs.core.equiv_sequential.call(null, this, b)
};
cljs.core.PersistentArrayMapSeq.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = function(a, b) {
  return new cljs.core.PersistentArrayMapSeq(this.arr, this.i, b)
};
cljs.core.PersistentArrayMapSeq.prototype.cljs$core$IMeta$_meta$arity$1 = function(a) {
  return this._meta
};
cljs.core.PersistentArrayMapSeq.prototype.cljs$core$IEmptyableCollection$_empty$arity$1 = function(a) {
  return cljs.core.with_meta.call(null, cljs.core.List.EMPTY, this._meta)
};
cljs.core.__GT_PersistentArrayMapSeq = function(a, b, c) {
  return new cljs.core.PersistentArrayMapSeq(a, b, c)
};
cljs.core.persistent_array_map_seq = function(a, b, c) {
  return b <= a.length - 2 ? new cljs.core.PersistentArrayMapSeq(a, b, c) : null
};
cljs.core.PersistentArrayMap = function(a, b, c, d) {
  this.meta = a;
  this.cnt = b;
  this.arr = c;
  this.__hash = d;
  this.cljs$lang$protocol_mask$partition1$ = 4;
  this.cljs$lang$protocol_mask$partition0$ = 16123663
};
cljs.core.PersistentArrayMap.cljs$lang$type = !0;
cljs.core.PersistentArrayMap.cljs$lang$ctorStr = "cljs.core/PersistentArrayMap";
cljs.core.PersistentArrayMap.cljs$lang$ctorPrWriter = function(a, b, c) {
  return cljs.core._write.call(null, b, "cljs.core/PersistentArrayMap")
};
cljs.core.PersistentArrayMap.prototype.cljs$core$IEditableCollection$_as_transient$arity$1 = function(a) {
  return new cljs.core.TransientArrayMap({}, this.arr.length, this.arr.slice())
};
cljs.core.PersistentArrayMap.prototype.cljs$core$IHash$_hash$arity$1 = function(a) {
  a = this.__hash;
  return null != a ? a : this.__hash = a = cljs.core.hash_imap.call(null, this)
};
cljs.core.PersistentArrayMap.prototype.cljs$core$ILookup$_lookup$arity$2 = function(a, b) {
  return cljs.core._lookup.call(null, this, b, null)
};
cljs.core.PersistentArrayMap.prototype.cljs$core$ILookup$_lookup$arity$3 = function(a, b, c) {
  a = cljs.core.array_map_index_of.call(null, this, b);
  return-1 === a ? c : this.arr[a + 1]
};
cljs.core.PersistentArrayMap.prototype.cljs$core$IAssociative$_assoc$arity$3 = function(a, b, c) {
  a = cljs.core.array_map_index_of.call(null, this, b);
  return-1 === a ? this.cnt < cljs.core.PersistentArrayMap.HASHMAP_THRESHOLD ? (c = cljs.core.array_map_extend_kv.call(null, this, b, c), new cljs.core.PersistentArrayMap(this.meta, this.cnt + 1, c, null)) : cljs.core._with_meta.call(null, cljs.core._assoc.call(null, cljs.core.into.call(null, cljs.core.PersistentHashMap.EMPTY, this), b, c), this.meta) : c === this.arr[a + 1] ? this : new cljs.core.Keyword(null, "else", "else", 1017020587) ? (b = this.arr.slice(), b[a + 1] = c, new cljs.core.PersistentArrayMap(this.meta, 
  this.cnt, b, null)) : null
};
cljs.core.PersistentArrayMap.prototype.cljs$core$IAssociative$_contains_key_QMARK_$arity$2 = function(a, b) {
  return-1 !== cljs.core.array_map_index_of.call(null, this, b)
};
cljs.core.PersistentArrayMap.prototype.call = function() {
  var a = null;
  return a = function(a, c, d) {
    switch(arguments.length) {
      case 2:
        return this.cljs$core$ILookup$_lookup$arity$2(null, c);
      case 3:
        return this.cljs$core$ILookup$_lookup$arity$3(null, c, d)
    }
    throw Error("Invalid arity: " + arguments.length);
  }
}();
cljs.core.PersistentArrayMap.prototype.apply = function(a, b) {
  return this.call.apply(this, [this].concat(b.slice()))
};
cljs.core.PersistentArrayMap.prototype.cljs$core$IFn$_invoke$arity$1 = function(a) {
  return this.cljs$core$ILookup$_lookup$arity$2(null, a)
};
cljs.core.PersistentArrayMap.prototype.cljs$core$IFn$_invoke$arity$2 = function(a, b) {
  return this.cljs$core$ILookup$_lookup$arity$3(null, a, b)
};
cljs.core.PersistentArrayMap.prototype.cljs$core$IKVReduce$_kv_reduce$arity$3 = function(a, b, c) {
  a = this.arr.length;
  for(var d = 0;;) {
    if(d < a) {
      c = b.call(null, c, this.arr[d], this.arr[d + 1]);
      if(cljs.core.reduced_QMARK_.call(null, c)) {
        return cljs.core.deref.call(null, c)
      }
      d += 2
    }else {
      return c
    }
  }
};
cljs.core.PersistentArrayMap.prototype.cljs$core$ICollection$_conj$arity$2 = function(a, b) {
  return cljs.core.vector_QMARK_.call(null, b) ? cljs.core._assoc.call(null, this, cljs.core._nth.call(null, b, 0), cljs.core._nth.call(null, b, 1)) : cljs.core.reduce.call(null, cljs.core._conj, this, b)
};
cljs.core.PersistentArrayMap.prototype.toString = function() {
  return cljs.core.pr_str_STAR_.call(null, this)
};
cljs.core.PersistentArrayMap.prototype.cljs$core$ISeqable$_seq$arity$1 = function(a) {
  return cljs.core.persistent_array_map_seq.call(null, this.arr, 0, null)
};
cljs.core.PersistentArrayMap.prototype.cljs$core$ICounted$_count$arity$1 = function(a) {
  return this.cnt
};
cljs.core.PersistentArrayMap.prototype.cljs$core$IEquiv$_equiv$arity$2 = function(a, b) {
  return cljs.core.equiv_map.call(null, this, b)
};
cljs.core.PersistentArrayMap.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = function(a, b) {
  return new cljs.core.PersistentArrayMap(b, this.cnt, this.arr, this.__hash)
};
cljs.core.PersistentArrayMap.prototype.cljs$core$IMeta$_meta$arity$1 = function(a) {
  return this.meta
};
cljs.core.PersistentArrayMap.prototype.cljs$core$IEmptyableCollection$_empty$arity$1 = function(a) {
  return cljs.core._with_meta.call(null, cljs.core.PersistentArrayMap.EMPTY, this.meta)
};
cljs.core.PersistentArrayMap.prototype.cljs$core$IMap$_dissoc$arity$2 = function(a, b) {
  if(0 <= cljs.core.array_map_index_of.call(null, this, b)) {
    var c = this.arr.length, d = c - 2;
    if(0 === d) {
      return cljs.core._empty.call(null, this)
    }
    for(var d = Array(d), e = 0, f = 0;;) {
      if(e >= c) {
        return new cljs.core.PersistentArrayMap(this.meta, this.cnt - 1, d, null)
      }
      if(cljs.core._EQ_.call(null, b, this.arr[e])) {
        e += 2
      }else {
        if(new cljs.core.Keyword(null, "else", "else", 1017020587)) {
          d[f] = this.arr[e], d[f + 1] = this.arr[e + 1], f += 2, e += 2
        }else {
          return null
        }
      }
    }
  }else {
    return this
  }
};
cljs.core.__GT_PersistentArrayMap = function(a, b, c, d) {
  return new cljs.core.PersistentArrayMap(a, b, c, d)
};
cljs.core.PersistentArrayMap.EMPTY = new cljs.core.PersistentArrayMap(null, 0, [], null);
cljs.core.PersistentArrayMap.HASHMAP_THRESHOLD = 8;
cljs.core.PersistentArrayMap.fromArray = function(a, b) {
  var c = b ? a : a.slice();
  return new cljs.core.PersistentArrayMap(null, c.length / 2, c, null)
};
cljs.core.TransientArrayMap = function(a, b, c) {
  this.editable_QMARK_ = a;
  this.len = b;
  this.arr = c;
  this.cljs$lang$protocol_mask$partition1$ = 56;
  this.cljs$lang$protocol_mask$partition0$ = 258
};
cljs.core.TransientArrayMap.cljs$lang$type = !0;
cljs.core.TransientArrayMap.cljs$lang$ctorStr = "cljs.core/TransientArrayMap";
cljs.core.TransientArrayMap.cljs$lang$ctorPrWriter = function(a, b, c) {
  return cljs.core._write.call(null, b, "cljs.core/TransientArrayMap")
};
cljs.core.TransientArrayMap.prototype.cljs$core$ITransientMap$_dissoc_BANG_$arity$2 = function(a, b) {
  if(cljs.core.truth_(this.editable_QMARK_)) {
    var c = cljs.core.array_map_index_of.call(null, this, b);
    0 <= c && (this.arr[c] = this.arr[this.len - 2], this.arr[c + 1] = this.arr[this.len - 1], c = this.arr, c.pop(), c.pop(), this.len -= 2);
    return this
  }
  throw Error("dissoc! after persistent!");
};
cljs.core.TransientArrayMap.prototype.cljs$core$ITransientAssociative$_assoc_BANG_$arity$3 = function(a, b, c) {
  if(cljs.core.truth_(this.editable_QMARK_)) {
    a = cljs.core.array_map_index_of.call(null, this, b);
    if(-1 === a) {
      return this.len + 2 <= 2 * cljs.core.PersistentArrayMap.HASHMAP_THRESHOLD ? (this.len += 2, this.arr.push(b), this.arr.push(c), this) : cljs.core.assoc_BANG_.call(null, cljs.core.array__GT_transient_hash_map.call(null, this.len, this.arr), b, c)
    }
    c !== this.arr[a + 1] && (this.arr[a + 1] = c);
    return this
  }
  throw Error("assoc! after persistent!");
};
cljs.core.TransientArrayMap.prototype.cljs$core$ITransientCollection$_conj_BANG_$arity$2 = function(a, b) {
  if(cljs.core.truth_(this.editable_QMARK_)) {
    if(b ? b.cljs$lang$protocol_mask$partition0$ & 2048 || b.cljs$core$IMapEntry$ || (b.cljs$lang$protocol_mask$partition0$ ? 0 : cljs.core.native_satisfies_QMARK_.call(null, cljs.core.IMapEntry, b)) : cljs.core.native_satisfies_QMARK_.call(null, cljs.core.IMapEntry, b)) {
      return cljs.core._assoc_BANG_.call(null, this, cljs.core.key.call(null, b), cljs.core.val.call(null, b))
    }
    for(var c = cljs.core.seq.call(null, b), d = this;;) {
      var e = cljs.core.first.call(null, c);
      if(cljs.core.truth_(e)) {
        c = cljs.core.next.call(null, c), d = cljs.core._assoc_BANG_.call(null, d, cljs.core.key.call(null, e), cljs.core.val.call(null, e))
      }else {
        return d
      }
    }
  }else {
    throw Error("conj! after persistent!");
  }
};
cljs.core.TransientArrayMap.prototype.cljs$core$ITransientCollection$_persistent_BANG_$arity$1 = function(a) {
  if(cljs.core.truth_(this.editable_QMARK_)) {
    return this.editable_QMARK_ = !1, new cljs.core.PersistentArrayMap(null, cljs.core.quot.call(null, this.len, 2), this.arr, null)
  }
  throw Error("persistent! called twice");
};
cljs.core.TransientArrayMap.prototype.cljs$core$ILookup$_lookup$arity$2 = function(a, b) {
  return cljs.core._lookup.call(null, this, b, null)
};
cljs.core.TransientArrayMap.prototype.cljs$core$ILookup$_lookup$arity$3 = function(a, b, c) {
  if(cljs.core.truth_(this.editable_QMARK_)) {
    return a = cljs.core.array_map_index_of.call(null, this, b), -1 === a ? c : this.arr[a + 1]
  }
  throw Error("lookup after persistent!");
};
cljs.core.TransientArrayMap.prototype.cljs$core$ICounted$_count$arity$1 = function(a) {
  if(cljs.core.truth_(this.editable_QMARK_)) {
    return cljs.core.quot.call(null, this.len, 2)
  }
  throw Error("count after persistent!");
};
cljs.core.__GT_TransientArrayMap = function(a, b, c) {
  return new cljs.core.TransientArrayMap(a, b, c)
};
cljs.core.array__GT_transient_hash_map = function(a, b) {
  for(var c = cljs.core.transient$.call(null, cljs.core.PersistentHashMap.EMPTY), d = 0;;) {
    if(d < a) {
      c = cljs.core.assoc_BANG_.call(null, c, b[d], b[d + 1]), d += 2
    }else {
      return c
    }
  }
};
cljs.core.Box = function(a) {
  this.val = a
};
cljs.core.Box.cljs$lang$type = !0;
cljs.core.Box.cljs$lang$ctorStr = "cljs.core/Box";
cljs.core.Box.cljs$lang$ctorPrWriter = function(a, b, c) {
  return cljs.core._write.call(null, b, "cljs.core/Box")
};
cljs.core.__GT_Box = function(a) {
  return new cljs.core.Box(a)
};
cljs.core.key_test = function(a, b) {
  return a === b ? !0 : cljs.core.keyword_identical_QMARK_.call(null, a, b) ? !0 : new cljs.core.Keyword(null, "else", "else", 1017020587) ? cljs.core._EQ_.call(null, a, b) : null
};
cljs.core.mask = function(a, b) {
  return a >>> b & 31
};
cljs.core.clone_and_set = function() {
  var a = null, b = function(a, b, c) {
    a = a.slice();
    a[b] = c;
    return a
  }, c = function(a, b, c, g, h) {
    a = a.slice();
    a[b] = c;
    a[g] = h;
    return a
  }, a = function(a, e, f, g, h) {
    switch(arguments.length) {
      case 3:
        return b.call(this, a, e, f);
      case 5:
        return c.call(this, a, e, f, g, h)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$core$IFn$_invoke$arity$3 = b;
  a.cljs$core$IFn$_invoke$arity$5 = c;
  return a
}();
cljs.core.remove_pair = function(a, b) {
  var c = Array(a.length - 2);
  cljs.core.array_copy.call(null, a, 0, c, 0, 2 * b);
  cljs.core.array_copy.call(null, a, 2 * (b + 1), c, 2 * b, c.length - 2 * b);
  return c
};
cljs.core.bitmap_indexed_node_index = function(a, b) {
  return cljs.core.bit_count.call(null, a & b - 1)
};
cljs.core.bitpos = function(a, b) {
  return 1 << (a >>> b & 31)
};
cljs.core.edit_and_set = function() {
  var a = null, b = function(a, b, c, g) {
    a = a.ensure_editable(b);
    a.arr[c] = g;
    return a
  }, c = function(a, b, c, g, h, l) {
    a = a.ensure_editable(b);
    a.arr[c] = g;
    a.arr[h] = l;
    return a
  }, a = function(a, e, f, g, h, l) {
    switch(arguments.length) {
      case 4:
        return b.call(this, a, e, f, g);
      case 6:
        return c.call(this, a, e, f, g, h, l)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$core$IFn$_invoke$arity$4 = b;
  a.cljs$core$IFn$_invoke$arity$6 = c;
  return a
}();
cljs.core.inode_kv_reduce = function(a, b, c) {
  for(var d = a.length, e = 0;;) {
    if(e < d) {
      var f = a[e];
      null != f ? c = b.call(null, c, f, a[e + 1]) : (f = a[e + 1], c = null != f ? f.kv_reduce(b, c) : c);
      if(cljs.core.reduced_QMARK_.call(null, c)) {
        return cljs.core.deref.call(null, c)
      }
      e += 2
    }else {
      return c
    }
  }
};
cljs.core.BitmapIndexedNode = function(a, b, c) {
  this.edit = a;
  this.bitmap = b;
  this.arr = c
};
cljs.core.BitmapIndexedNode.cljs$lang$type = !0;
cljs.core.BitmapIndexedNode.cljs$lang$ctorStr = "cljs.core/BitmapIndexedNode";
cljs.core.BitmapIndexedNode.cljs$lang$ctorPrWriter = function(a, b, c) {
  return cljs.core._write.call(null, b, "cljs.core/BitmapIndexedNode")
};
cljs.core.BitmapIndexedNode.prototype.edit_and_remove_pair = function(a, b, c) {
  if(this.bitmap === b) {
    return null
  }
  a = this.ensure_editable(a);
  var d = a.arr, e = d.length;
  a.bitmap ^= b;
  cljs.core.array_copy.call(null, d, 2 * (c + 1), d, 2 * c, e - 2 * (c + 1));
  d[e - 2] = null;
  d[e - 1] = null;
  return a
};
cljs.core.BitmapIndexedNode.prototype.inode_assoc_BANG_ = function(a, b, c, d, e, f) {
  var g = 1 << (c >>> b & 31), h = cljs.core.bitmap_indexed_node_index.call(null, this.bitmap, g);
  if(0 === (this.bitmap & g)) {
    var l = cljs.core.bit_count.call(null, this.bitmap);
    if(2 * l < this.arr.length) {
      return a = this.ensure_editable(a), b = a.arr, f.val = !0, cljs.core.array_copy_downward.call(null, b, 2 * h, b, 2 * (h + 1), 2 * (l - h)), b[2 * h] = d, b[2 * h + 1] = e, a.bitmap |= g, a
    }
    if(16 <= l) {
      h = Array(32);
      h[c >>> b & 31] = cljs.core.BitmapIndexedNode.EMPTY.inode_assoc_BANG_(a, b + 5, c, d, e, f);
      for(e = d = 0;;) {
        if(32 > d) {
          0 !== (this.bitmap >>> d & 1) && (h[d] = null != this.arr[e] ? cljs.core.BitmapIndexedNode.EMPTY.inode_assoc_BANG_(a, b + 5, cljs.core.hash.call(null, this.arr[e]), this.arr[e], this.arr[e + 1], f) : this.arr[e + 1], e += 2), d += 1
        }else {
          break
        }
      }
      return new cljs.core.ArrayNode(a, l + 1, h)
    }
    return new cljs.core.Keyword(null, "else", "else", 1017020587) ? (b = Array(2 * (l + 4)), cljs.core.array_copy.call(null, this.arr, 0, b, 0, 2 * h), b[2 * h] = d, b[2 * h + 1] = e, cljs.core.array_copy.call(null, this.arr, 2 * h, b, 2 * (h + 1), 2 * (l - h)), f.val = !0, a = this.ensure_editable(a), a.arr = b, a.bitmap |= g, a) : null
  }
  l = this.arr[2 * h];
  g = this.arr[2 * h + 1];
  return null == l ? (l = g.inode_assoc_BANG_(a, b + 5, c, d, e, f), l === g ? this : cljs.core.edit_and_set.call(null, this, a, 2 * h + 1, l)) : cljs.core.key_test.call(null, d, l) ? e === g ? this : cljs.core.edit_and_set.call(null, this, a, 2 * h + 1, e) : new cljs.core.Keyword(null, "else", "else", 1017020587) ? (f.val = !0, cljs.core.edit_and_set.call(null, this, a, 2 * h, null, 2 * h + 1, cljs.core.create_node.call(null, a, b + 5, l, g, c, d, e))) : null
};
cljs.core.BitmapIndexedNode.prototype.inode_seq = function() {
  return cljs.core.create_inode_seq.call(null, this.arr)
};
cljs.core.BitmapIndexedNode.prototype.inode_without_BANG_ = function(a, b, c, d, e) {
  var f = 1 << (c >>> b & 31);
  if(0 === (this.bitmap & f)) {
    return this
  }
  var g = cljs.core.bitmap_indexed_node_index.call(null, this.bitmap, f), h = this.arr[2 * g], l = this.arr[2 * g + 1];
  return null == h ? (b = l.inode_without_BANG_(a, b + 5, c, d, e), b === l ? this : null != b ? cljs.core.edit_and_set.call(null, this, a, 2 * g + 1, b) : this.bitmap === f ? null : new cljs.core.Keyword(null, "else", "else", 1017020587) ? this.edit_and_remove_pair(a, f, g) : null) : cljs.core.key_test.call(null, d, h) ? (e[0] = !0, this.edit_and_remove_pair(a, f, g)) : new cljs.core.Keyword(null, "else", "else", 1017020587) ? this : null
};
cljs.core.BitmapIndexedNode.prototype.ensure_editable = function(a) {
  if(a === this.edit) {
    return this
  }
  var b = cljs.core.bit_count.call(null, this.bitmap), c = Array(0 > b ? 4 : 2 * (b + 1));
  cljs.core.array_copy.call(null, this.arr, 0, c, 0, 2 * b);
  return new cljs.core.BitmapIndexedNode(a, this.bitmap, c)
};
cljs.core.BitmapIndexedNode.prototype.kv_reduce = function(a, b) {
  return cljs.core.inode_kv_reduce.call(null, this.arr, a, b)
};
cljs.core.BitmapIndexedNode.prototype.inode_find = function(a, b, c, d) {
  var e = 1 << (b >>> a & 31);
  if(0 === (this.bitmap & e)) {
    return d
  }
  var f = cljs.core.bitmap_indexed_node_index.call(null, this.bitmap, e), e = this.arr[2 * f], f = this.arr[2 * f + 1];
  return null == e ? f.inode_find(a + 5, b, c, d) : cljs.core.key_test.call(null, c, e) ? cljs.core.PersistentVector.fromArray([e, f], !0) : new cljs.core.Keyword(null, "else", "else", 1017020587) ? d : null
};
cljs.core.BitmapIndexedNode.prototype.inode_without = function(a, b, c) {
  var d = 1 << (b >>> a & 31);
  if(0 === (this.bitmap & d)) {
    return this
  }
  var e = cljs.core.bitmap_indexed_node_index.call(null, this.bitmap, d), f = this.arr[2 * e], g = this.arr[2 * e + 1];
  return null == f ? (a = g.inode_without(a + 5, b, c), a === g ? this : null != a ? new cljs.core.BitmapIndexedNode(null, this.bitmap, cljs.core.clone_and_set.call(null, this.arr, 2 * e + 1, a)) : this.bitmap === d ? null : new cljs.core.Keyword(null, "else", "else", 1017020587) ? new cljs.core.BitmapIndexedNode(null, this.bitmap ^ d, cljs.core.remove_pair.call(null, this.arr, e)) : null) : cljs.core.key_test.call(null, c, f) ? new cljs.core.BitmapIndexedNode(null, this.bitmap ^ d, cljs.core.remove_pair.call(null, 
  this.arr, e)) : new cljs.core.Keyword(null, "else", "else", 1017020587) ? this : null
};
cljs.core.BitmapIndexedNode.prototype.inode_assoc = function(a, b, c, d, e) {
  var f = 1 << (b >>> a & 31), g = cljs.core.bitmap_indexed_node_index.call(null, this.bitmap, f);
  if(0 === (this.bitmap & f)) {
    var h = cljs.core.bit_count.call(null, this.bitmap);
    if(16 <= h) {
      g = Array(32);
      g[b >>> a & 31] = cljs.core.BitmapIndexedNode.EMPTY.inode_assoc(a + 5, b, c, d, e);
      for(d = c = 0;;) {
        if(32 > c) {
          0 !== (this.bitmap >>> c & 1) && (g[c] = null != this.arr[d] ? cljs.core.BitmapIndexedNode.EMPTY.inode_assoc(a + 5, cljs.core.hash.call(null, this.arr[d]), this.arr[d], this.arr[d + 1], e) : this.arr[d + 1], d += 2), c += 1
        }else {
          break
        }
      }
      return new cljs.core.ArrayNode(null, h + 1, g)
    }
    a = Array(2 * (h + 1));
    cljs.core.array_copy.call(null, this.arr, 0, a, 0, 2 * g);
    a[2 * g] = c;
    a[2 * g + 1] = d;
    cljs.core.array_copy.call(null, this.arr, 2 * g, a, 2 * (g + 1), 2 * (h - g));
    e.val = !0;
    return new cljs.core.BitmapIndexedNode(null, this.bitmap | f, a)
  }
  h = this.arr[2 * g];
  f = this.arr[2 * g + 1];
  return null == h ? (h = f.inode_assoc(a + 5, b, c, d, e), h === f ? this : new cljs.core.BitmapIndexedNode(null, this.bitmap, cljs.core.clone_and_set.call(null, this.arr, 2 * g + 1, h))) : cljs.core.key_test.call(null, c, h) ? d === f ? this : new cljs.core.BitmapIndexedNode(null, this.bitmap, cljs.core.clone_and_set.call(null, this.arr, 2 * g + 1, d)) : new cljs.core.Keyword(null, "else", "else", 1017020587) ? (e.val = !0, new cljs.core.BitmapIndexedNode(null, this.bitmap, cljs.core.clone_and_set.call(null, 
  this.arr, 2 * g, null, 2 * g + 1, cljs.core.create_node.call(null, a + 5, h, f, b, c, d)))) : null
};
cljs.core.BitmapIndexedNode.prototype.inode_lookup = function(a, b, c, d) {
  var e = 1 << (b >>> a & 31);
  if(0 === (this.bitmap & e)) {
    return d
  }
  var f = cljs.core.bitmap_indexed_node_index.call(null, this.bitmap, e), e = this.arr[2 * f], f = this.arr[2 * f + 1];
  return null == e ? f.inode_lookup(a + 5, b, c, d) : cljs.core.key_test.call(null, c, e) ? f : new cljs.core.Keyword(null, "else", "else", 1017020587) ? d : null
};
cljs.core.__GT_BitmapIndexedNode = function(a, b, c) {
  return new cljs.core.BitmapIndexedNode(a, b, c)
};
cljs.core.BitmapIndexedNode.EMPTY = new cljs.core.BitmapIndexedNode(null, 0, []);
cljs.core.pack_array_node = function(a, b, c) {
  var d = a.arr;
  a = 2 * (a.cnt - 1);
  for(var e = Array(a), f = 0, g = 1, h = 0;;) {
    if(f < a) {
      f !== c && null != d[f] && (e[g] = d[f], g += 2, h |= 1 << f), f += 1
    }else {
      return new cljs.core.BitmapIndexedNode(b, h, e)
    }
  }
};
cljs.core.ArrayNode = function(a, b, c) {
  this.edit = a;
  this.cnt = b;
  this.arr = c
};
cljs.core.ArrayNode.cljs$lang$type = !0;
cljs.core.ArrayNode.cljs$lang$ctorStr = "cljs.core/ArrayNode";
cljs.core.ArrayNode.cljs$lang$ctorPrWriter = function(a, b, c) {
  return cljs.core._write.call(null, b, "cljs.core/ArrayNode")
};
cljs.core.ArrayNode.prototype.inode_assoc_BANG_ = function(a, b, c, d, e, f) {
  var g = c >>> b & 31, h = this.arr[g];
  if(null == h) {
    return a = cljs.core.edit_and_set.call(null, this, a, g, cljs.core.BitmapIndexedNode.EMPTY.inode_assoc_BANG_(a, b + 5, c, d, e, f)), a.cnt += 1, a
  }
  b = h.inode_assoc_BANG_(a, b + 5, c, d, e, f);
  return b === h ? this : cljs.core.edit_and_set.call(null, this, a, g, b)
};
cljs.core.ArrayNode.prototype.inode_seq = function() {
  return cljs.core.create_array_node_seq.call(null, this.arr)
};
cljs.core.ArrayNode.prototype.inode_without_BANG_ = function(a, b, c, d, e) {
  var f = c >>> b & 31, g = this.arr[f];
  if(null == g) {
    return this
  }
  b = g.inode_without_BANG_(a, b + 5, c, d, e);
  if(b === g) {
    return this
  }
  if(null == b) {
    if(8 >= this.cnt) {
      return cljs.core.pack_array_node.call(null, this, a, f)
    }
    a = cljs.core.edit_and_set.call(null, this, a, f, b);
    a.cnt -= 1;
    return a
  }
  return new cljs.core.Keyword(null, "else", "else", 1017020587) ? cljs.core.edit_and_set.call(null, this, a, f, b) : null
};
cljs.core.ArrayNode.prototype.ensure_editable = function(a) {
  return a === this.edit ? this : new cljs.core.ArrayNode(a, this.cnt, this.arr.slice())
};
cljs.core.ArrayNode.prototype.kv_reduce = function(a, b) {
  for(var c = this.arr.length, d = 0, e = b;;) {
    if(d < c) {
      var f = this.arr[d];
      if(null != f && (e = f.kv_reduce(a, e), cljs.core.reduced_QMARK_.call(null, e))) {
        return cljs.core.deref.call(null, e)
      }
      d += 1
    }else {
      return e
    }
  }
};
cljs.core.ArrayNode.prototype.inode_find = function(a, b, c, d) {
  var e = this.arr[b >>> a & 31];
  return null != e ? e.inode_find(a + 5, b, c, d) : d
};
cljs.core.ArrayNode.prototype.inode_without = function(a, b, c) {
  var d = b >>> a & 31, e = this.arr[d];
  return null != e ? (a = e.inode_without(a + 5, b, c), a === e ? this : null == a ? 8 >= this.cnt ? cljs.core.pack_array_node.call(null, this, null, d) : new cljs.core.ArrayNode(null, this.cnt - 1, cljs.core.clone_and_set.call(null, this.arr, d, a)) : new cljs.core.Keyword(null, "else", "else", 1017020587) ? new cljs.core.ArrayNode(null, this.cnt, cljs.core.clone_and_set.call(null, this.arr, d, a)) : null) : this
};
cljs.core.ArrayNode.prototype.inode_assoc = function(a, b, c, d, e) {
  var f = b >>> a & 31, g = this.arr[f];
  if(null == g) {
    return new cljs.core.ArrayNode(null, this.cnt + 1, cljs.core.clone_and_set.call(null, this.arr, f, cljs.core.BitmapIndexedNode.EMPTY.inode_assoc(a + 5, b, c, d, e)))
  }
  a = g.inode_assoc(a + 5, b, c, d, e);
  return a === g ? this : new cljs.core.ArrayNode(null, this.cnt, cljs.core.clone_and_set.call(null, this.arr, f, a))
};
cljs.core.ArrayNode.prototype.inode_lookup = function(a, b, c, d) {
  var e = this.arr[b >>> a & 31];
  return null != e ? e.inode_lookup(a + 5, b, c, d) : d
};
cljs.core.__GT_ArrayNode = function(a, b, c) {
  return new cljs.core.ArrayNode(a, b, c)
};
cljs.core.hash_collision_node_find_index = function(a, b, c) {
  b *= 2;
  for(var d = 0;;) {
    if(d < b) {
      if(cljs.core.key_test.call(null, c, a[d])) {
        return d
      }
      d += 2
    }else {
      return-1
    }
  }
};
cljs.core.HashCollisionNode = function(a, b, c, d) {
  this.edit = a;
  this.collision_hash = b;
  this.cnt = c;
  this.arr = d
};
cljs.core.HashCollisionNode.cljs$lang$type = !0;
cljs.core.HashCollisionNode.cljs$lang$ctorStr = "cljs.core/HashCollisionNode";
cljs.core.HashCollisionNode.cljs$lang$ctorPrWriter = function(a, b, c) {
  return cljs.core._write.call(null, b, "cljs.core/HashCollisionNode")
};
cljs.core.HashCollisionNode.prototype.inode_assoc_BANG_ = function(a, b, c, d, e, f) {
  if(c === this.collision_hash) {
    b = cljs.core.hash_collision_node_find_index.call(null, this.arr, this.cnt, d);
    if(-1 === b) {
      if(this.arr.length > 2 * this.cnt) {
        return a = cljs.core.edit_and_set.call(null, this, a, 2 * this.cnt, d, 2 * this.cnt + 1, e), f.val = !0, a.cnt += 1, a
      }
      b = this.arr.length;
      c = Array(b + 2);
      cljs.core.array_copy.call(null, this.arr, 0, c, 0, b);
      c[b] = d;
      c[b + 1] = e;
      f.val = !0;
      return this.ensure_editable_array(a, this.cnt + 1, c)
    }
    return this.arr[b + 1] === e ? this : cljs.core.edit_and_set.call(null, this, a, b + 1, e)
  }
  return(new cljs.core.BitmapIndexedNode(a, 1 << (this.collision_hash >>> b & 31), [null, this, null, null])).inode_assoc_BANG_(a, b, c, d, e, f)
};
cljs.core.HashCollisionNode.prototype.inode_seq = function() {
  return cljs.core.create_inode_seq.call(null, this.arr)
};
cljs.core.HashCollisionNode.prototype.inode_without_BANG_ = function(a, b, c, d, e) {
  b = cljs.core.hash_collision_node_find_index.call(null, this.arr, this.cnt, d);
  if(-1 === b) {
    return this
  }
  e[0] = !0;
  if(1 === this.cnt) {
    return null
  }
  a = this.ensure_editable(a);
  e = a.arr;
  e[b] = e[2 * this.cnt - 2];
  e[b + 1] = e[2 * this.cnt - 1];
  e[2 * this.cnt - 1] = null;
  e[2 * this.cnt - 2] = null;
  a.cnt -= 1;
  return a
};
cljs.core.HashCollisionNode.prototype.ensure_editable = function(a) {
  if(a === this.edit) {
    return this
  }
  var b = Array(2 * (this.cnt + 1));
  cljs.core.array_copy.call(null, this.arr, 0, b, 0, 2 * this.cnt);
  return new cljs.core.HashCollisionNode(a, this.collision_hash, this.cnt, b)
};
cljs.core.HashCollisionNode.prototype.kv_reduce = function(a, b) {
  return cljs.core.inode_kv_reduce.call(null, this.arr, a, b)
};
cljs.core.HashCollisionNode.prototype.inode_find = function(a, b, c, d) {
  a = cljs.core.hash_collision_node_find_index.call(null, this.arr, this.cnt, c);
  return 0 > a ? d : cljs.core.key_test.call(null, c, this.arr[a]) ? cljs.core.PersistentVector.fromArray([this.arr[a], this.arr[a + 1]], !0) : new cljs.core.Keyword(null, "else", "else", 1017020587) ? d : null
};
cljs.core.HashCollisionNode.prototype.inode_without = function(a, b, c) {
  a = cljs.core.hash_collision_node_find_index.call(null, this.arr, this.cnt, c);
  return-1 === a ? this : 1 === this.cnt ? null : new cljs.core.Keyword(null, "else", "else", 1017020587) ? new cljs.core.HashCollisionNode(null, this.collision_hash, this.cnt - 1, cljs.core.remove_pair.call(null, this.arr, cljs.core.quot.call(null, a, 2))) : null
};
cljs.core.HashCollisionNode.prototype.inode_assoc = function(a, b, c, d, e) {
  return b === this.collision_hash ? (a = cljs.core.hash_collision_node_find_index.call(null, this.arr, this.cnt, c), -1 === a ? (a = 2 * this.cnt, b = Array(a + 2), cljs.core.array_copy.call(null, this.arr, 0, b, 0, a), b[a] = c, b[a + 1] = d, e.val = !0, new cljs.core.HashCollisionNode(null, this.collision_hash, this.cnt + 1, b)) : cljs.core._EQ_.call(null, this.arr[a], d) ? this : new cljs.core.HashCollisionNode(null, this.collision_hash, this.cnt, cljs.core.clone_and_set.call(null, this.arr, 
  a + 1, d))) : (new cljs.core.BitmapIndexedNode(null, 1 << (this.collision_hash >>> a & 31), [null, this])).inode_assoc(a, b, c, d, e)
};
cljs.core.HashCollisionNode.prototype.inode_lookup = function(a, b, c, d) {
  a = cljs.core.hash_collision_node_find_index.call(null, this.arr, this.cnt, c);
  return 0 > a ? d : cljs.core.key_test.call(null, c, this.arr[a]) ? this.arr[a + 1] : new cljs.core.Keyword(null, "else", "else", 1017020587) ? d : null
};
cljs.core.HashCollisionNode.prototype.ensure_editable_array = function(a, b, c) {
  return a === this.edit ? (this.arr = c, this.cnt = b, this) : new cljs.core.HashCollisionNode(this.edit, this.collision_hash, b, c)
};
cljs.core.__GT_HashCollisionNode = function(a, b, c, d) {
  return new cljs.core.HashCollisionNode(a, b, c, d)
};
cljs.core.create_node = function() {
  var a = null, b = function(a, b, c, g, h, l) {
    var m = cljs.core.hash.call(null, b);
    if(m === g) {
      return new cljs.core.HashCollisionNode(null, m, 2, [b, c, h, l])
    }
    var k = new cljs.core.Box(!1);
    return cljs.core.BitmapIndexedNode.EMPTY.inode_assoc(a, m, b, c, k).inode_assoc(a, g, h, l, k)
  }, c = function(a, b, c, g, h, l, m) {
    var k = cljs.core.hash.call(null, c);
    if(k === h) {
      return new cljs.core.HashCollisionNode(null, k, 2, [c, g, l, m])
    }
    var n = new cljs.core.Box(!1);
    return cljs.core.BitmapIndexedNode.EMPTY.inode_assoc_BANG_(a, b, k, c, g, n).inode_assoc_BANG_(a, b, h, l, m, n)
  }, a = function(a, e, f, g, h, l, m) {
    switch(arguments.length) {
      case 6:
        return b.call(this, a, e, f, g, h, l);
      case 7:
        return c.call(this, a, e, f, g, h, l, m)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$core$IFn$_invoke$arity$6 = b;
  a.cljs$core$IFn$_invoke$arity$7 = c;
  return a
}();
cljs.core.NodeSeq = function(a, b, c, d, e) {
  this.meta = a;
  this.nodes = b;
  this.i = c;
  this.s = d;
  this.__hash = e;
  this.cljs$lang$protocol_mask$partition1$ = 0;
  this.cljs$lang$protocol_mask$partition0$ = 32374860
};
cljs.core.NodeSeq.cljs$lang$type = !0;
cljs.core.NodeSeq.cljs$lang$ctorStr = "cljs.core/NodeSeq";
cljs.core.NodeSeq.cljs$lang$ctorPrWriter = function(a, b, c) {
  return cljs.core._write.call(null, b, "cljs.core/NodeSeq")
};
cljs.core.NodeSeq.prototype.cljs$core$IHash$_hash$arity$1 = function(a) {
  a = this.__hash;
  return null != a ? a : this.__hash = a = cljs.core.hash_coll.call(null, this)
};
cljs.core.NodeSeq.prototype.cljs$core$ICollection$_conj$arity$2 = function(a, b) {
  return cljs.core.cons.call(null, b, this)
};
cljs.core.NodeSeq.prototype.toString = function() {
  return cljs.core.pr_str_STAR_.call(null, this)
};
cljs.core.NodeSeq.prototype.cljs$core$IReduce$_reduce$arity$2 = function(a, b) {
  return cljs.core.seq_reduce.call(null, b, this)
};
cljs.core.NodeSeq.prototype.cljs$core$IReduce$_reduce$arity$3 = function(a, b, c) {
  return cljs.core.seq_reduce.call(null, b, c, this)
};
cljs.core.NodeSeq.prototype.cljs$core$ISeqable$_seq$arity$1 = function(a) {
  return this
};
cljs.core.NodeSeq.prototype.cljs$core$ISeq$_first$arity$1 = function(a) {
  return null == this.s ? cljs.core.PersistentVector.fromArray([this.nodes[this.i], this.nodes[this.i + 1]], !0) : cljs.core.first.call(null, this.s)
};
cljs.core.NodeSeq.prototype.cljs$core$ISeq$_rest$arity$1 = function(a) {
  return null == this.s ? cljs.core.create_inode_seq.call(null, this.nodes, this.i + 2, null) : cljs.core.create_inode_seq.call(null, this.nodes, this.i, cljs.core.next.call(null, this.s))
};
cljs.core.NodeSeq.prototype.cljs$core$IEquiv$_equiv$arity$2 = function(a, b) {
  return cljs.core.equiv_sequential.call(null, this, b)
};
cljs.core.NodeSeq.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = function(a, b) {
  return new cljs.core.NodeSeq(b, this.nodes, this.i, this.s, this.__hash)
};
cljs.core.NodeSeq.prototype.cljs$core$IMeta$_meta$arity$1 = function(a) {
  return this.meta
};
cljs.core.NodeSeq.prototype.cljs$core$IEmptyableCollection$_empty$arity$1 = function(a) {
  return cljs.core.with_meta.call(null, cljs.core.List.EMPTY, this.meta)
};
cljs.core.__GT_NodeSeq = function(a, b, c, d, e) {
  return new cljs.core.NodeSeq(a, b, c, d, e)
};
cljs.core.create_inode_seq = function() {
  var a = null, b = function(b) {
    return a.call(null, b, 0, null)
  }, c = function(a, b, c) {
    if(null == c) {
      for(c = a.length;;) {
        if(b < c) {
          if(null != a[b]) {
            return new cljs.core.NodeSeq(null, a, b, null, null)
          }
          var g = a[b + 1];
          if(cljs.core.truth_(g) && (g = g.inode_seq(), cljs.core.truth_(g))) {
            return new cljs.core.NodeSeq(null, a, b + 2, g, null)
          }
          b += 2
        }else {
          return null
        }
      }
    }else {
      return new cljs.core.NodeSeq(null, a, b, c, null)
    }
  }, a = function(a, e, f) {
    switch(arguments.length) {
      case 1:
        return b.call(this, a);
      case 3:
        return c.call(this, a, e, f)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$core$IFn$_invoke$arity$1 = b;
  a.cljs$core$IFn$_invoke$arity$3 = c;
  return a
}();
cljs.core.ArrayNodeSeq = function(a, b, c, d, e) {
  this.meta = a;
  this.nodes = b;
  this.i = c;
  this.s = d;
  this.__hash = e;
  this.cljs$lang$protocol_mask$partition1$ = 0;
  this.cljs$lang$protocol_mask$partition0$ = 32374860
};
cljs.core.ArrayNodeSeq.cljs$lang$type = !0;
cljs.core.ArrayNodeSeq.cljs$lang$ctorStr = "cljs.core/ArrayNodeSeq";
cljs.core.ArrayNodeSeq.cljs$lang$ctorPrWriter = function(a, b, c) {
  return cljs.core._write.call(null, b, "cljs.core/ArrayNodeSeq")
};
cljs.core.ArrayNodeSeq.prototype.cljs$core$IHash$_hash$arity$1 = function(a) {
  a = this.__hash;
  return null != a ? a : this.__hash = a = cljs.core.hash_coll.call(null, this)
};
cljs.core.ArrayNodeSeq.prototype.cljs$core$ICollection$_conj$arity$2 = function(a, b) {
  return cljs.core.cons.call(null, b, this)
};
cljs.core.ArrayNodeSeq.prototype.toString = function() {
  return cljs.core.pr_str_STAR_.call(null, this)
};
cljs.core.ArrayNodeSeq.prototype.cljs$core$IReduce$_reduce$arity$2 = function(a, b) {
  return cljs.core.seq_reduce.call(null, b, this)
};
cljs.core.ArrayNodeSeq.prototype.cljs$core$IReduce$_reduce$arity$3 = function(a, b, c) {
  return cljs.core.seq_reduce.call(null, b, c, this)
};
cljs.core.ArrayNodeSeq.prototype.cljs$core$ISeqable$_seq$arity$1 = function(a) {
  return this
};
cljs.core.ArrayNodeSeq.prototype.cljs$core$ISeq$_first$arity$1 = function(a) {
  return cljs.core.first.call(null, this.s)
};
cljs.core.ArrayNodeSeq.prototype.cljs$core$ISeq$_rest$arity$1 = function(a) {
  return cljs.core.create_array_node_seq.call(null, null, this.nodes, this.i, cljs.core.next.call(null, this.s))
};
cljs.core.ArrayNodeSeq.prototype.cljs$core$IEquiv$_equiv$arity$2 = function(a, b) {
  return cljs.core.equiv_sequential.call(null, this, b)
};
cljs.core.ArrayNodeSeq.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = function(a, b) {
  return new cljs.core.ArrayNodeSeq(b, this.nodes, this.i, this.s, this.__hash)
};
cljs.core.ArrayNodeSeq.prototype.cljs$core$IMeta$_meta$arity$1 = function(a) {
  return this.meta
};
cljs.core.ArrayNodeSeq.prototype.cljs$core$IEmptyableCollection$_empty$arity$1 = function(a) {
  return cljs.core.with_meta.call(null, cljs.core.List.EMPTY, this.meta)
};
cljs.core.__GT_ArrayNodeSeq = function(a, b, c, d, e) {
  return new cljs.core.ArrayNodeSeq(a, b, c, d, e)
};
cljs.core.create_array_node_seq = function() {
  var a = null, b = function(b) {
    return a.call(null, null, b, 0, null)
  }, c = function(a, b, c, g) {
    if(null == g) {
      for(g = b.length;;) {
        if(c < g) {
          var h = b[c];
          if(cljs.core.truth_(h) && (h = h.inode_seq(), cljs.core.truth_(h))) {
            return new cljs.core.ArrayNodeSeq(a, b, c + 1, h, null)
          }
          c += 1
        }else {
          return null
        }
      }
    }else {
      return new cljs.core.ArrayNodeSeq(a, b, c, g, null)
    }
  }, a = function(a, e, f, g) {
    switch(arguments.length) {
      case 1:
        return b.call(this, a);
      case 4:
        return c.call(this, a, e, f, g)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$core$IFn$_invoke$arity$1 = b;
  a.cljs$core$IFn$_invoke$arity$4 = c;
  return a
}();
cljs.core.PersistentHashMap = function(a, b, c, d, e, f) {
  this.meta = a;
  this.cnt = b;
  this.root = c;
  this.has_nil_QMARK_ = d;
  this.nil_val = e;
  this.__hash = f;
  this.cljs$lang$protocol_mask$partition1$ = 4;
  this.cljs$lang$protocol_mask$partition0$ = 16123663
};
cljs.core.PersistentHashMap.cljs$lang$type = !0;
cljs.core.PersistentHashMap.cljs$lang$ctorStr = "cljs.core/PersistentHashMap";
cljs.core.PersistentHashMap.cljs$lang$ctorPrWriter = function(a, b, c) {
  return cljs.core._write.call(null, b, "cljs.core/PersistentHashMap")
};
cljs.core.PersistentHashMap.prototype.cljs$core$IEditableCollection$_as_transient$arity$1 = function(a) {
  return new cljs.core.TransientHashMap({}, this.root, this.cnt, this.has_nil_QMARK_, this.nil_val)
};
cljs.core.PersistentHashMap.prototype.cljs$core$IHash$_hash$arity$1 = function(a) {
  a = this.__hash;
  return null != a ? a : this.__hash = a = cljs.core.hash_imap.call(null, this)
};
cljs.core.PersistentHashMap.prototype.cljs$core$ILookup$_lookup$arity$2 = function(a, b) {
  return cljs.core._lookup.call(null, this, b, null)
};
cljs.core.PersistentHashMap.prototype.cljs$core$ILookup$_lookup$arity$3 = function(a, b, c) {
  return null == b ? this.has_nil_QMARK_ ? this.nil_val : c : null == this.root ? c : new cljs.core.Keyword(null, "else", "else", 1017020587) ? this.root.inode_lookup(0, cljs.core.hash.call(null, b), b, c) : null
};
cljs.core.PersistentHashMap.prototype.cljs$core$IAssociative$_assoc$arity$3 = function(a, b, c) {
  if(null == b) {
    return this.has_nil_QMARK_ && c === this.nil_val ? this : new cljs.core.PersistentHashMap(this.meta, this.has_nil_QMARK_ ? this.cnt : this.cnt + 1, this.root, !0, c, null)
  }
  a = new cljs.core.Box(!1);
  b = (null == this.root ? cljs.core.BitmapIndexedNode.EMPTY : this.root).inode_assoc(0, cljs.core.hash.call(null, b), b, c, a);
  return b === this.root ? this : new cljs.core.PersistentHashMap(this.meta, a.val ? this.cnt + 1 : this.cnt, b, this.has_nil_QMARK_, this.nil_val, null)
};
cljs.core.PersistentHashMap.prototype.cljs$core$IAssociative$_contains_key_QMARK_$arity$2 = function(a, b) {
  return null == b ? this.has_nil_QMARK_ : null == this.root ? !1 : new cljs.core.Keyword(null, "else", "else", 1017020587) ? this.root.inode_lookup(0, cljs.core.hash.call(null, b), b, cljs.core.lookup_sentinel) !== cljs.core.lookup_sentinel : null
};
cljs.core.PersistentHashMap.prototype.call = function() {
  var a = null;
  return a = function(a, c, d) {
    switch(arguments.length) {
      case 2:
        return this.cljs$core$ILookup$_lookup$arity$2(null, c);
      case 3:
        return this.cljs$core$ILookup$_lookup$arity$3(null, c, d)
    }
    throw Error("Invalid arity: " + arguments.length);
  }
}();
cljs.core.PersistentHashMap.prototype.apply = function(a, b) {
  return this.call.apply(this, [this].concat(b.slice()))
};
cljs.core.PersistentHashMap.prototype.cljs$core$IFn$_invoke$arity$1 = function(a) {
  return this.cljs$core$ILookup$_lookup$arity$2(null, a)
};
cljs.core.PersistentHashMap.prototype.cljs$core$IFn$_invoke$arity$2 = function(a, b) {
  return this.cljs$core$ILookup$_lookup$arity$3(null, a, b)
};
cljs.core.PersistentHashMap.prototype.cljs$core$IKVReduce$_kv_reduce$arity$3 = function(a, b, c) {
  a = this.has_nil_QMARK_ ? b.call(null, c, null, this.nil_val) : c;
  return cljs.core.reduced_QMARK_.call(null, a) ? cljs.core.deref.call(null, a) : null != this.root ? this.root.kv_reduce(b, a) : new cljs.core.Keyword(null, "else", "else", 1017020587) ? a : null
};
cljs.core.PersistentHashMap.prototype.cljs$core$ICollection$_conj$arity$2 = function(a, b) {
  return cljs.core.vector_QMARK_.call(null, b) ? cljs.core._assoc.call(null, this, cljs.core._nth.call(null, b, 0), cljs.core._nth.call(null, b, 1)) : cljs.core.reduce.call(null, cljs.core._conj, this, b)
};
cljs.core.PersistentHashMap.prototype.toString = function() {
  return cljs.core.pr_str_STAR_.call(null, this)
};
cljs.core.PersistentHashMap.prototype.cljs$core$ISeqable$_seq$arity$1 = function(a) {
  return 0 < this.cnt ? (a = null != this.root ? this.root.inode_seq() : null, this.has_nil_QMARK_ ? cljs.core.cons.call(null, cljs.core.PersistentVector.fromArray([null, this.nil_val], !0), a) : a) : null
};
cljs.core.PersistentHashMap.prototype.cljs$core$ICounted$_count$arity$1 = function(a) {
  return this.cnt
};
cljs.core.PersistentHashMap.prototype.cljs$core$IEquiv$_equiv$arity$2 = function(a, b) {
  return cljs.core.equiv_map.call(null, this, b)
};
cljs.core.PersistentHashMap.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = function(a, b) {
  return new cljs.core.PersistentHashMap(b, this.cnt, this.root, this.has_nil_QMARK_, this.nil_val, this.__hash)
};
cljs.core.PersistentHashMap.prototype.cljs$core$IMeta$_meta$arity$1 = function(a) {
  return this.meta
};
cljs.core.PersistentHashMap.prototype.cljs$core$IEmptyableCollection$_empty$arity$1 = function(a) {
  return cljs.core._with_meta.call(null, cljs.core.PersistentHashMap.EMPTY, this.meta)
};
cljs.core.PersistentHashMap.prototype.cljs$core$IMap$_dissoc$arity$2 = function(a, b) {
  if(null == b) {
    return this.has_nil_QMARK_ ? new cljs.core.PersistentHashMap(this.meta, this.cnt - 1, this.root, !1, null, null) : this
  }
  if(null == this.root) {
    return this
  }
  if(new cljs.core.Keyword(null, "else", "else", 1017020587)) {
    var c = this.root.inode_without(0, cljs.core.hash.call(null, b), b);
    return c === this.root ? this : new cljs.core.PersistentHashMap(this.meta, this.cnt - 1, c, this.has_nil_QMARK_, this.nil_val, null)
  }
  return null
};
cljs.core.__GT_PersistentHashMap = function(a, b, c, d, e, f) {
  return new cljs.core.PersistentHashMap(a, b, c, d, e, f)
};
cljs.core.PersistentHashMap.EMPTY = new cljs.core.PersistentHashMap(null, 0, null, !1, null, 0);
cljs.core.PersistentHashMap.fromArrays = function(a, b) {
  for(var c = a.length, d = 0, e = cljs.core.transient$.call(null, cljs.core.PersistentHashMap.EMPTY);;) {
    if(d < c) {
      var f = d + 1, e = cljs.core._assoc_BANG_.call(null, e, a[d], b[d]), d = f
    }else {
      return cljs.core.persistent_BANG_.call(null, e)
    }
  }
};
cljs.core.TransientHashMap = function(a, b, c, d, e) {
  this.edit = a;
  this.root = b;
  this.count = c;
  this.has_nil_QMARK_ = d;
  this.nil_val = e;
  this.cljs$lang$protocol_mask$partition1$ = 56;
  this.cljs$lang$protocol_mask$partition0$ = 258
};
cljs.core.TransientHashMap.cljs$lang$type = !0;
cljs.core.TransientHashMap.cljs$lang$ctorStr = "cljs.core/TransientHashMap";
cljs.core.TransientHashMap.cljs$lang$ctorPrWriter = function(a, b, c) {
  return cljs.core._write.call(null, b, "cljs.core/TransientHashMap")
};
cljs.core.TransientHashMap.prototype.cljs$core$ITransientMap$_dissoc_BANG_$arity$2 = function(a, b) {
  return this.without_BANG_(b)
};
cljs.core.TransientHashMap.prototype.cljs$core$ITransientAssociative$_assoc_BANG_$arity$3 = function(a, b, c) {
  return this.assoc_BANG_(b, c)
};
cljs.core.TransientHashMap.prototype.cljs$core$ITransientCollection$_conj_BANG_$arity$2 = function(a, b) {
  return this.conj_BANG_(b)
};
cljs.core.TransientHashMap.prototype.cljs$core$ITransientCollection$_persistent_BANG_$arity$1 = function(a) {
  return this.persistent_BANG_()
};
cljs.core.TransientHashMap.prototype.cljs$core$ILookup$_lookup$arity$2 = function(a, b) {
  return null == b ? this.has_nil_QMARK_ ? this.nil_val : null : null == this.root ? null : this.root.inode_lookup(0, cljs.core.hash.call(null, b), b)
};
cljs.core.TransientHashMap.prototype.cljs$core$ILookup$_lookup$arity$3 = function(a, b, c) {
  return null == b ? this.has_nil_QMARK_ ? this.nil_val : c : null == this.root ? c : this.root.inode_lookup(0, cljs.core.hash.call(null, b), b, c)
};
cljs.core.TransientHashMap.prototype.cljs$core$ICounted$_count$arity$1 = function(a) {
  if(this.edit) {
    return this.count
  }
  throw Error("count after persistent!");
};
cljs.core.TransientHashMap.prototype.conj_BANG_ = function(a) {
  if(this.edit) {
    if(a ? a.cljs$lang$protocol_mask$partition0$ & 2048 || a.cljs$core$IMapEntry$ || (a.cljs$lang$protocol_mask$partition0$ ? 0 : cljs.core.native_satisfies_QMARK_.call(null, cljs.core.IMapEntry, a)) : cljs.core.native_satisfies_QMARK_.call(null, cljs.core.IMapEntry, a)) {
      return this.assoc_BANG_(cljs.core.key.call(null, a), cljs.core.val.call(null, a))
    }
    a = cljs.core.seq.call(null, a);
    for(var b = this;;) {
      var c = cljs.core.first.call(null, a);
      if(cljs.core.truth_(c)) {
        a = cljs.core.next.call(null, a), b = b.assoc_BANG_(cljs.core.key.call(null, c), cljs.core.val.call(null, c))
      }else {
        return b
      }
    }
  }else {
    throw Error("conj! after persistent");
  }
};
cljs.core.TransientHashMap.prototype.assoc_BANG_ = function(a, b) {
  if(this.edit) {
    if(null == a) {
      this.nil_val !== b && (this.nil_val = b), this.has_nil_QMARK_ || (this.count += 1, this.has_nil_QMARK_ = !0)
    }else {
      var c = new cljs.core.Box(!1), d = (null == this.root ? cljs.core.BitmapIndexedNode.EMPTY : this.root).inode_assoc_BANG_(this.edit, 0, cljs.core.hash.call(null, a), a, b, c);
      d !== this.root && (this.root = d);
      c.val && (this.count += 1)
    }
    return this
  }
  throw Error("assoc! after persistent!");
};
cljs.core.TransientHashMap.prototype.without_BANG_ = function(a) {
  if(this.edit) {
    if(null == a) {
      this.has_nil_QMARK_ && (this.has_nil_QMARK_ = !1, this.nil_val = null, this.count -= 1)
    }else {
      if(null != this.root) {
        var b = new cljs.core.Box(!1);
        a = this.root.inode_without_BANG_(this.edit, 0, cljs.core.hash.call(null, a), a, b);
        a !== this.root && (this.root = a);
        cljs.core.truth_(b[0]) && (this.count -= 1)
      }
    }
    return this
  }
  throw Error("dissoc! after persistent!");
};
cljs.core.TransientHashMap.prototype.persistent_BANG_ = function() {
  if(this.edit) {
    return this.edit = null, new cljs.core.PersistentHashMap(null, this.count, this.root, this.has_nil_QMARK_, this.nil_val, null)
  }
  throw Error("persistent! called twice");
};
cljs.core.__GT_TransientHashMap = function(a, b, c, d, e) {
  return new cljs.core.TransientHashMap(a, b, c, d, e)
};
cljs.core.tree_map_seq_push = function(a, b, c) {
  for(var d = b;;) {
    if(null != a) {
      b = c ? a.left : a.right, d = cljs.core.conj.call(null, d, a), a = b
    }else {
      return d
    }
  }
};
cljs.core.PersistentTreeMapSeq = function(a, b, c, d, e) {
  this.meta = a;
  this.stack = b;
  this.ascending_QMARK_ = c;
  this.cnt = d;
  this.__hash = e;
  this.cljs$lang$protocol_mask$partition1$ = 0;
  this.cljs$lang$protocol_mask$partition0$ = 32374862
};
cljs.core.PersistentTreeMapSeq.cljs$lang$type = !0;
cljs.core.PersistentTreeMapSeq.cljs$lang$ctorStr = "cljs.core/PersistentTreeMapSeq";
cljs.core.PersistentTreeMapSeq.cljs$lang$ctorPrWriter = function(a, b, c) {
  return cljs.core._write.call(null, b, "cljs.core/PersistentTreeMapSeq")
};
cljs.core.PersistentTreeMapSeq.prototype.cljs$core$IHash$_hash$arity$1 = function(a) {
  a = this.__hash;
  return null != a ? a : this.__hash = a = cljs.core.hash_coll.call(null, this)
};
cljs.core.PersistentTreeMapSeq.prototype.cljs$core$ICollection$_conj$arity$2 = function(a, b) {
  return cljs.core.cons.call(null, b, this)
};
cljs.core.PersistentTreeMapSeq.prototype.toString = function() {
  return cljs.core.pr_str_STAR_.call(null, this)
};
cljs.core.PersistentTreeMapSeq.prototype.cljs$core$IReduce$_reduce$arity$2 = function(a, b) {
  return cljs.core.seq_reduce.call(null, b, this)
};
cljs.core.PersistentTreeMapSeq.prototype.cljs$core$IReduce$_reduce$arity$3 = function(a, b, c) {
  return cljs.core.seq_reduce.call(null, b, c, this)
};
cljs.core.PersistentTreeMapSeq.prototype.cljs$core$ISeqable$_seq$arity$1 = function(a) {
  return this
};
cljs.core.PersistentTreeMapSeq.prototype.cljs$core$ICounted$_count$arity$1 = function(a) {
  return 0 > this.cnt ? cljs.core.count.call(null, cljs.core.next.call(null, this)) + 1 : this.cnt
};
cljs.core.PersistentTreeMapSeq.prototype.cljs$core$ISeq$_first$arity$1 = function(a) {
  return cljs.core.peek.call(null, this.stack)
};
cljs.core.PersistentTreeMapSeq.prototype.cljs$core$ISeq$_rest$arity$1 = function(a) {
  a = cljs.core.first.call(null, this.stack);
  a = cljs.core.tree_map_seq_push.call(null, this.ascending_QMARK_ ? a.right : a.left, cljs.core.next.call(null, this.stack), this.ascending_QMARK_);
  return null != a ? new cljs.core.PersistentTreeMapSeq(null, a, this.ascending_QMARK_, this.cnt - 1, null) : cljs.core.List.EMPTY
};
cljs.core.PersistentTreeMapSeq.prototype.cljs$core$IEquiv$_equiv$arity$2 = function(a, b) {
  return cljs.core.equiv_sequential.call(null, this, b)
};
cljs.core.PersistentTreeMapSeq.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = function(a, b) {
  return new cljs.core.PersistentTreeMapSeq(b, this.stack, this.ascending_QMARK_, this.cnt, this.__hash)
};
cljs.core.PersistentTreeMapSeq.prototype.cljs$core$IMeta$_meta$arity$1 = function(a) {
  return this.meta
};
cljs.core.PersistentTreeMapSeq.prototype.cljs$core$IEmptyableCollection$_empty$arity$1 = function(a) {
  return cljs.core.with_meta.call(null, cljs.core.List.EMPTY, this.meta)
};
cljs.core.__GT_PersistentTreeMapSeq = function(a, b, c, d, e) {
  return new cljs.core.PersistentTreeMapSeq(a, b, c, d, e)
};
cljs.core.create_tree_map_seq = function(a, b, c) {
  return new cljs.core.PersistentTreeMapSeq(null, cljs.core.tree_map_seq_push.call(null, a, null, b), b, c, null)
};
cljs.core.balance_left = function(a, b, c, d) {
  return c instanceof cljs.core.RedNode ? c.left instanceof cljs.core.RedNode ? new cljs.core.RedNode(c.key, c.val, c.left.blacken(), new cljs.core.BlackNode(a, b, c.right, d, null), null) : c.right instanceof cljs.core.RedNode ? new cljs.core.RedNode(c.right.key, c.right.val, new cljs.core.BlackNode(c.key, c.val, c.left, c.right.left, null), new cljs.core.BlackNode(a, b, c.right.right, d, null), null) : new cljs.core.Keyword(null, "else", "else", 1017020587) ? new cljs.core.BlackNode(a, b, c, d, 
  null) : null : new cljs.core.BlackNode(a, b, c, d, null)
};
cljs.core.balance_right = function(a, b, c, d) {
  return d instanceof cljs.core.RedNode ? d.right instanceof cljs.core.RedNode ? new cljs.core.RedNode(d.key, d.val, new cljs.core.BlackNode(a, b, c, d.left, null), d.right.blacken(), null) : d.left instanceof cljs.core.RedNode ? new cljs.core.RedNode(d.left.key, d.left.val, new cljs.core.BlackNode(a, b, c, d.left.left, null), new cljs.core.BlackNode(d.key, d.val, d.left.right, d.right, null), null) : new cljs.core.Keyword(null, "else", "else", 1017020587) ? new cljs.core.BlackNode(a, b, c, d, null) : 
  null : new cljs.core.BlackNode(a, b, c, d, null)
};
cljs.core.balance_left_del = function(a, b, c, d) {
  if(c instanceof cljs.core.RedNode) {
    return new cljs.core.RedNode(a, b, c.blacken(), d, null)
  }
  if(d instanceof cljs.core.BlackNode) {
    return cljs.core.balance_right.call(null, a, b, c, d.redden())
  }
  if(d instanceof cljs.core.RedNode && d.left instanceof cljs.core.BlackNode) {
    return new cljs.core.RedNode(d.left.key, d.left.val, new cljs.core.BlackNode(a, b, c, d.left.left, null), cljs.core.balance_right.call(null, d.key, d.val, d.left.right, d.right.redden()), null)
  }
  if(new cljs.core.Keyword(null, "else", "else", 1017020587)) {
    throw Error("red-black tree invariant violation");
  }
  return null
};
cljs.core.balance_right_del = function(a, b, c, d) {
  if(d instanceof cljs.core.RedNode) {
    return new cljs.core.RedNode(a, b, c, d.blacken(), null)
  }
  if(c instanceof cljs.core.BlackNode) {
    return cljs.core.balance_left.call(null, a, b, c.redden(), d)
  }
  if(c instanceof cljs.core.RedNode && c.right instanceof cljs.core.BlackNode) {
    return new cljs.core.RedNode(c.right.key, c.right.val, cljs.core.balance_left.call(null, c.key, c.val, c.left.redden(), c.right.left), new cljs.core.BlackNode(a, b, c.right.right, d, null), null)
  }
  if(new cljs.core.Keyword(null, "else", "else", 1017020587)) {
    throw Error("red-black tree invariant violation");
  }
  return null
};
cljs.core.tree_map_kv_reduce = function tree_map_kv_reduce(b, c, d) {
  d = null != b.left ? tree_map_kv_reduce.call(null, b.left, c, d) : d;
  if(cljs.core.reduced_QMARK_.call(null, d)) {
    return cljs.core.deref.call(null, d)
  }
  d = c.call(null, d, b.key, b.val);
  if(cljs.core.reduced_QMARK_.call(null, d)) {
    return cljs.core.deref.call(null, d)
  }
  b = null != b.right ? tree_map_kv_reduce.call(null, b.right, c, d) : d;
  return cljs.core.reduced_QMARK_.call(null, b) ? cljs.core.deref.call(null, b) : b
};
cljs.core.BlackNode = function(a, b, c, d, e) {
  this.key = a;
  this.val = b;
  this.left = c;
  this.right = d;
  this.__hash = e;
  this.cljs$lang$protocol_mask$partition1$ = 0;
  this.cljs$lang$protocol_mask$partition0$ = 32402207
};
cljs.core.BlackNode.cljs$lang$type = !0;
cljs.core.BlackNode.cljs$lang$ctorStr = "cljs.core/BlackNode";
cljs.core.BlackNode.cljs$lang$ctorPrWriter = function(a, b, c) {
  return cljs.core._write.call(null, b, "cljs.core/BlackNode")
};
cljs.core.BlackNode.prototype.cljs$core$IHash$_hash$arity$1 = function(a) {
  a = this.__hash;
  return null != a ? a : this.__hash = a = cljs.core.hash_coll.call(null, this)
};
cljs.core.BlackNode.prototype.cljs$core$ILookup$_lookup$arity$2 = function(a, b) {
  return cljs.core._nth.call(null, this, b, null)
};
cljs.core.BlackNode.prototype.cljs$core$ILookup$_lookup$arity$3 = function(a, b, c) {
  return cljs.core._nth.call(null, this, b, c)
};
cljs.core.BlackNode.prototype.cljs$core$IAssociative$_assoc$arity$3 = function(a, b, c) {
  return cljs.core.assoc.call(null, cljs.core.PersistentVector.fromArray([this.key, this.val], !0), b, c)
};
cljs.core.BlackNode.prototype.call = function() {
  var a = null;
  return a = function(a, c, d) {
    switch(arguments.length) {
      case 2:
        return this.cljs$core$ILookup$_lookup$arity$2(null, c);
      case 3:
        return this.cljs$core$ILookup$_lookup$arity$3(null, c, d)
    }
    throw Error("Invalid arity: " + arguments.length);
  }
}();
cljs.core.BlackNode.prototype.apply = function(a, b) {
  return this.call.apply(this, [this].concat(b.slice()))
};
cljs.core.BlackNode.prototype.cljs$core$IFn$_invoke$arity$1 = function(a) {
  return this.cljs$core$ILookup$_lookup$arity$2(null, a)
};
cljs.core.BlackNode.prototype.cljs$core$IFn$_invoke$arity$2 = function(a, b) {
  return this.cljs$core$ILookup$_lookup$arity$3(null, a, b)
};
cljs.core.BlackNode.prototype.cljs$core$ICollection$_conj$arity$2 = function(a, b) {
  return cljs.core.PersistentVector.fromArray([this.key, this.val, b], !0)
};
cljs.core.BlackNode.prototype.cljs$core$IMapEntry$_key$arity$1 = function(a) {
  return this.key
};
cljs.core.BlackNode.prototype.cljs$core$IMapEntry$_val$arity$1 = function(a) {
  return this.val
};
cljs.core.BlackNode.prototype.add_right = function(a) {
  return a.balance_right(this)
};
cljs.core.BlackNode.prototype.redden = function() {
  return new cljs.core.RedNode(this.key, this.val, this.left, this.right, null)
};
cljs.core.BlackNode.prototype.remove_right = function(a) {
  return cljs.core.balance_right_del.call(null, this.key, this.val, this.left, a)
};
cljs.core.BlackNode.prototype.replace = function(a, b, c, d) {
  return new cljs.core.BlackNode(a, b, c, d, null)
};
cljs.core.BlackNode.prototype.kv_reduce = function(a, b) {
  return cljs.core.tree_map_kv_reduce.call(null, this, a, b)
};
cljs.core.BlackNode.prototype.remove_left = function(a) {
  return cljs.core.balance_left_del.call(null, this.key, this.val, a, this.right)
};
cljs.core.BlackNode.prototype.add_left = function(a) {
  return a.balance_left(this)
};
cljs.core.BlackNode.prototype.balance_left = function(a) {
  return new cljs.core.BlackNode(a.key, a.val, this, a.right, null)
};
cljs.core.BlackNode.prototype.balance_right = function(a) {
  return new cljs.core.BlackNode(a.key, a.val, a.left, this, null)
};
cljs.core.BlackNode.prototype.blacken = function() {
  return this
};
cljs.core.BlackNode.prototype.cljs$core$IReduce$_reduce$arity$2 = function(a, b) {
  return cljs.core.ci_reduce.call(null, this, b)
};
cljs.core.BlackNode.prototype.cljs$core$IReduce$_reduce$arity$3 = function(a, b, c) {
  return cljs.core.ci_reduce.call(null, this, b, c)
};
cljs.core.BlackNode.prototype.cljs$core$ISeqable$_seq$arity$1 = function(a) {
  return cljs.core._conj.call(null, cljs.core._conj.call(null, cljs.core.List.EMPTY, this.val), this.key)
};
cljs.core.BlackNode.prototype.cljs$core$ICounted$_count$arity$1 = function(a) {
  return 2
};
cljs.core.BlackNode.prototype.cljs$core$IStack$_peek$arity$1 = function(a) {
  return this.val
};
cljs.core.BlackNode.prototype.cljs$core$IStack$_pop$arity$1 = function(a) {
  return cljs.core.PersistentVector.fromArray([this.key], !0)
};
cljs.core.BlackNode.prototype.cljs$core$IVector$_assoc_n$arity$3 = function(a, b, c) {
  return cljs.core._assoc_n.call(null, cljs.core.PersistentVector.fromArray([this.key, this.val], !0), b, c)
};
cljs.core.BlackNode.prototype.cljs$core$IEquiv$_equiv$arity$2 = function(a, b) {
  return cljs.core.equiv_sequential.call(null, this, b)
};
cljs.core.BlackNode.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = function(a, b) {
  return cljs.core.with_meta.call(null, cljs.core.PersistentVector.fromArray([this.key, this.val], !0), b)
};
cljs.core.BlackNode.prototype.cljs$core$IMeta$_meta$arity$1 = function(a) {
  return null
};
cljs.core.BlackNode.prototype.cljs$core$IIndexed$_nth$arity$2 = function(a, b) {
  if(0 === b) {
    return this.key
  }
  if(1 === b) {
    return this.val
  }
  new cljs.core.Keyword(null, "else", "else", 1017020587);
  return null
};
cljs.core.BlackNode.prototype.cljs$core$IIndexed$_nth$arity$3 = function(a, b, c) {
  return 0 === b ? this.key : 1 === b ? this.val : new cljs.core.Keyword(null, "else", "else", 1017020587) ? c : null
};
cljs.core.BlackNode.prototype.cljs$core$IEmptyableCollection$_empty$arity$1 = function(a) {
  return cljs.core.PersistentVector.EMPTY
};
cljs.core.__GT_BlackNode = function(a, b, c, d, e) {
  return new cljs.core.BlackNode(a, b, c, d, e)
};
cljs.core.RedNode = function(a, b, c, d, e) {
  this.key = a;
  this.val = b;
  this.left = c;
  this.right = d;
  this.__hash = e;
  this.cljs$lang$protocol_mask$partition1$ = 0;
  this.cljs$lang$protocol_mask$partition0$ = 32402207
};
cljs.core.RedNode.cljs$lang$type = !0;
cljs.core.RedNode.cljs$lang$ctorStr = "cljs.core/RedNode";
cljs.core.RedNode.cljs$lang$ctorPrWriter = function(a, b, c) {
  return cljs.core._write.call(null, b, "cljs.core/RedNode")
};
cljs.core.RedNode.prototype.cljs$core$IHash$_hash$arity$1 = function(a) {
  a = this.__hash;
  return null != a ? a : this.__hash = a = cljs.core.hash_coll.call(null, this)
};
cljs.core.RedNode.prototype.cljs$core$ILookup$_lookup$arity$2 = function(a, b) {
  return cljs.core._nth.call(null, this, b, null)
};
cljs.core.RedNode.prototype.cljs$core$ILookup$_lookup$arity$3 = function(a, b, c) {
  return cljs.core._nth.call(null, this, b, c)
};
cljs.core.RedNode.prototype.cljs$core$IAssociative$_assoc$arity$3 = function(a, b, c) {
  return cljs.core.assoc.call(null, cljs.core.PersistentVector.fromArray([this.key, this.val], !0), b, c)
};
cljs.core.RedNode.prototype.call = function() {
  var a = null;
  return a = function(a, c, d) {
    switch(arguments.length) {
      case 2:
        return this.cljs$core$ILookup$_lookup$arity$2(null, c);
      case 3:
        return this.cljs$core$ILookup$_lookup$arity$3(null, c, d)
    }
    throw Error("Invalid arity: " + arguments.length);
  }
}();
cljs.core.RedNode.prototype.apply = function(a, b) {
  return this.call.apply(this, [this].concat(b.slice()))
};
cljs.core.RedNode.prototype.cljs$core$IFn$_invoke$arity$1 = function(a) {
  return this.cljs$core$ILookup$_lookup$arity$2(null, a)
};
cljs.core.RedNode.prototype.cljs$core$IFn$_invoke$arity$2 = function(a, b) {
  return this.cljs$core$ILookup$_lookup$arity$3(null, a, b)
};
cljs.core.RedNode.prototype.cljs$core$ICollection$_conj$arity$2 = function(a, b) {
  return cljs.core.PersistentVector.fromArray([this.key, this.val, b], !0)
};
cljs.core.RedNode.prototype.cljs$core$IMapEntry$_key$arity$1 = function(a) {
  return this.key
};
cljs.core.RedNode.prototype.cljs$core$IMapEntry$_val$arity$1 = function(a) {
  return this.val
};
cljs.core.RedNode.prototype.add_right = function(a) {
  return new cljs.core.RedNode(this.key, this.val, this.left, a, null)
};
cljs.core.RedNode.prototype.redden = function() {
  throw Error("red-black tree invariant violation");
};
cljs.core.RedNode.prototype.remove_right = function(a) {
  return new cljs.core.RedNode(this.key, this.val, this.left, a, null)
};
cljs.core.RedNode.prototype.replace = function(a, b, c, d) {
  return new cljs.core.RedNode(a, b, c, d, null)
};
cljs.core.RedNode.prototype.kv_reduce = function(a, b) {
  return cljs.core.tree_map_kv_reduce.call(null, this, a, b)
};
cljs.core.RedNode.prototype.remove_left = function(a) {
  return new cljs.core.RedNode(this.key, this.val, a, this.right, null)
};
cljs.core.RedNode.prototype.add_left = function(a) {
  return new cljs.core.RedNode(this.key, this.val, a, this.right, null)
};
cljs.core.RedNode.prototype.balance_left = function(a) {
  return this.left instanceof cljs.core.RedNode ? new cljs.core.RedNode(this.key, this.val, this.left.blacken(), new cljs.core.BlackNode(a.key, a.val, this.right, a.right, null), null) : this.right instanceof cljs.core.RedNode ? new cljs.core.RedNode(this.right.key, this.right.val, new cljs.core.BlackNode(this.key, this.val, this.left, this.right.left, null), new cljs.core.BlackNode(a.key, a.val, this.right.right, a.right, null), null) : new cljs.core.Keyword(null, "else", "else", 1017020587) ? new cljs.core.BlackNode(a.key, 
  a.val, this, a.right, null) : null
};
cljs.core.RedNode.prototype.balance_right = function(a) {
  return this.right instanceof cljs.core.RedNode ? new cljs.core.RedNode(this.key, this.val, new cljs.core.BlackNode(a.key, a.val, a.left, this.left, null), this.right.blacken(), null) : this.left instanceof cljs.core.RedNode ? new cljs.core.RedNode(this.left.key, this.left.val, new cljs.core.BlackNode(a.key, a.val, a.left, this.left.left, null), new cljs.core.BlackNode(this.key, this.val, this.left.right, this.right, null), null) : new cljs.core.Keyword(null, "else", "else", 1017020587) ? new cljs.core.BlackNode(a.key, 
  a.val, a.left, this, null) : null
};
cljs.core.RedNode.prototype.blacken = function() {
  return new cljs.core.BlackNode(this.key, this.val, this.left, this.right, null)
};
cljs.core.RedNode.prototype.cljs$core$IReduce$_reduce$arity$2 = function(a, b) {
  return cljs.core.ci_reduce.call(null, this, b)
};
cljs.core.RedNode.prototype.cljs$core$IReduce$_reduce$arity$3 = function(a, b, c) {
  return cljs.core.ci_reduce.call(null, this, b, c)
};
cljs.core.RedNode.prototype.cljs$core$ISeqable$_seq$arity$1 = function(a) {
  return cljs.core._conj.call(null, cljs.core._conj.call(null, cljs.core.List.EMPTY, this.val), this.key)
};
cljs.core.RedNode.prototype.cljs$core$ICounted$_count$arity$1 = function(a) {
  return 2
};
cljs.core.RedNode.prototype.cljs$core$IStack$_peek$arity$1 = function(a) {
  return this.val
};
cljs.core.RedNode.prototype.cljs$core$IStack$_pop$arity$1 = function(a) {
  return cljs.core.PersistentVector.fromArray([this.key], !0)
};
cljs.core.RedNode.prototype.cljs$core$IVector$_assoc_n$arity$3 = function(a, b, c) {
  return cljs.core._assoc_n.call(null, cljs.core.PersistentVector.fromArray([this.key, this.val], !0), b, c)
};
cljs.core.RedNode.prototype.cljs$core$IEquiv$_equiv$arity$2 = function(a, b) {
  return cljs.core.equiv_sequential.call(null, this, b)
};
cljs.core.RedNode.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = function(a, b) {
  return cljs.core.with_meta.call(null, cljs.core.PersistentVector.fromArray([this.key, this.val], !0), b)
};
cljs.core.RedNode.prototype.cljs$core$IMeta$_meta$arity$1 = function(a) {
  return null
};
cljs.core.RedNode.prototype.cljs$core$IIndexed$_nth$arity$2 = function(a, b) {
  if(0 === b) {
    return this.key
  }
  if(1 === b) {
    return this.val
  }
  new cljs.core.Keyword(null, "else", "else", 1017020587);
  return null
};
cljs.core.RedNode.prototype.cljs$core$IIndexed$_nth$arity$3 = function(a, b, c) {
  return 0 === b ? this.key : 1 === b ? this.val : new cljs.core.Keyword(null, "else", "else", 1017020587) ? c : null
};
cljs.core.RedNode.prototype.cljs$core$IEmptyableCollection$_empty$arity$1 = function(a) {
  return cljs.core.PersistentVector.EMPTY
};
cljs.core.__GT_RedNode = function(a, b, c, d, e) {
  return new cljs.core.RedNode(a, b, c, d, e)
};
cljs.core.tree_map_add = function tree_map_add(b, c, d, e, f) {
  if(null == c) {
    return new cljs.core.RedNode(d, e, null, null, null)
  }
  var g = b.call(null, d, c.key);
  return 0 === g ? (f[0] = c, null) : 0 > g ? (b = tree_map_add.call(null, b, c.left, d, e, f), null != b ? c.add_left(b) : null) : new cljs.core.Keyword(null, "else", "else", 1017020587) ? (b = tree_map_add.call(null, b, c.right, d, e, f), null != b ? c.add_right(b) : null) : null
};
cljs.core.tree_map_append = function tree_map_append(b, c) {
  if(null == b) {
    return c
  }
  if(null == c) {
    return b
  }
  if(b instanceof cljs.core.RedNode) {
    if(c instanceof cljs.core.RedNode) {
      var d = tree_map_append.call(null, b.right, c.left);
      return d instanceof cljs.core.RedNode ? new cljs.core.RedNode(d.key, d.val, new cljs.core.RedNode(b.key, b.val, b.left, d.left, null), new cljs.core.RedNode(c.key, c.val, d.right, c.right, null), null) : new cljs.core.RedNode(b.key, b.val, b.left, new cljs.core.RedNode(c.key, c.val, d, c.right, null), null)
    }
    return new cljs.core.RedNode(b.key, b.val, b.left, tree_map_append.call(null, b.right, c), null)
  }
  return c instanceof cljs.core.RedNode ? new cljs.core.RedNode(c.key, c.val, tree_map_append.call(null, b, c.left), c.right, null) : new cljs.core.Keyword(null, "else", "else", 1017020587) ? (d = tree_map_append.call(null, b.right, c.left), d instanceof cljs.core.RedNode ? new cljs.core.RedNode(d.key, d.val, new cljs.core.BlackNode(b.key, b.val, b.left, d.left, null), new cljs.core.BlackNode(c.key, c.val, d.right, c.right, null), null) : cljs.core.balance_left_del.call(null, b.key, b.val, b.left, 
  new cljs.core.BlackNode(c.key, c.val, d, c.right, null))) : null
};
cljs.core.tree_map_remove = function tree_map_remove(b, c, d, e) {
  if(null != c) {
    var f = b.call(null, d, c.key);
    if(0 === f) {
      return e[0] = c, cljs.core.tree_map_append.call(null, c.left, c.right)
    }
    if(0 > f) {
      return b = tree_map_remove.call(null, b, c.left, d, e), null != b || null != e[0] ? c.left instanceof cljs.core.BlackNode ? cljs.core.balance_left_del.call(null, c.key, c.val, b, c.right) : new cljs.core.RedNode(c.key, c.val, b, c.right, null) : null
    }
    if(new cljs.core.Keyword(null, "else", "else", 1017020587)) {
      return b = tree_map_remove.call(null, b, c.right, d, e), null != b || null != e[0] ? c.right instanceof cljs.core.BlackNode ? cljs.core.balance_right_del.call(null, c.key, c.val, c.left, b) : new cljs.core.RedNode(c.key, c.val, c.left, b, null) : null
    }
  }
  return null
};
cljs.core.tree_map_replace = function tree_map_replace(b, c, d, e) {
  var f = c.key, g = b.call(null, d, f);
  return 0 === g ? c.replace(f, e, c.left, c.right) : 0 > g ? c.replace(f, c.val, tree_map_replace.call(null, b, c.left, d, e), c.right) : new cljs.core.Keyword(null, "else", "else", 1017020587) ? c.replace(f, c.val, c.left, tree_map_replace.call(null, b, c.right, d, e)) : null
};
cljs.core.PersistentTreeMap = function(a, b, c, d, e) {
  this.comp = a;
  this.tree = b;
  this.cnt = c;
  this.meta = d;
  this.__hash = e;
  this.cljs$lang$protocol_mask$partition1$ = 0;
  this.cljs$lang$protocol_mask$partition0$ = 418776847
};
cljs.core.PersistentTreeMap.cljs$lang$type = !0;
cljs.core.PersistentTreeMap.cljs$lang$ctorStr = "cljs.core/PersistentTreeMap";
cljs.core.PersistentTreeMap.cljs$lang$ctorPrWriter = function(a, b, c) {
  return cljs.core._write.call(null, b, "cljs.core/PersistentTreeMap")
};
cljs.core.PersistentTreeMap.prototype.cljs$core$IHash$_hash$arity$1 = function(a) {
  a = this.__hash;
  return null != a ? a : this.__hash = a = cljs.core.hash_imap.call(null, this)
};
cljs.core.PersistentTreeMap.prototype.cljs$core$ILookup$_lookup$arity$2 = function(a, b) {
  return cljs.core._lookup.call(null, this, b, null)
};
cljs.core.PersistentTreeMap.prototype.cljs$core$ILookup$_lookup$arity$3 = function(a, b, c) {
  a = this.entry_at(b);
  return null != a ? a.val : c
};
cljs.core.PersistentTreeMap.prototype.cljs$core$IAssociative$_assoc$arity$3 = function(a, b, c) {
  a = [null];
  var d = cljs.core.tree_map_add.call(null, this.comp, this.tree, b, c, a);
  return null == d ? (a = cljs.core.nth.call(null, a, 0), cljs.core._EQ_.call(null, c, a.val) ? this : new cljs.core.PersistentTreeMap(this.comp, cljs.core.tree_map_replace.call(null, this.comp, this.tree, b, c), this.cnt, this.meta, null)) : new cljs.core.PersistentTreeMap(this.comp, d.blacken(), this.cnt + 1, this.meta, null)
};
cljs.core.PersistentTreeMap.prototype.cljs$core$IAssociative$_contains_key_QMARK_$arity$2 = function(a, b) {
  return null != this.entry_at(b)
};
cljs.core.PersistentTreeMap.prototype.call = function() {
  var a = null;
  return a = function(a, c, d) {
    switch(arguments.length) {
      case 2:
        return this.cljs$core$ILookup$_lookup$arity$2(null, c);
      case 3:
        return this.cljs$core$ILookup$_lookup$arity$3(null, c, d)
    }
    throw Error("Invalid arity: " + arguments.length);
  }
}();
cljs.core.PersistentTreeMap.prototype.apply = function(a, b) {
  return this.call.apply(this, [this].concat(b.slice()))
};
cljs.core.PersistentTreeMap.prototype.cljs$core$IFn$_invoke$arity$1 = function(a) {
  return this.cljs$core$ILookup$_lookup$arity$2(null, a)
};
cljs.core.PersistentTreeMap.prototype.cljs$core$IFn$_invoke$arity$2 = function(a, b) {
  return this.cljs$core$ILookup$_lookup$arity$3(null, a, b)
};
cljs.core.PersistentTreeMap.prototype.cljs$core$IKVReduce$_kv_reduce$arity$3 = function(a, b, c) {
  return null != this.tree ? cljs.core.tree_map_kv_reduce.call(null, this.tree, b, c) : c
};
cljs.core.PersistentTreeMap.prototype.cljs$core$ICollection$_conj$arity$2 = function(a, b) {
  return cljs.core.vector_QMARK_.call(null, b) ? cljs.core._assoc.call(null, this, cljs.core._nth.call(null, b, 0), cljs.core._nth.call(null, b, 1)) : cljs.core.reduce.call(null, cljs.core._conj, this, b)
};
cljs.core.PersistentTreeMap.prototype.cljs$core$IReversible$_rseq$arity$1 = function(a) {
  return 0 < this.cnt ? cljs.core.create_tree_map_seq.call(null, this.tree, !1, this.cnt) : null
};
cljs.core.PersistentTreeMap.prototype.entry_at = function(a) {
  for(var b = this.tree;;) {
    if(null != b) {
      var c = this.comp.call(null, a, b.key);
      if(0 === c) {
        return b
      }
      if(0 > c) {
        b = b.left
      }else {
        if(new cljs.core.Keyword(null, "else", "else", 1017020587)) {
          b = b.right
        }else {
          return null
        }
      }
    }else {
      return null
    }
  }
};
cljs.core.PersistentTreeMap.prototype.cljs$core$ISorted$_sorted_seq$arity$2 = function(a, b) {
  return 0 < this.cnt ? cljs.core.create_tree_map_seq.call(null, this.tree, b, this.cnt) : null
};
cljs.core.PersistentTreeMap.prototype.cljs$core$ISorted$_sorted_seq_from$arity$3 = function(a, b, c) {
  if(0 < this.cnt) {
    a = null;
    for(var d = this.tree;;) {
      if(null != d) {
        var e = this.comp.call(null, b, d.key);
        if(0 === e) {
          return new cljs.core.PersistentTreeMapSeq(null, cljs.core.conj.call(null, a, d), c, -1, null)
        }
        if(cljs.core.truth_(c)) {
          0 > e ? (a = cljs.core.conj.call(null, a, d), d = d.left) : d = d.right
        }else {
          if(new cljs.core.Keyword(null, "else", "else", 1017020587)) {
            0 < e ? (a = cljs.core.conj.call(null, a, d), d = d.right) : d = d.left
          }else {
            return null
          }
        }
      }else {
        return null == a ? null : new cljs.core.PersistentTreeMapSeq(null, a, c, -1, null)
      }
    }
  }else {
    return null
  }
};
cljs.core.PersistentTreeMap.prototype.cljs$core$ISorted$_entry_key$arity$2 = function(a, b) {
  return cljs.core.key.call(null, b)
};
cljs.core.PersistentTreeMap.prototype.cljs$core$ISorted$_comparator$arity$1 = function(a) {
  return this.comp
};
cljs.core.PersistentTreeMap.prototype.cljs$core$ISeqable$_seq$arity$1 = function(a) {
  return 0 < this.cnt ? cljs.core.create_tree_map_seq.call(null, this.tree, !0, this.cnt) : null
};
cljs.core.PersistentTreeMap.prototype.cljs$core$ICounted$_count$arity$1 = function(a) {
  return this.cnt
};
cljs.core.PersistentTreeMap.prototype.cljs$core$IEquiv$_equiv$arity$2 = function(a, b) {
  return cljs.core.equiv_map.call(null, this, b)
};
cljs.core.PersistentTreeMap.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = function(a, b) {
  return new cljs.core.PersistentTreeMap(this.comp, this.tree, this.cnt, b, this.__hash)
};
cljs.core.PersistentTreeMap.prototype.cljs$core$IMeta$_meta$arity$1 = function(a) {
  return this.meta
};
cljs.core.PersistentTreeMap.prototype.cljs$core$IEmptyableCollection$_empty$arity$1 = function(a) {
  return cljs.core.with_meta.call(null, cljs.core.PersistentTreeMap.EMPTY, this.meta)
};
cljs.core.PersistentTreeMap.prototype.cljs$core$IMap$_dissoc$arity$2 = function(a, b) {
  var c = [null], d = cljs.core.tree_map_remove.call(null, this.comp, this.tree, b, c);
  return null == d ? null == cljs.core.nth.call(null, c, 0) ? this : new cljs.core.PersistentTreeMap(this.comp, null, 0, this.meta, null) : new cljs.core.PersistentTreeMap(this.comp, d.blacken(), this.cnt - 1, this.meta, null)
};
cljs.core.__GT_PersistentTreeMap = function(a, b, c, d, e) {
  return new cljs.core.PersistentTreeMap(a, b, c, d, e)
};
cljs.core.PersistentTreeMap.EMPTY = new cljs.core.PersistentTreeMap(cljs.core.compare, null, 0, null, 0);
cljs.core.hash_map = function() {
  var a = function(a) {
    a = cljs.core.seq.call(null, a);
    for(var b = cljs.core.transient$.call(null, cljs.core.PersistentHashMap.EMPTY);;) {
      if(a) {
        var e = cljs.core.nnext.call(null, a), b = cljs.core.assoc_BANG_.call(null, b, cljs.core.first.call(null, a), cljs.core.second.call(null, a));
        a = e
      }else {
        return cljs.core.persistent_BANG_.call(null, b)
      }
    }
  }, b = function(b) {
    var d = null;
    0 < arguments.length && (d = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0), 0));
    return a.call(this, d)
  };
  b.cljs$lang$maxFixedArity = 0;
  b.cljs$lang$applyTo = function(b) {
    b = cljs.core.seq(b);
    return a(b)
  };
  b.cljs$core$IFn$_invoke$arity$variadic = a;
  return b
}();
cljs.core.array_map = function() {
  var a = function(a) {
    return new cljs.core.PersistentArrayMap(null, cljs.core.quot.call(null, cljs.core.count.call(null, a), 2), cljs.core.apply.call(null, cljs.core.array, a), null)
  }, b = function(b) {
    var d = null;
    0 < arguments.length && (d = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0), 0));
    return a.call(this, d)
  };
  b.cljs$lang$maxFixedArity = 0;
  b.cljs$lang$applyTo = function(b) {
    b = cljs.core.seq(b);
    return a(b)
  };
  b.cljs$core$IFn$_invoke$arity$variadic = a;
  return b
}();
cljs.core.obj_map = function() {
  var a = function(a) {
    var b = [], e = {};
    for(a = cljs.core.seq.call(null, a);;) {
      if(a) {
        b.push(cljs.core.first.call(null, a)), e[cljs.core.first.call(null, a)] = cljs.core.second.call(null, a), a = cljs.core.nnext.call(null, a)
      }else {
        return cljs.core.ObjMap.fromObject.call(null, b, e)
      }
    }
  }, b = function(b) {
    var d = null;
    0 < arguments.length && (d = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0), 0));
    return a.call(this, d)
  };
  b.cljs$lang$maxFixedArity = 0;
  b.cljs$lang$applyTo = function(b) {
    b = cljs.core.seq(b);
    return a(b)
  };
  b.cljs$core$IFn$_invoke$arity$variadic = a;
  return b
}();
cljs.core.sorted_map = function() {
  var a = function(a) {
    a = cljs.core.seq.call(null, a);
    for(var b = cljs.core.PersistentTreeMap.EMPTY;;) {
      if(a) {
        var e = cljs.core.nnext.call(null, a), b = cljs.core.assoc.call(null, b, cljs.core.first.call(null, a), cljs.core.second.call(null, a));
        a = e
      }else {
        return b
      }
    }
  }, b = function(b) {
    var d = null;
    0 < arguments.length && (d = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0), 0));
    return a.call(this, d)
  };
  b.cljs$lang$maxFixedArity = 0;
  b.cljs$lang$applyTo = function(b) {
    b = cljs.core.seq(b);
    return a(b)
  };
  b.cljs$core$IFn$_invoke$arity$variadic = a;
  return b
}();
cljs.core.sorted_map_by = function() {
  var a = function(a, b) {
    for(var e = cljs.core.seq.call(null, b), f = new cljs.core.PersistentTreeMap(cljs.core.fn__GT_comparator.call(null, a), null, 0, null, 0);;) {
      if(e) {
        var g = cljs.core.nnext.call(null, e), f = cljs.core.assoc.call(null, f, cljs.core.first.call(null, e), cljs.core.second.call(null, e)), e = g
      }else {
        return f
      }
    }
  }, b = function(b, d) {
    var e = null;
    1 < arguments.length && (e = cljs.core.array_seq(Array.prototype.slice.call(arguments, 1), 0));
    return a.call(this, b, e)
  };
  b.cljs$lang$maxFixedArity = 1;
  b.cljs$lang$applyTo = function(b) {
    var d = cljs.core.first(b);
    b = cljs.core.rest(b);
    return a(d, b)
  };
  b.cljs$core$IFn$_invoke$arity$variadic = a;
  return b
}();
cljs.core.KeySeq = function(a, b) {
  this.mseq = a;
  this._meta = b;
  this.cljs$lang$protocol_mask$partition1$ = 0;
  this.cljs$lang$protocol_mask$partition0$ = 32374988
};
cljs.core.KeySeq.cljs$lang$type = !0;
cljs.core.KeySeq.cljs$lang$ctorStr = "cljs.core/KeySeq";
cljs.core.KeySeq.cljs$lang$ctorPrWriter = function(a, b, c) {
  return cljs.core._write.call(null, b, "cljs.core/KeySeq")
};
cljs.core.KeySeq.prototype.cljs$core$IHash$_hash$arity$1 = function(a) {
  return cljs.core.hash_coll.call(null, this)
};
cljs.core.KeySeq.prototype.cljs$core$INext$_next$arity$1 = function(a) {
  a = ((a = this.mseq) ? a.cljs$lang$protocol_mask$partition0$ & 128 || a.cljs$core$INext$ || (a.cljs$lang$protocol_mask$partition0$ ? 0 : cljs.core.native_satisfies_QMARK_.call(null, cljs.core.INext, a)) : cljs.core.native_satisfies_QMARK_.call(null, cljs.core.INext, a)) ? cljs.core._next.call(null, this.mseq) : cljs.core.next.call(null, this.mseq);
  return null == a ? null : new cljs.core.KeySeq(a, this._meta)
};
cljs.core.KeySeq.prototype.cljs$core$ICollection$_conj$arity$2 = function(a, b) {
  return cljs.core.cons.call(null, b, this)
};
cljs.core.KeySeq.prototype.toString = function() {
  return cljs.core.pr_str_STAR_.call(null, this)
};
cljs.core.KeySeq.prototype.cljs$core$IReduce$_reduce$arity$2 = function(a, b) {
  return cljs.core.seq_reduce.call(null, b, this)
};
cljs.core.KeySeq.prototype.cljs$core$IReduce$_reduce$arity$3 = function(a, b, c) {
  return cljs.core.seq_reduce.call(null, b, c, this)
};
cljs.core.KeySeq.prototype.cljs$core$ISeqable$_seq$arity$1 = function(a) {
  return this
};
cljs.core.KeySeq.prototype.cljs$core$ISeq$_first$arity$1 = function(a) {
  a = cljs.core._first.call(null, this.mseq);
  return cljs.core._key.call(null, a)
};
cljs.core.KeySeq.prototype.cljs$core$ISeq$_rest$arity$1 = function(a) {
  a = ((a = this.mseq) ? a.cljs$lang$protocol_mask$partition0$ & 128 || a.cljs$core$INext$ || (a.cljs$lang$protocol_mask$partition0$ ? 0 : cljs.core.native_satisfies_QMARK_.call(null, cljs.core.INext, a)) : cljs.core.native_satisfies_QMARK_.call(null, cljs.core.INext, a)) ? cljs.core._next.call(null, this.mseq) : cljs.core.next.call(null, this.mseq);
  return null != a ? new cljs.core.KeySeq(a, this._meta) : cljs.core.List.EMPTY
};
cljs.core.KeySeq.prototype.cljs$core$IEquiv$_equiv$arity$2 = function(a, b) {
  return cljs.core.equiv_sequential.call(null, this, b)
};
cljs.core.KeySeq.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = function(a, b) {
  return new cljs.core.KeySeq(this.mseq, b)
};
cljs.core.KeySeq.prototype.cljs$core$IMeta$_meta$arity$1 = function(a) {
  return this._meta
};
cljs.core.KeySeq.prototype.cljs$core$IEmptyableCollection$_empty$arity$1 = function(a) {
  return cljs.core.with_meta.call(null, cljs.core.List.EMPTY, this._meta)
};
cljs.core.__GT_KeySeq = function(a, b) {
  return new cljs.core.KeySeq(a, b)
};
cljs.core.keys = function(a) {
  return(a = cljs.core.seq.call(null, a)) ? new cljs.core.KeySeq(a, null) : null
};
cljs.core.key = function(a) {
  return cljs.core._key.call(null, a)
};
cljs.core.ValSeq = function(a, b) {
  this.mseq = a;
  this._meta = b;
  this.cljs$lang$protocol_mask$partition1$ = 0;
  this.cljs$lang$protocol_mask$partition0$ = 32374988
};
cljs.core.ValSeq.cljs$lang$type = !0;
cljs.core.ValSeq.cljs$lang$ctorStr = "cljs.core/ValSeq";
cljs.core.ValSeq.cljs$lang$ctorPrWriter = function(a, b, c) {
  return cljs.core._write.call(null, b, "cljs.core/ValSeq")
};
cljs.core.ValSeq.prototype.cljs$core$IHash$_hash$arity$1 = function(a) {
  return cljs.core.hash_coll.call(null, this)
};
cljs.core.ValSeq.prototype.cljs$core$INext$_next$arity$1 = function(a) {
  a = ((a = this.mseq) ? a.cljs$lang$protocol_mask$partition0$ & 128 || a.cljs$core$INext$ || (a.cljs$lang$protocol_mask$partition0$ ? 0 : cljs.core.native_satisfies_QMARK_.call(null, cljs.core.INext, a)) : cljs.core.native_satisfies_QMARK_.call(null, cljs.core.INext, a)) ? cljs.core._next.call(null, this.mseq) : cljs.core.next.call(null, this.mseq);
  return null == a ? null : new cljs.core.ValSeq(a, this._meta)
};
cljs.core.ValSeq.prototype.cljs$core$ICollection$_conj$arity$2 = function(a, b) {
  return cljs.core.cons.call(null, b, this)
};
cljs.core.ValSeq.prototype.toString = function() {
  return cljs.core.pr_str_STAR_.call(null, this)
};
cljs.core.ValSeq.prototype.cljs$core$IReduce$_reduce$arity$2 = function(a, b) {
  return cljs.core.seq_reduce.call(null, b, this)
};
cljs.core.ValSeq.prototype.cljs$core$IReduce$_reduce$arity$3 = function(a, b, c) {
  return cljs.core.seq_reduce.call(null, b, c, this)
};
cljs.core.ValSeq.prototype.cljs$core$ISeqable$_seq$arity$1 = function(a) {
  return this
};
cljs.core.ValSeq.prototype.cljs$core$ISeq$_first$arity$1 = function(a) {
  a = cljs.core._first.call(null, this.mseq);
  return cljs.core._val.call(null, a)
};
cljs.core.ValSeq.prototype.cljs$core$ISeq$_rest$arity$1 = function(a) {
  a = ((a = this.mseq) ? a.cljs$lang$protocol_mask$partition0$ & 128 || a.cljs$core$INext$ || (a.cljs$lang$protocol_mask$partition0$ ? 0 : cljs.core.native_satisfies_QMARK_.call(null, cljs.core.INext, a)) : cljs.core.native_satisfies_QMARK_.call(null, cljs.core.INext, a)) ? cljs.core._next.call(null, this.mseq) : cljs.core.next.call(null, this.mseq);
  return null != a ? new cljs.core.ValSeq(a, this._meta) : cljs.core.List.EMPTY
};
cljs.core.ValSeq.prototype.cljs$core$IEquiv$_equiv$arity$2 = function(a, b) {
  return cljs.core.equiv_sequential.call(null, this, b)
};
cljs.core.ValSeq.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = function(a, b) {
  return new cljs.core.ValSeq(this.mseq, b)
};
cljs.core.ValSeq.prototype.cljs$core$IMeta$_meta$arity$1 = function(a) {
  return this._meta
};
cljs.core.ValSeq.prototype.cljs$core$IEmptyableCollection$_empty$arity$1 = function(a) {
  return cljs.core.with_meta.call(null, cljs.core.List.EMPTY, this._meta)
};
cljs.core.__GT_ValSeq = function(a, b) {
  return new cljs.core.ValSeq(a, b)
};
cljs.core.vals = function(a) {
  return(a = cljs.core.seq.call(null, a)) ? new cljs.core.ValSeq(a, null) : null
};
cljs.core.val = function(a) {
  return cljs.core._val.call(null, a)
};
cljs.core.merge = function() {
  var a = function(a) {
    return cljs.core.truth_(cljs.core.some.call(null, cljs.core.identity, a)) ? cljs.core.reduce.call(null, function(a, b) {
      return cljs.core.conj.call(null, cljs.core.truth_(a) ? a : cljs.core.PersistentArrayMap.EMPTY, b)
    }, a) : null
  }, b = function(b) {
    var d = null;
    0 < arguments.length && (d = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0), 0));
    return a.call(this, d)
  };
  b.cljs$lang$maxFixedArity = 0;
  b.cljs$lang$applyTo = function(b) {
    b = cljs.core.seq(b);
    return a(b)
  };
  b.cljs$core$IFn$_invoke$arity$variadic = a;
  return b
}();
cljs.core.merge_with = function() {
  var a = function(a, b) {
    if(cljs.core.truth_(cljs.core.some.call(null, cljs.core.identity, b))) {
      var e = function(a) {
        return function(b, c) {
          return cljs.core.reduce.call(null, a, cljs.core.truth_(b) ? b : cljs.core.PersistentArrayMap.EMPTY, cljs.core.seq.call(null, c))
        }
      }(function(b, d) {
        var e = cljs.core.first.call(null, d), l = cljs.core.second.call(null, d);
        return cljs.core.contains_QMARK_.call(null, b, e) ? cljs.core.assoc.call(null, b, e, a.call(null, cljs.core.get.call(null, b, e), l)) : cljs.core.assoc.call(null, b, e, l)
      });
      return cljs.core.reduce.call(null, e, b)
    }
    return null
  }, b = function(b, d) {
    var e = null;
    1 < arguments.length && (e = cljs.core.array_seq(Array.prototype.slice.call(arguments, 1), 0));
    return a.call(this, b, e)
  };
  b.cljs$lang$maxFixedArity = 1;
  b.cljs$lang$applyTo = function(b) {
    var d = cljs.core.first(b);
    b = cljs.core.rest(b);
    return a(d, b)
  };
  b.cljs$core$IFn$_invoke$arity$variadic = a;
  return b
}();
cljs.core.select_keys = function(a, b) {
  for(var c = cljs.core.PersistentArrayMap.EMPTY, d = cljs.core.seq.call(null, b);;) {
    if(d) {
      var e = cljs.core.first.call(null, d), f = cljs.core.get.call(null, a, e, new cljs.core.Keyword("cljs.core", "not-found", "cljs.core/not-found", 4155500789)), c = cljs.core.not_EQ_.call(null, f, new cljs.core.Keyword("cljs.core", "not-found", "cljs.core/not-found", 4155500789)) ? cljs.core.assoc.call(null, c, e, f) : c, d = cljs.core.next.call(null, d)
    }else {
      return c
    }
  }
};
cljs.core.PersistentHashSet = function(a, b, c) {
  this.meta = a;
  this.hash_map = b;
  this.__hash = c;
  this.cljs$lang$protocol_mask$partition1$ = 4;
  this.cljs$lang$protocol_mask$partition0$ = 15077647
};
cljs.core.PersistentHashSet.cljs$lang$type = !0;
cljs.core.PersistentHashSet.cljs$lang$ctorStr = "cljs.core/PersistentHashSet";
cljs.core.PersistentHashSet.cljs$lang$ctorPrWriter = function(a, b, c) {
  return cljs.core._write.call(null, b, "cljs.core/PersistentHashSet")
};
cljs.core.PersistentHashSet.prototype.cljs$core$IEditableCollection$_as_transient$arity$1 = function(a) {
  return new cljs.core.TransientHashSet(cljs.core._as_transient.call(null, this.hash_map))
};
cljs.core.PersistentHashSet.prototype.cljs$core$IHash$_hash$arity$1 = function(a) {
  a = this.__hash;
  return null != a ? a : this.__hash = a = cljs.core.hash_iset.call(null, this)
};
cljs.core.PersistentHashSet.prototype.cljs$core$ILookup$_lookup$arity$2 = function(a, b) {
  return cljs.core._lookup.call(null, this, b, null)
};
cljs.core.PersistentHashSet.prototype.cljs$core$ILookup$_lookup$arity$3 = function(a, b, c) {
  return cljs.core.truth_(cljs.core._contains_key_QMARK_.call(null, this.hash_map, b)) ? b : c
};
cljs.core.PersistentHashSet.prototype.call = function() {
  var a = null;
  return a = function(a, c, d) {
    switch(arguments.length) {
      case 2:
        return this.cljs$core$ILookup$_lookup$arity$2(null, c);
      case 3:
        return this.cljs$core$ILookup$_lookup$arity$3(null, c, d)
    }
    throw Error("Invalid arity: " + arguments.length);
  }
}();
cljs.core.PersistentHashSet.prototype.apply = function(a, b) {
  return this.call.apply(this, [this].concat(b.slice()))
};
cljs.core.PersistentHashSet.prototype.cljs$core$IFn$_invoke$arity$1 = function(a) {
  return this.cljs$core$ILookup$_lookup$arity$2(null, a)
};
cljs.core.PersistentHashSet.prototype.cljs$core$IFn$_invoke$arity$2 = function(a, b) {
  return this.cljs$core$ILookup$_lookup$arity$3(null, a, b)
};
cljs.core.PersistentHashSet.prototype.cljs$core$ICollection$_conj$arity$2 = function(a, b) {
  return new cljs.core.PersistentHashSet(this.meta, cljs.core.assoc.call(null, this.hash_map, b, null), null)
};
cljs.core.PersistentHashSet.prototype.toString = function() {
  return cljs.core.pr_str_STAR_.call(null, this)
};
cljs.core.PersistentHashSet.prototype.cljs$core$ISeqable$_seq$arity$1 = function(a) {
  return cljs.core.keys.call(null, this.hash_map)
};
cljs.core.PersistentHashSet.prototype.cljs$core$ISet$_disjoin$arity$2 = function(a, b) {
  return new cljs.core.PersistentHashSet(this.meta, cljs.core._dissoc.call(null, this.hash_map, b), null)
};
cljs.core.PersistentHashSet.prototype.cljs$core$ICounted$_count$arity$1 = function(a) {
  return cljs.core._count.call(null, this.hash_map)
};
cljs.core.PersistentHashSet.prototype.cljs$core$IEquiv$_equiv$arity$2 = function(a, b) {
  var c = this;
  return cljs.core.set_QMARK_.call(null, b) && cljs.core.count.call(null, c) === cljs.core.count.call(null, b) && cljs.core.every_QMARK_.call(null, function(a) {
    return cljs.core.contains_QMARK_.call(null, c, a)
  }, b)
};
cljs.core.PersistentHashSet.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = function(a, b) {
  return new cljs.core.PersistentHashSet(b, this.hash_map, this.__hash)
};
cljs.core.PersistentHashSet.prototype.cljs$core$IMeta$_meta$arity$1 = function(a) {
  return this.meta
};
cljs.core.PersistentHashSet.prototype.cljs$core$IEmptyableCollection$_empty$arity$1 = function(a) {
  return cljs.core.with_meta.call(null, cljs.core.PersistentHashSet.EMPTY, this.meta)
};
cljs.core.__GT_PersistentHashSet = function(a, b, c) {
  return new cljs.core.PersistentHashSet(a, b, c)
};
cljs.core.PersistentHashSet.EMPTY = new cljs.core.PersistentHashSet(null, cljs.core.PersistentArrayMap.EMPTY, 0);
cljs.core.PersistentHashSet.fromArray = function(a, b) {
  var c = a.length;
  if(c / 2 <= cljs.core.PersistentArrayMap.HASHMAP_THRESHOLD) {
    return c = b ? a : a.slice(), new cljs.core.PersistentHashSet(null, cljs.core.PersistentArrayMap.fromArray.call(null, c, !0), null)
  }
  for(var d = 0, e = cljs.core.transient$.call(null, cljs.core.PersistentHashSet.EMPTY);;) {
    if(d < c) {
      var f = d + 2, e = cljs.core.conj_BANG_.call(null, e, a[d]), d = f
    }else {
      return cljs.core.persistent_BANG_.call(null, e)
    }
  }
};
cljs.core.TransientHashSet = function(a) {
  this.transient_map = a;
  this.cljs$lang$protocol_mask$partition0$ = 259;
  this.cljs$lang$protocol_mask$partition1$ = 136
};
cljs.core.TransientHashSet.cljs$lang$type = !0;
cljs.core.TransientHashSet.cljs$lang$ctorStr = "cljs.core/TransientHashSet";
cljs.core.TransientHashSet.cljs$lang$ctorPrWriter = function(a, b, c) {
  return cljs.core._write.call(null, b, "cljs.core/TransientHashSet")
};
cljs.core.TransientHashSet.prototype.call = function() {
  var a = null;
  return a = function(a, c, d) {
    switch(arguments.length) {
      case 2:
        var e;
        e = cljs.core._lookup.call(null, this.transient_map, c, cljs.core.lookup_sentinel) === cljs.core.lookup_sentinel ? null : c;
        return e;
      case 3:
        return e = cljs.core._lookup.call(null, this.transient_map, c, cljs.core.lookup_sentinel) === cljs.core.lookup_sentinel ? d : c, e
    }
    throw Error("Invalid arity: " + arguments.length);
  }
}();
cljs.core.TransientHashSet.prototype.apply = function(a, b) {
  return this.call.apply(this, [this].concat(b.slice()))
};
cljs.core.TransientHashSet.prototype.cljs$core$IFn$_invoke$arity$1 = function(a) {
  return cljs.core._lookup.call(null, this.transient_map, a, cljs.core.lookup_sentinel) === cljs.core.lookup_sentinel ? null : a
};
cljs.core.TransientHashSet.prototype.cljs$core$IFn$_invoke$arity$2 = function(a, b) {
  return cljs.core._lookup.call(null, this.transient_map, a, cljs.core.lookup_sentinel) === cljs.core.lookup_sentinel ? b : a
};
cljs.core.TransientHashSet.prototype.cljs$core$ILookup$_lookup$arity$2 = function(a, b) {
  return cljs.core._lookup.call(null, this, b, null)
};
cljs.core.TransientHashSet.prototype.cljs$core$ILookup$_lookup$arity$3 = function(a, b, c) {
  return cljs.core._lookup.call(null, this.transient_map, b, cljs.core.lookup_sentinel) === cljs.core.lookup_sentinel ? c : b
};
cljs.core.TransientHashSet.prototype.cljs$core$ICounted$_count$arity$1 = function(a) {
  return cljs.core.count.call(null, this.transient_map)
};
cljs.core.TransientHashSet.prototype.cljs$core$ITransientSet$_disjoin_BANG_$arity$2 = function(a, b) {
  this.transient_map = cljs.core.dissoc_BANG_.call(null, this.transient_map, b);
  return this
};
cljs.core.TransientHashSet.prototype.cljs$core$ITransientCollection$_conj_BANG_$arity$2 = function(a, b) {
  this.transient_map = cljs.core.assoc_BANG_.call(null, this.transient_map, b, null);
  return this
};
cljs.core.TransientHashSet.prototype.cljs$core$ITransientCollection$_persistent_BANG_$arity$1 = function(a) {
  return new cljs.core.PersistentHashSet(null, cljs.core.persistent_BANG_.call(null, this.transient_map), null)
};
cljs.core.__GT_TransientHashSet = function(a) {
  return new cljs.core.TransientHashSet(a)
};
cljs.core.PersistentTreeSet = function(a, b, c) {
  this.meta = a;
  this.tree_map = b;
  this.__hash = c;
  this.cljs$lang$protocol_mask$partition1$ = 0;
  this.cljs$lang$protocol_mask$partition0$ = 417730831
};
cljs.core.PersistentTreeSet.cljs$lang$type = !0;
cljs.core.PersistentTreeSet.cljs$lang$ctorStr = "cljs.core/PersistentTreeSet";
cljs.core.PersistentTreeSet.cljs$lang$ctorPrWriter = function(a, b, c) {
  return cljs.core._write.call(null, b, "cljs.core/PersistentTreeSet")
};
cljs.core.PersistentTreeSet.prototype.cljs$core$IHash$_hash$arity$1 = function(a) {
  a = this.__hash;
  return null != a ? a : this.__hash = a = cljs.core.hash_iset.call(null, this)
};
cljs.core.PersistentTreeSet.prototype.cljs$core$ILookup$_lookup$arity$2 = function(a, b) {
  return cljs.core._lookup.call(null, this, b, null)
};
cljs.core.PersistentTreeSet.prototype.cljs$core$ILookup$_lookup$arity$3 = function(a, b, c) {
  a = this.tree_map.entry_at(b);
  return null != a ? a.key : c
};
cljs.core.PersistentTreeSet.prototype.call = function() {
  var a = null;
  return a = function(a, c, d) {
    switch(arguments.length) {
      case 2:
        return this.cljs$core$ILookup$_lookup$arity$2(null, c);
      case 3:
        return this.cljs$core$ILookup$_lookup$arity$3(null, c, d)
    }
    throw Error("Invalid arity: " + arguments.length);
  }
}();
cljs.core.PersistentTreeSet.prototype.apply = function(a, b) {
  return this.call.apply(this, [this].concat(b.slice()))
};
cljs.core.PersistentTreeSet.prototype.cljs$core$IFn$_invoke$arity$1 = function(a) {
  return this.cljs$core$ILookup$_lookup$arity$2(null, a)
};
cljs.core.PersistentTreeSet.prototype.cljs$core$IFn$_invoke$arity$2 = function(a, b) {
  return this.cljs$core$ILookup$_lookup$arity$3(null, a, b)
};
cljs.core.PersistentTreeSet.prototype.cljs$core$ICollection$_conj$arity$2 = function(a, b) {
  return new cljs.core.PersistentTreeSet(this.meta, cljs.core.assoc.call(null, this.tree_map, b, null), null)
};
cljs.core.PersistentTreeSet.prototype.cljs$core$IReversible$_rseq$arity$1 = function(a) {
  return 0 < cljs.core.count.call(null, this.tree_map) ? cljs.core.map.call(null, cljs.core.key, cljs.core.rseq.call(null, this.tree_map)) : null
};
cljs.core.PersistentTreeSet.prototype.toString = function() {
  return cljs.core.pr_str_STAR_.call(null, this)
};
cljs.core.PersistentTreeSet.prototype.cljs$core$ISorted$_sorted_seq$arity$2 = function(a, b) {
  return cljs.core.map.call(null, cljs.core.key, cljs.core._sorted_seq.call(null, this.tree_map, b))
};
cljs.core.PersistentTreeSet.prototype.cljs$core$ISorted$_sorted_seq_from$arity$3 = function(a, b, c) {
  return cljs.core.map.call(null, cljs.core.key, cljs.core._sorted_seq_from.call(null, this.tree_map, b, c))
};
cljs.core.PersistentTreeSet.prototype.cljs$core$ISorted$_entry_key$arity$2 = function(a, b) {
  return b
};
cljs.core.PersistentTreeSet.prototype.cljs$core$ISorted$_comparator$arity$1 = function(a) {
  return cljs.core._comparator.call(null, this.tree_map)
};
cljs.core.PersistentTreeSet.prototype.cljs$core$ISeqable$_seq$arity$1 = function(a) {
  return cljs.core.keys.call(null, this.tree_map)
};
cljs.core.PersistentTreeSet.prototype.cljs$core$ISet$_disjoin$arity$2 = function(a, b) {
  return new cljs.core.PersistentTreeSet(this.meta, cljs.core.dissoc.call(null, this.tree_map, b), null)
};
cljs.core.PersistentTreeSet.prototype.cljs$core$ICounted$_count$arity$1 = function(a) {
  return cljs.core.count.call(null, this.tree_map)
};
cljs.core.PersistentTreeSet.prototype.cljs$core$IEquiv$_equiv$arity$2 = function(a, b) {
  var c = this;
  return cljs.core.set_QMARK_.call(null, b) && cljs.core.count.call(null, c) === cljs.core.count.call(null, b) && cljs.core.every_QMARK_.call(null, function(a) {
    return cljs.core.contains_QMARK_.call(null, c, a)
  }, b)
};
cljs.core.PersistentTreeSet.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = function(a, b) {
  return new cljs.core.PersistentTreeSet(b, this.tree_map, this.__hash)
};
cljs.core.PersistentTreeSet.prototype.cljs$core$IMeta$_meta$arity$1 = function(a) {
  return this.meta
};
cljs.core.PersistentTreeSet.prototype.cljs$core$IEmptyableCollection$_empty$arity$1 = function(a) {
  return cljs.core.with_meta.call(null, cljs.core.PersistentTreeSet.EMPTY, this.meta)
};
cljs.core.__GT_PersistentTreeSet = function(a, b, c) {
  return new cljs.core.PersistentTreeSet(a, b, c)
};
cljs.core.PersistentTreeSet.EMPTY = new cljs.core.PersistentTreeSet(null, cljs.core.PersistentTreeMap.EMPTY, 0);
cljs.core.set_from_indexed_seq = function(a) {
  a = a.arr;
  a: {
    for(var b = 0, c = cljs.core._as_transient.call(null, cljs.core.PersistentHashSet.EMPTY);;) {
      if(b < a.length) {
        var d = b + 1, c = cljs.core._conj_BANG_.call(null, c, a[b]), b = d
      }else {
        a = c;
        break a
      }
    }
    a = void 0
  }
  return cljs.core._persistent_BANG_.call(null, a)
};
cljs.core.set = function(a) {
  a = cljs.core.seq.call(null, a);
  if(null == a) {
    return cljs.core.PersistentHashSet.EMPTY
  }
  if(a instanceof cljs.core.IndexedSeq) {
    return cljs.core.set_from_indexed_seq.call(null, a)
  }
  if(new cljs.core.Keyword(null, "else", "else", 1017020587)) {
    for(var b = cljs.core._as_transient.call(null, cljs.core.PersistentHashSet.EMPTY);;) {
      if(null != a) {
        var c = cljs.core._next.call(null, a), b = cljs.core._conj_BANG_.call(null, b, cljs.core._first.call(null, a));
        a = c
      }else {
        return cljs.core._persistent_BANG_.call(null, b)
      }
    }
  }else {
    return null
  }
};
cljs.core.hash_set = function() {
  var a = null, b = function() {
    return cljs.core.PersistentHashSet.EMPTY
  }, c = function() {
    var a = function(a) {
      return cljs.core.set.call(null, a)
    }, b = function(b) {
      var c = null;
      0 < arguments.length && (c = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0), 0));
      return a.call(this, c)
    };
    b.cljs$lang$maxFixedArity = 0;
    b.cljs$lang$applyTo = function(b) {
      b = cljs.core.seq(b);
      return a(b)
    };
    b.cljs$core$IFn$_invoke$arity$variadic = a;
    return b
  }(), a = function(a) {
    switch(arguments.length) {
      case 0:
        return b.call(this);
      default:
        return c.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(arguments, 0))
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$lang$maxFixedArity = 0;
  a.cljs$lang$applyTo = c.cljs$lang$applyTo;
  a.cljs$core$IFn$_invoke$arity$0 = b;
  a.cljs$core$IFn$_invoke$arity$variadic = c.cljs$core$IFn$_invoke$arity$variadic;
  return a
}();
cljs.core.sorted_set = function() {
  var a = function(a) {
    return cljs.core.reduce.call(null, cljs.core._conj, cljs.core.PersistentTreeSet.EMPTY, a)
  }, b = function(b) {
    var d = null;
    0 < arguments.length && (d = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0), 0));
    return a.call(this, d)
  };
  b.cljs$lang$maxFixedArity = 0;
  b.cljs$lang$applyTo = function(b) {
    b = cljs.core.seq(b);
    return a(b)
  };
  b.cljs$core$IFn$_invoke$arity$variadic = a;
  return b
}();
cljs.core.sorted_set_by = function() {
  var a = function(a, b) {
    return cljs.core.reduce.call(null, cljs.core._conj, new cljs.core.PersistentTreeSet(null, cljs.core.sorted_map_by.call(null, a), 0), b)
  }, b = function(b, d) {
    var e = null;
    1 < arguments.length && (e = cljs.core.array_seq(Array.prototype.slice.call(arguments, 1), 0));
    return a.call(this, b, e)
  };
  b.cljs$lang$maxFixedArity = 1;
  b.cljs$lang$applyTo = function(b) {
    var d = cljs.core.first(b);
    b = cljs.core.rest(b);
    return a(d, b)
  };
  b.cljs$core$IFn$_invoke$arity$variadic = a;
  return b
}();
cljs.core.replace = function(a, b) {
  if(cljs.core.vector_QMARK_.call(null, b)) {
    var c = cljs.core.count.call(null, b);
    return cljs.core.reduce.call(null, function(b, c) {
      var f = cljs.core.find.call(null, a, cljs.core.nth.call(null, b, c));
      return cljs.core.truth_(f) ? cljs.core.assoc.call(null, b, c, cljs.core.second.call(null, f)) : b
    }, b, cljs.core.take.call(null, c, cljs.core.iterate.call(null, cljs.core.inc, 0)))
  }
  return cljs.core.map.call(null, function(b) {
    var c = cljs.core.find.call(null, a, b);
    return cljs.core.truth_(c) ? cljs.core.second.call(null, c) : b
  }, b)
};
cljs.core.distinct = function(a) {
  return function c(a, e) {
    return new cljs.core.LazySeq(null, function() {
      return function(a, d) {
        for(;;) {
          var e = a, l = cljs.core.nth.call(null, e, 0, null);
          if(e = cljs.core.seq.call(null, e)) {
            if(cljs.core.contains_QMARK_.call(null, d, l)) {
              l = cljs.core.rest.call(null, e), e = d, a = l, d = e
            }else {
              return cljs.core.cons.call(null, l, c.call(null, cljs.core.rest.call(null, e), cljs.core.conj.call(null, d, l)))
            }
          }else {
            return null
          }
        }
      }.call(null, a, e)
    }, null, null)
  }.call(null, a, cljs.core.PersistentHashSet.EMPTY)
};
cljs.core.butlast = function(a) {
  for(var b = cljs.core.PersistentVector.EMPTY;;) {
    if(cljs.core.next.call(null, a)) {
      b = cljs.core.conj.call(null, b, cljs.core.first.call(null, a)), a = cljs.core.next.call(null, a)
    }else {
      return cljs.core.seq.call(null, b)
    }
  }
};
cljs.core.name = function(a) {
  if(a && (a.cljs$lang$protocol_mask$partition1$ & 4096 || a.cljs$core$INamed$)) {
    return cljs.core._name.call(null, a)
  }
  if("string" === typeof a) {
    return a
  }
  throw Error([cljs.core.str("Doesn't support name: "), cljs.core.str(a)].join(""));
};
cljs.core.zipmap = function(a, b) {
  for(var c = cljs.core.transient$.call(null, cljs.core.PersistentArrayMap.EMPTY), d = cljs.core.seq.call(null, a), e = cljs.core.seq.call(null, b);;) {
    if(d && e) {
      c = cljs.core.assoc_BANG_.call(null, c, cljs.core.first.call(null, d), cljs.core.first.call(null, e)), d = cljs.core.next.call(null, d), e = cljs.core.next.call(null, e)
    }else {
      return cljs.core.persistent_BANG_.call(null, c)
    }
  }
};
cljs.core.max_key = function() {
  var a = null, b = function(a, b, c) {
    return a.call(null, b) > a.call(null, c) ? b : c
  }, c = function() {
    var b = function(b, c, d, e) {
      return cljs.core.reduce.call(null, function(c, d) {
        return a.call(null, b, c, d)
      }, a.call(null, b, c, d), e)
    }, c = function(a, c, e, l) {
      var m = null;
      3 < arguments.length && (m = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3), 0));
      return b.call(this, a, c, e, m)
    };
    c.cljs$lang$maxFixedArity = 3;
    c.cljs$lang$applyTo = function(a) {
      var c = cljs.core.first(a);
      a = cljs.core.next(a);
      var e = cljs.core.first(a);
      a = cljs.core.next(a);
      var l = cljs.core.first(a);
      a = cljs.core.rest(a);
      return b(c, e, l, a)
    };
    c.cljs$core$IFn$_invoke$arity$variadic = b;
    return c
  }(), a = function(a, e, f, g) {
    switch(arguments.length) {
      case 2:
        return e;
      case 3:
        return b.call(this, a, e, f);
      default:
        return c.cljs$core$IFn$_invoke$arity$variadic(a, e, f, cljs.core.array_seq(arguments, 3))
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$lang$maxFixedArity = 3;
  a.cljs$lang$applyTo = c.cljs$lang$applyTo;
  a.cljs$core$IFn$_invoke$arity$2 = function(a, b) {
    return b
  };
  a.cljs$core$IFn$_invoke$arity$3 = b;
  a.cljs$core$IFn$_invoke$arity$variadic = c.cljs$core$IFn$_invoke$arity$variadic;
  return a
}();
cljs.core.min_key = function() {
  var a = null, b = function(a, b, c) {
    return a.call(null, b) < a.call(null, c) ? b : c
  }, c = function() {
    var b = function(b, c, d, e) {
      return cljs.core.reduce.call(null, function(c, d) {
        return a.call(null, b, c, d)
      }, a.call(null, b, c, d), e)
    }, c = function(a, c, e, l) {
      var m = null;
      3 < arguments.length && (m = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3), 0));
      return b.call(this, a, c, e, m)
    };
    c.cljs$lang$maxFixedArity = 3;
    c.cljs$lang$applyTo = function(a) {
      var c = cljs.core.first(a);
      a = cljs.core.next(a);
      var e = cljs.core.first(a);
      a = cljs.core.next(a);
      var l = cljs.core.first(a);
      a = cljs.core.rest(a);
      return b(c, e, l, a)
    };
    c.cljs$core$IFn$_invoke$arity$variadic = b;
    return c
  }(), a = function(a, e, f, g) {
    switch(arguments.length) {
      case 2:
        return e;
      case 3:
        return b.call(this, a, e, f);
      default:
        return c.cljs$core$IFn$_invoke$arity$variadic(a, e, f, cljs.core.array_seq(arguments, 3))
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$lang$maxFixedArity = 3;
  a.cljs$lang$applyTo = c.cljs$lang$applyTo;
  a.cljs$core$IFn$_invoke$arity$2 = function(a, b) {
    return b
  };
  a.cljs$core$IFn$_invoke$arity$3 = b;
  a.cljs$core$IFn$_invoke$arity$variadic = c.cljs$core$IFn$_invoke$arity$variadic;
  return a
}();
cljs.core.partition_all = function() {
  var a = null, b = function(b, c) {
    return a.call(null, b, b, c)
  }, c = function(b, c, f) {
    return new cljs.core.LazySeq(null, function() {
      var g = cljs.core.seq.call(null, f);
      return g ? cljs.core.cons.call(null, cljs.core.take.call(null, b, g), a.call(null, b, c, cljs.core.drop.call(null, c, g))) : null
    }, null, null)
  }, a = function(a, e, f) {
    switch(arguments.length) {
      case 2:
        return b.call(this, a, e);
      case 3:
        return c.call(this, a, e, f)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$core$IFn$_invoke$arity$2 = b;
  a.cljs$core$IFn$_invoke$arity$3 = c;
  return a
}();
cljs.core.take_while = function take_while(b, c) {
  return new cljs.core.LazySeq(null, function() {
    var d = cljs.core.seq.call(null, c);
    return d ? cljs.core.truth_(b.call(null, cljs.core.first.call(null, d))) ? cljs.core.cons.call(null, cljs.core.first.call(null, d), take_while.call(null, b, cljs.core.rest.call(null, d))) : null : null
  }, null, null)
};
cljs.core.mk_bound_fn = function(a, b, c) {
  return function(d) {
    var e = cljs.core._comparator.call(null, a);
    return b.call(null, e.call(null, cljs.core._entry_key.call(null, a, d), c), 0)
  }
};
cljs.core.subseq = function() {
  var a = null, b = function(a, b, c) {
    var g = cljs.core.mk_bound_fn.call(null, a, b, c);
    return cljs.core.truth_(cljs.core.PersistentHashSet.fromArray([cljs.core._GT_, null, cljs.core._GT__EQ_, null], !0).call(null, b)) ? (a = cljs.core._sorted_seq_from.call(null, a, c, !0), cljs.core.truth_(a) ? (b = cljs.core.nth.call(null, a, 0, null), cljs.core.truth_(g.call(null, b)) ? a : cljs.core.next.call(null, a)) : null) : cljs.core.take_while.call(null, g, cljs.core._sorted_seq.call(null, a, !0))
  }, c = function(a, b, c, g, h) {
    var l = cljs.core._sorted_seq_from.call(null, a, c, !0);
    if(cljs.core.truth_(l)) {
      var m = cljs.core.nth.call(null, l, 0, null);
      return cljs.core.take_while.call(null, cljs.core.mk_bound_fn.call(null, a, g, h), cljs.core.truth_(cljs.core.mk_bound_fn.call(null, a, b, c).call(null, m)) ? l : cljs.core.next.call(null, l))
    }
    return null
  }, a = function(a, e, f, g, h) {
    switch(arguments.length) {
      case 3:
        return b.call(this, a, e, f);
      case 5:
        return c.call(this, a, e, f, g, h)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$core$IFn$_invoke$arity$3 = b;
  a.cljs$core$IFn$_invoke$arity$5 = c;
  return a
}();
cljs.core.rsubseq = function() {
  var a = null, b = function(a, b, c) {
    var g = cljs.core.mk_bound_fn.call(null, a, b, c);
    return cljs.core.truth_(cljs.core.PersistentHashSet.fromArray([cljs.core._LT_, null, cljs.core._LT__EQ_, null], !0).call(null, b)) ? (a = cljs.core._sorted_seq_from.call(null, a, c, !1), cljs.core.truth_(a) ? (b = cljs.core.nth.call(null, a, 0, null), cljs.core.truth_(g.call(null, b)) ? a : cljs.core.next.call(null, a)) : null) : cljs.core.take_while.call(null, g, cljs.core._sorted_seq.call(null, a, !1))
  }, c = function(a, b, c, g, h) {
    var l = cljs.core._sorted_seq_from.call(null, a, h, !1);
    if(cljs.core.truth_(l)) {
      var m = cljs.core.nth.call(null, l, 0, null);
      return cljs.core.take_while.call(null, cljs.core.mk_bound_fn.call(null, a, b, c), cljs.core.truth_(cljs.core.mk_bound_fn.call(null, a, g, h).call(null, m)) ? l : cljs.core.next.call(null, l))
    }
    return null
  }, a = function(a, e, f, g, h) {
    switch(arguments.length) {
      case 3:
        return b.call(this, a, e, f);
      case 5:
        return c.call(this, a, e, f, g, h)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$core$IFn$_invoke$arity$3 = b;
  a.cljs$core$IFn$_invoke$arity$5 = c;
  return a
}();
cljs.core.Range = function(a, b, c, d, e) {
  this.meta = a;
  this.start = b;
  this.end = c;
  this.step = d;
  this.__hash = e;
  this.cljs$lang$protocol_mask$partition1$ = 0;
  this.cljs$lang$protocol_mask$partition0$ = 32375006
};
cljs.core.Range.cljs$lang$type = !0;
cljs.core.Range.cljs$lang$ctorStr = "cljs.core/Range";
cljs.core.Range.cljs$lang$ctorPrWriter = function(a, b, c) {
  return cljs.core._write.call(null, b, "cljs.core/Range")
};
cljs.core.Range.prototype.cljs$core$IHash$_hash$arity$1 = function(a) {
  a = this.__hash;
  return null != a ? a : this.__hash = a = cljs.core.hash_coll.call(null, this)
};
cljs.core.Range.prototype.cljs$core$INext$_next$arity$1 = function(a) {
  return 0 < this.step ? this.start + this.step < this.end ? new cljs.core.Range(this.meta, this.start + this.step, this.end, this.step, null) : null : this.start + this.step > this.end ? new cljs.core.Range(this.meta, this.start + this.step, this.end, this.step, null) : null
};
cljs.core.Range.prototype.cljs$core$ICollection$_conj$arity$2 = function(a, b) {
  return cljs.core.cons.call(null, b, this)
};
cljs.core.Range.prototype.toString = function() {
  return cljs.core.pr_str_STAR_.call(null, this)
};
cljs.core.Range.prototype.cljs$core$IReduce$_reduce$arity$2 = function(a, b) {
  return cljs.core.ci_reduce.call(null, this, b)
};
cljs.core.Range.prototype.cljs$core$IReduce$_reduce$arity$3 = function(a, b, c) {
  return cljs.core.ci_reduce.call(null, this, b, c)
};
cljs.core.Range.prototype.cljs$core$ISeqable$_seq$arity$1 = function(a) {
  return 0 < this.step ? this.start < this.end ? this : null : this.start > this.end ? this : null
};
cljs.core.Range.prototype.cljs$core$ICounted$_count$arity$1 = function(a) {
  return cljs.core.not.call(null, cljs.core._seq.call(null, this)) ? 0 : Math.ceil((this.end - this.start) / this.step)
};
cljs.core.Range.prototype.cljs$core$ISeq$_first$arity$1 = function(a) {
  return this.start
};
cljs.core.Range.prototype.cljs$core$ISeq$_rest$arity$1 = function(a) {
  return null != cljs.core._seq.call(null, this) ? new cljs.core.Range(this.meta, this.start + this.step, this.end, this.step, null) : cljs.core.List.EMPTY
};
cljs.core.Range.prototype.cljs$core$IEquiv$_equiv$arity$2 = function(a, b) {
  return cljs.core.equiv_sequential.call(null, this, b)
};
cljs.core.Range.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = function(a, b) {
  return new cljs.core.Range(b, this.start, this.end, this.step, this.__hash)
};
cljs.core.Range.prototype.cljs$core$IMeta$_meta$arity$1 = function(a) {
  return this.meta
};
cljs.core.Range.prototype.cljs$core$IIndexed$_nth$arity$2 = function(a, b) {
  if(b < cljs.core._count.call(null, this)) {
    return this.start + b * this.step
  }
  if(this.start > this.end && 0 === this.step) {
    return this.start
  }
  throw Error("Index out of bounds");
};
cljs.core.Range.prototype.cljs$core$IIndexed$_nth$arity$3 = function(a, b, c) {
  return b < cljs.core._count.call(null, this) ? this.start + b * this.step : this.start > this.end && 0 === this.step ? this.start : c
};
cljs.core.Range.prototype.cljs$core$IEmptyableCollection$_empty$arity$1 = function(a) {
  return cljs.core.with_meta.call(null, cljs.core.List.EMPTY, this.meta)
};
cljs.core.__GT_Range = function(a, b, c, d, e) {
  return new cljs.core.Range(a, b, c, d, e)
};
cljs.core.range = function() {
  var a = null, b = function() {
    return a.call(null, 0, Number.MAX_VALUE, 1)
  }, c = function(b) {
    return a.call(null, 0, b, 1)
  }, d = function(b, c) {
    return a.call(null, b, c, 1)
  }, e = function(a, b, c) {
    return new cljs.core.Range(null, a, b, c, null)
  }, a = function(a, g, h) {
    switch(arguments.length) {
      case 0:
        return b.call(this);
      case 1:
        return c.call(this, a);
      case 2:
        return d.call(this, a, g);
      case 3:
        return e.call(this, a, g, h)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$core$IFn$_invoke$arity$0 = b;
  a.cljs$core$IFn$_invoke$arity$1 = c;
  a.cljs$core$IFn$_invoke$arity$2 = d;
  a.cljs$core$IFn$_invoke$arity$3 = e;
  return a
}();
cljs.core.take_nth = function take_nth(b, c) {
  return new cljs.core.LazySeq(null, function() {
    var d = cljs.core.seq.call(null, c);
    return d ? cljs.core.cons.call(null, cljs.core.first.call(null, d), take_nth.call(null, b, cljs.core.drop.call(null, b, d))) : null
  }, null, null)
};
cljs.core.split_with = function(a, b) {
  return cljs.core.PersistentVector.fromArray([cljs.core.take_while.call(null, a, b), cljs.core.drop_while.call(null, a, b)], !0)
};
cljs.core.partition_by = function partition_by(b, c) {
  return new cljs.core.LazySeq(null, function() {
    var d = cljs.core.seq.call(null, c);
    if(d) {
      var e = cljs.core.first.call(null, d), f = b.call(null, e), e = cljs.core.cons.call(null, e, cljs.core.take_while.call(null, function(c, d) {
        return function(c) {
          return cljs.core._EQ_.call(null, d, b.call(null, c))
        }
      }(e, f), cljs.core.next.call(null, d)));
      return cljs.core.cons.call(null, e, partition_by.call(null, b, cljs.core.seq.call(null, cljs.core.drop.call(null, cljs.core.count.call(null, e), d))))
    }
    return null
  }, null, null)
};
cljs.core.frequencies = function(a) {
  return cljs.core.persistent_BANG_.call(null, cljs.core.reduce.call(null, function(a, c) {
    return cljs.core.assoc_BANG_.call(null, a, c, cljs.core.get.call(null, a, c, 0) + 1)
  }, cljs.core.transient$.call(null, cljs.core.PersistentArrayMap.EMPTY), a))
};
cljs.core.reductions = function() {
  var a = null, b = function(b, c) {
    return new cljs.core.LazySeq(null, function() {
      var f = cljs.core.seq.call(null, c);
      return f ? a.call(null, b, cljs.core.first.call(null, f), cljs.core.rest.call(null, f)) : cljs.core._conj.call(null, cljs.core.List.EMPTY, b.call(null))
    }, null, null)
  }, c = function(b, c, f) {
    return cljs.core.cons.call(null, c, new cljs.core.LazySeq(null, function() {
      var g = cljs.core.seq.call(null, f);
      return g ? a.call(null, b, b.call(null, c, cljs.core.first.call(null, g)), cljs.core.rest.call(null, g)) : null
    }, null, null))
  }, a = function(a, e, f) {
    switch(arguments.length) {
      case 2:
        return b.call(this, a, e);
      case 3:
        return c.call(this, a, e, f)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$core$IFn$_invoke$arity$2 = b;
  a.cljs$core$IFn$_invoke$arity$3 = c;
  return a
}();
cljs.core.juxt = function() {
  var a = null, b = function(a) {
    return function() {
      var b = null, c = function() {
        var b = function(b, c, d, e) {
          return cljs.core.PersistentVector.fromArray.call(null, [cljs.core.apply.call(null, a, b, c, d, e)], !0)
        }, c = function(a, c, d, e) {
          var f = null;
          3 < arguments.length && (f = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3), 0));
          return b.call(this, a, c, d, f)
        };
        c.cljs$lang$maxFixedArity = 3;
        c.cljs$lang$applyTo = function(a) {
          var c = cljs.core.first(a);
          a = cljs.core.next(a);
          var d = cljs.core.first(a);
          a = cljs.core.next(a);
          var e = cljs.core.first(a);
          a = cljs.core.rest(a);
          return b(c, d, e, a)
        };
        c.cljs$core$IFn$_invoke$arity$variadic = b;
        return c
      }(), b = function(b, d, e, g) {
        switch(arguments.length) {
          case 0:
            return cljs.core.PersistentVector.fromArray.call(null, [a.call(null)], !0);
          case 1:
            return cljs.core.PersistentVector.fromArray.call(null, [a.call(null, b)], !0);
          case 2:
            return cljs.core.PersistentVector.fromArray.call(null, [a.call(null, b, d)], !0);
          case 3:
            return cljs.core.PersistentVector.fromArray.call(null, [a.call(null, b, d, e)], !0);
          default:
            return c.cljs$core$IFn$_invoke$arity$variadic(b, d, e, cljs.core.array_seq(arguments, 3))
        }
        throw Error("Invalid arity: " + arguments.length);
      };
      b.cljs$lang$maxFixedArity = 3;
      b.cljs$lang$applyTo = c.cljs$lang$applyTo;
      return b
    }()
  }, c = function(a, b) {
    return function() {
      var c = null, d = function() {
        var c = function(c, d, e, k) {
          return cljs.core.PersistentVector.fromArray.call(null, [cljs.core.apply.call(null, a, c, d, e, k), cljs.core.apply.call(null, b, c, d, e, k)], !0)
        }, d = function(a, b, d, e) {
          var f = null;
          3 < arguments.length && (f = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3), 0));
          return c.call(this, a, b, d, f)
        };
        d.cljs$lang$maxFixedArity = 3;
        d.cljs$lang$applyTo = function(a) {
          var b = cljs.core.first(a);
          a = cljs.core.next(a);
          var d = cljs.core.first(a);
          a = cljs.core.next(a);
          var e = cljs.core.first(a);
          a = cljs.core.rest(a);
          return c(b, d, e, a)
        };
        d.cljs$core$IFn$_invoke$arity$variadic = c;
        return d
      }(), c = function(c, e, h, p) {
        switch(arguments.length) {
          case 0:
            return cljs.core.PersistentVector.fromArray.call(null, [a.call(null), b.call(null)], !0);
          case 1:
            return cljs.core.PersistentVector.fromArray.call(null, [a.call(null, c), b.call(null, c)], !0);
          case 2:
            return cljs.core.PersistentVector.fromArray.call(null, [a.call(null, c, e), b.call(null, c, e)], !0);
          case 3:
            return cljs.core.PersistentVector.fromArray.call(null, [a.call(null, c, e, h), b.call(null, c, e, h)], !0);
          default:
            return d.cljs$core$IFn$_invoke$arity$variadic(c, e, h, cljs.core.array_seq(arguments, 3))
        }
        throw Error("Invalid arity: " + arguments.length);
      };
      c.cljs$lang$maxFixedArity = 3;
      c.cljs$lang$applyTo = d.cljs$lang$applyTo;
      return c
    }()
  }, d = function(a, b, c) {
    return function() {
      var d = null, e = function() {
        var d = function(d, e, k, n) {
          return cljs.core.PersistentVector.fromArray.call(null, [cljs.core.apply.call(null, a, d, e, k, n), cljs.core.apply.call(null, b, d, e, k, n), cljs.core.apply.call(null, c, d, e, k, n)], !0)
        }, e = function(a, b, c, e) {
          var f = null;
          3 < arguments.length && (f = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3), 0));
          return d.call(this, a, b, c, f)
        };
        e.cljs$lang$maxFixedArity = 3;
        e.cljs$lang$applyTo = function(a) {
          var b = cljs.core.first(a);
          a = cljs.core.next(a);
          var c = cljs.core.first(a);
          a = cljs.core.next(a);
          var e = cljs.core.first(a);
          a = cljs.core.rest(a);
          return d(b, c, e, a)
        };
        e.cljs$core$IFn$_invoke$arity$variadic = d;
        return e
      }(), d = function(d, n, l, s) {
        switch(arguments.length) {
          case 0:
            return cljs.core.PersistentVector.fromArray.call(null, [a.call(null), b.call(null), c.call(null)], !0);
          case 1:
            return cljs.core.PersistentVector.fromArray.call(null, [a.call(null, d), b.call(null, d), c.call(null, d)], !0);
          case 2:
            return cljs.core.PersistentVector.fromArray.call(null, [a.call(null, d, n), b.call(null, d, n), c.call(null, d, n)], !0);
          case 3:
            return cljs.core.PersistentVector.fromArray.call(null, [a.call(null, d, n, l), b.call(null, d, n, l), c.call(null, d, n, l)], !0);
          default:
            return e.cljs$core$IFn$_invoke$arity$variadic(d, n, l, cljs.core.array_seq(arguments, 3))
        }
        throw Error("Invalid arity: " + arguments.length);
      };
      d.cljs$lang$maxFixedArity = 3;
      d.cljs$lang$applyTo = e.cljs$lang$applyTo;
      return d
    }()
  }, e = function() {
    var a = function(a, b, c, d) {
      var e = cljs.core.list_STAR_.call(null, a, b, c, d);
      return function() {
        var a = null, b = function() {
          return cljs.core.reduce.call(null, function(a, b) {
            return cljs.core.conj.call(null, a, b.call(null))
          }, cljs.core.PersistentVector.EMPTY, e)
        }, c = function(a) {
          return cljs.core.reduce.call(null, function(b, c) {
            return cljs.core.conj.call(null, b, c.call(null, a))
          }, cljs.core.PersistentVector.EMPTY, e)
        }, d = function(a, b) {
          return cljs.core.reduce.call(null, function(c, d) {
            return cljs.core.conj.call(null, c, d.call(null, a, b))
          }, cljs.core.PersistentVector.EMPTY, e)
        }, f = function(a, b, c) {
          return cljs.core.reduce.call(null, function(d, e) {
            return cljs.core.conj.call(null, d, e.call(null, a, b, c))
          }, cljs.core.PersistentVector.EMPTY, e)
        }, g = function() {
          var a = function(a, b, c, d) {
            return cljs.core.reduce.call(null, function(e, f) {
              return cljs.core.conj.call(null, e, cljs.core.apply.call(null, f, a, b, c, d))
            }, cljs.core.PersistentVector.EMPTY, e)
          }, b = function(b, c, d, e) {
            var f = null;
            3 < arguments.length && (f = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3), 0));
            return a.call(this, b, c, d, f)
          };
          b.cljs$lang$maxFixedArity = 3;
          b.cljs$lang$applyTo = function(b) {
            var c = cljs.core.first(b);
            b = cljs.core.next(b);
            var d = cljs.core.first(b);
            b = cljs.core.next(b);
            var e = cljs.core.first(b);
            b = cljs.core.rest(b);
            return a(c, d, e, b)
          };
          b.cljs$core$IFn$_invoke$arity$variadic = a;
          return b
        }(), a = function(a, e, k, h) {
          switch(arguments.length) {
            case 0:
              return b.call(this);
            case 1:
              return c.call(this, a);
            case 2:
              return d.call(this, a, e);
            case 3:
              return f.call(this, a, e, k);
            default:
              return g.cljs$core$IFn$_invoke$arity$variadic(a, e, k, cljs.core.array_seq(arguments, 3))
          }
          throw Error("Invalid arity: " + arguments.length);
        };
        a.cljs$lang$maxFixedArity = 3;
        a.cljs$lang$applyTo = g.cljs$lang$applyTo;
        return a
      }()
    }, b = function(b, c, d, e) {
      var g = null;
      3 < arguments.length && (g = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3), 0));
      return a.call(this, b, c, d, g)
    };
    b.cljs$lang$maxFixedArity = 3;
    b.cljs$lang$applyTo = function(b) {
      var c = cljs.core.first(b);
      b = cljs.core.next(b);
      var d = cljs.core.first(b);
      b = cljs.core.next(b);
      var e = cljs.core.first(b);
      b = cljs.core.rest(b);
      return a(c, d, e, b)
    };
    b.cljs$core$IFn$_invoke$arity$variadic = a;
    return b
  }(), a = function(a, g, h, l) {
    switch(arguments.length) {
      case 1:
        return b.call(this, a);
      case 2:
        return c.call(this, a, g);
      case 3:
        return d.call(this, a, g, h);
      default:
        return e.cljs$core$IFn$_invoke$arity$variadic(a, g, h, cljs.core.array_seq(arguments, 3))
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$lang$maxFixedArity = 3;
  a.cljs$lang$applyTo = e.cljs$lang$applyTo;
  a.cljs$core$IFn$_invoke$arity$1 = b;
  a.cljs$core$IFn$_invoke$arity$2 = c;
  a.cljs$core$IFn$_invoke$arity$3 = d;
  a.cljs$core$IFn$_invoke$arity$variadic = e.cljs$core$IFn$_invoke$arity$variadic;
  return a
}();
cljs.core.dorun = function() {
  var a = null, b = function(a) {
    for(;;) {
      if(cljs.core.seq.call(null, a)) {
        a = cljs.core.next.call(null, a)
      }else {
        return null
      }
    }
  }, c = function(a, b) {
    for(;;) {
      if(cljs.core.seq.call(null, b) && 0 < a) {
        var c = a - 1, g = cljs.core.next.call(null, b);
        a = c;
        b = g
      }else {
        return null
      }
    }
  }, a = function(a, e) {
    switch(arguments.length) {
      case 1:
        return b.call(this, a);
      case 2:
        return c.call(this, a, e)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$core$IFn$_invoke$arity$1 = b;
  a.cljs$core$IFn$_invoke$arity$2 = c;
  return a
}();
cljs.core.doall = function() {
  var a = null, b = function(a) {
    cljs.core.dorun.call(null, a);
    return a
  }, c = function(a, b) {
    cljs.core.dorun.call(null, a, b);
    return b
  }, a = function(a, e) {
    switch(arguments.length) {
      case 1:
        return b.call(this, a);
      case 2:
        return c.call(this, a, e)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$core$IFn$_invoke$arity$1 = b;
  a.cljs$core$IFn$_invoke$arity$2 = c;
  return a
}();
cljs.core.regexp_QMARK_ = function(a) {
  return a instanceof RegExp
};
cljs.core.re_matches = function(a, b) {
  var c = a.exec(b);
  return cljs.core._EQ_.call(null, cljs.core.first.call(null, c), b) ? 1 === cljs.core.count.call(null, c) ? cljs.core.first.call(null, c) : cljs.core.vec.call(null, c) : null
};
cljs.core.re_find = function(a, b) {
  var c = a.exec(b);
  return null == c ? null : 1 === cljs.core.count.call(null, c) ? cljs.core.first.call(null, c) : cljs.core.vec.call(null, c)
};
cljs.core.re_seq = function re_seq(b, c) {
  var d = cljs.core.re_find.call(null, b, c), e = c.search(b), f = cljs.core.coll_QMARK_.call(null, d) ? cljs.core.first.call(null, d) : d, g = cljs.core.subs.call(null, c, e + cljs.core.count.call(null, f));
  return cljs.core.truth_(d) ? new cljs.core.LazySeq(null, function() {
    return cljs.core.cons.call(null, d, cljs.core.seq.call(null, g) ? re_seq.call(null, b, g) : null)
  }, null, null) : null
};
cljs.core.re_pattern = function(a) {
  var b = cljs.core.re_find.call(null, /^(?:\(\?([idmsux]*)\))?(.*)/, a);
  cljs.core.nth.call(null, b, 0, null);
  a = cljs.core.nth.call(null, b, 1, null);
  b = cljs.core.nth.call(null, b, 2, null);
  return RegExp(b, a)
};
cljs.core.pr_sequential_writer = function(a, b, c, d, e, f, g) {
  cljs.core._write.call(null, a, c);
  cljs.core.seq.call(null, g) && b.call(null, cljs.core.first.call(null, g), a, f);
  c = cljs.core.seq.call(null, cljs.core.next.call(null, g));
  g = null;
  for(var h = 0, l = 0;;) {
    if(l < h) {
      var m = cljs.core._nth.call(null, g, l);
      cljs.core._write.call(null, a, d);
      b.call(null, m, a, f);
      l += 1
    }else {
      if(c = cljs.core.seq.call(null, c)) {
        g = c, cljs.core.chunked_seq_QMARK_.call(null, g) ? (c = cljs.core.chunk_first.call(null, g), l = cljs.core.chunk_rest.call(null, g), g = c, h = cljs.core.count.call(null, c), c = l) : (c = cljs.core.first.call(null, g), cljs.core._write.call(null, a, d), b.call(null, c, a, f), c = cljs.core.next.call(null, g), g = null, h = 0), l = 0
      }else {
        break
      }
    }
  }
  return cljs.core._write.call(null, a, e)
};
cljs.core.write_all = function() {
  var a = function(a, b) {
    for(var e = cljs.core.seq.call(null, b), f = null, g = 0, h = 0;;) {
      if(h < g) {
        var l = cljs.core._nth.call(null, f, h);
        cljs.core._write.call(null, a, l);
        h += 1
      }else {
        if(e = cljs.core.seq.call(null, e)) {
          f = e, cljs.core.chunked_seq_QMARK_.call(null, f) ? (e = cljs.core.chunk_first.call(null, f), g = cljs.core.chunk_rest.call(null, f), f = e, l = cljs.core.count.call(null, e), e = g, g = l) : (l = cljs.core.first.call(null, f), cljs.core._write.call(null, a, l), e = cljs.core.next.call(null, f), f = null, g = 0), h = 0
        }else {
          return null
        }
      }
    }
  }, b = function(b, d) {
    var e = null;
    1 < arguments.length && (e = cljs.core.array_seq(Array.prototype.slice.call(arguments, 1), 0));
    return a.call(this, b, e)
  };
  b.cljs$lang$maxFixedArity = 1;
  b.cljs$lang$applyTo = function(b) {
    var d = cljs.core.first(b);
    b = cljs.core.rest(b);
    return a(d, b)
  };
  b.cljs$core$IFn$_invoke$arity$variadic = a;
  return b
}();
cljs.core.string_print = function(a) {
  cljs.core._STAR_print_fn_STAR_.call(null, a);
  return null
};
cljs.core.flush = function() {
  return null
};
cljs.core.char_escapes = {'"':'\\"', "\\":"\\\\", "\b":"\\b", "\f":"\\f", "\n":"\\n", "\r":"\\r", "\t":"\\t"};
cljs.core.quote_string = function(a) {
  return[cljs.core.str('"'), cljs.core.str(a.replace(RegExp('[\\\\"\b\f\n\r\t]', "g"), function(a) {
    return cljs.core.char_escapes[a]
  })), cljs.core.str('"')].join("")
};
cljs.core.pr_writer = function pr_writer(b, c, d) {
  if(null == b) {
    return cljs.core._write.call(null, c, "nil")
  }
  if(void 0 === b) {
    return cljs.core._write.call(null, c, "#\x3cundefined\x3e")
  }
  if(new cljs.core.Keyword(null, "else", "else", 1017020587)) {
    cljs.core.truth_(function() {
      var c = cljs.core.get.call(null, d, new cljs.core.Keyword(null, "meta", "meta", 1017252215));
      return cljs.core.truth_(c) ? (c = b ? b.cljs$lang$protocol_mask$partition0$ & 131072 || b.cljs$core$IMeta$ ? !0 : b.cljs$lang$protocol_mask$partition0$ ? !1 : cljs.core.native_satisfies_QMARK_.call(null, cljs.core.IMeta, b) : cljs.core.native_satisfies_QMARK_.call(null, cljs.core.IMeta, b)) ? cljs.core.meta.call(null, b) : c : c
    }()) && (cljs.core._write.call(null, c, "^"), pr_writer.call(null, cljs.core.meta.call(null, b), c, d), cljs.core._write.call(null, c, " "));
    if(null == b) {
      return cljs.core._write.call(null, c, "nil")
    }
    if(b.cljs$lang$type) {
      return b.cljs$lang$ctorPrWriter(b, c, d)
    }
    if(b && (b.cljs$lang$protocol_mask$partition0$ & 2147483648 || b.cljs$core$IPrintWithWriter$)) {
      return cljs.core._pr_writer.call(null, b, c, d)
    }
    if(cljs.core.type.call(null, b) === Boolean || "number" === typeof b) {
      return cljs.core._write.call(null, c, "" + cljs.core.str(b))
    }
    if(b instanceof Array) {
      return cljs.core.pr_sequential_writer.call(null, c, pr_writer, "#\x3cArray [", ", ", "]\x3e", d, b)
    }
    if(goog.isString(b)) {
      return cljs.core.truth_((new cljs.core.Keyword(null, "readably", "readably", 4441712502)).cljs$core$IFn$_invoke$arity$1(d)) ? cljs.core._write.call(null, c, cljs.core.quote_string.call(null, b)) : cljs.core._write.call(null, c, b)
    }
    if(cljs.core.fn_QMARK_.call(null, b)) {
      return cljs.core.write_all.call(null, c, "#\x3c", "" + cljs.core.str(b), "\x3e")
    }
    if(b instanceof Date) {
      var e = function(b, c) {
        for(var d = "" + cljs.core.str(b);;) {
          if(cljs.core.count.call(null, d) < c) {
            d = [cljs.core.str("0"), cljs.core.str(d)].join("")
          }else {
            return d
          }
        }
      };
      return cljs.core.write_all.call(null, c, '#inst "', "" + cljs.core.str(b.getUTCFullYear()), "-", e.call(null, b.getUTCMonth() + 1, 2), "-", e.call(null, b.getUTCDate(), 2), "T", e.call(null, b.getUTCHours(), 2), ":", e.call(null, b.getUTCMinutes(), 2), ":", e.call(null, b.getUTCSeconds(), 2), ".", e.call(null, b.getUTCMilliseconds(), 3), "-", '00:00"')
    }
    return cljs.core.truth_(cljs.core.regexp_QMARK_.call(null, b)) ? cljs.core.write_all.call(null, c, '#"', b.source, '"') : (b ? b.cljs$lang$protocol_mask$partition0$ & 2147483648 || b.cljs$core$IPrintWithWriter$ || (b.cljs$lang$protocol_mask$partition0$ ? 0 : cljs.core.native_satisfies_QMARK_.call(null, cljs.core.IPrintWithWriter, b)) : cljs.core.native_satisfies_QMARK_.call(null, cljs.core.IPrintWithWriter, b)) ? cljs.core._pr_writer.call(null, b, c, d) : new cljs.core.Keyword(null, "else", "else", 
    1017020587) ? cljs.core.write_all.call(null, c, "#\x3c", "" + cljs.core.str(b), "\x3e") : null
  }
  return null
};
cljs.core.pr_seq_writer = function(a, b, c) {
  cljs.core.pr_writer.call(null, cljs.core.first.call(null, a), b, c);
  a = cljs.core.seq.call(null, cljs.core.next.call(null, a));
  for(var d = null, e = 0, f = 0;;) {
    if(f < e) {
      var g = cljs.core._nth.call(null, d, f);
      cljs.core._write.call(null, b, " ");
      cljs.core.pr_writer.call(null, g, b, c);
      f += 1
    }else {
      if(a = cljs.core.seq.call(null, a)) {
        d = a, cljs.core.chunked_seq_QMARK_.call(null, d) ? (a = cljs.core.chunk_first.call(null, d), e = cljs.core.chunk_rest.call(null, d), d = a, g = cljs.core.count.call(null, a), a = e, e = g) : (g = cljs.core.first.call(null, d), cljs.core._write.call(null, b, " "), cljs.core.pr_writer.call(null, g, b, c), a = cljs.core.next.call(null, d), d = null, e = 0), f = 0
      }else {
        return null
      }
    }
  }
};
cljs.core.pr_sb_with_opts = function(a, b) {
  var c = new goog.string.StringBuffer, d = new cljs.core.StringBufferWriter(c);
  cljs.core.pr_seq_writer.call(null, a, d, b);
  cljs.core._flush.call(null, d);
  return c
};
cljs.core.pr_str_with_opts = function(a, b) {
  return cljs.core.empty_QMARK_.call(null, a) ? "" : "" + cljs.core.str(cljs.core.pr_sb_with_opts.call(null, a, b))
};
cljs.core.prn_str_with_opts = function(a, b) {
  if(cljs.core.empty_QMARK_.call(null, a)) {
    return"\n"
  }
  var c = cljs.core.pr_sb_with_opts.call(null, a, b);
  c.append("\n");
  return"" + cljs.core.str(c)
};
cljs.core.pr_with_opts = function(a, b) {
  return cljs.core.string_print.call(null, cljs.core.pr_str_with_opts.call(null, a, b))
};
cljs.core.newline = function(a) {
  cljs.core.string_print.call(null, "\n");
  return cljs.core.truth_(cljs.core.get.call(null, a, new cljs.core.Keyword(null, "flush-on-newline", "flush-on-newline", 4338025857))) ? cljs.core.flush.call(null) : null
};
cljs.core.pr_str = function() {
  var a = function(a) {
    return cljs.core.pr_str_with_opts.call(null, a, cljs.core.pr_opts.call(null))
  }, b = function(b) {
    var d = null;
    0 < arguments.length && (d = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0), 0));
    return a.call(this, d)
  };
  b.cljs$lang$maxFixedArity = 0;
  b.cljs$lang$applyTo = function(b) {
    b = cljs.core.seq(b);
    return a(b)
  };
  b.cljs$core$IFn$_invoke$arity$variadic = a;
  return b
}();
cljs.core.prn_str = function() {
  var a = function(a) {
    return cljs.core.prn_str_with_opts.call(null, a, cljs.core.pr_opts.call(null))
  }, b = function(b) {
    var d = null;
    0 < arguments.length && (d = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0), 0));
    return a.call(this, d)
  };
  b.cljs$lang$maxFixedArity = 0;
  b.cljs$lang$applyTo = function(b) {
    b = cljs.core.seq(b);
    return a(b)
  };
  b.cljs$core$IFn$_invoke$arity$variadic = a;
  return b
}();
cljs.core.pr = function() {
  var a = function(a) {
    return cljs.core.pr_with_opts.call(null, a, cljs.core.pr_opts.call(null))
  }, b = function(b) {
    var d = null;
    0 < arguments.length && (d = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0), 0));
    return a.call(this, d)
  };
  b.cljs$lang$maxFixedArity = 0;
  b.cljs$lang$applyTo = function(b) {
    b = cljs.core.seq(b);
    return a(b)
  };
  b.cljs$core$IFn$_invoke$arity$variadic = a;
  return b
}();
cljs.core.print = function() {
  var a = function(a) {
    return cljs.core.pr_with_opts.call(null, a, cljs.core.assoc.call(null, cljs.core.pr_opts.call(null), new cljs.core.Keyword(null, "readably", "readably", 4441712502), !1))
  }, b = function(b) {
    var d = null;
    0 < arguments.length && (d = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0), 0));
    return a.call(this, d)
  };
  b.cljs$lang$maxFixedArity = 0;
  b.cljs$lang$applyTo = function(b) {
    b = cljs.core.seq(b);
    return a(b)
  };
  b.cljs$core$IFn$_invoke$arity$variadic = a;
  return b
}();
cljs.core.print_str = function() {
  var a = function(a) {
    return cljs.core.pr_str_with_opts.call(null, a, cljs.core.assoc.call(null, cljs.core.pr_opts.call(null), new cljs.core.Keyword(null, "readably", "readably", 4441712502), !1))
  }, b = function(b) {
    var d = null;
    0 < arguments.length && (d = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0), 0));
    return a.call(this, d)
  };
  b.cljs$lang$maxFixedArity = 0;
  b.cljs$lang$applyTo = function(b) {
    b = cljs.core.seq(b);
    return a(b)
  };
  b.cljs$core$IFn$_invoke$arity$variadic = a;
  return b
}();
cljs.core.println = function() {
  var a = function(a) {
    cljs.core.pr_with_opts.call(null, a, cljs.core.assoc.call(null, cljs.core.pr_opts.call(null), new cljs.core.Keyword(null, "readably", "readably", 4441712502), !1));
    return cljs.core.newline.call(null, cljs.core.pr_opts.call(null))
  }, b = function(b) {
    var d = null;
    0 < arguments.length && (d = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0), 0));
    return a.call(this, d)
  };
  b.cljs$lang$maxFixedArity = 0;
  b.cljs$lang$applyTo = function(b) {
    b = cljs.core.seq(b);
    return a(b)
  };
  b.cljs$core$IFn$_invoke$arity$variadic = a;
  return b
}();
cljs.core.println_str = function() {
  var a = function(a) {
    return cljs.core.prn_str_with_opts.call(null, a, cljs.core.assoc.call(null, cljs.core.pr_opts.call(null), new cljs.core.Keyword(null, "readably", "readably", 4441712502), !1))
  }, b = function(b) {
    var d = null;
    0 < arguments.length && (d = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0), 0));
    return a.call(this, d)
  };
  b.cljs$lang$maxFixedArity = 0;
  b.cljs$lang$applyTo = function(b) {
    b = cljs.core.seq(b);
    return a(b)
  };
  b.cljs$core$IFn$_invoke$arity$variadic = a;
  return b
}();
cljs.core.prn = function() {
  var a = function(a) {
    cljs.core.pr_with_opts.call(null, a, cljs.core.pr_opts.call(null));
    return cljs.core.newline.call(null, cljs.core.pr_opts.call(null))
  }, b = function(b) {
    var d = null;
    0 < arguments.length && (d = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0), 0));
    return a.call(this, d)
  };
  b.cljs$lang$maxFixedArity = 0;
  b.cljs$lang$applyTo = function(b) {
    b = cljs.core.seq(b);
    return a(b)
  };
  b.cljs$core$IFn$_invoke$arity$variadic = a;
  return b
}();
cljs.core.KeySeq.prototype.cljs$core$IPrintWithWriter$ = !0;
cljs.core.KeySeq.prototype.cljs$core$IPrintWithWriter$_pr_writer$arity$3 = function(a, b, c) {
  return cljs.core.pr_sequential_writer.call(null, b, cljs.core.pr_writer, "(", " ", ")", c, this)
};
cljs.core.IndexedSeq.prototype.cljs$core$IPrintWithWriter$ = !0;
cljs.core.IndexedSeq.prototype.cljs$core$IPrintWithWriter$_pr_writer$arity$3 = function(a, b, c) {
  return cljs.core.pr_sequential_writer.call(null, b, cljs.core.pr_writer, "(", " ", ")", c, this)
};
cljs.core.Subvec.prototype.cljs$core$IPrintWithWriter$ = !0;
cljs.core.Subvec.prototype.cljs$core$IPrintWithWriter$_pr_writer$arity$3 = function(a, b, c) {
  return cljs.core.pr_sequential_writer.call(null, b, cljs.core.pr_writer, "[", " ", "]", c, this)
};
cljs.core.ChunkedCons.prototype.cljs$core$IPrintWithWriter$ = !0;
cljs.core.ChunkedCons.prototype.cljs$core$IPrintWithWriter$_pr_writer$arity$3 = function(a, b, c) {
  return cljs.core.pr_sequential_writer.call(null, b, cljs.core.pr_writer, "(", " ", ")", c, this)
};
cljs.core.PersistentTreeMap.prototype.cljs$core$IPrintWithWriter$ = !0;
cljs.core.PersistentTreeMap.prototype.cljs$core$IPrintWithWriter$_pr_writer$arity$3 = function(a, b, c) {
  return cljs.core.pr_sequential_writer.call(null, b, function(a) {
    return cljs.core.pr_sequential_writer.call(null, b, cljs.core.pr_writer, "", " ", "", c, a)
  }, "{", ", ", "}", c, this)
};
cljs.core.PersistentArrayMap.prototype.cljs$core$IPrintWithWriter$ = !0;
cljs.core.PersistentArrayMap.prototype.cljs$core$IPrintWithWriter$_pr_writer$arity$3 = function(a, b, c) {
  return cljs.core.pr_sequential_writer.call(null, b, function(a) {
    return cljs.core.pr_sequential_writer.call(null, b, cljs.core.pr_writer, "", " ", "", c, a)
  }, "{", ", ", "}", c, this)
};
cljs.core.PersistentQueue.prototype.cljs$core$IPrintWithWriter$ = !0;
cljs.core.PersistentQueue.prototype.cljs$core$IPrintWithWriter$_pr_writer$arity$3 = function(a, b, c) {
  return cljs.core.pr_sequential_writer.call(null, b, cljs.core.pr_writer, "#queue [", " ", "]", c, cljs.core.seq.call(null, this))
};
cljs.core.LazySeq.prototype.cljs$core$IPrintWithWriter$ = !0;
cljs.core.LazySeq.prototype.cljs$core$IPrintWithWriter$_pr_writer$arity$3 = function(a, b, c) {
  return cljs.core.pr_sequential_writer.call(null, b, cljs.core.pr_writer, "(", " ", ")", c, this)
};
cljs.core.RSeq.prototype.cljs$core$IPrintWithWriter$ = !0;
cljs.core.RSeq.prototype.cljs$core$IPrintWithWriter$_pr_writer$arity$3 = function(a, b, c) {
  return cljs.core.pr_sequential_writer.call(null, b, cljs.core.pr_writer, "(", " ", ")", c, this)
};
cljs.core.PersistentTreeSet.prototype.cljs$core$IPrintWithWriter$ = !0;
cljs.core.PersistentTreeSet.prototype.cljs$core$IPrintWithWriter$_pr_writer$arity$3 = function(a, b, c) {
  return cljs.core.pr_sequential_writer.call(null, b, cljs.core.pr_writer, "#{", " ", "}", c, this)
};
cljs.core.NodeSeq.prototype.cljs$core$IPrintWithWriter$ = !0;
cljs.core.NodeSeq.prototype.cljs$core$IPrintWithWriter$_pr_writer$arity$3 = function(a, b, c) {
  return cljs.core.pr_sequential_writer.call(null, b, cljs.core.pr_writer, "(", " ", ")", c, this)
};
cljs.core.RedNode.prototype.cljs$core$IPrintWithWriter$ = !0;
cljs.core.RedNode.prototype.cljs$core$IPrintWithWriter$_pr_writer$arity$3 = function(a, b, c) {
  return cljs.core.pr_sequential_writer.call(null, b, cljs.core.pr_writer, "[", " ", "]", c, this)
};
cljs.core.ChunkedSeq.prototype.cljs$core$IPrintWithWriter$ = !0;
cljs.core.ChunkedSeq.prototype.cljs$core$IPrintWithWriter$_pr_writer$arity$3 = function(a, b, c) {
  return cljs.core.pr_sequential_writer.call(null, b, cljs.core.pr_writer, "(", " ", ")", c, this)
};
cljs.core.PersistentHashMap.prototype.cljs$core$IPrintWithWriter$ = !0;
cljs.core.PersistentHashMap.prototype.cljs$core$IPrintWithWriter$_pr_writer$arity$3 = function(a, b, c) {
  return cljs.core.pr_sequential_writer.call(null, b, function(a) {
    return cljs.core.pr_sequential_writer.call(null, b, cljs.core.pr_writer, "", " ", "", c, a)
  }, "{", ", ", "}", c, this)
};
cljs.core.PersistentHashSet.prototype.cljs$core$IPrintWithWriter$ = !0;
cljs.core.PersistentHashSet.prototype.cljs$core$IPrintWithWriter$_pr_writer$arity$3 = function(a, b, c) {
  return cljs.core.pr_sequential_writer.call(null, b, cljs.core.pr_writer, "#{", " ", "}", c, this)
};
cljs.core.PersistentVector.prototype.cljs$core$IPrintWithWriter$ = !0;
cljs.core.PersistentVector.prototype.cljs$core$IPrintWithWriter$_pr_writer$arity$3 = function(a, b, c) {
  return cljs.core.pr_sequential_writer.call(null, b, cljs.core.pr_writer, "[", " ", "]", c, this)
};
cljs.core.List.prototype.cljs$core$IPrintWithWriter$ = !0;
cljs.core.List.prototype.cljs$core$IPrintWithWriter$_pr_writer$arity$3 = function(a, b, c) {
  return cljs.core.pr_sequential_writer.call(null, b, cljs.core.pr_writer, "(", " ", ")", c, this)
};
cljs.core.PersistentArrayMapSeq.prototype.cljs$core$IPrintWithWriter$ = !0;
cljs.core.PersistentArrayMapSeq.prototype.cljs$core$IPrintWithWriter$_pr_writer$arity$3 = function(a, b, c) {
  return cljs.core.pr_sequential_writer.call(null, b, cljs.core.pr_writer, "(", " ", ")", c, this)
};
cljs.core.EmptyList.prototype.cljs$core$IPrintWithWriter$ = !0;
cljs.core.EmptyList.prototype.cljs$core$IPrintWithWriter$_pr_writer$arity$3 = function(a, b, c) {
  return cljs.core._write.call(null, b, "()")
};
cljs.core.BlackNode.prototype.cljs$core$IPrintWithWriter$ = !0;
cljs.core.BlackNode.prototype.cljs$core$IPrintWithWriter$_pr_writer$arity$3 = function(a, b, c) {
  return cljs.core.pr_sequential_writer.call(null, b, cljs.core.pr_writer, "[", " ", "]", c, this)
};
cljs.core.Cons.prototype.cljs$core$IPrintWithWriter$ = !0;
cljs.core.Cons.prototype.cljs$core$IPrintWithWriter$_pr_writer$arity$3 = function(a, b, c) {
  return cljs.core.pr_sequential_writer.call(null, b, cljs.core.pr_writer, "(", " ", ")", c, this)
};
cljs.core.Range.prototype.cljs$core$IPrintWithWriter$ = !0;
cljs.core.Range.prototype.cljs$core$IPrintWithWriter$_pr_writer$arity$3 = function(a, b, c) {
  return cljs.core.pr_sequential_writer.call(null, b, cljs.core.pr_writer, "(", " ", ")", c, this)
};
cljs.core.ArrayNodeSeq.prototype.cljs$core$IPrintWithWriter$ = !0;
cljs.core.ArrayNodeSeq.prototype.cljs$core$IPrintWithWriter$_pr_writer$arity$3 = function(a, b, c) {
  return cljs.core.pr_sequential_writer.call(null, b, cljs.core.pr_writer, "(", " ", ")", c, this)
};
cljs.core.ValSeq.prototype.cljs$core$IPrintWithWriter$ = !0;
cljs.core.ValSeq.prototype.cljs$core$IPrintWithWriter$_pr_writer$arity$3 = function(a, b, c) {
  return cljs.core.pr_sequential_writer.call(null, b, cljs.core.pr_writer, "(", " ", ")", c, this)
};
cljs.core.ObjMap.prototype.cljs$core$IPrintWithWriter$ = !0;
cljs.core.ObjMap.prototype.cljs$core$IPrintWithWriter$_pr_writer$arity$3 = function(a, b, c) {
  return cljs.core.pr_sequential_writer.call(null, b, function(a) {
    return cljs.core.pr_sequential_writer.call(null, b, cljs.core.pr_writer, "", " ", "", c, a)
  }, "{", ", ", "}", c, this)
};
cljs.core.PersistentTreeMapSeq.prototype.cljs$core$IPrintWithWriter$ = !0;
cljs.core.PersistentTreeMapSeq.prototype.cljs$core$IPrintWithWriter$_pr_writer$arity$3 = function(a, b, c) {
  return cljs.core.pr_sequential_writer.call(null, b, cljs.core.pr_writer, "(", " ", ")", c, this)
};
cljs.core.PersistentVector.prototype.cljs$core$IComparable$ = !0;
cljs.core.PersistentVector.prototype.cljs$core$IComparable$_compare$arity$2 = function(a, b) {
  return cljs.core.compare_indexed.call(null, this, b)
};
cljs.core.Subvec.prototype.cljs$core$IComparable$ = !0;
cljs.core.Subvec.prototype.cljs$core$IComparable$_compare$arity$2 = function(a, b) {
  return cljs.core.compare_indexed.call(null, this, b)
};
cljs.core.Atom = function(a, b, c, d) {
  this.state = a;
  this.meta = b;
  this.validator = c;
  this.watches = d;
  this.cljs$lang$protocol_mask$partition0$ = 2153938944;
  this.cljs$lang$protocol_mask$partition1$ = 2
};
cljs.core.Atom.cljs$lang$type = !0;
cljs.core.Atom.cljs$lang$ctorStr = "cljs.core/Atom";
cljs.core.Atom.cljs$lang$ctorPrWriter = function(a, b, c) {
  return cljs.core._write.call(null, b, "cljs.core/Atom")
};
cljs.core.Atom.prototype.cljs$core$IHash$_hash$arity$1 = function(a) {
  return goog.getUid(this)
};
cljs.core.Atom.prototype.cljs$core$IWatchable$_notify_watches$arity$3 = function(a, b, c) {
  a = cljs.core.seq.call(null, this.watches);
  for(var d = null, e = 0, f = 0;;) {
    if(f < e) {
      var g = cljs.core._nth.call(null, d, f), h = cljs.core.nth.call(null, g, 0, null), g = cljs.core.nth.call(null, g, 1, null);
      g.call(null, h, this, b, c);
      f += 1
    }else {
      if(a = cljs.core.seq.call(null, a)) {
        cljs.core.chunked_seq_QMARK_.call(null, a) ? (d = cljs.core.chunk_first.call(null, a), a = cljs.core.chunk_rest.call(null, a), h = d, e = cljs.core.count.call(null, d), d = h) : (d = cljs.core.first.call(null, a), h = cljs.core.nth.call(null, d, 0, null), g = cljs.core.nth.call(null, d, 1, null), g.call(null, h, this, b, c), a = cljs.core.next.call(null, a), d = null, e = 0), f = 0
      }else {
        return null
      }
    }
  }
};
cljs.core.Atom.prototype.cljs$core$IWatchable$_add_watch$arity$3 = function(a, b, c) {
  return this.watches = cljs.core.assoc.call(null, this.watches, b, c)
};
cljs.core.Atom.prototype.cljs$core$IWatchable$_remove_watch$arity$2 = function(a, b) {
  return this.watches = cljs.core.dissoc.call(null, this.watches, b)
};
cljs.core.Atom.prototype.cljs$core$IPrintWithWriter$_pr_writer$arity$3 = function(a, b, c) {
  cljs.core._write.call(null, b, "#\x3cAtom: ");
  cljs.core.pr_writer.call(null, this.state, b, c);
  return cljs.core._write.call(null, b, "\x3e")
};
cljs.core.Atom.prototype.cljs$core$IMeta$_meta$arity$1 = function(a) {
  return this.meta
};
cljs.core.Atom.prototype.cljs$core$IDeref$_deref$arity$1 = function(a) {
  return this.state
};
cljs.core.Atom.prototype.cljs$core$IEquiv$_equiv$arity$2 = function(a, b) {
  return this === b
};
cljs.core.__GT_Atom = function(a, b, c, d) {
  return new cljs.core.Atom(a, b, c, d)
};
cljs.core.atom = function() {
  var a = null, b = function(a) {
    return new cljs.core.Atom(a, null, null, null)
  }, c = function() {
    var a = function(a, b) {
      var c = cljs.core.seq_QMARK_.call(null, b) ? cljs.core.apply.call(null, cljs.core.hash_map, b) : b, d = cljs.core.get.call(null, c, new cljs.core.Keyword(null, "validator", "validator", 4199087812)), c = cljs.core.get.call(null, c, new cljs.core.Keyword(null, "meta", "meta", 1017252215));
      return new cljs.core.Atom(a, c, d, null)
    }, b = function(b, c) {
      var e = null;
      1 < arguments.length && (e = cljs.core.array_seq(Array.prototype.slice.call(arguments, 1), 0));
      return a.call(this, b, e)
    };
    b.cljs$lang$maxFixedArity = 1;
    b.cljs$lang$applyTo = function(b) {
      var c = cljs.core.first(b);
      b = cljs.core.rest(b);
      return a(c, b)
    };
    b.cljs$core$IFn$_invoke$arity$variadic = a;
    return b
  }(), a = function(a, e) {
    switch(arguments.length) {
      case 1:
        return b.call(this, a);
      default:
        return c.cljs$core$IFn$_invoke$arity$variadic(a, cljs.core.array_seq(arguments, 1))
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$lang$maxFixedArity = 1;
  a.cljs$lang$applyTo = c.cljs$lang$applyTo;
  a.cljs$core$IFn$_invoke$arity$1 = b;
  a.cljs$core$IFn$_invoke$arity$variadic = c.cljs$core$IFn$_invoke$arity$variadic;
  return a
}();
cljs.core.reset_BANG_ = function(a, b) {
  var c = a.validator;
  if(cljs.core.truth_(c) && !cljs.core.truth_(c.call(null, b))) {
    throw Error([cljs.core.str("Assert failed: "), cljs.core.str("Validator rejected reference state"), cljs.core.str("\n"), cljs.core.str(cljs.core.pr_str.call(null, cljs.core.list(new cljs.core.Symbol(null, "validate", "validate", 1233162959, null), new cljs.core.Symbol(null, "new-value", "new-value", 972165309, null))))].join(""));
  }
  c = a.state;
  a.state = b;
  cljs.core._notify_watches.call(null, a, c, b);
  return b
};
cljs.core.swap_BANG_ = function() {
  var a = null, b = function(a, b) {
    return cljs.core.reset_BANG_.call(null, a, b.call(null, a.state))
  }, c = function(a, b, c) {
    return cljs.core.reset_BANG_.call(null, a, b.call(null, a.state, c))
  }, d = function(a, b, c, d) {
    return cljs.core.reset_BANG_.call(null, a, b.call(null, a.state, c, d))
  }, e = function(a, b, c, d, e) {
    return cljs.core.reset_BANG_.call(null, a, b.call(null, a.state, c, d, e))
  }, f = function() {
    var a = function(a, b, c, d, e, f) {
      return cljs.core.reset_BANG_.call(null, a, cljs.core.apply.call(null, b, a.state, c, d, e, f))
    }, b = function(b, c, d, e, f, h) {
      var r = null;
      5 < arguments.length && (r = cljs.core.array_seq(Array.prototype.slice.call(arguments, 5), 0));
      return a.call(this, b, c, d, e, f, r)
    };
    b.cljs$lang$maxFixedArity = 5;
    b.cljs$lang$applyTo = function(b) {
      var c = cljs.core.first(b);
      b = cljs.core.next(b);
      var d = cljs.core.first(b);
      b = cljs.core.next(b);
      var e = cljs.core.first(b);
      b = cljs.core.next(b);
      var f = cljs.core.first(b);
      b = cljs.core.next(b);
      var h = cljs.core.first(b);
      b = cljs.core.rest(b);
      return a(c, d, e, f, h, b)
    };
    b.cljs$core$IFn$_invoke$arity$variadic = a;
    return b
  }(), a = function(a, h, l, m, k, n) {
    switch(arguments.length) {
      case 2:
        return b.call(this, a, h);
      case 3:
        return c.call(this, a, h, l);
      case 4:
        return d.call(this, a, h, l, m);
      case 5:
        return e.call(this, a, h, l, m, k);
      default:
        return f.cljs$core$IFn$_invoke$arity$variadic(a, h, l, m, k, cljs.core.array_seq(arguments, 5))
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$lang$maxFixedArity = 5;
  a.cljs$lang$applyTo = f.cljs$lang$applyTo;
  a.cljs$core$IFn$_invoke$arity$2 = b;
  a.cljs$core$IFn$_invoke$arity$3 = c;
  a.cljs$core$IFn$_invoke$arity$4 = d;
  a.cljs$core$IFn$_invoke$arity$5 = e;
  a.cljs$core$IFn$_invoke$arity$variadic = f.cljs$core$IFn$_invoke$arity$variadic;
  return a
}();
cljs.core.compare_and_set_BANG_ = function(a, b, c) {
  return cljs.core._EQ_.call(null, a.state, b) ? (cljs.core.reset_BANG_.call(null, a, c), !0) : !1
};
cljs.core.deref = function(a) {
  return cljs.core._deref.call(null, a)
};
cljs.core.set_validator_BANG_ = function(a, b) {
  return a.validator = b
};
cljs.core.get_validator = function(a) {
  return a.validator
};
cljs.core.alter_meta_BANG_ = function() {
  var a = function(a, b, e) {
    return a.meta = cljs.core.apply.call(null, b, a.meta, e)
  }, b = function(b, d, e) {
    var f = null;
    2 < arguments.length && (f = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2), 0));
    return a.call(this, b, d, f)
  };
  b.cljs$lang$maxFixedArity = 2;
  b.cljs$lang$applyTo = function(b) {
    var d = cljs.core.first(b);
    b = cljs.core.next(b);
    var e = cljs.core.first(b);
    b = cljs.core.rest(b);
    return a(d, e, b)
  };
  b.cljs$core$IFn$_invoke$arity$variadic = a;
  return b
}();
cljs.core.reset_meta_BANG_ = function(a, b) {
  return a.meta = b
};
cljs.core.add_watch = function(a, b, c) {
  return cljs.core._add_watch.call(null, a, b, c)
};
cljs.core.remove_watch = function(a, b) {
  return cljs.core._remove_watch.call(null, a, b)
};
cljs.core.gensym_counter = null;
cljs.core.gensym = function() {
  var a = null, b = function() {
    return a.call(null, "G__")
  }, c = function(a) {
    null == cljs.core.gensym_counter && (cljs.core.gensym_counter = cljs.core.atom.call(null, 0));
    return cljs.core.symbol.call(null, [cljs.core.str(a), cljs.core.str(cljs.core.swap_BANG_.call(null, cljs.core.gensym_counter, cljs.core.inc))].join(""))
  }, a = function(a) {
    switch(arguments.length) {
      case 0:
        return b.call(this);
      case 1:
        return c.call(this, a)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$core$IFn$_invoke$arity$0 = b;
  a.cljs$core$IFn$_invoke$arity$1 = c;
  return a
}();
cljs.core.fixture1 = 1;
cljs.core.fixture2 = 2;
cljs.core.Delay = function(a, b) {
  this.state = a;
  this.f = b;
  this.cljs$lang$protocol_mask$partition1$ = 1;
  this.cljs$lang$protocol_mask$partition0$ = 32768
};
cljs.core.Delay.cljs$lang$type = !0;
cljs.core.Delay.cljs$lang$ctorStr = "cljs.core/Delay";
cljs.core.Delay.cljs$lang$ctorPrWriter = function(a, b, c) {
  return cljs.core._write.call(null, b, "cljs.core/Delay")
};
cljs.core.Delay.prototype.cljs$core$IPending$_realized_QMARK_$arity$1 = function(a) {
  return(new cljs.core.Keyword(null, "done", "done", 1016993524)).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null, this.state))
};
cljs.core.Delay.prototype.cljs$core$IDeref$_deref$arity$1 = function(a) {
  var b = this;
  return(new cljs.core.Keyword(null, "value", "value", 1125876963)).cljs$core$IFn$_invoke$arity$1(cljs.core.swap_BANG_.call(null, b.state, function(a) {
    a = cljs.core.seq_QMARK_.call(null, a) ? cljs.core.apply.call(null, cljs.core.hash_map, a) : a;
    var d = cljs.core.get.call(null, a, new cljs.core.Keyword(null, "done", "done", 1016993524));
    return cljs.core.truth_(d) ? a : cljs.core.PersistentArrayMap.fromArray([new cljs.core.Keyword(null, "done", "done", 1016993524), !0, new cljs.core.Keyword(null, "value", "value", 1125876963), b.f.call(null)], !0)
  }))
};
cljs.core.__GT_Delay = function(a, b) {
  return new cljs.core.Delay(a, b)
};
cljs.core.delay_QMARK_ = function(a) {
  return a instanceof cljs.core.Delay
};
cljs.core.force = function(a) {
  return cljs.core.delay_QMARK_.call(null, a) ? cljs.core.deref.call(null, a) : a
};
cljs.core.realized_QMARK_ = function(a) {
  return cljs.core._realized_QMARK_.call(null, a)
};
cljs.core.IEncodeJS = {};
cljs.core._clj__GT_js = function(a) {
  if(a ? a.cljs$core$IEncodeJS$_clj__GT_js$arity$1 : a) {
    return a.cljs$core$IEncodeJS$_clj__GT_js$arity$1(a)
  }
  var b;
  b = cljs.core._clj__GT_js[goog.typeOf(null == a ? null : a)];
  if(!b && (b = cljs.core._clj__GT_js._, !b)) {
    throw cljs.core.missing_protocol.call(null, "IEncodeJS.-clj-\x3ejs", a);
  }
  return b.call(null, a)
};
cljs.core._key__GT_js = function(a) {
  if(a ? a.cljs$core$IEncodeJS$_key__GT_js$arity$1 : a) {
    return a.cljs$core$IEncodeJS$_key__GT_js$arity$1(a)
  }
  var b;
  b = cljs.core._key__GT_js[goog.typeOf(null == a ? null : a)];
  if(!b && (b = cljs.core._key__GT_js._, !b)) {
    throw cljs.core.missing_protocol.call(null, "IEncodeJS.-key-\x3ejs", a);
  }
  return b.call(null, a)
};
cljs.core.key__GT_js = function(a) {
  return(a ? cljs.core.truth_(cljs.core.truth_(null) ? null : a.cljs$core$IEncodeJS$) || (a.cljs$lang$protocol_mask$partition$ ? 0 : cljs.core.native_satisfies_QMARK_.call(null, cljs.core.IEncodeJS, a)) : cljs.core.native_satisfies_QMARK_.call(null, cljs.core.IEncodeJS, a)) ? cljs.core._clj__GT_js.call(null, a) : "string" === typeof a || "number" === typeof a || a instanceof cljs.core.Keyword || a instanceof cljs.core.Symbol ? cljs.core.clj__GT_js.call(null, a) : cljs.core.pr_str.call(null, a)
};
cljs.core.clj__GT_js = function clj__GT_js(b) {
  if(null == b) {
    return null
  }
  if(b ? cljs.core.truth_(cljs.core.truth_(null) ? null : b.cljs$core$IEncodeJS$) || (b.cljs$lang$protocol_mask$partition$ ? 0 : cljs.core.native_satisfies_QMARK_.call(null, cljs.core.IEncodeJS, b)) : cljs.core.native_satisfies_QMARK_.call(null, cljs.core.IEncodeJS, b)) {
    return cljs.core._clj__GT_js.call(null, b)
  }
  if(b instanceof cljs.core.Keyword) {
    return cljs.core.name.call(null, b)
  }
  if(b instanceof cljs.core.Symbol) {
    return"" + cljs.core.str(b)
  }
  if(cljs.core.map_QMARK_.call(null, b)) {
    var c = {};
    b = cljs.core.seq.call(null, b);
    for(var d = null, e = 0, f = 0;;) {
      if(f < e) {
        var g = cljs.core._nth.call(null, d, f), h = cljs.core.nth.call(null, g, 0, null), g = cljs.core.nth.call(null, g, 1, null);
        c[cljs.core.key__GT_js.call(null, h)] = clj__GT_js.call(null, g);
        f += 1
      }else {
        if(b = cljs.core.seq.call(null, b)) {
          cljs.core.chunked_seq_QMARK_.call(null, b) ? (e = cljs.core.chunk_first.call(null, b), b = cljs.core.chunk_rest.call(null, b), d = e, e = cljs.core.count.call(null, e)) : (e = cljs.core.first.call(null, b), d = cljs.core.nth.call(null, e, 0, null), e = cljs.core.nth.call(null, e, 1, null), c[cljs.core.key__GT_js.call(null, d)] = clj__GT_js.call(null, e), b = cljs.core.next.call(null, b), d = null, e = 0), f = 0
        }else {
          break
        }
      }
    }
    return c
  }
  return cljs.core.coll_QMARK_.call(null, b) ? cljs.core.apply.call(null, cljs.core.array, cljs.core.map.call(null, clj__GT_js, b)) : new cljs.core.Keyword(null, "else", "else", 1017020587) ? b : null
};
cljs.core.IEncodeClojure = {};
cljs.core._js__GT_clj = function(a, b) {
  if(a ? a.cljs$core$IEncodeClojure$_js__GT_clj$arity$2 : a) {
    return a.cljs$core$IEncodeClojure$_js__GT_clj$arity$2(a, b)
  }
  var c;
  c = cljs.core._js__GT_clj[goog.typeOf(null == a ? null : a)];
  if(!c && (c = cljs.core._js__GT_clj._, !c)) {
    throw cljs.core.missing_protocol.call(null, "IEncodeClojure.-js-\x3eclj", a);
  }
  return c.call(null, a, b)
};
cljs.core.js__GT_clj = function() {
  var a = null, b = function(b) {
    return a.call(null, b, cljs.core.PersistentArrayMap.fromArray([new cljs.core.Keyword(null, "keywordize-keys", "keywordize-keys", 4191781672), !1], !0))
  }, c = function() {
    var a = function(a, b) {
      if(a ? cljs.core.truth_(cljs.core.truth_(null) ? null : a.cljs$core$IEncodeClojure$) || (a.cljs$lang$protocol_mask$partition$ ? 0 : cljs.core.native_satisfies_QMARK_.call(null, cljs.core.IEncodeClojure, a)) : cljs.core.native_satisfies_QMARK_.call(null, cljs.core.IEncodeClojure, a)) {
        return cljs.core._js__GT_clj.call(null, a, cljs.core.apply.call(null, cljs.core.array_map, b))
      }
      if(cljs.core.seq.call(null, b)) {
        var c = cljs.core.seq_QMARK_.call(null, b) ? cljs.core.apply.call(null, cljs.core.hash_map, b) : b, d = cljs.core.get.call(null, c, new cljs.core.Keyword(null, "keywordize-keys", "keywordize-keys", 4191781672)), e = cljs.core.truth_(d) ? cljs.core.keyword : cljs.core.str;
        return function(a, b, c, d) {
          return function q(e) {
            return cljs.core.seq_QMARK_.call(null, e) ? cljs.core.doall.call(null, cljs.core.map.call(null, q, e)) : cljs.core.coll_QMARK_.call(null, e) ? cljs.core.into.call(null, cljs.core.empty.call(null, e), cljs.core.map.call(null, q, e)) : e instanceof Array ? cljs.core.vec.call(null, cljs.core.map.call(null, q, e)) : cljs.core.type.call(null, e) === Object ? cljs.core.into.call(null, cljs.core.PersistentArrayMap.EMPTY, function() {
              return function(a, b, c, d) {
                return function R(f) {
                  return new cljs.core.LazySeq(null, function(a, b, c, d) {
                    return function() {
                      for(;;) {
                        var a = cljs.core.seq.call(null, f);
                        if(a) {
                          if(cljs.core.chunked_seq_QMARK_.call(null, a)) {
                            var b = cljs.core.chunk_first.call(null, a), c = cljs.core.count.call(null, b), g = cljs.core.chunk_buffer.call(null, c);
                            a: {
                              for(var k = 0;;) {
                                if(k < c) {
                                  var h = cljs.core._nth.call(null, b, k);
                                  cljs.core.chunk_append.call(null, g, cljs.core.PersistentVector.fromArray([d.call(null, h), q.call(null, e[h])], !0));
                                  k += 1
                                }else {
                                  b = !0;
                                  break a
                                }
                              }
                              b = void 0
                            }
                            return b ? cljs.core.chunk_cons.call(null, cljs.core.chunk.call(null, g), R.call(null, cljs.core.chunk_rest.call(null, a))) : cljs.core.chunk_cons.call(null, cljs.core.chunk.call(null, g), null)
                          }
                          g = cljs.core.first.call(null, a);
                          return cljs.core.cons.call(null, cljs.core.PersistentVector.fromArray([d.call(null, g), q.call(null, e[g])], !0), R.call(null, cljs.core.rest.call(null, a)))
                        }
                        return null
                      }
                    }
                  }(a, b, c, d), null, null)
                }
              }(a, b, c, d).call(null, cljs.core.js_keys.call(null, e))
            }()) : new cljs.core.Keyword(null, "else", "else", 1017020587) ? e : null
          }
        }(b, c, d, e).call(null, a)
      }
      return null
    }, b = function(b, c) {
      var e = null;
      1 < arguments.length && (e = cljs.core.array_seq(Array.prototype.slice.call(arguments, 1), 0));
      return a.call(this, b, e)
    };
    b.cljs$lang$maxFixedArity = 1;
    b.cljs$lang$applyTo = function(b) {
      var c = cljs.core.first(b);
      b = cljs.core.rest(b);
      return a(c, b)
    };
    b.cljs$core$IFn$_invoke$arity$variadic = a;
    return b
  }(), a = function(a, e) {
    switch(arguments.length) {
      case 1:
        return b.call(this, a);
      default:
        return c.cljs$core$IFn$_invoke$arity$variadic(a, cljs.core.array_seq(arguments, 1))
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$lang$maxFixedArity = 1;
  a.cljs$lang$applyTo = c.cljs$lang$applyTo;
  a.cljs$core$IFn$_invoke$arity$1 = b;
  a.cljs$core$IFn$_invoke$arity$variadic = c.cljs$core$IFn$_invoke$arity$variadic;
  return a
}();
cljs.core.memoize = function(a) {
  var b = cljs.core.atom.call(null, cljs.core.PersistentArrayMap.EMPTY);
  return function() {
    var c = function(c) {
      var d = cljs.core.get.call(null, cljs.core.deref.call(null, b), c);
      if(cljs.core.truth_(d)) {
        return d
      }
      d = cljs.core.apply.call(null, a, c);
      cljs.core.swap_BANG_.call(null, b, cljs.core.assoc, c, d);
      return d
    }, d = function(a) {
      var b = null;
      0 < arguments.length && (b = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0), 0));
      return c.call(this, b)
    };
    d.cljs$lang$maxFixedArity = 0;
    d.cljs$lang$applyTo = function(a) {
      a = cljs.core.seq(a);
      return c(a)
    };
    d.cljs$core$IFn$_invoke$arity$variadic = c;
    return d
  }()
};
cljs.core.trampoline = function() {
  var a = null, b = function(a) {
    for(;;) {
      if(a = a.call(null), !cljs.core.fn_QMARK_.call(null, a)) {
        return a
      }
    }
  }, c = function() {
    var b = function(b, c) {
      return a.call(null, function() {
        return cljs.core.apply.call(null, b, c)
      })
    }, c = function(a, c) {
      var e = null;
      1 < arguments.length && (e = cljs.core.array_seq(Array.prototype.slice.call(arguments, 1), 0));
      return b.call(this, a, e)
    };
    c.cljs$lang$maxFixedArity = 1;
    c.cljs$lang$applyTo = function(a) {
      var c = cljs.core.first(a);
      a = cljs.core.rest(a);
      return b(c, a)
    };
    c.cljs$core$IFn$_invoke$arity$variadic = b;
    return c
  }(), a = function(a, e) {
    switch(arguments.length) {
      case 1:
        return b.call(this, a);
      default:
        return c.cljs$core$IFn$_invoke$arity$variadic(a, cljs.core.array_seq(arguments, 1))
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$lang$maxFixedArity = 1;
  a.cljs$lang$applyTo = c.cljs$lang$applyTo;
  a.cljs$core$IFn$_invoke$arity$1 = b;
  a.cljs$core$IFn$_invoke$arity$variadic = c.cljs$core$IFn$_invoke$arity$variadic;
  return a
}();
cljs.core.rand = function() {
  var a = null, b = function() {
    return a.call(null, 1)
  }, c = function(a) {
    return Math.random.call(null) * a
  }, a = function(a) {
    switch(arguments.length) {
      case 0:
        return b.call(this);
      case 1:
        return c.call(this, a)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$core$IFn$_invoke$arity$0 = b;
  a.cljs$core$IFn$_invoke$arity$1 = c;
  return a
}();
cljs.core.rand_int = function(a) {
  return Math.floor.call(null, Math.random.call(null) * a)
};
cljs.core.rand_nth = function(a) {
  return cljs.core.nth.call(null, a, cljs.core.rand_int.call(null, cljs.core.count.call(null, a)))
};
cljs.core.group_by = function(a, b) {
  return cljs.core.reduce.call(null, function(b, d) {
    var e = a.call(null, d);
    return cljs.core.assoc.call(null, b, e, cljs.core.conj.call(null, cljs.core.get.call(null, b, e, cljs.core.PersistentVector.EMPTY), d))
  }, cljs.core.PersistentArrayMap.EMPTY, b)
};
cljs.core.make_hierarchy = function() {
  return cljs.core.PersistentArrayMap.fromArray([new cljs.core.Keyword(null, "parents", "parents", 4515496059), cljs.core.PersistentArrayMap.EMPTY, new cljs.core.Keyword(null, "descendants", "descendants", 768214664), cljs.core.PersistentArrayMap.EMPTY, new cljs.core.Keyword(null, "ancestors", "ancestors", 889955442), cljs.core.PersistentArrayMap.EMPTY], !0)
};
cljs.core._global_hierarchy = null;
cljs.core.get_global_hierarchy = function() {
  null == cljs.core._global_hierarchy && (cljs.core._global_hierarchy = cljs.core.atom.call(null, cljs.core.make_hierarchy.call(null)));
  return cljs.core._global_hierarchy
};
cljs.core.swap_global_hierarchy_BANG_ = function() {
  var a = function(a, b) {
    return cljs.core.apply.call(null, cljs.core.swap_BANG_, cljs.core.get_global_hierarchy.call(null), a, b)
  }, b = function(b, d) {
    var e = null;
    1 < arguments.length && (e = cljs.core.array_seq(Array.prototype.slice.call(arguments, 1), 0));
    return a.call(this, b, e)
  };
  b.cljs$lang$maxFixedArity = 1;
  b.cljs$lang$applyTo = function(b) {
    var d = cljs.core.first(b);
    b = cljs.core.rest(b);
    return a(d, b)
  };
  b.cljs$core$IFn$_invoke$arity$variadic = a;
  return b
}();
cljs.core.isa_QMARK_ = function() {
  var a = null, b = function(b, c) {
    return a.call(null, cljs.core.deref.call(null, cljs.core.get_global_hierarchy.call(null)), b, c)
  }, c = function(b, c, f) {
    var g = cljs.core._EQ_.call(null, c, f);
    if(!g && !(g = cljs.core.contains_QMARK_.call(null, (new cljs.core.Keyword(null, "ancestors", "ancestors", 889955442)).cljs$core$IFn$_invoke$arity$1(b).call(null, c), f)) && (g = cljs.core.vector_QMARK_.call(null, f)) && (g = cljs.core.vector_QMARK_.call(null, c))) {
      if(g = cljs.core.count.call(null, f) === cljs.core.count.call(null, c)) {
        for(var g = !0, h = 0;;) {
          if(g && h !== cljs.core.count.call(null, f)) {
            g = a.call(null, b, c.call(null, h), f.call(null, h)), h += 1
          }else {
            return g
          }
        }
      }else {
        return g
      }
    }else {
      return g
    }
  }, a = function(a, e, f) {
    switch(arguments.length) {
      case 2:
        return b.call(this, a, e);
      case 3:
        return c.call(this, a, e, f)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$core$IFn$_invoke$arity$2 = b;
  a.cljs$core$IFn$_invoke$arity$3 = c;
  return a
}();
cljs.core.parents = function() {
  var a = null, b = function(b) {
    return a.call(null, cljs.core.deref.call(null, cljs.core.get_global_hierarchy.call(null)), b)
  }, c = function(a, b) {
    return cljs.core.not_empty.call(null, cljs.core.get.call(null, (new cljs.core.Keyword(null, "parents", "parents", 4515496059)).cljs$core$IFn$_invoke$arity$1(a), b))
  }, a = function(a, e) {
    switch(arguments.length) {
      case 1:
        return b.call(this, a);
      case 2:
        return c.call(this, a, e)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$core$IFn$_invoke$arity$1 = b;
  a.cljs$core$IFn$_invoke$arity$2 = c;
  return a
}();
cljs.core.ancestors = function() {
  var a = null, b = function(b) {
    return a.call(null, cljs.core.deref.call(null, cljs.core.get_global_hierarchy.call(null)), b)
  }, c = function(a, b) {
    return cljs.core.not_empty.call(null, cljs.core.get.call(null, (new cljs.core.Keyword(null, "ancestors", "ancestors", 889955442)).cljs$core$IFn$_invoke$arity$1(a), b))
  }, a = function(a, e) {
    switch(arguments.length) {
      case 1:
        return b.call(this, a);
      case 2:
        return c.call(this, a, e)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$core$IFn$_invoke$arity$1 = b;
  a.cljs$core$IFn$_invoke$arity$2 = c;
  return a
}();
cljs.core.descendants = function() {
  var a = null, b = function(b) {
    return a.call(null, cljs.core.deref.call(null, cljs.core.get_global_hierarchy.call(null)), b)
  }, c = function(a, b) {
    return cljs.core.not_empty.call(null, cljs.core.get.call(null, (new cljs.core.Keyword(null, "descendants", "descendants", 768214664)).cljs$core$IFn$_invoke$arity$1(a), b))
  }, a = function(a, e) {
    switch(arguments.length) {
      case 1:
        return b.call(this, a);
      case 2:
        return c.call(this, a, e)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$core$IFn$_invoke$arity$1 = b;
  a.cljs$core$IFn$_invoke$arity$2 = c;
  return a
}();
cljs.core.derive = function() {
  var a = null, b = function(b, c) {
    if(!cljs.core.truth_(cljs.core.namespace.call(null, c))) {
      throw Error([cljs.core.str("Assert failed: "), cljs.core.str(cljs.core.pr_str.call(null, cljs.core.list(new cljs.core.Symbol(null, "namespace", "namespace", -388313324, null), new cljs.core.Symbol(null, "parent", "parent", 1659011683, null))))].join(""));
    }
    cljs.core.swap_global_hierarchy_BANG_.call(null, a, b, c);
    return null
  }, c = function(a, b, c) {
    if(!cljs.core.not_EQ_.call(null, b, c)) {
      throw Error([cljs.core.str("Assert failed: "), cljs.core.str(cljs.core.pr_str.call(null, cljs.core.list(new cljs.core.Symbol(null, "not\x3d", "not\x3d", -1637144189, null), new cljs.core.Symbol(null, "tag", "tag", -1640416941, null), new cljs.core.Symbol(null, "parent", "parent", 1659011683, null))))].join(""));
    }
    var g = (new cljs.core.Keyword(null, "parents", "parents", 4515496059)).cljs$core$IFn$_invoke$arity$1(a), h = (new cljs.core.Keyword(null, "descendants", "descendants", 768214664)).cljs$core$IFn$_invoke$arity$1(a), l = (new cljs.core.Keyword(null, "ancestors", "ancestors", 889955442)).cljs$core$IFn$_invoke$arity$1(a), m = function(a, b, c) {
      return function(d, e, f, g, h) {
        return cljs.core.reduce.call(null, function(a, b, c) {
          return function(a, b) {
            return cljs.core.assoc.call(null, a, b, cljs.core.reduce.call(null, cljs.core.conj, cljs.core.get.call(null, h, b, cljs.core.PersistentHashSet.EMPTY), cljs.core.cons.call(null, g, h.call(null, g))))
          }
        }(a, b, c), d, cljs.core.cons.call(null, e, f.call(null, e)))
      }
    }(g, h, l);
    if(cljs.core.contains_QMARK_.call(null, g.call(null, b), c)) {
      b = null
    }else {
      if(cljs.core.contains_QMARK_.call(null, l.call(null, b), c)) {
        throw Error([cljs.core.str(b), cljs.core.str("already has"), cljs.core.str(c), cljs.core.str("as ancestor")].join(""));
      }
      if(cljs.core.contains_QMARK_.call(null, l.call(null, c), b)) {
        throw Error([cljs.core.str("Cyclic derivation:"), cljs.core.str(c), cljs.core.str("has"), cljs.core.str(b), cljs.core.str("as ancestor")].join(""));
      }
      b = cljs.core.PersistentArrayMap.fromArray([new cljs.core.Keyword(null, "parents", "parents", 4515496059), cljs.core.assoc.call(null, (new cljs.core.Keyword(null, "parents", "parents", 4515496059)).cljs$core$IFn$_invoke$arity$1(a), b, cljs.core.conj.call(null, cljs.core.get.call(null, g, b, cljs.core.PersistentHashSet.EMPTY), c)), new cljs.core.Keyword(null, "ancestors", "ancestors", 889955442), m.call(null, (new cljs.core.Keyword(null, "ancestors", "ancestors", 889955442)).cljs$core$IFn$_invoke$arity$1(a), 
      b, h, c, l), new cljs.core.Keyword(null, "descendants", "descendants", 768214664), m.call(null, (new cljs.core.Keyword(null, "descendants", "descendants", 768214664)).cljs$core$IFn$_invoke$arity$1(a), c, l, b, h)], !0)
    }
    return cljs.core.truth_(b) ? b : a
  }, a = function(a, e, f) {
    switch(arguments.length) {
      case 2:
        return b.call(this, a, e);
      case 3:
        return c.call(this, a, e, f)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$core$IFn$_invoke$arity$2 = b;
  a.cljs$core$IFn$_invoke$arity$3 = c;
  return a
}();
cljs.core.underive = function() {
  var a = null, b = function(b, c) {
    cljs.core.swap_global_hierarchy_BANG_.call(null, a, b, c);
    return null
  }, c = function(a, b, c) {
    var g = (new cljs.core.Keyword(null, "parents", "parents", 4515496059)).cljs$core$IFn$_invoke$arity$1(a), h = cljs.core.truth_(g.call(null, b)) ? cljs.core.disj.call(null, g.call(null, b), c) : cljs.core.PersistentHashSet.EMPTY, l = cljs.core.truth_(cljs.core.not_empty.call(null, h)) ? cljs.core.assoc.call(null, g, b, h) : cljs.core.dissoc.call(null, g, b), h = cljs.core.flatten.call(null, cljs.core.map.call(null, function(a, b, c) {
      return function(a) {
        return cljs.core.cons.call(null, cljs.core.first.call(null, a), cljs.core.interpose.call(null, cljs.core.first.call(null, a), cljs.core.second.call(null, a)))
      }
    }(g, h, l), cljs.core.seq.call(null, l)));
    return cljs.core.contains_QMARK_.call(null, g.call(null, b), c) ? cljs.core.reduce.call(null, function(a, b) {
      return cljs.core.apply.call(null, cljs.core.derive, a, b)
    }, cljs.core.make_hierarchy.call(null), cljs.core.partition.call(null, 2, h)) : a
  }, a = function(a, e, f) {
    switch(arguments.length) {
      case 2:
        return b.call(this, a, e);
      case 3:
        return c.call(this, a, e, f)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$core$IFn$_invoke$arity$2 = b;
  a.cljs$core$IFn$_invoke$arity$3 = c;
  return a
}();
cljs.core.reset_cache = function(a, b, c, d) {
  cljs.core.swap_BANG_.call(null, a, function(a) {
    return cljs.core.deref.call(null, b)
  });
  return cljs.core.swap_BANG_.call(null, c, function(a) {
    return cljs.core.deref.call(null, d)
  })
};
cljs.core.prefers_STAR_ = function prefers_STAR_(b, c, d) {
  var e = cljs.core.deref.call(null, d).call(null, b), e = cljs.core.truth_(cljs.core.truth_(e) ? e.call(null, c) : e) ? !0 : null;
  if(cljs.core.truth_(e)) {
    return e
  }
  e = function() {
    for(var e = cljs.core.parents.call(null, c);;) {
      if(0 < cljs.core.count.call(null, e)) {
        cljs.core.truth_(prefers_STAR_.call(null, b, cljs.core.first.call(null, e), d)), e = cljs.core.rest.call(null, e)
      }else {
        return null
      }
    }
  }();
  if(cljs.core.truth_(e)) {
    return e
  }
  e = function() {
    for(var e = cljs.core.parents.call(null, b);;) {
      if(0 < cljs.core.count.call(null, e)) {
        cljs.core.truth_(prefers_STAR_.call(null, cljs.core.first.call(null, e), c, d)), e = cljs.core.rest.call(null, e)
      }else {
        return null
      }
    }
  }();
  return cljs.core.truth_(e) ? e : !1
};
cljs.core.dominates = function(a, b, c) {
  c = cljs.core.prefers_STAR_.call(null, a, b, c);
  return cljs.core.truth_(c) ? c : cljs.core.isa_QMARK_.call(null, a, b)
};
cljs.core.find_and_cache_best_method = function find_and_cache_best_method(b, c, d, e, f, g, h) {
  var l = cljs.core.reduce.call(null, function(e, g) {
    var h = cljs.core.nth.call(null, g, 0, null);
    cljs.core.nth.call(null, g, 1, null);
    if(cljs.core.isa_QMARK_.call(null, cljs.core.deref.call(null, d), c, h)) {
      var l = cljs.core.truth_(function() {
        var b = null == e;
        return b ? b : cljs.core.dominates.call(null, h, cljs.core.first.call(null, e), f)
      }()) ? g : e;
      if(!cljs.core.truth_(cljs.core.dominates.call(null, cljs.core.first.call(null, l), h, f))) {
        throw Error([cljs.core.str("Multiple methods in multimethod '"), cljs.core.str(b), cljs.core.str("' match dispatch value: "), cljs.core.str(c), cljs.core.str(" -\x3e "), cljs.core.str(h), cljs.core.str(" and "), cljs.core.str(cljs.core.first.call(null, l)), cljs.core.str(", and neither is preferred")].join(""));
      }
      return l
    }
    return e
  }, null, cljs.core.deref.call(null, e));
  if(cljs.core.truth_(l)) {
    if(cljs.core._EQ_.call(null, cljs.core.deref.call(null, h), cljs.core.deref.call(null, d))) {
      return cljs.core.swap_BANG_.call(null, g, cljs.core.assoc, c, cljs.core.second.call(null, l)), cljs.core.second.call(null, l)
    }
    cljs.core.reset_cache.call(null, g, e, h, d);
    return find_and_cache_best_method.call(null, b, c, d, e, f, g, h)
  }
  return null
};
cljs.core.IMultiFn = {};
cljs.core._reset = function(a) {
  if(a ? a.cljs$core$IMultiFn$_reset$arity$1 : a) {
    return a.cljs$core$IMultiFn$_reset$arity$1(a)
  }
  var b;
  b = cljs.core._reset[goog.typeOf(null == a ? null : a)];
  if(!b && (b = cljs.core._reset._, !b)) {
    throw cljs.core.missing_protocol.call(null, "IMultiFn.-reset", a);
  }
  return b.call(null, a)
};
cljs.core._add_method = function(a, b, c) {
  if(a ? a.cljs$core$IMultiFn$_add_method$arity$3 : a) {
    return a.cljs$core$IMultiFn$_add_method$arity$3(a, b, c)
  }
  var d;
  d = cljs.core._add_method[goog.typeOf(null == a ? null : a)];
  if(!d && (d = cljs.core._add_method._, !d)) {
    throw cljs.core.missing_protocol.call(null, "IMultiFn.-add-method", a);
  }
  return d.call(null, a, b, c)
};
cljs.core._remove_method = function(a, b) {
  if(a ? a.cljs$core$IMultiFn$_remove_method$arity$2 : a) {
    return a.cljs$core$IMultiFn$_remove_method$arity$2(a, b)
  }
  var c;
  c = cljs.core._remove_method[goog.typeOf(null == a ? null : a)];
  if(!c && (c = cljs.core._remove_method._, !c)) {
    throw cljs.core.missing_protocol.call(null, "IMultiFn.-remove-method", a);
  }
  return c.call(null, a, b)
};
cljs.core._prefer_method = function(a, b, c) {
  if(a ? a.cljs$core$IMultiFn$_prefer_method$arity$3 : a) {
    return a.cljs$core$IMultiFn$_prefer_method$arity$3(a, b, c)
  }
  var d;
  d = cljs.core._prefer_method[goog.typeOf(null == a ? null : a)];
  if(!d && (d = cljs.core._prefer_method._, !d)) {
    throw cljs.core.missing_protocol.call(null, "IMultiFn.-prefer-method", a);
  }
  return d.call(null, a, b, c)
};
cljs.core._get_method = function(a, b) {
  if(a ? a.cljs$core$IMultiFn$_get_method$arity$2 : a) {
    return a.cljs$core$IMultiFn$_get_method$arity$2(a, b)
  }
  var c;
  c = cljs.core._get_method[goog.typeOf(null == a ? null : a)];
  if(!c && (c = cljs.core._get_method._, !c)) {
    throw cljs.core.missing_protocol.call(null, "IMultiFn.-get-method", a);
  }
  return c.call(null, a, b)
};
cljs.core._methods = function(a) {
  if(a ? a.cljs$core$IMultiFn$_methods$arity$1 : a) {
    return a.cljs$core$IMultiFn$_methods$arity$1(a)
  }
  var b;
  b = cljs.core._methods[goog.typeOf(null == a ? null : a)];
  if(!b && (b = cljs.core._methods._, !b)) {
    throw cljs.core.missing_protocol.call(null, "IMultiFn.-methods", a);
  }
  return b.call(null, a)
};
cljs.core._prefers = function(a) {
  if(a ? a.cljs$core$IMultiFn$_prefers$arity$1 : a) {
    return a.cljs$core$IMultiFn$_prefers$arity$1(a)
  }
  var b;
  b = cljs.core._prefers[goog.typeOf(null == a ? null : a)];
  if(!b && (b = cljs.core._prefers._, !b)) {
    throw cljs.core.missing_protocol.call(null, "IMultiFn.-prefers", a);
  }
  return b.call(null, a)
};
cljs.core._dispatch = function(a, b) {
  if(a ? a.cljs$core$IMultiFn$_dispatch$arity$2 : a) {
    return a.cljs$core$IMultiFn$_dispatch$arity$2(a, b)
  }
  var c;
  c = cljs.core._dispatch[goog.typeOf(null == a ? null : a)];
  if(!c && (c = cljs.core._dispatch._, !c)) {
    throw cljs.core.missing_protocol.call(null, "IMultiFn.-dispatch", a);
  }
  return c.call(null, a, b)
};
cljs.core.do_dispatch = function(a, b, c, d) {
  c = cljs.core.apply.call(null, c, d);
  a = cljs.core._get_method.call(null, a, c);
  if(!cljs.core.truth_(a)) {
    throw Error([cljs.core.str("No method in multimethod '"), cljs.core.str(b), cljs.core.str("' for dispatch value: "), cljs.core.str(c)].join(""));
  }
  return cljs.core.apply.call(null, a, d)
};
cljs.core.MultiFn = function(a, b, c, d, e, f, g, h) {
  this.name = a;
  this.dispatch_fn = b;
  this.default_dispatch_val = c;
  this.hierarchy = d;
  this.method_table = e;
  this.prefer_table = f;
  this.method_cache = g;
  this.cached_hierarchy = h;
  this.cljs$lang$protocol_mask$partition0$ = 4194304;
  this.cljs$lang$protocol_mask$partition1$ = 256
};
cljs.core.MultiFn.cljs$lang$type = !0;
cljs.core.MultiFn.cljs$lang$ctorStr = "cljs.core/MultiFn";
cljs.core.MultiFn.cljs$lang$ctorPrWriter = function(a, b, c) {
  return cljs.core._write.call(null, b, "cljs.core/MultiFn")
};
cljs.core.MultiFn.prototype.cljs$core$IHash$_hash$arity$1 = function(a) {
  return goog.getUid(this)
};
cljs.core.MultiFn.prototype.cljs$core$IMultiFn$_reset$arity$1 = function(a) {
  cljs.core.swap_BANG_.call(null, this.method_table, function(a) {
    return cljs.core.PersistentArrayMap.EMPTY
  });
  cljs.core.swap_BANG_.call(null, this.method_cache, function(a) {
    return cljs.core.PersistentArrayMap.EMPTY
  });
  cljs.core.swap_BANG_.call(null, this.prefer_table, function(a) {
    return cljs.core.PersistentArrayMap.EMPTY
  });
  cljs.core.swap_BANG_.call(null, this.cached_hierarchy, function(a) {
    return null
  });
  return this
};
cljs.core.MultiFn.prototype.cljs$core$IMultiFn$_add_method$arity$3 = function(a, b, c) {
  cljs.core.swap_BANG_.call(null, this.method_table, cljs.core.assoc, b, c);
  cljs.core.reset_cache.call(null, this.method_cache, this.method_table, this.cached_hierarchy, this.hierarchy);
  return this
};
cljs.core.MultiFn.prototype.cljs$core$IMultiFn$_remove_method$arity$2 = function(a, b) {
  cljs.core.swap_BANG_.call(null, this.method_table, cljs.core.dissoc, b);
  cljs.core.reset_cache.call(null, this.method_cache, this.method_table, this.cached_hierarchy, this.hierarchy);
  return this
};
cljs.core.MultiFn.prototype.cljs$core$IMultiFn$_get_method$arity$2 = function(a, b) {
  cljs.core._EQ_.call(null, cljs.core.deref.call(null, this.cached_hierarchy), cljs.core.deref.call(null, this.hierarchy)) || cljs.core.reset_cache.call(null, this.method_cache, this.method_table, this.cached_hierarchy, this.hierarchy);
  var c = cljs.core.deref.call(null, this.method_cache).call(null, b);
  if(cljs.core.truth_(c)) {
    return c
  }
  c = cljs.core.find_and_cache_best_method.call(null, this.name, b, this.hierarchy, this.method_table, this.prefer_table, this.method_cache, this.cached_hierarchy);
  return cljs.core.truth_(c) ? c : cljs.core.deref.call(null, this.method_table).call(null, this.default_dispatch_val)
};
cljs.core.MultiFn.prototype.cljs$core$IMultiFn$_prefer_method$arity$3 = function(a, b, c) {
  if(cljs.core.truth_(cljs.core.prefers_STAR_.call(null, b, c, this.prefer_table))) {
    throw Error([cljs.core.str("Preference conflict in multimethod '"), cljs.core.str(this.name), cljs.core.str("': "), cljs.core.str(c), cljs.core.str(" is already preferred to "), cljs.core.str(b)].join(""));
  }
  cljs.core.swap_BANG_.call(null, this.prefer_table, function(a) {
    return cljs.core.assoc.call(null, a, b, cljs.core.conj.call(null, cljs.core.get.call(null, a, b, cljs.core.PersistentHashSet.EMPTY), c))
  });
  return cljs.core.reset_cache.call(null, this.method_cache, this.method_table, this.cached_hierarchy, this.hierarchy)
};
cljs.core.MultiFn.prototype.cljs$core$IMultiFn$_methods$arity$1 = function(a) {
  return cljs.core.deref.call(null, this.method_table)
};
cljs.core.MultiFn.prototype.cljs$core$IMultiFn$_prefers$arity$1 = function(a) {
  return cljs.core.deref.call(null, this.prefer_table)
};
cljs.core.MultiFn.prototype.cljs$core$IMultiFn$_dispatch$arity$2 = function(a, b) {
  return cljs.core.do_dispatch.call(null, this, this.name, this.dispatch_fn, b)
};
cljs.core.__GT_MultiFn = function(a, b, c, d, e, f, g, h) {
  return new cljs.core.MultiFn(a, b, c, d, e, f, g, h)
};
cljs.core.MultiFn.prototype.call = function() {
  var a = function(a, b) {
    return cljs.core._dispatch.call(null, this, b)
  }, b = function(b, d) {
    var e = null;
    1 < arguments.length && (e = cljs.core.array_seq(Array.prototype.slice.call(arguments, 1), 0));
    return a.call(this, b, e)
  };
  b.cljs$lang$maxFixedArity = 1;
  b.cljs$lang$applyTo = function(b) {
    var d = cljs.core.first(b);
    b = cljs.core.rest(b);
    return a(d, b)
  };
  b.cljs$core$IFn$_invoke$arity$variadic = a;
  return b
}();
cljs.core.MultiFn.prototype.apply = function(a, b) {
  return cljs.core._dispatch.call(null, this, b)
};
cljs.core.remove_all_methods = function(a) {
  return cljs.core._reset.call(null, a)
};
cljs.core.remove_method = function(a, b) {
  return cljs.core._remove_method.call(null, a, b)
};
cljs.core.prefer_method = function(a, b, c) {
  return cljs.core._prefer_method.call(null, a, b, c)
};
cljs.core.methods$ = function(a) {
  return cljs.core._methods.call(null, a)
};
cljs.core.get_method = function(a, b) {
  return cljs.core._get_method.call(null, a, b)
};
cljs.core.prefers = function(a) {
  return cljs.core._prefers.call(null, a)
};
cljs.core.UUID = function(a) {
  this.uuid = a;
  this.cljs$lang$protocol_mask$partition1$ = 0;
  this.cljs$lang$protocol_mask$partition0$ = 2153775104
};
cljs.core.UUID.cljs$lang$type = !0;
cljs.core.UUID.cljs$lang$ctorStr = "cljs.core/UUID";
cljs.core.UUID.cljs$lang$ctorPrWriter = function(a, b, c) {
  return cljs.core._write.call(null, b, "cljs.core/UUID")
};
cljs.core.UUID.prototype.cljs$core$IHash$_hash$arity$1 = function(a) {
  return goog.string.hashCode(cljs.core.pr_str.call(null, this))
};
cljs.core.UUID.prototype.cljs$core$IPrintWithWriter$_pr_writer$arity$3 = function(a, b, c) {
  return cljs.core._write.call(null, b, [cljs.core.str('#uuid "'), cljs.core.str(this.uuid), cljs.core.str('"')].join(""))
};
cljs.core.UUID.prototype.cljs$core$IEquiv$_equiv$arity$2 = function(a, b) {
  return b instanceof cljs.core.UUID && this.uuid === b.uuid
};
cljs.core.__GT_UUID = function(a) {
  return new cljs.core.UUID(a)
};
cljs.core.ExceptionInfo = function(a, b, c) {
  this.message = a;
  this.data = b;
  this.cause = c
};
cljs.core.ExceptionInfo.cljs$lang$type = !0;
cljs.core.ExceptionInfo.cljs$lang$ctorStr = "cljs.core/ExceptionInfo";
cljs.core.ExceptionInfo.cljs$lang$ctorPrWriter = function(a, b, c) {
  return cljs.core._write.call(null, b, "cljs.core/ExceptionInfo")
};
cljs.core.__GT_ExceptionInfo = function(a, b, c) {
  return new cljs.core.ExceptionInfo(a, b, c)
};
cljs.core.ExceptionInfo.prototype = Error();
cljs.core.ExceptionInfo.prototype.constructor = cljs.core.ExceptionInfo;
cljs.core.ex_info = function() {
  var a = null, b = function(a, b) {
    return new cljs.core.ExceptionInfo(a, b, null)
  }, c = function(a, b, c) {
    return new cljs.core.ExceptionInfo(a, b, c)
  }, a = function(a, e, f) {
    switch(arguments.length) {
      case 2:
        return b.call(this, a, e);
      case 3:
        return c.call(this, a, e, f)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$core$IFn$_invoke$arity$2 = b;
  a.cljs$core$IFn$_invoke$arity$3 = c;
  return a
}();
cljs.core.ex_data = function(a) {
  return a instanceof cljs.core.ExceptionInfo ? a.data : null
};
cljs.core.ex_message = function(a) {
  return a instanceof Error ? a.message : null
};
cljs.core.ex_cause = function(a) {
  return a instanceof cljs.core.ExceptionInfo ? a.cause : null
};
cljs.core.comparator = function(a) {
  return function(b, c) {
    return cljs.core.truth_(a.call(null, b, c)) ? -1 : cljs.core.truth_(a.call(null, c, b)) ? 1 : new cljs.core.Keyword(null, "else", "else", 1017020587) ? 0 : null
  }
};
cljs.core.special_symbol_QMARK_ = function(a) {
  return cljs.core.contains_QMARK_.call(null, cljs.core.PersistentHashSet.fromArray([new cljs.core.Symbol(null, "deftype*", "deftype*", -978581244, null), null, new cljs.core.Symbol(null, "new", "new", -1640422567, null), null, new cljs.core.Symbol(null, "quote", "quote", -1532577739, null), null, new cljs.core.Symbol(null, "\x26", "\x26", -1640531489, null), null, new cljs.core.Symbol(null, "set!", "set!", -1637004872, null), null, new cljs.core.Symbol(null, "recur", "recur", -1532142362, null), 
  null, new cljs.core.Symbol(null, ".", ".", -1640531481, null), null, new cljs.core.Symbol(null, "ns", "ns", -1640528002, null), null, new cljs.core.Symbol(null, "do", "do", -1640528316, null), null, new cljs.core.Symbol(null, "fn*", "fn*", -1640430053, null), null, new cljs.core.Symbol(null, "throw", "throw", -1530191713, null), null, new cljs.core.Symbol(null, "letfn*", "letfn*", 1548249632, null), null, new cljs.core.Symbol(null, "js*", "js*", -1640426054, null), null, new cljs.core.Symbol(null, 
  "defrecord*", "defrecord*", 774272013, null), null, new cljs.core.Symbol(null, "let*", "let*", -1637213400, null), null, new cljs.core.Symbol(null, "loop*", "loop*", -1537374273, null), null, new cljs.core.Symbol(null, "try", "try", -1640416396, null), null, new cljs.core.Symbol(null, "if", "if", -1640528170, null), null, new cljs.core.Symbol(null, "def", "def", -1640432194, null), null], !0), a)
};
cljs.core.async = {};
cljs.core.async.impl = {};
cljs.core.async.impl.protocols = {};
cljs.core.async.impl.protocols.MAX_QUEUE_SIZE = 1024;
cljs.core.async.impl.protocols.ReadPort = {};
cljs.core.async.impl.protocols.take_BANG_ = function(a, b) {
  if(a ? a.cljs$core$async$impl$protocols$ReadPort$take_BANG_$arity$2 : a) {
    return a.cljs$core$async$impl$protocols$ReadPort$take_BANG_$arity$2(a, b)
  }
  var c;
  c = cljs.core.async.impl.protocols.take_BANG_[goog.typeOf(null == a ? null : a)];
  if(!c && (c = cljs.core.async.impl.protocols.take_BANG_._, !c)) {
    throw cljs.core.missing_protocol.call(null, "ReadPort.take!", a);
  }
  return c.call(null, a, b)
};
cljs.core.async.impl.protocols.WritePort = {};
cljs.core.async.impl.protocols.put_BANG_ = function(a, b, c) {
  if(a ? a.cljs$core$async$impl$protocols$WritePort$put_BANG_$arity$3 : a) {
    return a.cljs$core$async$impl$protocols$WritePort$put_BANG_$arity$3(a, b, c)
  }
  var d;
  d = cljs.core.async.impl.protocols.put_BANG_[goog.typeOf(null == a ? null : a)];
  if(!d && (d = cljs.core.async.impl.protocols.put_BANG_._, !d)) {
    throw cljs.core.missing_protocol.call(null, "WritePort.put!", a);
  }
  return d.call(null, a, b, c)
};
cljs.core.async.impl.protocols.Channel = {};
cljs.core.async.impl.protocols.close_BANG_ = function(a) {
  if(a ? a.cljs$core$async$impl$protocols$Channel$close_BANG_$arity$1 : a) {
    return a.cljs$core$async$impl$protocols$Channel$close_BANG_$arity$1(a)
  }
  var b;
  b = cljs.core.async.impl.protocols.close_BANG_[goog.typeOf(null == a ? null : a)];
  if(!b && (b = cljs.core.async.impl.protocols.close_BANG_._, !b)) {
    throw cljs.core.missing_protocol.call(null, "Channel.close!", a);
  }
  return b.call(null, a)
};
cljs.core.async.impl.protocols.Handler = {};
cljs.core.async.impl.protocols.active_QMARK_ = function(a) {
  if(a ? a.cljs$core$async$impl$protocols$Handler$active_QMARK_$arity$1 : a) {
    return a.cljs$core$async$impl$protocols$Handler$active_QMARK_$arity$1(a)
  }
  var b;
  b = cljs.core.async.impl.protocols.active_QMARK_[goog.typeOf(null == a ? null : a)];
  if(!b && (b = cljs.core.async.impl.protocols.active_QMARK_._, !b)) {
    throw cljs.core.missing_protocol.call(null, "Handler.active?", a);
  }
  return b.call(null, a)
};
cljs.core.async.impl.protocols.commit = function(a) {
  if(a ? a.cljs$core$async$impl$protocols$Handler$commit$arity$1 : a) {
    return a.cljs$core$async$impl$protocols$Handler$commit$arity$1(a)
  }
  var b;
  b = cljs.core.async.impl.protocols.commit[goog.typeOf(null == a ? null : a)];
  if(!b && (b = cljs.core.async.impl.protocols.commit._, !b)) {
    throw cljs.core.missing_protocol.call(null, "Handler.commit", a);
  }
  return b.call(null, a)
};
cljs.core.async.impl.protocols.Buffer = {};
cljs.core.async.impl.protocols.full_QMARK_ = function(a) {
  if(a ? a.cljs$core$async$impl$protocols$Buffer$full_QMARK_$arity$1 : a) {
    return a.cljs$core$async$impl$protocols$Buffer$full_QMARK_$arity$1(a)
  }
  var b;
  b = cljs.core.async.impl.protocols.full_QMARK_[goog.typeOf(null == a ? null : a)];
  if(!b && (b = cljs.core.async.impl.protocols.full_QMARK_._, !b)) {
    throw cljs.core.missing_protocol.call(null, "Buffer.full?", a);
  }
  return b.call(null, a)
};
cljs.core.async.impl.protocols.remove_BANG_ = function(a) {
  if(a ? a.cljs$core$async$impl$protocols$Buffer$remove_BANG_$arity$1 : a) {
    return a.cljs$core$async$impl$protocols$Buffer$remove_BANG_$arity$1(a)
  }
  var b;
  b = cljs.core.async.impl.protocols.remove_BANG_[goog.typeOf(null == a ? null : a)];
  if(!b && (b = cljs.core.async.impl.protocols.remove_BANG_._, !b)) {
    throw cljs.core.missing_protocol.call(null, "Buffer.remove!", a);
  }
  return b.call(null, a)
};
cljs.core.async.impl.protocols.add_BANG_ = function(a, b) {
  if(a ? a.cljs$core$async$impl$protocols$Buffer$add_BANG_$arity$2 : a) {
    return a.cljs$core$async$impl$protocols$Buffer$add_BANG_$arity$2(a, b)
  }
  var c;
  c = cljs.core.async.impl.protocols.add_BANG_[goog.typeOf(null == a ? null : a)];
  if(!c && (c = cljs.core.async.impl.protocols.add_BANG_._, !c)) {
    throw cljs.core.missing_protocol.call(null, "Buffer.add!", a);
  }
  return c.call(null, a, b)
};
cljs.core.async.impl.protocols.UnblockingBuffer = {};
cljs.core.async.impl.ioc_helpers = {};
cljs.core.async.impl.ioc_helpers.FN_IDX = 0;
cljs.core.async.impl.ioc_helpers.STATE_IDX = 1;
cljs.core.async.impl.ioc_helpers.VALUE_IDX = 2;
cljs.core.async.impl.ioc_helpers.BINDINGS_IDX = 3;
cljs.core.async.impl.ioc_helpers.EXCEPTION_FRAMES = 4;
cljs.core.async.impl.ioc_helpers.CURRENT_EXCEPTION = 5;
cljs.core.async.impl.ioc_helpers.USER_START_IDX = 6;
cljs.core.async.impl.ioc_helpers.aset_object = function(a, b, c) {
  return a[b][c]
};
cljs.core.async.impl.ioc_helpers.aget_object = function(a, b) {
  return a[b]
};
cljs.core.async.impl.ioc_helpers.finished_QMARK_ = function(a) {
  return cljs.core.keyword_identical_QMARK_.call(null, a[cljs.core.async.impl.ioc_helpers.STATE_IDX], new cljs.core.Keyword(null, "finished", "finished", 4635210724))
};
cljs.core.async.impl.ioc_helpers.fn_handler = function fn_handler(b) {
  "undefined" === typeof cljs.core.async.impl.ioc_helpers.t20731 && (cljs.core.async.impl.ioc_helpers.t20731 = function(b, d, e) {
    this.f = b;
    this.fn_handler = d;
    this.meta20732 = e;
    this.cljs$lang$protocol_mask$partition1$ = 0;
    this.cljs$lang$protocol_mask$partition0$ = 393216
  }, cljs.core.async.impl.ioc_helpers.t20731.cljs$lang$type = !0, cljs.core.async.impl.ioc_helpers.t20731.cljs$lang$ctorStr = "cljs.core.async.impl.ioc-helpers/t20731", cljs.core.async.impl.ioc_helpers.t20731.cljs$lang$ctorPrWriter = function(b, d, e) {
    return cljs.core._write.call(null, d, "cljs.core.async.impl.ioc-helpers/t20731")
  }, cljs.core.async.impl.ioc_helpers.t20731.prototype.cljs$core$async$impl$protocols$Handler$ = !0, cljs.core.async.impl.ioc_helpers.t20731.prototype.cljs$core$async$impl$protocols$Handler$active_QMARK_$arity$1 = function(b) {
    return!0
  }, cljs.core.async.impl.ioc_helpers.t20731.prototype.cljs$core$async$impl$protocols$Handler$commit$arity$1 = function(b) {
    return this.f
  }, cljs.core.async.impl.ioc_helpers.t20731.prototype.cljs$core$IMeta$_meta$arity$1 = function(b) {
    return this.meta20732
  }, cljs.core.async.impl.ioc_helpers.t20731.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = function(b, d) {
    return new cljs.core.async.impl.ioc_helpers.t20731(this.f, this.fn_handler, d)
  }, cljs.core.async.impl.ioc_helpers.__GT_t20731 = function(b, d, e) {
    return new cljs.core.async.impl.ioc_helpers.t20731(b, d, e)
  });
  return new cljs.core.async.impl.ioc_helpers.t20731(b, fn_handler, null)
};
cljs.core.async.impl.ioc_helpers.run_state_machine = function(a) {
  return cljs.core.async.impl.ioc_helpers.aget_object.call(null, a, cljs.core.async.impl.ioc_helpers.FN_IDX).call(null, a)
};
cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped = function(a) {
  try {
    return cljs.core.async.impl.ioc_helpers.run_state_machine.call(null, a)
  }catch(b) {
    if(b instanceof Object) {
      throw cljs.core.async.impl.protocols.close_BANG_.call(null, cljs.core.async.impl.ioc_helpers.aget_object.call(null, a, cljs.core.async.impl.ioc_helpers.USER_START_IDX)), b;
    }
    if(new cljs.core.Keyword(null, "else", "else", 1017020587)) {
      throw b;
    }
    return null
  }
};
cljs.core.async.impl.ioc_helpers.take_BANG_ = function(a, b, c) {
  c = cljs.core.async.impl.protocols.take_BANG_.call(null, c, cljs.core.async.impl.ioc_helpers.fn_handler.call(null, function(c) {
    a[cljs.core.async.impl.ioc_helpers.VALUE_IDX] = c;
    a[cljs.core.async.impl.ioc_helpers.STATE_IDX] = b;
    return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null, a)
  }));
  return cljs.core.truth_(c) ? (a[cljs.core.async.impl.ioc_helpers.VALUE_IDX] = cljs.core.deref.call(null, c), a[cljs.core.async.impl.ioc_helpers.STATE_IDX] = b, new cljs.core.Keyword(null, "recur", "recur", 1122293407)) : null
};
cljs.core.async.impl.ioc_helpers.put_BANG_ = function(a, b, c, d) {
  c = cljs.core.async.impl.protocols.put_BANG_.call(null, c, d, cljs.core.async.impl.ioc_helpers.fn_handler.call(null, function() {
    a[cljs.core.async.impl.ioc_helpers.VALUE_IDX] = null;
    a[cljs.core.async.impl.ioc_helpers.STATE_IDX] = b;
    return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null, a)
  }));
  return cljs.core.truth_(c) ? (a[cljs.core.async.impl.ioc_helpers.VALUE_IDX] = cljs.core.deref.call(null, c), a[cljs.core.async.impl.ioc_helpers.STATE_IDX] = b, new cljs.core.Keyword(null, "recur", "recur", 1122293407)) : null
};
cljs.core.async.impl.ioc_helpers.ioc_alts_BANG_ = function() {
  var a = function(a, b, e, f) {
    f = cljs.core.seq_QMARK_.call(null, f) ? cljs.core.apply.call(null, cljs.core.hash_map, f) : f;
    a[cljs.core.async.impl.ioc_helpers.STATE_IDX] = b;
    b = cljs.core.async.do_alts.call(null, function(b) {
      a[cljs.core.async.impl.ioc_helpers.VALUE_IDX] = b;
      return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null, a)
    }, e, f);
    return cljs.core.truth_(b) ? (a[cljs.core.async.impl.ioc_helpers.VALUE_IDX] = cljs.core.deref.call(null, b), new cljs.core.Keyword(null, "recur", "recur", 1122293407)) : null
  }, b = function(b, d, e, f) {
    var g = null;
    3 < arguments.length && (g = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3), 0));
    return a.call(this, b, d, e, g)
  };
  b.cljs$lang$maxFixedArity = 3;
  b.cljs$lang$applyTo = function(b) {
    var d = cljs.core.first(b);
    b = cljs.core.next(b);
    var e = cljs.core.first(b);
    b = cljs.core.next(b);
    var f = cljs.core.first(b);
    b = cljs.core.rest(b);
    return a(d, e, f, b)
  };
  b.cljs$core$IFn$_invoke$arity$variadic = a;
  return b
}();
cljs.core.async.impl.ioc_helpers.return_chan = function(a, b) {
  var c = a[cljs.core.async.impl.ioc_helpers.USER_START_IDX];
  null != b && cljs.core.async.impl.protocols.put_BANG_.call(null, c, b, cljs.core.async.impl.ioc_helpers.fn_handler.call(null, function() {
    return null
  }));
  cljs.core.async.impl.protocols.close_BANG_.call(null, c);
  return c
};
cljs.core.async.impl.ioc_helpers.ExceptionFrame = function(a, b, c, d, e, f, g) {
  this.catch_block = a;
  this.catch_exception = b;
  this.finally_block = c;
  this.continue_block = d;
  this.prev = e;
  this.__meta = f;
  this.__extmap = g;
  this.cljs$lang$protocol_mask$partition1$ = 0;
  this.cljs$lang$protocol_mask$partition0$ = 2229667594;
  5 < arguments.length ? (this.__meta = f, this.__extmap = g) : this.__extmap = this.__meta = null
};
cljs.core.async.impl.ioc_helpers.ExceptionFrame.prototype.cljs$core$IHash$_hash$arity$1 = function(a) {
  a = this.__hash;
  return null != a ? a : this.__hash = a = cljs.core.hash_imap.call(null, this)
};
cljs.core.async.impl.ioc_helpers.ExceptionFrame.prototype.cljs$core$ILookup$_lookup$arity$2 = function(a, b) {
  return cljs.core._lookup.call(null, this, b, null)
};
cljs.core.async.impl.ioc_helpers.ExceptionFrame.prototype.cljs$core$ILookup$_lookup$arity$3 = function(a, b, c) {
  return cljs.core.keyword_identical_QMARK_.call(null, b, new cljs.core.Keyword(null, "catch-block", "catch-block", 2343862893)) ? this.catch_block : cljs.core.keyword_identical_QMARK_.call(null, b, new cljs.core.Keyword(null, "catch-exception", "catch-exception", 1686480687)) ? this.catch_exception : cljs.core.keyword_identical_QMARK_.call(null, b, new cljs.core.Keyword(null, "finally-block", "finally-block", 2846533429)) ? this.finally_block : cljs.core.keyword_identical_QMARK_.call(null, b, new cljs.core.Keyword(null, 
  "continue-block", "continue-block", 1486987097)) ? this.continue_block : cljs.core.keyword_identical_QMARK_.call(null, b, new cljs.core.Keyword(null, "prev", "prev", 1017353637)) ? this.prev : new cljs.core.Keyword(null, "else", "else", 1017020587) ? cljs.core.get.call(null, this.__extmap, b, c) : null
};
cljs.core.async.impl.ioc_helpers.ExceptionFrame.prototype.cljs$core$IAssociative$_assoc$arity$3 = function(a, b, c) {
  a = cljs.core.keyword_identical_QMARK_;
  return a.call(null, new cljs.core.Keyword(null, "catch-block", "catch-block", 2343862893), b) ? new cljs.core.async.impl.ioc_helpers.ExceptionFrame(c, this.catch_exception, this.finally_block, this.continue_block, this.prev, this.__meta, this.__extmap, null) : a.call(null, new cljs.core.Keyword(null, "catch-exception", "catch-exception", 1686480687), b) ? new cljs.core.async.impl.ioc_helpers.ExceptionFrame(this.catch_block, c, this.finally_block, this.continue_block, this.prev, this.__meta, this.__extmap, 
  null) : a.call(null, new cljs.core.Keyword(null, "finally-block", "finally-block", 2846533429), b) ? new cljs.core.async.impl.ioc_helpers.ExceptionFrame(this.catch_block, this.catch_exception, c, this.continue_block, this.prev, this.__meta, this.__extmap, null) : a.call(null, new cljs.core.Keyword(null, "continue-block", "continue-block", 1486987097), b) ? new cljs.core.async.impl.ioc_helpers.ExceptionFrame(this.catch_block, this.catch_exception, this.finally_block, c, this.prev, this.__meta, this.__extmap, 
  null) : a.call(null, new cljs.core.Keyword(null, "prev", "prev", 1017353637), b) ? new cljs.core.async.impl.ioc_helpers.ExceptionFrame(this.catch_block, this.catch_exception, this.finally_block, this.continue_block, c, this.__meta, this.__extmap, null) : new cljs.core.async.impl.ioc_helpers.ExceptionFrame(this.catch_block, this.catch_exception, this.finally_block, this.continue_block, this.prev, this.__meta, cljs.core.assoc.call(null, this.__extmap, b, c), null)
};
cljs.core.async.impl.ioc_helpers.ExceptionFrame.prototype.cljs$core$IPrintWithWriter$_pr_writer$arity$3 = function(a, b, c) {
  return cljs.core.pr_sequential_writer.call(null, b, function(a) {
    return cljs.core.pr_sequential_writer.call(null, b, cljs.core.pr_writer, "", " ", "", c, a)
  }, "#cljs.core.async.impl.ioc-helpers.ExceptionFrame{", ", ", "}", c, cljs.core.concat.call(null, cljs.core.PersistentVector.fromArray([cljs.core.PersistentVector.fromArray.call(null, [new cljs.core.Keyword(null, "catch-block", "catch-block", 2343862893), this.catch_block], !0), cljs.core.PersistentVector.fromArray.call(null, [new cljs.core.Keyword(null, "catch-exception", "catch-exception", 1686480687), this.catch_exception], !0), cljs.core.PersistentVector.fromArray.call(null, [new cljs.core.Keyword(null, 
  "finally-block", "finally-block", 2846533429), this.finally_block], !0), cljs.core.PersistentVector.fromArray.call(null, [new cljs.core.Keyword(null, "continue-block", "continue-block", 1486987097), this.continue_block], !0), cljs.core.PersistentVector.fromArray.call(null, [new cljs.core.Keyword(null, "prev", "prev", 1017353637), this.prev], !0)], !0), this.__extmap))
};
cljs.core.async.impl.ioc_helpers.ExceptionFrame.prototype.cljs$core$ICollection$_conj$arity$2 = function(a, b) {
  return cljs.core.vector_QMARK_.call(null, b) ? cljs.core._assoc.call(null, this, cljs.core._nth.call(null, b, 0), cljs.core._nth.call(null, b, 1)) : cljs.core.reduce.call(null, cljs.core._conj, this, b)
};
cljs.core.async.impl.ioc_helpers.ExceptionFrame.prototype.cljs$core$ISeqable$_seq$arity$1 = function(a) {
  return cljs.core.seq.call(null, cljs.core.concat.call(null, cljs.core.PersistentVector.fromArray([cljs.core.PersistentVector.fromArray.call(null, [new cljs.core.Keyword(null, "catch-block", "catch-block", 2343862893), this.catch_block], !0), cljs.core.PersistentVector.fromArray.call(null, [new cljs.core.Keyword(null, "catch-exception", "catch-exception", 1686480687), this.catch_exception], !0), cljs.core.PersistentVector.fromArray.call(null, [new cljs.core.Keyword(null, "finally-block", "finally-block", 
  2846533429), this.finally_block], !0), cljs.core.PersistentVector.fromArray.call(null, [new cljs.core.Keyword(null, "continue-block", "continue-block", 1486987097), this.continue_block], !0), cljs.core.PersistentVector.fromArray.call(null, [new cljs.core.Keyword(null, "prev", "prev", 1017353637), this.prev], !0)], !0), this.__extmap))
};
cljs.core.async.impl.ioc_helpers.ExceptionFrame.prototype.cljs$core$ICounted$_count$arity$1 = function(a) {
  return 5 + cljs.core.count.call(null, this.__extmap)
};
cljs.core.async.impl.ioc_helpers.ExceptionFrame.prototype.cljs$core$IEquiv$_equiv$arity$2 = function(a, b) {
  var c = this;
  return cljs.core.truth_(function() {
    if(cljs.core.truth_(b)) {
      var a = c.constructor === b.constructor;
      return a ? cljs.core.equiv_map.call(null, c, b) : a
    }
    return b
  }()) ? !0 : !1
};
cljs.core.async.impl.ioc_helpers.ExceptionFrame.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = function(a, b) {
  return new cljs.core.async.impl.ioc_helpers.ExceptionFrame(this.catch_block, this.catch_exception, this.finally_block, this.continue_block, this.prev, b, this.__extmap, this.__hash)
};
cljs.core.async.impl.ioc_helpers.ExceptionFrame.prototype.cljs$core$IMeta$_meta$arity$1 = function(a) {
  return this.__meta
};
cljs.core.async.impl.ioc_helpers.ExceptionFrame.prototype.cljs$core$IMap$_dissoc$arity$2 = function(a, b) {
  return cljs.core.contains_QMARK_.call(null, cljs.core.PersistentHashSet.fromArray([new cljs.core.Keyword(null, "finally-block", "finally-block", 2846533429), null, new cljs.core.Keyword(null, "catch-block", "catch-block", 2343862893), null, new cljs.core.Keyword(null, "catch-exception", "catch-exception", 1686480687), null, new cljs.core.Keyword(null, "continue-block", "continue-block", 1486987097), null, new cljs.core.Keyword(null, "prev", "prev", 1017353637), null], !0), b) ? cljs.core.dissoc.call(null, 
  cljs.core.with_meta.call(null, cljs.core.into.call(null, cljs.core.PersistentArrayMap.EMPTY, this), this.__meta), b) : new cljs.core.async.impl.ioc_helpers.ExceptionFrame(this.catch_block, this.catch_exception, this.finally_block, this.continue_block, this.prev, this.__meta, cljs.core.not_empty.call(null, cljs.core.dissoc.call(null, this.__extmap, b)), null)
};
cljs.core.async.impl.ioc_helpers.ExceptionFrame.cljs$lang$type = !0;
cljs.core.async.impl.ioc_helpers.ExceptionFrame.cljs$lang$ctorPrSeq = function(a) {
  return cljs.core._conj.call(null, cljs.core.List.EMPTY, "cljs.core.async.impl.ioc-helpers/ExceptionFrame")
};
cljs.core.async.impl.ioc_helpers.ExceptionFrame.cljs$lang$ctorPrWriter = function(a, b) {
  return cljs.core._write.call(null, b, "cljs.core.async.impl.ioc-helpers/ExceptionFrame")
};
cljs.core.async.impl.ioc_helpers.__GT_ExceptionFrame = function(a, b, c, d, e) {
  return new cljs.core.async.impl.ioc_helpers.ExceptionFrame(a, b, c, d, e)
};
cljs.core.async.impl.ioc_helpers.map__GT_ExceptionFrame = function(a) {
  return new cljs.core.async.impl.ioc_helpers.ExceptionFrame((new cljs.core.Keyword(null, "catch-block", "catch-block", 2343862893)).cljs$core$IFn$_invoke$arity$1(a), (new cljs.core.Keyword(null, "catch-exception", "catch-exception", 1686480687)).cljs$core$IFn$_invoke$arity$1(a), (new cljs.core.Keyword(null, "finally-block", "finally-block", 2846533429)).cljs$core$IFn$_invoke$arity$1(a), (new cljs.core.Keyword(null, "continue-block", "continue-block", 1486987097)).cljs$core$IFn$_invoke$arity$1(a), 
  (new cljs.core.Keyword(null, "prev", "prev", 1017353637)).cljs$core$IFn$_invoke$arity$1(a), null, cljs.core.dissoc.call(null, a, new cljs.core.Keyword(null, "catch-block", "catch-block", 2343862893), new cljs.core.Keyword(null, "catch-exception", "catch-exception", 1686480687), new cljs.core.Keyword(null, "finally-block", "finally-block", 2846533429), new cljs.core.Keyword(null, "continue-block", "continue-block", 1486987097), new cljs.core.Keyword(null, "prev", "prev", 1017353637)))
};
cljs.core.async.impl.ioc_helpers.add_exception_frame = function(a, b, c, d, e) {
  a[cljs.core.async.impl.ioc_helpers.EXCEPTION_FRAMES] = cljs.core.async.impl.ioc_helpers.__GT_ExceptionFrame.call(null, b, c, d, e, cljs.core.async.impl.ioc_helpers.aget_object.call(null, a, cljs.core.async.impl.ioc_helpers.EXCEPTION_FRAMES));
  return a
};
cljs.core.async.impl.ioc_helpers.process_exception = function(a) {
  for(;;) {
    var b = cljs.core.async.impl.ioc_helpers.aget_object.call(null, a, cljs.core.async.impl.ioc_helpers.EXCEPTION_FRAMES), c = (new cljs.core.Keyword(null, "catch-block", "catch-block", 2343862893)).cljs$core$IFn$_invoke$arity$1(b), d = (new cljs.core.Keyword(null, "catch-exception", "catch-exception", 1686480687)).cljs$core$IFn$_invoke$arity$1(b), e = cljs.core.async.impl.ioc_helpers.aget_object.call(null, a, cljs.core.async.impl.ioc_helpers.CURRENT_EXCEPTION);
    if(cljs.core.truth_(function() {
      var a = e;
      return cljs.core.truth_(a) ? cljs.core.not.call(null, b) : a
    }())) {
      throw e;
    }
    if(cljs.core.truth_(function() {
      var a = e;
      return cljs.core.truth_(a) ? (a = c, cljs.core.truth_(a) ? e instanceof d : a) : a
    }())) {
      return a[cljs.core.async.impl.ioc_helpers.STATE_IDX] = c, a[cljs.core.async.impl.ioc_helpers.VALUE_IDX] = e, a[cljs.core.async.impl.ioc_helpers.CURRENT_EXCEPTION] = null, a[cljs.core.async.impl.ioc_helpers.EXCEPTION_FRAMES] = cljs.core.assoc.call(null, b, new cljs.core.Keyword(null, "catch-block", "catch-block", 2343862893), null, new cljs.core.Keyword(null, "catch-exception", "catch-exception", 1686480687), null), a
    }
    if(cljs.core.truth_(function() {
      var a = e;
      return cljs.core.truth_(a) ? cljs.core.not.call(null, c) && cljs.core.not.call(null, (new cljs.core.Keyword(null, "finally-block", "finally-block", 2846533429)).cljs$core$IFn$_invoke$arity$1(b)) : a
    }())) {
      a[cljs.core.async.impl.ioc_helpers.EXCEPTION_FRAMES] = (new cljs.core.Keyword(null, "prev", "prev", 1017353637)).cljs$core$IFn$_invoke$arity$1(b)
    }else {
      if(cljs.core.truth_(function() {
        var a = e;
        return cljs.core.truth_(a) ? (a = cljs.core.not.call(null, c)) ? (new cljs.core.Keyword(null, "finally-block", "finally-block", 2846533429)).cljs$core$IFn$_invoke$arity$1(b) : a : a
      }()) || cljs.core.truth_(function() {
        var a = cljs.core.not.call(null, e);
        return a ? (new cljs.core.Keyword(null, "finally-block", "finally-block", 2846533429)).cljs$core$IFn$_invoke$arity$1(b) : a
      }())) {
        return a[cljs.core.async.impl.ioc_helpers.STATE_IDX] = (new cljs.core.Keyword(null, "finally-block", "finally-block", 2846533429)).cljs$core$IFn$_invoke$arity$1(b), a[cljs.core.async.impl.ioc_helpers.EXCEPTION_FRAMES] = cljs.core.assoc.call(null, b, new cljs.core.Keyword(null, "finally-block", "finally-block", 2846533429), null), a
      }
      if(cljs.core.not.call(null, e) && cljs.core.not.call(null, (new cljs.core.Keyword(null, "finally-block", "finally-block", 2846533429)).cljs$core$IFn$_invoke$arity$1(b))) {
        return a[cljs.core.async.impl.ioc_helpers.STATE_IDX] = (new cljs.core.Keyword(null, "continue-block", "continue-block", 1486987097)).cljs$core$IFn$_invoke$arity$1(b), a[cljs.core.async.impl.ioc_helpers.EXCEPTION_FRAMES] = (new cljs.core.Keyword(null, "prev", "prev", 1017353637)).cljs$core$IFn$_invoke$arity$1(b), a
      }
      if(new cljs.core.Keyword(null, "else", "else", 1017020587)) {
        throw Error([cljs.core.str("Assert failed: "), cljs.core.str("No matching clause"), cljs.core.str("\n"), cljs.core.str(cljs.core.pr_str.call(null, !1))].join(""));
      }
      return null
    }
  }
};
cljs.core.async.impl.buffers = {};
cljs.core.async.impl.buffers.acopy = function(a, b, c, d, e) {
  for(var f = 0;;) {
    if(f < e) {
      c[d + f] = a[b + f], f += 1
    }else {
      return null
    }
  }
};
cljs.core.async.impl.buffers.RingBuffer = function(a, b, c, d) {
  this.head = a;
  this.tail = b;
  this.length = c;
  this.arr = d
};
cljs.core.async.impl.buffers.RingBuffer.cljs$lang$type = !0;
cljs.core.async.impl.buffers.RingBuffer.cljs$lang$ctorStr = "cljs.core.async.impl.buffers/RingBuffer";
cljs.core.async.impl.buffers.RingBuffer.cljs$lang$ctorPrWriter = function(a, b, c) {
  return cljs.core._write.call(null, b, "cljs.core.async.impl.buffers/RingBuffer")
};
cljs.core.async.impl.buffers.RingBuffer.prototype.pop = function() {
  if(0 === this.length) {
    return null
  }
  var a = this.arr[this.tail];
  this.arr[this.tail] = null;
  this.tail = (this.tail + 1) % this.arr.length;
  this.length -= 1;
  return a
};
cljs.core.async.impl.buffers.RingBuffer.prototype.unshift = function(a) {
  this.arr[this.head] = a;
  this.head = (this.head + 1) % this.arr.length;
  this.length += 1;
  return null
};
cljs.core.async.impl.buffers.RingBuffer.prototype.unbounded_unshift = function(a) {
  this.length + 1 === this.arr.length && this.resize();
  return this.unshift(a)
};
cljs.core.async.impl.buffers.RingBuffer.prototype.resize = function() {
  var a = Array(2 * this.arr.length);
  return this.tail < this.head ? (cljs.core.async.impl.buffers.acopy.call(null, this.arr, this.tail, a, 0, this.length), this.tail = 0, this.head = this.length, this.arr = a) : this.tail > this.head ? (cljs.core.async.impl.buffers.acopy.call(null, this.arr, this.tail, a, 0, this.arr.length - this.tail), cljs.core.async.impl.buffers.acopy.call(null, this.arr, 0, a, this.arr.length - this.tail, this.head), this.tail = 0, this.head = this.length, this.arr = a) : this.tail === this.head ? (this.head = 
  this.tail = 0, this.arr = a) : null
};
cljs.core.async.impl.buffers.RingBuffer.prototype.cleanup = function(a) {
  for(var b = this.length, c = 0;;) {
    if(c < b) {
      var d = this.pop();
      a.call(null, d) && this.unshift(d);
      c += 1
    }else {
      return null
    }
  }
};
cljs.core.async.impl.buffers.__GT_RingBuffer = function(a, b, c, d) {
  return new cljs.core.async.impl.buffers.RingBuffer(a, b, c, d)
};
cljs.core.async.impl.buffers.ring_buffer = function(a) {
  if(!(0 < a)) {
    throw Error([cljs.core.str("Assert failed: "), cljs.core.str("Can't create a ring buffer of size 0"), cljs.core.str("\n"), cljs.core.str(cljs.core.pr_str.call(null, cljs.core.list(new cljs.core.Symbol(null, "\x3e", "\x3e", -1640531465, null), new cljs.core.Symbol(null, "n", "n", -1640531417, null), 0)))].join(""));
  }
  return new cljs.core.async.impl.buffers.RingBuffer(0, 0, 0, Array(a))
};
cljs.core.async.impl.buffers.FixedBuffer = function(a, b) {
  this.buf = a;
  this.n = b;
  this.cljs$lang$protocol_mask$partition1$ = 0;
  this.cljs$lang$protocol_mask$partition0$ = 2
};
cljs.core.async.impl.buffers.FixedBuffer.cljs$lang$type = !0;
cljs.core.async.impl.buffers.FixedBuffer.cljs$lang$ctorStr = "cljs.core.async.impl.buffers/FixedBuffer";
cljs.core.async.impl.buffers.FixedBuffer.cljs$lang$ctorPrWriter = function(a, b, c) {
  return cljs.core._write.call(null, b, "cljs.core.async.impl.buffers/FixedBuffer")
};
cljs.core.async.impl.buffers.FixedBuffer.prototype.cljs$core$ICounted$_count$arity$1 = function(a) {
  return this.buf.length
};
cljs.core.async.impl.buffers.FixedBuffer.prototype.cljs$core$async$impl$protocols$Buffer$ = !0;
cljs.core.async.impl.buffers.FixedBuffer.prototype.cljs$core$async$impl$protocols$Buffer$full_QMARK_$arity$1 = function(a) {
  return this.buf.length === this.n
};
cljs.core.async.impl.buffers.FixedBuffer.prototype.cljs$core$async$impl$protocols$Buffer$remove_BANG_$arity$1 = function(a) {
  return this.buf.pop()
};
cljs.core.async.impl.buffers.FixedBuffer.prototype.cljs$core$async$impl$protocols$Buffer$add_BANG_$arity$2 = function(a, b) {
  if(!cljs.core.not.call(null, cljs.core.async.impl.protocols.full_QMARK_.call(null, this))) {
    throw Error([cljs.core.str("Assert failed: "), cljs.core.str("Can't add to a full buffer"), cljs.core.str("\n"), cljs.core.str(cljs.core.pr_str.call(null, cljs.core.list(new cljs.core.Symbol(null, "not", "not", -1640422260, null), cljs.core.list(new cljs.core.Symbol("impl", "full?", "impl/full?", -1337857039, null), new cljs.core.Symbol(null, "this", "this", -1636972457, null)))))].join(""));
  }
  return this.buf.unshift(b)
};
cljs.core.async.impl.buffers.__GT_FixedBuffer = function(a, b) {
  return new cljs.core.async.impl.buffers.FixedBuffer(a, b)
};
cljs.core.async.impl.buffers.fixed_buffer = function(a) {
  return new cljs.core.async.impl.buffers.FixedBuffer(cljs.core.async.impl.buffers.ring_buffer.call(null, a), a)
};
cljs.core.async.impl.buffers.DroppingBuffer = function(a, b) {
  this.buf = a;
  this.n = b;
  this.cljs$lang$protocol_mask$partition1$ = 0;
  this.cljs$lang$protocol_mask$partition0$ = 2
};
cljs.core.async.impl.buffers.DroppingBuffer.cljs$lang$type = !0;
cljs.core.async.impl.buffers.DroppingBuffer.cljs$lang$ctorStr = "cljs.core.async.impl.buffers/DroppingBuffer";
cljs.core.async.impl.buffers.DroppingBuffer.cljs$lang$ctorPrWriter = function(a, b, c) {
  return cljs.core._write.call(null, b, "cljs.core.async.impl.buffers/DroppingBuffer")
};
cljs.core.async.impl.buffers.DroppingBuffer.prototype.cljs$core$ICounted$_count$arity$1 = function(a) {
  return this.buf.length
};
cljs.core.async.impl.buffers.DroppingBuffer.prototype.cljs$core$async$impl$protocols$Buffer$ = !0;
cljs.core.async.impl.buffers.DroppingBuffer.prototype.cljs$core$async$impl$protocols$Buffer$full_QMARK_$arity$1 = function(a) {
  return!1
};
cljs.core.async.impl.buffers.DroppingBuffer.prototype.cljs$core$async$impl$protocols$Buffer$remove_BANG_$arity$1 = function(a) {
  return this.buf.pop()
};
cljs.core.async.impl.buffers.DroppingBuffer.prototype.cljs$core$async$impl$protocols$Buffer$add_BANG_$arity$2 = function(a, b) {
  return this.buf.length === this.n ? null : this.buf.unshift(b)
};
cljs.core.async.impl.buffers.DroppingBuffer.prototype.cljs$core$async$impl$protocols$UnblockingBuffer$ = !0;
cljs.core.async.impl.buffers.__GT_DroppingBuffer = function(a, b) {
  return new cljs.core.async.impl.buffers.DroppingBuffer(a, b)
};
cljs.core.async.impl.buffers.dropping_buffer = function(a) {
  return new cljs.core.async.impl.buffers.DroppingBuffer(cljs.core.async.impl.buffers.ring_buffer.call(null, a), a)
};
cljs.core.async.impl.buffers.SlidingBuffer = function(a, b) {
  this.buf = a;
  this.n = b;
  this.cljs$lang$protocol_mask$partition1$ = 0;
  this.cljs$lang$protocol_mask$partition0$ = 2
};
cljs.core.async.impl.buffers.SlidingBuffer.cljs$lang$type = !0;
cljs.core.async.impl.buffers.SlidingBuffer.cljs$lang$ctorStr = "cljs.core.async.impl.buffers/SlidingBuffer";
cljs.core.async.impl.buffers.SlidingBuffer.cljs$lang$ctorPrWriter = function(a, b, c) {
  return cljs.core._write.call(null, b, "cljs.core.async.impl.buffers/SlidingBuffer")
};
cljs.core.async.impl.buffers.SlidingBuffer.prototype.cljs$core$ICounted$_count$arity$1 = function(a) {
  return this.buf.length
};
cljs.core.async.impl.buffers.SlidingBuffer.prototype.cljs$core$async$impl$protocols$Buffer$ = !0;
cljs.core.async.impl.buffers.SlidingBuffer.prototype.cljs$core$async$impl$protocols$Buffer$full_QMARK_$arity$1 = function(a) {
  return!1
};
cljs.core.async.impl.buffers.SlidingBuffer.prototype.cljs$core$async$impl$protocols$Buffer$remove_BANG_$arity$1 = function(a) {
  return this.buf.pop()
};
cljs.core.async.impl.buffers.SlidingBuffer.prototype.cljs$core$async$impl$protocols$Buffer$add_BANG_$arity$2 = function(a, b) {
  this.buf.length === this.n && cljs.core.async.impl.protocols.remove_BANG_.call(null, this);
  return this.buf.unshift(b)
};
cljs.core.async.impl.buffers.SlidingBuffer.prototype.cljs$core$async$impl$protocols$UnblockingBuffer$ = !0;
cljs.core.async.impl.buffers.__GT_SlidingBuffer = function(a, b) {
  return new cljs.core.async.impl.buffers.SlidingBuffer(a, b)
};
cljs.core.async.impl.buffers.sliding_buffer = function(a) {
  return new cljs.core.async.impl.buffers.SlidingBuffer(cljs.core.async.impl.buffers.ring_buffer.call(null, a), a)
};
cljs.core.async.impl.dispatch = {};
cljs.core.async.impl.dispatch.message_channel = null;
cljs.core.async.impl.dispatch.tasks = cljs.core.async.impl.buffers.ring_buffer.call(null, 32);
cljs.core.async.impl.dispatch.running_QMARK_ = !1;
cljs.core.async.impl.dispatch.queued_QMARK_ = !1;
cljs.core.async.impl.dispatch.TASK_BATCH_SIZE = 1024;
cljs.core.async.impl.dispatch.process_messages = function() {
  cljs.core.async.impl.dispatch.running_QMARK_ = !0;
  cljs.core.async.impl.dispatch.queued_QMARK_ = !1;
  for(var a = 0;;) {
    var b = cljs.core.async.impl.dispatch.tasks.pop();
    if(null != b && (b.call(null), a < cljs.core.async.impl.dispatch.TASK_BATCH_SIZE)) {
      a += 1;
      continue
    }
    break
  }
  cljs.core.async.impl.dispatch.running_QMARK_ = !1;
  return 0 < cljs.core.async.impl.dispatch.tasks.length ? cljs.core.async.impl.dispatch.queue_dispatcher.call(null) : null
};
"undefined" !== typeof MessageChannel && (cljs.core.async.impl.dispatch.message_channel = new MessageChannel, cljs.core.async.impl.dispatch.message_channel.port1.onmessage = function(a) {
  return cljs.core.async.impl.dispatch.process_messages.call(null)
});
cljs.core.async.impl.dispatch.queue_dispatcher = function() {
  if(cljs.core.truth_(function() {
    var a = cljs.core.async.impl.dispatch.queued_QMARK_;
    return a ? cljs.core.async.impl.dispatch.running_QMARK_ : a
  }())) {
    return null
  }
  cljs.core.async.impl.dispatch.queued_QMARK_ = !0;
  return"undefined" !== typeof MessageChannel ? cljs.core.async.impl.dispatch.message_channel.port2.postMessage(0) : "undefined" !== typeof setImmediate ? setImmediate(cljs.core.async.impl.dispatch.process_messages) : new cljs.core.Keyword(null, "else", "else", 1017020587) ? setTimeout(cljs.core.async.impl.dispatch.process_messages, 0) : null
};
cljs.core.async.impl.dispatch.run = function(a) {
  cljs.core.async.impl.dispatch.tasks.unbounded_unshift(a);
  return cljs.core.async.impl.dispatch.queue_dispatcher.call(null)
};
cljs.core.async.impl.dispatch.queue_delay = function(a, b) {
  return setTimeout(a, b)
};
cljs.core.async.impl.channels = {};
cljs.core.async.impl.channels.box = function box(b) {
  "undefined" === typeof cljs.core.async.impl.channels.t20720 && (cljs.core.async.impl.channels.t20720 = function(b, d, e) {
    this.val = b;
    this.box = d;
    this.meta20721 = e;
    this.cljs$lang$protocol_mask$partition1$ = 0;
    this.cljs$lang$protocol_mask$partition0$ = 425984
  }, cljs.core.async.impl.channels.t20720.cljs$lang$type = !0, cljs.core.async.impl.channels.t20720.cljs$lang$ctorStr = "cljs.core.async.impl.channels/t20720", cljs.core.async.impl.channels.t20720.cljs$lang$ctorPrWriter = function(b, d, e) {
    return cljs.core._write.call(null, d, "cljs.core.async.impl.channels/t20720")
  }, cljs.core.async.impl.channels.t20720.prototype.cljs$core$IDeref$_deref$arity$1 = function(b) {
    return this.val
  }, cljs.core.async.impl.channels.t20720.prototype.cljs$core$IMeta$_meta$arity$1 = function(b) {
    return this.meta20721
  }, cljs.core.async.impl.channels.t20720.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = function(b, d) {
    return new cljs.core.async.impl.channels.t20720(this.val, this.box, d)
  }, cljs.core.async.impl.channels.__GT_t20720 = function(b, d, e) {
    return new cljs.core.async.impl.channels.t20720(b, d, e)
  });
  return new cljs.core.async.impl.channels.t20720(b, box, null)
};
cljs.core.async.impl.channels.PutBox = function(a, b) {
  this.handler = a;
  this.val = b
};
cljs.core.async.impl.channels.PutBox.cljs$lang$type = !0;
cljs.core.async.impl.channels.PutBox.cljs$lang$ctorStr = "cljs.core.async.impl.channels/PutBox";
cljs.core.async.impl.channels.PutBox.cljs$lang$ctorPrWriter = function(a, b, c) {
  return cljs.core._write.call(null, b, "cljs.core.async.impl.channels/PutBox")
};
cljs.core.async.impl.channels.__GT_PutBox = function(a, b) {
  return new cljs.core.async.impl.channels.PutBox(a, b)
};
cljs.core.async.impl.channels.put_active_QMARK_ = function(a) {
  return cljs.core.async.impl.protocols.active_QMARK_.call(null, a.handler)
};
cljs.core.async.impl.channels.MAX_DIRTY = 64;
cljs.core.async.impl.channels.ManyToManyChannel = function(a, b, c, d, e, f) {
  this.takes = a;
  this.dirty_takes = b;
  this.puts = c;
  this.dirty_puts = d;
  this.buf = e;
  this.closed = f
};
cljs.core.async.impl.channels.ManyToManyChannel.cljs$lang$type = !0;
cljs.core.async.impl.channels.ManyToManyChannel.cljs$lang$ctorStr = "cljs.core.async.impl.channels/ManyToManyChannel";
cljs.core.async.impl.channels.ManyToManyChannel.cljs$lang$ctorPrWriter = function(a, b, c) {
  return cljs.core._write.call(null, b, "cljs.core.async.impl.channels/ManyToManyChannel")
};
cljs.core.async.impl.channels.ManyToManyChannel.prototype.cljs$core$async$impl$protocols$Channel$ = !0;
cljs.core.async.impl.channels.ManyToManyChannel.prototype.cljs$core$async$impl$protocols$Channel$close_BANG_$arity$1 = function(a) {
  if(!this.closed) {
    for(this.closed = !0;;) {
      if(a = this.takes.pop(), null != a) {
        if(cljs.core.async.impl.protocols.active_QMARK_.call(null, a)) {
          var b = cljs.core.async.impl.protocols.commit.call(null, a);
          cljs.core.async.impl.dispatch.run.call(null, function(a, b) {
            return function() {
              return a.call(null, null)
            }
          }(b, a))
        }
      }else {
        break
      }
    }
  }
  return null
};
cljs.core.async.impl.channels.ManyToManyChannel.prototype.cljs$core$async$impl$protocols$ReadPort$ = !0;
cljs.core.async.impl.channels.ManyToManyChannel.prototype.cljs$core$async$impl$protocols$ReadPort$take_BANG_$arity$2 = function(a, b) {
  if(cljs.core.async.impl.protocols.active_QMARK_.call(null, b)) {
    if(null != this.buf && 0 < cljs.core.count.call(null, this.buf)) {
      return cljs.core.async.impl.protocols.commit.call(null, b), cljs.core.async.impl.channels.box.call(null, cljs.core.async.impl.protocols.remove_BANG_.call(null, this.buf))
    }
    for(;;) {
      var c = this.puts.pop();
      if(null != c) {
        var d = c.handler, c = c.val;
        if(cljs.core.async.impl.protocols.active_QMARK_.call(null, d)) {
          return d = cljs.core.async.impl.protocols.commit.call(null, d), cljs.core.async.impl.protocols.commit.call(null, b), cljs.core.async.impl.dispatch.run.call(null, d), cljs.core.async.impl.channels.box.call(null, c)
        }
      }else {
        if(this.closed) {
          return cljs.core.async.impl.protocols.commit.call(null, b), cljs.core.async.impl.channels.box.call(null, null)
        }
        this.dirty_takes > cljs.core.async.impl.channels.MAX_DIRTY ? (this.dirty_takes = 0, this.takes.cleanup(cljs.core.async.impl.protocols.active_QMARK_)) : this.dirty_takes += 1;
        if(!(this.takes.length < cljs.core.async.impl.protocols.MAX_QUEUE_SIZE)) {
          throw Error([cljs.core.str("Assert failed: "), cljs.core.str([cljs.core.str("No more than "), cljs.core.str(cljs.core.async.impl.protocols.MAX_QUEUE_SIZE), cljs.core.str(" pending takes are allowed on a single channel.")].join("")), cljs.core.str("\n"), cljs.core.str(cljs.core.pr_str.call(null, cljs.core.list(new cljs.core.Symbol(null, "\x3c", "\x3c", -1640531467, null), cljs.core.list(new cljs.core.Symbol(null, ".-length", ".-length", 1395928862, null), new cljs.core.Symbol(null, "takes", 
          "takes", -1530407291, null)), new cljs.core.Symbol("impl", "MAX-QUEUE-SIZE", "impl/MAX-QUEUE-SIZE", -1989946393, null))))].join(""));
        }
        this.takes.unbounded_unshift(b);
        return null
      }
    }
  }else {
    return null
  }
};
cljs.core.async.impl.channels.ManyToManyChannel.prototype.cljs$core$async$impl$protocols$WritePort$ = !0;
cljs.core.async.impl.channels.ManyToManyChannel.prototype.cljs$core$async$impl$protocols$WritePort$put_BANG_$arity$3 = function(a, b, c) {
  if(null == b) {
    throw Error([cljs.core.str("Assert failed: "), cljs.core.str("Can't put nil in on a channel"), cljs.core.str("\n"), cljs.core.str(cljs.core.pr_str.call(null, cljs.core.list(new cljs.core.Symbol(null, "not", "not", -1640422260, null), cljs.core.list(new cljs.core.Symbol(null, "nil?", "nil?", -1637150201, null), new cljs.core.Symbol(null, "val", "val", -1640415014, null)))))].join(""));
  }
  if(this.closed || !cljs.core.async.impl.protocols.active_QMARK_.call(null, c)) {
    return cljs.core.async.impl.channels.box.call(null, null)
  }
  for(;;) {
    if(a = this.takes.pop(), null != a) {
      if(cljs.core.async.impl.protocols.active_QMARK_.call(null, a)) {
        var d = cljs.core.async.impl.protocols.commit.call(null, a);
        c = cljs.core.async.impl.protocols.commit.call(null, c);
        cljs.core.async.impl.dispatch.run.call(null, function(a, c, d) {
          return function() {
            return a.call(null, b)
          }
        }(d, c, a));
        return cljs.core.async.impl.channels.box.call(null, null)
      }
    }else {
      if(null == this.buf || cljs.core.async.impl.protocols.full_QMARK_.call(null, this.buf)) {
        this.dirty_puts > cljs.core.async.impl.channels.MAX_DIRTY ? (this.dirty_puts = 0, this.puts.cleanup(cljs.core.async.impl.channels.put_active_QMARK_)) : this.dirty_puts += 1;
        if(!(this.puts.length < cljs.core.async.impl.protocols.MAX_QUEUE_SIZE)) {
          throw Error([cljs.core.str("Assert failed: "), cljs.core.str([cljs.core.str("No more than "), cljs.core.str(cljs.core.async.impl.protocols.MAX_QUEUE_SIZE), cljs.core.str(" pending puts are allowed on a single channel."), cljs.core.str(" Consider using a windowed buffer.")].join("")), cljs.core.str("\n"), cljs.core.str(cljs.core.pr_str.call(null, cljs.core.list(new cljs.core.Symbol(null, "\x3c", "\x3c", -1640531467, null), cljs.core.list(new cljs.core.Symbol(null, ".-length", ".-length", 
          1395928862, null), new cljs.core.Symbol(null, "puts", "puts", -1637078787, null)), new cljs.core.Symbol("impl", "MAX-QUEUE-SIZE", "impl/MAX-QUEUE-SIZE", -1989946393, null))))].join(""));
        }
        this.puts.unbounded_unshift(new cljs.core.async.impl.channels.PutBox(c, b));
        return null
      }
      c = cljs.core.async.impl.protocols.commit.call(null, c);
      cljs.core.async.impl.protocols.add_BANG_.call(null, this.buf, b);
      return cljs.core.async.impl.channels.box.call(null, null)
    }
  }
};
cljs.core.async.impl.channels.__GT_ManyToManyChannel = function(a, b, c, d, e, f) {
  return new cljs.core.async.impl.channels.ManyToManyChannel(a, b, c, d, e, f)
};
cljs.core.async.impl.channels.chan = function(a) {
  return new cljs.core.async.impl.channels.ManyToManyChannel(cljs.core.async.impl.buffers.ring_buffer.call(null, 32), 0, cljs.core.async.impl.buffers.ring_buffer.call(null, 32), 0, a, null)
};
cljs.core.async.impl.timers = {};
cljs.core.async.impl.timers.MAX_LEVEL = 15;
cljs.core.async.impl.timers.P = 0.5;
cljs.core.async.impl.timers.random_level = function() {
  var a = null, b = function() {
    return a.call(null, 0)
  }, c = function(a) {
    for(;;) {
      if(Math.random() < cljs.core.async.impl.timers.P && a < cljs.core.async.impl.timers.MAX_LEVEL) {
        a += 1
      }else {
        return a
      }
    }
  }, a = function(a) {
    switch(arguments.length) {
      case 0:
        return b.call(this);
      case 1:
        return c.call(this, a)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$core$IFn$_invoke$arity$0 = b;
  a.cljs$core$IFn$_invoke$arity$1 = c;
  return a
}();
cljs.core.async.impl.timers.SkipListNode = function(a, b, c) {
  this.key = a;
  this.val = b;
  this.forward = c;
  this.cljs$lang$protocol_mask$partition1$ = 0;
  this.cljs$lang$protocol_mask$partition0$ = 2155872256
};
cljs.core.async.impl.timers.SkipListNode.cljs$lang$type = !0;
cljs.core.async.impl.timers.SkipListNode.cljs$lang$ctorStr = "cljs.core.async.impl.timers/SkipListNode";
cljs.core.async.impl.timers.SkipListNode.cljs$lang$ctorPrWriter = function(a, b, c) {
  return cljs.core._write.call(null, b, "cljs.core.async.impl.timers/SkipListNode")
};
cljs.core.async.impl.timers.SkipListNode.prototype.cljs$core$IPrintWithWriter$_pr_writer$arity$3 = function(a, b, c) {
  return cljs.core.pr_sequential_writer.call(null, b, cljs.core.pr_writer, "[", " ", "]", c, this)
};
cljs.core.async.impl.timers.SkipListNode.prototype.cljs$core$ISeqable$_seq$arity$1 = function(a) {
  return cljs.core._conj.call(null, cljs.core._conj.call(null, cljs.core.List.EMPTY, this.val), this.key)
};
cljs.core.async.impl.timers.__GT_SkipListNode = function(a, b, c) {
  return new cljs.core.async.impl.timers.SkipListNode(a, b, c)
};
cljs.core.async.impl.timers.skip_list_node = function() {
  var a = null, b = function(b) {
    return a.call(null, null, null, b)
  }, c = function(a, b, c) {
    c = Array(c + 1);
    for(var g = 0;;) {
      if(g < c.length) {
        c[g] = null, g += 1
      }else {
        break
      }
    }
    return new cljs.core.async.impl.timers.SkipListNode(a, b, c)
  }, a = function(a, e, f) {
    switch(arguments.length) {
      case 1:
        return b.call(this, a);
      case 3:
        return c.call(this, a, e, f)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$core$IFn$_invoke$arity$1 = b;
  a.cljs$core$IFn$_invoke$arity$3 = c;
  return a
}();
cljs.core.async.impl.timers.least_greater_node = function() {
  var a = null, b = function(b, c, f) {
    return a.call(null, b, c, f, null)
  }, c = function(a, b, c, g) {
    for(;;) {
      if(0 > c) {
        return a
      }
      a: {
        for(;;) {
          var h = a.forward[c];
          if(cljs.core.truth_(h)) {
            if(h.key < b) {
              a = h
            }else {
              break a
            }
          }else {
            break a
          }
        }
        a = void 0
      }
      null != g && (g[c] = a);
      c -= 1
    }
  }, a = function(a, e, f, g) {
    switch(arguments.length) {
      case 3:
        return b.call(this, a, e, f);
      case 4:
        return c.call(this, a, e, f, g)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$core$IFn$_invoke$arity$3 = b;
  a.cljs$core$IFn$_invoke$arity$4 = c;
  return a
}();
cljs.core.async.impl.timers.SkipList = function(a, b) {
  this.header = a;
  this.level = b;
  this.cljs$lang$protocol_mask$partition1$ = 0;
  this.cljs$lang$protocol_mask$partition0$ = 2155872256
};
cljs.core.async.impl.timers.SkipList.cljs$lang$type = !0;
cljs.core.async.impl.timers.SkipList.cljs$lang$ctorStr = "cljs.core.async.impl.timers/SkipList";
cljs.core.async.impl.timers.SkipList.cljs$lang$ctorPrWriter = function(a, b, c) {
  return cljs.core._write.call(null, b, "cljs.core.async.impl.timers/SkipList")
};
cljs.core.async.impl.timers.SkipList.prototype.cljs$core$IPrintWithWriter$_pr_writer$arity$3 = function(a, b, c) {
  return cljs.core.pr_sequential_writer.call(null, b, function(a) {
    return cljs.core.pr_sequential_writer.call(null, b, cljs.core.pr_writer, "", " ", "", c, a)
  }, "{", ", ", "}", c, this)
};
cljs.core.async.impl.timers.SkipList.prototype.cljs$core$ISeqable$_seq$arity$1 = function(a) {
  return function c(a) {
    return new cljs.core.LazySeq(null, function() {
      return null == a ? null : cljs.core.cons.call(null, cljs.core.PersistentVector.fromArray([a.key, a.val], !0), c.call(null, a.forward[0]))
    }, null, null)
  }.call(null, this.header.forward[0])
};
cljs.core.async.impl.timers.SkipList.prototype.put = function(a, b) {
  var c = Array(cljs.core.async.impl.timers.MAX_LEVEL), d = cljs.core.async.impl.timers.least_greater_node.call(null, this.header, a, this.level, c).forward[0];
  if(null != d && d.key === a) {
    return d.val = b
  }
  d = cljs.core.async.impl.timers.random_level.call(null);
  if(d > this.level) {
    for(var e = this.level + 1;;) {
      if(e <= d + 1) {
        c[e] = this.header, e += 1
      }else {
        break
      }
    }
    this.level = d
  }
  for(d = cljs.core.async.impl.timers.skip_list_node.call(null, a, b, Array(d));;) {
    return 0 <= this.level ? (c = c[0].forward, d.forward[0] = c[0], c[0] = d) : null
  }
};
cljs.core.async.impl.timers.SkipList.prototype.remove = function(a) {
  var b = Array(cljs.core.async.impl.timers.MAX_LEVEL), c = cljs.core.async.impl.timers.least_greater_node.call(null, this.header, a, this.level, b).forward[0];
  if(null != c && c.key === a) {
    for(a = 0;;) {
      if(a <= this.level) {
        var d = b[a].forward;
        d[a] === c && (d[a] = c.forward[a]);
        a += 1
      }else {
        break
      }
    }
    for(;;) {
      if(0 < this.level && null == this.header.forward[this.level]) {
        this.level -= 1
      }else {
        return null
      }
    }
  }else {
    return null
  }
};
cljs.core.async.impl.timers.SkipList.prototype.ceilingEntry = function(a) {
  for(var b = this.header, c = this.level;;) {
    if(0 > c) {
      return b === this.header ? null : b
    }
    var d;
    a: {
      for(d = b;;) {
        if(d = d.forward[c], null == d) {
          d = null;
          break a
        }else {
          if(d.key >= a) {
            break a
          }
        }
      }
      d = void 0
    }
    null != d ? (c -= 1, b = d) : c -= 1
  }
};
cljs.core.async.impl.timers.SkipList.prototype.floorEntry = function(a) {
  for(var b = this.header, c = this.level;;) {
    if(0 > c) {
      return b === this.header ? null : b
    }
    var d;
    a: {
      for(d = b;;) {
        var e = d.forward[c];
        if(null != e) {
          if(e.key > a) {
            break a
          }
          d = e
        }else {
          d = 0 === c ? d : null;
          break a
        }
      }
      d = void 0
    }
    cljs.core.truth_(d) ? (c -= 1, b = d) : c -= 1
  }
};
cljs.core.async.impl.timers.__GT_SkipList = function(a, b) {
  return new cljs.core.async.impl.timers.SkipList(a, b)
};
cljs.core.async.impl.timers.skip_list = function() {
  return new cljs.core.async.impl.timers.SkipList(cljs.core.async.impl.timers.skip_list_node.call(null, 0), 0)
};
cljs.core.async.impl.timers.timeouts_map = cljs.core.async.impl.timers.skip_list.call(null);
cljs.core.async.impl.timers.TIMEOUT_RESOLUTION_MS = 10;
cljs.core.async.impl.timers.timeout = function(a) {
  var b = (new Date).valueOf() + a, c = cljs.core.async.impl.timers.timeouts_map.ceilingEntry(b), c = cljs.core.truth_(cljs.core.truth_(c) ? c.key < b + cljs.core.async.impl.timers.TIMEOUT_RESOLUTION_MS : c) ? c.val : null;
  if(cljs.core.truth_(c)) {
    return c
  }
  var d = cljs.core.async.impl.channels.chan.call(null, null);
  cljs.core.async.impl.timers.timeouts_map.put(b, d);
  cljs.core.async.impl.dispatch.queue_delay.call(null, function() {
    cljs.core.async.impl.timers.timeouts_map.remove(b);
    return cljs.core.async.impl.protocols.close_BANG_.call(null, d)
  }, a);
  return d
};
cljs.core.async.fn_handler = function fn_handler$$0(b) {
  "undefined" === typeof cljs.core.async.t18169 && (cljs.core.async.t18169 = function(b, d, e) {
    this.f = b;
    this.fn_handler = d;
    this.meta18170 = e;
    this.cljs$lang$protocol_mask$partition1$ = 0;
    this.cljs$lang$protocol_mask$partition0$ = 393216
  }, cljs.core.async.t18169.cljs$lang$type = !0, cljs.core.async.t18169.cljs$lang$ctorStr = "cljs.core.async/t18169", cljs.core.async.t18169.cljs$lang$ctorPrWriter = function(b, d, e) {
    return cljs.core._write.call(null, d, "cljs.core.async/t18169")
  }, cljs.core.async.t18169.prototype.cljs$core$async$impl$protocols$Handler$ = !0, cljs.core.async.t18169.prototype.cljs$core$async$impl$protocols$Handler$active_QMARK_$arity$1 = function(b) {
    return!0
  }, cljs.core.async.t18169.prototype.cljs$core$async$impl$protocols$Handler$commit$arity$1 = function(b) {
    return this.f
  }, cljs.core.async.t18169.prototype.cljs$core$IMeta$_meta$arity$1 = function(b) {
    return this.meta18170
  }, cljs.core.async.t18169.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = function(b, d) {
    return new cljs.core.async.t18169(this.f, this.fn_handler, d)
  }, cljs.core.async.__GT_t18169 = function(b, d, e) {
    return new cljs.core.async.t18169(b, d, e)
  });
  return new cljs.core.async.t18169(b, fn_handler$$0, null)
};
cljs.core.async.buffer = function(a) {
  return cljs.core.async.impl.buffers.fixed_buffer.call(null, a)
};
cljs.core.async.dropping_buffer = function(a) {
  return cljs.core.async.impl.buffers.dropping_buffer.call(null, a)
};
cljs.core.async.sliding_buffer = function(a) {
  return cljs.core.async.impl.buffers.sliding_buffer.call(null, a)
};
cljs.core.async.unblocking_buffer_QMARK_ = function(a) {
  return a ? cljs.core.truth_(cljs.core.truth_(null) ? null : a.cljs$core$async$impl$protocols$UnblockingBuffer$) ? !0 : a.cljs$lang$protocol_mask$partition$ ? !1 : cljs.core.native_satisfies_QMARK_.call(null, cljs.core.async.impl.protocols.UnblockingBuffer, a) : cljs.core.native_satisfies_QMARK_.call(null, cljs.core.async.impl.protocols.UnblockingBuffer, a)
};
cljs.core.async.chan = function() {
  var a = null, b = function() {
    return a.call(null, null)
  }, c = function(a) {
    a = cljs.core._EQ_.call(null, a, 0) ? null : a;
    return cljs.core.async.impl.channels.chan.call(null, "number" === typeof a ? cljs.core.async.buffer.call(null, a) : a)
  }, a = function(a) {
    switch(arguments.length) {
      case 0:
        return b.call(this);
      case 1:
        return c.call(this, a)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$core$IFn$_invoke$arity$0 = b;
  a.cljs$core$IFn$_invoke$arity$1 = c;
  return a
}();
cljs.core.async.timeout = function(a) {
  return cljs.core.async.impl.timers.timeout.call(null, a)
};
cljs.core.async._LT__BANG_ = function(a) {
  throw Error([cljs.core.str("Assert failed: "), cljs.core.str("\x3c! used not in (go ...) block"), cljs.core.str("\n"), cljs.core.str(cljs.core.pr_str.call(null, null))].join(""));
};
cljs.core.async.take_BANG_ = function() {
  var a = null, b = function(b, c) {
    return a.call(null, b, c, !0)
  }, c = function(a, b, c) {
    a = cljs.core.async.impl.protocols.take_BANG_.call(null, a, cljs.core.async.fn_handler.call(null, b));
    if(cljs.core.truth_(a)) {
      var g = cljs.core.deref.call(null, a);
      cljs.core.truth_(c) ? b.call(null, g) : cljs.core.async.impl.dispatch.run.call(null, function() {
        return b.call(null, g)
      })
    }
    return null
  }, a = function(a, e, f) {
    switch(arguments.length) {
      case 2:
        return b.call(this, a, e);
      case 3:
        return c.call(this, a, e, f)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$core$IFn$_invoke$arity$2 = b;
  a.cljs$core$IFn$_invoke$arity$3 = c;
  return a
}();
cljs.core.async.nop = function() {
  return null
};
cljs.core.async._GT__BANG_ = function(a, b) {
  throw Error([cljs.core.str("Assert failed: "), cljs.core.str("\x3e! used not in (go ...) block"), cljs.core.str("\n"), cljs.core.str(cljs.core.pr_str.call(null, null))].join(""));
};
cljs.core.async.put_BANG_ = function() {
  var a = null, b = function(b, c) {
    return a.call(null, b, c, cljs.core.async.nop)
  }, c = function(b, c, d) {
    return a.call(null, b, c, d, !0)
  }, d = function(a, b, c, d) {
    a = cljs.core.async.impl.protocols.put_BANG_.call(null, a, b, cljs.core.async.fn_handler.call(null, c));
    cljs.core.truth_(cljs.core.truth_(a) ? cljs.core.not_EQ_.call(null, c, cljs.core.async.nop) : a) && (cljs.core.truth_(d) ? c.call(null) : cljs.core.async.impl.dispatch.run.call(null, c));
    return null
  }, a = function(a, f, g, h) {
    switch(arguments.length) {
      case 2:
        return b.call(this, a, f);
      case 3:
        return c.call(this, a, f, g);
      case 4:
        return d.call(this, a, f, g, h)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$core$IFn$_invoke$arity$2 = b;
  a.cljs$core$IFn$_invoke$arity$3 = c;
  a.cljs$core$IFn$_invoke$arity$4 = d;
  return a
}();
cljs.core.async.close_BANG_ = function(a) {
  return cljs.core.async.impl.protocols.close_BANG_.call(null, a)
};
cljs.core.async.random_array = function(a) {
  for(var b = Array(a), c = 0;;) {
    if(c < a) {
      b[c] = 0, c += 1
    }else {
      break
    }
  }
  for(c = 1;;) {
    if(cljs.core._EQ_.call(null, c, a)) {
      return b
    }
    var d = cljs.core.rand_int.call(null, c);
    b[c] = b[d];
    b[d] = c;
    c += 1
  }
};
cljs.core.async.alt_flag = function alt_flag() {
  var b = cljs.core.atom.call(null, !0);
  "undefined" === typeof cljs.core.async.t18182 && (cljs.core.async.t18182 = function(b, d, e) {
    this.flag = b;
    this.alt_flag = d;
    this.meta18183 = e;
    this.cljs$lang$protocol_mask$partition1$ = 0;
    this.cljs$lang$protocol_mask$partition0$ = 393216
  }, cljs.core.async.t18182.cljs$lang$type = !0, cljs.core.async.t18182.cljs$lang$ctorStr = "cljs.core.async/t18182", cljs.core.async.t18182.cljs$lang$ctorPrWriter = function(b, d, e) {
    return cljs.core._write.call(null, d, "cljs.core.async/t18182")
  }, cljs.core.async.t18182.prototype.cljs$core$async$impl$protocols$Handler$ = !0, cljs.core.async.t18182.prototype.cljs$core$async$impl$protocols$Handler$active_QMARK_$arity$1 = function(b) {
    return cljs.core.deref.call(null, this.flag)
  }, cljs.core.async.t18182.prototype.cljs$core$async$impl$protocols$Handler$commit$arity$1 = function(b) {
    cljs.core.reset_BANG_.call(null, this.flag, null);
    return!0
  }, cljs.core.async.t18182.prototype.cljs$core$IMeta$_meta$arity$1 = function(b) {
    return this.meta18183
  }, cljs.core.async.t18182.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = function(b, d) {
    return new cljs.core.async.t18182(this.flag, this.alt_flag, d)
  }, cljs.core.async.__GT_t18182 = function(b, d, e) {
    return new cljs.core.async.t18182(b, d, e)
  });
  return new cljs.core.async.t18182(b, alt_flag, null)
};
cljs.core.async.alt_handler = function alt_handler(b, c) {
  "undefined" === typeof cljs.core.async.t18188 && (cljs.core.async.t18188 = function(b, c, f, g) {
    this.cb = b;
    this.flag = c;
    this.alt_handler = f;
    this.meta18189 = g;
    this.cljs$lang$protocol_mask$partition1$ = 0;
    this.cljs$lang$protocol_mask$partition0$ = 393216
  }, cljs.core.async.t18188.cljs$lang$type = !0, cljs.core.async.t18188.cljs$lang$ctorStr = "cljs.core.async/t18188", cljs.core.async.t18188.cljs$lang$ctorPrWriter = function(b, c, f) {
    return cljs.core._write.call(null, c, "cljs.core.async/t18188")
  }, cljs.core.async.t18188.prototype.cljs$core$async$impl$protocols$Handler$ = !0, cljs.core.async.t18188.prototype.cljs$core$async$impl$protocols$Handler$active_QMARK_$arity$1 = function(b) {
    return cljs.core.async.impl.protocols.active_QMARK_.call(null, this.flag)
  }, cljs.core.async.t18188.prototype.cljs$core$async$impl$protocols$Handler$commit$arity$1 = function(b) {
    cljs.core.async.impl.protocols.commit.call(null, this.flag);
    return this.cb
  }, cljs.core.async.t18188.prototype.cljs$core$IMeta$_meta$arity$1 = function(b) {
    return this.meta18189
  }, cljs.core.async.t18188.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = function(b, c) {
    return new cljs.core.async.t18188(this.cb, this.flag, this.alt_handler, c)
  }, cljs.core.async.__GT_t18188 = function(b, c, f, g) {
    return new cljs.core.async.t18188(b, c, f, g)
  });
  return new cljs.core.async.t18188(c, b, alt_handler, null)
};
cljs.core.async.do_alts = function(a, b, c) {
  var d = cljs.core.async.alt_flag.call(null), e = cljs.core.count.call(null, b), f = cljs.core.async.random_array.call(null, e), g = (new cljs.core.Keyword(null, "priority", "priority", 4143410454)).cljs$core$IFn$_invoke$arity$1(c), h = function() {
    for(var c = 0;;) {
      if(c < e) {
        var h = cljs.core.truth_(g) ? c : f[c], k = cljs.core.nth.call(null, b, h), n = cljs.core.vector_QMARK_.call(null, k) ? k.call(null, 0) : null, p = cljs.core.truth_(n) ? function() {
          var b = k.call(null, 1);
          return cljs.core.async.impl.protocols.put_BANG_.call(null, n, b, cljs.core.async.alt_handler.call(null, d, function(b, c, d, e, f, g, k, h, n) {
            return function() {
              return a.call(null, cljs.core.PersistentVector.fromArray([null, f], !0))
            }
          }(c, b, h, k, n, d, e, f, g)))
        }() : cljs.core.async.impl.protocols.take_BANG_.call(null, k, cljs.core.async.alt_handler.call(null, d, function(b, c, d, e, f, g, k, h) {
          return function(b) {
            return a.call(null, cljs.core.PersistentVector.fromArray([b, d], !0))
          }
        }(c, h, k, n, d, e, f, g)));
        if(cljs.core.truth_(p)) {
          return cljs.core.async.impl.channels.box.call(null, cljs.core.PersistentVector.fromArray([cljs.core.deref.call(null, p), function() {
            var a = n;
            return cljs.core.truth_(a) ? a : k
          }()], !0))
        }
        c += 1
      }else {
        return null
      }
    }
  }();
  return cljs.core.truth_(h) ? h : cljs.core.contains_QMARK_.call(null, c, new cljs.core.Keyword(null, "default", "default", 2558708147)) ? (h = function() {
    var a = cljs.core.async.impl.protocols.active_QMARK_.call(null, d);
    return cljs.core.truth_(a) ? cljs.core.async.impl.protocols.commit.call(null, d) : a
  }(), cljs.core.truth_(h) ? cljs.core.async.impl.channels.box.call(null, cljs.core.PersistentVector.fromArray([(new cljs.core.Keyword(null, "default", "default", 2558708147)).cljs$core$IFn$_invoke$arity$1(c), new cljs.core.Keyword(null, "default", "default", 2558708147)], !0)) : null) : null
};
cljs.core.async.alts_BANG_ = function() {
  var a = function(a, b) {
    cljs.core.seq_QMARK_.call(null, b) && cljs.core.apply.call(null, cljs.core.hash_map, b);
    throw Error([cljs.core.str("Assert failed: "), cljs.core.str("alts! used not in (go ...) block"), cljs.core.str("\n"), cljs.core.str(cljs.core.pr_str.call(null, null))].join(""));
  }, b = function(b, d) {
    var e = null;
    1 < arguments.length && (e = cljs.core.array_seq(Array.prototype.slice.call(arguments, 1), 0));
    return a.call(this, b, e)
  };
  b.cljs$lang$maxFixedArity = 1;
  b.cljs$lang$applyTo = function(b) {
    var d = cljs.core.first(b);
    b = cljs.core.rest(b);
    return a(d, b)
  };
  b.cljs$core$IFn$_invoke$arity$variadic = a;
  return b
}();
cljs.core.async.map_LT_ = function map_LT_(b, c) {
  "undefined" === typeof cljs.core.async.t18204 && (cljs.core.async.t18204 = function(b, c, f, g) {
    this.ch = b;
    this.f = c;
    this.map_LT_ = f;
    this.meta18205 = g;
    this.cljs$lang$protocol_mask$partition1$ = 0;
    this.cljs$lang$protocol_mask$partition0$ = 393216
  }, cljs.core.async.t18204.cljs$lang$type = !0, cljs.core.async.t18204.cljs$lang$ctorStr = "cljs.core.async/t18204", cljs.core.async.t18204.cljs$lang$ctorPrWriter = function(b, c, f) {
    return cljs.core._write.call(null, c, "cljs.core.async/t18204")
  }, cljs.core.async.t18204.prototype.cljs$core$async$impl$protocols$WritePort$ = !0, cljs.core.async.t18204.prototype.cljs$core$async$impl$protocols$WritePort$put_BANG_$arity$3 = function(b, c, f) {
    return cljs.core.async.impl.protocols.put_BANG_.call(null, this.ch, c, f)
  }, cljs.core.async.t18204.prototype.cljs$core$async$impl$protocols$ReadPort$ = !0, cljs.core.async.t18204.prototype.cljs$core$async$impl$protocols$ReadPort$take_BANG_$arity$2 = function(b, c) {
    var f = this, g = this, h = cljs.core.async.impl.protocols.take_BANG_.call(null, f.ch, function() {
      "undefined" === typeof cljs.core.async.t18207 && (cljs.core.async.t18207 = function(b, c, d, e, f, g, h) {
        this.fn1 = b;
        this._ = c;
        this.meta18205 = d;
        this.ch = e;
        this.f = f;
        this.map_LT_ = g;
        this.meta18208 = h;
        this.cljs$lang$protocol_mask$partition1$ = 0;
        this.cljs$lang$protocol_mask$partition0$ = 393216
      }, cljs.core.async.t18207.cljs$lang$type = !0, cljs.core.async.t18207.cljs$lang$ctorStr = "cljs.core.async/t18207", cljs.core.async.t18207.cljs$lang$ctorPrWriter = function(b, c, d) {
        return cljs.core._write.call(null, c, "cljs.core.async/t18207")
      }, cljs.core.async.t18207.prototype.cljs$core$async$impl$protocols$Handler$ = !0, cljs.core.async.t18207.prototype.cljs$core$async$impl$protocols$Handler$active_QMARK_$arity$1 = function(b) {
        return cljs.core.async.impl.protocols.active_QMARK_.call(null, this.fn1)
      }, cljs.core.async.t18207.prototype.cljs$core$async$impl$protocols$Handler$lock_id$arity$1 = function(b) {
        return cljs.core.async.impl.protocols.lock_id.call(null, this.fn1)
      }, cljs.core.async.t18207.prototype.cljs$core$async$impl$protocols$Handler$commit$arity$1 = function(b) {
        var c = this;
        return function(b, d) {
          return function(d) {
            return b.call(null, null == d ? null : c.f.call(null, d))
          }
        }(cljs.core.async.impl.protocols.commit.call(null, c.fn1), this)
      }, cljs.core.async.t18207.prototype.cljs$core$IMeta$_meta$arity$1 = function(b) {
        return this.meta18208
      }, cljs.core.async.t18207.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = function(b, c) {
        return new cljs.core.async.t18207(this.fn1, this._, this.meta18205, this.ch, this.f, this.map_LT_, c)
      }, cljs.core.async.__GT_t18207 = function(b, c, d, e, f, g, h) {
        return new cljs.core.async.t18207(b, c, d, e, f, g, h)
      });
      return new cljs.core.async.t18207(c, g, f.meta18205, f.ch, f.f, f.map_LT_, null)
    }());
    return cljs.core.truth_(cljs.core.truth_(h) ? null != cljs.core.deref.call(null, h) : h) ? cljs.core.async.impl.channels.box.call(null, f.f.call(null, cljs.core.deref.call(null, h))) : h
  }, cljs.core.async.t18204.prototype.cljs$core$async$impl$protocols$Channel$ = !0, cljs.core.async.t18204.prototype.cljs$core$async$impl$protocols$Channel$close_BANG_$arity$1 = function(b) {
    return cljs.core.async.impl.protocols.close_BANG_.call(null, this.ch)
  }, cljs.core.async.t18204.prototype.cljs$core$IMeta$_meta$arity$1 = function(b) {
    return this.meta18205
  }, cljs.core.async.t18204.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = function(b, c) {
    return new cljs.core.async.t18204(this.ch, this.f, this.map_LT_, c)
  }, cljs.core.async.__GT_t18204 = function(b, c, f, g) {
    return new cljs.core.async.t18204(b, c, f, g)
  });
  return new cljs.core.async.t18204(c, b, map_LT_, null)
};
cljs.core.async.map_GT_ = function map_GT_(b, c) {
  "undefined" === typeof cljs.core.async.t18213 && (cljs.core.async.t18213 = function(b, c, f, g) {
    this.ch = b;
    this.f = c;
    this.map_GT_ = f;
    this.meta18214 = g;
    this.cljs$lang$protocol_mask$partition1$ = 0;
    this.cljs$lang$protocol_mask$partition0$ = 393216
  }, cljs.core.async.t18213.cljs$lang$type = !0, cljs.core.async.t18213.cljs$lang$ctorStr = "cljs.core.async/t18213", cljs.core.async.t18213.cljs$lang$ctorPrWriter = function(b, c, f) {
    return cljs.core._write.call(null, c, "cljs.core.async/t18213")
  }, cljs.core.async.t18213.prototype.cljs$core$async$impl$protocols$WritePort$ = !0, cljs.core.async.t18213.prototype.cljs$core$async$impl$protocols$WritePort$put_BANG_$arity$3 = function(b, c, f) {
    return cljs.core.async.impl.protocols.put_BANG_.call(null, this.ch, this.f.call(null, c), f)
  }, cljs.core.async.t18213.prototype.cljs$core$async$impl$protocols$ReadPort$ = !0, cljs.core.async.t18213.prototype.cljs$core$async$impl$protocols$ReadPort$take_BANG_$arity$2 = function(b, c) {
    return cljs.core.async.impl.protocols.take_BANG_.call(null, this.ch, c)
  }, cljs.core.async.t18213.prototype.cljs$core$async$impl$protocols$Channel$ = !0, cljs.core.async.t18213.prototype.cljs$core$async$impl$protocols$Channel$close_BANG_$arity$1 = function(b) {
    return cljs.core.async.impl.protocols.close_BANG_.call(null, this.ch)
  }, cljs.core.async.t18213.prototype.cljs$core$IMeta$_meta$arity$1 = function(b) {
    return this.meta18214
  }, cljs.core.async.t18213.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = function(b, c) {
    return new cljs.core.async.t18213(this.ch, this.f, this.map_GT_, c)
  }, cljs.core.async.__GT_t18213 = function(b, c, f, g) {
    return new cljs.core.async.t18213(b, c, f, g)
  });
  return new cljs.core.async.t18213(c, b, map_GT_, null)
};
cljs.core.async.filter_GT_ = function filter_GT_(b, c) {
  "undefined" === typeof cljs.core.async.t18219 && (cljs.core.async.t18219 = function(b, c, f, g) {
    this.ch = b;
    this.p = c;
    this.filter_GT_ = f;
    this.meta18220 = g;
    this.cljs$lang$protocol_mask$partition1$ = 0;
    this.cljs$lang$protocol_mask$partition0$ = 393216
  }, cljs.core.async.t18219.cljs$lang$type = !0, cljs.core.async.t18219.cljs$lang$ctorStr = "cljs.core.async/t18219", cljs.core.async.t18219.cljs$lang$ctorPrWriter = function(b, c, f) {
    return cljs.core._write.call(null, c, "cljs.core.async/t18219")
  }, cljs.core.async.t18219.prototype.cljs$core$async$impl$protocols$WritePort$ = !0, cljs.core.async.t18219.prototype.cljs$core$async$impl$protocols$WritePort$put_BANG_$arity$3 = function(b, c, f) {
    return cljs.core.truth_(this.p.call(null, c)) ? cljs.core.async.impl.protocols.put_BANG_.call(null, this.ch, c, f) : cljs.core.async.impl.channels.box.call(null, null)
  }, cljs.core.async.t18219.prototype.cljs$core$async$impl$protocols$ReadPort$ = !0, cljs.core.async.t18219.prototype.cljs$core$async$impl$protocols$ReadPort$take_BANG_$arity$2 = function(b, c) {
    return cljs.core.async.impl.protocols.take_BANG_.call(null, this.ch, c)
  }, cljs.core.async.t18219.prototype.cljs$core$async$impl$protocols$Channel$ = !0, cljs.core.async.t18219.prototype.cljs$core$async$impl$protocols$Channel$close_BANG_$arity$1 = function(b) {
    return cljs.core.async.impl.protocols.close_BANG_.call(null, this.ch)
  }, cljs.core.async.t18219.prototype.cljs$core$IMeta$_meta$arity$1 = function(b) {
    return this.meta18220
  }, cljs.core.async.t18219.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = function(b, c) {
    return new cljs.core.async.t18219(this.ch, this.p, this.filter_GT_, c)
  }, cljs.core.async.__GT_t18219 = function(b, c, f, g) {
    return new cljs.core.async.t18219(b, c, f, g)
  });
  return new cljs.core.async.t18219(c, b, filter_GT_, null)
};
cljs.core.async.remove_GT_ = function(a, b) {
  return cljs.core.async.filter_GT_.call(null, cljs.core.complement.call(null, a), b)
};
cljs.core.async.filter_LT_ = function() {
  var a = null, b = function(b, c) {
    return a.call(null, b, c, null)
  }, c = function(a, b, c) {
    var g = cljs.core.async.chan.call(null, c), h = cljs.core.async.chan.call(null, 1);
    cljs.core.async.impl.dispatch.run.call(null, function() {
      var c = function() {
        return function(a) {
          return function() {
            var b = null, c = function() {
              var a = Array(9);
              a[0] = b;
              a[1] = 1;
              return a
            }, d = function(b) {
              for(;;) {
                var c = function() {
                  try {
                    for(;;) {
                      var c = a.call(null, b);
                      if(!cljs.core.keyword_identical_QMARK_.call(null, c, new cljs.core.Keyword(null, "recur", "recur", 1122293407))) {
                        return c
                      }
                    }
                  }catch(d) {
                    if(d instanceof Object) {
                      return b[5] = d, cljs.core.async.impl.ioc_helpers.process_exception.call(null, b), new cljs.core.Keyword(null, "recur", "recur", 1122293407)
                    }
                    if(new cljs.core.Keyword(null, "else", "else", 1017020587)) {
                      throw d;
                    }
                    return null
                  }
                }();
                if(!cljs.core.keyword_identical_QMARK_.call(null, c, new cljs.core.Keyword(null, "recur", "recur", 1122293407))) {
                  return c
                }
              }
            }, b = function(a) {
              switch(arguments.length) {
                case 0:
                  return c.call(this);
                case 1:
                  return d.call(this, a)
              }
              throw Error("Invalid arity: " + arguments.length);
            };
            b.cljs$core$IFn$_invoke$arity$0 = c;
            b.cljs$core$IFn$_invoke$arity$1 = d;
            return b
          }()
        }(function(c) {
          var f = c[1];
          return 1 === f ? (c[2] = null, c[1] = 2, new cljs.core.Keyword(null, "recur", "recur", 1122293407)) : 2 === f ? cljs.core.async.impl.ioc_helpers.take_BANG_.call(null, c, 4, b) : 3 === f ? (f = c[2], cljs.core.async.impl.ioc_helpers.return_chan.call(null, c, f)) : 4 === f ? (f = c[7], f = c[2], c[7] = f, cljs.core.truth_(null == f) ? c[1] = 5 : c[1] = 6, new cljs.core.Keyword(null, "recur", "recur", 1122293407)) : 5 === f ? (f = cljs.core.async.close_BANG_.call(null, g), c[2] = f, c[1] = 
          7, new cljs.core.Keyword(null, "recur", "recur", 1122293407)) : 6 === f ? (f = c[7], f = a.call(null, f), cljs.core.truth_(f) ? c[1] = 8 : c[1] = 9, new cljs.core.Keyword(null, "recur", "recur", 1122293407)) : 7 === f ? (f = c[2], c[2] = f, c[1] = 3, new cljs.core.Keyword(null, "recur", "recur", 1122293407)) : 8 === f ? (f = c[7], cljs.core.async.impl.ioc_helpers.put_BANG_.call(null, c, 11, g, f)) : 9 === f ? (c[2] = null, c[1] = 10, new cljs.core.Keyword(null, "recur", "recur", 1122293407)) : 
          10 === f ? (c[8] = c[2], c[2] = null, c[1] = 2, new cljs.core.Keyword(null, "recur", "recur", 1122293407)) : 11 === f ? (f = c[2], c[2] = f, c[1] = 10, new cljs.core.Keyword(null, "recur", "recur", 1122293407)) : null
        })
      }(), f = function() {
        var a = c.call(null);
        a[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = h;
        return a
      }();
      return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null, f)
    });
    return g
  }, a = function(a, e, f) {
    switch(arguments.length) {
      case 2:
        return b.call(this, a, e);
      case 3:
        return c.call(this, a, e, f)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$core$IFn$_invoke$arity$2 = b;
  a.cljs$core$IFn$_invoke$arity$3 = c;
  return a
}();
cljs.core.async.remove_LT_ = function() {
  var a = null, b = function(b, c) {
    return a.call(null, b, c, null)
  }, c = function(a, b, c) {
    return cljs.core.async.filter_LT_.call(null, cljs.core.complement.call(null, a), b, c)
  }, a = function(a, e, f) {
    switch(arguments.length) {
      case 2:
        return b.call(this, a, e);
      case 3:
        return c.call(this, a, e, f)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$core$IFn$_invoke$arity$2 = b;
  a.cljs$core$IFn$_invoke$arity$3 = c;
  return a
}();
cljs.core.async.mapcat_STAR_ = function(a, b, c) {
  var d = cljs.core.async.chan.call(null, 1);
  cljs.core.async.impl.dispatch.run.call(null, function() {
    var e = function() {
      return function(a) {
        return function() {
          var b = null, c = function() {
            var a = Array(16);
            a[0] = b;
            a[1] = 1;
            return a
          }, d = function(b) {
            for(;;) {
              var c = function() {
                try {
                  for(;;) {
                    var c = a.call(null, b);
                    if(!cljs.core.keyword_identical_QMARK_.call(null, c, new cljs.core.Keyword(null, "recur", "recur", 1122293407))) {
                      return c
                    }
                  }
                }catch(d) {
                  if(d instanceof Object) {
                    return b[5] = d, cljs.core.async.impl.ioc_helpers.process_exception.call(null, b), new cljs.core.Keyword(null, "recur", "recur", 1122293407)
                  }
                  if(new cljs.core.Keyword(null, "else", "else", 1017020587)) {
                    throw d;
                  }
                  return null
                }
              }();
              if(!cljs.core.keyword_identical_QMARK_.call(null, c, new cljs.core.Keyword(null, "recur", "recur", 1122293407))) {
                return c
              }
            }
          }, b = function(a) {
            switch(arguments.length) {
              case 0:
                return c.call(this);
              case 1:
                return d.call(this, a)
            }
            throw Error("Invalid arity: " + arguments.length);
          };
          b.cljs$core$IFn$_invoke$arity$0 = c;
          b.cljs$core$IFn$_invoke$arity$1 = d;
          return b
        }()
      }(function(d) {
        var e = d[1];
        if(1 === e) {
          return d[2] = null, d[1] = 2, new cljs.core.Keyword(null, "recur", "recur", 1122293407)
        }
        if(2 === e) {
          return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null, d, 4, b)
        }
        if(3 === e) {
          return e = d[2], cljs.core.async.impl.ioc_helpers.return_chan.call(null, d, e)
        }
        if(4 === e) {
          return e = d[7], e = d[2], d[7] = e, cljs.core.truth_(null == e) ? d[1] = 5 : d[1] = 6, new cljs.core.Keyword(null, "recur", "recur", 1122293407)
        }
        if(5 === e) {
          return e = cljs.core.async.close_BANG_.call(null, c), d[2] = e, d[1] = 7, new cljs.core.Keyword(null, "recur", "recur", 1122293407)
        }
        if(6 === e) {
          var e = d[7], e = a.call(null, e), e = cljs.core.seq.call(null, e), f, m, k;
          d[8] = e;
          d[9] = 0;
          d[10] = 0;
          d[11] = null;
          d[2] = null;
          d[1] = 8;
          return new cljs.core.Keyword(null, "recur", "recur", 1122293407)
        }
        if(7 === e) {
          return e = d[2], d[2] = e, d[1] = 3, new cljs.core.Keyword(null, "recur", "recur", 1122293407)
        }
        if(8 === e) {
          return k = d[9], m = d[10], cljs.core.truth_(k < m) ? d[1] = 10 : d[1] = 11, new cljs.core.Keyword(null, "recur", "recur", 1122293407)
        }
        if(9 === e) {
          return d[12] = d[2], d[2] = null, d[1] = 2, new cljs.core.Keyword(null, "recur", "recur", 1122293407)
        }
        if(10 === e) {
          return k = d[9], f = d[11], e = cljs.core._nth.call(null, f, k), cljs.core.async.impl.ioc_helpers.put_BANG_.call(null, d, 13, c, e)
        }
        if(11 === e) {
          return e = d[8], m = d[13], e = cljs.core.seq.call(null, e), d[13] = e, d[1] = e ? 14 : 15, new cljs.core.Keyword(null, "recur", "recur", 1122293407)
        }
        if(12 === e) {
          return e = d[2], d[2] = e, d[1] = 9, new cljs.core.Keyword(null, "recur", "recur", 1122293407)
        }
        if(13 === e) {
          e = d[8];
          k = d[9];
          m = d[10];
          f = d[11];
          var n = d[2];
          d[8] = e;
          d[14] = n;
          d[9] = k + 1;
          d[10] = m;
          d[11] = f;
          d[2] = null;
          d[1] = 8;
          return new cljs.core.Keyword(null, "recur", "recur", 1122293407)
        }
        return 14 === e ? (m = d[13], e = cljs.core.chunked_seq_QMARK_.call(null, m), d[1] = e ? 17 : 18, new cljs.core.Keyword(null, "recur", "recur", 1122293407)) : 15 === e ? (d[2] = null, d[1] = 16, new cljs.core.Keyword(null, "recur", "recur", 1122293407)) : 16 === e ? (e = d[2], d[2] = e, d[1] = 12, new cljs.core.Keyword(null, "recur", "recur", 1122293407)) : 17 === e ? (m = d[13], e = cljs.core.chunk_first.call(null, m), m = cljs.core.chunk_rest.call(null, m), k = cljs.core.count.call(null, 
        e), d[8] = m, d[9] = 0, d[10] = k, d[11] = e, d[2] = null, d[1] = 8, new cljs.core.Keyword(null, "recur", "recur", 1122293407)) : 18 === e ? (m = d[13], e = cljs.core.first.call(null, m), cljs.core.async.impl.ioc_helpers.put_BANG_.call(null, d, 20, c, e)) : 19 === e ? (e = d[2], d[2] = e, d[1] = 16, new cljs.core.Keyword(null, "recur", "recur", 1122293407)) : 20 === e ? (m = d[13], k = d[2], e = cljs.core.next.call(null, m), d[8] = e, d[15] = k, d[9] = 0, d[10] = 0, d[11] = null, d[2] = null, 
        d[1] = 8, new cljs.core.Keyword(null, "recur", "recur", 1122293407)) : null
      })
    }(), f = function() {
      var a = e.call(null);
      a[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = d;
      return a
    }();
    return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null, f)
  });
  return d
};
cljs.core.async.mapcat_LT_ = function() {
  var a = null, b = function(b, c) {
    return a.call(null, b, c, null)
  }, c = function(a, b, c) {
    c = cljs.core.async.chan.call(null, c);
    cljs.core.async.mapcat_STAR_.call(null, a, b, c);
    return c
  }, a = function(a, e, f) {
    switch(arguments.length) {
      case 2:
        return b.call(this, a, e);
      case 3:
        return c.call(this, a, e, f)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$core$IFn$_invoke$arity$2 = b;
  a.cljs$core$IFn$_invoke$arity$3 = c;
  return a
}();
cljs.core.async.mapcat_GT_ = function() {
  var a = null, b = function(b, c) {
    return a.call(null, b, c, null)
  }, c = function(a, b, c) {
    c = cljs.core.async.chan.call(null, c);
    cljs.core.async.mapcat_STAR_.call(null, a, c, b);
    return c
  }, a = function(a, e, f) {
    switch(arguments.length) {
      case 2:
        return b.call(this, a, e);
      case 3:
        return c.call(this, a, e, f)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$core$IFn$_invoke$arity$2 = b;
  a.cljs$core$IFn$_invoke$arity$3 = c;
  return a
}();
cljs.core.async.pipe = function() {
  var a = null, b = function(b, c) {
    return a.call(null, b, c, !0)
  }, c = function(a, b, c) {
    var g = cljs.core.async.chan.call(null, 1);
    cljs.core.async.impl.dispatch.run.call(null, function() {
      var h = function() {
        return function(a) {
          return function() {
            var b = null, c = function() {
              var a = Array(9);
              a[0] = b;
              a[1] = 1;
              return a
            }, d = function(b) {
              for(;;) {
                var c = function() {
                  try {
                    for(;;) {
                      var c = a.call(null, b);
                      if(!cljs.core.keyword_identical_QMARK_.call(null, c, new cljs.core.Keyword(null, "recur", "recur", 1122293407))) {
                        return c
                      }
                    }
                  }catch(d) {
                    if(d instanceof Object) {
                      return b[5] = d, cljs.core.async.impl.ioc_helpers.process_exception.call(null, b), new cljs.core.Keyword(null, "recur", "recur", 1122293407)
                    }
                    if(new cljs.core.Keyword(null, "else", "else", 1017020587)) {
                      throw d;
                    }
                    return null
                  }
                }();
                if(!cljs.core.keyword_identical_QMARK_.call(null, c, new cljs.core.Keyword(null, "recur", "recur", 1122293407))) {
                  return c
                }
              }
            }, b = function(a) {
              switch(arguments.length) {
                case 0:
                  return c.call(this);
                case 1:
                  return d.call(this, a)
              }
              throw Error("Invalid arity: " + arguments.length);
            };
            b.cljs$core$IFn$_invoke$arity$0 = c;
            b.cljs$core$IFn$_invoke$arity$1 = d;
            return b
          }()
        }(function(g) {
          var k = g[1];
          return 1 === k ? (g[2] = null, g[1] = 2, new cljs.core.Keyword(null, "recur", "recur", 1122293407)) : 2 === k ? cljs.core.async.impl.ioc_helpers.take_BANG_.call(null, g, 4, a) : 3 === k ? (k = g[2], cljs.core.async.impl.ioc_helpers.return_chan.call(null, g, k)) : 4 === k ? (k = g[7], k = g[2], g[7] = k, cljs.core.truth_(null == k) ? g[1] = 5 : g[1] = 6, new cljs.core.Keyword(null, "recur", "recur", 1122293407)) : 5 === k ? (cljs.core.truth_(c) ? g[1] = 8 : g[1] = 9, new cljs.core.Keyword(null, 
          "recur", "recur", 1122293407)) : 6 === k ? (k = g[7], cljs.core.async.impl.ioc_helpers.put_BANG_.call(null, g, 11, b, k)) : 7 === k ? (k = g[2], g[2] = k, g[1] = 3, new cljs.core.Keyword(null, "recur", "recur", 1122293407)) : 8 === k ? (k = cljs.core.async.close_BANG_.call(null, b), g[2] = k, g[1] = 10, new cljs.core.Keyword(null, "recur", "recur", 1122293407)) : 9 === k ? (g[2] = null, g[1] = 10, new cljs.core.Keyword(null, "recur", "recur", 1122293407)) : 10 === k ? (k = g[2], g[2] = 
          k, g[1] = 7, new cljs.core.Keyword(null, "recur", "recur", 1122293407)) : 11 === k ? (g[8] = g[2], g[2] = null, g[1] = 2, new cljs.core.Keyword(null, "recur", "recur", 1122293407)) : null
        })
      }(), l = function() {
        var a = h.call(null);
        a[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = g;
        return a
      }();
      return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null, l)
    });
    return b
  }, a = function(a, e, f) {
    switch(arguments.length) {
      case 2:
        return b.call(this, a, e);
      case 3:
        return c.call(this, a, e, f)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$core$IFn$_invoke$arity$2 = b;
  a.cljs$core$IFn$_invoke$arity$3 = c;
  return a
}();
cljs.core.async.split = function() {
  var a = null, b = function(b, c) {
    return a.call(null, b, c, null, null)
  }, c = function(a, b, c, g) {
    var h = cljs.core.async.chan.call(null, c), l = cljs.core.async.chan.call(null, g), m = cljs.core.async.chan.call(null, 1);
    cljs.core.async.impl.dispatch.run.call(null, function() {
      var c = function() {
        return function(a) {
          return function() {
            var b = null, c = function() {
              var a = Array(10);
              a[0] = b;
              a[1] = 1;
              return a
            }, d = function(b) {
              for(;;) {
                var c = function() {
                  try {
                    for(;;) {
                      var c = a.call(null, b);
                      if(!cljs.core.keyword_identical_QMARK_.call(null, c, new cljs.core.Keyword(null, "recur", "recur", 1122293407))) {
                        return c
                      }
                    }
                  }catch(d) {
                    if(d instanceof Object) {
                      return b[5] = d, cljs.core.async.impl.ioc_helpers.process_exception.call(null, b), new cljs.core.Keyword(null, "recur", "recur", 1122293407)
                    }
                    if(new cljs.core.Keyword(null, "else", "else", 1017020587)) {
                      throw d;
                    }
                    return null
                  }
                }();
                if(!cljs.core.keyword_identical_QMARK_.call(null, c, new cljs.core.Keyword(null, "recur", "recur", 1122293407))) {
                  return c
                }
              }
            }, b = function(a) {
              switch(arguments.length) {
                case 0:
                  return c.call(this);
                case 1:
                  return d.call(this, a)
              }
              throw Error("Invalid arity: " + arguments.length);
            };
            b.cljs$core$IFn$_invoke$arity$0 = c;
            b.cljs$core$IFn$_invoke$arity$1 = d;
            return b
          }()
        }(function(c) {
          var f = c[1];
          if(1 === f) {
            return c[2] = null, c[1] = 2, new cljs.core.Keyword(null, "recur", "recur", 1122293407)
          }
          if(2 === f) {
            return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null, c, 4, b)
          }
          if(3 === f) {
            return f = c[2], cljs.core.async.impl.ioc_helpers.return_chan.call(null, c, f)
          }
          if(4 === f) {
            return f = c[7], f = c[2], c[7] = f, cljs.core.truth_(null == f) ? c[1] = 5 : c[1] = 6, new cljs.core.Keyword(null, "recur", "recur", 1122293407)
          }
          if(5 === f) {
            var g = cljs.core.async.close_BANG_.call(null, h), f = cljs.core.async.close_BANG_.call(null, l);
            c[8] = g;
            c[2] = f;
            c[1] = 7;
            return new cljs.core.Keyword(null, "recur", "recur", 1122293407)
          }
          return 6 === f ? (f = c[7], f = a.call(null, f), cljs.core.truth_(f) ? c[1] = 9 : c[1] = 10, new cljs.core.Keyword(null, "recur", "recur", 1122293407)) : 7 === f ? (f = c[2], c[2] = f, c[1] = 3, new cljs.core.Keyword(null, "recur", "recur", 1122293407)) : 8 === f ? (c[9] = c[2], c[2] = null, c[1] = 2, new cljs.core.Keyword(null, "recur", "recur", 1122293407)) : 9 === f ? (c[2] = h, c[1] = 11, new cljs.core.Keyword(null, "recur", "recur", 1122293407)) : 10 === f ? (c[2] = l, c[1] = 11, new cljs.core.Keyword(null, 
          "recur", "recur", 1122293407)) : 11 === f ? (f = c[7], g = c[2], cljs.core.async.impl.ioc_helpers.put_BANG_.call(null, c, 8, g, f)) : null
        })
      }(), f = function() {
        var a = c.call(null);
        a[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = m;
        return a
      }();
      return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null, f)
    });
    return cljs.core.PersistentVector.fromArray([h, l], !0)
  }, a = function(a, e, f, g) {
    switch(arguments.length) {
      case 2:
        return b.call(this, a, e);
      case 4:
        return c.call(this, a, e, f, g)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$core$IFn$_invoke$arity$2 = b;
  a.cljs$core$IFn$_invoke$arity$4 = c;
  return a
}();
cljs.core.async.reduce = function(a, b, c) {
  var d = cljs.core.async.chan.call(null, 1);
  cljs.core.async.impl.dispatch.run.call(null, function() {
    var e = function() {
      return function(a) {
        return function() {
          var b = null, c = function() {
            var a = Array(9);
            a[0] = b;
            a[1] = 1;
            return a
          }, d = function(b) {
            for(;;) {
              var c = function() {
                try {
                  for(;;) {
                    var c = a.call(null, b);
                    if(!cljs.core.keyword_identical_QMARK_.call(null, c, new cljs.core.Keyword(null, "recur", "recur", 1122293407))) {
                      return c
                    }
                  }
                }catch(d) {
                  if(d instanceof Object) {
                    return b[5] = d, cljs.core.async.impl.ioc_helpers.process_exception.call(null, b), new cljs.core.Keyword(null, "recur", "recur", 1122293407)
                  }
                  if(new cljs.core.Keyword(null, "else", "else", 1017020587)) {
                    throw d;
                  }
                  return null
                }
              }();
              if(!cljs.core.keyword_identical_QMARK_.call(null, c, new cljs.core.Keyword(null, "recur", "recur", 1122293407))) {
                return c
              }
            }
          }, b = function(a) {
            switch(arguments.length) {
              case 0:
                return c.call(this);
              case 1:
                return d.call(this, a)
            }
            throw Error("Invalid arity: " + arguments.length);
          };
          b.cljs$core$IFn$_invoke$arity$0 = c;
          b.cljs$core$IFn$_invoke$arity$1 = d;
          return b
        }()
      }(function(d) {
        var e = d[1];
        return 7 === e ? (e = d, e[2] = d[2], e[1] = 3, new cljs.core.Keyword(null, "recur", "recur", 1122293407)) : 6 === e ? (e = d[8], e = a.call(null, e, d[7]), d[8] = e, d[2] = null, d[1] = 2, new cljs.core.Keyword(null, "recur", "recur", 1122293407)) : 5 === e ? (e = d[8], d[2] = e, d[1] = 7, new cljs.core.Keyword(null, "recur", "recur", 1122293407)) : 4 === e ? (e = d[2], d[7] = e, cljs.core.truth_(null == e) ? d[1] = 5 : d[1] = 6, new cljs.core.Keyword(null, "recur", "recur", 1122293407)) : 
        3 === e ? (e = d[2], cljs.core.async.impl.ioc_helpers.return_chan.call(null, d, e)) : 2 === e ? cljs.core.async.impl.ioc_helpers.take_BANG_.call(null, d, 4, c) : 1 === e ? (e = b, d[8] = e, d[2] = null, d[1] = 2, new cljs.core.Keyword(null, "recur", "recur", 1122293407)) : null
      })
    }(), f = function() {
      var a = e.call(null);
      a[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = d;
      return a
    }();
    return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null, f)
  });
  return d
};
cljs.core.async.onto_chan = function() {
  var a = null, b = function(b, c) {
    return a.call(null, b, c, !0)
  }, c = function(a, b, c) {
    var g = cljs.core.async.chan.call(null, 1);
    cljs.core.async.impl.dispatch.run.call(null, function() {
      var h = function() {
        return function(a) {
          return function() {
            var b = null, c = function() {
              var a = Array(9);
              a[0] = b;
              a[1] = 1;
              return a
            }, d = function(b) {
              for(;;) {
                var c = function() {
                  try {
                    for(;;) {
                      var c = a.call(null, b);
                      if(!cljs.core.keyword_identical_QMARK_.call(null, c, new cljs.core.Keyword(null, "recur", "recur", 1122293407))) {
                        return c
                      }
                    }
                  }catch(d) {
                    if(d instanceof Object) {
                      return b[5] = d, cljs.core.async.impl.ioc_helpers.process_exception.call(null, b), new cljs.core.Keyword(null, "recur", "recur", 1122293407)
                    }
                    if(new cljs.core.Keyword(null, "else", "else", 1017020587)) {
                      throw d;
                    }
                    return null
                  }
                }();
                if(!cljs.core.keyword_identical_QMARK_.call(null, c, new cljs.core.Keyword(null, "recur", "recur", 1122293407))) {
                  return c
                }
              }
            }, b = function(a) {
              switch(arguments.length) {
                case 0:
                  return c.call(this);
                case 1:
                  return d.call(this, a)
              }
              throw Error("Invalid arity: " + arguments.length);
            };
            b.cljs$core$IFn$_invoke$arity$0 = c;
            b.cljs$core$IFn$_invoke$arity$1 = d;
            return b
          }()
        }(function(g) {
          var k = g[1];
          if(1 === k) {
            return k = cljs.core.seq.call(null, b), g[7] = k, g[2] = null, g[1] = 2, new cljs.core.Keyword(null, "recur", "recur", 1122293407)
          }
          if(2 === k) {
            return k = g[7], cljs.core.truth_(k) ? g[1] = 4 : g[1] = 5, new cljs.core.Keyword(null, "recur", "recur", 1122293407)
          }
          if(3 === k) {
            return k = g[2], cljs.core.async.impl.ioc_helpers.return_chan.call(null, g, k)
          }
          if(4 === k) {
            return k = g[7], k = cljs.core.first.call(null, k), cljs.core.async.impl.ioc_helpers.put_BANG_.call(null, g, 7, a, k)
          }
          if(5 === k) {
            return cljs.core.truth_(c) ? g[1] = 8 : g[1] = 9, new cljs.core.Keyword(null, "recur", "recur", 1122293407)
          }
          if(6 === k) {
            return k = g[2], g[2] = k, g[1] = 3, new cljs.core.Keyword(null, "recur", "recur", 1122293407)
          }
          if(7 === k) {
            var k = g[7], h = g[2], k = cljs.core.next.call(null, k);
            g[8] = h;
            g[7] = k;
            g[2] = null;
            g[1] = 2;
            return new cljs.core.Keyword(null, "recur", "recur", 1122293407)
          }
          return 8 === k ? (k = cljs.core.async.close_BANG_.call(null, a), g[2] = k, g[1] = 10, new cljs.core.Keyword(null, "recur", "recur", 1122293407)) : 9 === k ? (g[2] = null, g[1] = 10, new cljs.core.Keyword(null, "recur", "recur", 1122293407)) : 10 === k ? (k = g[2], g[2] = k, g[1] = 6, new cljs.core.Keyword(null, "recur", "recur", 1122293407)) : null
        })
      }(), l = function() {
        var a = h.call(null);
        a[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = g;
        return a
      }();
      return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null, l)
    });
    return g
  }, a = function(a, e, f) {
    switch(arguments.length) {
      case 2:
        return b.call(this, a, e);
      case 3:
        return c.call(this, a, e, f)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$core$IFn$_invoke$arity$2 = b;
  a.cljs$core$IFn$_invoke$arity$3 = c;
  return a
}();
cljs.core.async.to_chan = function(a) {
  var b = cljs.core.async.chan.call(null, cljs.core.bounded_count.call(null, 100, a));
  cljs.core.async.onto_chan.call(null, b, a);
  return b
};
cljs.core.async.Mux = {};
cljs.core.async.muxch_STAR_ = function(a) {
  if(a ? a.cljs$core$async$Mux$muxch_STAR_$arity$1 : a) {
    return a.cljs$core$async$Mux$muxch_STAR_$arity$1(a)
  }
  var b;
  b = cljs.core.async.muxch_STAR_[goog.typeOf(null == a ? null : a)];
  if(!b && (b = cljs.core.async.muxch_STAR_._, !b)) {
    throw cljs.core.missing_protocol.call(null, "Mux.muxch*", a);
  }
  return b.call(null, a)
};
cljs.core.async.Mult = {};
cljs.core.async.tap_STAR_ = function(a, b, c) {
  if(a ? a.cljs$core$async$Mult$tap_STAR_$arity$3 : a) {
    return a.cljs$core$async$Mult$tap_STAR_$arity$3(a, b, c)
  }
  var d;
  d = cljs.core.async.tap_STAR_[goog.typeOf(null == a ? null : a)];
  if(!d && (d = cljs.core.async.tap_STAR_._, !d)) {
    throw cljs.core.missing_protocol.call(null, "Mult.tap*", a);
  }
  return d.call(null, a, b, c)
};
cljs.core.async.untap_STAR_ = function(a, b) {
  if(a ? a.cljs$core$async$Mult$untap_STAR_$arity$2 : a) {
    return a.cljs$core$async$Mult$untap_STAR_$arity$2(a, b)
  }
  var c;
  c = cljs.core.async.untap_STAR_[goog.typeOf(null == a ? null : a)];
  if(!c && (c = cljs.core.async.untap_STAR_._, !c)) {
    throw cljs.core.missing_protocol.call(null, "Mult.untap*", a);
  }
  return c.call(null, a, b)
};
cljs.core.async.untap_all_STAR_ = function(a) {
  if(a ? a.cljs$core$async$Mult$untap_all_STAR_$arity$1 : a) {
    return a.cljs$core$async$Mult$untap_all_STAR_$arity$1(a)
  }
  var b;
  b = cljs.core.async.untap_all_STAR_[goog.typeOf(null == a ? null : a)];
  if(!b && (b = cljs.core.async.untap_all_STAR_._, !b)) {
    throw cljs.core.missing_protocol.call(null, "Mult.untap-all*", a);
  }
  return b.call(null, a)
};
cljs.core.async.mult = function mult(b) {
  var c = cljs.core.atom.call(null, cljs.core.PersistentArrayMap.EMPTY), d = function() {
    "undefined" === typeof cljs.core.async.t19101 && (cljs.core.async.t19101 = function(b, c, d, e) {
      this.cs = b;
      this.ch = c;
      this.mult = d;
      this.meta19102 = e;
      this.cljs$lang$protocol_mask$partition1$ = 0;
      this.cljs$lang$protocol_mask$partition0$ = 393216
    }, cljs.core.async.t19101.cljs$lang$type = !0, cljs.core.async.t19101.cljs$lang$ctorStr = "cljs.core.async/t19101", cljs.core.async.t19101.cljs$lang$ctorPrWriter = function(b) {
      return function(b, c, d) {
        return cljs.core._write.call(null, c, "cljs.core.async/t19101")
      }
    }(c), cljs.core.async.t19101.prototype.cljs$core$async$Mult$ = !0, cljs.core.async.t19101.prototype.cljs$core$async$Mult$tap_STAR_$arity$3 = function(b) {
      return function(b, c, d) {
        cljs.core.swap_BANG_.call(null, this.cs, cljs.core.assoc, c, d);
        return null
      }
    }(c), cljs.core.async.t19101.prototype.cljs$core$async$Mult$untap_STAR_$arity$2 = function(b) {
      return function(b, c) {
        cljs.core.swap_BANG_.call(null, this.cs, cljs.core.dissoc, c);
        return null
      }
    }(c), cljs.core.async.t19101.prototype.cljs$core$async$Mult$untap_all_STAR_$arity$1 = function(b) {
      return function(b) {
        cljs.core.reset_BANG_.call(null, this.cs, cljs.core.PersistentArrayMap.EMPTY);
        return null
      }
    }(c), cljs.core.async.t19101.prototype.cljs$core$async$Mux$ = !0, cljs.core.async.t19101.prototype.cljs$core$async$Mux$muxch_STAR_$arity$1 = function(b) {
      return function(b) {
        return this.ch
      }
    }(c), cljs.core.async.t19101.prototype.cljs$core$IMeta$_meta$arity$1 = function(b) {
      return function(b) {
        return this.meta19102
      }
    }(c), cljs.core.async.t19101.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = function(b) {
      return function(b, c) {
        return new cljs.core.async.t19101(this.cs, this.ch, this.mult, c)
      }
    }(c), cljs.core.async.__GT_t19101 = function(b) {
      return function(b, c, d, e) {
        return new cljs.core.async.t19101(b, c, d, e)
      }
    }(c));
    return new cljs.core.async.t19101(c, b, mult, null)
  }(), e = cljs.core.async.chan.call(null, 1), f = cljs.core.atom.call(null, null), g = function(b, c, d, e) {
    return function() {
      return 0 === cljs.core.swap_BANG_.call(null, e, cljs.core.dec) ? cljs.core.async.put_BANG_.call(null, d, !0) : null
    }
  }(c, d, e, f), h = cljs.core.async.chan.call(null, 1);
  cljs.core.async.impl.dispatch.run.call(null, function() {
    var l = function() {
      return function(b) {
        return function() {
          var c = null, d = function() {
            var b = Array(33);
            b[0] = c;
            b[1] = 1;
            return b
          }, e = function(c) {
            for(;;) {
              var d = function() {
                try {
                  for(;;) {
                    var d = b.call(null, c);
                    if(!cljs.core.keyword_identical_QMARK_.call(null, d, new cljs.core.Keyword(null, "recur", "recur", 1122293407))) {
                      return d
                    }
                  }
                }catch(e) {
                  if(e instanceof Object) {
                    return c[5] = e, cljs.core.async.impl.ioc_helpers.process_exception.call(null, c), new cljs.core.Keyword(null, "recur", "recur", 1122293407)
                  }
                  if(new cljs.core.Keyword(null, "else", "else", 1017020587)) {
                    throw e;
                  }
                  return null
                }
              }();
              if(!cljs.core.keyword_identical_QMARK_.call(null, d, new cljs.core.Keyword(null, "recur", "recur", 1122293407))) {
                return d
              }
            }
          }, c = function(b) {
            switch(arguments.length) {
              case 0:
                return d.call(this);
              case 1:
                return e.call(this, b)
            }
            throw Error("Invalid arity: " + arguments.length);
          };
          c.cljs$core$IFn$_invoke$arity$0 = d;
          c.cljs$core$IFn$_invoke$arity$1 = e;
          return c
        }()
      }(function(k) {
        var h = k[1];
        if(32 === h) {
          var l = k[7], h = k[8];
          cljs.core.async.impl.ioc_helpers.add_exception_frame.call(null, k, 31, Object, null, 30);
          h = cljs.core.async.put_BANG_.call(null, h, l, g);
          k[2] = h;
          cljs.core.async.impl.ioc_helpers.process_exception.call(null, k);
          return new cljs.core.Keyword(null, "recur", "recur", 1122293407)
        }
        if(1 === h) {
          return k[2] = null, k[1] = 2, new cljs.core.Keyword(null, "recur", "recur", 1122293407)
        }
        if(33 === h) {
          return l = k[9], h = cljs.core.chunked_seq_QMARK_.call(null, l), k[1] = h ? 36 : 37, new cljs.core.Keyword(null, "recur", "recur", 1122293407)
        }
        if(2 === h) {
          return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null, k, 4, b)
        }
        if(34 === h) {
          return k[2] = null, k[1] = 35, new cljs.core.Keyword(null, "recur", "recur", 1122293407)
        }
        if(3 === h) {
          return h = k[2], cljs.core.async.impl.ioc_helpers.return_chan.call(null, k, h)
        }
        if(35 === h) {
          return h = k[2], k[2] = h, k[1] = 29, new cljs.core.Keyword(null, "recur", "recur", 1122293407)
        }
        if(4 === h) {
          return h = k[2], k[7] = h, cljs.core.truth_(null == h) ? k[1] = 5 : k[1] = 6, new cljs.core.Keyword(null, "recur", "recur", 1122293407)
        }
        if(36 === h) {
          var l = k[9], h = cljs.core.chunk_first.call(null, l), l = cljs.core.chunk_rest.call(null, l), m = cljs.core.count.call(null, h), r, q;
          k[10] = 0;
          k[11] = l;
          k[12] = h;
          k[13] = m;
          k[2] = null;
          k[1] = 25;
          return new cljs.core.Keyword(null, "recur", "recur", 1122293407)
        }
        return 5 === h ? (h = cljs.core.deref.call(null, c), h = cljs.core.seq.call(null, h), k[14] = 0, k[15] = 0, k[16] = h, k[17] = null, k[2] = null, k[1] = 8, new cljs.core.Keyword(null, "recur", "recur", 1122293407)) : 37 === h ? (l = k[9], h = cljs.core.first.call(null, l), k[18] = h, k[2] = null, k[1] = 41, new cljs.core.Keyword(null, "recur", "recur", 1122293407)) : 6 === h ? (h = cljs.core.deref.call(null, c), h = cljs.core.keys.call(null, h), l = cljs.core.count.call(null, h), l = cljs.core.reset_BANG_.call(null, 
        f, l), m = cljs.core.seq.call(null, h), k[10] = 0, k[11] = m, k[12] = null, k[13] = 0, k[19] = l, k[2] = null, k[1] = 25, new cljs.core.Keyword(null, "recur", "recur", 1122293407)) : 38 === h ? (h = k[2], k[2] = h, k[1] = 35, new cljs.core.Keyword(null, "recur", "recur", 1122293407)) : 7 === h ? (h = k[2], k[2] = h, k[1] = 3, new cljs.core.Keyword(null, "recur", "recur", 1122293407)) : 39 === h ? (l = k[9], h = k[2], m = cljs.core.next.call(null, l), k[10] = 0, k[20] = h, k[11] = m, k[12] = 
        null, k[13] = 0, k[2] = null, k[1] = 25, new cljs.core.Keyword(null, "recur", "recur", 1122293407)) : 8 === h ? (l = k[14], m = k[15], cljs.core.truth_(m < l) ? k[1] = 10 : k[1] = 11, new cljs.core.Keyword(null, "recur", "recur", 1122293407)) : 40 === h ? (h = k[18], l = k[2], m = cljs.core.swap_BANG_.call(null, f, cljs.core.dec), h = cljs.core.async.untap_STAR_.call(null, d, h), k[21] = l, k[22] = m, k[2] = h, cljs.core.async.impl.ioc_helpers.process_exception.call(null, k), new cljs.core.Keyword(null, 
        "recur", "recur", 1122293407)) : 9 === h ? (h = k[2], k[2] = h, k[1] = 7, new cljs.core.Keyword(null, "recur", "recur", 1122293407)) : 41 === h ? (l = k[7], h = k[18], cljs.core.async.impl.ioc_helpers.add_exception_frame.call(null, k, 40, Object, null, 39), h = cljs.core.async.put_BANG_.call(null, h, l, g), k[2] = h, cljs.core.async.impl.ioc_helpers.process_exception.call(null, k), new cljs.core.Keyword(null, "recur", "recur", 1122293407)) : 10 === h ? (m = k[15], q = k[17], l = cljs.core._nth.call(null, 
        q, m), h = cljs.core.nth.call(null, l, 0, null), l = cljs.core.nth.call(null, l, 1, null), k[23] = h, cljs.core.truth_(l) ? k[1] = 13 : k[1] = 14, new cljs.core.Keyword(null, "recur", "recur", 1122293407)) : 42 === h ? (k[24] = k[2], k[2] = null, k[1] = 2, new cljs.core.Keyword(null, "recur", "recur", 1122293407)) : 11 === h ? (l = k[25], h = k[16], h = cljs.core.seq.call(null, h), k[25] = h, k[1] = h ? 16 : 17, new cljs.core.Keyword(null, "recur", "recur", 1122293407)) : 12 === h ? (h = 
        k[2], k[2] = h, k[1] = 9, new cljs.core.Keyword(null, "recur", "recur", 1122293407)) : 13 === h ? (h = k[23], h = cljs.core.async.close_BANG_.call(null, h), k[2] = h, k[1] = 15, new cljs.core.Keyword(null, "recur", "recur", 1122293407)) : 14 === h ? (k[2] = null, k[1] = 15, new cljs.core.Keyword(null, "recur", "recur", 1122293407)) : 15 === h ? (l = k[14], m = k[15], h = k[16], q = k[17], r = k[2], k[14] = l, k[15] = m + 1, k[16] = h, k[17] = q, k[26] = r, k[2] = null, k[1] = 8, new cljs.core.Keyword(null, 
        "recur", "recur", 1122293407)) : 16 === h ? (l = k[25], h = cljs.core.chunked_seq_QMARK_.call(null, l), k[1] = h ? 19 : 20, new cljs.core.Keyword(null, "recur", "recur", 1122293407)) : 17 === h ? (k[2] = null, k[1] = 18, new cljs.core.Keyword(null, "recur", "recur", 1122293407)) : 18 === h ? (h = k[2], k[2] = h, k[1] = 12, new cljs.core.Keyword(null, "recur", "recur", 1122293407)) : 19 === h ? (l = k[25], h = cljs.core.chunk_first.call(null, l), l = cljs.core.chunk_rest.call(null, l), m = 
        cljs.core.count.call(null, h), k[14] = m, k[15] = 0, k[16] = l, k[17] = h, k[2] = null, k[1] = 8, new cljs.core.Keyword(null, "recur", "recur", 1122293407)) : 20 === h ? (l = k[25], l = cljs.core.first.call(null, l), h = cljs.core.nth.call(null, l, 0, null), l = cljs.core.nth.call(null, l, 1, null), k[27] = h, cljs.core.truth_(l) ? k[1] = 22 : k[1] = 23, new cljs.core.Keyword(null, "recur", "recur", 1122293407)) : 21 === h ? (h = k[2], k[2] = h, k[1] = 18, new cljs.core.Keyword(null, "recur", 
        "recur", 1122293407)) : 22 === h ? (h = k[27], h = cljs.core.async.close_BANG_.call(null, h), k[2] = h, k[1] = 24, new cljs.core.Keyword(null, "recur", "recur", 1122293407)) : 23 === h ? (k[2] = null, k[1] = 24, new cljs.core.Keyword(null, "recur", "recur", 1122293407)) : 24 === h ? (l = k[25], m = k[2], h = cljs.core.next.call(null, l), k[28] = m, k[14] = 0, k[15] = 0, k[16] = h, k[17] = null, k[2] = null, k[1] = 8, new cljs.core.Keyword(null, "recur", "recur", 1122293407)) : 25 === h ? 
        (h = k[10], q = k[13], h = h < q, cljs.core.truth_(h) ? k[1] = 27 : k[1] = 28, new cljs.core.Keyword(null, "recur", "recur", 1122293407)) : 26 === h ? (k[29] = k[2], cljs.core.async.impl.ioc_helpers.take_BANG_.call(null, k, 42, e)) : 27 === h ? (h = k[10], r = k[12], h = cljs.core._nth.call(null, r, h), k[8] = h, k[2] = null, k[1] = 32, new cljs.core.Keyword(null, "recur", "recur", 1122293407)) : 28 === h ? (m = k[11], h = cljs.core.seq.call(null, m), k[9] = h, k[1] = h ? 33 : 34, new cljs.core.Keyword(null, 
        "recur", "recur", 1122293407)) : 29 === h ? (h = k[2], k[2] = h, k[1] = 26, new cljs.core.Keyword(null, "recur", "recur", 1122293407)) : 30 === h ? (h = k[10], m = k[11], r = k[12], q = k[13], l = k[2], k[10] = h + 1, k[30] = l, k[11] = m, k[12] = r, k[13] = q, k[2] = null, k[1] = 25, new cljs.core.Keyword(null, "recur", "recur", 1122293407)) : 31 === h ? (h = k[8], l = k[2], m = cljs.core.swap_BANG_.call(null, f, cljs.core.dec), h = cljs.core.async.untap_STAR_.call(null, d, h), k[31] = l, 
        k[32] = m, k[2] = h, cljs.core.async.impl.ioc_helpers.process_exception.call(null, k), new cljs.core.Keyword(null, "recur", "recur", 1122293407)) : null
      })
    }(), m = function() {
      var b = l.call(null);
      b[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = h;
      return b
    }();
    return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null, m)
  });
  return d
};
cljs.core.async.tap = function() {
  var a = null, b = function(b, c) {
    return a.call(null, b, c, !0)
  }, c = function(a, b, c) {
    cljs.core.async.tap_STAR_.call(null, a, b, c);
    return b
  }, a = function(a, e, f) {
    switch(arguments.length) {
      case 2:
        return b.call(this, a, e);
      case 3:
        return c.call(this, a, e, f)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$core$IFn$_invoke$arity$2 = b;
  a.cljs$core$IFn$_invoke$arity$3 = c;
  return a
}();
cljs.core.async.untap = function(a, b) {
  return cljs.core.async.untap_STAR_.call(null, a, b)
};
cljs.core.async.untap_all = function(a) {
  return cljs.core.async.untap_all_STAR_.call(null, a)
};
cljs.core.async.Mix = {};
cljs.core.async.admix_STAR_ = function(a, b) {
  if(a ? a.cljs$core$async$Mix$admix_STAR_$arity$2 : a) {
    return a.cljs$core$async$Mix$admix_STAR_$arity$2(a, b)
  }
  var c;
  c = cljs.core.async.admix_STAR_[goog.typeOf(null == a ? null : a)];
  if(!c && (c = cljs.core.async.admix_STAR_._, !c)) {
    throw cljs.core.missing_protocol.call(null, "Mix.admix*", a);
  }
  return c.call(null, a, b)
};
cljs.core.async.unmix_STAR_ = function(a, b) {
  if(a ? a.cljs$core$async$Mix$unmix_STAR_$arity$2 : a) {
    return a.cljs$core$async$Mix$unmix_STAR_$arity$2(a, b)
  }
  var c;
  c = cljs.core.async.unmix_STAR_[goog.typeOf(null == a ? null : a)];
  if(!c && (c = cljs.core.async.unmix_STAR_._, !c)) {
    throw cljs.core.missing_protocol.call(null, "Mix.unmix*", a);
  }
  return c.call(null, a, b)
};
cljs.core.async.unmix_all_STAR_ = function(a) {
  if(a ? a.cljs$core$async$Mix$unmix_all_STAR_$arity$1 : a) {
    return a.cljs$core$async$Mix$unmix_all_STAR_$arity$1(a)
  }
  var b;
  b = cljs.core.async.unmix_all_STAR_[goog.typeOf(null == a ? null : a)];
  if(!b && (b = cljs.core.async.unmix_all_STAR_._, !b)) {
    throw cljs.core.missing_protocol.call(null, "Mix.unmix-all*", a);
  }
  return b.call(null, a)
};
cljs.core.async.toggle_STAR_ = function(a, b) {
  if(a ? a.cljs$core$async$Mix$toggle_STAR_$arity$2 : a) {
    return a.cljs$core$async$Mix$toggle_STAR_$arity$2(a, b)
  }
  var c;
  c = cljs.core.async.toggle_STAR_[goog.typeOf(null == a ? null : a)];
  if(!c && (c = cljs.core.async.toggle_STAR_._, !c)) {
    throw cljs.core.missing_protocol.call(null, "Mix.toggle*", a);
  }
  return c.call(null, a, b)
};
cljs.core.async.solo_mode_STAR_ = function(a, b) {
  if(a ? a.cljs$core$async$Mix$solo_mode_STAR_$arity$2 : a) {
    return a.cljs$core$async$Mix$solo_mode_STAR_$arity$2(a, b)
  }
  var c;
  c = cljs.core.async.solo_mode_STAR_[goog.typeOf(null == a ? null : a)];
  if(!c && (c = cljs.core.async.solo_mode_STAR_._, !c)) {
    throw cljs.core.missing_protocol.call(null, "Mix.solo-mode*", a);
  }
  return c.call(null, a, b)
};
cljs.core.async.mix = function mix(b) {
  var c = cljs.core.atom.call(null, cljs.core.PersistentArrayMap.EMPTY), d = cljs.core.PersistentHashSet.fromArray([new cljs.core.Keyword(null, "pause", "pause", 1120344424), null, new cljs.core.Keyword(null, "mute", "mute", 1017267595), null], !0), e = cljs.core.conj.call(null, d, new cljs.core.Keyword(null, "solo", "solo", 1017440337)), f = cljs.core.atom.call(null, new cljs.core.Keyword(null, "mute", "mute", 1017267595)), g = cljs.core.async.chan.call(null), h = function(b, c, d, e, f) {
    return function() {
      return cljs.core.async.put_BANG_.call(null, f, !0)
    }
  }(c, d, e, f, g), l = function(b, c, d, e, f, g) {
    return function(h, k) {
      return cljs.core.reduce_kv.call(null, function(b, c, d, e, f, g) {
        return function(b, c, d) {
          return cljs.core.truth_(h.call(null, d)) ? cljs.core.conj.call(null, b, c) : b
        }
      }(b, c, d, e, f, g), cljs.core.PersistentHashSet.EMPTY, k)
    }
  }(c, d, e, f, g, h), m = function(b, c, d, e, f, g, h) {
    return function() {
      var c = cljs.core.deref.call(null, b), d = cljs.core.deref.call(null, e), g = h.call(null, new cljs.core.Keyword(null, "solo", "solo", 1017440337), c), k = h.call(null, new cljs.core.Keyword(null, "pause", "pause", 1120344424), c);
      return cljs.core.PersistentArrayMap.fromArray([new cljs.core.Keyword(null, "solos", "solos", 1123523302), g, new cljs.core.Keyword(null, "mutes", "mutes", 1118168300), h.call(null, new cljs.core.Keyword(null, "mute", "mute", 1017267595), c), new cljs.core.Keyword(null, "reads", "reads", 1122290959), cljs.core.conj.call(null, cljs.core._EQ_.call(null, d, new cljs.core.Keyword(null, "pause", "pause", 1120344424)) && !cljs.core.empty_QMARK_.call(null, g) ? cljs.core.vec.call(null, g) : cljs.core.vec.call(null, 
      cljs.core.remove.call(null, k, cljs.core.keys.call(null, c))), f)], !0)
    }
  }(c, d, e, f, g, h, l), k = function() {
    "undefined" === typeof cljs.core.async.t19475 && (cljs.core.async.t19475 = function(b, c, d, e, f, g, h, k, l, n, m) {
      this.pick = b;
      this.out = c;
      this.attrs = d;
      this.cs = e;
      this.calc_state = f;
      this.solo_modes = g;
      this.mix = h;
      this.changed = k;
      this.change = l;
      this.solo_mode = n;
      this.meta19476 = m;
      this.cljs$lang$protocol_mask$partition1$ = 0;
      this.cljs$lang$protocol_mask$partition0$ = 393216
    }, cljs.core.async.t19475.cljs$lang$type = !0, cljs.core.async.t19475.cljs$lang$ctorStr = "cljs.core.async/t19475", cljs.core.async.t19475.cljs$lang$ctorPrWriter = function(b, c, d, e, f, g, h, k) {
      return function(b, c, d) {
        return cljs.core._write.call(null, c, "cljs.core.async/t19475")
      }
    }(c, d, e, f, g, h, l, m), cljs.core.async.t19475.prototype.cljs$core$async$Mix$ = !0, cljs.core.async.t19475.prototype.cljs$core$async$Mix$admix_STAR_$arity$2 = function(b, c, d, e, f, g, h, k) {
      return function(b, c) {
        cljs.core.swap_BANG_.call(null, this.cs, cljs.core.assoc, c, cljs.core.PersistentArrayMap.EMPTY);
        return this.changed.call(null)
      }
    }(c, d, e, f, g, h, l, m), cljs.core.async.t19475.prototype.cljs$core$async$Mix$unmix_STAR_$arity$2 = function(b, c, d, e, f, g, h, k) {
      return function(b, c) {
        cljs.core.swap_BANG_.call(null, this.cs, cljs.core.dissoc, c);
        return this.changed.call(null)
      }
    }(c, d, e, f, g, h, l, m), cljs.core.async.t19475.prototype.cljs$core$async$Mix$unmix_all_STAR_$arity$1 = function(b, c, d, e, f, g, h, k) {
      return function(b) {
        cljs.core.reset_BANG_.call(null, this.cs, cljs.core.PersistentArrayMap.EMPTY);
        return this.changed.call(null)
      }
    }(c, d, e, f, g, h, l, m), cljs.core.async.t19475.prototype.cljs$core$async$Mix$toggle_STAR_$arity$2 = function(b, c, d, e, f, g, h, k) {
      return function(b, c) {
        cljs.core.swap_BANG_.call(null, this.cs, cljs.core.partial.call(null, cljs.core.merge_with, cljs.core.merge), c);
        return this.changed.call(null)
      }
    }(c, d, e, f, g, h, l, m), cljs.core.async.t19475.prototype.cljs$core$async$Mix$solo_mode_STAR_$arity$2 = function(b, c, d, e, f, g, h, k) {
      return function(b, c) {
        if(!cljs.core.truth_(this.solo_modes.call(null, c))) {
          throw Error([cljs.core.str("Assert failed: "), cljs.core.str([cljs.core.str("mode must be one of: "), cljs.core.str(this.solo_modes)].join("")), cljs.core.str("\n"), cljs.core.str(cljs.core.pr_str.call(null, cljs.core.list(new cljs.core.Symbol(null, "solo-modes", "solo-modes", -1162732933, null), new cljs.core.Symbol(null, "mode", "mode", -1637174436, null))))].join(""));
        }
        cljs.core.reset_BANG_.call(null, this.solo_mode, c);
        return this.changed.call(null)
      }
    }(c, d, e, f, g, h, l, m), cljs.core.async.t19475.prototype.cljs$core$async$Mux$ = !0, cljs.core.async.t19475.prototype.cljs$core$async$Mux$muxch_STAR_$arity$1 = function(b, c, d, e, f, g, h, k) {
      return function(b) {
        return this.out
      }
    }(c, d, e, f, g, h, l, m), cljs.core.async.t19475.prototype.cljs$core$IMeta$_meta$arity$1 = function(b, c, d, e, f, g, h, k) {
      return function(b) {
        return this.meta19476
      }
    }(c, d, e, f, g, h, l, m), cljs.core.async.t19475.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = function(b, c, d, e, f, g, h, k) {
      return function(b, c) {
        return new cljs.core.async.t19475(this.pick, this.out, this.attrs, this.cs, this.calc_state, this.solo_modes, this.mix, this.changed, this.change, this.solo_mode, c)
      }
    }(c, d, e, f, g, h, l, m), cljs.core.async.__GT_t19475 = function(b, c, d, e, f, g, h, k) {
      return function(b, c, d, e, f, g, h, k, l, n, m) {
        return new cljs.core.async.t19475(b, c, d, e, f, g, h, k, l, n, m)
      }
    }(c, d, e, f, g, h, l, m));
    return new cljs.core.async.t19475(l, b, e, c, m, d, mix, h, g, f, null)
  }(), n = cljs.core.async.chan.call(null, 1);
  cljs.core.async.impl.dispatch.run.call(null, function() {
    var d = function() {
      return function(b) {
        return function() {
          var c = null, d = function() {
            var b = Array(20);
            b[0] = c;
            b[1] = 1;
            return b
          }, e = function(c) {
            for(;;) {
              var d = function() {
                try {
                  for(;;) {
                    var d = b.call(null, c);
                    if(!cljs.core.keyword_identical_QMARK_.call(null, d, new cljs.core.Keyword(null, "recur", "recur", 1122293407))) {
                      return d
                    }
                  }
                }catch(e) {
                  if(e instanceof Object) {
                    return c[5] = e, cljs.core.async.impl.ioc_helpers.process_exception.call(null, c), new cljs.core.Keyword(null, "recur", "recur", 1122293407)
                  }
                  if(new cljs.core.Keyword(null, "else", "else", 1017020587)) {
                    throw e;
                  }
                  return null
                }
              }();
              if(!cljs.core.keyword_identical_QMARK_.call(null, d, new cljs.core.Keyword(null, "recur", "recur", 1122293407))) {
                return d
              }
            }
          }, c = function(b) {
            switch(arguments.length) {
              case 0:
                return d.call(this);
              case 1:
                return e.call(this, b)
            }
            throw Error("Invalid arity: " + arguments.length);
          };
          c.cljs$core$IFn$_invoke$arity$0 = d;
          c.cljs$core$IFn$_invoke$arity$1 = e;
          return c
        }()
      }(function(d) {
        var e = d[1];
        if(1 === e) {
          var e = d[7], e = m.call(null), f = cljs.core.seq_QMARK_.call(null, e);
          d[7] = e;
          d[1] = f ? 2 : 3;
          return new cljs.core.Keyword(null, "recur", "recur", 1122293407)
        }
        if(2 === e) {
          return e = d[7], e = cljs.core.apply.call(null, cljs.core.hash_map, e), d[2] = e, d[1] = 4, new cljs.core.Keyword(null, "recur", "recur", 1122293407)
        }
        if(3 === e) {
          return e = d[7], d[2] = e, d[1] = 4, new cljs.core.Keyword(null, "recur", "recur", 1122293407)
        }
        if(4 === e) {
          var e = d[7], h = d[2], f = cljs.core.get.call(null, h, new cljs.core.Keyword(null, "reads", "reads", 1122290959)), k = cljs.core.get.call(null, h, new cljs.core.Keyword(null, "mutes", "mutes", 1118168300)), h = cljs.core.get.call(null, h, new cljs.core.Keyword(null, "solos", "solos", 1123523302));
          d[8] = e;
          d[9] = h;
          d[10] = k;
          d[11] = f;
          d[2] = null;
          d[1] = 5;
          return new cljs.core.Keyword(null, "recur", "recur", 1122293407)
        }
        return 5 === e ? (e = d[8], e = cljs.core.seq_QMARK_.call(null, e), d[1] = e ? 7 : 8, new cljs.core.Keyword(null, "recur", "recur", 1122293407)) : 6 === e ? (e = d[2], cljs.core.async.impl.ioc_helpers.return_chan.call(null, d, e)) : 7 === e ? (e = d[8], e = cljs.core.apply.call(null, cljs.core.hash_map, e), d[2] = e, d[1] = 9, new cljs.core.Keyword(null, "recur", "recur", 1122293407)) : 8 === e ? (e = d[8], d[2] = e, d[1] = 9, new cljs.core.Keyword(null, "recur", "recur", 1122293407)) : 9 === 
        e ? (e = d[12], k = d[2], h = cljs.core.get.call(null, k, new cljs.core.Keyword(null, "reads", "reads", 1122290959)), e = cljs.core.get.call(null, k, new cljs.core.Keyword(null, "mutes", "mutes", 1118168300)), f = cljs.core.get.call(null, k, new cljs.core.Keyword(null, "solos", "solos", 1123523302)), d[12] = k, d[13] = f, d[14] = e, cljs.core.async.impl.ioc_helpers.ioc_alts_BANG_.call(null, d, 10, h)) : 10 === e ? (k = d[15], e = d[16], f = d[2], e = cljs.core.nth.call(null, f, 0, null), 
        h = cljs.core.nth.call(null, f, 1, null), f = null == e, k = cljs.core._EQ_.call(null, h, g), d[15] = h, d[16] = e, cljs.core.truth_(f || k) ? d[1] = 11 : d[1] = 12, new cljs.core.Keyword(null, "recur", "recur", 1122293407)) : 11 === e ? (e = d[16], cljs.core.truth_(null == e) ? d[1] = 14 : d[1] = 15, new cljs.core.Keyword(null, "recur", "recur", 1122293407)) : 12 === e ? (k = d[15], f = d[13], e = d[17], e = f.call(null, k), d[17] = e, cljs.core.truth_(e) ? d[1] = 17 : d[1] = 18, new cljs.core.Keyword(null, 
        "recur", "recur", 1122293407)) : 13 === e ? (e = d[2], d[2] = e, d[1] = 6, new cljs.core.Keyword(null, "recur", "recur", 1122293407)) : 14 === e ? (k = d[15], e = cljs.core.swap_BANG_.call(null, c, cljs.core.dissoc, k), d[2] = e, d[1] = 16, new cljs.core.Keyword(null, "recur", "recur", 1122293407)) : 15 === e ? (d[2] = null, d[1] = 16, new cljs.core.Keyword(null, "recur", "recur", 1122293407)) : 16 === e ? (f = d[2], e = m.call(null), d[8] = e, d[18] = f, d[2] = null, d[1] = 5, new cljs.core.Keyword(null, 
        "recur", "recur", 1122293407)) : 17 === e ? (e = d[17], d[2] = e, d[1] = 19, new cljs.core.Keyword(null, "recur", "recur", 1122293407)) : 18 === e ? (k = d[15], f = d[13], e = d[14], f = cljs.core.empty_QMARK_.call(null, f), e = e.call(null, k), e = cljs.core.not.call(null, e), d[2] = f && e, d[1] = 19, new cljs.core.Keyword(null, "recur", "recur", 1122293407)) : 19 === e ? (e = d[2], cljs.core.truth_(e) ? d[1] = 20 : d[1] = 21, new cljs.core.Keyword(null, "recur", "recur", 1122293407)) : 
        20 === e ? (e = d[16], cljs.core.async.impl.ioc_helpers.put_BANG_.call(null, d, 23, b, e)) : 21 === e ? (d[2] = null, d[1] = 22, new cljs.core.Keyword(null, "recur", "recur", 1122293407)) : 22 === e ? (e = d[12], f = d[2], d[19] = f, d[8] = e, d[2] = null, d[1] = 5, new cljs.core.Keyword(null, "recur", "recur", 1122293407)) : 23 === e ? (e = d[2], d[2] = e, d[1] = 22, new cljs.core.Keyword(null, "recur", "recur", 1122293407)) : null
      })
    }(), e = function() {
      var b = d.call(null);
      b[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = n;
      return b
    }();
    return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null, e)
  });
  return k
};
cljs.core.async.admix = function(a, b) {
  return cljs.core.async.admix_STAR_.call(null, a, b)
};
cljs.core.async.unmix = function(a, b) {
  return cljs.core.async.unmix_STAR_.call(null, a, b)
};
cljs.core.async.unmix_all = function(a) {
  return cljs.core.async.unmix_all_STAR_.call(null, a)
};
cljs.core.async.toggle = function(a, b) {
  return cljs.core.async.toggle_STAR_.call(null, a, b)
};
cljs.core.async.solo_mode = function(a, b) {
  return cljs.core.async.solo_mode_STAR_.call(null, a, b)
};
cljs.core.async.Pub = {};
cljs.core.async.sub_STAR_ = function(a, b, c, d) {
  if(a ? a.cljs$core$async$Pub$sub_STAR_$arity$4 : a) {
    return a.cljs$core$async$Pub$sub_STAR_$arity$4(a, b, c, d)
  }
  var e;
  e = cljs.core.async.sub_STAR_[goog.typeOf(null == a ? null : a)];
  if(!e && (e = cljs.core.async.sub_STAR_._, !e)) {
    throw cljs.core.missing_protocol.call(null, "Pub.sub*", a);
  }
  return e.call(null, a, b, c, d)
};
cljs.core.async.unsub_STAR_ = function(a, b, c) {
  if(a ? a.cljs$core$async$Pub$unsub_STAR_$arity$3 : a) {
    return a.cljs$core$async$Pub$unsub_STAR_$arity$3(a, b, c)
  }
  var d;
  d = cljs.core.async.unsub_STAR_[goog.typeOf(null == a ? null : a)];
  if(!d && (d = cljs.core.async.unsub_STAR_._, !d)) {
    throw cljs.core.missing_protocol.call(null, "Pub.unsub*", a);
  }
  return d.call(null, a, b, c)
};
cljs.core.async.unsub_all_STAR_ = function() {
  var a = null, b = function(a) {
    if(a ? a.cljs$core$async$Pub$unsub_all_STAR_$arity$1 : a) {
      return a.cljs$core$async$Pub$unsub_all_STAR_$arity$1(a)
    }
    var b;
    b = cljs.core.async.unsub_all_STAR_[goog.typeOf(null == a ? null : a)];
    if(!b && (b = cljs.core.async.unsub_all_STAR_._, !b)) {
      throw cljs.core.missing_protocol.call(null, "Pub.unsub-all*", a);
    }
    return b.call(null, a)
  }, c = function(a, b) {
    if(a ? a.cljs$core$async$Pub$unsub_all_STAR_$arity$2 : a) {
      return a.cljs$core$async$Pub$unsub_all_STAR_$arity$2(a, b)
    }
    var c;
    c = cljs.core.async.unsub_all_STAR_[goog.typeOf(null == a ? null : a)];
    if(!c && (c = cljs.core.async.unsub_all_STAR_._, !c)) {
      throw cljs.core.missing_protocol.call(null, "Pub.unsub-all*", a);
    }
    return c.call(null, a, b)
  }, a = function(a, e) {
    switch(arguments.length) {
      case 1:
        return b.call(this, a);
      case 2:
        return c.call(this, a, e)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$core$IFn$_invoke$arity$1 = b;
  a.cljs$core$IFn$_invoke$arity$2 = c;
  return a
}();
cljs.core.async.pub = function() {
  var a = null, b = function(b, c) {
    return a.call(null, b, c, cljs.core.constantly.call(null, null))
  }, c = function(b, c, f) {
    var g = cljs.core.atom.call(null, cljs.core.PersistentArrayMap.EMPTY), h = function(a) {
      return function(b) {
        var c = cljs.core.get.call(null, cljs.core.deref.call(null, a), b);
        return cljs.core.truth_(c) ? c : cljs.core.get.call(null, cljs.core.swap_BANG_.call(null, a, function(a, c) {
          return function(a) {
            return cljs.core.truth_(a.call(null, b)) ? a : cljs.core.assoc.call(null, a, b, cljs.core.async.mult.call(null, cljs.core.async.chan.call(null, f.call(null, b))))
          }
        }(c, a)), b)
      }
    }(g), l = function() {
      "undefined" === typeof cljs.core.async.t19738 && (cljs.core.async.t19738 = function(a, b, c, d, e, f, g) {
        this.ensure_mult = a;
        this.mults = b;
        this.buf_fn = c;
        this.topic_fn = d;
        this.ch = e;
        this.pub = f;
        this.meta19739 = g;
        this.cljs$lang$protocol_mask$partition1$ = 0;
        this.cljs$lang$protocol_mask$partition0$ = 393216
      }, cljs.core.async.t19738.cljs$lang$type = !0, cljs.core.async.t19738.cljs$lang$ctorStr = "cljs.core.async/t19738", cljs.core.async.t19738.cljs$lang$ctorPrWriter = function(a, b) {
        return function(a, b, c) {
          return cljs.core._write.call(null, b, "cljs.core.async/t19738")
        }
      }(g, h), cljs.core.async.t19738.prototype.cljs$core$async$Pub$ = !0, cljs.core.async.t19738.prototype.cljs$core$async$Pub$sub_STAR_$arity$4 = function(a, b) {
        return function(a, b, c, d) {
          a = this.ensure_mult.call(null, b);
          return cljs.core.async.tap.call(null, a, c, d)
        }
      }(g, h), cljs.core.async.t19738.prototype.cljs$core$async$Pub$unsub_STAR_$arity$3 = function(a, b) {
        return function(a, b, c) {
          a = cljs.core.get.call(null, cljs.core.deref.call(null, this.mults), b);
          return cljs.core.truth_(a) ? cljs.core.async.untap.call(null, a, c) : null
        }
      }(g, h), cljs.core.async.t19738.prototype.cljs$core$async$Pub$unsub_all_STAR_$arity$1 = function(a, b) {
        return function(a) {
          return cljs.core.reset_BANG_.call(null, this.mults, cljs.core.PersistentArrayMap.EMPTY)
        }
      }(g, h), cljs.core.async.t19738.prototype.cljs$core$async$Pub$unsub_all_STAR_$arity$2 = function(a, b) {
        return function(a, b) {
          return cljs.core.swap_BANG_.call(null, this.mults, cljs.core.dissoc, b)
        }
      }(g, h), cljs.core.async.t19738.prototype.cljs$core$async$Mux$ = !0, cljs.core.async.t19738.prototype.cljs$core$async$Mux$muxch_STAR_$arity$1 = function(a, b) {
        return function(a) {
          return this.ch
        }
      }(g, h), cljs.core.async.t19738.prototype.cljs$core$IMeta$_meta$arity$1 = function(a, b) {
        return function(a) {
          return this.meta19739
        }
      }(g, h), cljs.core.async.t19738.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = function(a, b) {
        return function(a, b) {
          return new cljs.core.async.t19738(this.ensure_mult, this.mults, this.buf_fn, this.topic_fn, this.ch, this.pub, b)
        }
      }(g, h), cljs.core.async.__GT_t19738 = function(a, b) {
        return function(a, b, c, d, e, f, g) {
          return new cljs.core.async.t19738(a, b, c, d, e, f, g)
        }
      }(g, h));
      return new cljs.core.async.t19738(h, g, f, c, b, a, null)
    }(), m = cljs.core.async.chan.call(null, 1);
    cljs.core.async.impl.dispatch.run.call(null, function() {
      var a = function() {
        return function(a) {
          return function() {
            var b = null, c = function() {
              var a = Array(19);
              a[0] = b;
              a[1] = 1;
              return a
            }, d = function(b) {
              for(;;) {
                var c = function() {
                  try {
                    for(;;) {
                      var c = a.call(null, b);
                      if(!cljs.core.keyword_identical_QMARK_.call(null, c, new cljs.core.Keyword(null, "recur", "recur", 1122293407))) {
                        return c
                      }
                    }
                  }catch(d) {
                    if(d instanceof Object) {
                      return b[5] = d, cljs.core.async.impl.ioc_helpers.process_exception.call(null, b), new cljs.core.Keyword(null, "recur", "recur", 1122293407)
                    }
                    if(new cljs.core.Keyword(null, "else", "else", 1017020587)) {
                      throw d;
                    }
                    return null
                  }
                }();
                if(!cljs.core.keyword_identical_QMARK_.call(null, c, new cljs.core.Keyword(null, "recur", "recur", 1122293407))) {
                  return c
                }
              }
            }, b = function(a) {
              switch(arguments.length) {
                case 0:
                  return c.call(this);
                case 1:
                  return d.call(this, a)
              }
              throw Error("Invalid arity: " + arguments.length);
            };
            b.cljs$core$IFn$_invoke$arity$0 = c;
            b.cljs$core$IFn$_invoke$arity$1 = d;
            return b
          }()
        }(function(a) {
          var f = a[1];
          if(1 === f) {
            return a[2] = null, a[1] = 2, new cljs.core.Keyword(null, "recur", "recur", 1122293407)
          }
          if(2 === f) {
            return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null, a, 4, b)
          }
          if(3 === f) {
            return f = a[2], cljs.core.async.impl.ioc_helpers.return_chan.call(null, a, f)
          }
          if(4 === f) {
            return f = a[7], f = a[2], a[7] = f, cljs.core.truth_(null == f) ? a[1] = 5 : a[1] = 6, new cljs.core.Keyword(null, "recur", "recur", 1122293407)
          }
          if(5 === f) {
            var f = cljs.core.deref.call(null, g), f = cljs.core.vals.call(null, f), f = cljs.core.seq.call(null, f), h, k, l;
            a[8] = 0;
            a[9] = 0;
            a[10] = f;
            a[11] = null;
            a[2] = null;
            a[1] = 8;
            return new cljs.core.Keyword(null, "recur", "recur", 1122293407)
          }
          if(6 === f) {
            return k = a[12], f = a[7], k = a[13], f = c.call(null, f), k = cljs.core.deref.call(null, g), k = cljs.core.get.call(null, k, f), a[12] = f, a[13] = k, cljs.core.truth_(k) ? a[1] = 19 : a[1] = 20, new cljs.core.Keyword(null, "recur", "recur", 1122293407)
          }
          if(7 === f) {
            return f = a[2], a[2] = f, a[1] = 3, new cljs.core.Keyword(null, "recur", "recur", 1122293407)
          }
          if(8 === f) {
            return k = a[8], l = a[9], cljs.core.truth_(l < k) ? a[1] = 10 : a[1] = 11, new cljs.core.Keyword(null, "recur", "recur", 1122293407)
          }
          if(9 === f) {
            return f = a[2], a[2] = f, a[1] = 7, new cljs.core.Keyword(null, "recur", "recur", 1122293407)
          }
          if(10 === f) {
            k = a[8];
            l = a[9];
            f = a[10];
            h = a[11];
            var m = cljs.core._nth.call(null, h, l), m = cljs.core.async.muxch_STAR_.call(null, m), m = cljs.core.async.close_BANG_.call(null, m);
            a[8] = k;
            a[9] = l + 1;
            a[10] = f;
            a[11] = h;
            a[14] = m;
            a[2] = null;
            a[1] = 8;
            return new cljs.core.Keyword(null, "recur", "recur", 1122293407)
          }
          return 11 === f ? (f = a[10], k = a[15], f = cljs.core.seq.call(null, f), a[15] = f, a[1] = f ? 13 : 14, new cljs.core.Keyword(null, "recur", "recur", 1122293407)) : 12 === f ? (f = a[2], a[2] = f, a[1] = 9, new cljs.core.Keyword(null, "recur", "recur", 1122293407)) : 13 === f ? (k = a[15], f = cljs.core.chunked_seq_QMARK_.call(null, k), a[1] = f ? 16 : 17, new cljs.core.Keyword(null, "recur", "recur", 1122293407)) : 14 === f ? (a[2] = null, a[1] = 15, new cljs.core.Keyword(null, "recur", 
          "recur", 1122293407)) : 15 === f ? (f = a[2], a[2] = f, a[1] = 12, new cljs.core.Keyword(null, "recur", "recur", 1122293407)) : 16 === f ? (k = a[15], f = cljs.core.chunk_first.call(null, k), k = cljs.core.chunk_rest.call(null, k), l = cljs.core.count.call(null, f), a[8] = l, a[9] = 0, a[10] = k, a[11] = f, a[2] = null, a[1] = 8, new cljs.core.Keyword(null, "recur", "recur", 1122293407)) : 17 === f ? (k = a[15], f = cljs.core.first.call(null, k), f = cljs.core.async.muxch_STAR_.call(null, 
          f), l = cljs.core.async.close_BANG_.call(null, f), f = cljs.core.next.call(null, k), a[16] = l, a[8] = 0, a[9] = 0, a[10] = f, a[11] = null, a[2] = null, a[1] = 8, new cljs.core.Keyword(null, "recur", "recur", 1122293407)) : 18 === f ? (f = a[2], a[2] = f, a[1] = 15, new cljs.core.Keyword(null, "recur", "recur", 1122293407)) : 19 === f ? (a[2] = null, a[1] = 24, new cljs.core.Keyword(null, "recur", "recur", 1122293407)) : 20 === f ? (a[2] = null, a[1] = 21, new cljs.core.Keyword(null, "recur", 
          "recur", 1122293407)) : 21 === f ? (a[17] = a[2], a[2] = null, a[1] = 2, new cljs.core.Keyword(null, "recur", "recur", 1122293407)) : 22 === f ? (f = a[2], a[2] = f, a[1] = 21, new cljs.core.Keyword(null, "recur", "recur", 1122293407)) : 23 === f ? (k = a[12], f = a[2], k = cljs.core.swap_BANG_.call(null, g, cljs.core.dissoc, k), a[18] = f, a[2] = k, cljs.core.async.impl.ioc_helpers.process_exception.call(null, a), new cljs.core.Keyword(null, "recur", "recur", 1122293407)) : 24 === f ? 
          (f = a[7], k = a[13], cljs.core.async.impl.ioc_helpers.add_exception_frame.call(null, a, 23, Object, null, 22), k = cljs.core.async.muxch_STAR_.call(null, k), cljs.core.async.impl.ioc_helpers.put_BANG_.call(null, a, 25, k, f)) : 25 === f ? (f = a[2], a[2] = f, cljs.core.async.impl.ioc_helpers.process_exception.call(null, a), new cljs.core.Keyword(null, "recur", "recur", 1122293407)) : null
        })
      }(), f = function() {
        var b = a.call(null);
        b[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = m;
        return b
      }();
      return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null, f)
    });
    return l
  }, a = function(a, e, f) {
    switch(arguments.length) {
      case 2:
        return b.call(this, a, e);
      case 3:
        return c.call(this, a, e, f)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$core$IFn$_invoke$arity$2 = b;
  a.cljs$core$IFn$_invoke$arity$3 = c;
  return a
}();
cljs.core.async.sub = function() {
  var a = null, b = function(b, c, f) {
    return a.call(null, b, c, f, !0)
  }, c = function(a, b, c, g) {
    return cljs.core.async.sub_STAR_.call(null, a, b, c, g)
  }, a = function(a, e, f, g) {
    switch(arguments.length) {
      case 3:
        return b.call(this, a, e, f);
      case 4:
        return c.call(this, a, e, f, g)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$core$IFn$_invoke$arity$3 = b;
  a.cljs$core$IFn$_invoke$arity$4 = c;
  return a
}();
cljs.core.async.unsub = function(a, b, c) {
  return cljs.core.async.unsub_STAR_.call(null, a, b, c)
};
cljs.core.async.unsub_all = function() {
  var a = null, b = function(a) {
    return cljs.core.async.unsub_all_STAR_.call(null, a)
  }, c = function(a, b) {
    return cljs.core.async.unsub_all_STAR_.call(null, a, b)
  }, a = function(a, e) {
    switch(arguments.length) {
      case 1:
        return b.call(this, a);
      case 2:
        return c.call(this, a, e)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$core$IFn$_invoke$arity$1 = b;
  a.cljs$core$IFn$_invoke$arity$2 = c;
  return a
}();
cljs.core.async.map = function() {
  var a = null, b = function(b, c) {
    return a.call(null, b, c, null)
  }, c = function(a, b, c) {
    var g = cljs.core.vec.call(null, b), h = cljs.core.async.chan.call(null, c), l = cljs.core.count.call(null, g);
    b = cljs.core.object_array.call(null, l);
    var m = cljs.core.async.chan.call(null, 1), k = cljs.core.atom.call(null, null), n = cljs.core.mapv.call(null, function(a, b, c, d, e, f) {
      return function(g) {
        return function(a, b, c, d, e, f) {
          return function(a) {
            d[g] = a;
            return 0 === cljs.core.swap_BANG_.call(null, f, cljs.core.dec) ? cljs.core.async.put_BANG_.call(null, e, d.slice(0)) : null
          }
        }(a, b, c, d, e, f)
      }
    }(g, h, l, b, m, k), cljs.core.range.call(null, l)), p = cljs.core.async.chan.call(null, 1);
    cljs.core.async.impl.dispatch.run.call(null, function() {
      var b = function() {
        return function(a) {
          return function() {
            var b = null, c = function() {
              var a = Array(14);
              a[0] = b;
              a[1] = 1;
              return a
            }, d = function(b) {
              for(;;) {
                var c = function() {
                  try {
                    for(;;) {
                      var c = a.call(null, b);
                      if(!cljs.core.keyword_identical_QMARK_.call(null, c, new cljs.core.Keyword(null, "recur", "recur", 1122293407))) {
                        return c
                      }
                    }
                  }catch(d) {
                    if(d instanceof Object) {
                      return b[5] = d, cljs.core.async.impl.ioc_helpers.process_exception.call(null, b), new cljs.core.Keyword(null, "recur", "recur", 1122293407)
                    }
                    if(new cljs.core.Keyword(null, "else", "else", 1017020587)) {
                      throw d;
                    }
                    return null
                  }
                }();
                if(!cljs.core.keyword_identical_QMARK_.call(null, c, new cljs.core.Keyword(null, "recur", "recur", 1122293407))) {
                  return c
                }
              }
            }, b = function(a) {
              switch(arguments.length) {
                case 0:
                  return c.call(this);
                case 1:
                  return d.call(this, a)
              }
              throw Error("Invalid arity: " + arguments.length);
            };
            b.cljs$core$IFn$_invoke$arity$0 = c;
            b.cljs$core$IFn$_invoke$arity$1 = d;
            return b
          }()
        }(function(b) {
          var c = b[1];
          if(1 === c) {
            return b[2] = null, b[1] = 2, new cljs.core.Keyword(null, "recur", "recur", 1122293407)
          }
          if(2 === c) {
            var c = cljs.core.reset_BANG_.call(null, k, l), e;
            b[7] = 0;
            b[8] = c;
            b[2] = null;
            b[1] = 4;
            return new cljs.core.Keyword(null, "recur", "recur", 1122293407)
          }
          return 3 === c ? (c = b[2], cljs.core.async.impl.ioc_helpers.return_chan.call(null, b, c)) : 4 === c ? (e = b[7], c = e < l, cljs.core.truth_(c) ? b[1] = 6 : b[1] = 7, new cljs.core.Keyword(null, "recur", "recur", 1122293407)) : 5 === c ? (b[9] = b[2], cljs.core.async.impl.ioc_helpers.take_BANG_.call(null, b, 12, m)) : 6 === c ? (b[2] = null, b[1] = 11, new cljs.core.Keyword(null, "recur", "recur", 1122293407)) : 7 === c ? (b[2] = null, b[1] = 8, new cljs.core.Keyword(null, "recur", "recur", 
          1122293407)) : 8 === c ? (c = b[2], b[2] = c, b[1] = 5, new cljs.core.Keyword(null, "recur", "recur", 1122293407)) : 9 === c ? (e = b[7], b[10] = b[2], b[7] = e + 1, b[2] = null, b[1] = 4, new cljs.core.Keyword(null, "recur", "recur", 1122293407)) : 10 === c ? (e = b[2], c = cljs.core.swap_BANG_.call(null, k, cljs.core.dec), b[11] = e, b[2] = c, cljs.core.async.impl.ioc_helpers.process_exception.call(null, b), new cljs.core.Keyword(null, "recur", "recur", 1122293407)) : 11 === c ? (e = 
          b[7], cljs.core.async.impl.ioc_helpers.add_exception_frame.call(null, b, 10, Object, null, 9), c = g.call(null, e), e = n.call(null, e), c = cljs.core.async.take_BANG_.call(null, c, e), b[2] = c, cljs.core.async.impl.ioc_helpers.process_exception.call(null, b), new cljs.core.Keyword(null, "recur", "recur", 1122293407)) : 12 === c ? (c = b[12], e = b[2], c = cljs.core.some.call(null, cljs.core.nil_QMARK_, e), b[12] = e, cljs.core.truth_(c) ? b[1] = 13 : b[1] = 14, new cljs.core.Keyword(null, 
          "recur", "recur", 1122293407)) : 13 === c ? (c = cljs.core.async.close_BANG_.call(null, h), b[2] = c, b[1] = 15, new cljs.core.Keyword(null, "recur", "recur", 1122293407)) : 14 === c ? (c = b[12], c = cljs.core.apply.call(null, a, c), cljs.core.async.impl.ioc_helpers.put_BANG_.call(null, b, 16, h, c)) : 15 === c ? (c = b[2], b[2] = c, b[1] = 3, new cljs.core.Keyword(null, "recur", "recur", 1122293407)) : 16 === c ? (b[13] = b[2], b[2] = null, b[1] = 2, new cljs.core.Keyword(null, "recur", 
          "recur", 1122293407)) : null
        })
      }(), c = function() {
        var a = b.call(null);
        a[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = p;
        return a
      }();
      return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null, c)
    });
    return h
  }, a = function(a, e, f) {
    switch(arguments.length) {
      case 2:
        return b.call(this, a, e);
      case 3:
        return c.call(this, a, e, f)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$core$IFn$_invoke$arity$2 = b;
  a.cljs$core$IFn$_invoke$arity$3 = c;
  return a
}();
cljs.core.async.merge = function() {
  var a = null, b = function(b) {
    return a.call(null, b, null)
  }, c = function(a, b) {
    var c = cljs.core.async.chan.call(null, b), g = cljs.core.async.chan.call(null, 1);
    cljs.core.async.impl.dispatch.run.call(null, function() {
      var b = function() {
        return function(a) {
          return function() {
            var b = null, c = function() {
              var a = Array(12);
              a[0] = b;
              a[1] = 1;
              return a
            }, d = function(b) {
              for(;;) {
                var c = function() {
                  try {
                    for(;;) {
                      var c = a.call(null, b);
                      if(!cljs.core.keyword_identical_QMARK_.call(null, c, new cljs.core.Keyword(null, "recur", "recur", 1122293407))) {
                        return c
                      }
                    }
                  }catch(d) {
                    if(d instanceof Object) {
                      return b[5] = d, cljs.core.async.impl.ioc_helpers.process_exception.call(null, b), new cljs.core.Keyword(null, "recur", "recur", 1122293407)
                    }
                    if(new cljs.core.Keyword(null, "else", "else", 1017020587)) {
                      throw d;
                    }
                    return null
                  }
                }();
                if(!cljs.core.keyword_identical_QMARK_.call(null, c, new cljs.core.Keyword(null, "recur", "recur", 1122293407))) {
                  return c
                }
              }
            }, b = function(a) {
              switch(arguments.length) {
                case 0:
                  return c.call(this);
                case 1:
                  return d.call(this, a)
              }
              throw Error("Invalid arity: " + arguments.length);
            };
            b.cljs$core$IFn$_invoke$arity$0 = c;
            b.cljs$core$IFn$_invoke$arity$1 = d;
            return b
          }()
        }(function(b) {
          var e = b[1];
          if(1 === e) {
            var g = cljs.core.vec.call(null, a);
            b[7] = g;
            b[2] = null;
            b[1] = 2;
            return new cljs.core.Keyword(null, "recur", "recur", 1122293407)
          }
          if(2 === e) {
            var g = b[7], h = 0 < cljs.core.count.call(null, g);
            cljs.core.truth_(h) ? b[1] = 4 : b[1] = 5;
            return new cljs.core.Keyword(null, "recur", "recur", 1122293407)
          }
          if(3 === e) {
            return h = b[2], cljs.core.async.impl.ioc_helpers.return_chan.call(null, b, h)
          }
          if(4 === e) {
            return g = b[7], cljs.core.async.impl.ioc_helpers.ioc_alts_BANG_.call(null, b, 7, g)
          }
          if(5 === e) {
            return h = cljs.core.async.close_BANG_.call(null, c), b[2] = h, b[1] = 6, new cljs.core.Keyword(null, "recur", "recur", 1122293407)
          }
          if(6 === e) {
            return h = b[2], b[2] = h, b[1] = 3, new cljs.core.Keyword(null, "recur", "recur", 1122293407)
          }
          if(7 === e) {
            var l = b[8], r = b[9], q = b[2], h = cljs.core.nth.call(null, q, 0, null), t = cljs.core.nth.call(null, q, 1, null);
            b[8] = h;
            b[9] = q;
            b[10] = t;
            cljs.core.truth_(null == h) ? b[1] = 8 : b[1] = 9;
            return new cljs.core.Keyword(null, "recur", "recur", 1122293407)
          }
          return 8 === e ? (l = b[8], r = b[9], t = b[10], g = b[7], h = function() {
            return function(a, b, c, d, e, f, g, h, k) {
              return function(b) {
                return cljs.core.not_EQ_.call(null, a, b)
              }
            }(t, l, r, g, l, r, t, g, e)
          }(), h = cljs.core.filterv.call(null, h, g), b[7] = h, b[2] = null, b[1] = 2, new cljs.core.Keyword(null, "recur", "recur", 1122293407)) : 9 === e ? (l = b[8], cljs.core.async.impl.ioc_helpers.put_BANG_.call(null, b, 11, c, l)) : 10 === e ? (h = b[2], b[2] = h, b[1] = 6, new cljs.core.Keyword(null, "recur", "recur", 1122293407)) : 11 === e ? (g = b[7], h = b[2], b[11] = h, b[7] = g, b[2] = null, b[1] = 2, new cljs.core.Keyword(null, "recur", "recur", 1122293407)) : null
        })
      }(), e = function() {
        var a = b.call(null);
        a[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = g;
        return a
      }();
      return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null, e)
    });
    return c
  }, a = function(a, e) {
    switch(arguments.length) {
      case 1:
        return b.call(this, a);
      case 2:
        return c.call(this, a, e)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$core$IFn$_invoke$arity$1 = b;
  a.cljs$core$IFn$_invoke$arity$2 = c;
  return a
}();
cljs.core.async.into = function(a, b) {
  return cljs.core.async.reduce.call(null, cljs.core.conj, a, b)
};
cljs.core.async.take = function() {
  var a = null, b = function(b, c) {
    return a.call(null, b, c, null)
  }, c = function(a, b, c) {
    var g = cljs.core.async.chan.call(null, c), h = cljs.core.async.chan.call(null, 1);
    cljs.core.async.impl.dispatch.run.call(null, function() {
      var c = function() {
        return function(a) {
          return function() {
            var b = null, c = function() {
              var a = Array(11);
              a[0] = b;
              a[1] = 1;
              return a
            }, d = function(b) {
              for(;;) {
                var c = function() {
                  try {
                    for(;;) {
                      var c = a.call(null, b);
                      if(!cljs.core.keyword_identical_QMARK_.call(null, c, new cljs.core.Keyword(null, "recur", "recur", 1122293407))) {
                        return c
                      }
                    }
                  }catch(d) {
                    if(d instanceof Object) {
                      return b[5] = d, cljs.core.async.impl.ioc_helpers.process_exception.call(null, b), new cljs.core.Keyword(null, "recur", "recur", 1122293407)
                    }
                    if(new cljs.core.Keyword(null, "else", "else", 1017020587)) {
                      throw d;
                    }
                    return null
                  }
                }();
                if(!cljs.core.keyword_identical_QMARK_.call(null, c, new cljs.core.Keyword(null, "recur", "recur", 1122293407))) {
                  return c
                }
              }
            }, b = function(a) {
              switch(arguments.length) {
                case 0:
                  return c.call(this);
                case 1:
                  return d.call(this, a)
              }
              throw Error("Invalid arity: " + arguments.length);
            };
            b.cljs$core$IFn$_invoke$arity$0 = c;
            b.cljs$core$IFn$_invoke$arity$1 = d;
            return b
          }()
        }(function(c) {
          var f = c[1];
          if(1 === f) {
            return c[7] = 0, c[2] = null, c[1] = 2, new cljs.core.Keyword(null, "recur", "recur", 1122293407)
          }
          if(2 === f) {
            return f = c[7], f = f < a, cljs.core.truth_(f) ? c[1] = 4 : c[1] = 5, new cljs.core.Keyword(null, "recur", "recur", 1122293407)
          }
          if(3 === f) {
            var f = c[2], h = cljs.core.async.close_BANG_.call(null, g);
            c[8] = f;
            return cljs.core.async.impl.ioc_helpers.return_chan.call(null, c, h)
          }
          return 4 === f ? cljs.core.async.impl.ioc_helpers.take_BANG_.call(null, c, 7, b) : 5 === f ? (c[2] = null, c[1] = 6, new cljs.core.Keyword(null, "recur", "recur", 1122293407)) : 6 === f ? (f = c[2], c[2] = f, c[1] = 3, new cljs.core.Keyword(null, "recur", "recur", 1122293407)) : 7 === f ? (f = c[9], f = c[2], h = cljs.core.not.call(null, null == f), c[9] = f, c[1] = h ? 8 : 9, new cljs.core.Keyword(null, "recur", "recur", 1122293407)) : 8 === f ? (f = c[9], cljs.core.async.impl.ioc_helpers.put_BANG_.call(null, 
          c, 11, g, f)) : 9 === f ? (c[2] = null, c[1] = 10, new cljs.core.Keyword(null, "recur", "recur", 1122293407)) : 10 === f ? (f = c[2], c[2] = f, c[1] = 6, new cljs.core.Keyword(null, "recur", "recur", 1122293407)) : 11 === f ? (f = c[7], h = c[2], c[7] = f + 1, c[10] = h, c[2] = null, c[1] = 2, new cljs.core.Keyword(null, "recur", "recur", 1122293407)) : null
        })
      }(), f = function() {
        var a = c.call(null);
        a[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = h;
        return a
      }();
      return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null, f)
    });
    return g
  }, a = function(a, e, f) {
    switch(arguments.length) {
      case 2:
        return b.call(this, a, e);
      case 3:
        return c.call(this, a, e, f)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$core$IFn$_invoke$arity$2 = b;
  a.cljs$core$IFn$_invoke$arity$3 = c;
  return a
}();
cljs.core.async.unique = function() {
  var a = null, b = function(b) {
    return a.call(null, b, null)
  }, c = function(a, b) {
    var c = cljs.core.async.chan.call(null, b), g = cljs.core.async.chan.call(null, 1);
    cljs.core.async.impl.dispatch.run.call(null, function() {
      var b = function() {
        return function(a) {
          return function() {
            var b = null, c = function() {
              var a = Array(11);
              a[0] = b;
              a[1] = 1;
              return a
            }, d = function(b) {
              for(;;) {
                var c = function() {
                  try {
                    for(;;) {
                      var c = a.call(null, b);
                      if(!cljs.core.keyword_identical_QMARK_.call(null, c, new cljs.core.Keyword(null, "recur", "recur", 1122293407))) {
                        return c
                      }
                    }
                  }catch(d) {
                    if(d instanceof Object) {
                      return b[5] = d, cljs.core.async.impl.ioc_helpers.process_exception.call(null, b), new cljs.core.Keyword(null, "recur", "recur", 1122293407)
                    }
                    if(new cljs.core.Keyword(null, "else", "else", 1017020587)) {
                      throw d;
                    }
                    return null
                  }
                }();
                if(!cljs.core.keyword_identical_QMARK_.call(null, c, new cljs.core.Keyword(null, "recur", "recur", 1122293407))) {
                  return c
                }
              }
            }, b = function(a) {
              switch(arguments.length) {
                case 0:
                  return c.call(this);
                case 1:
                  return d.call(this, a)
              }
              throw Error("Invalid arity: " + arguments.length);
            };
            b.cljs$core$IFn$_invoke$arity$0 = c;
            b.cljs$core$IFn$_invoke$arity$1 = d;
            return b
          }()
        }(function(b) {
          var e = b[1];
          if(1 === e) {
            var g;
            b[7] = null;
            b[2] = null;
            b[1] = 2;
            return new cljs.core.Keyword(null, "recur", "recur", 1122293407)
          }
          return 2 === e ? cljs.core.async.impl.ioc_helpers.take_BANG_.call(null, b, 4, a) : 3 === e ? (e = b[2], g = cljs.core.async.close_BANG_.call(null, c), b[8] = e, cljs.core.async.impl.ioc_helpers.return_chan.call(null, b, g)) : 4 === e ? (e = b[9], e = b[2], g = cljs.core.not.call(null, null == e), b[9] = e, b[1] = g ? 5 : 6, new cljs.core.Keyword(null, "recur", "recur", 1122293407)) : 5 === e ? (e = b[9], g = b[7], e = cljs.core._EQ_.call(null, e, g), b[1] = e ? 8 : 9, new cljs.core.Keyword(null, 
          "recur", "recur", 1122293407)) : 6 === e ? (b[2] = null, b[1] = 7, new cljs.core.Keyword(null, "recur", "recur", 1122293407)) : 7 === e ? (e = b[2], b[2] = e, b[1] = 3, new cljs.core.Keyword(null, "recur", "recur", 1122293407)) : 8 === e ? (g = b[7], b[7] = g, b[2] = null, b[1] = 2, new cljs.core.Keyword(null, "recur", "recur", 1122293407)) : 9 === e ? (e = b[9], cljs.core.async.impl.ioc_helpers.put_BANG_.call(null, b, 11, c, e)) : 10 === e ? (e = b[2], b[2] = e, b[1] = 7, new cljs.core.Keyword(null, 
          "recur", "recur", 1122293407)) : 11 === e ? (e = b[9], g = b[2], b[10] = g, b[7] = e, b[2] = null, b[1] = 2, new cljs.core.Keyword(null, "recur", "recur", 1122293407)) : null
        })
      }(), e = function() {
        var a = b.call(null);
        a[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = g;
        return a
      }();
      return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null, e)
    });
    return c
  }, a = function(a, e) {
    switch(arguments.length) {
      case 1:
        return b.call(this, a);
      case 2:
        return c.call(this, a, e)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$core$IFn$_invoke$arity$1 = b;
  a.cljs$core$IFn$_invoke$arity$2 = c;
  return a
}();
cljs.core.async.partition = function() {
  var a = null, b = function(b, c) {
    return a.call(null, b, c, null)
  }, c = function(a, b, c) {
    var g = cljs.core.async.chan.call(null, c), h = cljs.core.async.chan.call(null, 1);
    cljs.core.async.impl.dispatch.run.call(null, function() {
      var c = function() {
        return function(a) {
          return function() {
            var b = null, c = function() {
              var a = Array(14);
              a[0] = b;
              a[1] = 1;
              return a
            }, d = function(b) {
              for(;;) {
                var c = function() {
                  try {
                    for(;;) {
                      var c = a.call(null, b);
                      if(!cljs.core.keyword_identical_QMARK_.call(null, c, new cljs.core.Keyword(null, "recur", "recur", 1122293407))) {
                        return c
                      }
                    }
                  }catch(d) {
                    if(d instanceof Object) {
                      return b[5] = d, cljs.core.async.impl.ioc_helpers.process_exception.call(null, b), new cljs.core.Keyword(null, "recur", "recur", 1122293407)
                    }
                    if(new cljs.core.Keyword(null, "else", "else", 1017020587)) {
                      throw d;
                    }
                    return null
                  }
                }();
                if(!cljs.core.keyword_identical_QMARK_.call(null, c, new cljs.core.Keyword(null, "recur", "recur", 1122293407))) {
                  return c
                }
              }
            }, b = function(a) {
              switch(arguments.length) {
                case 0:
                  return c.call(this);
                case 1:
                  return d.call(this, a)
              }
              throw Error("Invalid arity: " + arguments.length);
            };
            b.cljs$core$IFn$_invoke$arity$0 = c;
            b.cljs$core$IFn$_invoke$arity$1 = d;
            return b
          }()
        }(function(c) {
          var f = c[1];
          if(1 === f) {
            var h = Array(a);
            c[7] = h;
            c[8] = 0;
            c[2] = null;
            c[1] = 2;
            return new cljs.core.Keyword(null, "recur", "recur", 1122293407)
          }
          if(2 === f) {
            return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null, c, 4, b)
          }
          if(3 === f) {
            return f = c[2], cljs.core.async.impl.ioc_helpers.return_chan.call(null, c, f)
          }
          if(4 === f) {
            var l = c[9], f = c[2], h = cljs.core.not.call(null, null == f);
            c[9] = f;
            c[1] = h ? 5 : 6;
            return new cljs.core.Keyword(null, "recur", "recur", 1122293407)
          }
          if(5 === f) {
            var l = c[9], h = c[7], f = c[8], m = c[10], h = h[f] = l, l = f + 1, f = l < a;
            c[11] = h;
            c[10] = l;
            cljs.core.truth_(f) ? c[1] = 8 : c[1] = 9;
            return new cljs.core.Keyword(null, "recur", "recur", 1122293407)
          }
          return 6 === f ? (f = c[8], cljs.core.truth_(0 < f) ? c[1] = 12 : c[1] = 13, new cljs.core.Keyword(null, "recur", "recur", 1122293407)) : 7 === f ? (f = c[2], c[2] = f, c[1] = 3, new cljs.core.Keyword(null, "recur", "recur", 1122293407)) : 8 === f ? (h = c[7], m = c[10], c[7] = h, c[8] = m, c[2] = null, c[1] = 2, new cljs.core.Keyword(null, "recur", "recur", 1122293407)) : 9 === f ? (h = c[7], f = cljs.core.vec.call(null, h), cljs.core.async.impl.ioc_helpers.put_BANG_.call(null, c, 11, 
          g, f)) : 10 === f ? (f = c[2], c[2] = f, c[1] = 7, new cljs.core.Keyword(null, "recur", "recur", 1122293407)) : 11 === f ? (f = c[2], h = Array(a), c[7] = h, c[8] = 0, c[12] = f, c[2] = null, c[1] = 2, new cljs.core.Keyword(null, "recur", "recur", 1122293407)) : 12 === f ? (h = c[7], f = cljs.core.vec.call(null, h), cljs.core.async.impl.ioc_helpers.put_BANG_.call(null, c, 15, g, f)) : 13 === f ? (c[2] = null, c[1] = 14, new cljs.core.Keyword(null, "recur", "recur", 1122293407)) : 14 === 
          f ? (h = c[2], f = cljs.core.async.close_BANG_.call(null, g), c[13] = h, c[2] = f, c[1] = 7, new cljs.core.Keyword(null, "recur", "recur", 1122293407)) : 15 === f ? (f = c[2], c[2] = f, c[1] = 14, new cljs.core.Keyword(null, "recur", "recur", 1122293407)) : null
        })
      }(), f = function() {
        var a = c.call(null);
        a[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = h;
        return a
      }();
      return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null, f)
    });
    return g
  }, a = function(a, e, f) {
    switch(arguments.length) {
      case 2:
        return b.call(this, a, e);
      case 3:
        return c.call(this, a, e, f)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$core$IFn$_invoke$arity$2 = b;
  a.cljs$core$IFn$_invoke$arity$3 = c;
  return a
}();
cljs.core.async.partition_by = function() {
  var a = null, b = function(b, c) {
    return a.call(null, b, c, null)
  }, c = function(a, b, c) {
    var g = cljs.core.async.chan.call(null, c), h = cljs.core.async.chan.call(null, 1);
    cljs.core.async.impl.dispatch.run.call(null, function() {
      var c = function() {
        return function(a) {
          return function() {
            var b = null, c = function() {
              var a = Array(15);
              a[0] = b;
              a[1] = 1;
              return a
            }, d = function(b) {
              for(;;) {
                var c = function() {
                  try {
                    for(;;) {
                      var c = a.call(null, b);
                      if(!cljs.core.keyword_identical_QMARK_.call(null, c, new cljs.core.Keyword(null, "recur", "recur", 1122293407))) {
                        return c
                      }
                    }
                  }catch(d) {
                    if(d instanceof Object) {
                      return b[5] = d, cljs.core.async.impl.ioc_helpers.process_exception.call(null, b), new cljs.core.Keyword(null, "recur", "recur", 1122293407)
                    }
                    if(new cljs.core.Keyword(null, "else", "else", 1017020587)) {
                      throw d;
                    }
                    return null
                  }
                }();
                if(!cljs.core.keyword_identical_QMARK_.call(null, c, new cljs.core.Keyword(null, "recur", "recur", 1122293407))) {
                  return c
                }
              }
            }, b = function(a) {
              switch(arguments.length) {
                case 0:
                  return c.call(this);
                case 1:
                  return d.call(this, a)
              }
              throw Error("Invalid arity: " + arguments.length);
            };
            b.cljs$core$IFn$_invoke$arity$0 = c;
            b.cljs$core$IFn$_invoke$arity$1 = d;
            return b
          }()
        }(function(c) {
          var f = c[1];
          if(1 === f) {
            var h = [], l = new cljs.core.Keyword("cljs.core.async", "nothing", "cljs.core.async/nothing", 4382193538);
            c[7] = l;
            c[8] = h;
            c[2] = null;
            c[1] = 2;
            return new cljs.core.Keyword(null, "recur", "recur", 1122293407)
          }
          if(2 === f) {
            return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null, c, 4, b)
          }
          if(3 === f) {
            return f = c[2], cljs.core.async.impl.ioc_helpers.return_chan.call(null, c, f)
          }
          if(4 === f) {
            var m = c[9], f = c[2], l = cljs.core.not.call(null, null == f);
            c[9] = f;
            c[1] = l ? 5 : 6;
            return new cljs.core.Keyword(null, "recur", "recur", 1122293407)
          }
          return 5 === f ? (l = c[7], m = c[9], f = c[10], m = a.call(null, m), f = cljs.core._EQ_.call(null, m, l), l = cljs.core.keyword_identical_QMARK_.call(null, l, new cljs.core.Keyword("cljs.core.async", "nothing", "cljs.core.async/nothing", 4382193538)), c[10] = m, cljs.core.truth_(f || l) ? c[1] = 8 : c[1] = 9, new cljs.core.Keyword(null, "recur", "recur", 1122293407)) : 6 === f ? (h = c[8], f = 0 < h.length, cljs.core.truth_(f) ? c[1] = 12 : c[1] = 13, new cljs.core.Keyword(null, "recur", 
          "recur", 1122293407)) : 7 === f ? (f = c[2], c[2] = f, c[1] = 3, new cljs.core.Keyword(null, "recur", "recur", 1122293407)) : 8 === f ? (h = c[8], m = c[9], f = c[10], l = h.push(m), c[11] = l, c[7] = f, c[8] = h, c[2] = null, c[1] = 2, new cljs.core.Keyword(null, "recur", "recur", 1122293407)) : 9 === f ? (h = c[8], f = cljs.core.vec.call(null, h), cljs.core.async.impl.ioc_helpers.put_BANG_.call(null, c, 11, g, f)) : 10 === f ? (f = c[2], c[2] = f, c[1] = 7, new cljs.core.Keyword(null, 
          "recur", "recur", 1122293407)) : 11 === f ? (m = c[9], f = c[10], l = c[2], h = [], m = h.push(m), c[12] = m, c[13] = l, c[7] = f, c[8] = h, c[2] = null, c[1] = 2, new cljs.core.Keyword(null, "recur", "recur", 1122293407)) : 12 === f ? (h = c[8], f = cljs.core.vec.call(null, h), cljs.core.async.impl.ioc_helpers.put_BANG_.call(null, c, 15, g, f)) : 13 === f ? (c[2] = null, c[1] = 14, new cljs.core.Keyword(null, "recur", "recur", 1122293407)) : 14 === f ? (l = c[2], f = cljs.core.async.close_BANG_.call(null, 
          g), c[14] = l, c[2] = f, c[1] = 7, new cljs.core.Keyword(null, "recur", "recur", 1122293407)) : 15 === f ? (f = c[2], c[2] = f, c[1] = 14, new cljs.core.Keyword(null, "recur", "recur", 1122293407)) : null
        })
      }(), f = function() {
        var a = c.call(null);
        a[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = h;
        return a
      }();
      return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null, f)
    });
    return g
  }, a = function(a, e, f) {
    switch(arguments.length) {
      case 2:
        return b.call(this, a, e);
      case 3:
        return c.call(this, a, e, f)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$core$IFn$_invoke$arity$2 = b;
  a.cljs$core$IFn$_invoke$arity$3 = c;
  return a
}();
var examples = {prime:{}};
examples.prime.prime_QMARK_ = function(a) {
  return cljs.core._EQ_.call(null, a, 2) ? !0 : 1 >= a ? !1 : cljs.core.odd_QMARK_.call(null, a) ? 0 === cljs.core.count.call(null, cljs.core.filter.call(null, function(b) {
    return 0 === cljs.core.mod.call(null, a, b)
  }, cljs.core.range.call(null, 3, a, 2))) : new cljs.core.Keyword(null, "else", "else", 1017020587) ? !1 : null
};
examples.prime.lazyPrimes = function() {
  return cljs.core.filter.call(null, examples.prime.prime_QMARK_, cljs.core.iterate.call(null, cljs.core.inc, 2))
};
examples.prime.chan_iterate = function() {
  var a = cljs.core.async.chan.call(null), b = cljs.core.async.chan.call(null, 1);
  cljs.core.async.impl.dispatch.run.call(null, function() {
    var c = function() {
      return function(a) {
        return function() {
          var b = null, c = function() {
            var a = Array(14);
            a[0] = b;
            a[1] = 1;
            return a
          }, d = function(b) {
            for(;;) {
              var c = function() {
                try {
                  for(;;) {
                    var c = a.call(null, b);
                    if(!cljs.core.keyword_identical_QMARK_.call(null, c, new cljs.core.Keyword(null, "recur", "recur", 1122293407))) {
                      return c
                    }
                  }
                }catch(d) {
                  if(d instanceof Object) {
                    return b[5] = d, cljs.core.async.impl.ioc_helpers.process_exception.call(null, b), new cljs.core.Keyword(null, "recur", "recur", 1122293407)
                  }
                  if(new cljs.core.Keyword(null, "else", "else", 1017020587)) {
                    throw d;
                  }
                  return null
                }
              }();
              if(!cljs.core.keyword_identical_QMARK_.call(null, c, new cljs.core.Keyword(null, "recur", "recur", 1122293407))) {
                return c
              }
            }
          }, b = function(a) {
            switch(arguments.length) {
              case 0:
                return c.call(this);
              case 1:
                return d.call(this, a)
            }
            throw Error("Invalid arity: " + arguments.length);
          };
          b.cljs$core$IFn$_invoke$arity$0 = c;
          b.cljs$core$IFn$_invoke$arity$1 = d;
          return b
        }()
      }(function(b) {
        var c = b[1];
        if(1 === c) {
          var c = cljs.core.iterate.call(null, cljs.core.inc, 2), c = cljs.core.seq.call(null, c), d, h, l;
          b[7] = c;
          b[8] = null;
          b[9] = 0;
          b[10] = 0;
          b[2] = null;
          b[1] = 2;
          return new cljs.core.Keyword(null, "recur", "recur", 1122293407)
        }
        if(2 === c) {
          return h = b[9], l = b[10], cljs.core.truth_(l < h) ? b[1] = 4 : b[1] = 5, new cljs.core.Keyword(null, "recur", "recur", 1122293407)
        }
        if(3 === c) {
          return c = b[2], cljs.core.async.impl.ioc_helpers.return_chan.call(null, b, c)
        }
        if(4 === c) {
          return d = b[8], l = b[10], c = cljs.core._nth.call(null, d, l), cljs.core.async.impl.ioc_helpers.put_BANG_.call(null, b, 7, a, c)
        }
        if(5 === c) {
          return h = b[11], c = b[7], c = cljs.core.seq.call(null, c), b[11] = c, b[1] = c ? 8 : 9, new cljs.core.Keyword(null, "recur", "recur", 1122293407)
        }
        if(6 === c) {
          return c = b[2], b[2] = c, b[1] = 3, new cljs.core.Keyword(null, "recur", "recur", 1122293407)
        }
        if(7 === c) {
          c = b[7];
          d = b[8];
          h = b[9];
          l = b[10];
          var m = b[2];
          b[7] = c;
          b[8] = d;
          b[9] = h;
          b[10] = l + 1;
          b[12] = m;
          b[2] = null;
          b[1] = 2;
          return new cljs.core.Keyword(null, "recur", "recur", 1122293407)
        }
        return 8 === c ? (h = b[11], c = cljs.core.chunked_seq_QMARK_.call(null, h), b[1] = c ? 11 : 12, new cljs.core.Keyword(null, "recur", "recur", 1122293407)) : 9 === c ? (b[2] = null, b[1] = 10, new cljs.core.Keyword(null, "recur", "recur", 1122293407)) : 10 === c ? (c = b[2], b[2] = c, b[1] = 6, new cljs.core.Keyword(null, "recur", "recur", 1122293407)) : 11 === c ? (h = b[11], c = cljs.core.chunk_first.call(null, h), h = cljs.core.chunk_rest.call(null, h), l = cljs.core.count.call(null, c), 
        b[7] = h, b[8] = c, b[9] = l, b[10] = 0, b[2] = null, b[1] = 2, new cljs.core.Keyword(null, "recur", "recur", 1122293407)) : 12 === c ? (h = b[11], c = cljs.core.first.call(null, h), cljs.core.async.impl.ioc_helpers.put_BANG_.call(null, b, 14, a, c)) : 13 === c ? (c = b[2], b[2] = c, b[1] = 10, new cljs.core.Keyword(null, "recur", "recur", 1122293407)) : 14 === c ? (h = b[11], l = b[2], c = cljs.core.next.call(null, h), b[13] = l, b[7] = c, b[8] = null, b[9] = 0, b[10] = 0, b[2] = null, b[1] = 
        2, new cljs.core.Keyword(null, "recur", "recur", 1122293407)) : null
      })
    }(), d = function() {
      var a = c.call(null);
      a[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = b;
      return a
    }();
    return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null, d)
  });
  return a
};
examples.prime.chan_primes = function() {
  return cljs.core.async.filter_LT_.call(null, examples.prime.prime_QMARK_, examples.prime.chan_iterate.call(null))
};
var hoare = {utils:{}};
hoare.utils.println_chan = function(a) {
  var b = cljs.core.async.chan.call(null, 1);
  cljs.core.async.impl.dispatch.run.call(null, function() {
    var c = function() {
      return function(a) {
        return function() {
          var b = null, c = function() {
            var a = Array(9);
            a[0] = b;
            a[1] = 1;
            return a
          }, d = function(b) {
            for(;;) {
              var c = function() {
                try {
                  for(;;) {
                    var c = a.call(null, b);
                    if(!cljs.core.keyword_identical_QMARK_.call(null, c, new cljs.core.Keyword(null, "recur", "recur", 1122293407))) {
                      return c
                    }
                  }
                }catch(d) {
                  if(d instanceof Object) {
                    return b[5] = d, cljs.core.async.impl.ioc_helpers.process_exception.call(null, b), new cljs.core.Keyword(null, "recur", "recur", 1122293407)
                  }
                  if(new cljs.core.Keyword(null, "else", "else", 1017020587)) {
                    throw d;
                  }
                  return null
                }
              }();
              if(!cljs.core.keyword_identical_QMARK_.call(null, c, new cljs.core.Keyword(null, "recur", "recur", 1122293407))) {
                return c
              }
            }
          }, b = function(a) {
            switch(arguments.length) {
              case 0:
                return c.call(this);
              case 1:
                return d.call(this, a)
            }
            throw Error("Invalid arity: " + arguments.length);
          };
          b.cljs$core$IFn$_invoke$arity$0 = c;
          b.cljs$core$IFn$_invoke$arity$1 = d;
          return b
        }()
      }(function(b) {
        var c = b[1];
        return 8 === c ? (c = b[2], b[7] = c, b[2] = null, b[1] = 3, new cljs.core.Keyword(null, "recur", "recur", 1122293407)) : 7 === c ? (c = b[2], b[2] = c, b[1] = 4, new cljs.core.Keyword(null, "recur", "recur", 1122293407)) : 6 === c ? (c = console.log("Channel was closed"), b[2] = c, b[1] = 7, new cljs.core.Keyword(null, "recur", "recur", 1122293407)) : 5 === c ? (c = b[7], c = console.log(c), b[8] = c, cljs.core.async.impl.ioc_helpers.take_BANG_.call(null, b, 8, a)) : 4 === c ? (c = b[2], 
        cljs.core.async.impl.ioc_helpers.return_chan.call(null, b, c)) : 3 === c ? (c = b[7], c = cljs.core.not.call(null, null == c), b[1] = c ? 5 : 6, new cljs.core.Keyword(null, "recur", "recur", 1122293407)) : 2 === c ? (c = b[2], b[7] = c, b[2] = null, b[1] = 3, new cljs.core.Keyword(null, "recur", "recur", 1122293407)) : 1 === c ? cljs.core.async.impl.ioc_helpers.take_BANG_.call(null, b, 2, a) : null
      })
    }(), d = function() {
      var a = c.call(null);
      a[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = b;
      return a
    }();
    return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null, d)
  });
  return b
};
hoare.utils.print_chan = function(a) {
  var b = cljs.core.async.chan.call(null, 1);
  cljs.core.async.impl.dispatch.run.call(null, function() {
    var c = function() {
      return function(a) {
        return function() {
          var b = null, c = function() {
            var a = Array(9);
            a[0] = b;
            a[1] = 1;
            return a
          }, d = function(b) {
            for(;;) {
              var c = function() {
                try {
                  for(;;) {
                    var c = a.call(null, b);
                    if(!cljs.core.keyword_identical_QMARK_.call(null, c, new cljs.core.Keyword(null, "recur", "recur", 1122293407))) {
                      return c
                    }
                  }
                }catch(d) {
                  if(d instanceof Object) {
                    return b[5] = d, cljs.core.async.impl.ioc_helpers.process_exception.call(null, b), new cljs.core.Keyword(null, "recur", "recur", 1122293407)
                  }
                  if(new cljs.core.Keyword(null, "else", "else", 1017020587)) {
                    throw d;
                  }
                  return null
                }
              }();
              if(!cljs.core.keyword_identical_QMARK_.call(null, c, new cljs.core.Keyword(null, "recur", "recur", 1122293407))) {
                return c
              }
            }
          }, b = function(a) {
            switch(arguments.length) {
              case 0:
                return c.call(this);
              case 1:
                return d.call(this, a)
            }
            throw Error("Invalid arity: " + arguments.length);
          };
          b.cljs$core$IFn$_invoke$arity$0 = c;
          b.cljs$core$IFn$_invoke$arity$1 = d;
          return b
        }()
      }(function(b) {
        var c = b[1];
        return 8 === c ? (c = b[2], b[7] = c, b[2] = null, b[1] = 3, new cljs.core.Keyword(null, "recur", "recur", 1122293407)) : 7 === c ? (c = b[2], b[2] = c, b[1] = 4, new cljs.core.Keyword(null, "recur", "recur", 1122293407)) : 6 === c ? (c = console.log("Channel was closed"), b[2] = c, b[1] = 7, new cljs.core.Keyword(null, "recur", "recur", 1122293407)) : 5 === c ? (c = b[7], c = console.log(c), b[8] = c, cljs.core.async.impl.ioc_helpers.take_BANG_.call(null, b, 8, a)) : 4 === c ? (c = b[2], 
        cljs.core.async.impl.ioc_helpers.return_chan.call(null, b, c)) : 3 === c ? (c = b[7], c = cljs.core.not.call(null, null == c), b[1] = c ? 5 : 6, new cljs.core.Keyword(null, "recur", "recur", 1122293407)) : 2 === c ? (c = b[2], b[7] = c, b[2] = null, b[1] = 3, new cljs.core.Keyword(null, "recur", "recur", 1122293407)) : 1 === c ? cljs.core.async.impl.ioc_helpers.take_BANG_.call(null, b, 2, a) : null
      })
    }(), d = function() {
      var a = c.call(null);
      a[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = b;
      return a
    }();
    return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null, d)
  });
  return b
};
cljs.core.match = {};
cljs.core.match.backtrack = Error();
hoare.coroutines = {};
hoare.coroutines.copy = function(a, b) {
  var c = cljs.core.async.chan.call(null, 1);
  cljs.core.async.impl.dispatch.run.call(null, function() {
    var d = function() {
      return function(a) {
        return function() {
          var b = null, c = function() {
            var a = Array(9);
            a[0] = b;
            a[1] = 1;
            return a
          }, d = function(b) {
            for(;;) {
              var c = function() {
                try {
                  for(;;) {
                    var c = a.call(null, b);
                    if(!cljs.core.keyword_identical_QMARK_.call(null, c, new cljs.core.Keyword(null, "recur", "recur", 1122293407))) {
                      return c
                    }
                  }
                }catch(d) {
                  if(d instanceof Object) {
                    return b[5] = d, cljs.core.async.impl.ioc_helpers.process_exception.call(null, b), new cljs.core.Keyword(null, "recur", "recur", 1122293407)
                  }
                  if(new cljs.core.Keyword(null, "else", "else", 1017020587)) {
                    throw d;
                  }
                  return null
                }
              }();
              if(!cljs.core.keyword_identical_QMARK_.call(null, c, new cljs.core.Keyword(null, "recur", "recur", 1122293407))) {
                return c
              }
            }
          }, b = function(a) {
            switch(arguments.length) {
              case 0:
                return c.call(this);
              case 1:
                return d.call(this, a)
            }
            throw Error("Invalid arity: " + arguments.length);
          };
          b.cljs$core$IFn$_invoke$arity$0 = c;
          b.cljs$core$IFn$_invoke$arity$1 = d;
          return b
        }()
      }(function(c) {
        var d = c[1];
        return 9 === d ? (d = c[2], c[7] = d, c[2] = null, c[1] = 3, new cljs.core.Keyword(null, "recur", "recur", 1122293407)) : 8 === d ? (c[8] = c[2], cljs.core.async.impl.ioc_helpers.take_BANG_.call(null, c, 9, a)) : 7 === d ? (d = c[2], c[2] = d, c[1] = 4, new cljs.core.Keyword(null, "recur", "recur", 1122293407)) : 6 === d ? (d = cljs.core.async.close_BANG_.call(null, b), c[2] = d, c[1] = 7, new cljs.core.Keyword(null, "recur", "recur", 1122293407)) : 5 === d ? (d = c[7], cljs.core.async.impl.ioc_helpers.put_BANG_.call(null, 
        c, 8, b, d)) : 4 === d ? (d = c[2], cljs.core.async.impl.ioc_helpers.return_chan.call(null, c, d)) : 3 === d ? (d = c[7], d = cljs.core.not.call(null, null == d), c[1] = d ? 5 : 6, new cljs.core.Keyword(null, "recur", "recur", 1122293407)) : 2 === d ? (d = c[2], c[7] = d, c[2] = null, c[1] = 3, new cljs.core.Keyword(null, "recur", "recur", 1122293407)) : 1 === d ? cljs.core.async.impl.ioc_helpers.take_BANG_.call(null, c, 2, a) : null
      })
    }(), e = function() {
      var a = d.call(null);
      a[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c;
      return a
    }();
    return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null, e)
  });
  return c
};
hoare.coroutines.squash = function(a) {
  var b = cljs.core.async.chan.call(null), c = cljs.core.async.chan.call(null, 1);
  cljs.core.async.impl.dispatch.run.call(null, function() {
    var d = function() {
      return function(a) {
        return function() {
          var b = null, c = function() {
            var a = Array(14);
            a[0] = b;
            a[1] = 1;
            return a
          }, d = function(b) {
            for(;;) {
              var c = function() {
                try {
                  for(;;) {
                    var c = a.call(null, b);
                    if(!cljs.core.keyword_identical_QMARK_.call(null, c, new cljs.core.Keyword(null, "recur", "recur", 1122293407))) {
                      return c
                    }
                  }
                }catch(d) {
                  if(d instanceof Object) {
                    return b[5] = d, cljs.core.async.impl.ioc_helpers.process_exception.call(null, b), new cljs.core.Keyword(null, "recur", "recur", 1122293407)
                  }
                  if(new cljs.core.Keyword(null, "else", "else", 1017020587)) {
                    throw d;
                  }
                  return null
                }
              }();
              if(!cljs.core.keyword_identical_QMARK_.call(null, c, new cljs.core.Keyword(null, "recur", "recur", 1122293407))) {
                return c
              }
            }
          }, b = function(a) {
            switch(arguments.length) {
              case 0:
                return c.call(this);
              case 1:
                return d.call(this, a)
            }
            throw Error("Invalid arity: " + arguments.length);
          };
          b.cljs$core$IFn$_invoke$arity$0 = c;
          b.cljs$core$IFn$_invoke$arity$1 = d;
          return b
        }()
      }(function(c) {
        var d = c[1];
        if(1 === d) {
          return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null, c, 2, a)
        }
        if(2 === d) {
          var e = c[2], d = new cljs.core.Keyword(null, "NOASTERIX", "NOASTERIX", 2023569039);
          c[7] = d;
          c[8] = e;
          c[2] = null;
          c[1] = 3;
          return new cljs.core.Keyword(null, "recur", "recur", 1122293407)
        }
        return 3 === d ? (e = c[8], cljs.core.truth_(null == e) ? c[1] = 5 : c[1] = 6, new cljs.core.Keyword(null, "recur", "recur", 1122293407)) : 4 === d ? (d = c[2], cljs.core.async.impl.ioc_helpers.return_chan.call(null, c, d)) : 5 === d ? (d = c[7], d = cljs.core._EQ_.call(null, d, new cljs.core.Keyword(null, "ONEASTERIX", "ONEASTERIX", 3430637162)), c[1] = d ? 8 : 9, new cljs.core.Keyword(null, "recur", "recur", 1122293407)) : 6 === d ? (d = c[7], e = c[8], e = cljs.core.not_EQ_.call(null, 
        e, "*"), d = cljs.core._EQ_.call(null, d, new cljs.core.Keyword(null, "NOASTERIX", "NOASTERIX", 2023569039)), cljs.core.truth_(e && d) ? c[1] = 12 : c[1] = 13, new cljs.core.Keyword(null, "recur", "recur", 1122293407)) : 7 === d ? (d = c[2], c[2] = d, c[1] = 4, new cljs.core.Keyword(null, "recur", "recur", 1122293407)) : 8 === d ? cljs.core.async.impl.ioc_helpers.put_BANG_.call(null, c, 11, b, "*") : 9 === d ? (c[2] = null, c[1] = 10, new cljs.core.Keyword(null, "recur", "recur", 1122293407)) : 
        10 === d ? (e = c[2], d = cljs.core.async.close_BANG_.call(null, b), c[9] = e, c[2] = d, c[1] = 7, new cljs.core.Keyword(null, "recur", "recur", 1122293407)) : 11 === d ? (d = c[2], c[2] = d, c[1] = 10, new cljs.core.Keyword(null, "recur", "recur", 1122293407)) : 12 === d ? (e = c[8], cljs.core.async.impl.ioc_helpers.put_BANG_.call(null, c, 15, b, e)) : 13 === d ? (d = c[7], e = c[8], e = cljs.core.not_EQ_.call(null, e, "*"), d = cljs.core._EQ_.call(null, d, new cljs.core.Keyword(null, "ONEASTERIX", 
        "ONEASTERIX", 3430637162)), cljs.core.truth_(e && d) ? c[1] = 17 : c[1] = 18, new cljs.core.Keyword(null, "recur", "recur", 1122293407)) : 14 === d ? (d = c[2], c[2] = d, c[1] = 7, new cljs.core.Keyword(null, "recur", "recur", 1122293407)) : 15 === d ? (c[10] = c[2], cljs.core.async.impl.ioc_helpers.take_BANG_.call(null, c, 16, a)) : 16 === d ? (e = c[2], d = new cljs.core.Keyword(null, "NOASTERIX", "NOASTERIX", 2023569039), c[7] = d, c[8] = e, c[2] = null, c[1] = 3, new cljs.core.Keyword(null, 
        "recur", "recur", 1122293407)) : 17 === d ? cljs.core.async.impl.ioc_helpers.put_BANG_.call(null, c, 20, b, "*") : 18 === d ? (d = c[7], e = c[8], e = cljs.core._EQ_.call(null, e, "*"), d = cljs.core._EQ_.call(null, d, new cljs.core.Keyword(null, "NOASTERIX", "NOASTERIX", 2023569039)), cljs.core.truth_(e && d) ? c[1] = 23 : c[1] = 24, new cljs.core.Keyword(null, "recur", "recur", 1122293407)) : 19 === d ? (d = c[2], c[2] = d, c[1] = 14, new cljs.core.Keyword(null, "recur", "recur", 1122293407)) : 
        20 === d ? (e = c[8], c[11] = c[2], cljs.core.async.impl.ioc_helpers.put_BANG_.call(null, c, 21, b, e)) : 21 === d ? (c[12] = c[2], cljs.core.async.impl.ioc_helpers.take_BANG_.call(null, c, 22, a)) : 22 === d ? (e = c[2], d = new cljs.core.Keyword(null, "NOASTERIX", "NOASTERIX", 2023569039), c[7] = d, c[8] = e, c[2] = null, c[1] = 3, new cljs.core.Keyword(null, "recur", "recur", 1122293407)) : 23 === d ? cljs.core.async.impl.ioc_helpers.take_BANG_.call(null, c, 26, a) : 24 === d ? (d = c[7], 
        e = c[8], e = cljs.core._EQ_.call(null, e, "*"), d = cljs.core._EQ_.call(null, d, new cljs.core.Keyword(null, "ONEASTERIX", "ONEASTERIX", 3430637162)), cljs.core.truth_(e && d) ? c[1] = 27 : c[1] = 28, new cljs.core.Keyword(null, "recur", "recur", 1122293407)) : 25 === d ? (d = c[2], c[2] = d, c[1] = 19, new cljs.core.Keyword(null, "recur", "recur", 1122293407)) : 26 === d ? (e = c[2], d = new cljs.core.Keyword(null, "ONEASTERIX", "ONEASTERIX", 3430637162), c[7] = d, c[8] = e, c[2] = null, 
        c[1] = 3, new cljs.core.Keyword(null, "recur", "recur", 1122293407)) : 27 === d ? cljs.core.async.impl.ioc_helpers.put_BANG_.call(null, c, 30, b, "^") : 28 === d ? (c[2] = null, c[1] = 29, new cljs.core.Keyword(null, "recur", "recur", 1122293407)) : 29 === d ? (d = c[2], c[2] = d, c[1] = 25, new cljs.core.Keyword(null, "recur", "recur", 1122293407)) : 30 === d ? (c[13] = c[2], cljs.core.async.impl.ioc_helpers.take_BANG_.call(null, c, 31, a)) : 31 === d ? (e = c[2], d = new cljs.core.Keyword(null, 
        "NOASTERIX", "NOASTERIX", 2023569039), c[7] = d, c[8] = e, c[2] = null, c[1] = 3, new cljs.core.Keyword(null, "recur", "recur", 1122293407)) : null
      })
    }(), e = function() {
      var a = d.call(null);
      a[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c;
      return a
    }();
    return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null, e)
  });
  return b
};
hoare.coroutines.disassemble = function(a) {
  var b = cljs.core.async.chan.call(null), c = cljs.core.async.chan.call(null, 1);
  cljs.core.async.impl.dispatch.run.call(null, function() {
    var d = function() {
      return function(a) {
        return function() {
          var b = null, c = function() {
            var a = Array(12);
            a[0] = b;
            a[1] = 1;
            return a
          }, d = function(b) {
            for(;;) {
              var c = function() {
                try {
                  for(;;) {
                    var c = a.call(null, b);
                    if(!cljs.core.keyword_identical_QMARK_.call(null, c, new cljs.core.Keyword(null, "recur", "recur", 1122293407))) {
                      return c
                    }
                  }
                }catch(d) {
                  if(d instanceof Object) {
                    return b[5] = d, cljs.core.async.impl.ioc_helpers.process_exception.call(null, b), new cljs.core.Keyword(null, "recur", "recur", 1122293407)
                  }
                  if(new cljs.core.Keyword(null, "else", "else", 1017020587)) {
                    throw d;
                  }
                  return null
                }
              }();
              if(!cljs.core.keyword_identical_QMARK_.call(null, c, new cljs.core.Keyword(null, "recur", "recur", 1122293407))) {
                return c
              }
            }
          }, b = function(a) {
            switch(arguments.length) {
              case 0:
                return c.call(this);
              case 1:
                return d.call(this, a)
            }
            throw Error("Invalid arity: " + arguments.length);
          };
          b.cljs$core$IFn$_invoke$arity$0 = c;
          b.cljs$core$IFn$_invoke$arity$1 = d;
          return b
        }()
      }(function(c) {
        var d = c[1];
        if(1 === d) {
          return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null, c, 2, a)
        }
        if(2 === d) {
          var e = c[2];
          c[7] = e;
          c[2] = null;
          c[1] = 3;
          return new cljs.core.Keyword(null, "recur", "recur", 1122293407)
        }
        return 3 === d ? (e = c[7], d = cljs.core.not.call(null, null == e), c[1] = d ? 5 : 6, new cljs.core.Keyword(null, "recur", "recur", 1122293407)) : 4 === d ? (d = c[2], cljs.core.async.impl.ioc_helpers.return_chan.call(null, c, d)) : 5 === d ? (c[8] = 0, c[2] = null, c[1] = 8, new cljs.core.Keyword(null, "recur", "recur", 1122293407)) : 6 === d ? (d = cljs.core.async.close_BANG_.call(null, b), c[2] = d, c[1] = 7, new cljs.core.Keyword(null, "recur", "recur", 1122293407)) : 7 === d ? (d = 
        c[2], c[2] = d, c[1] = 4, new cljs.core.Keyword(null, "recur", "recur", 1122293407)) : 8 === d ? (d = c[8], cljs.core.truth_(80 > d) ? c[1] = 10 : c[1] = 11, new cljs.core.Keyword(null, "recur", "recur", 1122293407)) : 9 === d ? (c[9] = c[2], cljs.core.async.impl.ioc_helpers.put_BANG_.call(null, c, 14, b, " ")) : 10 === d ? (d = c[8], e = c[7], d = cljs.core.get.call(null, e, d), cljs.core.async.impl.ioc_helpers.put_BANG_.call(null, c, 13, b, d)) : 11 === d ? (c[2] = null, c[1] = 12, new cljs.core.Keyword(null, 
        "recur", "recur", 1122293407)) : 12 === d ? (d = c[2], c[2] = d, c[1] = 9, new cljs.core.Keyword(null, "recur", "recur", 1122293407)) : 13 === d ? (d = c[8], e = c[2], c[8] = d + 1, c[10] = e, c[2] = null, c[1] = 8, new cljs.core.Keyword(null, "recur", "recur", 1122293407)) : 14 === d ? (c[11] = c[2], cljs.core.async.impl.ioc_helpers.take_BANG_.call(null, c, 15, a)) : 15 === d ? (e = c[2], c[7] = e, c[2] = null, c[1] = 3, new cljs.core.Keyword(null, "recur", "recur", 1122293407)) : null
      })
    }(), e = function() {
      var a = d.call(null);
      a[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c;
      return a
    }();
    return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null, e)
  });
  return b
};
hoare.coroutines.assemble = function(a) {
  var b = cljs.core.async.chan.call(null), c = cljs.core.async.chan.call(null, 1);
  cljs.core.async.impl.dispatch.run.call(null, function() {
    var d = function() {
      return function(a) {
        return function() {
          var b = null, c = function() {
            var a = Array(13);
            a[0] = b;
            a[1] = 1;
            return a
          }, d = function(b) {
            for(;;) {
              var c = function() {
                try {
                  for(;;) {
                    var c = a.call(null, b);
                    if(!cljs.core.keyword_identical_QMARK_.call(null, c, new cljs.core.Keyword(null, "recur", "recur", 1122293407))) {
                      return c
                    }
                  }
                }catch(d) {
                  if(d instanceof Object) {
                    return b[5] = d, cljs.core.async.impl.ioc_helpers.process_exception.call(null, b), new cljs.core.Keyword(null, "recur", "recur", 1122293407)
                  }
                  if(new cljs.core.Keyword(null, "else", "else", 1017020587)) {
                    throw d;
                  }
                  return null
                }
              }();
              if(!cljs.core.keyword_identical_QMARK_.call(null, c, new cljs.core.Keyword(null, "recur", "recur", 1122293407))) {
                return c
              }
            }
          }, b = function(a) {
            switch(arguments.length) {
              case 0:
                return c.call(this);
              case 1:
                return d.call(this, a)
            }
            throw Error("Invalid arity: " + arguments.length);
          };
          b.cljs$core$IFn$_invoke$arity$0 = c;
          b.cljs$core$IFn$_invoke$arity$1 = d;
          return b
        }()
      }(function(c) {
        var d = c[1];
        if(1 === d) {
          return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null, c, 2, a)
        }
        if(2 === d) {
          var d = 0, e = c[2], l = "", m = new cljs.core.Keyword(null, "NO", "NO", 1013906739);
          c[7] = d;
          c[8] = m;
          c[9] = l;
          c[10] = e;
          c[2] = null;
          c[1] = 3;
          return new cljs.core.Keyword(null, "recur", "recur", 1122293407)
        }
        if(3 === d) {
          return d = c[7], cljs.core.truth_(125 >= d) ? c[1] = 5 : c[1] = 6, new cljs.core.Keyword(null, "recur", "recur", 1122293407)
        }
        if(4 === d) {
          return d = c[2], cljs.core.async.impl.ioc_helpers.return_chan.call(null, c, d)
        }
        if(5 === d) {
          return m = c[8], e = c[10], d = cljs.core.not_EQ_.call(null, e, null), e = cljs.core._EQ_.call(null, m, new cljs.core.Keyword(null, "NO", "NO", 1013906739)), cljs.core.truth_(d && e) ? c[1] = 8 : c[1] = 9, new cljs.core.Keyword(null, "recur", "recur", 1122293407)
        }
        if(6 === d) {
          return l = c[9], cljs.core.async.impl.ioc_helpers.put_BANG_.call(null, c, 12, b, l)
        }
        if(7 === d) {
          return d = c[2], c[2] = d, c[1] = 4, new cljs.core.Keyword(null, "recur", "recur", 1122293407)
        }
        if(8 === d) {
          return d = c[7], c[11] = d + 1, cljs.core.async.impl.ioc_helpers.take_BANG_.call(null, c, 11, a)
        }
        if(9 === d) {
          var d = c[7], l = c[9], e = c[10], d = d + 1, k = " ", e = [cljs.core.str(l), cljs.core.str(e)].join(""), m = new cljs.core.Keyword(null, "YES", "YES", 1013991993);
          c[7] = d;
          c[8] = m;
          c[9] = e;
          c[10] = k;
          c[2] = null;
          c[1] = 3;
          return new cljs.core.Keyword(null, "recur", "recur", 1122293407)
        }
        return 10 === d ? (d = c[2], c[2] = d, c[1] = 7, new cljs.core.Keyword(null, "recur", "recur", 1122293407)) : 11 === d ? (d = c[11], l = c[9], e = c[10], m = c[2], e = [cljs.core.str(l), cljs.core.str(e)].join(""), k = m, m = new cljs.core.Keyword(null, "NO", "NO", 1013906739), c[7] = d, c[8] = m, c[9] = e, c[10] = k, c[2] = null, c[1] = 3, new cljs.core.Keyword(null, "recur", "recur", 1122293407)) : 12 === d ? (e = c[2], d = cljs.core.async.close_BANG_.call(null, b), c[12] = e, c[2] = d, 
        c[1] = 7, new cljs.core.Keyword(null, "recur", "recur", 1122293407)) : null
      })
    }(), e = function() {
      var a = d.call(null);
      a[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c;
      return a
    }();
    return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null, e)
  });
  return b
};
hoare.coroutines.reformat = function(a) {
  var b = cljs.core.async.chan.call(null);
  hoare.coroutines.copy.call(null, hoare.coroutines.disassemble.call(null, a), b);
  return hoare.coroutines.assemble.call(null, b)
};
hoare.coroutines.reformat2 = function(a) {
  return hoare.coroutines.assemble.call(null, hoare.coroutines.disassemble.call(null, a))
};
hoare.coroutines.conwaysproblem = function(a) {
  return hoare.coroutines.assemble.call(null, hoare.coroutines.squash.call(null, hoare.coroutines.disassemble.call(null, a)))
};
var vince = {core:{}};
vince.core.testCopyWestEast = function() {
  var a = cljs.core.async.chan.call(null), b = cljs.core.async.chan.call(null);
  hoare.coroutines.copy.call(null, a, b);
  hoare.utils.println_chan.call(null, b);
  var c = cljs.core.async.chan.call(null, 1);
  cljs.core.async.impl.dispatch.run.call(null, function() {
    var b = function() {
      return function(a) {
        return function() {
          var b = null, c = function() {
            var a = Array(13);
            a[0] = b;
            a[1] = 1;
            return a
          }, d = function(b) {
            for(;;) {
              var c = function() {
                try {
                  for(;;) {
                    var c = a.call(null, b);
                    if(!cljs.core.keyword_identical_QMARK_.call(null, c, new cljs.core.Keyword(null, "recur", "recur", 1122293407))) {
                      return c
                    }
                  }
                }catch(d) {
                  if(d instanceof Object) {
                    return b[5] = d, cljs.core.async.impl.ioc_helpers.process_exception.call(null, b), new cljs.core.Keyword(null, "recur", "recur", 1122293407)
                  }
                  if(new cljs.core.Keyword(null, "else", "else", 1017020587)) {
                    throw d;
                  }
                  return null
                }
              }();
              if(!cljs.core.keyword_identical_QMARK_.call(null, c, new cljs.core.Keyword(null, "recur", "recur", 1122293407))) {
                return c
              }
            }
          }, b = function(a) {
            switch(arguments.length) {
              case 0:
                return c.call(this);
              case 1:
                return d.call(this, a)
            }
            throw Error("Invalid arity: " + arguments.length);
          };
          b.cljs$core$IFn$_invoke$arity$0 = c;
          b.cljs$core$IFn$_invoke$arity$1 = d;
          return b
        }()
      }(function(b) {
        var c = b[1];
        if(7 === c) {
          return cljs.core.async.impl.ioc_helpers.return_chan.call(null, b, b[2])
        }
        if(6 === c) {
          var c = b[2], d = cljs.core.async.close_BANG_.call(null, a), e = cljs.core.async.timeout.call(null, 1E3);
          b[7] = c;
          b[8] = d;
          return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null, b, 7, e)
        }
        return 5 === c ? (b[9] = b[2], cljs.core.async.impl.ioc_helpers.put_BANG_.call(null, b, 6, a, "West")) : 4 === c ? (c = b[2], d = cljs.core.async.timeout.call(null, 1E3), b[10] = c, cljs.core.async.impl.ioc_helpers.take_BANG_.call(null, b, 5, d)) : 3 === c ? (b[11] = b[2], cljs.core.async.impl.ioc_helpers.put_BANG_.call(null, b, 4, a, "from")) : 2 === c ? (c = b[2], d = cljs.core.async.timeout.call(null, 1E3), b[12] = c, cljs.core.async.impl.ioc_helpers.take_BANG_.call(null, b, 3, d)) : 1 === 
        c ? cljs.core.async.impl.ioc_helpers.put_BANG_.call(null, b, 2, a, "Hallo") : null
      })
    }(), e = function() {
      var a = b.call(null);
      a[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c;
      return a
    }();
    return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null, e)
  });
  return c
};
vince.core.testSquash = function() {
  var a = cljs.core.async.chan.call(null), b = hoare.coroutines.squash.call(null, a);
  hoare.utils.println_chan.call(null, b);
  var c = cljs.core.async.chan.call(null, 1);
  cljs.core.async.impl.dispatch.run.call(null, function() {
    var b = function() {
      return function(a) {
        return function() {
          var b = null, c = function() {
            var a = Array(21);
            a[0] = b;
            a[1] = 1;
            return a
          }, d = function(b) {
            for(;;) {
              var c = function() {
                try {
                  for(;;) {
                    var c = a.call(null, b);
                    if(!cljs.core.keyword_identical_QMARK_.call(null, c, new cljs.core.Keyword(null, "recur", "recur", 1122293407))) {
                      return c
                    }
                  }
                }catch(d) {
                  if(d instanceof Object) {
                    return b[5] = d, cljs.core.async.impl.ioc_helpers.process_exception.call(null, b), new cljs.core.Keyword(null, "recur", "recur", 1122293407)
                  }
                  if(new cljs.core.Keyword(null, "else", "else", 1017020587)) {
                    throw d;
                  }
                  return null
                }
              }();
              if(!cljs.core.keyword_identical_QMARK_.call(null, c, new cljs.core.Keyword(null, "recur", "recur", 1122293407))) {
                return c
              }
            }
          }, b = function(a) {
            switch(arguments.length) {
              case 0:
                return c.call(this);
              case 1:
                return d.call(this, a)
            }
            throw Error("Invalid arity: " + arguments.length);
          };
          b.cljs$core$IFn$_invoke$arity$0 = c;
          b.cljs$core$IFn$_invoke$arity$1 = d;
          return b
        }()
      }(function(b) {
        var c = b[1];
        if(1 === c) {
          return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null, b, 2, a, "*")
        }
        if(2 === c) {
          var c = b[2], d = cljs.core.async.timeout.call(null, 1E3);
          b[7] = c;
          return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null, b, 3, d)
        }
        if(3 === c) {
          return b[8] = b[2], cljs.core.async.impl.ioc_helpers.put_BANG_.call(null, b, 4, a, "*")
        }
        if(4 === c) {
          return c = b[2], d = cljs.core.async.timeout.call(null, 1E3), b[9] = c, cljs.core.async.impl.ioc_helpers.take_BANG_.call(null, b, 5, d)
        }
        if(5 === c) {
          return b[10] = b[2], cljs.core.async.impl.ioc_helpers.put_BANG_.call(null, b, 6, a, "H")
        }
        if(6 === c) {
          return b[11] = b[2], cljs.core.async.impl.ioc_helpers.put_BANG_.call(null, b, 7, a, "e")
        }
        if(7 === c) {
          return b[12] = b[2], cljs.core.async.impl.ioc_helpers.put_BANG_.call(null, b, 8, a, "l")
        }
        if(8 === c) {
          return b[13] = b[2], cljs.core.async.impl.ioc_helpers.put_BANG_.call(null, b, 9, a, "l")
        }
        if(9 === c) {
          return b[14] = b[2], cljs.core.async.impl.ioc_helpers.put_BANG_.call(null, b, 10, a, "o")
        }
        if(10 === c) {
          return b[15] = b[2], cljs.core.async.impl.ioc_helpers.put_BANG_.call(null, b, 11, a, "*")
        }
        if(11 === c) {
          return c = b[2], d = cljs.core.async.timeout.call(null, 1E3), b[16] = c, cljs.core.async.impl.ioc_helpers.take_BANG_.call(null, b, 12, d)
        }
        if(12 === c) {
          return b[17] = b[2], cljs.core.async.impl.ioc_helpers.put_BANG_.call(null, b, 13, a, "2")
        }
        if(13 === c) {
          return b[18] = b[2], cljs.core.async.impl.ioc_helpers.put_BANG_.call(null, b, 14, a, "*")
        }
        if(14 === c) {
          var c = b[2], d = cljs.core.async.close_BANG_.call(null, a), e = cljs.core.async.timeout.call(null, 1E3);
          b[19] = d;
          b[20] = c;
          return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null, b, 15, e)
        }
        return 15 === c ? (c = b[2], cljs.core.async.impl.ioc_helpers.return_chan.call(null, b, c)) : null
      })
    }(), e = function() {
      var a = b.call(null);
      a[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c;
      return a
    }();
    return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null, e)
  });
  return c
};
vince.core.set_html_BANG_ = function(a, b) {
  return a.innerHTML = [cljs.core.str(a.innerHTML), cljs.core.str(b), cljs.core.str("\n")].join("")
};
vince.core.by_id = function(a) {
  return document.getElementById(cljs.core.name.call(null, a))
};
vince.core.printTA = function(a, b) {
  var c = cljs.core.async.chan.call(null), d = cljs.core.async.chan.call(null, 1);
  cljs.core.async.impl.dispatch.run.call(null, function() {
    var e = function() {
      return function(a) {
        return function() {
          var b = null, c = function() {
            var a = Array(10);
            a[0] = b;
            a[1] = 1;
            return a
          }, d = function(b) {
            for(;;) {
              var c = function() {
                try {
                  for(;;) {
                    var c = a.call(null, b);
                    if(!cljs.core.keyword_identical_QMARK_.call(null, c, new cljs.core.Keyword(null, "recur", "recur", 1122293407))) {
                      return c
                    }
                  }
                }catch(d) {
                  if(d instanceof Object) {
                    return b[5] = d, cljs.core.async.impl.ioc_helpers.process_exception.call(null, b), new cljs.core.Keyword(null, "recur", "recur", 1122293407)
                  }
                  if(new cljs.core.Keyword(null, "else", "else", 1017020587)) {
                    throw d;
                  }
                  return null
                }
              }();
              if(!cljs.core.keyword_identical_QMARK_.call(null, c, new cljs.core.Keyword(null, "recur", "recur", 1122293407))) {
                return c
              }
            }
          }, b = function(a) {
            switch(arguments.length) {
              case 0:
                return c.call(this);
              case 1:
                return d.call(this, a)
            }
            throw Error("Invalid arity: " + arguments.length);
          };
          b.cljs$core$IFn$_invoke$arity$0 = c;
          b.cljs$core$IFn$_invoke$arity$1 = d;
          return b
        }()
      }(function(d) {
        var e = d[1];
        if(9 === e) {
          return e = d[2], d[7] = e, d[2] = null, d[1] = 3, new cljs.core.Keyword(null, "recur", "recur", 1122293407)
        }
        if(8 === e) {
          return d[8] = d[2], cljs.core.async.impl.ioc_helpers.take_BANG_.call(null, d, 9, c)
        }
        if(7 === e) {
          return e = d[2], d[2] = e, d[1] = 4, new cljs.core.Keyword(null, "recur", "recur", 1122293407)
        }
        if(6 === e) {
          return e = vince.core.set_html_BANG_.call(null, a, "Channel was closed"), d[2] = e, d[1] = 7, new cljs.core.Keyword(null, "recur", "recur", 1122293407)
        }
        if(5 === e) {
          var e = d[7], e = vince.core.set_html_BANG_.call(null, a, e), f = cljs.core.async.timeout.call(null, b);
          d[9] = e;
          return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null, d, 8, f)
        }
        return 4 === e ? (e = d[2], cljs.core.async.impl.ioc_helpers.return_chan.call(null, d, e)) : 3 === e ? (e = d[7], e = cljs.core.not.call(null, null == e), d[1] = e ? 5 : 6, new cljs.core.Keyword(null, "recur", "recur", 1122293407)) : 2 === e ? (e = d[2], d[7] = e, d[2] = null, d[1] = 3, new cljs.core.Keyword(null, "recur", "recur", 1122293407)) : 1 === e ? cljs.core.async.impl.ioc_helpers.take_BANG_.call(null, d, 2, c) : null
      })
    }(), f = function() {
      var a = e.call(null);
      a[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = d;
      return a
    }();
    return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null, f)
  });
  return c
};
vince.core.primeToTA = function(a, b) {
  var c = cljs.core.async.chan.call(null, 1);
  cljs.core.async.impl.dispatch.run.call(null, function() {
    var d = function() {
      return function(a) {
        return function() {
          var b = null, c = function() {
            var a = Array(11);
            a[0] = b;
            a[1] = 1;
            return a
          }, d = function(b) {
            for(;;) {
              var c = function() {
                try {
                  for(;;) {
                    var c = a.call(null, b);
                    if(!cljs.core.keyword_identical_QMARK_.call(null, c, new cljs.core.Keyword(null, "recur", "recur", 1122293407))) {
                      return c
                    }
                  }
                }catch(d) {
                  if(d instanceof Object) {
                    return b[5] = d, cljs.core.async.impl.ioc_helpers.process_exception.call(null, b), new cljs.core.Keyword(null, "recur", "recur", 1122293407)
                  }
                  if(new cljs.core.Keyword(null, "else", "else", 1017020587)) {
                    throw d;
                  }
                  return null
                }
              }();
              if(!cljs.core.keyword_identical_QMARK_.call(null, c, new cljs.core.Keyword(null, "recur", "recur", 1122293407))) {
                return c
              }
            }
          }, b = function(a) {
            switch(arguments.length) {
              case 0:
                return c.call(this);
              case 1:
                return d.call(this, a)
            }
            throw Error("Invalid arity: " + arguments.length);
          };
          b.cljs$core$IFn$_invoke$arity$0 = c;
          b.cljs$core$IFn$_invoke$arity$1 = d;
          return b
        }()
      }(function(c) {
        var d = c[1];
        if(8 === d) {
          return d = c[7], c[8] = c[2], c[7] = d + 1, c[2] = null, c[1] = 3, new cljs.core.Keyword(null, "recur", "recur", 1122293407)
        }
        if(7 === d) {
          return d = c[2], c[2] = d, c[1] = 4, new cljs.core.Keyword(null, "recur", "recur", 1122293407)
        }
        if(6 === d) {
          return c[2] = null, c[1] = 7, new cljs.core.Keyword(null, "recur", "recur", 1122293407)
        }
        if(5 === d) {
          return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null, c, 8, b)
        }
        if(4 === d) {
          var d = c[2], e = cljs.core.async.take.call(null, 1E3, b), e = cljs.core.async.pipe.call(null, e, a);
          c[9] = d;
          return cljs.core.async.impl.ioc_helpers.return_chan.call(null, c, e)
        }
        return 3 === d ? (d = c[7], cljs.core.truth_(1E3 > d) ? c[1] = 5 : c[1] = 6, new cljs.core.Keyword(null, "recur", "recur", 1122293407)) : 2 === d ? (d = c[2], c[7] = 0, c[10] = d, c[2] = null, c[1] = 3, new cljs.core.Keyword(null, "recur", "recur", 1122293407)) : 1 === d ? cljs.core.async.impl.ioc_helpers.put_BANG_.call(null, c, 2, a, "Ignore the first 1000 primes") : null
      })
    }(), e = function() {
      var a = d.call(null);
      a[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c;
      return a
    }();
    return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null, e)
  });
  return c
};
vince.core.testPrime2 = function() {
  var a = vince.core.printTA.call(null, vince.core.by_id.call(null, "prime1"), 1), b = examples.prime.chan_primes.call(null), c = vince.core.printTA.call(null, vince.core.by_id.call(null, "prime2"), 1), d = examples.prime.chan_primes.call(null), e = vince.core.printTA.call(null, vince.core.by_id.call(null, "prime3"), 1), f = examples.prime.chan_primes.call(null), g = vince.core.printTA.call(null, vince.core.by_id.call(null, "prime4"), 1), h = examples.prime.chan_primes.call(null);
  vince.core.primeToTA.call(null, a, b);
  vince.core.primeToTA.call(null, c, d);
  vince.core.primeToTA.call(null, e, f);
  return vince.core.primeToTA.call(null, g, h)
};
