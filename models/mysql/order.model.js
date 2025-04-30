const { getMySQLPool } = require('../../config/database');

class Order {
  static async create({ userId, items }) {
    const pool = getMySQLPool();
    const connection = await pool.getConnection();
    
    try {
      await connection.beginTransaction();

      // Calculate total
      let total = 0;
      for (const item of items) {
        const [product] = await connection.execute(
          'SELECT price FROM products WHERE id = ?',
          [item.productId]
        );
        total += product[0].price * item.quantity;
      }

      // Create order
      const [orderResult] = await connection.execute(
        'INSERT INTO orders (user_id, total, status) VALUES (?, ?, ?)',
        [userId, total, 'pending']
      );
      const orderId = orderResult.insertId;

      // Add order items
      for (const item of items) {
        const [product] = await connection.execute(
          'SELECT price FROM products WHERE id = ?',
          [item.productId]
        );
        
        await connection.execute(
          'INSERT INTO order_items (order_id, product_id, quantity, price) VALUES (?, ?, ?, ?)',
          [orderId, item.productId, item.quantity, product[0].price]
        );
      }

      await connection.commit();
      return orderId;
    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
  }
}

module.exports = Order;