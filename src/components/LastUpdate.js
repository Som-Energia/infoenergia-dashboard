import React from 'react'
import * as dayjs from 'dayjs'
import styled from 'styled-components'
import { useTranslation } from 'react-i18next'

const LastUpdateWrapper = styled.div`
  font-size: 0.9rem;
  width: 100%;
  display: flex;
  justify-content: flex-end;
  padding-top: 12px;
  margin-bottom: 0;
  span {
    padding-left: 4px;
    font-weight: 400;
  }
`

const LastUpdate = (props) => {
  const { date } = props
  const { t } = useTranslation()
  return (
    <LastUpdateWrapper>
      {t('LAST_UPDATE')}: <span>{ date ? dayjs(date).format('DD/MM/YYYY HH:mm') : '-' }</span>
    </LastUpdateWrapper>
  )
}

export default LastUpdate
