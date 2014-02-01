package ;

import js.Browser.document;
import js.html.UIEvent;
import js.html.WheelEvent;
import tinx.dom.*;
import Math.*;

using tink.CoreApi;

typedef EventAt = Pair<UIEvent, Element>;

class Main implements tink.Lang {
	static var container = document.getElementById('container');
	static var viewport:Element = document.getElementById('viewport');
	static var stateStore = document.getElementById('table-data');
	static var grid = new Grid(
		document.getElementById('viewport'),
		document.getElementById('container'),
		'#cols',
		'#rows',
		'.nav'
	);
	
	static inline var AUTO_NAME = true;
	
	static function colName()
		return
			if (AUTO_NAME) 'Spalte ${grid.width+1}';
			else js.Browser.window.prompt('Spalte');
			
	static function rowName()
		return
			if (AUTO_NAME) 'Reihe ${grid.height+1}';
			else js.Browser.window.prompt('Reihe');	
	
	static function main() {
		on('mousedown', '#viewport[data-focus=canvas] div.canvas.focused > *', resizeFragment);
		on('mousedown', '#viewport[data-focus=canvas] div.canvas.focused div.content:not([contenteditable])', dragFragment);
		on('dblclick', '#viewport[data-focus=canvas] div.canvas.focused > .zoom-layer > div.text', editText);		
		on('click', '#viewport[data-focus=canvas] div.canvas.focused > .zoom-layer > div', @do(e) toTop(e.b));		
		on('dragenter dragover drop dragstart', 'body', function (e:EventAt) {
			e.a.preventDefault();
		});

		on('drop', '#viewport[data-focus=canvas] .bg', function (e:EventAt) {
			var m:js.html.MouseEvent = cast e.a;
			var layer:Element = cast document.querySelector('.canvas.focused .zoom-layer');
			
			var pos = !getMatrix(layer) * new Point(e.a.pageX, e.a.pageY - 10);
			// layer.add(fresh);
			
			// fresh.style.left = (pos.x - 200) +'px';
			// fresh.style.top = (pos.y - 50) +'px';			
			for (file in m.dataTransfer.files) {
				var reader = new js.html.FileReader();
				reader.readAsDataURL(file);
				reader.addEventListener('loadend', @do(_) {
					layer.add() =>
						ElementOf.tag('div').set('class', 'img').set('style', 'top: ${pos.y}px; left: ${pos.x}px').add(
							ElementOf.tag('div').set('class', 'content').add(
								ElementOf.tag('img').set('src', reader.result)
							)
						);
				});
			}
		});

		on('dblclick', '#viewport[data-focus=canvas] .bg', newElement);		
		
		on('mousewheel', '#viewport[data-focus=canvas]', zoom);	
		on('mousedown', '#viewport[data-focus=canvas] .bg', dragCanvas);
		
		on('dblclick', '#viewport[data-focus=table] .canvas', @do(e) {
			clearHelper();
			grid.navigateTo(e.b);
		});
		
		on('click', '[data-action="add first"]', addFirst);
		on('click', '[data-action="add row"]', addRow);
		on('click', '[data-action="add col"]', addCol);
		
		on('click', '[data-action="next row"]', @do grid.navigate(grid.row + 1, grid.col));
		on('click', '[data-action="prev row"]', @do grid.navigate(grid.row - 1, grid.col));
		on('click', '[data-action="next col"]', @do grid.navigate(grid.row, grid.col + 1));
		on('click', '[data-action="prev col"]', @do grid.navigate(grid.row, grid.col - 1));
		
		on('click', '[data-action="view table"]', jumpToTable);

	}	
	static var helperSheet:js.html.CSSStyleSheet = untyped document.getElementById('helper-sheet').sheet;
	
