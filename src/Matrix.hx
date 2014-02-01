package ;

import Math.*;

abstract Matrix({ a: Float, b: Float, c: Float, d:Float, tx: Float, ty:Float }) {
	public var a(get, never):Float;
	public var b(get, never):Float;
	public var c(get, never):Float;
	public var d(get, never):Float;
	public var tx(get, never):Float;
	public var ty(get, never):Float;
	
	inline function get_a() return this.a;
	inline function get_b() return this.b;
	inline function get_c() return this.c;
	inline function get_d() return this.d;
	inline function get_tx() return this.tx;
	inline function get_ty() return this.ty;
	
	public inline function new(a, b, c, d, tx, ty) this = { a: a, b: b, c: c, d: d, tx: tx, ty: ty };

	@:op(!m) static public function invert(m:Matrix) {	    
	    var det = m.a * m.d - m.c * m.b;
	    var a =  m.d / det, 
	    	b = -m.b / det, 
	    	c = -m.c / det, 
	    	d =  m.a / det;
	    return new Matrix(a, b, c, d, -(a * m.tx + c * m.ty), -(b * m.tx + d * m.ty));	
	}
	
	@:commutative @:op(m * p) static public function transformPoint(m:Matrix, p:Point) 
		return new Point(m.a * p.x + m.c * p.y + m.tx, m.b * p.x + m.d * p.y + m.ty);
	
	@:op(m * n) static public function concat(m:Matrix, n:Matrix)
		return new Matrix(
			n.a * m.a  + n.c * m.b,
			n.b * m.a  + n.d * m.b,
			n.a * m.c  + n.c * m.d,
			n.b * m.c  + n.d * m.d,
			n.a * m.tx + n.c * m.ty + n.tx,
			n.b * m.tx + n.d * m.ty + n.ty
		);
	
	@:to public function toString()
		return 'matrix($a, $b, $c, $d, $tx, $ty)';
	
	static public inline function rotate(angle) 
		return new Matrix(cos(angle), -sin(angle), sin(angle), cos(angle), 0, 0);
		
	static public inline function scale(factor)
		return new Matrix(factor, 0, 0, factor, 0, 0);
		
	@:from static public inline function move(p:Point)
		return new Matrix(1, 0, 0, 1, p.x, p.y);
	
	static public var IDENTITY(default, null):Matrix = new Matrix(1, 0, 0, 1, 0, 0);	
}