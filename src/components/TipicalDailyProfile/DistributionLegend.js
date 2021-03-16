import React from 'react'

const classes = {
  list: {
    paddingTop: '16px',
    paddingLeft: '0',
  },
  listItem: {
    marginBottom: '8px',
    display: 'flex',
    alignItems: 'center',
  },
  colorSample: {
    width: '24px',
    height: '24px',
    marginRight: '8px',
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
                <span
                  style={{
                    ...classes.colorSample,
                    backgroundColor: colors[value],
                  }}
                ></span>
                <span>
                  {values[value] !== undefined ? values[value] : '-'}{' '}
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
