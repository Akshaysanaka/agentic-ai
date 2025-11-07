import mongoose from 'mongoose'

export async function connectMongo(uri) {
  if (!uri) throw new Error('MONGODB_URI not provided')
  mongoose.set('strictQuery', true)
  await mongoose.connect(uri, {
    serverSelectionTimeoutMS: 10000,
    maxPoolSize: 10,
  })
  return mongoose
}

export function getConnectionState() {
  return mongoose.connection.readyState
}

export default mongoose
