const normalizeNumber = number => {
  if (typeof number !== 'number') return
  if (number === null) return
  if (number === null) return
  if (number > 999999) return `${(number / 1000000).toFixed(1)}M`
  if (number > 999) return `${(number / 1000).toFixed(1)}K`
  return number.toFixed(0)
}

export default normalizeNumber
