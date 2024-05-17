import { Collection, Db, Document, InsertOneResult, ObjectId, MongoClient } from 'mongodb';

const DATABASE_URI = "mongodb://localhost:27017";
const DATABASE_NAME = "forms-site";

type TableRecord = object;

export class Connection {
  private constructor(private client: MongoClient, private db: Db) {}

  static async connect(): Promise<Connection> {
    let client =  new MongoClient(DATABASE_URI);
    await client.connect();

    const database = client.db(DATABASE_NAME);

    return new Connection(client, database);
  }

  public database(): Db {
    return this.db;
  }

  public async close(): Promise<void> {
    return await this.client.close();
  }
}


export class Table<T extends TableRecord> {
  private constructor(private name: string, private collection: Collection) {}

  static async new<T extends TableRecord>(db: Db, name: string) {
    const collection =  db.collection(name);

    return new Table<T>(name, collection);
  }


  public async create(data: Partial<T>) {
    return await this.collection.insertOne(data) as InsertOneResult<T>;
  }

  public async findMany(where: Partial<T>) {
    return await this.collection.find(where).toArray() as T[];
  }

  public async find(where: Partial<T>) {
    return await this.collection.findOne(where) as T;
  }

  public async findById(_id: string | number) {
    return await this.collection.findOne({ _id: new ObjectId(_id) }) as T;
  }

  

  public async update(where: Partial<T>, update: Partial<T>) {
    return  await this.collection.updateMany( where, { $set: update } ) as T;;
  }

  public async delete(where: Partial<T>) {
    return await this.collection.deleteMany(where) as T;
  }
}
