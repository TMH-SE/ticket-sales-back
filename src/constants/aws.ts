import AWS from 'aws-sdk'

AWS.config.loadFromPath('./awsConfig.json')

const dynamodb = new AWS.DynamoDB()
const docClient = new AWS.DynamoDB.DocumentClient()
const ec2 = new AWS.EC2()
const s3 = new AWS.S3()

export { dynamodb, ec2, s3, docClient }
