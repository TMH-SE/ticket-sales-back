// tslint:disable: no-var-requires
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
  dynamodb.listTables((err, data) => {
    if (err) {
      console.log(err)
    }
    if (data) {
      console.log('---------------Database seeder is running-------------')
      const tableNames = [
        'TaiKhoan',
        'NhanVien',
        'KhachHang',
        'HoaDon',
        'VeXe',
        'TuyenXe',
        'ChuyenXe',
        'PhuongTien'
      ].filter(name => data.TableNames.indexOf(name) === -1)
      console.log(tableNames)
      tableNames.map(tableName => {
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
        dynamodb.createTable(params, error => {
          if (error) {
            console.error(error)
          }
        })
      })
      if (tableNames.length !== 0) {
        setTimeout(async () => {
          createItem('TaiKhoan', {
            id: 'b7567d40-dc94-11e9-b2a4-cf50d869735b',
            tenDangNhap: 'admin',
            matKhau:
              '$2b$10$FfO6XwXuCQ8a.lH9ndRxbOkFh7VE0udT0oQBIhjdVcXE2SWMzjVCa',
            userId: '40b80e40-dc96-11e9-b654-338e909d341e',
            isAdmin: true,
            trangThai: true
          })
          createItem('NhanVien', {
            id: '40b80e40-dc96-11e9-b654-338e909d341e',
            hoTen: 'Root',
            trangThai: true
          })
        }, 5000)
      }
    }
  })
}

dbseed()
