import React from 'react'

const classes = {
  list: {
    paddingTop: '16px',
    paddingLeft: '0',
  },
  listItem: {
    marginBottom: '10px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  name: {
    fontSize: '18px',
    marginRight: '24px',
    textTransform: 'uppercase',
  },
  value: {
    fontSize: '28px',
    fontWeight: 700,
  },
}

const DistributionLegend = ({ values, colors, data }) => {
  return (
    <>
      {data !== undefined ? (
        <ul style={classes.list}>
          {Object.keys(values).map((value) => {
            return data[value] !== undefined ? (
              <li key={values[value]} style={classes.listItem}>
                <span style={classes.name}>
                  {values[value] !== undefined ? values[value] : '-'}{' '}
                </span>
                <span style={{ ...classes.value, color: colors[value] }}>
                  <b>{data[value] !== undefined ? data[value] : '-'}%</b>
                </span>
              </li>
            ) : null
          })}
        </ul>
      ) : (
        ''
      )}
    </>
  )
}

export default DistributionLegend
