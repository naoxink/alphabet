const allLettersPercent = function(percent){
	return function(){
		this.allLettersMultiplier *= 1 + (percent / 100)
	}
}

const twiceManualDots = function(){
	this.dotButtonMultiplier *= 2
}

const upgrades = [
	{
		'id': '+2%i',
		'title': 'All letters increment +2%',
		'cost': 500,
		'near': 2,
		'effect': allLettersPercent(2)
	},
	{
		'id': '+2%ii',
		'title': 'All letters increment +2%',
		'cost': 1000,
		'near': 400,
		'effect': allLettersPercent(2)
	},
	{
		'id': 'dotbutton',
		'title': 'Button for manual dots',
		'cost': 2000,
		'near': 500
	},
	{
		'id': 'dotbuttonx2',
		'title': 'Manual dots x2',
		'cost': 4000,
		'near': 2000,
		'effect': twiceManualDots
	},
	{
		'id': 'dotbuttonx2ii',
		'title': 'Manual dots x2',
		'cost': 6000,
		'near': 4500,
		'effect': twiceManualDots
	},
	{
		'id': '+2%iii',
		'title': 'All letters increment +2%',
		'cost': 10000,
		'near': 1200,
		'effect': allLettersPercent(2)
	},
	{
		'id': '+5%',
		'title': 'All letters increment +5%',
		'cost': 15000,
		'near': 9000,
		'effect': allLettersPercent(5)
	},
	{
		'id': 'dotbuttonx2iii',
		'title': 'Manual dots x2',
		'cost': 12000,
		'near': 2000,
		'effect': twiceManualDots
	},
	{
		'id': 'dotbuttonx2i4',
		'title': 'Manual dots x2',
		'cost': 12000,
		'near': 2500,
		'effect': twiceManualDots
	},
]

for(let i = 1000; i <= 1000000; i+=100000){
	upgrades.push({
		'id': 'dotbuttonx2i' + (i / 100000),
		'title': 'Manual dots x2',
		'cost': i,
		'near': i / 2,
		'effect': twiceManualDots
	})
}
for(let i = 2000; i <= 2000000; i+=200000){
	upgrades.push({
		'id': '+5%i' + (i / 200000),
		'title': 'All letters increment +5%',
		'cost': i,
		'near': i / 2,
		'effect': allLettersPercent(5)
	})
}

export default upgrades