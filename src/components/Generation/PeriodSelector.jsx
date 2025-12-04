import React, { useContext } from 'react'
import {
  FormControl,
  Select,
} from '@mui/material'
import GenerationUseContext from '../../contexts/GenerationUseContext'
import { useTranslation } from 'react-i18next'


export default function KwhBag(props) {
  const {handleChange, periods} = props
  const { is3Period } = useContext(GenerationUseContext)
  const { t } = useTranslation()

  return (
    <FormControl fullWidth>
      <Select
        native
        value={periods}
        onChange={handleChange}
        inputProps={{
          name: 'viewType',
          id: 'period-select',
        }}
      >
        <option id="month-option" value={'Taula_Peatges_20'}>
          {t('GENERATION_SELECT_3_PERIODS')}
        </option>
        {is3Period ? null : (
          <option id="year-option" value={'Taula_Peatges_30_60_Peninsular'}>
            {t('GENERATION_SELECT_6_PERIODS')}
          </option>
        )}
      </Select>
    </FormControl>
  )
}
