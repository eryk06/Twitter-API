import { MongoClient, Db, Collection } from 'mongodb'
import { config } from 'dotenv'
import { User } from '~/models/schemas/User.schema'

config()
// Connection URL
const url = `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@twitter.pcj2ixu.mongodb.net/Twitter?retryWrites=true&w=majority`

class DatabaseService {
  private client: MongoClient
  private db: Db
  constructor() {
    this.client = new MongoClient(url)
    this.db = this.client.db(process.env.MONGODB_NAME)
  }

  async connect() {
    try {
      // Use connect method to connect to the server
      await this.db.command({ ping: 1 })
      console.log('Connected successfully to server')
    } catch (error) {
      console.error(error)
      throw error
    }
  }

  get users(): Collection<User> {
    return this.db.collection(process.env.MONGODB_USERS_COLLECTION as string)
  }
}

// Tạo object từ class DatabaseService
const databaseService = new DatabaseService()
export default databaseService
