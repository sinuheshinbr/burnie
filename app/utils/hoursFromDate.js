const hoursFromDate = date => {
  const now = new Date()
  const timeDiff = now - date
  return Number((timeDiff / 1000 / 60 / 60).toFixed(0))
}

export default hoursFromDate
