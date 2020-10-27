import { useState, useEffect } from 'react'

export default useApi = apiFunc => {
  let isMounted = true
  const [error, setError] = useState(false)
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    return () => (isMounted = false)
  }, [])

  const request = async (...args) => {
    if (isMounted) setLoading(true)
    const response = await apiFunc(...args)
    if (isMounted) setLoading(false)

    if (!response) {
      if (isMounted) setData('Connection problem... try again later')
      return { ok: false }
    }

    if (!response.ok) {
      if (isMounted) {
        setError(true)
        if (response.status === 400) return setData(response.data)
        if (response.status === 401) return setData(response.data.error)
        if (response.status === 404)
          return setData('Internal error please contact support')
        if (response.status === null)
          return setData('Connection problem... try again later')
        return setData(response.data)
      }
    }

    if (isMounted) setError(false)
    return response
  }

  return { request, error, data, loading }
}
