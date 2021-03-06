const TOKEN = 'ecada804a8884a67960726dbf983aeda451355d1ae2d4af69854dd7e0d182761'
const API_URL = 'https://infoenergia-api.somenergia.coop/api'
const CUPS = 'ES0031406238503003AP0F'
const currentMonth = '202106'

const headers = new Headers({
  Authorization: `token ${TOKEN}`,
  'Content-Type': 'application/json',
})

export function getTimeCurves() {
  return fetch(`${API_URL}/CCHFact/${CUPS}/${currentMonth}`, {
    method: 'GET',
    headers: headers,
  })
    .then((response) => response.json())
    .catch((error) => console.error(error))
}
