const fs = require('fs');
const mysql = require('mysql2/promise');

(async () => {
  const db = JSON.parse(fs.readFileSync('db.json'));
  const conn = await mysql.createConnection({
    host: 'sonal.cy7uw4uu0e0x.us-east-1.rds.amazonaws.com',
    user: 'admin',
    password: 'Sonal45815',
    database: 'react_node_app'
  });

  const authorMap = new Map();

  for (const book of db.books) {
    const authorKey = book.name.trim();

    if (!authorMap.has(authorKey)) {
      const [rows] = await conn.execute('SELECT id FROM author WHERE name = ?', [book.name]);
      let authorId;

      if (rows.length === 0) {
        const [result] = await conn.execute(
          'INSERT INTO author (name, birthday, bio, createdAt, updatedAt) VALUES (?, ?, ?, CURDATE(), CURDATE())',
          [book.name, book.birthday, book.bio]
        );
        authorId = result.insertId;
      } else {
        authorId = rows[0].id;
      }

      authorMap.set(authorKey, authorId);
    }
  }

  for (const book of db.books) {
    const authorId = authorMap.get(book.name.trim());
    const [rows] = await conn.execute('SELECT id FROM book WHERE title = ?', [book.title]);

    if (rows.length === 0) {
      await conn.execute(
        'INSERT INTO book (title, releaseDate, description, pages, createdAt, updatedAt, authorId) VALUES (?, ?, ?, ?, CURDATE(), CURDATE(), ?)',
        [book.title, book.releaseDate, book.description, book.pages, authorId]
      );
    }
  }

  console.log('✅ Data migrated successfully');
  await conn.end();
})();
