const { getCosmosDB } = require('../../config/database');

class Cart {
  static containerName = 'carts';

  static async init() {
    const cosmosDB = getCosmosDB();
    const { container } = await cosmosDB.containers.createIfNotExists({
      id: this.containerName,
      partitionKey: { paths: ['/userId'] }
    });
    return container;
  }

  static async getByUserId(userId) {
    const container = await this.init();
    const { resources } = await container.items
      .query({
        query: 'SELECT * FROM c WHERE c.userId = @userId',
        parameters: [{ name: '@userId', value: userId }]
      })
      .fetchAll();
    return resources[0];
  }

  static async update(userId, items) {
    const container = await this.init();
    const cart = await this.getByUserId(userId) || { userId, items: [] };
    cart.items = items;
    await container.items.upsert(cart);
    return cart;
  }
}

module.exports = Cart;