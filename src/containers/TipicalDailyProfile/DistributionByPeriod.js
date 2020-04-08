import React, { Component } from 'react'
import styled from 'styled-components'

import DistributionPieChart from '../../components/DistributionPieChart'
import DistributionLegend from '../../components/DistributionLegend'

import data from '../../services/DistributionByPeriodMock'

const COLORS = {
  perc_punta: '#616161',
  perc_vall: '#96b633'
}

const VALUES = {
  perc_punta: 'Punta',
  perc_vall: 'Vall'
}

const Title = styled.h3`
    font-size: 2.25rem;
    font-weight: 700;
`

class DistributionByPeriod extends Component {
  constructor (props) {
    super(props)
    this.state = {
      data
    }
  }

  render () {
    return (
      <div className="row">
        <div className="col-xs-6">
          <Title>Distribució<br />per períodes</Title>
          <DistributionLegend colors={COLORS} values={VALUES} data={this.state?.data?.distribucio_periodes} />
        </div>
        <div className="col-xs-6">
          <DistributionPieChart data={this.state?.data?.distribucio_periodes} colors={COLORS} />
        </div>
      </div>
    )
  }
}

export default DistributionByPeriod
