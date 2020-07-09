const achievements = {
	'getstarted': {
		'title': 'Get started',
		'check': function(){
			return this.alphabet[0].level
		},
		'done': false
	},
	'buyfirstupgrade': {
		'title': 'Buy your first upgrade',
		'check': function(){
			return this.upgrades.filter(u => u.owned).length > 0
		},
		'done': false
	},
	'getdotbutton': {
		'title': 'Unlock the Dot button',
		'check': function(){
			return this.hasUpgrade('dotbutton')
		},
		'done': false
	},
	'play666': {
		'title': 'Play for 666 hours',
		'check': function(){
			return this.timeFormat(Date.now() - this.startPlayingTime, true).h >= 666
		},
		'done': false
	},
	'unlockall': {
		'title': 'Unlock the complete alphabet',
		'check': function(){
			return !this.alphabet.filter(l => l.unlocked).length
		},
		'progress': function(){
			return [
				this.alphabet.filter(l => l.unlocked).length,
				this.alphabet.length
			]
		},
		'done': false
	},
	'getupper': {
		'title': 'Get one letter upercased',
		'check': function(){
			let found = false
			this.alphabet.forEach(l => {
				if(l.level >= l.superLevel){
					found = true
				}
			})
			return found
		},
		'done': false
	},
	'maxone': {
		'title': 'Max one letter',
		'check': function(){
			let found = false
			this.alphabet.forEach(l => {
				if(l.level >= l.maxLevel){
					found = true
				}
			})
			return found
		},
		'done': false
	},
	'reach100': {
		'title': 'Reach 100 dots',
		'check': function(){
			return this.higherDots >= 100
		},
		// 'progress': function(){
		// 	return [ this.formatDots(this.higherDots), this.formatDots(1000) ]
		// },
		'done': false
	},
	'reach1k': {
		'title': 'Reach 1k dots',
		'check': function(){ return this.higherDots >= 1000 },
		// 'progress': function(){
		// 	return [ this.formatDots(this.higherDots), this.formatDots(1000) ]
		// },
		'done': false
	},
	'reach1m': {
		'title': 'Reach 1m dots',
		'check': function(){ return this.higherDots >= 1000000 },
		// 'progress': function(){
		// 	return [ this.formatDots(this.higherDots), this.formatDots(1000000) ]
		// },
		'done': false
	},
	'reach1b': {
		'title': 'Reach 1b dots',
		'check': function(){ return this.higherDots >= 1000000000 },
		// 'progress': function(){
		// 	return [ this.formatDots(this.higherDots), this.formatDots(1000000000) ]
		// },
		'done': false
	},
	'maxall': {
		'title': 'Max all letters',
		'check': function(){
			let all = true
			this.alphabet.forEach(l => {
				if(l.level < l.maxLevel){
					all = false
				}
			})
			return all
		},
		'progress': function(){
			return [
				this.alphabet.filter(l => l.level >= l.maxLevel).length,
				this.alphabet.length
			]
		},
		'done': false
	},
	'buyallupgrades': {
		'title': 'Buy all upgrades',
		'check': function(){
			let all = true
			this.upgrades.forEach(u => {
				if(!u.owned){
					all = false
				}
			})
			return all
		},
		'progress': function(){
			return [
				this.upgrades.filter(u => u.owned).length,
				this.upgrades.length
			]
		},
		'done': false
	}
}

export default achievements