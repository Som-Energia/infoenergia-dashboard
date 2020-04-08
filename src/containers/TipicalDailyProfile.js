import React, { Component } from 'react'

import TipicalDailyProfileChart from '../components/TipicalDailyProfileChart'
import Counter from '../components/Counter'

import DistributionByPeriod from './TipicalDailyProfile/DistributionByPeriod'
import DistributionByUserType from './TipicalDailyProfile/DistributionByUserType'

import mockData from '../services/TipicalDailyProfileMock'

const classes = {
  widget: {
    padding: '4px 24px',
    backgroundColor: '#f8f8f8',
    marginBottom: '16px'
  }
}

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
          <div className="col-xs-12 col-md-6">
            <div style={classes.widget}>
              <DistributionByUserType />
            </div>
          </div>
          <div className="col-xs-12 col-md-6">
            <div style={classes.widget}>
              <DistributionByPeriod />
            </div>
          </div>
        </div>
      </React.Fragment>
    )
  }
}

export default TipicalDailyProfile
