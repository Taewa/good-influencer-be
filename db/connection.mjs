import { MongoClient } from "mongodb";
import 'dotenv/config'

const { MONGO_DB_CONNECTION } = process.env;
const connectionString = MONGO_DB_CONNECTION;
const client = new MongoClient(connectionString);
let conn;

try {
    conn = await client.connect();
} catch (e) {
    console.error('db connection error');
    console.error(e);
}

let db = conn.db("MongodbTST");

export default db;