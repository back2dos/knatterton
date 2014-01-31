(function () { "use strict";
var $estr = function() { return js.Boot.__string_rec(this,''); };
var HxOverrides = function() { }
HxOverrides.__name__ = true;
HxOverrides.cca = function(s,index) {
	var x = s.charCodeAt(index);
	if(x != x) return undefined;
	return x;
}
HxOverrides.remove = function(a,obj) {
	var i = 0;
	var l = a.length;
	while(i < l) {
		if(a[i] == obj) {
			a.splice(i,1);
			return true;
		}
		i++;
	}
	return false;
}
HxOverrides.iter = function(a) {
	return { cur : 0, arr : a, hasNext : function() {
		return this.cur < this.arr.length;
	}, next : function() {
		return this.arr[this.cur++];
	}};
}
var Lambda = function() { }
Lambda.__name__ = true;
Lambda.foreach = function(it,f) {
	var $it0 = $iterator(it)();
	while( $it0.hasNext() ) {
		var x = $it0.next();
		if(!f(x)) return false;
	}
	return true;
}
var tink = {}
tink.Lang = function() { }
tink.Lang.__name__ = true;
var $dom = function() { }
$dom.__name__ = true;
$dom.invalidate = function(this1) {
	var v = this1.getAttribute("_ti");
	switch(v) {
	case "Y":
		break;
	default:
		if(v == null) {
			this1.setAttribute("_ti","Y");
			"Y";
			$dom.invalidated.push(this1);
		} else {
		}
	}
}
$dom.tag = function(tag,attributes) {
	var ret = js.Browser.document.createElement(tag);
	var _g = 0, _g1 = Reflect.fields(attributes);
	while(_g < _g1.length) {
		var k = _g1[_g];
		++_g;
		if(k == "class") ret.className = Reflect.field(attributes,k); else ret.setAttribute(k,Reflect.field(attributes,k));
	}
	return ret;
}
$dom.set = function(this1,s,value) {
	var value1 = Std.string(value);
	if(value1 == null) this1.removeAttribute(s); else this1.setAttribute(s,value1);
	value1;
	return this1;
}
$dom.add = function(this1,h,before) {
	if(before == null) this1.appendChild(h); else this1.insertBefore(h,before);
	return this1;
}
$dom.get_nodeName = function(this1) {
	return this1.nodeName;
}
$dom.get_on = function(this1) {
	return this1;
}
$dom.get_attr = function(this1) {
	return this1;
}
$dom.get_parent = function(this1) {
	return $dom.path(this1,{ max : 1})[0];
}
$dom.get_classList = function(this1) {
	return this1;
}
$dom.collect = function(this1,stepper,self,max,filter) {
	if(max == null) max = 16777215;
	if(self == null) self = false;
	var current = this1, step = stepper(this1);
	var next = function() {
		var cur = step();
		while(cur != null) {
			if(cur.nodeType == 1 && (filter == null || filter(cur))) break;
			cur = step();
		}
		current = cur;
	};
	if(!self) next();
	var ret = [];
	while(current != null) {
		if(ret.push(current) >= max) return ret;
		next();
	}
	return ret;
}
$dom.GO_UP = function(n) {
	return function() {
		return n = n.parentNode;
	};
}
$dom.GO_BACK = function(n) {
	return function() {
		return n = n.previousSibling;
	};
}
$dom.GO_FORTH = function(n) {
	return function() {
		return n = n.nextSibling;
	};
}
$dom.BREADTH_FIRST = function(root) {
	var queue = [];
	if(root != null) queue.push(root);
	return function() {
		var ret = queue.shift();
		var _g = 0, _g1 = ret.childNodes;
		while(_g < _g1.length) {
			var n = _g1[_g];
			++_g;
			queue.push(n);
		}
		return ret;
	};
}
$dom.DEPTH_FIRST = function(root) {
	var stack = [];
	if(root != null) stack.push(root);
	return function() {
		var ret = stack.pop();
		var len = ret.childNodes.length;
		var _g1 = 1, _g = len + 1;
		while(_g1 < _g) {
			var i = _g1++;
			stack.push(ret.childNodes[len - i]);
		}
		return ret;
	};
}
$dom.children = function(this1,filter) {
	var cur = this1.firstChild;
	while(cur != null && cur.nodeType != 1) cur = cur.nextSibling;
	var first = cur;
	return first == null?[]:$dom.collect(first,$dom.GO_FORTH,true,null,filter);
}
$dom.path = function(this1,options) {
	if(options == null) options = { };
	return $dom.collect(this1,$dom.GO_UP,options.self,options.max,options.filter);
}
$dom.siblings = function(this1,options) {
	if(options == null) options = { };
	return $dom.collect(this1,options.back?$dom.GO_BACK:$dom.GO_FORTH,options.self,options.max,options.filter);
}
$dom.get_className = function(this1) {
	return this1.className;
}
$dom.set_className = function(this1,param) {
	return (function($this) {
		var $r;
		this1.className = param;
		$r = param;
		return $r;
	}(this));
}
$dom.get_id = function(this1) {
	return this1.id;
}
$dom.set_id = function(this1,param) {
	return (function($this) {
		var $r;
		this1.id = param;
		$r = param;
		return $r;
	}(this));
}
$dom.get_style = function(this1) {
	return this1.style;
}
$dom.contains = function(this1,other) {
	return this1.contains(other);
}
var js = {}
js.Browser = function() { }
js.Browser.__name__ = true;
var Reflect = function() { }
Reflect.__name__ = true;
Reflect.field = function(o,field) {
	var v = null;
	try {
		v = o[field];
	} catch( e ) {
	}
	return v;
}
Reflect.fields = function(o) {
	var a = [];
	if(o != null) {
		var hasOwnProperty = Object.prototype.hasOwnProperty;
		for( var f in o ) {
		if(f != "__id__" && f != "hx__closures__" && hasOwnProperty.call(o,f)) a.push(f);
		}
	}
	return a;
}
var IMap = function() { }
IMap.__name__ = true;
var haxe = {}
haxe.ds = {}
haxe.ds.StringMap = function() {
	this.h = { };
};
haxe.ds.StringMap.__name__ = true;
haxe.ds.StringMap.__interfaces__ = [IMap];
haxe.ds.StringMap.prototype = {
	exists: function(key) {
		return this.h.hasOwnProperty("$" + key);
	}
	,get: function(key) {
		return this.h["$" + key];
	}
	,set: function(key,value) {
		this.h["$" + key] = value;
	}
	,__class__: haxe.ds.StringMap
}
var Main = function() {
};
Main.__name__ = true;
Main.__interfaces__ = [tink.Lang];
Main.main = function() {
	Main.on("mousedown","div.canvas.focused > *",Main.resizeFragment);
	Main.on("mousedown","div.canvas.focused div.content:not([contenteditable])",Main.dragFragment);
	Main.on("click","div.canvas.focused > div.text",Main.editText);
	Main.on("mousedown","#viewport[data-focus=canvas] .bg",Main.newElement);
}
Main.newElement = function(e) {
	var layer = js.Browser.document.querySelector(".canvas.focused"), fresh = null, x = e.a.pageX, y = e.a.pageY, width = 0;
	(tink.core._Signal.Signal_Impl_.next(tinx.dom._Events.Events_Impl_.event(Main.root,"mouseup")))(tink.core._Callback.CallbackLink_Impl_.toCallback((tinx.dom._Events.Events_Impl_.event(Main.root,"mousemove"))(function(m) {
		if(fresh == null) {
			fresh = js.Browser.document.querySelector("div.fresh>.text").cloneNode(true);
			$dom.add(layer,fresh);
			fresh.style.left = x + "px";
			fresh.style.top = y + "px";
		}
		width = m.pageX - x;
		if(width < 0) width *= -1;
		if(width < Main.minWidth(0)) fresh.style.opacity = "0"; else {
			fresh.style.removeProperty("opacity");
			fresh.style.width = width + "px";
			fresh.style.left = (m.pageX < x?m.pageX:x) + "px";
		}
	})));
	(tink.core._Signal.Signal_Impl_.next(tinx.dom._Events.Events_Impl_.event(Main.root,"mouseup")))(function(m) {
		if(fresh != null) {
			Main.skipClick();
			if(fresh.style.opacity == "0") layer.removeChild(fresh);
		}
	});
}
Main.zoom = function(e) {
	var w = e.a;
	var _g = 0, _g1 = js.Browser.document.querySelectorAll(".canvas.focused");
	while(_g < _g1.length) {
		var elt = _g1[_g];
		++_g;
		var elt1 = elt;
		var style = elt1.style;
		var zoom = Std.parseFloat(style.webkitTransform.split("scale(")[1]), origin = (function($this) {
			var $r;
			var _g2 = Std.string(style.webkitTransformOrigin).split("px ").map(Std.parseInt);
			$r = (function($this) {
				var $r;
				switch(_g2.length) {
				case 2:
					$r = _g2[0] != null && _g2[1] != null?{ x : _g2[0], y : _g2[1]}:{ x : 0, y : 0};
					break;
				default:
					$r = { x : 0, y : 0};
				}
				return $r;
			}($this));
			return $r;
		}(this));
		if(Math.isNaN(zoom)) zoom = 1;
		var fac = Math.pow(1.001,w.wheelDelta);
		zoom *= fac;
		style.webkitTransformOrigin = "" + w.clientX + "px " + w.clientY + "px";
		style.webkitTransform = "scale(" + zoom + ", " + zoom + ")";
	}
}
Main.minWidth = function(w) {
	return w < 100?100:w;
}
Main.resizeFragment = function(e) {
	var target = e.b, x = e.a.pageX;
	if(target != e.a.srcElement) return;
	var x0 = (function($this) {
		var $r;
		var ___val = Std.parseInt(target.style.left);
		$r = ___val == null?0:___val;
		return $r;
	}(this)), w0 = (function($this) {
		var $r;
		var ___val = Std.parseInt(target.style.width);
		$r = ___val == null?0:___val;
		return $r;
	}(this));
	var left = e.a.layerX < w0 / 2, moved = false;
	(tink.core._Signal.Signal_Impl_.next(tinx.dom._Events.Events_Impl_.event(Main.root,"mouseup")))(tink.core._Callback.CallbackLink_Impl_.toCallback((tinx.dom._Events.Events_Impl_.event(Main.root,"mousemove"))(function(m) {
		if(!moved) {
			Main.toTop(target);
			moved = true;
		}
		target.style.width = Main.minWidth(left?(function($this) {
			var $r;
			target.style.left = x0 + m.pageX - x + "px";
			$r = w0 - m.pageX + x;
			return $r;
		}(this)):w0 + m.pageX - x) + "px";
	})));
	(tink.core._Signal.Signal_Impl_.next(tinx.dom._Events.Events_Impl_.event(Main.root,"mouseup")))(function(m) {
		if(moved) Main.skipClick();
	});
}
Main.toTop = function(e) {
	$dom.add($dom.path(e,{ max : 1})[0],e);
}
Main.editText = function(e) {
	Main.toTop(e.b);
	var target = e.b.firstElementChild;
	var this1 = target;
	this1.setAttribute("contenteditable","true");
	"true";
	(tink.core._Signal.Signal_Impl_.next(tinx.dom._Events.Events_Impl_.event(target,"blur")))((function($this) {
		var $r;
		var f = function() {
			var this1 = target;
			this1.removeAttribute("contenteditable");
			null;
		};
		$r = function(r) {
			f();
		};
		return $r;
	}(this)));
	var elt = target;
	elt.focus();
}
Main.dragFragment = function(e) {
	var target = $dom.path(e.b,{ max : 1})[0];
	console.log(e.a);
	var x = e.a.pageX, y = e.a.pageY;
	var x0 = (function($this) {
		var $r;
		var ___val = Std.parseInt(target.style.left);
		$r = ___val == null?0:___val;
		return $r;
	}(this)), y0 = (function($this) {
		var $r;
		var ___val = Std.parseInt(target.style.top);
		$r = ___val == null?0:___val;
		return $r;
	}(this));
	var moved = false;
	(tink.core._Signal.Signal_Impl_.next(tinx.dom._Events.Events_Impl_.event(Main.root,"mouseup")))(tink.core._Callback.CallbackLink_Impl_.toCallback((tinx.dom._Events.Events_Impl_.event(Main.root,"mousemove"))(function(m) {
		console.log(m);
		if(!moved) {
			Main.toTop(target);
			moved = true;
		}
		target.style.left = x0 + m.pageX - x + "px";
		target.style.top = y0 + m.pageY - y + "px";
	})));
	(tink.core._Signal.Signal_Impl_.next(tinx.dom._Events.Events_Impl_.event(Main.root,"mouseup")))(function(m) {
		if(moved) Main.skipClick();
	});
}
Main.skipClick = function() {
	Main.muted.set("click",true);
	true;
	($_=haxe.Timer.delay(function() {
		Main.muted.set("click",false);
		false;
	},100),$bind($_,$_.stop));
}
Main.on = function(event,selector,handler) {
	if(!Main.handlers.exists(event)) {
		var v = [];
		Main.handlers.set(event,v);
		v;
		js.Browser.document.addEventListener(event,Main.handleEvent,true);
	}
	Main.handlers.get(event).push({ a : selector, b : handler});
}
Main.handleEvent = function(e) {
	if(Main.muted.get(e.type)) return;
	var elt = e.srcElement, handlers = Main.handlers.get(e.type);
	while(elt != null) {
		var _g = 0;
		while(_g < handlers.length) {
			var h = handlers[_g];
			++_g;
			if(elt.webkitMatchesSelector(h.a)) tink.core._Callback.Callback_Impl_.invoke(h.b,{ a : e, b : elt});
		}
		elt = $dom.path(elt,{ max : 1})[0];
	}
}
Main.prototype = {
	__class__: Main
}
var Std = function() { }
Std.__name__ = true;
Std.string = function(s) {
	return js.Boot.__string_rec(s,"");
}
Std.parseInt = function(x) {
	var v = parseInt(x,10);
	if(v == 0 && (HxOverrides.cca(x,1) == 120 || HxOverrides.cca(x,1) == 88)) v = parseInt(x);
	if(isNaN(v)) return null;
	return v;
}
Std.parseFloat = function(x) {
	return parseFloat(x);
}
haxe.Timer = function(time_ms) {
	var me = this;
	this.id = setInterval(function() {
		me.run();
	},time_ms);
};
haxe.Timer.__name__ = true;
haxe.Timer.delay = function(f,time_ms) {
	var t = new haxe.Timer(time_ms);
	t.run = function() {
		t.stop();
		f();
	};
	return t;
}
haxe.Timer.prototype = {
	run: function() {
		console.log("run");
	}
	,stop: function() {
		if(this.id == null) return;
		clearInterval(this.id);
		this.id = null;
	}
	,__class__: haxe.Timer
}
haxe.ds.Option = { __ename__ : true, __constructs__ : ["Some","None"] }
haxe.ds.Option.Some = function(v) { var $x = ["Some",0,v]; $x.__enum__ = haxe.ds.Option; $x.toString = $estr; return $x; }
haxe.ds.Option.None = ["None",1];
haxe.ds.Option.None.toString = $estr;
haxe.ds.Option.None.__enum__ = haxe.ds.Option;
js.Boot = function() { }
js.Boot.__name__ = true;
js.Boot.__string_rec = function(o,s) {
	if(o == null) return "null";
	if(s.length >= 5) return "<...>";
	var t = typeof(o);
	if(t == "function" && (o.__name__ || o.__ename__)) t = "object";
	switch(t) {
	case "object":
		if(o instanceof Array) {
			if(o.__enum__) {
				if(o.length == 2) return o[0];
				var str = o[0] + "(";
				s += "\t";
				var _g1 = 2, _g = o.length;
				while(_g1 < _g) {
					var i = _g1++;
					if(i != 2) str += "," + js.Boot.__string_rec(o[i],s); else str += js.Boot.__string_rec(o[i],s);
				}
				return str + ")";
			}
			var l = o.length;
			var i;
			var str = "[";
			s += "\t";
			var _g = 0;
			while(_g < l) {
				var i1 = _g++;
				str += (i1 > 0?",":"") + js.Boot.__string_rec(o[i1],s);
			}
			str += "]";
			return str;
		}
		var tostr;
		try {
			tostr = o.toString;
		} catch( e ) {
			return "???";
		}
		if(tostr != null && tostr != Object.toString) {
			var s2 = o.toString();
			if(s2 != "[object Object]") return s2;
		}
		var k = null;
		var str = "{\n";
		s += "\t";
		var hasp = o.hasOwnProperty != null;
		for( var k in o ) { ;
		if(hasp && !o.hasOwnProperty(k)) {
			continue;
		}
		if(k == "prototype" || k == "__class__" || k == "__super__" || k == "__interfaces__" || k == "__properties__") {
			continue;
		}
		if(str.length != 2) str += ", \n";
		str += s + k + " : " + js.Boot.__string_rec(o[k],s);
		}
		s = s.substring(1);
		str += "\n" + s + "}";
		return str;
	case "function":
		return "<function>";
	case "string":
		return o;
	default:
		return String(o);
	}
}
js.Boot.__interfLoop = function(cc,cl) {
	if(cc == null) return false;
	if(cc == cl) return true;
	var intf = cc.__interfaces__;
	if(intf != null) {
		var _g1 = 0, _g = intf.length;
		while(_g1 < _g) {
			var i = _g1++;
			var i1 = intf[i];
			if(i1 == cl || js.Boot.__interfLoop(i1,cl)) return true;
		}
	}
	return js.Boot.__interfLoop(cc.__super__,cl);
}
js.Boot.__instanceof = function(o,cl) {
	if(cl == null) return false;
	switch(cl) {
	case Int:
		return (o|0) === o;
	case Float:
		return typeof(o) == "number";
	case Bool:
		return typeof(o) == "boolean";
	case String:
		return typeof(o) == "string";
	case Dynamic:
		return true;
	default:
		if(o != null) {
			if(typeof(cl) == "function") {
				if(o instanceof cl) {
					if(cl == Array) return o.__enum__ == null;
					return true;
				}
				if(js.Boot.__interfLoop(o.__class__,cl)) return true;
			}
		} else return false;
		if(cl == Class && o.__name__ != null) return true;
		if(cl == Enum && o.__ename__ != null) return true;
		return o.__enum__ == cl;
	}
}
tink.core = {}
tink.core._Callback = {}
tink.core._Callback.Callback_Impl_ = function() { }
tink.core._Callback.Callback_Impl_.__name__ = true;
tink.core._Callback.Callback_Impl_._new = function(f) {
	return f;
}
tink.core._Callback.Callback_Impl_.invoke = function(this1,data) {
	this1(data);
}
tink.core._Callback.Callback_Impl_.fromNiladic = function(f) {
	return function(r) {
		f();
	};
}
tink.core._Callback.Callback_Impl_.fromMany = function(callbacks) {
	return function(v) {
		var _g = 0;
		while(_g < callbacks.length) {
			var callback = callbacks[_g];
			++_g;
			tink.core._Callback.Callback_Impl_.invoke(callback,v);
		}
	};
}
tink.core._Callback.CallbackLink_Impl_ = function() { }
tink.core._Callback.CallbackLink_Impl_.__name__ = true;
tink.core._Callback.CallbackLink_Impl_._new = function(link) {
	return link;
}
tink.core._Callback.CallbackLink_Impl_.dissolve = function(this1) {
	if(this1 != null) this1();
}
tink.core._Callback.CallbackLink_Impl_.toCallback = function(this1) {
	return (function($this) {
		var $r;
		var f = this1;
		$r = function(r) {
			f();
		};
		return $r;
	}(this));
}
tink.core._Callback.CallbackLink_Impl_.fromFunction = function(f) {
	return f;
}
tink.core._Callback.CallbackLink_Impl_.fromMany = function(callbacks) {
	return function() {
		var _g = 0;
		while(_g < callbacks.length) {
			var cb = callbacks[_g];
			++_g;
			if(cb != null) cb();
		}
	};
}
tink.core._Callback.Cell = function() {
};
tink.core._Callback.Cell.__name__ = true;
tink.core._Callback.Cell.get = function() {
	return tink.core._Callback.Cell.pool.length > 0?tink.core._Callback.Cell.pool.pop():new tink.core._Callback.Cell();
}
tink.core._Callback.Cell.prototype = {
	free: function() {
		this.cb = null;
		tink.core._Callback.Cell.pool.push(this);
	}
	,__class__: tink.core._Callback.Cell
}
tink.core._Callback.CallbackList_Impl_ = function() { }
tink.core._Callback.CallbackList_Impl_.__name__ = true;
tink.core._Callback.CallbackList_Impl_._new = function() {
	return [];
}
tink.core._Callback.CallbackList_Impl_.get_length = function(this1) {
	return this1.length;
}
tink.core._Callback.CallbackList_Impl_.add = function(this1,cb) {
	var cell = tink.core._Callback.Cell.pool.length > 0?tink.core._Callback.Cell.pool.pop():new tink.core._Callback.Cell();
	cell.cb = cb;
	this1.push(cell);
	return function() {
		if(HxOverrides.remove(this1,cell)) {
			cell.cb = null;
			tink.core._Callback.Cell.pool.push(cell);
		}
		cell = null;
	};
}
tink.core._Callback.CallbackList_Impl_.invoke = function(this1,data) {
	var _g = 0, _g1 = this1.slice();
	while(_g < _g1.length) {
		var cell = _g1[_g];
		++_g;
		if(cell.cb != null) tink.core._Callback.Callback_Impl_.invoke(cell.cb,data);
	}
}
tink.core._Callback.CallbackList_Impl_.clear = function(this1) {
	var _g = 0, _g1 = this1.splice(0,this1.length);
	while(_g < _g1.length) {
		var cell = _g1[_g];
		++_g;
		cell.cb = null;
		tink.core._Callback.Cell.pool.push(cell);
	}
}
tink.core.Either = { __ename__ : true, __constructs__ : ["Left","Right"] }
tink.core.Either.Left = function(a) { var $x = ["Left",0,a]; $x.__enum__ = tink.core.Either; $x.toString = $estr; return $x; }
tink.core.Either.Right = function(b) { var $x = ["Right",1,b]; $x.__enum__ = tink.core.Either; $x.toString = $estr; return $x; }
tink.core.Error = function(message,pos) {
	this.message = message;
	this.pos = pos;
};
tink.core.Error.__name__ = true;
tink.core.Error.withData = function(message,data,pos) {
	var ret = new tink.core.Error(message,pos);
	ret.data = data;
	return ret;
}
tink.core.Error.prototype = {
	throwSelf: function() {
		return (function($this) {
			var $r;
			throw $this;
			return $r;
		}(this));
	}
	,toString: function() {
		var ret = "Error: " + this.message;
		if(this.pos != null) ret += " " + this.printPos();
		return ret;
	}
	,printPos: function() {
		return this.pos.className + "." + this.pos.methodName + ":" + this.pos.lineNumber;
	}
	,__class__: tink.core.Error
}
tink.core._Future = {}
tink.core._Future.Future_Impl_ = function() { }
tink.core._Future.Future_Impl_.__name__ = true;
tink.core._Future.Future_Impl_._new = function(f) {
	return f;
}
tink.core._Future.Future_Impl_.handle = function(this1,callback) {
	return this1(callback);
}
tink.core._Future.Future_Impl_.gather = function(this1) {
	var op = new tink.core.FutureTrigger(), self = this1;
	return function(cb) {
		if(self != null) {
			self($bind(op,op.trigger));
			self = null;
		}
		return op.future(cb);
	};
}
tink.core._Future.Future_Impl_.first = function(this1,other) {
	return tink.core._Future.Future_Impl_.async(function(cb) {
		this1(cb);
		other(cb);
	});
}
tink.core._Future.Future_Impl_.map = function(this1,f,gather) {
	if(gather == null) gather = true;
	var ret = function(callback) {
		return this1(function(result) {
			tink.core._Callback.Callback_Impl_.invoke(callback,f(result));
		});
	};
	return gather?tink.core._Future.Future_Impl_.gather(ret):ret;
}
tink.core._Future.Future_Impl_.flatMap = function(this1,next,gather) {
	if(gather == null) gather = true;
	var ret = tink.core._Future.Future_Impl_.flatten(tink.core._Future.Future_Impl_.map(this1,next,gather));
	return gather?tink.core._Future.Future_Impl_.gather(ret):ret;
}
tink.core._Future.Future_Impl_.merge = function(this1,other,merger,gather) {
	if(gather == null) gather = true;
	return tink.core._Future.Future_Impl_.flatMap(this1,function(t) {
		return tink.core._Future.Future_Impl_.map(other,function(a) {
			return merger(t,a);
		},false);
	},gather);
}
tink.core._Future.Future_Impl_.flatten = function(f) {
	return function(callback) {
		var ret = null;
		ret = f(function(next) {
			ret = next(function(result) {
				tink.core._Callback.Callback_Impl_.invoke(callback,result);
			});
		});
		return ret;
	};
}
tink.core._Future.Future_Impl_.fromTrigger = function(trigger) {
	return trigger.future;
}
tink.core._Future.Future_Impl_.ofMany = function(futures,gather) {
	if(gather == null) gather = true;
	var ret = tink.core._Future.Future_Impl_.sync([]);
	var _g = 0;
	while(_g < futures.length) {
		var f = [futures[_g]];
		++_g;
		ret = tink.core._Future.Future_Impl_.flatMap(ret,(function(f) {
			return function(results) {
				return tink.core._Future.Future_Impl_.map(f[0],(function() {
					return function(result) {
						return results.concat([result]);
					};
				})(),false);
			};
		})(f),false);
	}
	return gather?tink.core._Future.Future_Impl_.gather(ret):ret;
}
tink.core._Future.Future_Impl_.fromMany = function(futures) {
	return tink.core._Future.Future_Impl_.ofMany(futures);
}
tink.core._Future.Future_Impl_.lazy = function(l) {
	return function(cb) {
		tink.core._Callback.Callback_Impl_.invoke(cb,l());
		return null;
	};
}
tink.core._Future.Future_Impl_.sync = function(v) {
	return function(callback) {
		tink.core._Callback.Callback_Impl_.invoke(callback,v);
		return null;
	};
}
tink.core._Future.Future_Impl_.async = function(f,lazy) {
	if(lazy == null) lazy = false;
	if(lazy) return tink.core._Future.Future_Impl_.flatten(tink.core._Future.Future_Impl_.lazy(tink.core._Lazy.Lazy_Impl_.ofFunc((function(f1,f2,a1) {
		return function() {
			return f1(f2,a1);
		};
	})(tink.core._Future.Future_Impl_.async,f,false)))); else {
		var op = new tink.core.FutureTrigger();
		f($bind(op,op.trigger));
		return op.future;
	}
}
tink.core._Future.Future_Impl_.or = function(a,b) {
	return tink.core._Future.Future_Impl_.first(a,b);
}
tink.core._Future.Future_Impl_.either = function(a,b) {
	return tink.core._Future.Future_Impl_.first(tink.core._Future.Future_Impl_.map(a,tink.core.Either.Left,false),tink.core._Future.Future_Impl_.map(b,tink.core.Either.Right,false));
}
tink.core._Future.Future_Impl_.and = function(a,b) {
	return tink.core._Future.Future_Impl_.merge(a,b,function(a1,b1) {
		return { a : a1, b : b1};
	});
}
tink.core._Future.Future_Impl_._tryFailingFlatMap = function(f,map) {
	return tink.core._Future.Future_Impl_.flatMap(f,function(o) {
		return (function($this) {
			var $r;
			var $e = (o);
			switch( $e[1] ) {
			case 0:
				var d = $e[2];
				$r = map(d);
				break;
			case 1:
				var f1 = $e[2];
				$r = tink.core._Future.Future_Impl_.sync(tink.core.Outcome.Failure(f1));
				break;
			}
			return $r;
		}(this));
	});
}
tink.core._Future.Future_Impl_._tryFlatMap = function(f,map) {
	return tink.core._Future.Future_Impl_.flatMap(f,function(o) {
		return (function($this) {
			var $r;
			var $e = (o);
			switch( $e[1] ) {
			case 0:
				var d = $e[2];
				$r = tink.core._Future.Future_Impl_.map(map(d),tink.core.Outcome.Success);
				break;
			case 1:
				var f1 = $e[2];
				$r = tink.core._Future.Future_Impl_.sync(tink.core.Outcome.Failure(f1));
				break;
			}
			return $r;
		}(this));
	});
}
tink.core._Future.Future_Impl_._tryFailingMap = function(f,map) {
	return tink.core._Future.Future_Impl_.map(f,function(o) {
		return (function($this) {
			var $r;
			var $e = (o);
			switch( $e[1] ) {
			case 0:
				var d = $e[2];
				$r = map(d);
				break;
			case 1:
				var f1 = $e[2];
				$r = tink.core.Outcome.Failure(f1);
				break;
			}
			return $r;
		}(this));
	});
}
tink.core._Future.Future_Impl_._tryMap = function(f,map) {
	return tink.core._Future.Future_Impl_.map(f,function(o) {
		return (function($this) {
			var $r;
			var $e = (o);
			switch( $e[1] ) {
			case 0:
				var d = $e[2];
				$r = tink.core.Outcome.Success(map(d));
				break;
			case 1:
				var f1 = $e[2];
				$r = tink.core.Outcome.Failure(f1);
				break;
			}
			return $r;
		}(this));
	});
}
tink.core._Future.Future_Impl_._flatMap = function(f,map) {
	return tink.core._Future.Future_Impl_.flatMap(f,map);
}
tink.core._Future.Future_Impl_._map = function(f,map) {
	return tink.core._Future.Future_Impl_.map(f,map);
}
tink.core._Future.Future_Impl_.trigger = function() {
	return new tink.core.FutureTrigger();
}
tink.core.FutureTrigger = function() {
	var _g = this;
	this.list = [];
	this.future = function(callback) {
		return _g.list == null?(function($this) {
			var $r;
			tink.core._Callback.Callback_Impl_.invoke(callback,_g.result);
			$r = null;
			return $r;
		}(this)):tink.core._Callback.CallbackList_Impl_.add(_g.list,callback);
	};
};
tink.core.FutureTrigger.__name__ = true;
tink.core.FutureTrigger.prototype = {
	trigger: function(result) {
		return this.list == null?false:(function($this) {
			var $r;
			var list = $this.list;
			$this.list = null;
			$this.result = result;
			tink.core._Callback.CallbackList_Impl_.invoke(list,result);
			tink.core._Callback.CallbackList_Impl_.clear(list);
			$r = true;
			return $r;
		}(this));
	}
	,asFuture: function() {
		return this.future;
	}
	,__class__: tink.core.FutureTrigger
}
tink.core._Lazy = {}
tink.core._Lazy.Lazy_Impl_ = function() { }
tink.core._Lazy.Lazy_Impl_.__name__ = true;
tink.core._Lazy.Lazy_Impl_._new = function(r) {
	return r;
}
tink.core._Lazy.Lazy_Impl_.get = function(this1) {
	return this1();
}
tink.core._Lazy.Lazy_Impl_.ofFunc = function(f) {
	var result = null;
	return function() {
		if(f != null) {
			result = f();
			f = null;
		}
		return result;
	};
}
tink.core._Lazy.Lazy_Impl_.map = function(this1,f) {
	return tink.core._Lazy.Lazy_Impl_.ofFunc(function() {
		return f(this1());
	});
}
tink.core._Lazy.Lazy_Impl_.flatMap = function(this1,f) {
	return tink.core._Lazy.Lazy_Impl_.ofFunc(function() {
		return (f(this1()))();
	});
}
tink.core._Lazy.Lazy_Impl_.ofConst = function(c) {
	return function() {
		return c;
	};
}
tink.core.Noise = { __ename__ : true, __constructs__ : ["Noise"] }
tink.core.Noise.Noise = ["Noise",0];
tink.core.Noise.Noise.toString = $estr;
tink.core.Noise.Noise.__enum__ = tink.core.Noise;
tink.core.Outcome = { __ename__ : true, __constructs__ : ["Success","Failure"] }
tink.core.Outcome.Success = function(data) { var $x = ["Success",0,data]; $x.__enum__ = tink.core.Outcome; $x.toString = $estr; return $x; }
tink.core.Outcome.Failure = function(failure) { var $x = ["Failure",1,failure]; $x.__enum__ = tink.core.Outcome; $x.toString = $estr; return $x; }
tink.core.OutcomeTools = function() { }
tink.core.OutcomeTools.__name__ = true;
tink.core.OutcomeTools.sure = function(outcome) {
	return (function($this) {
		var $r;
		var $e = (outcome);
		switch( $e[1] ) {
		case 0:
			var data = $e[2];
			$r = data;
			break;
		case 1:
			var failure = $e[2];
			$r = js.Boot.__instanceof(failure,tink.core.Error)?failure.throwSelf():(function($this) {
				var $r;
				throw failure;
				return $r;
			}($this));
			break;
		}
		return $r;
	}(this));
}
tink.core.OutcomeTools.toOption = function(outcome) {
	return (function($this) {
		var $r;
		var $e = (outcome);
		switch( $e[1] ) {
		case 0:
			var data = $e[2];
			$r = haxe.ds.Option.Some(data);
			break;
		case 1:
			$r = haxe.ds.Option.None;
			break;
		}
		return $r;
	}(this));
}
tink.core.OutcomeTools.toOutcome = function(option,pos) {
	return (function($this) {
		var $r;
		var $e = (option);
		switch( $e[1] ) {
		case 0:
			var value = $e[2];
			$r = tink.core.Outcome.Success(value);
			break;
		case 1:
			$r = tink.core.Outcome.Failure("Some value expected but none found in " + pos.fileName + "@line " + pos.lineNumber);
			break;
		}
		return $r;
	}(this));
}
tink.core.OutcomeTools.orUse = function(outcome,fallback) {
	return (function($this) {
		var $r;
		var $e = (outcome);
		switch( $e[1] ) {
		case 0:
			var data = $e[2];
			$r = data;
			break;
		case 1:
			$r = fallback;
			break;
		}
		return $r;
	}(this));
}
tink.core.OutcomeTools.orTry = function(outcome,fallback) {
	return (function($this) {
		var $r;
		switch( (outcome)[1] ) {
		case 0:
			$r = outcome;
			break;
		case 1:
			$r = fallback;
			break;
		}
		return $r;
	}(this));
}
tink.core.OutcomeTools.equals = function(outcome,to) {
	return (function($this) {
		var $r;
		var $e = (outcome);
		switch( $e[1] ) {
		case 0:
			var data = $e[2];
			$r = data == to;
			break;
		case 1:
			$r = false;
			break;
		}
		return $r;
	}(this));
}
tink.core.OutcomeTools.map = function(outcome,transform) {
	return (function($this) {
		var $r;
		var $e = (outcome);
		switch( $e[1] ) {
		case 0:
			var a = $e[2];
			$r = tink.core.Outcome.Success(transform(a));
			break;
		case 1:
			var f = $e[2];
			$r = tink.core.Outcome.Failure(f);
			break;
		}
		return $r;
	}(this));
}
tink.core.OutcomeTools.isSuccess = function(outcome) {
	return (function($this) {
		var $r;
		switch( (outcome)[1] ) {
		case 0:
			$r = true;
			break;
		default:
			$r = false;
		}
		return $r;
	}(this));
}
tink.core.OutcomeTools.flatMap = function(o,mapper) {
	return tink.core._Outcome.OutcomeMap_Impl_.apply(mapper,o);
}
tink.core._Outcome = {}
tink.core._Outcome.OutcomeMap_Impl_ = function() { }
tink.core._Outcome.OutcomeMap_Impl_.__name__ = true;
tink.core._Outcome.OutcomeMap_Impl_._new = function(f) {
	return { f : f};
}
tink.core._Outcome.OutcomeMap_Impl_.apply = function(this1,o) {
	return this1.f(o);
}
tink.core._Outcome.OutcomeMap_Impl_.withSameError = function(f) {
	return tink.core._Outcome.OutcomeMap_Impl_._new(function(o) {
		return (function($this) {
			var $r;
			var $e = (o);
			switch( $e[1] ) {
			case 0:
				var d = $e[2];
				$r = f(d);
				break;
			case 1:
				var f1 = $e[2];
				$r = tink.core.Outcome.Failure(f1);
				break;
			}
			return $r;
		}(this));
	});
}
tink.core._Outcome.OutcomeMap_Impl_.withEitherError = function(f) {
	return tink.core._Outcome.OutcomeMap_Impl_._new(function(o) {
		return (function($this) {
			var $r;
			var $e = (o);
			switch( $e[1] ) {
			case 0:
				var d = $e[2];
				$r = (function($this) {
					var $r;
					var _g = f(d);
					$r = (function($this) {
						var $r;
						var $e = (_g);
						switch( $e[1] ) {
						case 0:
							var d1 = $e[2];
							$r = tink.core.Outcome.Success(d1);
							break;
						case 1:
							var f1 = $e[2];
							$r = tink.core.Outcome.Failure(tink.core.Either.Right(f1));
							break;
						}
						return $r;
					}($this));
					return $r;
				}($this));
				break;
			case 1:
				var f1 = $e[2];
				$r = tink.core.Outcome.Failure(tink.core.Either.Left(f1));
				break;
			}
			return $r;
		}(this));
	});
}
tink.core._Pair = {}
tink.core._Pair.Pair_Impl_ = function() { }
tink.core._Pair.Pair_Impl_.__name__ = true;
tink.core._Pair.Pair_Impl_._new = function(a,b) {
	return { a : a, b : b};
}
tink.core._Pair.Pair_Impl_.get_a = function(this1) {
	return this1.a;
}
tink.core._Pair.Pair_Impl_.get_b = function(this1) {
	return this1.b;
}
tink.core._Pair.Pair_Impl_.toBool = function(this1) {
	return this1 != null;
}
tink.core._Pair.Pair_Impl_.isNil = function(this1) {
	return this1 == null;
}
tink.core._Pair.Pair_Impl_.nil = function() {
	return null;
}
tink.core._Pair.MPair_Impl_ = function() { }
tink.core._Pair.MPair_Impl_.__name__ = true;
tink.core._Pair.MPair_Impl_._new = function(a,b) {
	return { a : a, b : b};
}
tink.core._Pair.MPair_Impl_.get_a = function(this1) {
	return this1.a;
}
tink.core._Pair.MPair_Impl_.get_b = function(this1) {
	return this1.b;
}
tink.core._Pair.MPair_Impl_.set_a = function(this1,v) {
	return this1.a = v;
}
tink.core._Pair.MPair_Impl_.set_b = function(this1,v) {
	return this1.b = v;
}
tink.core._Ref = {}
tink.core._Ref.Ref_Impl_ = function() { }
tink.core._Ref.Ref_Impl_.__name__ = true;
tink.core._Ref.Ref_Impl_._new = function() {
	return new Array(1);
}
tink.core._Ref.Ref_Impl_.get_value = function(this1) {
	return this1[0];
}
tink.core._Ref.Ref_Impl_.set_value = function(this1,param) {
	return this1[0] = param;
}
tink.core._Ref.Ref_Impl_.toString = function(this1) {
	return "@[" + Std.string(this1[0]) + "]";
}
tink.core._Ref.Ref_Impl_.to = function(v) {
	var ret = new Array(1);
	ret[0] = v;
	return ret;
}
tink.core._Signal = {}
tink.core._Signal.Signal_Impl_ = function() { }
tink.core._Signal.Signal_Impl_.__name__ = true;
tink.core._Signal.Signal_Impl_._new = function(f) {
	return f;
}
tink.core._Signal.Signal_Impl_.handle = function(this1,handler) {
	return this1(handler);
}
tink.core._Signal.Signal_Impl_.map = function(this1,f,gather) {
	if(gather == null) gather = true;
	var ret = function(cb) {
		return this1(function(result) {
			tink.core._Callback.Callback_Impl_.invoke(cb,f(result));
		});
	};
	return gather?tink.core._Signal.Signal_Impl_.gather(ret):ret;
}
tink.core._Signal.Signal_Impl_.flatMap = function(this1,f,gather) {
	if(gather == null) gather = true;
	var ret = function(cb) {
		return this1(function(result) {
			(f(result))(cb);
		});
	};
	return gather?tink.core._Signal.Signal_Impl_.gather(ret):ret;
}
tink.core._Signal.Signal_Impl_.filter = function(this1,f,gather) {
	if(gather == null) gather = true;
	var ret = function(cb) {
		return this1(function(result) {
			if(f(result)) tink.core._Callback.Callback_Impl_.invoke(cb,result);
		});
	};
	return gather?tink.core._Signal.Signal_Impl_.gather(ret):ret;
}
tink.core._Signal.Signal_Impl_.join = function(this1,other,gather) {
	if(gather == null) gather = true;
	var ret = function(cb) {
		return tink.core._Callback.CallbackLink_Impl_.fromMany([this1(cb),other(cb)]);
	};
	return gather?tink.core._Signal.Signal_Impl_.gather(ret):ret;
}
tink.core._Signal.Signal_Impl_.next = function(this1) {
	var ret = new tink.core.FutureTrigger();
	this1(tink.core._Callback.CallbackLink_Impl_.toCallback(this1($bind(ret,ret.trigger))));
	return ret.future;
}
tink.core._Signal.Signal_Impl_.noise = function(this1) {
	return tink.core._Signal.Signal_Impl_.map(this1,function(_) {
		return tink.core.Noise.Noise;
	});
}
tink.core._Signal.Signal_Impl_.gather = function(this1) {
	var ret = tink.core._Signal.Signal_Impl_.trigger();
	this1((function(_e) {
		return function(event) {
			return tink.core._Callback.CallbackList_Impl_.invoke(_e,event);
		};
	})(ret));
	return tink.core._Signal.SignalTrigger_Impl_.asSignal(ret);
}
tink.core._Signal.Signal_Impl_.trigger = function() {
	return [];
}
tink.core._Signal.Signal_Impl_.ofClassical = function(add,remove,gather) {
	if(gather == null) gather = true;
	var ret = function(cb) {
		var f = function(a) {
			tink.core._Callback.Callback_Impl_.invoke(cb,a);
		};
		add(f);
		return (function(f1,a1) {
			return function() {
				return f1(a1);
			};
		})(remove,f);
	};
	return gather?tink.core._Signal.Signal_Impl_.gather(ret):ret;
}
tink.core._Signal.SignalTrigger_Impl_ = function() { }
tink.core._Signal.SignalTrigger_Impl_.__name__ = true;
tink.core._Signal.SignalTrigger_Impl_._new = function() {
	return [];
}
tink.core._Signal.SignalTrigger_Impl_.trigger = function(this1,event) {
	tink.core._Callback.CallbackList_Impl_.invoke(this1,event);
}
tink.core._Signal.SignalTrigger_Impl_.getLength = function(this1) {
	return this1.length;
}
tink.core._Signal.SignalTrigger_Impl_.asSignal = function(this1) {
	return (function(_e) {
		return function(cb) {
			return tink.core._Callback.CallbackList_Impl_.add(_e,cb);
		};
	})(this1);
}
var tinx = {}
tinx.dom = {}
tinx.dom._Attributes = {}
tinx.dom._Attributes.Attributes_Impl_ = function() { }
tinx.dom._Attributes.Attributes_Impl_.__name__ = true;
tinx.dom._Attributes.Attributes_Impl_.has = function(this1,name,suchThat) {
	return suchThat == null?this1.getAttribute(name) != null:suchThat(this1.getAttribute(name) || "");
}
tinx.dom._Attributes.Attributes_Impl_.find = function(this1,name,suchThat) {
	return tinx.dom._Attributes.Attributes_Impl_.has(this1,name,suchThat)?tink.core.Outcome.Success(this1.getAttribute(name)):tink.core.Outcome.Failure("Attribute " + name + " not found on " + Std.string(this1) + (suchThat == null?"":" satisfying given criteria"));
}
tinx.dom._Attributes.Attributes_Impl_.get = function(this1,name) {
	return this1.getAttribute(name);
}
tinx.dom._Attributes.Attributes_Impl_.set = function(this1,name,value) {
	if(value == null) this1.removeAttribute(name); else this1.setAttribute(name,value);
	return value;
}
tinx.dom._Attributes.Attributes_Impl_.remove = function(this1,name) {
	this1.removeAttribute(name);
}
tinx.dom._ClassList = {}
tinx.dom._ClassList.ClassList_Impl_ = function() { }
tinx.dom._ClassList.ClassList_Impl_.__name__ = true;
tinx.dom._ClassList.ClassList_Impl_.toggle = function(this1,name) {
	return (function($this) {
		var $r;
		var list = (function($this) {
			var $r;
			var cl = this1.className;
			$r = cl == null || cl == ""?[]:cl.split(" ");
			return $r;
		}($this));
		$r = (function($this) {
			var $r;
			switch(list.length) {
			case 0:
				$r = (function($this) {
					var $r;
					this1.className = name;
					$r = true;
					return $r;
				}($this));
				break;
			default:
				$r = (function($this) {
					var $r;
					var has = (" " + (this1.className || "") + " ").indexOf(" " + name + " ") != -1;
					if(has) tinx.dom._ClassList.ClassList_Impl_.doRemove(this1,name); else tinx.dom._ClassList.ClassList_Impl_.doAdd(this1,name);
					$r = has;
					return $r;
				}($this));
			}
			return $r;
		}($this));
		return $r;
	}(this));
}
tinx.dom._ClassList.ClassList_Impl_.toArray = function(this1) {
	var cl = this1.className;
	return cl == null || cl == ""?[]:cl.split(" ");
}
tinx.dom._ClassList.ClassList_Impl_.hasAll = function(this1,classes) {
	return Lambda.foreach(classes,(function(_e) {
		return function(name) {
			return (" " + (_e.className || "") + " ").indexOf(" " + name + " ") != -1;
		};
	})(this1));
}
tinx.dom._ClassList.ClassList_Impl_.has = function(this1,name) {
	return (" " + (this1.className || "") + " ").indexOf(" " + name + " ") != -1;
}
tinx.dom._ClassList.ClassList_Impl_.doRemove = function(this1,name) {
	return this1.className = (" ^ " + this1.className + " ^ ").split(" " + name + " ").join(" ").split(" ^ ")[1];
}
tinx.dom._ClassList.ClassList_Impl_.doAdd = function(this1,name) {
	return this1.className = this1.className == null || this1.className == ""?name:this1.className + " " + name;
}
tinx.dom._ClassList.ClassList_Impl_.remove = function(this1,name) {
	return (" " + (this1.className || "") + " ").indexOf(" " + name + " ") != -1?tinx.dom._ClassList.ClassList_Impl_.doRemove(this1,name) != null:false;
}
tinx.dom._ClassList.ClassList_Impl_.add = function(this1,name) {
	return (" " + (this1.className || "") + " ").indexOf(" " + name + " ") != -1?false:tinx.dom._ClassList.ClassList_Impl_.doAdd(this1,name) != null;
}
tinx.dom._ClassList.ClassList_Impl_.set = function(this1,name,active) {
	if(active) tinx.dom._ClassList.ClassList_Impl_.add(this1,name); else tinx.dom._ClassList.ClassList_Impl_.remove(this1,name);
	return active;
}
tinx.dom._ElementOf = {}
tinx.dom._ElementOf.Nodeish_Impl_ = function() { }
tinx.dom._ElementOf.Nodeish_Impl_.__name__ = true;
tinx.dom._ElementOf.Nodeish_Impl_.ofString = function(s) {
	return js.Browser.document.createTextNode(s);
}
tinx.dom._ElementOf.Nodeish_Impl_.ofElement = function(x) {
	return x;
}
tinx.dom._Events = {}
tinx.dom._Events.Events_Impl_ = function() { }
tinx.dom._Events.Events_Impl_.__name__ = true;
tinx.dom._Events.Events_Impl_.event = function(this1,type) {
	return tinx.dom._Events.Events_Impl_.getSignal(this1,type,(function($this) {
		var $r;
		switch(type) {
		case "mouseenter":
			$r = function() {
				return tink.core._Signal.Signal_Impl_.filter(tinx.dom._Events.Events_Impl_.getSignal(this1,"mouseover"),function(e) {
					return e.fromElement == null || !this1.contains(e.fromElement);
				});
			};
			break;
		case "mouseleave":
			$r = function() {
				return tink.core._Signal.Signal_Impl_.filter(tinx.dom._Events.Events_Impl_.getSignal(this1,"mouseout"),function(e) {
					return e.toElement == null || !this1.contains(e.toElement);
				});
			};
			break;
		default:
			$r = null;
		}
		return $r;
	}(this)));
}
tinx.dom._Events.Events_Impl_.get_change = function(this1) {
	return tinx.dom._Events.Events_Impl_.event(this1,"change");
}
tinx.dom._Events.Events_Impl_.get_click = function(this1) {
	return tinx.dom._Events.Events_Impl_.event(this1,"click");
}
tinx.dom._Events.Events_Impl_.get_mouseup = function(this1) {
	return tinx.dom._Events.Events_Impl_.event(this1,"mouseup");
}
tinx.dom._Events.Events_Impl_.get_mousedown = function(this1) {
	return tinx.dom._Events.Events_Impl_.event(this1,"mousedown");
}
tinx.dom._Events.Events_Impl_.get_mouseleave = function(this1) {
	return tinx.dom._Events.Events_Impl_.event(this1,"mouseleave");
}
tinx.dom._Events.Events_Impl_.get_mouseenter = function(this1) {
	return tinx.dom._Events.Events_Impl_.event(this1,"mouseenter");
}
tinx.dom._Events.Events_Impl_.get_mousemove = function(this1) {
	return tinx.dom._Events.Events_Impl_.event(this1,"mousemove");
}
tinx.dom._Events.Events_Impl_.get_mouseover = function(this1) {
	return tinx.dom._Events.Events_Impl_.event(this1,"mouseover");
}
tinx.dom._Events.Events_Impl_.get_mouseout = function(this1) {
	return tinx.dom._Events.Events_Impl_.event(this1,"mouseout");
}
tinx.dom._Events.Events_Impl_.get_mousewheel = function(this1) {
	return tinx.dom._Events.Events_Impl_.event(this1,"mousewheel");
}
tinx.dom._Events.Events_Impl_.get_keyup = function(this1) {
	return tinx.dom._Events.Events_Impl_.event(this1,"keyup");
}
tinx.dom._Events.Events_Impl_.get_keydown = function(this1) {
	return tinx.dom._Events.Events_Impl_.event(this1,"keydown");
}
tinx.dom._Events.Events_Impl_.get_keypress = function(this1) {
	return tinx.dom._Events.Events_Impl_.event(this1,"keypress");
}
tinx.dom._Events.Events_Impl_.getSignal = function(this1,type,f) {
	var cache = this1.__c || (this1.__c = { });
	var s = cache[type];
	if(s == null) cache[type] = s = f == null?tink.core._Signal.Signal_Impl_.gather((function(f1,a1) {
		return function(a2) {
			return f1(a1,a2);
		};
	})((function(_e) {
		return function(type1,listener) {
			return tinx.dom._Events.Events_Impl_.addListener(_e,type1,listener);
		};
	})(this1),type)):f();
	return s;
}
tinx.dom._Events.Events_Impl_.stdAdd = function(target,type,f) {
	target.addEventListener(type,f,false);
	return (function(f1,a1,a2,a3) {
		return function() {
			return f1(a1,a2,a3);
		};
	})($bind(target,target.removeEventListener),type,f,false);
}
tinx.dom._Events.Events_Impl_.quirksAdd = function(target,type,f) {
	target.attachEvent("on" + type,f);
	return function() {
		target.detachEvent("on" + type,f);
	};
}
tinx.dom._Events.Events_Impl_.addListener = function(this1,type,listener) {
	var active = true;
	var remove = tinx.dom._Events.Events_Impl_.add(this1,type,listener);
	return function() {
		if(active && ((active = false) || true)) remove();
	};
}
function $iterator(o) { if( o instanceof Array ) return function() { return HxOverrides.iter(o); }; return typeof(o.iterator) == 'function' ? $bind(o,o.iterator) : o.iterator; };
var $_, $fid = 0;
function $bind(o,m) { if( m == null ) return null; if( m.__id__ == null ) m.__id__ = $fid++; var f; if( o.hx__closures__ == null ) o.hx__closures__ = {}; else f = o.hx__closures__[m.__id__]; if( f == null ) { f = function(){ return f.method.apply(f.scope, arguments); }; f.scope = o; f.method = m; o.hx__closures__[m.__id__] = f; } return f; };
if(Array.prototype.indexOf) HxOverrides.remove = function(a,o) {
	var i = a.indexOf(o);
	if(i == -1) return false;
	a.splice(i,1);
	return true;
};
Math.__name__ = ["Math"];
Math.NaN = Number.NaN;
Math.NEGATIVE_INFINITY = Number.NEGATIVE_INFINITY;
Math.POSITIVE_INFINITY = Number.POSITIVE_INFINITY;
Math.isFinite = function(i) {
	return isFinite(i);
};
Math.isNaN = function(i) {
	return isNaN(i);
};
String.prototype.__class__ = String;
String.__name__ = true;
Array.prototype.__class__ = Array;
Array.__name__ = true;
var Int = { __name__ : ["Int"]};
var Dynamic = { __name__ : ["Dynamic"]};
var Float = Number;
Float.__name__ = ["Float"];
var Bool = Boolean;
Bool.__ename__ = ["Bool"];
var Class = { __name__ : ["Class"]};
var Enum = { };
$dom.invalidated = [];
js.Browser.document = typeof window != "undefined" ? window.document : null;
Main.root = js.Browser.document.documentElement;
Main.dummy = $dom.tag("div");
Main.handlers = new haxe.ds.StringMap();
Main.muted = new haxe.ds.StringMap();
tink.core._Callback.Cell.pool = [];
tinx.dom._Events.Events_Impl_.add = document.addEventListener?tinx.dom._Events.Events_Impl_.stdAdd:tinx.dom._Events.Events_Impl_.quirksAdd;
Main.main();
})();
