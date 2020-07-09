const mixins = {
    methods: {
        formatDots(number){
            let n = '0'
            if(number < 1000) n = parseFloat(number).toFixed(2)
            else if(number >= 1000000000000000000000) n = parseFloat(number/1000000000000000000000).toFixed(2) + ' Se'
            else if(number >= 1000000000000000000) n = parseFloat(number/1000000000000000000).toFixed(2) + ' qi'
            else if(number >= 1000000000000000) n = parseFloat(number/1000000000000000).toFixed(2) + ' qu'
            else if(number >= 1000000000000) n = parseFloat(number/1000000000000).toFixed(2) + ' t'
            else if(number >= 1000000000) n = parseFloat(number/1000000000).toFixed(2) + ' b'
            else if(number >= 1000000) n = parseFloat(number/1000000).toFixed(2) + ' m'
            else if(number >= 1000) n = parseFloat(number/1000).toFixed(2) + ' k'
          const x = n.split('.')
          let x1 = x[0]
          let x2 = x.length > 1 ? '.' + x[1] : ''
          const rgx = /(\d+)(\d{3})/
          while(rgx.test(x1)){
            x1 = x1.replace(rgx, '$1' + '.' + '$2')
          }
          return x1 + x2
        },
        timeFormat(s, objectFormat = false){
          var ms = s % 1000
          s = (s - ms) / 1000
          var secs = s % 60
          s = (s - secs) / 60
          var mins = s % 60
          var hrs = (s - mins) / 60

          if(objectFormat){
            return {
              'h': hrs,
              'm': mins,
              's': secs
            }
          }
          var result = ''
          if(hrs)
            result += hrs + 'h'
          if(hrs || mins)
            result += ' ' + mins + 'm'
          if(mins || secs)
            result += ' ' + secs + 's'
          return result
        },
        hasUpgrade(id){
          return !!this.upgrades.find(u => u.id === id).owned
        },
        changeSection(section){
          this.showing = section
        },
        calcPercent(part, total){
          let percent = (part * 100) / total
          if(percent > 100){
            percent = 100
          }
          return percent.toFixed(2)
        },
        getDotsPerSecond(){
          let inc = 0
          inc = this.alphabet.reduce((ac, l) => {
            if(!l.level) return ac
            let linc = ac + l.inc
            // Niveles de letra
            if(l.level >= l.maxLevel){
              linc *= 3
            }else if(l.level >= l.superLevel){
              linc *= 2
            }
            // Mejoras
            linc *= this.allLettersMultiplier
            ac += linc
            return ac
          }, inc)
          return inc
        }
    }
}
export default mixins