import React, { Component } from 'react'

import TipicalWeeklyProfileChart from '../components/TipicalWeeklyProfileChart'
import Counter from '../components/Counter'

import mockData from '../services/TipicalWeeklyProfileMock'

class TipicalDailyProfile extends Component {
  constructor (props) {
    super(props)
    this.state = {
      data: mockData
    }
  }

  render () {
    return (
      <React.Fragment>
        <div className="row">
          <Counter title="Mitjana setmanal" value={this.state?.data?.mitjana_semanal?.valor} date="" />
        </div>
        <div className="row">
          <div className="col-xs-12">
            <TipicalWeeklyProfileChart data={this.state?.data?.mitjana_semanal} />
          </div>
        </div>
        <div className="row">
          <div className="col-xs-9">

          </div>
          <div className="col-xs-3">

          </div>
        </div>
      </React.Fragment>
    )
  }
}

export default TipicalDailyProfile
