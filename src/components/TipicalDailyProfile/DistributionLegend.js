import React from 'react'

function DistributionLegend ({ values, colors, data }) {
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

  return (
    <ul className="list-unstyled" style={classes.list}>
      {
        Object.keys(values).map(value => (
          <li key={value} style={classes.listItem}>
            <span style={{ ...classes.colorSample, backgroundColor: colors[value] }}></span>
            <span>{values[value]}: <b>{data[value]}%</b></span>
          </li>
        ))
      }
    </ul>
  )
}

export default DistributionLegend
