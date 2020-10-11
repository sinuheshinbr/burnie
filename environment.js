import Constants from 'expo-constants'
const { manifest } = Constants
const api = `http://${manifest.debuggerHost.split(':').shift()}:4000/dev`

const localhost = api

const ENV = {
  dev: {
    apiUrl: localhost
  },
  prod: {
    apiUrl: 'https://odrsdxfb08.execute-api.sa-east-1.amazonaws.com/dev'
  }
}

const getEnvVars = (env = manifest.releaseChannel) => {
  if (__DEV__) return ENV.dev
  if (env === 'prod') return ENV.prod
}

export default getEnvVars