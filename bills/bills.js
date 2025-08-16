const round = (x) => (Math.round(x * 100) / 100).toFixed(2)

document.body.onload = () => {
  const now = new Date()
  document.getElementsByName('month')[0].value = new Date(
    now.getFullYear(),
    now.getMonth() + 1,
    0
  ).getDate()
}

document.getElementById('f').onsubmit = (e) => {
  e.preventDefault()
  const data = new FormData(e.currentTarget)
  const days = Number(data.get('days'))
  const month = Number(data.get('month'))
  if (days > month) {
    alert('Number of days H here cannot be greater than days in the month')
    document.getElementById('rbox').style.display = 'none'
    return
  }
  const elec = Number(data.get('elec'))
  const gas = Number(data.get('gas'))
  const water = Number(data.get('water'))
  const band = Number(data.get('bb'))
  const p = days / month
  const hPayElec = round((elec * p) / 4)
  const hPayWater = round((((elec + water) * p) / 4) * 100) / 100 - hPayElec
  const eShare = (elec + gas - hPayElec) / 3
  const rShare = (water + band - hPayWater) / 3
  document.getElementById('rbox').style.display = 'unset'
  document.getElementById(
    'results'
  ).innerText = `H pay electricity: £${hPayElec}
H pay water: £${round(hPayWater)}
M pay E: £${round(eShare)}
M pay R: £${round(rShare)}
R pay E: £${round(eShare - rShare)}`
}
