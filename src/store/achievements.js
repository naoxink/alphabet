const achievements = {
	'maxone': {
		'title': 'Max one letter',
		'check': function(){
			return this.alphabet[0].qty == 1
		},
		'done': false
	}
}

export default achievements