	static function clearHelper() {
		for (i in 0...helperSheet.cssRules.length)
			helperSheet.deleteRule(0);		
	}
	static function jumpToTable() {
		
		var top = Math.POSITIVE_INFINITY,
			bottom = Math.NEGATIVE_INFINITY,
			left = Math.POSITIVE_INFINITY,
			right = Math.NEGATIVE_INFINITY;
		
		clearHelper();
			
		helperSheet.addRule('#viewport .canvas .zoom-layer', '-webkit-transform: none !important;');
		
		for (e in document.querySelectorAll('.zoom-layer>*')) {
			var e:js.html.Element = cast e;
			var rect = e.getBoundingClientRect();
			
			top = min(top, rect.top);
			left = min(left, rect.left);
			right = max(right, rect.right);
			bottom = max(bottom, rect.bottom);
		}
		
		var width = right - left,
			height = bottom - top,
			ratio = 200 / 150;
		
		clearHelper();
		// @in(1) @do {
			var m = Matrix.move(-new Point(left, top)) * Matrix.scale(min(200 / width, 150 / height));
			helperSheet.addRule('#viewport .canvas .zoom-layer', '-webkit-transform: ${m.toString()} !important;');
			viewport.set('data-focus', 'table');			
		// }
	}
	
	static function addFirst() {
		var row = rowName(),
			col = colName();
		
		grid.addRow(row);
		grid.addCol(col);
		if (viewport.attr['data-focus'] == 'canvas')
			grid.navigate(0, 0);
	}
	
	static function addRow() 
		if (grid.empty) 
			addFirst();
		else {
			grid.addRow(rowName());
			if (viewport.attr['data-focus'] == 'canvas')
				grid.navigate(grid.col, grid.row);
		}
		
	static function addCol() 
		if (grid.empty) 
			addFirst();
		else {
			grid.addCol(colName());
			if (viewport.attr['data-focus'] == 'canvas')
				grid.navigate(grid.col, grid.row);
		}
	
	static var root:Element = document.documentElement;
	static function newElement(e:EventAt) {		
		var layer:Element = cast document.querySelector('.canvas.focused .zoom-layer'),
			fresh:Element = cast document.querySelector('div.fresh>.text').cloneNode(true);
			
		var m = getMatrix(layer);
		var pos = !m * new Point(e.a.pageX, e.a.pageY - 10);
		layer.add(fresh);
		
		fresh.style.left = (pos.x - 200) +'px';
		fresh.style.top = (pos.y - 50) +'px';
		
		fresh.style.transition = "-webkit-transform .2s cubic-bezier(0.175, 0.885, 0.32, 1.275)";
		untyped fresh.style.webkitTransform = 'scale(0, 0)';
		@in(0) @do {
			untyped fresh.style.webkitTransform = 'scale(1, 1)';
			doEdit(fresh);
			@in(.3) @do {
				fresh.style.transition = null;
				untyped fresh.style.webkitTransform = null;
			}
		}
	}
	
	static function getMatrix(elt:js.html.Element)
		return
			switch Std.string(untyped elt.style.webkitTransform).split('matrix(').pop().split(',').map(StringTools.trim).map(Std.parseFloat) {
				case [a, b, c, d, tx, ty]: new Matrix(a, b, c, d, tx, ty);
				default: Matrix.IDENTITY;
			}
			
	static function setMatrix(elt:js.html.Element, m:Matrix)
		untyped elt.style.webkitTransform = m.toString();
		
	static function zoom(e:EventAt) {
		var w:WheelEvent = cast e.a;
		
		for (elt in document.querySelectorAll('.canvas.focused .zoom-layer')) {
			
			var elt:js.html.Element = cast elt,
				fac = Math.pow(1.001, w.wheelDelta);
				
			var m = getMatrix(elt);
			var vCenter = !m * new Point(w.clientX, w.clientY);
			
			setMatrix(elt, Matrix.move(-vCenter) * Matrix.scale(fac) * Matrix.move(vCenter) * m);
		}
	}
	
	static function minWidth(w)
		return 
			if (w < 100) 100;
			else w;
	
