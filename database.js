const sqlite3 = require("sqlite3").verbose();

// Подключение к базе данных SQLite
const db = new sqlite3.Database("database.db");

// Создание таблицы товаров
function initializeDatabase() {
  db.serialize(() => {
    db.run(
      "CREATE TABLE IF NOT EXISTS products (id INTEGER PRIMARY KEY, name TEXT, price REAL, url TEXT, category TEXT, sale REAL DEFAULT 0)",
    );

    // Вставка тестовых данных
    const stmt = db.prepare(
      "INSERT INTO products (name, price, url, category, sale) VALUES (?, ?, ?, ?, ?)",
    );
    stmt.run(
      "Рюкзак ErichKrause EasyLine® 17L Жил-был Пес ",
      4000,
      "/assets/images/products/shool/1.jpg",
      "shool",
      0.3,
    );

    stmt.run(
      "Дырокол ErichKrause Elegance Classic до 20 листов",
      280,
      "/assets/images/products/office/Дырокол ErichKrause Elegance Classic до 20 листов (цена 280с).jpg",
      "office",
      0,
    );
    stmt.run(
      "Калькулятор настольный 8-разрядов ErichKrause DC-308N Classic",
      1500,
      "/assets/images/products/office/Калькулятор настольный 8-разрядов ErichKrause DC-308N Classic (цена 1500с).jpg",
      "office",
      0,
    );
    stmt.run(
      "Ластик Staedtler Rasoplast",
      80,
      "/assets/images/products/office/Ластик Staedtler Rasoplast (цена 80с).png",
      "office",
      0,
    );
    stmt.run(
      "Ручка шариковая автоматическая ErichKrause R-301 Matic&Grip Classic 1.0 (цена 50с)",
      50,
      "/assets/images/products/office/Ручка шариковая автоматическая ErichKrause R-301 Matic&Grip Classic 1.0 (цена 50с).jpg",
      "office",
      0,
    );
    stmt.run(
      "Ручка шариковая автоматическая Schneider K15 синяя (цена 50с)",
      50,
      "/assets/images/products/office/Ручка шариковая автоматическая Schneider K15 синяя (цена 50с).jpg",
      "office",
      0,
    );
    stmt.run(
      "Ручка шариковая неавтоматическая Schneider Slider Edge M синяя",
      120,
      "/assets/images/products/office/Ручка шариковая неавтоматическая Schneider Slider Edge M синяя (цена 120с).jpg",
      "office",
      0,
    );
    stmt.run(
      "Ручка шариковая ErichKrause ULTRA-30 Stick&Grip Classic 0.7",
      70,
      "/assets/images/products/office/Ручка шариковая ErichKrause ULTRA-30 Stick&Grip Classic 0.7 (цена 70с).jpg",
      "office",
      0,
    );
    stmt.run(
      "Ручка-корректор ErichKrause Arctic white",
      200,
      "/assets/images/products/office/Ручка-корректор ErichKrause Arctic white (цена 200с).jpg",
      "office",
      0,
    );
    stmt.run(
      "Степлер Half-strip ErichKrause Elegance Classic до 30 листов",
      350,
      "/assets/images/products/office/Степлер Half-strip ErichKrause Elegance Classic до 30 листов (цена 350с).jpg",
      "office",
      0,
    );
    stmt.run(
      "ТЕКСТОВЫДЕЛИТЕЛЬ SCHNEIDER JOB ПАСТЕЛЬНЫЙ ЛАВАНДОВЫЙ",
      70,
      "/assets/images/products/office/ТЕКСТОВЫДЕЛИТЕЛЬ SCHNEIDER JOB ПАСТЕЛЬНЫЙ ЛАВАНДОВЫЙ (цена 70с).jpg",
      "office",
      0,
    );
    stmt.run(
      "Точилка Staedtler Noris с контейнером",
      300,
      "/assets/images/products/office/Точилка Staedtler Noris с контейнером (цена 300с).jpg",
      "office",
      0,
    );
    stmt.run(
      "Чернографитный карандаш ErichKrause Jet Black, шестигранный , с ластиком, HB",
      25,
      "/assets/images/products/office/Чернографитный карандаш ErichKrause Jet Black, шестигранный , с ластиком, HB (цена 25с).jpg",
      "office",
      0,
    );
    stmt.run(
      "Акварель художественная Старый Мастер",
      900,
      "/assets/images/products/art/Акварель художественная Старый Мастер (цена 900с).jpg",
      "atr",
      0,
    );
    stmt.run(
      "Гуашь художественная Гамма Старый мастер",
      800,
      "/assets/images/products/art/Гуашь художественная Гамма Старый мастер (цена 800с).jpg",
      "atr",
      0,
    );
    stmt.run(
      "Дизайнерская Бумага Cordenons 1шт",
      180,
      "/assets/images/products/art/Дизайнерская Бумага Cordenons 1шт (180с).jpeg",
      "atr",
      0,
    );
    stmt.run(
      "Карандаш механический ErichKrause Frozen Beauty 0.5 мм",
      200,
      "/assets/images/products/art/Карандаш механический ErichKrause Frozen Beauty 0.5 мм (цена 200с).jpg",
      "atr",
      0,
    );
    stmt.run(
      "Карандаши цветные стираемые Faber-Castell",
      1000,
      "/assets/images/products/art/Карандаши цветные стираемые Faber-Castell (цена 1000с).jpg",
      "atr",
      0,
    );
    stmt.run(
      "Маркер перманентный для ткани Faber-Castell Textile Neon",
      700,
      "/assets/images/products/art/Маркер перманентный для ткани Faber-Castell Textile Neon (цена 700с).jpg",
      "atr",
      0,
    );
    stmt.run(
      "Мольберт настольный каркасный горизонтальный Гамма Студия",
      2000,
      "/assets/images/products/art/Мольберт настольный каркасный горизонтальный Гамма Студия (цена 2000с).jpg",
      "atr",
      0,
    );
    stmt.run(
      "Набор мягкого пластилина Milan Soft Dough",
      1200,
      "/assets/images/products/art/Набор мягкого пластилина Milan Soft Dough (цена 1200с).jpg",
      "atr",
      0,
    );
    stmt.run(
      "НЕВСКАЯ ПАЛИТРА Кисти Сонет",
      500,
      "/assets/images/products/art/НЕВСКАЯ ПАЛИТРА Кисти Сонет (цена 500с).jpg",
      "atr",
      0,
    );
    stmt.run(
      "Пастель художественная Faber-Castell Polychromos 12цв.",
      700,
      "/assets/images/products/art/Пастель художественная Faber-Castell Polychromos 12цв..jpg",
      "atr",
      0,
    );
    stmt.run(
      "Скетчбук 80л., Гамма Студия",
      320,
      "/assets/images/products/art/Скетчбук 80л., Гамма Студия (цена 320с).jpg",
      "atr",
      0,
    );
    stmt.run(
      "Холст на подрамнике Студия 40х40см",
      450,
      "/assets/images/products/art/Холст на подрамнике Студия 40х40см (цена 450с).jpg",
      "atr",
      0,
    );
    stmt.run(
      "Блок самоклеящийся бумажный ErichKrause Pastel Bloom",
      150,
      "/assets/images/products/shool/Блок самоклеящийся бумажный ErichKrause Pastel Bloom (цена 150c).jpg",
      "shool",
      0,
    );

    stmt.run(
      "Линейка пластиковая ErichKrause Ice Metallic",
      65,
      "/assets/images/products/shool/Линейка пластиковая ErichKrause Ice Metallic (цена 65с).jpg",
      "shool",
      0,
    );
    stmt.run(
      "Мешок для обуви ErichKrause с карманом на молнии",
      1400,
      "/assets/images/products/shool/Мешок для обуви ErichKrause с карманом на молнии (цена 1400с).jpg",
      "shool",
      0,
    );
    stmt.run(
      "Набор пластиковых обложек ErichKrause Hiding Cats",
      25,
      "/assets/images/products/shool/Набор пластиковых обложек ErichKrause Hiding Cats (цена 25с).jpg",
      "shool",
      0,
    );
    stmt.run(
      "Папка-конверт на кнопке пластиковая ErichKrause Matt Pastel Bloom",
      100,
      "/assets/images/products/shool/Папка-конверт на кнопке пластиковая ErichKrause Matt Pastel Bloom (цена 100с).jpg",
      "shool",
      0,
    );
    stmt.run(
      "Пенал BrunoVisconti ЗЕФИРНЫЕ ЖИВОТНЫЕ",
      450,
      "/assets/images/products/shool/Пенал BrunoVisconti ЗЕФИРНЫЕ ЖИВОТНЫЕ.jpeg",
      "shool",
      0,
    );
    stmt.run(
      "Рюкзак BrunoVisconti® «ВОЛШЕБНЫЕ ЛИСЫ»",
      7000,
      "/assets/images/products/shool/2.jpeg",
      "shool",
      0.3,
    );

    stmt.run(
      "Сумка-шоппер ErichKrause 10L Pastel Bloom",
      2000,
      "/assets/images/products/shool/Сумка-шоппер ErichKrause 10L Pastel Bloom (цена 2000с).jpg",
      "shool",
      0,
    );
    stmt.run(
      "Тетрадь общая BrunoVisconti А5 клетка",
      140,
      "/assets/images/products/shool/Тетрадь общая BrunoVisconti А5 клетка (цена 140с).jpeg",
      "shool",
      0,
    );
    stmt.run(
      "Тетрадь общая BrunoVisconti А5 клетка 2 ",
      140,
      "/assets/images/products/shool/Тетрадь общая BrunoVisconti А5 клетка 2 (цена 140с).jpeg",
      "shool",
      0,
    );
    stmt.run(
      "Тетрадь школьная ученическая с пластиковой обложкой на скобе ErichKrause",
      35,
      "/assets/images/products/shool/Тетрадь школьная ученическая с пластиковой обложкой на скобе ErichKrause (цена 35с).jpg",
      "shool",
      0,
    );
    stmt.run(
      "Тетрадь школьная ученическая ErichKrause Классика ассорти",
      28,
      "/assets/images/products/shool/Тетрадь школьная ученическая ErichKrause Классика ассорти (цена 28с).jpg",
      "shool",
      0,
    );

    stmt.run(
      'Рюкзак Herlitz Bliss Unicorn Night"',
      10000,
      "/assets/images/products/shool/3.jpg",
      "shool",
      0.3,
    );
    stmt.run(
      'Рюкзак MILAN "1918"',
      4000,
      "/assets/images/products/shool/4.jpg",
      "shool",
      0.3,
    );
    stmt.run(
      "Рюкзак BrunoVisconti «DONUT»",
      7800,
      "/assets/images/products/shool/Рюкзак BrunoVisconti «DONUT» (цена 7800с).jpeg",
      "shool",
      0.3,
    );

    db.serialize(() => {
      db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT UNIQUE,
      pass TEXT
    )
  `);

      db.serialize(() => {
        db.run(`
    CREATE TABLE IF NOT EXISTS cart (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      userId INTEGER,
      productId INTEGER,
      quantity INTEGER,
      FOREIGN KEY(userId) REFERENCES users(id),
      FOREIGN KEY(productId) REFERENCES products(id)
    )
  `);
      });
    });
    stmt.finalize();
  });
}

// Получение всех товаров из таблицы
function getAllProducts(callback) {
  db.all(
    "SELECT id, name, price, url, category, sale FROM products",
    (err, rows) => {
      if (err) {
        console.error(err.message);
        return callback(err);
      }
      callback(null, rows);
    },
  );
}

// Получение товаров со скидкой
function getSaleProducts(callback) {
  db.all(
    "SELECT id, name, price, url, category, sale FROM products WHERE sale > 0 AND sale <= 30;",
    (err, rows) => {
      if (err) {
        console.error(err.message);
        return callback(err);
      }
      callback(null, rows);
    },
  );
}

// Получение товара
function getProduct(productId, callback) {
  db.get(
    "SELECT id, name, price, url, category, sale FROM products WHERE id = ?;",
    [productId],
    (err, row) => {
      if (err) {
        console.error(err.message);
        return callback(err);
      }
      callback(null, row);
    },
  );
}

function getProductByCategory(category, callback) {
  db.all(
    "SELECT id, name, price, url, category, sale FROM products WHERE category = ?;",
    [category],
    (err, rows) => {
      if (err) {
        console.error(err.message);
        return callback(err);
      }
      callback(null, rows);
    },
  );
}

// Использование функции getProductByCategory для получения товаров с категорией 'office'
function getProductByCategory(category, callback) {
  db.all(
    "SELECT id, name, price, url, category, sale FROM products WHERE category = ?;",
    [category],
    (err, rows) => {
      if (err) {
        console.error(err.message);
        return callback(err);
      }
      callback(null, rows);
    },
  );
}

// Экспорт функций для работы с базой данных
module.exports = {
  initializeDatabase,
  getAllProducts,
  getSaleProducts,
  getProduct,
  getProductByCategory,
};
