import React, { Component } from 'react'
import styled from 'styled-components'

import DistributionPieChart from '../../components/TipicalDailyProfile/DistributionPieChart'
import DistributionLegend from '../../components/TipicalDailyProfile/DistributionLegend'

import data from '../../services/DistributionByUserTypeMock'

const COLORS = {
  permanent: '#f2970f',
  peak: '#616161',
  regular: '#96b633'
}

const VALUES = {
  permanent: 'Permanent',
  peak: 'PIC',
  regular: 'Regular'
}

const Title = styled.h3`
  font-size: 2.25rem;
  font-weight: 700;
`

class DistributionByUserType extends Component {
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
          <Title>Distribució<br />per tipus d'ús</Title>
          <DistributionLegend colors={COLORS} values={VALUES} data={this.state?.data?.distribucio_tipus_us} />
        </div>
        <div className="col-xs-6">
          <DistributionPieChart data={this.state?.data?.distribucio_tipus_us} colors={COLORS} />
        </div>
      </div>
    )
  }
}

export default DistributionByUserType
