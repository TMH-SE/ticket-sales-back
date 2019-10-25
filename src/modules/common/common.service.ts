import { Injectable, Logger } from '@nestjs/common'
import { docClient } from '@constants'
import { v1 as uuid } from 'uuid'
import { ApolloError } from 'apollo-server-express'
import { NguoiDung } from '@entities'

@Injectable()
export class CommonService {
  /* ok */
  async createItem(
    tableName: 'DH2Data' | 'NguoiDung' | 'VeXe',
    partition: 'dh2_chuyen' | 'dh2_tuyen' | 'dh2_xe',
    item: any
  ) {
    let params
    if (tableName === 'DH2Data') {
      params = {
        TableName: tableName,
        Item: { pk: partition, id: uuid(), ...item, trangThai: true }
      }
    } else {
      params = {
        TableName: tableName,
        Item: { id: uuid(), ...item, trangThai: true }
      }
    }
    docClient.put(params, (err, data) => {
      if (err) {
        Logger.error(err)
        throw new ApolloError(err.message, err.statusCode.toString())
      }
    })
  }

  /** ok */
  async updateItem(
    tableName: 'DH2Data' | 'NguoiDung' | 'VeXe',
    partition: 'dh2_chuyen' | 'dh2_tuyen' | 'dh2_xe',
    id: string,
    updatedData: any
  ) {
    const item = await this.getItemWithKey(tableName, partition, id)

    const params = {
      TableName: tableName,
      Item: { ...Object.assign(item, updatedData) }
    }
    await docClient.put(params, (err, data) => {
      if (err) {
        Logger.error(err)
        throw new ApolloError(err.message, err.statusCode.toString())
      }
    })
  }

  /** ok */
  async deleteItem(
    tableName: 'DH2Data' | 'NguoiDung' | 'VeXe',
    partition: 'dh2_chuyen' | 'dh2_tuyen' | 'dh2_xe',
    id: string
  ) {
    const item = await this.getItemWithKey(tableName, partition, id)

    const deleteParams = {
      TableName: tableName,
      Item: { ...item, trangThai: false }
    }
    await docClient.put(deleteParams, (err, data) => {
      if (err) {
        Logger.error(err)
        throw new ApolloError(err.message, err.statusCode.toString())
      }
    })
  }

  /* ok */
  async removeItem(
    tableName: 'DH2Data' | 'NguoiDung' | 'VeXe',
    partition: 'dh2_chuyen' | 'dh2_tuyen' | 'dh2_xe',
    id: string
  ) {
    let params
    if (tableName === 'DH2Data') {
      params = {
        TableName: tableName,
        Key: {
          pk: partition,
          id
        }
      }
    } else {
      params = {
        TableName: tableName,
        Key: {
          id
        }
      }
    }
    docClient.delete(params, (err, data) => {
      if (err) {
        Logger.error(err)
        throw new ApolloError(err.message, err.statusCode.toString())
      }
    })
  }

  /** ok */
  async getItemWithKey(
    tableName: 'DH2Data' | 'NguoiDung' | 'VeXe',
    partitionKey: 'dh2_chuyen' | 'dh2_tuyen' | 'dh2_xe',
    id: string
  ): Promise<any> {
    try {
      let params
      if (tableName === 'DH2Data') {
        params = {
          TableName: tableName,
          KeyConditionExpression: '#pk = :pkVal and #sk = :skVal',
          FilterExpression: '#stt = :sttVal',
          ExpressionAttributeNames: {
            '#pk': 'pk',
            '#sk': 'id',
            '#stt': 'trangThai'
          },
          ExpressionAttributeValues: {
            ':pkVal': partitionKey,
            ':skVal': id,
            ':sttVal': true
          }
        }
      } else {
        params = {
          TableName: tableName,
          KeyConditionExpression: '#pk = :pkVal',
          FilterExpression: '#stt = :sttVal',
          ExpressionAttributeNames: {
            '#pk': 'id',
            '#stt': 'trangThai'
          },
          ExpressionAttributeValues: {
            ':pkVal': id,
            ':sttVal': true
          }
        }
      }
      const data = await docClient.query(params).promise()
      return data.Items[0]
    } catch (error) {
      throw new ApolloError(error, error.code)
    }
  }

  /** ok */
  async getItems(
    tableName: 'DH2Data' | 'NguoiDung' | 'VeXe',
    partitionKey: 'dh2_chuyen' | 'dh2_tuyen' | 'dh2_xe'
  ) {
    try {
      let params
      let data
      if (tableName === 'DH2Data') {
        params = {
          TableName: tableName,
          KeyConditionExpression: '#pk = :pkVal',
          FilterExpression: '#stt = :val',
          ExpressionAttributeNames: {
            '#pk': 'pk',
            '#stt': 'trangThai'
          },
          ExpressionAttributeValues: {
            ':pkVal': partitionKey,
            ':val': true
          }
        }
        data = await docClient.query(params).promise()
      } else {
        params = {
          TableName: tableName,
          FilterExpression: '#stt = :val',
          ExpressionAttributeNames: {
            '#stt': 'trangThai'
          },
          ExpressionAttributeValues: {
            ':val': true
          }
        }
        data = await docClient.scan(params).promise()
      }
      return data.Items
    } catch (error) {
      throw new ApolloError(error, error.code)
    }
  }

  /** ok */
  async getItemsByIndex(
    tableName: 'DH2Data' | 'NguoiDung' | 'VeXe',
    indexName: string,
    keyConditionExpression: string,
    expressionAttributeNames: any,
    expressionAttributeValues: any
  ) {
    try {
      const params = {
        TableName: tableName,
        IndexName: indexName,
        KeyConditionExpression: keyConditionExpression,
        FilterExpression: '#stt = :sttVal',
        ExpressionAttributeNames: {
          ...expressionAttributeNames,
          '#stt': 'trangThai'
        },
        ExpressionAttributeValues: {
          ...expressionAttributeValues,
          ':sttVal': true
        }
      }

      const data = await docClient.query(params).promise()
      return data.Items
    } catch (error) {
      throw new ApolloError(error, error.code)
    }
  }

  async getTaiKhoan(userName: string): Promise<NguoiDung> {
    try {
      const data = await this.getItemsByIndex(
        'NguoiDung',
        'UsernameIndex',
        'tenDangNhap = :usr',
        null,
        { ':usr': userName }
      )
      if (data[0]) {
        return new NguoiDung(data[0])
      } else {
        return null
      }
    } catch (error) {
      throw new ApolloError(error, error.code)
    }
  }
}
