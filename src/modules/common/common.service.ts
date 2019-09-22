import { Injectable, Logger } from '@nestjs/common'
import { docClient } from '@constants'
import { v1 as uuid } from 'uuid'
import { ApolloError } from 'apollo-server-express'

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
    return new Promise((res, rej) => {
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
      docClient.query(params, (err, data) => {
        if (err) {
          rej(err)
        } else {
          res(data.Items[0])
        }
      })
    })
  }

  getItems(tableName: string) {
    return new Promise((resolve, reject) => {
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
      docClient.scan(params, (err, data) => {
        if (err) {
          reject(err)
        } else {
          resolve(data.Items)
        }
      })
    })
  }

  async getItemsByForeignKey(
    tableName: string,
    foreignKey: string,
    foreignKeyValue: string
  ) {
    return new Promise((res, rej) => {
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
      docClient.scan(params, (err, data) => {
        if (err) {
          rej(err)
        } else {
          res(data.Items)
        }
      })
    })
  }

  async getTaiKhoan(userName: string) {
    return new Promise((res, rej) => {
      const params = {
        TableName: 'TaiKhoan',
        FilterExpression: 'tenDangNhap = :usr',
        ExpressionAttributeValues: {
          ':usr': userName
        }
      }
      docClient.scan(params, (err, data) => {
        if (err) {
          rej(err)
        } else {
          res(data.Items[0])
        }
      })
    })
  }
}
