const TOKEN = '04afcfa463934dc784540aaea63d7d76490101cb0e264c43a7c293bdf58a17d4'
const API_URL = 'https://infoenergia-api.somenergia.coop/api'
const CUPS = 'ES0031406238503003AP0F'
const currentMonth = '202004'

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
