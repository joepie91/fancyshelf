o4 = {
	__proto__: {
		__proto__: {
			__proto__: {
				varA: "A"
				varB: "B"
			}
		}
	}
	varA: "C"
}

console.log o4.prototype.varA
exit()
o2 = new Object
o2.__proto__ = o

console.log o2
console.log o2.varA

o3 = new Object(o2)
o3.varA = "C"

o4 = new Object(o3)

console.log o4.prototype
console.log o4.prototype.varA, o4.prototype.varB
