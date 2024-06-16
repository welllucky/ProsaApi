import { MongoClient } from "mongodb";

class AppDatabase {
  constructor(username, password, databaseName) {
    this.username = username;
    this.password = password;
    this.databaseName = databaseName;
    this.uri = `mongodb+srv://${username}:${password}@${applicationName}.nkgvtqx.mongodb.net/?retryWrites=true&w=majority&appName=${applicationName}`;
  }

  async createDatabase() {
    // Create a MongoClient with a MongoClientOptions object to set the Stable API version
    const client = new MongoClient(this.uri, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      },
    });

    try {
      // Connect the client to the server	(optional starting in v4.7)
      await client.connect();
      // Send a ping to confirm a successful connection
      await client.db().command({ ping: 1 });
      console.log("Conexão com o banco de dados realizada com sucesso");
    } finally {
      // Ensures that the client will close when you finish/error
      await client.close();
    }
  }
}

export default createDatabase;
