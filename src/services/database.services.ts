import { MongoClient } from 'mongodb'
import { config } from 'dotenv'

config()
// Connection URL
const url = `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@twitter.pcj2ixu.mongodb.net/Twitter?retryWrites=true&w=majority`

// Database Name
const dbName = 'Twitter'

class DatabaseService {
  private client: MongoClient
  constructor() {
    this.client = new MongoClient(url)
  }

  async connect() {
    try {
      // Use connect method to connect to the server
      await this.client.connect()
      const db = this.client.db(dbName)
      const collection = db.collection('documents')
      console.log('Connected successfully to server')
      return collection
    } finally {
      // Ensures that the client will close when you finish/error
      await this.client.close()
    }
  }
}

// Tạo object từ class DatabaseService
const databaseService = new DatabaseService()
export default databaseService
