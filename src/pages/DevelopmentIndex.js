import { useState } from 'react'
export default function DevelopmentIndex() {
  const [lang, setLang] = useState('ca')
  return (
    <>
      <h1>Infoenergia Pages</h1>
      <section>
        <select
          value={lang}
          onChange={(ev) => {
            setLang(ev.target.value)
          }}
        >
          {['ca', 'es', 'eu', 'gl'].map((val) => {
            return (
              <option value={val} key={val}>
                {val}
              </option>
            )
          })}
        </select>
        <ul>
          <li>
            <a href={`/${lang}/infoenergy`}>{'Corbes horàries'}</a>
          </li>
          <li>
            <a href={`/${lang}/infoenergy/energy-use`}>{"Ús de l'energia"}</a>
          </li>
          <li>
            <a href={`/${lang}/infoenergy/generationkwh/production-consumption`}>{"Generationkwh producció i consum"}</a>
          </li>
        </ul>
      </section>
    </>
  )
}
