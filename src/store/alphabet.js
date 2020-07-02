const alphabet = []

for(let i = 97; i <= 122; i++){

	alphabet.push({
		name: String.fromCharCode(i),
		super: String.fromCharCode(i - 32),
		unlocked: false,
		qty: 0,
		inc: 1 * (i / 100)
	})
}

alphabet[0].unlocked = true

export default alphabet