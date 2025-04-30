const { getMySQLPool } = require('../../config/database');
const errorMiddleware = require('../../middlewares/error.middleware');
const { off } = require('../../server');

class Product {
  static async create({ name, description, price, stock }) {
    const pool = getMySQLPool();
    
    const [result] = await pool.execute(
      'INSERT INTO products (name, description, price, stock) VALUES (?, ?, ?, ?)',
      [name, description, price, stock]
    );
    return result.insertId;
  }

  static async findById(id) {
    const pool = getMySQLPool();
    const [rows] = await pool.execute('SELECT * FROM products WHERE id = ?', [id]);
    return rows[0];
  }

  static async findAll({ page = 1, limit = 10 }) {
    const pool = getMySQLPool();
    const offset = (page - 1) * limit;
    const intLimit = parseInt(limit)

    console.log("23",typeof intLimit,typeof offset)

    // console.log("Pool>> ",pool)
    console.log("pool.execute>> ",pool.execute)
    const [rows] = await pool.execute(
      `SELECT * FROM products LIMIT ${intLimit} OFFSET ${offset}`
    );

    // const [rows] = await pool.execute(
    //   'SELECT * FROM products'
    // );

    console.log("28>>",[rows])
    
    const [countRows] = await pool.execute('SELECT COUNT(*) as total FROM products');
    return {
      data: rows,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total: countRows[0].total,
        pages: Math.ceil(countRows[0].total / limit)
      }
    };
  }
}

module.exports = Product;