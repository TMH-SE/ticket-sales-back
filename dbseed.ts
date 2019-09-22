// tslint:disable-next-line: no-var-requires
const AWS = require('aws-sdk')

AWS.config.loadFromPath('./awsConfig.json')

const dynamodb = new AWS.DynamoDB()
const docClient = new AWS.DynamoDB.DocumentClient()

async function createItem(tableName, item) {
  const params = {
    TableName: tableName,
    Item: { ...item }
  }
  await docClient.put(params, (err, data) => {
    if (err) {
      console.error(err)
    }
  })
}

async function dbseed() {
  await console.log('---------------Database seeder is running-------------')
  const tableNames = [
    'TaiKhoan',
    'NhanVien',
    'KhachHang',
    'HoaDon',
    'VeXe',
    'TuyenXe',
    'ChuyenXe',
    'PhuongTien'
  ]
  await tableNames.map(async tableName => {
    const params = {
      TableName: tableName,
      AttributeDefinitions: [
        {
          AttributeName: 'id',
          AttributeType: 'S'
        }
      ],
      KeySchema: [
        {
          AttributeName: 'id',
          KeyType: 'HASH'
        }
      ],
      ProvisionedThroughput: {
        ReadCapacityUnits: 10,
        WriteCapacityUnits: 10
      }
    }
    await dynamodb.createTable(params, async (err, data) => {
      if (err) {
        console.error(err)
      }
    })
  })
  await setTimeout(async () => {
    await createItem('TaiKhoan', {
      id: 'b7567d40-dc94-11e9-b2a4-cf50d869735b',
      tenDangNhap: 'admin',
      matKhau: '$2b$10$FfO6XwXuCQ8a.lH9ndRxbOkFh7VE0udT0oQBIhjdVcXE2SWMzjVCa',
      userId: '40b80e40-dc96-11e9-b654-338e909d341e',
      isAdmin: true,
      trangThai: true
    })
    await createItem('NhanVien', {
      id: '40b80e40-dc96-11e9-b654-338e909d341e',
      hoTen: 'Root',
      trangThai: true
    })
  }, 10000)
}

dbseed()
