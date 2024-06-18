import mongoose from "mongoose";

export class AppDatabase {
  constructor(username, password, databaseName, clusterName) {
    this.username = username;
    this.password = password;
    this.databaseName = databaseName;
    this.uri = `mongodb+srv://${username}:${password}@${clusterName}.nkgvtqx.mongodb.net/${databaseName}?retryWrites=true&w=majority&appName=${clusterName}`;
  }

  async createDatabase() {
    try {
      mongoose.connect(this.uri);
      console.log("Conectando com o banco de dados...");
      return mongoose.connection;
    } catch {
      console.error(`Falha ao se conectar com o banco! Erro: ${e}`);
    }
  }
}
