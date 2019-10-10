import { Injectable, Logger } from '@nestjs/common'
import { docClient } from '@constants'
import { v1 as uuid } from 'uuid'
import { ApolloError } from 'apollo-server-express'
import { TaiKhoan } from '@entities'

@Injectable()
export class CommonService {
  async createItem(tableName: string, item: any) {
    const params = {
      TableName: tableName,
      Item: { id: uuid(), ...item, trangThai: true }
    }
    docClient.put(params, (err, data) => {
      if (err) {
        Logger.error(err)
        throw new ApolloError(err.message, err.statusCode.toString())
      }
    })
  }

  async updateItem(tableName: string, id: string, itemData: any) {
    let item
    await this.getOneItem(tableName, id)
      .then(res => (item = res))
      .catch(err => {
        Logger.error(err)
        throw new ApolloError(err.message, err.statusCode.toString())
      })
    const params = {
      TableName: tableName,
      Item: { ...Object.assign(item, itemData) }
    }
    await docClient.put(params, (err, data) => {
      if (err) {
        Logger.error(err)
        throw new ApolloError(err.message, err.statusCode.toString())
      }
    })
  }

  async deleteItem(tableName: string, id: string) {
    let item
    await this.getOneItem(tableName, id)
      .then(res => (item = res))
      .catch(err => {
        Logger.error(err)
        throw new ApolloError(err.message, err.statusCode.toString())
      })
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

  async removeItem(tableName: string, id: string) {
    const params = {
      TableName: tableName,
      Key: {
        id
      }
    }
    docClient.delete(params, (err, data) => {
      if (err) {
        Logger.error(err)
        throw new ApolloError(err.message, err.statusCode.toString())
      }
    })
  }

  async getOneItem(tableName: string, id: string): Promise<any> {
    try {
      const params = {
        TableName: tableName,
        KeyConditionExpression: '#id = :val',
        ExpressionAttributeNames: {
          '#id': 'id'
        },
        ExpressionAttributeValues: {
          ':val': id
        }
      }
      const data = await docClient.query(params).promise()
      return data.Items[0]
    } catch (error) {
      throw new ApolloError(error, error.statusCode.toString())
    }
  }

  async getItems(tableName: string) {
    try {
      const params = {
        TableName: tableName,
        FilterExpression: '#stt = :val',
        ExpressionAttributeNames: {
          '#stt': 'trangThai'
        },
        ExpressionAttributeValues: {
          ':val': true
        }
      }
      const data = await docClient.scan(params).promise()
      return data.Items
    } catch (error) {
      throw new ApolloError(error, error.statusCode.toString())
    }
  }

  async getItemsByForeignKey(
    tableName: string,
    foreignKey: string,
    foreignKeyValue: string
  ) {
    try {
      const params = {
        TableName: tableName,
        FilterExpression: '#fk = :val and #stt = :sttVal',
        ExpressionAttributeNames: {
          '#fk': foreignKey,
          '#stt': 'trangThai'
        },
        ExpressionAttributeValues: {
          ':val': foreignKeyValue,
          ':sttVal': true
        }
      }
      const data = await docClient.scan(params).promise()
      return data.Items
    } catch (error) {
      throw new ApolloError(error, error.statusCode.toString())
    }
  }

  async getTaiKhoan(userName: string): Promise<TaiKhoan> {
    try {
      const params = {
        TableName: 'TaiKhoan',
        FilterExpression: 'tenDangNhap = :usr',
        ExpressionAttributeValues: {
          ':usr': userName
        }
      }
      const data = await docClient.scan(params).promise()
      if (data.Items[0]) {
        return new TaiKhoan(data.Items[0])
      } else {
        return null
      }
    } catch (error) {
      throw new ApolloError(error, error.statusCode.toString())
    }
  }
}
