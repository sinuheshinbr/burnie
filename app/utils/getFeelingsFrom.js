import dayjs from 'dayjs'

const getFeelingsFrom = {
  today: function(feelings) {
    const todayFeelingObject = feelings.filter(object => {
      return object.date === dayjs().format('DD-MM-YYYY')
    })
    if (todayFeelingObject[0]) return String(todayFeelingObject[0].feeling)
  },

  lastPeriod: function(feelings, days, isContribution = false) {
    const lastPeriodDays = []

    for (let i = 0; i < days; i++) {
      lastPeriodDays.push(
        dayjs()
          .subtract(days - i, 'days')
          .format('DD-MM-YYYY')
      )
    }

    const lastPeriodFeelingsObjects = feelings.filter(object => {
      return lastPeriodDays.indexOf(object.date) >= 0
    })

    const contributionGraphObjects = lastPeriodFeelingsObjects.map(object => ({
      date: `${object.date.substring(6, 10)}-${object.date.substring(
        3,
        5
      )}-${object.date.substring(0, 2)}`,
      count: 4 - object.feeling
    }))

    const date = dayjs()
      .subtract(days + 1, 'days')
      .format('DD-MM-YYYY')

    const dateObj = {
      count: 0,
      date: date
    }
    contributionGraphObjects.push(dateObj)

    if (isContribution) return contributionGraphObjects

    const lastPeriodFeelingsDates = lastPeriodFeelingsObjects.map(
      object => object.date
    )

    const emptyIndexes = []

    lastPeriodDays.forEach((date, index) => {
      if (lastPeriodFeelingsDates.indexOf(date) >= 0) return
      emptyIndexes.push(index)
      lastPeriodFeelingsObjects.splice(index, 0, { date, feeling: 2 })
    })

    const lastPeriodFeelings = lastPeriodFeelingsObjects.map(
      object => object.feeling
    )

    return { lastPeriodFeelings, emptyIndexes }
  }
}

export default getFeelingsFrom
