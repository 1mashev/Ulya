const sqlite3 = require('sqlite3').verbose();

// Подключение к базе данных SQLite
const db = new sqlite3.Database(':memory:');

// Создание таблицы товаров
function initializeDatabase() {
  db.serialize(() => {
    db.run(
      'CREATE TABLE IF NOT EXISTS products (id INTEGER PRIMARY KEY, name TEXT, price REAL, url TEXT, category TEXT, sale REAL DEFAULT 0)',
    )

    // Вставка тестовых данных
    const stmt = db.prepare(
      'INSERT INTO products (name, price, url, category, sale) VALUES (?, ?, ?, ?, ?)',
    )
    stmt.run(
      'Бумага А3 160 гр 250л Navigator Office Card',
      10.99,
      'bumaga1',
      'offis',
      0,
    )
    stmt.run(
      'Бумага А4 80 гр 500л Navigator Universall',
      20.49,
      'bumaga2',
      'offis',
      0,
    )
    stmt.run(
      'Ежедневник датированный Brunnen Оптимум Софт, экокожа, А5 Зеленый',
      20.49,
      'ezh1',
      'offis',
      0,
    )
    stmt.run(
      'Ежедневник датированный Brunnen Эксклюзив Софт, экокожа, А4 Черный',
      20.49,
      'ezh2',
      'offis',
      0,
    )
    stmt.run(
      'Картина по номерам на холсте ТРИ СОВЫ Абстрактный кот, 40х50, с акриловыми красками и кистями',
      20.49,
      'kartina1',
      'creativity',
      0,
    )
    stmt.run(
      'Картина по номерам на холсте ТРИ СОВЫ В галактике, 40х50, с акриловыми красками и кистями',
      20.49,
      'kartina2',
      'creativity',
      0,
    )
    stmt.run(
      'Ластик каучуковый Milan 1220 для стирания графита и угля',
      20.49,
      'lastik1',
      'shool',
      0,
    )
    stmt.run(
      'Ластик каучуковый Milan Architect 420',
      20.49,
      'lastik2',
      'shool',
      0,
    )
    stmt.run(
      'Пенал квадро с двумя отделениями ErichKrause 210x100x50мм Жил-был Пес',
      20.49,
      'penal1',
      'shool',
      0.3,
    )
    stmt.run(
      'Пенал квадро с двумя отделениями ErichKrause 210x100x50мм Pastel Bloom (Minty)',
      20.49,
      'penal2',
      'shool',
      0.3,
    )
    stmt.run(
      'Ручка шариковая автоматическая BrunoVisconti® Firenze, 1 мм, синяя',
      20.49,
      'ruchka1',
      'shool',
      0,
    )
    stmt.run(
      'Ручка шариковая автоматическая BrunoVisconti® VERONA цвет корпуса черный 1 мм',
      20.49,
      'ruchka2',
      'shool',
      0,
    )
    stmt.run(
      'Ручка шариковая MILAN Silver, 1,0мм',
      20.49,
      'ruchka3',
      'offis',
      0,
    )
    stmt.run(
      'РУЧКА SCHNEIDER K15 ШАРИКОВАЯ АВТОМАТИЧЕСКАЯ, СИНЯЯ, КОРПУС АССОРТИ',
      20.49,
      'ruchka4',
      'offis',
      0,
    )
    stmt.run(
      'Рюкзак ErichKrause EasyLine® 17L Жил-был Пес',
      20.49,
      'rukzak1',
      'shool',
      0.3,
    )
    stmt.run(
      'Рюкзак ErichKrause EasyLine® 17L Pastel Bloom (Minty)',
      20.49,
      'rukzak2',
      'shool',
      0.3,
    )
    stmt.run(
      'Тетрадь общая BrunoVisconti® А5 (147 х 210 мм) ПИОНЫ 40 л., клетка',
      20.49,
      'tetrad1',
      'shool',
      0,
    )
    stmt.run(
      'Тетрадь общая BrunoVisconti® B5 (179x250 мм) НОЧНЫЕ ЦВЕТЫ 60 л., клетка',
      20.49,
      'tetrad2',
      'shool',
      0,
    )
    stmt.run(
      'STAEDTLER Графитовые карандаши Lumograph поштучно',
      20.49,
      'karandash1',
      'creativity',
      0,
    )
    stmt.run(
      'STAEDTLER Карандаши цветные Noris Club',
      20.49,
      'karandash2',
      'creativity',
      0,
    )
    stmt.finalize()
  })
}

// Получение всех товаров из таблицы
function getAllProducts(callback) {
  db.all(
    'SELECT id, name, price, url, category, sale FROM products',
    (err, rows) => {
      if (err) {
        console.error(err.message)
        return callback(err)
      }
      callback(null, rows)
    },
  )
}

// Получение товаров со скидкой
function getSaleProducts(callback) {
  db.all(
    'SELECT id, name, price, url, category, sale FROM products WHERE sale > 0 AND sale <= 30;',
    (err, rows) => {
      if (err) {
        console.error(err.message)
        return callback(err)
      }
      callback(null, rows)
    },
  )
}

// Получение товара
function getProduct(productId, callback) {
  db.get(
    'SELECT id, name, price, url, category, sale FROM products WHERE id = ?;',
    [productId],
    (err, row) => {
      if (err) {
        console.error(err.message)
        return callback(err)
      }
      callback(null, row)
    },
  )
}

// Экспорт функций для работы с базой данных
module.exports = {
  initializeDatabase,
  getAllProducts,
  getSaleProducts,
  getProduct,
}
