const { getCosmosDB } = require('../../config/database');

class Session {
  static containerName = 'sessions';

  static async init() {
    const cosmosDB = getCosmosDB();
    const { container } = await cosmosDB.containers.createIfNotExists({
      id: this.containerName,
      partitionKey: { paths: ['/userId'] }
    });
    return container;
  }

  static async create(userId, token) {
    const container = await this.init();
    const session = {
      userId,
      token,
      createdAt: new Date().toISOString()
    };
    await container.items.create(session);
    return session;
  }
}

module.exports = Session;