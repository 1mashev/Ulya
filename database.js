const sqlite3 = require('sqlite3').verbose();

// Подключение к базе данных SQLite
const db = new sqlite3.Database(':memory:');

// Создание таблицы товаров
function initializeDatabase() {
    db.serialize(() => {
        db.run("CREATE TABLE IF NOT EXISTS products (id INTEGER PRIMARY KEY, name TEXT, price REAL)");

        // Вставка тестовых данных
        const stmt = db.prepare("INSERT INTO products (name, price) VALUES (?, ?)");
        stmt.run("Товар 1", 10.99);
        stmt.run("Товар 2", 20.49);
        stmt.finalize();
    });
}

// Получение всех товаров из таблицы
function getAllProducts(callback) {
    db.all("SELECT id, name, price FROM products", (err, rows) => {
        if (err) {
            console.error(err.message);
            return callback(err);
        }
        callback(null, rows);
    });
}

// Экспорт функций для работы с базой данных
module.exports = {
    initializeDatabase,
    getAllProducts
};
