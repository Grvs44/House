const round = (x) => Math.round(x * 100) / 100
const out = (x) => x.toFixed(2)

document.body.onload = () => {
  const now = new Date()
  document.getElementsByName('month')[0].value = new Date(
    now.getFullYear(),
    now.getMonth() + 1,
    0
  ).getDate()
  const s = document.getElementById('share')
  if (navigator.canShare({ text: '' })) s.onclick = share
  else s.remove()
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
  const hPay = round(((elec + water) * p) / 4)
  const hPayElec = round((elec * p) / 4)
  const hPayWater = hPay - hPayElec
  const eShare = (elec + gas - hPayElec) / 3
  const rShare = (water + band - hPayWater) / 3
  const rPayE = round(eShare - rShare)
  const rPayETotal = rPayE + hPayElec
  document.getElementById('rbox').style.display = 'unset'
  document.getElementById('results').innerText = `Days H here: ${days}/${month}
H pay electricity: £${out(hPayElec)}
H pay water: £${out(hPayWater)}
H pay total: £${out(hPay)}
M pay E: £${out(round(eShare))}
M pay R: £${out(round(rShare))}
R pay E: £${out(rPayE)} + £${out(hPayElec)} = £${out(rPayETotal)}`
}

const copy = document.getElementById('copy')
copy.onclick = () => {
  navigator.clipboard
    .writeText(document.getElementById('results').innerText)
    .then(() => {
      copy.innerText = 'Copied'
      setTimeout(() => {
        copy.innerText = 'Copy'
      }, 2000)
    })
}

const share = () => {
  navigator.share({ text: document.getElementById('results').innerText })
}
