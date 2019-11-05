// tslint:disable: no-var-requires
const AWS = require('aws-sdk')
const dotenv = require('dotenv')

dotenv.config()

process.env.NODE_ENV === 'development'
  ? AWS.config.update({
      accessKeyId: 'def4ult',
      secretAccessKey: 'def4ult',
      region: 'us-east-1',
      endpoint: 'http://localhost:8000'
    })
  : AWS.config.loadFromPath('./awsConfig.json')

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

// async function deleteDB() {
//   const arr = ['DH2Data', 'NguoiDung', 'VeXe']
//   arr.map(name => {
//     const params = {
//       TableName: name
//     }

//     dynamodb.deleteTable(params, (err, data) => {
//       if (err) {
//         console.error(
//           'Unable to delete table. Error JSON:',
//           JSON.stringify(err, null, 2)
//         )
//       } else {
//         console.log(
//           'Deleted table. Table description JSON:',
//           JSON.stringify(data, null, 2)
//         )
//       }
//     })
//   })
// }

// deleteDB()

async function dbseed() {
  dynamodb.listTables((err, data) => {
    if (err) {
      console.log(err)
    }
    if (data) {
      console.log('---------------Database seeder is running-------------')
      const tableNames = ['NguoiDung', 'DH2Data', 'VeXe'].filter(
        name => data.TableNames.indexOf(name) === -1
      )

      tableNames.map(tableName => {
        const params = {
          TableName: tableName,
          ProvisionedThroughput: {
            ReadCapacityUnits: 5,
            WriteCapacityUnits: 5
          }
        }
        if (tableName === 'NguoiDung') {
          Object.assign(params, {
            AttributeDefinitions: [
              {
                AttributeName: 'id',
                AttributeType: 'S'
              },
              {
                AttributeName: 'tenDangNhap',
                AttributeType: 'S'
              },
              {
                AttributeName: 'email',
                AttributeType: 'S'
              },
              {
                AttributeName: 'soCMND',
                AttributeType: 'S'
              },
              {
                AttributeName: 'soDienThoai',
                AttributeType: 'S'
              }
            ],
            KeySchema: [
              {
                AttributeName: 'id',
                KeyType: 'HASH'
              }
            ],
            GlobalSecondaryIndexes: [
              {
                IndexName: 'UsernameIndex',
                KeySchema: [
                  {
                    AttributeName: 'tenDangNhap',
                    KeyType: 'HASH'
                  }
                ],
                Projection: {
                  ProjectionType: 'ALL'
                },
                ProvisionedThroughput: {
                  ReadCapacityUnits: 1,
                  WriteCapacityUnits: 1
                }
              },
              {
                IndexName: 'IDNumberIndex',
                KeySchema: [
                  {
                    AttributeName: 'soCMND',
                    KeyType: 'HASH'
                  }
                ],
                Projection: {
                  ProjectionType: 'ALL'
                },
                ProvisionedThroughput: {
                  ReadCapacityUnits: 1,
                  WriteCapacityUnits: 1
                }
              },
              {
                IndexName: 'EmailIndex',
                KeySchema: [
                  {
                    AttributeName: 'email',
                    KeyType: 'HASH'
                  }
                ],
                Projection: {
                  ProjectionType: 'ALL'
                },
                ProvisionedThroughput: {
                  ReadCapacityUnits: 1,
                  WriteCapacityUnits: 1
                }
              },
              {
                IndexName: 'PhoneIndex',
                KeySchema: [
                  {
                    AttributeName: 'soDienThoai',
                    KeyType: 'HASH'
                  }
                ],
                Projection: {
                  ProjectionType: 'ALL'
                },
                ProvisionedThroughput: {
                  ReadCapacityUnits: 1,
                  WriteCapacityUnits: 1
                }
              }
            ]
          })
        } else if (tableName === 'DH2Data') {
          Object.assign(params, {
            AttributeDefinitions: [
              {
                AttributeName: 'pk',
                AttributeType: 'S'
              },
              {
                AttributeName: 'id',
                AttributeType: 'S'
              },
              {
                AttributeName: 'tuyenXeId',
                AttributeType: 'S'
              },
              {
                AttributeName: 'xeId',
                AttributeType: 'S'
              },
              {
                AttributeName: 'diemDi',
                AttributeType: 'S'
              },
              {
                AttributeName: 'diemDen',
                AttributeType: 'S'
              },
              {
                AttributeName: 'bienSoXe',
                AttributeType: 'S'
              }
            ],
            KeySchema: [
              {
                AttributeName: 'pk',
                KeyType: 'HASH'
              },
              {
                AttributeName: 'id',
                KeyType: 'RANGE'
              }
            ],
            GlobalSecondaryIndexes: [
              {
                IndexName: 'BienSoXeIndex',
                KeySchema: [
                  {
                    AttributeName: 'pk',
                    KeyType: 'HASH'
                  },
                  {
                    AttributeName: 'bienSoXe',
                    KeyType: 'RANGE'
                  }
                ],
                Projection: {
                  ProjectionType: 'ALL'
                },
                ProvisionedThroughput: {
                  ReadCapacityUnits: 1,
                  WriteCapacityUnits: 1
                }
              },
              {
                IndexName: 'ChuyenXeIndex',
                KeySchema: [
                  {
                    AttributeName: 'pk',
                    KeyType: 'HASH'
                  },
                  {
                    AttributeName: 'tuyenXeId',
                    KeyType: 'RANGE'
                  }
                ],
                Projection: {
                  ProjectionType: 'ALL'
                },
                ProvisionedThroughput: {
                  ReadCapacityUnits: 1,
                  WriteCapacityUnits: 1
                }
              },
              {
                IndexName: 'XeIdIndex',
                KeySchema: [
                  {
                    AttributeName: 'pk',
                    KeyType: 'HASH'
                  },
                  {
                    AttributeName: 'xeId',
                    KeyType: 'RANGE'
                  }
                ],
                Projection: {
                  ProjectionType: 'ALL'
                },
                ProvisionedThroughput: {
                  ReadCapacityUnits: 1,
                  WriteCapacityUnits: 1
                }
              },
              {
                IndexName: 'TuyenXeIndex',
                KeySchema: [
                  {
                    AttributeName: 'diemDi',
                    KeyType: 'HASH'
                  },
                  {
                    AttributeName: 'diemDen',
                    KeyType: 'RANGE'
                  }
                ],
                Projection: {
                  ProjectionType: 'ALL'
                },
                ProvisionedThroughput: {
                  ReadCapacityUnits: 1,
                  WriteCapacityUnits: 1
                }
              }
            ]
          })
        } else {
          Object.assign(params, {
            AttributeDefinitions: [
              {
                AttributeName: 'id',
                AttributeType: 'S'
              },
              {
                AttributeName: 'khachHangId',
                AttributeType: 'S'
              },
              {
                AttributeName: 'chuyenXeId',
                AttributeType: 'S'
              }
            ],
            KeySchema: [
              {
                AttributeName: 'id',
                KeyType: 'HASH'
              }
            ],
            GlobalSecondaryIndexes: [
              {
                IndexName: 'KhachHangIdIndex',
                KeySchema: [
                  {
                    AttributeName: 'khachHangId',
                    KeyType: 'HASH'
                  }
                ],
                Projection: {
                  ProjectionType: 'ALL'
                },
                ProvisionedThroughput: {
                  ReadCapacityUnits: 1,
                  WriteCapacityUnits: 1
                }
              },
              {
                IndexName: 'ChuyenXeIdIndex',
                KeySchema: [
                  {
                    AttributeName: 'chuyenXeId',
                    KeyType: 'HASH'
                  }
                ],
                Projection: {
                  ProjectionType: 'ALL'
                },
                ProvisionedThroughput: {
                  ReadCapacityUnits: 1,
                  WriteCapacityUnits: 1
                }
              }
            ]
          })
        }
        dynamodb.createTable(params, (error, dat) => {
          if (error) {
            console.error(error)
          } else {
            console.log(dat)
          }
        })
      })
      if (tableNames.length !== 0) {
        setTimeout(async () => {
          createItem('NguoiDung', {
            id: 'b7567d40-dc94-11e9-b2a4-cf50d869735b',
            tenDangNhap: 'admin',
            matKhau:
              '$2b$10$FfO6XwXuCQ8a.lH9ndRxbOkFh7VE0udT0oQBIhjdVcXE2SWMzjVCa',
            hoTen: 'Root',
            isAdmin: true,
            trangThai: true
          })
          createItem('NguoiDung', {
            id: 'b126c9e0-f867-11e9-93a3-a505e5b67c1f',
            tenDangNhap: 'mod1',
            matKhau:
              '$2b$10$FfO6XwXuCQ8a.lH9ndRxbOkFh7VE0udT0oQBIhjdVcXE2SWMzjVCa',
            hoTen: 'Mod 1',
            isAdmin: true,
            trangThai: true
          })
          createItem('NguoiDung', {
            id: 'b0c45e90-f867-11e9-93a3-a505e5b67c1f',
            tenDangNhap: 'mod2',
            matKhau:
              '$2b$10$FfO6XwXuCQ8a.lH9ndRxbOkFh7VE0udT0oQBIhjdVcXE2SWMzjVCa',
            hoTen: 'Mod 2',
            isAdmin: true,
            trangThai: true
          })
        }, 15000)
      }
    }
  })
}

dbseed()
