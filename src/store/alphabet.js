const alphabet = []

for(let i = 97; i <= 122; i++){
	const realIndex = i - 96 // Empezando por 1
	alphabet.push({
		name: String.fromCharCode(i),
		super: String.fromCharCode(i - 32),
		unlocked: false,
		level: 0,
		inc: Math.pow(realIndex, 1.15),
		cost: Math.pow(realIndex, 4),
		maxLevel: 50,
		superLevel: 25
	})
}

alphabet[0].unlocked = true

export default alphabet