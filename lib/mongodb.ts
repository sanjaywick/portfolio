import { MongoClient, ServerApiVersion } from "mongodb"

if (!process.env.MONGODB_URI) {
  throw new Error('Invalid/Missing environment variable: "MONGODB_URI"')
}

const uri = process.env.MONGODB_URI
const options = {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
  maxPoolSize: 10,
  serverSelectionTimeoutMS: 10000, // Increased timeout for Render
  socketTimeoutMS: 45000,
  connectTimeoutMS: 10000,
  bufferMaxEntries: 0,
  useNewUrlParser: true,
  useUnifiedTopology: true,
}

let client: MongoClient
let clientPromise: Promise<MongoClient>

// For serverless environments like Render, always create a new connection
if (process.env.NODE_ENV === "production") {
  client = new MongoClient(uri, options)
  clientPromise = client.connect()
} else {
  // In development mode, use a global variable
  const globalWithMongo = global as typeof globalThis & {
    _mongoClientPromise?: Promise<MongoClient>
  }

  if (!globalWithMongo._mongoClientPromise) {
    client = new MongoClient(uri, options)
    globalWithMongo._mongoClientPromise = client.connect()
  }
  clientPromise = globalWithMongo._mongoClientPromise
}

// Add connection logging
clientPromise
  .then(() => {
    console.log("✅ MongoDB connected successfully")
  })
  .catch((error) => {
    console.error("❌ MongoDB connection error:", error)
  })

export default clientPromise
