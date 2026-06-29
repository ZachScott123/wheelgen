import { MongoClient, ServerApiVersion } from ('mongodb');

let cachedClient = null;
let cachedDb = null;

export async function connectToDb() {
    if(cachedClient != null && cachedDb != null) {
        return { client: cachedClient, db: cachedDb };
    }

    const uri = `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@cluster0.xvdzcan.mongodb.net/?appName=Cluster0`;
    // Create a MongoClient with a MongoClientOptions object to set the Stable API version
    const client = new MongoClient(uri, {
        serverApi: {
            version: ServerApiVersion.v1,
            strict: true,
            deprecationErrors: true,
        }
    });

    await client.connect();

    cachedClient = client;
    cachedDb = client.db('WheelGen');

    return { client: cachedClient, db: cachedDb }

}