	static function resizeFragment(e:EventAt) {
		var target = e.b,
			x = e.a.pageX;
		if (target != e.a.srcElement) return;
		var x0 = Std.parseInt(target.style.left) | if (null) 0,	
			w0 = Std.parseInt(target.style.width) | if (null) 0;
			
		var left = e.a.layerX < w0 / 2,
			moved = false;
		
		root.on.mouseup.next().handle() => 
			root.on.mousemove.handle(@do(m) {
				if (!moved) {
					toTop(target);
					moved = true;
				}
				
				target.style.width = minWidth(
					if (left) {
						target.style.left = (x0 + m.pageX - x)+'px';
						w0 - m.pageX + x;
					}
					else w0 + m.pageX - x
				) + 'px';
				// target.style.top = (y0 + m.pageY - y)+'px';
			});	
			
		root.on.mouseup.next().handle() => @do(m) if (moved) skipClick();

		// trace([e.a.layerX, e.a.layerY, x0, y0, w0, h0]);
		// trace([top, left]);
	}
	
	static function toTop(e:Element) 
		e.parent.add(e);
	
	static function doEdit(target:Element) {
		toTop(target);
		target = untyped target.firstElementChild;
		target.attr['contenteditable'] = 'true';
		
		target.on['blur'].next().handle() => @do {
			target.attr['contenteditable'] = null;
			if (target.innerHTML == '') target.parent.remove(target);
		}
			
		var elt:js.html.Element = target;
		elt.focus();		
	}
	
	static function editText(e:EventAt) 
		doEdit(e.b);
	
	static var dummy = ElementOf.tag('div');
	
	static function dragCanvas(e:EventAt) {
		
		for (elt in document.querySelectorAll('.canvas.focused .zoom-layer')) {
			var target:Element = cast elt;
			var m0 = getMatrix(target);
			var m = !m0;			
			var p = m * new Point(e.a.pageX, e.a.pageY);
			
			root.on.mouseup.next().handle() => 
				root.on.mousemove.handle(function (e) {
					var nu = m0 * Matrix.move(m * new Point(e.pageX, e.pageY)  - p);
					setMatrix(target, nu);
					// target.style.left = nu.x + 'px';
					// target.style.top = nu.y + 'px';
				});
				
			// root.on.mouseup.next().handle() => @do(m) if (moved) skipClick();		
			
			// var elt:js.html.Element = cast elt,
			// 	fac = Math.pow(1.001, w.wheelDelta);
				
			// var m = getMatrix(elt);
			// var vCenter = !m * new Point(w.clientX, w.clientY);
			
			// setMatrix(elt, Matrix.move(-vCenter) * Matrix.scale(fac) * Matrix.move(vCenter) * m);
		}					
	}
		
	static function dragFragment(e:EventAt) {
		// js.Lib.alert('foo');
		var target = e.b.parent;
		var m = !getMatrix(target.parent);
			
		var p = m * new Point(e.a.pageX, e.a.pageY);
		var p0 = new Point(
			Std.parseInt(target.style.left) | if (null) 0,
			Std.parseInt(target.style.top) | if (null) 0
		);
		
		var moved = false;
		root.on.mouseup.next().handle() => 
			root.on.mousemove.handle(function (e) {
				if (!moved) {
					toTop(target);
					moved = true;
				}
				// js.Lib.alert('move!');
				var nu = p0 + (m * new Point(e.pageX, e.pageY)) - p;
				target.style.left = nu.x + 'px';
				target.style.top = nu.y + 'px';
			});
			
		root.on.mouseup.next().handle() => @do(m) if (moved) skipClick();
	}
	static function skipClick() {
		muted['click'] = true;
		@in(.1) @do {
			muted['click'] = false;
		}
	}
	
	static var handlers = new Map<String, Array<Pair<String, Callback<EventAt>>>>();
	static var muted = new Map();
	
	static function on(event:String, selector:String, handler:Callback<EventAt>)
		for (event in event.split(' ')) {
			if (!handlers.exists(event)) {
				handlers[event] = [];
				document.addEventListener(event, handleEvent, true);
			}
			handlers[event].push(new Pair(selector, handler));		
		}
	
	static function handleEvent(e:UIEvent) {
		if (muted[e.type]) return;
		var elt:Element = cast e.srcElement,
			handlers = handlers[e.type];

		while (elt != null) {
			for (h in handlers)
				if (untyped elt.webkitMatchesSelector(h.a)) h.b.invoke(new Pair(e, elt));
			// elt = elt.parentElement;
			elt = elt.parent;
		}
	}
}