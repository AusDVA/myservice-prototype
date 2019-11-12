! function(e, t) { "object" == typeof module && "object" == typeof module.exports ? module.exports = e.document ? t(e, !0) : function(e) { if (!e.document) throw new Error("jQuery requires a window with a document"); return t(e) } : t(e) }("undefined" != typeof window ? window : this, function(e, t) {
    function n(e) { var t = e.length,
            n = L.type(e); return "function" !== n && !L.isWindow(e) && (!(1 !== e.nodeType || !t) || ("array" === n || 0 === t || "number" == typeof t && t > 0 && t - 1 in e)) }

    function r(e, t, n) { if (L.isFunction(t)) return L.grep(e, function(e, r) { return !!t.call(e, r, e) !== n }); if (t.nodeType) return L.grep(e, function(e) { return e === t !== n }); if ("string" == typeof t) { if (B.test(t)) return L.filter(t, e, n);
            t = L.filter(t, e) } return L.grep(e, function(e) { return w.call(t, e) >= 0 !== n }) }

    function i(e, t) { for (;
            (e = e[t]) && 1 !== e.nodeType;); return e }

    function o(e) { var t = z[e] = {}; return L.each(e.match(Q) || [], function(e, n) { t[n] = !0 }), t }

    function a() { E.removeEventListener("DOMContentLoaded", a, !1), e.removeEventListener("load", a, !1), L.ready() }

    function s() { Object.defineProperty(this.cache = {}, 0, { get: function() { return {} } }), this.expando = L.expando + Math.random() }

    function u(e, t, n) { var r; if (void 0 === n && 1 === e.nodeType)
            if (r = "data-" + t.replace(ee, "-$1").toLowerCase(), "string" == typeof(n = e.getAttribute(r))) { try { n = "true" === n || "false" !== n && ("null" === n ? null : +n + "" === n ? +n : Z.test(n) ? L.parseJSON(n) : n) } catch (e) {} G.set(e, t, n) } else n = void 0; return n }

    function c() { return !0 }

    function l() { return !1 }

    function f() { try { return E.activeElement } catch (e) {} }

    function d(e, t) { return L.nodeName(e, "table") && L.nodeName(11 !== t.nodeType ? t : t.firstChild, "tr") ? e.getElementsByTagName("tbody")[0] || e.appendChild(e.ownerDocument.createElement("tbody")) : e }

    function p(e) { return e.type = (null !== e.getAttribute("type")) + "/" + e.type, e }

    function h(e) { var t = de.exec(e.type); return t ? e.type = t[1] : e.removeAttribute("type"), e }

    function v(e, t) { for (var n = 0, r = e.length; n < r; n++) J.set(e[n], "globalEval", !t || J.get(t[n], "globalEval")) }

    function g(e, t) { var n, r, i, o, a, s, u, c; if (1 === t.nodeType) { if (J.hasData(e) && (o = J.access(e), a = J.set(t, o), c = o.events)) { delete a.handle, a.events = {}; for (i in c)
                    for (n = 0, r = c[i].length; n < r; n++) L.event.add(t, i, c[i][n]) } G.hasData(e) && (s = G.access(e), u = L.extend({}, s), G.set(t, u)) } }

    function m(e, t) { var n = e.getElementsByTagName ? e.getElementsByTagName(t || "*") : e.querySelectorAll ? e.querySelectorAll(t || "*") : []; return void 0 === t || t && L.nodeName(e, t) ? L.merge([e], n) : n }

    function y(e, t) { var n = t.nodeName.toLowerCase(); "input" === n && te.test(e.type) ? t.checked = e.checked : "input" !== n && "textarea" !== n || (t.defaultValue = e.defaultValue) }

    function b(e, t, n, r) { var i; if (L.isArray(t)) L.each(t, function(t, i) { n || ke.test(e) ? r(e, i) : b(e + "[" + ("object" == typeof i ? t : "") + "]", i, n, r) });
        else if (n || "object" !== L.type(t)) r(e, t);
        else
            for (i in t) b(e + "[" + i + "]", t[i], n, r) } var x = [],
        k = x.slice,
        T = x.concat,
        C = x.push,
        w = x.indexOf,
        D = {},
        N = D.toString,
        j = D.hasOwnProperty,
        A = {},
        E = e.document,
        S = "2.1.1 -ajax,-ajax/jsonp,-ajax/load,-ajax/parseJSON,-ajax/parseXML,-ajax/script,-ajax/var/nonce,-ajax/var/rquery,-ajax/xhr,-manipulation/_evalUrl,-css,-css/addGetHookIf,-css/curCSS,-css/defaultDisplay,-css/hiddenVisibleSelectors,-css/support,-css/swap,-css/var/cssExpand,-css/var/getStyles,-css/var/isHidden,-css/var/rmargin,-css/var/rnumnonpx,-effects,-effects/Tween,-effects/animatedSelector,-dimensions,-offset,-deprecated,-event-alias,-wrap",
        L = function(e, t) { return new L.fn.init(e, t) },
        q = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,
        O = /^-ms-/,
        F = /-([\da-z])/gi,
        H = function(e, t) { return t.toUpperCase() };
    L.fn = L.prototype = { jquery: S, constructor: L, selector: "", length: 0, toArray: function() { return k.call(this) }, get: function(e) { return null != e ? e < 0 ? this[e + this.length] : this[e] : k.call(this) }, pushStack: function(e) { var t = L.merge(this.constructor(), e); return t.prevObject = this, t.context = this.context, t }, each: function(e, t) { return L.each(this, e, t) }, map: function(e) { return this.pushStack(L.map(this, function(t, n) { return e.call(t, n, t) })) }, slice: function() { return this.pushStack(k.apply(this, arguments)) }, first: function() { return this.eq(0) }, last: function() { return this.eq(-1) }, eq: function(e) { var t = this.length,
                n = +e + (e < 0 ? t : 0); return this.pushStack(n >= 0 && n < t ? [this[n]] : []) }, end: function() { return this.prevObject || this.constructor(null) }, push: C, sort: x.sort, splice: x.splice }, L.extend = L.fn.extend = function() { var e, t, n, r, i, o, a = arguments[0] || {},
            s = 1,
            u = arguments.length,
            c = !1; for ("boolean" == typeof a && (c = a, a = arguments[s] || {}, s++), "object" == typeof a || L.isFunction(a) || (a = {}), s === u && (a = this, s--); s < u; s++)
            if (null != (e = arguments[s]))
                for (t in e) n = a[t], a !== (r = e[t]) && (c && r && (L.isPlainObject(r) || (i = L.isArray(r))) ? (i ? (i = !1, o = n && L.isArray(n) ? n : []) : o = n && L.isPlainObject(n) ? n : {}, a[t] = L.extend(c, o, r)) : void 0 !== r && (a[t] = r)); return a }, L.extend({ expando: "jQuery" + (S + Math.random()).replace(/\D/g, ""), isReady: !0, error: function(e) { throw new Error(e) }, noop: function() {}, isFunction: function(e) { return "function" === L.type(e) }, isArray: Array.isArray, isWindow: function(e) { return null != e && e === e.window }, isNumeric: function(e) { return !L.isArray(e) && e - parseFloat(e) >= 0 }, isPlainObject: function(e) { return "object" === L.type(e) && !e.nodeType && !L.isWindow(e) && !(e.constructor && !j.call(e.constructor.prototype, "isPrototypeOf")) }, isEmptyObject: function(e) { var t; for (t in e) return !1; return !0 }, type: function(e) { return null == e ? e + "" : "object" == typeof e || "function" == typeof e ? D[N.call(e)] || "object" : typeof e }, globalEval: function(e) { var t, n = eval;
            (e = L.trim(e)) && (1 === e.indexOf("use strict") ? ((t = E.createElement("script")).text = e, E.head.appendChild(t).parentNode.removeChild(t)) : n(e)) }, camelCase: function(e) { return e.replace(O, "ms-").replace(F, H) }, nodeName: function(e, t) { return e.nodeName && e.nodeName.toLowerCase() === t.toLowerCase() }, each: function(e, t, r) { var i = 0,
                o = e.length,
                a = n(e); if (r) { if (a)
                    for (; i < o && !1 !== t.apply(e[i], r); i++);
                else
                    for (i in e)
                        if (!1 === t.apply(e[i], r)) break } else if (a)
                for (; i < o && !1 !== t.call(e[i], i, e[i]); i++);
            else
                for (i in e)
                    if (!1 === t.call(e[i], i, e[i])) break; return e }, trim: function(e) { return null == e ? "" : (e + "").replace(q, "") }, makeArray: function(e, t) { var r = t || []; return null != e && (n(Object(e)) ? L.merge(r, "string" == typeof e ? [e] : e) : C.call(r, e)), r }, inArray: function(e, t, n) { return null == t ? -1 : w.call(t, e, n) }, merge: function(e, t) { for (var n = +t.length, r = 0, i = e.length; r < n; r++) e[i++] = t[r]; return e.length = i, e }, grep: function(e, t, n) { for (var r = [], i = 0, o = e.length, a = !n; i < o; i++) !t(e[i], i) !== a && r.push(e[i]); return r }, map: function(e, t, r) { var i, o = 0,
                a = e.length,
                s = []; if (n(e))
                for (; o < a; o++) null != (i = t(e[o], o, r)) && s.push(i);
            else
                for (o in e) null != (i = t(e[o], o, r)) && s.push(i); return T.apply([], s) }, guid: 1, proxy: function(e, t) { var n, r, i; if ("string" == typeof t && (n = e[t], t = e, e = n), L.isFunction(e)) return r = k.call(arguments, 2), i = function() { return e.apply(t || this, r.concat(k.call(arguments))) }, i.guid = e.guid = e.guid || L.guid++, i }, now: Date.now, support: A }), L.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(e, t) { D["[object " + t + "]"] = t.toLowerCase() }); var P, M = e.document.documentElement,
        W = M.matches || M.webkitMatchesSelector || M.mozMatchesSelector || M.oMatchesSelector || M.msMatchesSelector,
        $ = function(e, t) { if (e === t) return P = !0, 0; var n = t.compareDocumentPosition && e.compareDocumentPosition && e.compareDocumentPosition(t); return n ? 1 & n ? e === E || L.contains(E, e) ? -1 : t === E || L.contains(E, t) ? 1 : 0 : 4 & n ? -1 : 1 : e.compareDocumentPosition ? -1 : 1 };
    L.extend({ find: function(e, t, n, r) { var i, o, a = 0; if (n = n || [], t = t || E, !e || "string" != typeof e) return n; if (1 !== (o = t.nodeType) && 9 !== o) return []; if (r)
                for (; i = r[a++];) L.find.matchesSelector(i, e) && n.push(i);
            else L.merge(n, t.querySelectorAll(e)); return n }, unique: function(e) { var t, n = [],
                r = 0,
                i = 0; if (P = !1, e.sort($), P) { for (; t = e[r++];) t === e[r] && (i = n.push(r)); for (; i--;) e.splice(n[i], 1) } return e }, text: function(e) { var t, n = "",
                r = 0,
                i = e.nodeType; if (i) { if (1 === i || 9 === i || 11 === i) return e.textContent; if (3 === i || 4 === i) return e.nodeValue } else
                for (; t = e[r++];) n += L.text(t); return n }, contains: function(e, t) { var n = 9 === e.nodeType ? e.documentElement : e,
                r = t && t.parentNode; return e === r || !(!r || 1 !== r.nodeType || !n.contains(r)) }, isXMLDoc: function(e) { return "HTML" !== (e.ownerDocument || e).documentElement.nodeName }, expr: { attrHandle: {}, match: { bool: /^(?:checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped)$/i, needsContext: /^[\x20\t\r\n\f]*[>+~]/ } } }), L.extend(L.find, { matches: function(e, t) { return L.find(e, null, null, t) }, matchesSelector: function(e, t) { return W.call(e, t) }, attr: function(e, t) { return e.getAttribute(t) } }); var _ = L.expr.match.needsContext,
        I = /^<(\w+)\s*\/?>(?:<\/\1>|)$/,
        B = /^.[^:#\[\.,]*$/;
    L.filter = function(e, t, n) { var r = t[0]; return n && (e = ":not(" + e + ")"), 1 === t.length && 1 === r.nodeType ? L.find.matchesSelector(r, e) ? [r] : [] : L.find.matches(e, L.grep(t, function(e) { return 1 === e.nodeType })) }, L.fn.extend({ find: function(e) { var t, n = this.length,
                r = [],
                i = this; if ("string" != typeof e) return this.pushStack(L(e).filter(function() { for (t = 0; t < n; t++)
                    if (L.contains(i[t], this)) return !0 })); for (t = 0; t < n; t++) L.find(e, i[t], r); return r = this.pushStack(n > 1 ? L.unique(r) : r), r.selector = this.selector ? this.selector + " " + e : e, r }, filter: function(e) { return this.pushStack(r(this, e || [], !1)) }, not: function(e) { return this.pushStack(r(this, e || [], !0)) }, is: function(e) { return !!r(this, "string" == typeof e && _.test(e) ? L(e) : e || [], !1).length } }); var X, U = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/;
    (L.fn.init = function(e, t) { var n, r; if (!e) return this; if ("string" == typeof e) { if (!(n = "<" === e[0] && ">" === e[e.length - 1] && e.length >= 3 ? [null, e, null] : U.exec(e)) || !n[1] && t) return !t || t.jquery ? (t || X).find(e) : this.constructor(t).find(e); if (n[1]) { if (t = t instanceof L ? t[0] : t, L.merge(this, L.parseHTML(n[1], t && t.nodeType ? t.ownerDocument || t : E, !0)), I.test(n[1]) && L.isPlainObject(t))
                    for (n in t) L.isFunction(this[n]) ? this[n](t[n]) : this.attr(n, t[n]); return this } return (r = E.getElementById(n[2])) && r.parentNode && (this.length = 1, this[0] = r), this.context = E, this.selector = e, this } return e.nodeType ? (this.context = this[0] = e, this.length = 1, this) : L.isFunction(e) ? void 0 !== X.ready ? X.ready(e) : e(L) : (void 0 !== e.selector && (this.selector = e.selector, this.context = e.context), L.makeArray(e, this)) }).prototype = L.fn, X = L(E); var R = /^(?:parents|prev(?:Until|All))/,
        V = { children: !0, contents: !0, next: !0, prev: !0 };
    L.extend({ dir: function(e, t, n) { for (var r = [], i = void 0 !== n;
                (e = e[t]) && 9 !== e.nodeType;)
                if (1 === e.nodeType) { if (i && L(e).is(n)) break;
                    r.push(e) } return r }, sibling: function(e, t) { for (var n = []; e; e = e.nextSibling) 1 === e.nodeType && e !== t && n.push(e); return n } }), L.fn.extend({ has: function(e) { var t = L(e, this),
                n = t.length; return this.filter(function() { for (var e = 0; e < n; e++)
                    if (L.contains(this, t[e])) return !0 }) }, closest: function(e, t) { for (var n, r = 0, i = this.length, o = [], a = _.test(e) || "string" != typeof e ? L(e, t || this.context) : 0; r < i; r++)
                for (n = this[r]; n && n !== t; n = n.parentNode)
                    if (n.nodeType < 11 && (a ? a.index(n) > -1 : 1 === n.nodeType && L.find.matchesSelector(n, e))) { o.push(n); break } return this.pushStack(o.length > 1 ? L.unique(o) : o) }, index: function(e) { return e ? "string" == typeof e ? w.call(L(e), this[0]) : w.call(this, e.jquery ? e[0] : e) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1 }, add: function(e, t) { return this.pushStack(L.unique(L.merge(this.get(), L(e, t)))) }, addBack: function(e) { return this.add(null == e ? this.prevObject : this.prevObject.filter(e)) } }), L.each({ parent: function(e) { var t = e.parentNode; return t && 11 !== t.nodeType ? t : null }, parents: function(e) { return L.dir(e, "parentNode") }, parentsUntil: function(e, t, n) { return L.dir(e, "parentNode", n) }, next: function(e) { return i(e, "nextSibling") }, prev: function(e) { return i(e, "previousSibling") }, nextAll: function(e) { return L.dir(e, "nextSibling") }, prevAll: function(e) { return L.dir(e, "previousSibling") }, nextUntil: function(e, t, n) { return L.dir(e, "nextSibling", n) }, prevUntil: function(e, t, n) { return L.dir(e, "previousSibling", n) }, siblings: function(e) { return L.sibling((e.parentNode || {}).firstChild, e) }, children: function(e) { return L.sibling(e.firstChild) }, contents: function(e) { return e.contentDocument || L.merge([], e.childNodes) } }, function(e, t) { L.fn[e] = function(n, r) { var i = L.map(this, t, n); return "Until" !== e.slice(-5) && (r = n), r && "string" == typeof r && (i = L.filter(r, i)), this.length > 1 && (V[e] || L.unique(i), R.test(e) && i.reverse()), this.pushStack(i) } }); var Q = /\S+/g,
        z = {};
    L.Callbacks = function(e) { var t, n, r, i, a, s, u = [],
            c = !(e = "string" == typeof e ? z[e] || o(e) : L.extend({}, e)).once && [],
            l = function(o) { for (t = e.memory && o, n = !0, s = i || 0, i = 0, a = u.length, r = !0; u && s < a; s++)
                    if (!1 === u[s].apply(o[0], o[1]) && e.stopOnFalse) { t = !1; break } r = !1, u && (c ? c.length && l(c.shift()) : t ? u = [] : f.disable()) },
            f = { add: function() { if (u) { var n = u.length;! function t(n) { L.each(n, function(n, r) { var i = L.type(r); "function" === i ? e.unique && f.has(r) || u.push(r) : r && r.length && "string" !== i && t(r) }) }(arguments), r ? a = u.length : t && (i = n, l(t)) } return this }, remove: function() { return u && L.each(arguments, function(e, t) { for (var n;
                            (n = L.inArray(t, u, n)) > -1;) u.splice(n, 1), r && (n <= a && a--, n <= s && s--) }), this }, has: function(e) { return e ? L.inArray(e, u) > -1 : !(!u || !u.length) }, empty: function() { return u = [], a = 0, this }, disable: function() { return u = c = t = void 0, this }, disabled: function() { return !u }, lock: function() { return c = void 0, t || f.disable(), this }, locked: function() { return !c }, fireWith: function(e, t) { return !u || n && !c || (t = [e, (t = t || []).slice ? t.slice() : t], r ? c.push(t) : l(t)), this }, fire: function() { return f.fireWith(this, arguments), this }, fired: function() { return !!n } }; return f }, L.extend({ Deferred: function(e) { var t = [
                    ["resolve", "done", L.Callbacks("once memory"), "resolved"],
                    ["reject", "fail", L.Callbacks("once memory"), "rejected"],
                    ["notify", "progress", L.Callbacks("memory")]
                ],
                n = "pending",
                r = { state: function() { return n }, always: function() { return i.done(arguments).fail(arguments), this }, then: function() { var e = arguments; return L.Deferred(function(n) { L.each(t, function(t, o) { var a = L.isFunction(e[t]) && e[t];
                                i[o[1]](function() { var e = a && a.apply(this, arguments);
                                    e && L.isFunction(e.promise) ? e.promise().done(n.resolve).fail(n.reject).progress(n.notify) : n[o[0] + "With"](this === r ? n.promise() : this, a ? [e] : arguments) }) }), e = null }).promise() }, promise: function(e) { return null != e ? L.extend(e, r) : r } },
                i = {}; return r.pipe = r.then, L.each(t, function(e, o) { var a = o[2],
                    s = o[3];
                r[o[1]] = a.add, s && a.add(function() { n = s }, t[1 ^ e][2].disable, t[2][2].lock), i[o[0]] = function() { return i[o[0] + "With"](this === i ? r : this, arguments), this }, i[o[0] + "With"] = a.fireWith }), r.promise(i), e && e.call(i, i), i }, when: function(e) { var t, n, r, i = 0,
                o = k.call(arguments),
                a = o.length,
                s = 1 !== a || e && L.isFunction(e.promise) ? a : 0,
                u = 1 === s ? e : L.Deferred(),
                c = function(e, n, r) { return function(i) { n[e] = this, r[e] = arguments.length > 1 ? k.call(arguments) : i, r === t ? u.notifyWith(n, r) : --s || u.resolveWith(n, r) } }; if (a > 1)
                for (t = new Array(a), n = new Array(a), r = new Array(a); i < a; i++) o[i] && L.isFunction(o[i].promise) ? o[i].promise().done(c(i, r, o)).fail(u.reject).progress(c(i, n, t)) : --s; return s || u.resolveWith(r, o), u.promise() } }); var Y;
    L.fn.ready = function(e) { return L.ready.promise().done(e), this }, L.extend({ isReady: !1, readyWait: 1, holdReady: function(e) { e ? L.readyWait++ : L.ready(!0) }, ready: function(e) {
            (!0 === e ? --L.readyWait : L.isReady) || (L.isReady = !0, !0 !== e && --L.readyWait > 0 || (Y.resolveWith(E, [L]), L.fn.triggerHandler && (L(E).triggerHandler("ready"), L(E).off("ready")))) } }), L.ready.promise = function(t) { return Y || (Y = L.Deferred(), "complete" === E.readyState ? setTimeout(L.ready) : (E.addEventListener("DOMContentLoaded", a, !1), e.addEventListener("load", a, !1))), Y.promise(t) }, L.ready.promise(); var K = L.access = function(e, t, n, r, i, o, a) { var s = 0,
            u = e.length,
            c = null == n; if ("object" === L.type(n)) { i = !0; for (s in n) L.access(e, t, s, n[s], !0, o, a) } else if (void 0 !== r && (i = !0, L.isFunction(r) || (a = !0), c && (a ? (t.call(e, r), t = null) : (c = t, t = function(e, t, n) { return c.call(L(e), n) })), t))
            for (; s < u; s++) t(e[s], n, a ? r : r.call(e[s], s, t(e[s], n))); return i ? e : c ? t.call(e) : u ? t(e[0], n) : o };
    L.acceptData = function(e) { return 1 === e.nodeType || 9 === e.nodeType || !+e.nodeType }, s.uid = 1, s.accepts = L.acceptData, s.prototype = { key: function(e) { if (!s.accepts(e)) return 0; var t = {},
                n = e[this.expando]; if (!n) { n = s.uid++; try { t[this.expando] = { value: n }, Object.defineProperties(e, t) } catch (r) { t[this.expando] = n, L.extend(e, t) } } return this.cache[n] || (this.cache[n] = {}), n }, set: function(e, t, n) { var r, i = this.key(e),
                o = this.cache[i]; if ("string" == typeof t) o[t] = n;
            else if (L.isEmptyObject(o)) L.extend(this.cache[i], t);
            else
                for (r in t) o[r] = t[r]; return o }, get: function(e, t) { var n = this.cache[this.key(e)]; return void 0 === t ? n : n[t] }, access: function(e, t, n) { var r; return void 0 === t || t && "string" == typeof t && void 0 === n ? (r = this.get(e, t), void 0 !== r ? r : this.get(e, L.camelCase(t))) : (this.set(e, t, n), void 0 !== n ? n : t) }, remove: function(e, t) { var n, r, i, o = this.key(e),
                a = this.cache[o]; if (void 0 === t) this.cache[o] = {};
            else { L.isArray(t) ? r = t.concat(t.map(L.camelCase)) : (i = L.camelCase(t), r = t in a ? [t, i] : (r = i) in a ? [r] : r.match(Q) || []), n = r.length; for (; n--;) delete a[r[n]] } }, hasData: function(e) { return !L.isEmptyObject(this.cache[e[this.expando]] || {}) }, discard: function(e) { e[this.expando] && delete this.cache[e[this.expando]] } }; var J = new s,
        G = new s,
        Z = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
        ee = /([A-Z])/g;
    L.extend({ hasData: function(e) { return G.hasData(e) || J.hasData(e) }, data: function(e, t, n) { return G.access(e, t, n) }, removeData: function(e, t) { G.remove(e, t) }, _data: function(e, t, n) { return J.access(e, t, n) }, _removeData: function(e, t) { J.remove(e, t) } }), L.fn.extend({ data: function(e, t) { var n, r, i, o = this[0],
                a = o && o.attributes; if (void 0 === e) { if (this.length && (i = G.get(o), 1 === o.nodeType && !J.get(o, "hasDataAttrs"))) { for (n = a.length; n--;) a[n] && 0 === (r = a[n].name).indexOf("data-") && (r = L.camelCase(r.slice(5)), u(o, r, i[r]));
                    J.set(o, "hasDataAttrs", !0) } return i } return "object" == typeof e ? this.each(function() { G.set(this, e) }) : K(this, function(t) { var n, r = L.camelCase(e); if (o && void 0 === t) { if (void 0 !== (n = G.get(o, e))) return n; if (void 0 !== (n = G.get(o, r))) return n; if (void 0 !== (n = u(o, r, void 0))) return n } else this.each(function() { var n = G.get(this, r);
                    G.set(this, r, t), -1 !== e.indexOf("-") && void 0 !== n && G.set(this, e, t) }) }, null, t, arguments.length > 1, null, !0) }, removeData: function(e) { return this.each(function() { G.remove(this, e) }) } }), L.extend({ queue: function(e, t, n) { var r; if (e) return t = (t || "fx") + "queue", r = J.get(e, t), n && (!r || L.isArray(n) ? r = J.access(e, t, L.makeArray(n)) : r.push(n)), r || [] }, dequeue: function(e, t) { t = t || "fx"; var n = L.queue(e, t),
                r = n.length,
                i = n.shift(),
                o = L._queueHooks(e, t),
                a = function() { L.dequeue(e, t) }; "inprogress" === i && (i = n.shift(), r--), i && ("fx" === t && n.unshift("inprogress"), delete o.stop, i.call(e, a, o)), !r && o && o.empty.fire() }, _queueHooks: function(e, t) { var n = t + "queueHooks"; return J.get(e, n) || J.access(e, n, { empty: L.Callbacks("once memory").add(function() { J.remove(e, [t + "queue", n]) }) }) } }), L.fn.extend({ queue: function(e, t) { var n = 2; return "string" != typeof e && (t = e, e = "fx", n--), arguments.length < n ? L.queue(this[0], e) : void 0 === t ? this : this.each(function() { var n = L.queue(this, e, t);
                L._queueHooks(this, e), "fx" === e && "inprogress" !== n[0] && L.dequeue(this, e) }) }, dequeue: function(e) { return this.each(function() { L.dequeue(this, e) }) }, clearQueue: function(e) { return this.queue(e || "fx", []) }, promise: function(e, t) { var n, r = 1,
                i = L.Deferred(),
                o = this,
                a = this.length,
                s = function() {--r || i.resolveWith(o, [o]) }; for ("string" != typeof e && (t = e, e = void 0), e = e || "fx"; a--;)(n = J.get(o[a], e + "queueHooks")) && n.empty && (r++, n.empty.add(s)); return s(), i.promise(t) } }); var te = /^(?:checkbox|radio)$/i;! function() { var e = E.createDocumentFragment().appendChild(E.createElement("div")),
            t = E.createElement("input");
        t.setAttribute("type", "radio"), t.setAttribute("checked", "checked"), t.setAttribute("name", "t"), e.appendChild(t), A.checkClone = e.cloneNode(!0).cloneNode(!0).lastChild.checked, e.innerHTML = "<textarea>x</textarea>", A.noCloneChecked = !!e.cloneNode(!0).lastChild.defaultValue }();
    A.focusinBubbles = "onfocusin" in e; var ne = /^key/,
        re = /^(?:mouse|pointer|contextmenu)|click/,
        ie = /^(?:focusinfocus|focusoutblur)$/,
        oe = /^([^.]*)(?:\.(.+)|)$/;
    L.event = { global: {}, add: function(e, t, n, r, i) { var o, a, s, u, c, l, f, d, p, h, v, g = J.get(e); if (g)
                for (n.handler && (n = (o = n).handler, i = o.selector), n.guid || (n.guid = L.guid++), (u = g.events) || (u = g.events = {}), (a = g.handle) || (a = g.handle = function(t) { return void 0 !== L && L.event.triggered !== t.type ? L.event.dispatch.apply(e, arguments) : void 0 }), c = (t = (t || "").match(Q) || [""]).length; c--;) p = v = (s = oe.exec(t[c]) || [])[1], h = (s[2] || "").split(".").sort(), p && (f = L.event.special[p] || {}, p = (i ? f.delegateType : f.bindType) || p, f = L.event.special[p] || {}, l = L.extend({ type: p, origType: v, data: r, handler: n, guid: n.guid, selector: i, needsContext: i && L.expr.match.needsContext.test(i), namespace: h.join(".") }, o), (d = u[p]) || ((d = u[p] = []).delegateCount = 0, f.setup && !1 !== f.setup.call(e, r, h, a) || e.addEventListener && e.addEventListener(p, a, !1)), f.add && (f.add.call(e, l), l.handler.guid || (l.handler.guid = n.guid)), i ? d.splice(d.delegateCount++, 0, l) : d.push(l), L.event.global[p] = !0) }, remove: function(e, t, n, r, i) { var o, a, s, u, c, l, f, d, p, h, v, g = J.hasData(e) && J.get(e); if (g && (u = g.events)) { for (c = (t = (t || "").match(Q) || [""]).length; c--;)
                    if (s = oe.exec(t[c]) || [], p = v = s[1], h = (s[2] || "").split(".").sort(), p) { for (f = L.event.special[p] || {}, d = u[p = (r ? f.delegateType : f.bindType) || p] || [], s = s[2] && new RegExp("(^|\\.)" + h.join("\\.(?:.*\\.|)") + "(\\.|$)"), a = o = d.length; o--;) l = d[o], !i && v !== l.origType || n && n.guid !== l.guid || s && !s.test(l.namespace) || r && r !== l.selector && ("**" !== r || !l.selector) || (d.splice(o, 1), l.selector && d.delegateCount--, f.remove && f.remove.call(e, l));
                        a && !d.length && (f.teardown && !1 !== f.teardown.call(e, h, g.handle) || L.removeEvent(e, p, g.handle), delete u[p]) } else
                        for (p in u) L.event.remove(e, p + t[c], n, r, !0);
                L.isEmptyObject(u) && (delete g.handle, J.remove(e, "events")) } }, trigger: function(t, n, r, i) { var o, a, s, u, c, l, f, d = [r || E],
                p = j.call(t, "type") ? t.type : t,
                h = j.call(t, "namespace") ? t.namespace.split(".") : []; if (a = s = r = r || E, 3 !== r.nodeType && 8 !== r.nodeType && !ie.test(p + L.event.triggered) && (p.indexOf(".") >= 0 && (p = (h = p.split(".")).shift(), h.sort()), c = p.indexOf(":") < 0 && "on" + p, t = t[L.expando] ? t : new L.Event(p, "object" == typeof t && t), t.isTrigger = i ? 2 : 3, t.namespace = h.join("."), t.namespace_re = t.namespace ? new RegExp("(^|\\.)" + h.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, t.result = void 0, t.target || (t.target = r), n = null == n ? [t] : L.makeArray(n, [t]), f = L.event.special[p] || {}, i || !f.trigger || !1 !== f.trigger.apply(r, n))) { if (!i && !f.noBubble && !L.isWindow(r)) { for (u = f.delegateType || p, ie.test(u + p) || (a = a.parentNode); a; a = a.parentNode) d.push(a), s = a;
                    s === (r.ownerDocument || E) && d.push(s.defaultView || s.parentWindow || e) } for (o = 0;
                    (a = d[o++]) && !t.isPropagationStopped();) t.type = o > 1 ? u : f.bindType || p, (l = (J.get(a, "events") || {})[t.type] && J.get(a, "handle")) && l.apply(a, n), (l = c && a[c]) && l.apply && L.acceptData(a) && (t.result = l.apply(a, n), !1 === t.result && t.preventDefault()); return t.type = p, i || t.isDefaultPrevented() || f._default && !1 !== f._default.apply(d.pop(), n) || !L.acceptData(r) || c && L.isFunction(r[p]) && !L.isWindow(r) && ((s = r[c]) && (r[c] = null), L.event.triggered = p, r[p](), L.event.triggered = void 0, s && (r[c] = s)), t.result } }, dispatch: function(e) { e = L.event.fix(e); var t, n, r, i, o, a = [],
                s = k.call(arguments),
                u = (J.get(this, "events") || {})[e.type] || [],
                c = L.event.special[e.type] || {}; if (s[0] = e, e.delegateTarget = this, !c.preDispatch || !1 !== c.preDispatch.call(this, e)) { for (a = L.event.handlers.call(this, e, u), t = 0;
                    (i = a[t++]) && !e.isPropagationStopped();)
                    for (e.currentTarget = i.elem, n = 0;
                        (o = i.handlers[n++]) && !e.isImmediatePropagationStopped();) e.namespace_re && !e.namespace_re.test(o.namespace) || (e.handleObj = o, e.data = o.data, void 0 !== (r = ((L.event.special[o.origType] || {}).handle || o.handler).apply(i.elem, s)) && !1 === (e.result = r) && (e.preventDefault(), e.stopPropagation())); return c.postDispatch && c.postDispatch.call(this, e), e.result } }, handlers: function(e, t) { var n, r, i, o, a = [],
                s = t.delegateCount,
                u = e.target; if (s && u.nodeType && (!e.button || "click" !== e.type))
                for (; u !== this; u = u.parentNode || this)
                    if (!0 !== u.disabled || "click" !== e.type) { for (r = [], n = 0; n < s; n++) void 0 === r[i = (o = t[n]).selector + " "] && (r[i] = o.needsContext ? L(i, this).index(u) >= 0 : L.find(i, this, null, [u]).length), r[i] && r.push(o);
                        r.length && a.push({ elem: u, handlers: r }) } return s < t.length && a.push({ elem: this, handlers: t.slice(s) }), a }, props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "), fixHooks: {}, keyHooks: { props: "char charCode key keyCode".split(" "), filter: function(e, t) { return null == e.which && (e.which = null != t.charCode ? t.charCode : t.keyCode), e } }, mouseHooks: { props: "button buttons clientX clientY offsetX offsetY pageX pageY screenX screenY toElement".split(" "), filter: function(e, t) { var n, r, i, o = t.button; return null == e.pageX && null != t.clientX && (r = (n = e.target.ownerDocument || E).documentElement, i = n.body, e.pageX = t.clientX + (r && r.scrollLeft || i && i.scrollLeft || 0) - (r && r.clientLeft || i && i.clientLeft || 0), e.pageY = t.clientY + (r && r.scrollTop || i && i.scrollTop || 0) - (r && r.clientTop || i && i.clientTop || 0)), e.which || void 0 === o || (e.which = 1 & o ? 1 : 2 & o ? 3 : 4 & o ? 2 : 0), e } }, fix: function(e) { if (e[L.expando]) return e; var t, n, r, i = e.type,
                o = e,
                a = this.fixHooks[i]; for (a || (this.fixHooks[i] = a = re.test(i) ? this.mouseHooks : ne.test(i) ? this.keyHooks : {}), r = a.props ? this.props.concat(a.props) : this.props, e = new L.Event(o), t = r.length; t--;) e[n = r[t]] = o[n]; return e.target || (e.target = E), 3 === e.target.nodeType && (e.target = e.target.parentNode), a.filter ? a.filter(e, o) : e }, special: { load: { noBubble: !0 }, focus: { trigger: function() { if (this !== f() && this.focus) return this.focus(), !1 }, delegateType: "focusin" }, blur: { trigger: function() { if (this === f() && this.blur) return this.blur(), !1 }, delegateType: "focusout" }, click: { trigger: function() { if ("checkbox" === this.type && this.click && L.nodeName(this, "input")) return this.click(), !1 }, _default: function(e) { return L.nodeName(e.target, "a") } }, beforeunload: { postDispatch: function(e) { void 0 !== e.result && e.originalEvent && (e.originalEvent.returnValue = e.result) } } }, simulate: function(e, t, n, r) { var i = L.extend(new L.Event, n, { type: e, isSimulated: !0, originalEvent: {} });
            r ? L.event.trigger(i, null, t) : L.event.dispatch.call(t, i), i.isDefaultPrevented() && n.preventDefault() } }, L.removeEvent = function(e, t, n) { e.removeEventListener && e.removeEventListener(t, n, !1) }, L.Event = function(e, t) { if (!(this instanceof L.Event)) return new L.Event(e, t);
        e && e.type ? (this.originalEvent = e, this.type = e.type, this.isDefaultPrevented = e.defaultPrevented || void 0 === e.defaultPrevented && !1 === e.returnValue ? c : l) : this.type = e, t && L.extend(this, t), this.timeStamp = e && e.timeStamp || L.now(), this[L.expando] = !0 }, L.Event.prototype = { isDefaultPrevented: l, isPropagationStopped: l, isImmediatePropagationStopped: l, preventDefault: function() { var e = this.originalEvent;
            this.isDefaultPrevented = c, e && e.preventDefault && e.preventDefault() }, stopPropagation: function() { var e = this.originalEvent;
            this.isPropagationStopped = c, e && e.stopPropagation && e.stopPropagation() }, stopImmediatePropagation: function() { var e = this.originalEvent;
            this.isImmediatePropagationStopped = c, e && e.stopImmediatePropagation && e.stopImmediatePropagation(), this.stopPropagation() } }, L.each({ mouseenter: "mouseover", mouseleave: "mouseout", pointerenter: "pointerover", pointerleave: "pointerout" }, function(e, t) { L.event.special[e] = { delegateType: t, bindType: t, handle: function(e) { var n, r = this,
                    i = e.relatedTarget,
                    o = e.handleObj; return i && (i === r || L.contains(r, i)) || (e.type = o.origType, n = o.handler.apply(this, arguments), e.type = t), n } } }), A.focusinBubbles || L.each({ focus: "focusin", blur: "focusout" }, function(e, t) { var n = function(e) { L.event.simulate(t, e.target, L.event.fix(e), !0) };
        L.event.special[t] = { setup: function() { var r = this.ownerDocument || this,
                    i = J.access(r, t);
                i || r.addEventListener(e, n, !0), J.access(r, t, (i || 0) + 1) }, teardown: function() { var r = this.ownerDocument || this,
                    i = J.access(r, t) - 1;
                i ? J.access(r, t, i) : (r.removeEventListener(e, n, !0), J.remove(r, t)) } } }), L.fn.extend({ on: function(e, t, n, r, i) { var o, a; if ("object" == typeof e) { "string" != typeof t && (n = n || t, t = void 0); for (a in e) this.on(a, t, n, e[a], i); return this } if (null == n && null == r ? (r = t, n = t = void 0) : null == r && ("string" == typeof t ? (r = n, n = void 0) : (r = n, n = t, t = void 0)), !1 === r) r = l;
            else if (!r) return this; return 1 === i && (o = r, (r = function(e) { return L().off(e), o.apply(this, arguments) }).guid = o.guid || (o.guid = L.guid++)), this.each(function() { L.event.add(this, e, r, n, t) }) }, one: function(e, t, n, r) { return this.on(e, t, n, r, 1) }, off: function(e, t, n) { var r, i; if (e && e.preventDefault && e.handleObj) return r = e.handleObj, L(e.delegateTarget).off(r.namespace ? r.origType + "." + r.namespace : r.origType, r.selector, r.handler), this; if ("object" == typeof e) { for (i in e) this.off(i, t, e[i]); return this } return !1 !== t && "function" != typeof t || (n = t, t = void 0), !1 === n && (n = l), this.each(function() { L.event.remove(this, e, n, t) }) }, trigger: function(e, t) { return this.each(function() { L.event.trigger(e, t, this) }) }, triggerHandler: function(e, t) { var n = this[0]; if (n) return L.event.trigger(e, t, n, !0) } }); var ae = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
        se = /<([\w:]+)/,
        ue = /<|&#?\w+;/,
        ce = /<(?:script|style|link)/i,
        le = /checked\s*(?:[^=]|=\s*.checked.)/i,
        fe = /^$|\/(?:java|ecma)script/i,
        de = /^true\/(.*)/,
        pe = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,
        he = { option: [1, "<select multiple='multiple'>", "</select>"], thead: [1, "<table>", "</table>"], col: [2, "<table><colgroup>", "</colgroup></table>"], tr: [2, "<table><tbody>", "</tbody></table>"], td: [3, "<table><tbody><tr>", "</tr></tbody></table>"], _default: [0, "", ""] };
    he.optgroup = he.option, he.tbody = he.tfoot = he.colgroup = he.caption = he.thead, he.th = he.td, L.extend({ clone: function(e, t, n) { var r, i, o, a, s = e.cloneNode(!0),
                    u = L.contains(e.ownerDocument, e); if (!(A.noCloneChecked || 1 !== e.nodeType && 11 !== e.nodeType || L.isXMLDoc(e)))
                    for (a = m(s), r = 0, i = (o = m(e)).length; r < i; r++) y(o[r], a[r]); if (t)
                    if (n)
                        for (o = o || m(e), a = a || m(s), r = 0, i = o.length; r < i; r++) g(o[r], a[r]);
                    else g(e, s); return (a = m(s, "script")).length > 0 && v(a, !u && m(e, "script")), s }, buildFragment: function(e, t, n, r) { for (var i, o, a, s, u, c, l = t.createDocumentFragment(), f = [], d = 0, p = e.length; d < p; d++)
                    if ((i = e[d]) || 0 === i)
                        if ("object" === L.type(i)) L.merge(f, i.nodeType ? [i] : i);
                        else if (ue.test(i)) { for (o = o || l.appendChild(t.createElement("div")), a = (se.exec(i) || ["", ""])[1].toLowerCase(), s = he[a] || he._default, o.innerHTML = s[1] + i.replace(ae, "<$1></$2>") + s[2], c = s[0]; c--;) o = o.lastChild;
                    L.merge(f, o.childNodes), (o = l.firstChild).textContent = "" } else f.push(t.createTextNode(i)); for (l.textContent = "", d = 0; i = f[d++];)
                    if ((!r || -1 === L.inArray(i, r)) && (u = L.contains(i.ownerDocument, i), o = m(l.appendChild(i), "script"), u && v(o), n))
                        for (c = 0; i = o[c++];) fe.test(i.type || "") && n.push(i); return l }, cleanData: function(e) { for (var t, n, r, i, o = L.event.special, a = 0; void 0 !== (n = e[a]); a++) { if (L.acceptData(n) && (i = n[J.expando]) && (t = J.cache[i])) { if (t.events)
                            for (r in t.events) o[r] ? L.event.remove(n, r) : L.removeEvent(n, r, t.handle);
                        J.cache[i] && delete J.cache[i] } delete G.cache[n[G.expando]] } } }), L.fn.extend({ text: function(e) { return K(this, function(e) { return void 0 === e ? L.text(this) : this.empty().each(function() { 1 !== this.nodeType && 11 !== this.nodeType && 9 !== this.nodeType || (this.textContent = e) }) }, null, e, arguments.length) }, append: function() { return this.domManip(arguments, function(e) { 1 !== this.nodeType && 11 !== this.nodeType && 9 !== this.nodeType || d(this, e).appendChild(e) }) }, prepend: function() { return this.domManip(arguments, function(e) { if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) { var t = d(this, e);
                        t.insertBefore(e, t.firstChild) } }) }, before: function() { return this.domManip(arguments, function(e) { this.parentNode && this.parentNode.insertBefore(e, this) }) }, after: function() { return this.domManip(arguments, function(e) { this.parentNode && this.parentNode.insertBefore(e, this.nextSibling) }) }, remove: function(e, t) { for (var n, r = e ? L.filter(e, this) : this, i = 0; null != (n = r[i]); i++) t || 1 !== n.nodeType || L.cleanData(m(n)), n.parentNode && (t && L.contains(n.ownerDocument, n) && v(m(n, "script")), n.parentNode.removeChild(n)); return this }, empty: function() { for (var e, t = 0; null != (e = this[t]); t++) 1 === e.nodeType && (L.cleanData(m(e, !1)), e.textContent = ""); return this }, clone: function(e, t) { return e = null != e && e, t = null == t ? e : t, this.map(function() { return L.clone(this, e, t) }) }, html: function(e) { return K(this, function(e) { var t = this[0] || {},
                        n = 0,
                        r = this.length; if (void 0 === e && 1 === t.nodeType) return t.innerHTML; if ("string" == typeof e && !ce.test(e) && !he[(se.exec(e) || ["", ""])[1].toLowerCase()]) { e = e.replace(ae, "<$1></$2>"); try { for (; n < r; n++) 1 === (t = this[n] || {}).nodeType && (L.cleanData(m(t, !1)), t.innerHTML = e);
                            t = 0 } catch (e) {} } t && this.empty().append(e) }, null, e, arguments.length) }, replaceWith: function() { var e = arguments[0]; return this.domManip(arguments, function(t) { e = this.parentNode, L.cleanData(m(this)), e && e.replaceChild(t, this) }), e && (e.length || e.nodeType) ? this : this.remove() }, detach: function(e) { return this.remove(e, !0) }, domManip: function(e, t) { e = T.apply([], e); var n, r, i, o, a, s, u = 0,
                    c = this.length,
                    l = this,
                    f = c - 1,
                    d = e[0],
                    v = L.isFunction(d); if (v || c > 1 && "string" == typeof d && !A.checkClone && le.test(d)) return this.each(function(n) { var r = l.eq(n);
                    v && (e[0] = d.call(this, n, r.html())), r.domManip(e, t) }); if (c && (n = L.buildFragment(e, this[0].ownerDocument, !1, this), r = n.firstChild, 1 === n.childNodes.length && (n = r), r)) { for (o = (i = L.map(m(n, "script"), p)).length; u < c; u++) a = n, u !== f && (a = L.clone(a, !0, !0), o && L.merge(i, m(a, "script"))), t.call(this[u], a, u); if (o)
                        for (s = i[i.length - 1].ownerDocument, L.map(i, h), u = 0; u < o; u++) a = i[u], fe.test(a.type || "") && !J.access(a, "globalEval") && L.contains(s, a) && (a.src ? L._evalUrl && L._evalUrl(a.src) : L.globalEval(a.textContent.replace(pe, ""))) } return this } }), L.each({ appendTo: "append", prependTo: "prepend", insertBefore: "before", insertAfter: "after", replaceAll: "replaceWith" }, function(e, t) { L.fn[e] = function(e) { for (var n, r = [], i = L(e), o = i.length - 1, a = 0; a <= o; a++) n = a === o ? this : this.clone(!0), L(i[a])[t](n), C.apply(r, n.get()); return this.pushStack(r) } }), L.fn.delay = function(e, t) { return e = L.fx ? L.fx.speeds[e] || e : e, t = t || "fx", this.queue(t, function(t, n) { var r = setTimeout(t, e);
                n.stop = function() { clearTimeout(r) } }) },
        function() { var e = E.createElement("input"),
                t = E.createElement("select"),
                n = t.appendChild(E.createElement("option"));
            e.type = "checkbox", A.checkOn = "" !== e.value, A.optSelected = n.selected, t.disabled = !0, A.optDisabled = !n.disabled, (e = E.createElement("input")).value = "t", e.type = "radio", A.radioValue = "t" === e.value }(); var ve, ge = L.expr.attrHandle;
    L.fn.extend({ attr: function(e, t) { return K(this, L.attr, e, t, arguments.length > 1) }, removeAttr: function(e) { return this.each(function() { L.removeAttr(this, e) }) } }), L.extend({ attr: function(e, t, n) { var r, i, o = e.nodeType; if (e && 3 !== o && 8 !== o && 2 !== o) return void 0 === e.getAttribute ? L.prop(e, t, n) : (1 === o && L.isXMLDoc(e) || (t = t.toLowerCase(), r = L.attrHooks[t] || (L.expr.match.bool.test(t) ? ve : void 0)), void 0 === n ? r && "get" in r && null !== (i = r.get(e, t)) ? i : (i = L.find.attr(e, t), null == i ? void 0 : i) : null !== n ? r && "set" in r && void 0 !== (i = r.set(e, n, t)) ? i : (e.setAttribute(t, n + ""), n) : void L.removeAttr(e, t)) }, removeAttr: function(e, t) { var n, r, i = 0,
                o = t && t.match(Q); if (o && 1 === e.nodeType)
                for (; n = o[i++];) r = L.propFix[n] || n, L.expr.match.bool.test(n) && (e[r] = !1), e.removeAttribute(n) }, attrHooks: { type: { set: function(e, t) { if (!A.radioValue && "radio" === t && L.nodeName(e, "input")) { var n = e.value; return e.setAttribute("type", t), n && (e.value = n), t } } } } }), ve = { set: function(e, t, n) { return !1 === t ? L.removeAttr(e, n) : e.setAttribute(n, n), n } }, L.each(L.expr.match.bool.source.match(/\w+/g), function(e, t) { var n = ge[t] || L.find.attr;
        ge[t] = function(e, t, r) { var i, o; return r || (o = ge[t], ge[t] = i, i = null != n(e, t, r) ? t.toLowerCase() : null, ge[t] = o), i } }); var me = /^(?:input|select|textarea|button)$/i;
    L.fn.extend({ prop: function(e, t) { return K(this, L.prop, e, t, arguments.length > 1) }, removeProp: function(e) { return this.each(function() { delete this[L.propFix[e] || e] }) } }), L.extend({ propFix: { for: "htmlFor", class: "className" }, prop: function(e, t, n) { var r, i, o = e.nodeType; if (e && 3 !== o && 8 !== o && 2 !== o) return (1 !== o || !L.isXMLDoc(e)) && (t = L.propFix[t] || t, i = L.propHooks[t]), void 0 !== n ? i && "set" in i && void 0 !== (r = i.set(e, n, t)) ? r : e[t] = n : i && "get" in i && null !== (r = i.get(e, t)) ? r : e[t] }, propHooks: { tabIndex: { get: function(e) { return e.hasAttribute("tabindex") || me.test(e.nodeName) || e.href ? e.tabIndex : -1 } } } }), A.optSelected || (L.propHooks.selected = { get: function(e) { var t = e.parentNode; return t && t.parentNode && t.parentNode.selectedIndex, null } }), L.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"], function() { L.propFix[this.toLowerCase()] = this }); var ye = /[\t\r\n\f]/g;
    L.fn.extend({ addClass: function(e) { var t, n, r, i, o, a, s = "string" == typeof e && e,
                u = 0,
                c = this.length; if (L.isFunction(e)) return this.each(function(t) { L(this).addClass(e.call(this, t, this.className)) }); if (s)
                for (t = (e || "").match(Q) || []; u < c; u++)
                    if (n = this[u], r = 1 === n.nodeType && (n.className ? (" " + n.className + " ").replace(ye, " ") : " ")) { for (o = 0; i = t[o++];) r.indexOf(" " + i + " ") < 0 && (r += i + " ");
                        a = L.trim(r), n.className !== a && (n.className = a) } return this }, removeClass: function(e) { var t, n, r, i, o, a, s = 0 === arguments.length || "string" == typeof e && e,
                u = 0,
                c = this.length; if (L.isFunction(e)) return this.each(function(t) { L(this).removeClass(e.call(this, t, this.className)) }); if (s)
                for (t = (e || "").match(Q) || []; u < c; u++)
                    if (n = this[u], r = 1 === n.nodeType && (n.className ? (" " + n.className + " ").replace(ye, " ") : "")) { for (o = 0; i = t[o++];)
                            for (; r.indexOf(" " + i + " ") >= 0;) r = r.replace(" " + i + " ", " ");
                        a = e ? L.trim(r) : "", n.className !== a && (n.className = a) } return this }, toggleClass: function(e, t) { var n = typeof e; return "boolean" == typeof t && "string" === n ? t ? this.addClass(e) : this.removeClass(e) : L.isFunction(e) ? this.each(function(n) { L(this).toggleClass(e.call(this, n, this.className, t), t) }) : this.each(function() { if ("string" === n)
                    for (var t, r = 0, i = L(this), o = e.match(Q) || []; t = o[r++];) i.hasClass(t) ? i.removeClass(t) : i.addClass(t);
                else "undefined" !== n && "boolean" !== n || (this.className && J.set(this, "__className__", this.className), this.className = this.className || !1 === e ? "" : J.get(this, "__className__") || "") }) }, hasClass: function(e) { for (var t = " " + e + " ", n = 0, r = this.length; n < r; n++)
                if (1 === this[n].nodeType && (" " + this[n].className + " ").replace(ye, " ").indexOf(t) >= 0) return !0; return !1 } }); var be = /\r/g;
    L.fn.extend({ val: function(e) { var t, n, r, i = this[0]; { if (arguments.length) return r = L.isFunction(e), this.each(function(n) { var i;
                    1 === this.nodeType && (null == (i = r ? e.call(this, n, L(this).val()) : e) ? i = "" : "number" == typeof i ? i += "" : L.isArray(i) && (i = L.map(i, function(e) { return null == e ? "" : e + "" })), (t = L.valHooks[this.type] || L.valHooks[this.nodeName.toLowerCase()]) && "set" in t && void 0 !== t.set(this, i, "value") || (this.value = i)) }); if (i) return (t = L.valHooks[i.type] || L.valHooks[i.nodeName.toLowerCase()]) && "get" in t && void 0 !== (n = t.get(i, "value")) ? n : (n = i.value, "string" == typeof n ? n.replace(be, "") : null == n ? "" : n) } } }), L.extend({ valHooks: { option: { get: function(e) { var t = L.find.attr(e, "value"); return null != t ? t : L.trim(L.text(e)) } }, select: { get: function(e) { for (var t, n, r = e.options, i = e.selectedIndex, o = "select-one" === e.type || i < 0, a = o ? null : [], s = o ? i + 1 : r.length, u = i < 0 ? s : o ? i : 0; u < s; u++)
                        if (((n = r[u]).selected || u === i) && (A.optDisabled ? !n.disabled : null === n.getAttribute("disabled")) && (!n.parentNode.disabled || !L.nodeName(n.parentNode, "optgroup"))) { if (t = L(n).val(), o) return t;
                            a.push(t) } return a }, set: function(e, t) { for (var n, r, i = e.options, o = L.makeArray(t), a = i.length; a--;)((r = i[a]).selected = L.inArray(r.value, o) >= 0) && (n = !0); return n || (e.selectedIndex = -1), o } } } }), L.each(["radio", "checkbox"], function() { L.valHooks[this] = { set: function(e, t) { if (L.isArray(t)) return e.checked = L.inArray(L(e).val(), t) >= 0 } }, A.checkOn || (L.valHooks[this].get = function(e) { return null === e.getAttribute("value") ? "on" : e.value }) }), L.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "), function(e, t) { L.fn[t] = function(e, n) { return arguments.length > 0 ? this.on(t, null, e, n) : this.trigger(t) } }), L.fn.extend({ hover: function(e, t) { return this.mouseenter(e).mouseleave(t || e) }, bind: function(e, t, n) { return this.on(e, null, t, n) }, unbind: function(e, t) { return this.off(e, null, t) }, delegate: function(e, t, n, r) { return this.on(t, e, n, r) }, undelegate: function(e, t, n) { return 1 === arguments.length ? this.off(e, "**") : this.off(t, e || "**", n) } }); var xe = /%20/g,
        ke = /\[\]$/,
        Te = /\r?\n/g,
        Ce = /^(?:submit|button|image|reset|file)$/i,
        we = /^(?:input|select|textarea|keygen)/i;
    L.param = function(e, t) { var n, r = [],
            i = function(e, t) { t = L.isFunction(t) ? t() : null == t ? "" : t, r[r.length] = encodeURIComponent(e) + "=" + encodeURIComponent(t) }; if (void 0 === t && (t = L.ajaxSettings && L.ajaxSettings.traditional), L.isArray(e) || e.jquery && !L.isPlainObject(e)) L.each(e, function() { i(this.name, this.value) });
        else
            for (n in e) b(n, e[n], t, i); return r.join("&").replace(xe, "+") }, L.fn.extend({ serialize: function() { return L.param(this.serializeArray()) }, serializeArray: function() { return this.map(function() { var e = L.prop(this, "elements"); return e ? L.makeArray(e) : this }).filter(function() { var e = this.type; return this.name && !L(this).is(":disabled") && we.test(this.nodeName) && !Ce.test(e) && (this.checked || !te.test(e)) }).map(function(e, t) { var n = L(this).val(); return null == n ? null : L.isArray(n) ? L.map(n, function(e) { return { name: t.name, value: e.replace(Te, "\r\n") } }) : { name: t.name, value: n.replace(Te, "\r\n") } }).get() } }), L.parseHTML = function(e, t, n) { if (!e || "string" != typeof e) return null; "boolean" == typeof t && (n = t, t = !1), t = t || E; var r = I.exec(e),
            i = !n && []; return r ? [t.createElement(r[1])] : (r = L.buildFragment([e], t, i), i && i.length && L(i).remove(), L.merge([], r.childNodes)) }, "function" == typeof define && define.amd && define("jquery", [], function() { return L }); var De = e.jQuery,
        Ne = e.$; return L.noConflict = function(t) { return e.$ === L && (e.$ = Ne), t && e.jQuery === L && (e.jQuery = De), L }, void 0 === t && (e.jQuery = e.$ = L), L });