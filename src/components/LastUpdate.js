import React from 'react'
import moment from 'moment'
import styled from 'styled-components'
import { useTranslation } from 'react-i18next'


const LastUpdateWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  padding-top: 8px;
  margin-bottom: 8px;
  span {
    padding-left: 4px;
    font-weight: 500;
  }
`

const LastUpdate = (props) => {
  const { date } = props
  const { t } = useTranslation()
  return (
    <LastUpdateWrapper>
      {t('LAST_UPDATE')}: <span>{ date ? moment(date).format('DD/MM/YYYY') : '-' }</span>
    </LastUpdateWrapper>
  )
}

export default LastUpdate
