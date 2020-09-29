const convertHours = elapsedHours => {
  if (elapsedHours === null) return
  if (typeof elapsedHours !== 'number') return
  if (elapsedHours < 24) return `${elapsedHours.toFixed(0)}h`
  if (elapsedHours < 48) return `1 day`
  if (elapsedHours < 168) return `${Math.floor(elapsedHours / 24)} days`
  if (elapsedHours < 336) return `1 week`
  if (elapsedHours < 720) return `${Math.floor(elapsedHours / 168)} weeks`
  if (elapsedHours < 1440) return `1 month`
  if (elapsedHours < 8760) return `${Math.floor(elapsedHours / 720)} months`
  if (elapsedHours < 17520) return `1 year`
  return `${Math.floor(elapsedHours / 8760)} years`
}

export default convertHours
