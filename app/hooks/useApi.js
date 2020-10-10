import { useState } from 'react'

export default useApi = apiFunc => {
  const [error, setError] = useState(false)
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)

  const request = async (...args) => {
    setLoading(true)
    const response = await apiFunc(...args)
    setLoading(false)

    if (!response) {
      setData('Connection problem... try again later')
      return { ok: false }
    }

    if (!response.ok) {
      setError(true)
      if (response.status === 400) return setData(response.data)
      if (response.status === 404)
        return setData('Internal error please contact support')
      console.log(response)
      if (response.problem === 'NETWORK_ERROR')
        return setData('Connection problem... try again later')
      return setData(response.data)
    }

    setError(false)
    return response
  }

  return { request, error, data, loading }
}
