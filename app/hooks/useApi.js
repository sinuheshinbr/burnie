import { useState } from 'react'

export default useApi = apiFunc => {
  const [error, setError] = useState(false)
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)

  const request = async (...args) => {
    setLoading(true)
    const response = await apiFunc(...args)
    setLoading(false)

    if (!response.ok) {
      setError(true)
      if (response.data.message) return setData(response.data.message)
      return setData(response.data)
    }

    setError(false)
    return response
  }

  return { request, error, data, loading }
}
