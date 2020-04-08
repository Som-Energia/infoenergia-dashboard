import React, { Component } from 'react'
import styled from 'styled-components'

import TipicalDailyProfileChart from '../components/TipicalDailyProfileChart'
import Counter from '../components/Counter'

import DistributionByPeriod from './TipicalDailyProfile/DistributionByPeriod'
import DistributionByUserType from './TipicalDailyProfile/DistributionByUserType'

import mockData from '../services/TipicalDailyProfileMock'

const Widget = styled.div`
    padding: 4px 24px;
    background-color: #f2f2f2;
    margin-bottom: 16px;
`
const Legend = styled.div`
  display: flex;
  align-items: center;
  background-color: #f2f2f2;
  margin: 16px 0;
  padding: 12px;
  &.text-right {
    justify-content: flex-end;
  }
  .vall {
    width: 20px;
    height: 4px;
    display: inline-block;
    margin: 0 4px;
    background-color: #96b633;
  }
  .punta {
    width: 20px;
    height: 4px;
    display: inline-block;
    margin: 0 8px;
    background-color: #f2970f;
  }
`


class TipicalDailyProfile extends Component {

  constructor (props) {
    super(props)
    this.state = {
      data: { ...mockData }
    }
  }

  render () {
    return (
      <React.Fragment>
        <div className="row">
          <Counter title="Mitjana diària" value={this.state?.data?.mitjana_diaria?.valor} date="" />
        </div>
        <div className="row">
          <div className="col-xs-12">
            <TipicalDailyProfileChart data={this.state?.data?.perfil_tipic_diari} />
          </div>
        </div>
        <div className="row">
          <div className="col-xs-12">
            <Legend className="col-xs-12 col-md-6 text-right">
              <b>Hivern:</b> <span class="vall"></span> Vall 22h a 12h <span class="punta"></span> Punta 12h a 22h
            </Legend>
            <Legend className="col-xs-12 col-md-6">
              <b>Estiu:</b> <span class="vall"></span> Vall 23h a 13h <span class="punta"></span> Punta 13h a 23h
            </Legend>
          </div>
        </div>
        <div className="row">
          <div className="col-xs-12 col-md-6">
            <Widget>
              <DistributionByUserType />
            </Widget>
          </div>
          <div className="col-xs-12 col-md-6">
            <Widget>
              <DistributionByPeriod />
            </Widget>
          </div>
        </div>
      </React.Fragment>
    )
  }
}

export default TipicalDailyProfile
