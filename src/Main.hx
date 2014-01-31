package ;

import js.Browser.document;
import js.html.*;
import tinx.dom.*;

using tink.CoreApi;

typedef EventAt = Pair<UIEvent, Element>;

class Main implements tink.Lang {
	
	static function main() {
		on('mousedown', 'div.canvas.focused > *', resizeFragment);
		on('mousedown', 'div.canvas.focused div.content:not([contenteditable])', dragFragment);
		on('click', 'div.canvas.focused > div.text', editText);
		on('mousedown', '#viewport[data-focus=canvas] .bg', newElement);		
		// on('mousewheel', '#viewport[data-focus=canvas]', zoom);		
	}
	static var root:Element = document.documentElement;
	static function newElement(e:EventAt) {		
		var layer:Element = cast document.querySelector('.canvas.focused'),
			fresh:Element = null,
			x = e.a.pageX,
			y = e.a.pageY,
			width = 0;
		
		root.on.mouseup.next().handle() => 
			root.on.mousemove.handle(@do(m) {
				if (fresh == null) {
					// toTop(target);
					fresh = cast document.querySelector('div.fresh>.text').cloneNode(true);
					layer.add(fresh);
					fresh.style.left = x+'px';
					fresh.style.top = y+'px';
				}
				width = m.pageX - x;
				if (width < 0)
					width *= -1;
					
				if (width < minWidth(0)) 
					fresh.style.opacity = '0';
				else {
					fresh.style.removeProperty('opacity');
					fresh.style.width = width + 'px';
					fresh.style.left = (m.pageX < x ? m.pageX : x) + 'px';
				}
			});	
			
			root.on.mouseup.next().handle() => @do(m) if (fresh != null) {
				skipClick();
				if (fresh.style.opacity == '0')
					untyped layer.removeChild(fresh);
			}
	}
	
	static function zoom(e:EventAt) {
		var w:WheelEvent = cast e.a;
		for (elt in document.querySelectorAll('.canvas.focused')) {
			var elt:js.html.Element = cast elt;
			var style = elt.style;
			
			var zoom = Std.parseFloat(untyped style.webkitTransform.split('scale(')[1]),
				origin = 
					switch Std.string(untyped style.webkitTransformOrigin).split('px ').map(Std.parseInt) {
						case [x, y] if (x != null && y != null): { x: x, y: y };
						default: { x: 0, y: 0 };
					}
					
			// trace(origin);		
			if (Math.isNaN(zoom)) zoom = 1;
			var fac = Math.pow(1.001, w.wheelDelta);
			zoom *= fac;
			// trace(untyped style.webkitTransformOrigin);
			// trace(fac);
			// trace(origin.x);
			untyped style.webkitTransformOrigin = '${w.clientX}px ${w.clientY}px';
			untyped style.webkitTransform = 'scale($zoom, $zoom)';			
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
		
	static function editText(e:EventAt) {
		toTop(e.b);
		var target:Element = untyped e.b.firstElementChild;
		target.attr['contenteditable'] = 'true';
		
		target.on['blur'].next().handle() => @do {
			target.attr['contenteditable'] = null;
		}
			
		var elt:js.html.Element = target;
		elt.focus();
	}
	static var dummy = ElementOf.tag('div');
	static function dragFragment(e:EventAt) {
		var target = e.b.parent;
		trace(e.a);
		var x = e.a.pageX,
			y = e.a.pageY;
			
		var x0 = Std.parseInt(target.style.left) | if (null) 0,
			y0 = Std.parseInt(target.style.top) | if (null) 0;
		
		var moved = false;
		root.on.mouseup.next().handle() => 
			root.on.mousemove.handle(function (m) {
				trace(m);
				if (!moved) {
					toTop(target);
					moved = true;
				}
				target.style.left = (x0 + m.pageX - x)+'px';
				target.style.top = (y0 + m.pageY - y)+'px';
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
	static function on(event:String, selector:String, handler:Callback<EventAt>) {
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