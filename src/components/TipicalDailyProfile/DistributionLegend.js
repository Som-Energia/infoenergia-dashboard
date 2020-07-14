import React from 'react'

const classes = {
  list: {
    paddingTop: '16px'
  },
  listItem: {
    marginBottom: '8px',
    display: 'flex',
    alignItems: 'center'
  },
  colorSample: {
    width: '28px',
    height: '28px',
    marginRight: '8px'
  }
}

const DistributionLegend = ({ values, colors, data }) => {
  return (
    <>
      {
        data !== undefined
          ? <ul className="list-unstyled" style={classes.list}>
            {
              Object.keys(values).map(value => (
                <li key={value} style={classes.listItem}>
                  <span style={{ ...classes.colorSample, backgroundColor: colors[value] }}></span>
                  <span>{ values[value] !== undefined ? values[value] : '-' }: <b>{ data[value] !== undefined ? data[value] : '-' }%</b></span>
                </li>
              ))
            }
          </ul>
          : ''
      }
    </>
  )
}

export default DistributionLegend
