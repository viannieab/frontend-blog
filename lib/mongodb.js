import { MongoClient } from 'mongodb'

if(!process.env.MONGODB_URL) {
    throw new Error('Invalid/Missing Environment variable: "MONGODB_URL"')
}
const url = process.env.MONGODB_URL

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    ssl: true,  // Enforces SSL connection
    tlsAllowInvalidCertificates: true,  // Optional: Use in dev environments if certificate issues exist
};

let client
let clientPromise
if(process.env.NODE_ENV === "development") {
    if(!global._mongoClientPromise) {
        client = new MongoClient(url, options)
        global._mongoClientPromise = client.connect()
    }
    clientPromise = global._mongoClientPromise
} else {
    client = new MongoClient(url, options)
    clientPromise = client.connect()
}

export default clientPromise