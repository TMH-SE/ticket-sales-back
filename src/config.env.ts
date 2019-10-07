import * as fs from 'fs'
import * as dotenv from 'dotenv'

dotenv.config()

const { PORT, NODE_ENV } = process.env

const awsConfig = JSON.parse(fs.readFileSync('./awsConfig.json', 'utf-8'))

const config = {
  development: {
    port: PORT,
    aws: {
      accessKeyId: 'def4ult',
      secretAccessKey: 'def4ult',
      region: 'us-east-1',
      endpoint: 'http://localhost:8000'
    }
  },
  production: {
    port: 9000,
    aws: {
      accessKeyId: awsConfig.accessKeyId,
      secretAccessKey: awsConfig.secretAccessKey,
      sessionToken: awsConfig.sessionToken,
      region: awsConfig.region
    }
  }
}

export default config[NODE_ENV || 'development']
