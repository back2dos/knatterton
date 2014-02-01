(function () { "use strict";
var $estr = function() { return js.Boot.__string_rec(this,''); };
var tink = {}
tink.Lang = function() { }
tink.Lang.__name__ = true;
var Grid = function(viewport,container,cols,rows,nav) {
	this.viewport = viewport;
	this.container = container;
	this.cols = cols;
	this.rows = rows;
	this.nav = nav;
};
Grid.__name__ = true;
Grid.__interfaces__ = [tink.Lang];
Grid.genId = function(prefix) {
	return "" + prefix + "-" + ((function($this) {
		var $r;
		var __tink_output171 = [];
		{
			var _g = 0;
			while(_g < 4) {
				var i = _g++;
				__tink_output171.push(((function($this) {
					var $r;
					var __tink_output170 = [];
					{
						var _g1 = 0;
						while(_g1 < 4) {
							var i1 = _g1++;
							__tink_output170.push(Grid.chars.charAt(Std.random(Grid.chars.length)));
						}
					}
					$r = __tink_output170;
					return $r;
				}($this))).join(""));
			}
		}
		$r = __tink_output171;
		return $r;
	}(this))).join("-");
}
Grid.prototype = {
	get_empty: function() {
		return this.get_width() == 0;
	}
	,get_height: function() {
		return this.container.querySelectorAll("[data-row]").length;
	}
	,get_width: function() {
		return this.container.querySelectorAll("[data-row]:first-child [data-col]").length;
	}
	,get_col: function() {
		return this.getIndex("[data-row] [data-col].focused");
	}
	,get_row: function() {
		return this.getIndex("[data-row] [data-col].focused",function(e) {
			return $dom.path(e,{ max : 1})[0];
		});
	}
	,addCol: function(name) {
		var id = Grid.genId("col");
		var _g = 0, _g1 = this.container.querySelectorAll("[data-row]");
		while(_g < _g1.length) {
			var e = _g1[_g];
			++_g;
			e.appendChild(this.makeCanvas(id));
		}
		this.set(id,name);
	}
	,makeCanvas: function(id) {
		return $dom.add($dom.set($dom.set($dom.tag("div"),"class","canvas"),"data-col",id),$dom.set($dom.tag("div"),"class","zoom-layer"));
	}
	,addRow: function(name) {
		var id = Grid.genId("row");
		var row = $dom.set($dom.tag("div"),"data-row",id);
		this.set(id,name);
		if(this.container.firstElementChild != null) {
			var _g = 0, _g1 = this.container.firstElementChild.children;
			while(_g < _g1.length) {
				var c = _g1[_g];
				++_g;
				var c1 = c;
				$dom.add(row,this.makeCanvas(c1.getAttribute("data-col")));
			}
		}
		this.container.appendChild(row);
	}
	,navigate: function(row,col) {
		var this1 = this.viewport;
		this1.setAttribute("data-focus","canvas");
		"canvas";
		var _g = 0, _g1 = this.container.querySelectorAll(".canvas");
		while(_g < _g1.length) {
			var canvas = _g1[_g];
			++_g;
			var canvas1 = canvas;
			tinx.dom._ClassList.ClassList_Impl_.remove(canvas1,"focused");
		}
		var col1 = this.container.querySelector("[data-row]:nth-child(" + (row + 1) + ") [data-col]:nth-child(" + (col + 1) + ")"), row1 = this.container.querySelector("[data-row]:nth-child(" + (row + 1) + ")");
		col1.classList.add("focused");
		var rowName = this.get(row1.getAttribute("data-row")), colName = this.get(col1.getAttribute("data-col"));
		var status = (function($this) {
			var $r;
			var _g = new haxe.ds.StringMap();
			_g.set("[data-action=\"next row\"]",$this.get_row() < $this.get_height() - 1);
			_g.set("[data-action=\"prev row\"]",$this.get_row() > 0);
			_g.set("[data-action=\"next col\"]",$this.get_col() < $this.get_width() - 1);
			_g.set("[data-action=\"prev col\"]",$this.get_col() > 0);
			$r = _g;
			return $r;
		}(this));
		var __tink_tmp172 = status;
		var $it0 = __tink_tmp172.keys();
		while( $it0.hasNext() ) {
			var selector = $it0.next();
			var enabled = __tink_tmp172.get(selector);
			var _g1 = 0, _g2 = js.Browser.document.querySelectorAll(selector);
			while(_g1 < _g2.length) {
				var b = _g2[_g1];
				++_g1;
				var b1 = b;
				b1.disabled = !enabled;
			}
		}
		var _g1 = 0, _g2 = js.Browser.document.querySelectorAll("" + this.nav + " h2:first-of-type span");
		while(_g1 < _g2.length) {
			var e = _g2[_g1];
			++_g1;
			var e1 = e;
			e1.innerHTML = colName;
		}
		var _g1 = 0, _g2 = js.Browser.document.querySelectorAll("" + this.nav + " h2:last-of-type span");
		while(_g1 < _g2.length) {
			var e = _g2[_g1];
			++_g1;
			var e1 = e;
			e1.innerHTML = rowName;
		}
	}
	,navigateTo: function(canvas) {
		var col = $dom.siblings(canvas,{ back : true}).length, row = $dom.siblings($dom.path(canvas,{ max : 1})[0],{ back : true}).length;
		this.navigate(row,col);
	}
	,getIndex: function(s,get) {
		var e = this.container.querySelector(s);
		if(e != null && get != null) e = get(e);
		return e == null?null:$dom.siblings(e,{ back : true}).length;
	}
	,get: function(id) {
		return js.Browser.document.querySelector("li[data-id=" + id + "]").innerText;
	}
	,set: function(id,name) {
		var old = js.Browser.document.querySelector("li[data-id=" + id + "] div");
		if(old != null) old.innerHTML = name; else {
			var list = js.Browser.document.querySelector(StringTools.startsWith(id,"row")?this.rows:this.cols);
			list.insertBefore($dom.add($dom.set($dom.tag("li"),"data-id",id),$dom.add($dom.tag("div"),js.Browser.document.createTextNode(name))),list.lastElementChild);
		}
	}
	,__class__: Grid
}
var HxOverrides = function() { }
HxOverrides.__name__ = true;
HxOverrides.cca = function(s,index) {
	var x = s.charCodeAt(index);
	if(x != x) return undefined;
	return x;
}
HxOverrides.substr = function(s,pos,len) {
	if(pos != null && pos != 0 && len != null && len < 0) return "";
	if(len == null) len = s.length;
	if(pos < 0) {
		pos = s.length + pos;
		if(pos < 0) pos = 0;
	} else if(len < 0) len = s.length + len - pos;
	return s.substr(pos,len);
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
var js = {}
js.Browser = function() { }
js.Browser.__name__ = true;
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
$dom.remove = function(this1,n) {
	this1.removeChild(n);
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
$dom.get_innerHTML = function(this1) {
	return this1.innerHTML;
}
$dom.set_innerHTML = function(this1,param) {
	return (function($this) {
		var $r;
		this1.innerHTML = param;
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
var Main = function() {
};
Main.__name__ = true;
Main.__interfaces__ = [tink.Lang];
Main.colName = function() {
	return "Spalte " + (Main.grid.get_width() + 1);
}
Main.rowName = function() {
	return "Reihe " + (Main.grid.get_height() + 1);
}
Main.main = function() {
	Main.on("mousedown","#viewport[data-focus=canvas] div.canvas.focused > *",Main.resizeFragment);
	Main.on("mousedown","#viewport[data-focus=canvas] div.canvas.focused div.content:not([contenteditable])",Main.dragFragment);
	Main.on("dblclick","#viewport[data-focus=canvas] div.canvas.focused > .zoom-layer > div.text",Main.editText);
	Main.on("click","#viewport[data-focus=canvas] div.canvas.focused > .zoom-layer > div",function(e) {
		Main.toTop(e.b);
	});
	Main.on("dragenter dragover drop dragstart","body",function(e) {
		e.a.preventDefault();
	});
	Main.on("drop","#viewport[data-focus=canvas] .bg",function(e) {
		var m = e.a;
		var layer = js.Browser.document.querySelector(".canvas.focused .zoom-layer");
		var pos = _Matrix.Matrix_Impl_.transformPoint(_Matrix.Matrix_Impl_.invert(Main.getMatrix(layer)),{ a : e.a.pageX, b : e.a.pageY - 10});
		var _g = 0, _g1 = m.dataTransfer.files;
		while(_g < _g1.length) {
			var file = _g1[_g];
			++_g;
			var reader = [new FileReader()];
			reader[0].readAsDataURL(file);
			reader[0].addEventListener("loadend",(function(reader) {
				return function(_) {
					$dom.add(layer,$dom.add($dom.set($dom.set($dom.tag("div"),"class","img"),"style","top: " + pos.b + "px; left: " + pos.a + "px"),$dom.add($dom.set($dom.tag("div"),"class","content"),$dom.set($dom.tag("img"),"src",reader[0].result))));
				};
			})(reader));
		}
	});
	Main.on("dblclick","#viewport[data-focus=canvas] .bg",Main.newElement);
	Main.on("mousewheel","#viewport[data-focus=canvas]",Main.zoom);
	Main.on("mousedown","#viewport[data-focus=canvas] .bg",Main.dragCanvas);
	Main.on("dblclick","#viewport[data-focus=table] .canvas",function(e) {
		Main.clearHelper();
		Main.grid.navigateTo(e.b);
	});
	Main.on("click","[data-action=\"add first\"]",function(r) {
		Main.addFirst();
	});
	Main.on("click","[data-action=\"add row\"]",function(r) {
		Main.addRow();
	});
	Main.on("click","[data-action=\"add col\"]",function(r) {
		Main.addCol();
	});
	Main.on("click","[data-action=\"next row\"]",function(r) {
		Main.grid.navigate(Main.grid.get_row() + 1,Main.grid.get_col());
	});
	Main.on("click","[data-action=\"prev row\"]",function(r) {
		Main.grid.navigate(Main.grid.get_row() - 1,Main.grid.get_col());
	});
	Main.on("click","[data-action=\"next col\"]",function(r) {
		Main.grid.navigate(Main.grid.get_row(),Main.grid.get_col() + 1);
	});
	Main.on("click","[data-action=\"prev col\"]",function(r) {
		Main.grid.navigate(Main.grid.get_row(),Main.grid.get_col() - 1);
	});
	Main.on("click","[data-action=\"view table\"]",function(r) {
		Main.jumpToTable();
	});
}
Main.clearHelper = function() {
	var _g1 = 0, _g = Main.helperSheet.cssRules.length;
	while(_g1 < _g) {
		var i = _g1++;
		Main.helperSheet.deleteRule(0);
	}
}
Main.jumpToTable = function() {
	var top = Math.POSITIVE_INFINITY, bottom = Math.NEGATIVE_INFINITY, left = Math.POSITIVE_INFINITY, right = Math.NEGATIVE_INFINITY;
	Main.clearHelper();
	Main.helperSheet.addRule("#viewport .canvas .zoom-layer","-webkit-transform: none !important;");
	var _g = 0, _g1 = js.Browser.document.querySelectorAll(".zoom-layer>*");
	while(_g < _g1.length) {
		var e = _g1[_g];
		++_g;
		var e1 = e;
		var rect = e1.getBoundingClientRect();
		top = Math.min(top,rect.top);
		left = Math.min(left,rect.left);
		right = Math.max(right,rect.right);
		bottom = Math.max(bottom,rect.bottom);
	}
	var width = right - left, height = bottom - top, ratio = 200 / 150;
	Main.clearHelper();
	var m = _Matrix.Matrix_Impl_.concat((function($this) {
		var $r;
		var p = (function($this) {
			var $r;
			var p1 = { a : left, b : top};
			$r = { a : -p1.a, b : -p1.b};
			return $r;
		}($this));
		$r = { a : 1, b : 0, c : 0, d : 1, tx : p.a, ty : p.b};
		return $r;
	}(this)),(function($this) {
		var $r;
		var factor = Math.min(200 / width,150 / height);
		$r = { a : factor, b : 0, c : 0, d : factor, tx : 0, ty : 0};
		return $r;
	}(this)));
	Main.helperSheet.addRule("#viewport .canvas .zoom-layer","-webkit-transform: " + _Matrix.Matrix_Impl_.toString(m) + " !important;");
	$dom.set(Main.viewport,"data-focus","table");
}
Main.addFirst = function() {
	var row = Main.rowName(), col = Main.colName();
	Main.grid.addRow(row);
	Main.grid.addCol(col);
	if(Main.viewport.getAttribute("data-focus") == "canvas") Main.grid.navigate(0,0);
}
Main.addRow = function() {
	if(Main.grid.get_empty()) Main.addFirst(); else {
		Main.grid.addRow(Main.rowName());
		if(Main.viewport.getAttribute("data-focus") == "canvas") Main.grid.navigate(Main.grid.get_col(),Main.grid.get_row());
	}
}
Main.addCol = function() {
	if(Main.grid.get_empty()) Main.addFirst(); else {
		Main.grid.addCol(Main.colName());
		if(Main.viewport.getAttribute("data-focus") == "canvas") Main.grid.navigate(Main.grid.get_col(),Main.grid.get_row());
	}
}
Main.newElement = function(e) {
	var layer = js.Browser.document.querySelector(".canvas.focused .zoom-layer"), fresh = js.Browser.document.querySelector("div.fresh>.text").cloneNode(true);
	var m = Main.getMatrix(layer);
	var pos = _Matrix.Matrix_Impl_.transformPoint(_Matrix.Matrix_Impl_.invert(m),{ a : e.a.pageX, b : e.a.pageY - 10});
	$dom.add(layer,fresh);
	fresh.style.left = pos.a - 200 + "px";
	fresh.style.top = pos.b - 50 + "px";
	fresh.style.transition = "-webkit-transform .2s cubic-bezier(0.175, 0.885, 0.32, 1.275)";
	fresh.style.webkitTransform = "scale(0, 0)";
	($_=haxe.Timer.delay(function() {
		fresh.style.webkitTransform = "scale(1, 1)";
		Main.doEdit(fresh);
		($_=haxe.Timer.delay(function() {
			fresh.style.transition = null;
			fresh.style.webkitTransform = null;
		},300),$bind($_,$_.stop));
	},0),$bind($_,$_.stop));
}
Main.getMatrix = function(elt) {
	return (function($this) {
		var $r;
		var _g = Std.string(elt.style.webkitTransform).split("matrix(").pop().split(",").map(StringTools.trim).map(Std.parseFloat);
		$r = (function($this) {
			var $r;
			switch(_g.length) {
			case 6:
				$r = { a : _g[0], b : _g[1], c : _g[2], d : _g[3], tx : _g[4], ty : _g[5]};
				break;
			default:
				$r = _Matrix.Matrix_Impl_.IDENTITY;
			}
			return $r;
		}($this));
		return $r;
	}(this));
}
Main.setMatrix = function(elt,m) {
	elt.style.webkitTransform = _Matrix.Matrix_Impl_.toString(m);
}
Main.zoom = function(e) {
	var w = e.a;
	var _g = 0, _g1 = js.Browser.document.querySelectorAll(".canvas.focused .zoom-layer");
	while(_g < _g1.length) {
		var elt = _g1[_g];
		++_g;
		var elt1 = elt, fac = Math.pow(1.001,w.wheelDelta);
		var m = Main.getMatrix(elt1);
		var vCenter = _Matrix.Matrix_Impl_.transformPoint(_Matrix.Matrix_Impl_.invert(m),{ a : w.clientX, b : w.clientY});
		Main.setMatrix(elt1,_Matrix.Matrix_Impl_.concat(_Matrix.Matrix_Impl_.concat(_Matrix.Matrix_Impl_.concat((function($this) {
			var $r;
			var p = { a : -vCenter.a, b : -vCenter.b};
			$r = { a : 1, b : 0, c : 0, d : 1, tx : p.a, ty : p.b};
			return $r;
		}(this)),{ a : fac, b : 0, c : 0, d : fac, tx : 0, ty : 0}),{ a : 1, b : 0, c : 0, d : 1, tx : vCenter.a, ty : vCenter.b}),m));
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
Main.doEdit = function(target) {
	Main.toTop(target);
	target = target.firstElementChild;
	var this1 = target;
	this1.setAttribute("contenteditable","true");
	"true";
	(tink.core._Signal.Signal_Impl_.next(tinx.dom._Events.Events_Impl_.event(target,"blur")))((function($this) {
		var $r;
		var f = function() {
			var this1 = target;
			this1.removeAttribute("contenteditable");
			null;
			if(target.innerHTML == "") $dom.remove($dom.path(target,{ max : 1})[0],target);
		};
		$r = function(r) {
			f();
		};
		return $r;
	}(this)));
	var elt = target;
	elt.focus();
}
Main.editText = function(e) {
	Main.doEdit(e.b);
}
Main.dragCanvas = function(e) {
	var _g = 0, _g1 = js.Browser.document.querySelectorAll(".canvas.focused .zoom-layer");
	while(_g < _g1.length) {
		var elt = _g1[_g];
		++_g;
		var target = [elt];
		var m0 = [Main.getMatrix(target[0])];
		var m = [_Matrix.Matrix_Impl_.invert(m0[0])];
		var p = [_Matrix.Matrix_Impl_.transformPoint(m[0],{ a : e.a.pageX, b : e.a.pageY})];
		(tink.core._Signal.Signal_Impl_.next(tinx.dom._Events.Events_Impl_.event(Main.root,"mouseup")))(tink.core._Callback.CallbackLink_Impl_.toCallback((tinx.dom._Events.Events_Impl_.event(Main.root,"mousemove"))((function(p,m,m0,target) {
			return function(e1) {
				var nu = _Matrix.Matrix_Impl_.concat(m0[0],(function($this) {
					var $r;
					var p1 = (function($this) {
						var $r;
						var a = _Matrix.Matrix_Impl_.transformPoint(m[0],{ a : e1.pageX, b : e1.pageY});
						$r = { a : a.a - p[0].a, b : a.b - p[0].b};
						return $r;
					}($this));
					$r = { a : 1, b : 0, c : 0, d : 1, tx : p1.a, ty : p1.b};
					return $r;
				}(this)));
				Main.setMatrix(target[0],nu);
			};
		})(p,m,m0,target))));
	}
}
Main.dragFragment = function(e) {
	var target = $dom.path(e.b,{ max : 1})[0];
	var m = _Matrix.Matrix_Impl_.invert(Main.getMatrix($dom.path(target,{ max : 1})[0]));
	var p = _Matrix.Matrix_Impl_.transformPoint(m,{ a : e.a.pageX, b : e.a.pageY});
	var p0 = { a : (function($this) {
		var $r;
		var ___val = Std.parseInt(target.style.left);
		$r = ___val == null?0:___val;
		return $r;
	}(this)), b : (function($this) {
		var $r;
		var ___val = Std.parseInt(target.style.top);
		$r = ___val == null?0:___val;
		return $r;
	}(this))};
	var moved = false;
	(tink.core._Signal.Signal_Impl_.next(tinx.dom._Events.Events_Impl_.event(Main.root,"mouseup")))(tink.core._Callback.CallbackLink_Impl_.toCallback((tinx.dom._Events.Events_Impl_.event(Main.root,"mousemove"))(function(e1) {
		if(!moved) {
			Main.toTop(target);
			moved = true;
		}
		var nu = (function($this) {
			var $r;
			var a = (function($this) {
				var $r;
				var b = _Matrix.Matrix_Impl_.transformPoint(m,{ a : e1.pageX, b : e1.pageY});
				$r = { a : p0.a + b.a, b : p0.b + b.b};
				return $r;
			}($this));
			$r = { a : a.a - p.a, b : a.b - p.b};
			return $r;
		}(this));
		target.style.left = nu.a + "px";
		target.style.top = nu.b + "px";
	})));
	(tink.core._Signal.Signal_Impl_.next(tinx.dom._Events.Events_Impl_.event(Main.root,"mouseup")))(function(m1) {
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
	var _g = 0, _g1 = event.split(" ");
	while(_g < _g1.length) {
		var event1 = _g1[_g];
		++_g;
		if(!Main.handlers.exists(event1)) {
			var v = [];
			Main.handlers.set(event1,v);
			v;
			js.Browser.document.addEventListener(event1,Main.handleEvent,true);
		}
		Main.handlers.get(event1).push({ a : selector, b : handler});
	}
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
var IMap = function() { }
IMap.__name__ = true;
var _Matrix = {}
_Matrix.Matrix_Impl_ = function() { }
_Matrix.Matrix_Impl_.__name__ = true;
_Matrix.Matrix_Impl_.get_a = function(this1) {
	return this1.a;
}
_Matrix.Matrix_Impl_.get_b = function(this1) {
	return this1.b;
}
_Matrix.Matrix_Impl_.get_c = function(this1) {
	return this1.c;
}
_Matrix.Matrix_Impl_.get_d = function(this1) {
	return this1.d;
}
_Matrix.Matrix_Impl_.get_tx = function(this1) {
	return this1.tx;
}
_Matrix.Matrix_Impl_.get_ty = function(this1) {
	return this1.ty;
}
_Matrix.Matrix_Impl_._new = function(a,b,c,d,tx,ty) {
	return { a : a, b : b, c : c, d : d, tx : tx, ty : ty};
}
_Matrix.Matrix_Impl_.invert = function(m) {
	var det = m.a * m.d - m.c * m.b;
	var a = m.d / det, b = -m.b / det, c = -m.c / det, d = m.a / det;
	return { a : a, b : b, c : c, d : d, tx : -(a * m.tx + c * m.ty), ty : -(b * m.tx + d * m.ty)};
}
_Matrix.Matrix_Impl_.transformPoint = function(m,p) {
	return { a : m.a * p.a + m.c * p.b + m.tx, b : m.b * p.a + m.d * p.b + m.ty};
}
_Matrix.Matrix_Impl_.concat = function(m,n) {
	return { a : n.a * m.a + n.c * m.b, b : n.b * m.a + n.d * m.b, c : n.a * m.c + n.c * m.d, d : n.b * m.c + n.d * m.d, tx : n.a * m.tx + n.c * m.ty + n.tx, ty : n.b * m.tx + n.d * m.ty + n.ty};
}
_Matrix.Matrix_Impl_.toString = function(this1) {
	return "matrix(" + this1.a + ", " + this1.b + ", " + this1.c + ", " + this1.d + ", " + this1.tx + ", " + this1.ty + ")";
}
_Matrix.Matrix_Impl_.rotate = function(angle) {
	return { a : Math.cos(angle), b : -Math.sin(angle), c : Math.sin(angle), d : Math.cos(angle), tx : 0, ty : 0};
}
_Matrix.Matrix_Impl_.scale = function(factor) {
	return { a : factor, b : 0, c : 0, d : factor, tx : 0, ty : 0};
}
_Matrix.Matrix_Impl_.move = function(p) {
	return { a : 1, b : 0, c : 0, d : 1, tx : p.a, ty : p.b};
}
var _Point = {}
_Point.Point_Impl_ = function() { }
_Point.Point_Impl_.__name__ = true;
_Point.Point_Impl_.get_x = function(this1) {
	return this1.a;
}
_Point.Point_Impl_.get_y = function(this1) {
	return this1.b;
}
_Point.Point_Impl_._new = function(x,y) {
	return { a : x, b : y};
}
_Point.Point_Impl_.toString = function(this1) {
	return "(" + this1.a + ", " + this1.b + ")";
}
_Point.Point_Impl_.add = function(a,b) {
	return { a : a.a + b.a, b : a.b + b.b};
}
_Point.Point_Impl_.subtract = function(a,b) {
	return { a : a.a - b.a, b : a.b - b.b};
}
_Point.Point_Impl_.invert = function(p) {
	return { a : -p.a, b : -p.b};
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
Std.random = function(x) {
	return x <= 0?0:Math.floor(Math.random() * x);
}
var StringTools = function() { }
StringTools.__name__ = true;
StringTools.startsWith = function(s,start) {
	return s.length >= start.length && HxOverrides.substr(s,0,start.length) == start;
}
StringTools.isSpace = function(s,pos) {
	var c = HxOverrides.cca(s,pos);
	return c > 8 && c < 14 || c == 32;
}
StringTools.ltrim = function(s) {
	var l = s.length;
	var r = 0;
	while(r < l && StringTools.isSpace(s,r)) r++;
	if(r > 0) return HxOverrides.substr(s,r,l - r); else return s;
}
StringTools.rtrim = function(s) {
	var l = s.length;
	var r = 0;
	while(r < l && StringTools.isSpace(s,l - r - 1)) r++;
	if(r > 0) return HxOverrides.substr(s,0,l - r); else return s;
}
StringTools.trim = function(s) {
	return StringTools.ltrim(StringTools.rtrim(s));
}
var ValueType = { __ename__ : true, __constructs__ : ["TNull","TInt","TFloat","TBool","TObject","TFunction","TClass","TEnum","TUnknown"] }
ValueType.TNull = ["TNull",0];
ValueType.TNull.toString = $estr;
ValueType.TNull.__enum__ = ValueType;
ValueType.TInt = ["TInt",1];
ValueType.TInt.toString = $estr;
ValueType.TInt.__enum__ = ValueType;
ValueType.TFloat = ["TFloat",2];
ValueType.TFloat.toString = $estr;
ValueType.TFloat.__enum__ = ValueType;
ValueType.TBool = ["TBool",3];
ValueType.TBool.toString = $estr;
ValueType.TBool.__enum__ = ValueType;
ValueType.TObject = ["TObject",4];
ValueType.TObject.toString = $estr;
ValueType.TObject.__enum__ = ValueType;
ValueType.TFunction = ["TFunction",5];
ValueType.TFunction.toString = $estr;
ValueType.TFunction.__enum__ = ValueType;
ValueType.TClass = function(c) { var $x = ["TClass",6,c]; $x.__enum__ = ValueType; $x.toString = $estr; return $x; }
ValueType.TEnum = function(e) { var $x = ["TEnum",7,e]; $x.__enum__ = ValueType; $x.toString = $estr; return $x; }
ValueType.TUnknown = ["TUnknown",8];
ValueType.TUnknown.toString = $estr;
ValueType.TUnknown.__enum__ = ValueType;
var haxe = {}
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
haxe.ds = {}
haxe.ds.Option = { __ename__ : true, __constructs__ : ["Some","None"] }
haxe.ds.Option.Some = function(v) { var $x = ["Some",0,v]; $x.__enum__ = haxe.ds.Option; $x.toString = $estr; return $x; }
haxe.ds.Option.None = ["None",1];
haxe.ds.Option.None.toString = $estr;
haxe.ds.Option.None.__enum__ = haxe.ds.Option;
haxe.ds.StringMap = function() {
	this.h = { };
};
haxe.ds.StringMap.__name__ = true;
haxe.ds.StringMap.__interfaces__ = [IMap];
haxe.ds.StringMap.prototype = {
	keys: function() {
		var a = [];
		for( var key in this.h ) {
		if(this.h.hasOwnProperty(key)) a.push(key.substr(1));
		}
		return HxOverrides.iter(a);
	}
	,exists: function(key) {
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
tink.macro = {}
tink.macro.Bouncer = function() { }
tink.macro.Bouncer.__name__ = true;
tink.macro.Bouncer.makeOuter = function(a) {
	return null;
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
Grid.chars = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
js.Browser.document = typeof window != "undefined" ? window.document : null;
$dom.invalidated = [];
Main.container = js.Browser.document.getElementById("container");
Main.viewport = js.Browser.document.getElementById("viewport");
Main.stateStore = js.Browser.document.getElementById("table-data");
Main.grid = new Grid(js.Browser.document.getElementById("viewport"),js.Browser.document.getElementById("container"),"#cols","#rows",".nav");
Main.AUTO_NAME = true;
Main.helperSheet = js.Browser.document.getElementById("helper-sheet").sheet;
Main.root = js.Browser.document.documentElement;
Main.dummy = $dom.tag("div");
Main.handlers = new haxe.ds.StringMap();
Main.muted = new haxe.ds.StringMap();
_Matrix.Matrix_Impl_.IDENTITY = { a : 1, b : 0, c : 0, d : 1, tx : 0, ty : 0};
tink.core._Callback.Cell.pool = [];
tinx.dom._Events.Events_Impl_.add = document.addEventListener?tinx.dom._Events.Events_Impl_.stdAdd:tinx.dom._Events.Events_Impl_.quirksAdd;
Main.main();
})();
