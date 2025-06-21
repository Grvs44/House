import weeks from './weeks.json' with {type:'json'}
const pad = n=>n<10?'0'+n:n
const now = new Date()
const monday = new Date(now - (((now.getDay() + 6) % 7)*86400000))
const str = `${monday.getFullYear()}-${pad(monday.getMonth()+1)}-${pad(monday.getDate())}`
const getWeek=()=>{
  for (const group of weeks){
    const i = group.values.indexOf(str)
    if (i != -1){
      return group.name + ' week ' + (i+1)
    }
  }
  return 'Unknown week'
}
document.getElementById('w').innerText = getWeek()
