const { getMySQLPool } = require('../../config/database');

class User {
  static async create({ username, email, password, role = 'customer' }) {
    const pool = getMySQLPool();
    const [result] = await pool.execute(
      'INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)',
      [username, email, password, role]
    );
    return result.insertId;
  }

  static async findByEmail(email) {
    const pool = getMySQLPool();
    const [rows] = await pool.execute('SELECT * FROM users WHERE email = ?', [email]);
    return rows[0];
  }

  static async findById(id) {
    const pool = getMySQLPool();
    const [rows] = await pool.execute('SELECT id, username, email, role, created_at FROM users WHERE id = ?', [id]);
    return rows[0];
  }

  static async update(id, updates) {
    const pool = getMySQLPool();
    const fields = Object.keys(updates).map(key => `${key} = ?`).join(', ');
    const values = Object.values(updates);
    values.push(id);

    await pool.execute(
      `UPDATE users SET ${fields} WHERE id = ?`,
      values
    );
  }

  static async delete(id) {
    const pool = getMySQLPool();
    await pool.execute('DELETE FROM users WHERE id = ?', [id]);
  }

  static async findAll({ page = 1, limit = 10 }) {
    const pool = getMySQLPool();
    const offset = (page - 1) * limit;
    
    const [rows] = await pool.execute(
      `SELECT id, username, email, role, created_at FROM users LIMIT ${limit} OFFSET ${offset} `
    );
    
    const [countRows] = await pool.execute('SELECT COUNT(*) as total FROM users');
    const total = countRows[0].total;
    
    return {
      data: rows,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    };
  }
}

module.exports = User;