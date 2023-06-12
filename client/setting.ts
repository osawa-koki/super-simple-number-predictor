// eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
import Env from './next.config.js'
const isProd = process.env.NODE_ENV === 'production'

const setting = {
  isProd,
  basePath: Env.basePath,
  apiPath: isProd ? '' : 'http://localhost:8000',
  title: '🎯 Number Predictor 🎯'
}

export default setting
