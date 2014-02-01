package ;

import tinx.dom.*;
import js.Browser.document;

using StringTools;

class Grid implements tink.Lang {
	var viewport:Element = _;
	var container:js.html.Element = _;
	// var stateStore:js.html.Element = _;
	var cols:String = _;
	var rows:String = _;
	var nav:String = _;
	
	function set(id:String, name) {
		var old = document.querySelector('li[data-id=$id] div');
		if (old != null)
			old.innerHTML = name;
		else {
			var list = document.querySelector(id.startsWith('row') ? rows : cols);
			list.insertBefore(ElementOf.tag('li').set('data-id', id).add(ElementOf.tag('div').add(name)), list.lastElementChild);
		}
	}
	function get(id)
		return document.querySelector('li[data-id=$id]').innerText;
		
	@:calc var row = getIndex('[data-row] [data-col].focused', e => e.parent);
	@:calc var col = getIndex('[data-row] [data-col].focused');
	
	@:calc var width = container.querySelectorAll('[data-row]:first-child [data-col]').length;
	@:calc var height = container.querySelectorAll('[data-row]').length;
	
	@:calc var empty = width == 0;
	
	function getIndex(s:String, ?get:Element->Element) {
		var e:Element = cast container.querySelector(s);
		if (e != null && get != null)
			e = get(e);
		return 
			if (e == null) null;
			else e.siblings({ back: true }).length;
	}
	public function navigateTo(canvas:Element) {
		var col = canvas.siblings({ back: true }).length,
			row = canvas.parent.siblings({ back: true }).length;
			
		navigate(row, col);
	}
	public function navigate(row:Int, col:Int) {
		viewport.attr['data-focus'] = 'canvas';
		
		for (canvas in container.querySelectorAll('.canvas')) {
			var canvas:Element = cast canvas;
			canvas.classList.remove('focused');
		}
		
		var col = container.querySelector('[data-row]:nth-child(${row+1}) [data-col]:nth-child(${col+1})'),
			row = container.querySelector('[data-row]:nth-child(${row+1})');
		
		col.classList.add('focused');
		
		var rowName = get(row.getAttribute('data-row')),
			colName = get(col.getAttribute('data-col'));
		
		var status = [
			'[data-action="next row"]' => this.row < this.height - 1,
			'[data-action="prev row"]' => this.row > 0,
			'[data-action="next col"]' => this.col < this.width - 1,
			'[data-action="prev col"]' => this.col > 0,
		];
		
		for (selector => enabled in status)
			for (b in document.querySelectorAll(selector)) {
				var b:js.html.ButtonElement = cast b;
				b.disabled = !enabled;
			}
		
		for (e in document.querySelectorAll('$nav h2:first-of-type span')) {
			var e:js.html.Element = cast e;
			e.innerHTML = colName;
		}
		
		for (e in document.querySelectorAll('$nav h2:last-of-type span')) {
			var e:js.html.Element = cast e;
			e.innerHTML = rowName;
		}		
	}
	
	public function addRow(name) {
		var id = genId('row');
		var row = ElementOf.tag('div').set('data-row', id);
		set(id, name);
		if (container.firstElementChild != null)
			for (c in container.firstElementChild.children) {
				var c:js.html.Element = cast c;
				row.add(makeCanvas(c.getAttribute('data-col')));
			}
		container.appendChild(row);
	}
	
	function makeCanvas(id)
		return ElementOf.tag('div').set('class', 'canvas').set('data-col', id).add(ElementOf.tag('div').set('class', 'zoom-layer'));
		
	public function addCol(name) {
		var id = genId('col');
		for (e in container.querySelectorAll('[data-row]'))
			e.appendChild(makeCanvas(id));
		set(id, name);
	}	
	
	static var chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
	
	static function genId(prefix:String) {
		return '$prefix-' + [for (i in 0...4) 
			[for (i in 0...4) chars.charAt(Std.random(chars.length))].join('')
		].join('-');
	}	
}