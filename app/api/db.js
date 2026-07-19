//changed
import { MongoClient, ServerApiVersion } from 'mongodb';

let cachedClient = null;
let cachedDB = null;

export async function connectToDB() {
    if(cachedClient != null && cachedDB != null) {
        return { client: cachedClient, db: cachedDB };
    }

    const uri = "mongodb+srv://wheelUser:wheel-user123@cluster0.xvdzcan.mongodb.net/?appName=Cluster0";
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
    cachedDB = client.db('WheelGen');

    return { client: cachedClient, db: cachedDB }

}

