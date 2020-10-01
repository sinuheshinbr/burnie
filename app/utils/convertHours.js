const convertHours = elapsedHours => {
  if (elapsedHours === null) return
  if (typeof elapsedHours !== 'number') return
  if (elapsedHours < 24) return `${elapsedHours.toFixed(0)}h ago`
  if (elapsedHours < 48) return `1 day ago`
  if (elapsedHours < 168) return `${Math.floor(elapsedHours / 24)}d ago`
  if (elapsedHours < 336) return `1 week ago`
  if (elapsedHours < 720) return `${Math.floor(elapsedHours / 168)} weeks ago`
  if (elapsedHours < 1440) return `1 month ago`
  if (elapsedHours < 8760) return `${Math.floor(elapsedHours / 720)} months ago`
  if (elapsedHours < 17520) return `1 year ago`
  return `${Math.floor(elapsedHours / 8760)} years ago`
}

export default convertHours
