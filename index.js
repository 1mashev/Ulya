const express = require("express");
const path = require("path");
const database = require("./database");
const bodyParser = require("body-parser");
const session = require("express-session");

// Инициализация базы данных
database.initializeDatabase();

const app = express();
const PORT = process.env.PORT || 3001;

// Подключаем middleware для работы с формами и сессиями
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({ secret: "secret", resave: false, saveUninitialized: true }));

app.use(express.static(path.join(__dirname, "views")));
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.session.user ? true : false;
  next();
});
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

app.get("/", (req, res) => {
  database.getSaleProducts((err, products) => {
    if (err) {
      return res
        .status(500)
        .json({ error: "Ошибка при получении товаров из базы данных" });
    }
    res.render("index", { products });
  });
});

app.get("/shop", (req, res) => {
  database.getAllProducts((err, products) => {
    if (err) {
      return res
        .status(500)
        .json({ error: "Ошибка при получении товаров из базы данных" });
    }
    res.render("shop", { products });
  });
});

app.get("/office-shop", (req, res) => {
  database.getProductByCategory("office", (err, products) => {
    if (err) {
      return res
        .status(500)
        .json({ error: "Ошибка при получении товаров из базы данных" });
    }
    res.render("shop", { products });
  });
});

app.get("/shool-shop", (req, res) => {
  database.getProductByCategory("shool", (err, products) => {
    if (err) {
      return res
        .status(500)
        .json({ error: "Ошибка при получении товаров из базы данных" });
    }
    res.render("shop", { products });
  });
});

app.get("/art-shop", (req, res) => {
  database.getProductByCategory("art", (err, products) => {
    if (err) {
      return res
        .status(500)
        .json({ error: "Ошибка при получении товаров из базы данных" });
    }
    res.render("shop", { products });
  });
});

app.get("/sale-shop", (req, res) => {
  database.getSaleProducts((err, products) => {
    if (err) {
      return res
        .status(500)
        .json({ error: "Ошибка при получении товаров из базы данных" });
    }
    res.render("shop", { products });
  });
});

app.get("/contacts", (req, res) => {
  database.getAllProducts((err, products) => {
    if (err) {
      return res
        .status(500)
        .json({ error: "Ошибка при получении товаров из базы данных" });
    }
    res.render("contacts", { products });
  });
});

app.get("/about-us", (req, res) => {
  database.getAllProducts((err, products) => {
    if (err) {
      return res
        .status(500)
        .json({ error: "Ошибка при получении товаров из базы данных" });
    }
    res.render("about-us", { products });
  });
});

app.get("/product/:id", (req, res) => {
  const productId = req.params.id;

  database.getProduct(productId, (err, product) => {
    if (err) {
      return res
        .status(500)
        .json({ error: "Ошибка при получении товара из базы данных" });
    }

    if (!product) {
      return res.status(404).json({ error: "Товар не найден" });
    }

    res.render("product", { product });
  });
});

// Массив для хранения пользователей
const users = [
  {
    name: "sula",
    pass: "123",
  },
];

// Маршрут для страницы входа
app.get("/login", (req, res) => {
  res.render("login");
});

// Маршрут для обработки запроса на вход
app.post("/login", (req, res) => {
  const { name, pass } = req.body;
  db.get(
    "SELECT * FROM users WHERE name = ? AND pass = ?",
    [name, pass],
    (err, user) => {
      if (err) {
        console.error("Ошибка при поиске пользователя:", err);
        return res.status(500).send("Ошибка сервера");
      }
      if (user) {
        req.session.user = user;
        res.redirect("/user-dashboard");
      } else {
        res.send("Неверный логин или пароль");
      }
    },
  );
});

// Маршрут для страницы регистрации
app.get("/register", (req, res) => {
  res.render("register");
});

// Маршрут для обработки запроса на регистрацию
app.post("/register", (req, res) => {
  const { name, pass } = req.body;

  db.run(
    "INSERT INTO users (name, pass) VALUES (?, ?)",
    [name, pass],
    function (err) {
      if (err) {
        console.error("Ошибка при добавлении пользователя:", err);
        return res.status(500).send("Ошибка сервера");
      }
      res.redirect("/login");
    },
  );
});

// Защищаем маршруты, доступ к которым должен быть только для авторизованных пользователей
app.get("/user-dashboard", (req, res) => {
  if (req.session.user) {
    res.render("user-dashboard", { user: req.session.user });
  } else {
    res.redirect("/login");
  }
});

// Маршрут для выхода из аккаунта
app.post("/logout", (req, res) => {
  // Удаляем сессию пользователя
  req.session.destroy((err) => {
    if (err) {
      console.error("Ошибка при удалении сессии пользователя:", err);
      return res.status(500).send("Ошибка сервера");
    }
    // После успешного выхода перенаправляем на главную страницу или куда-либо еще
    res.redirect("/");
  });
});

// Добавление товара в корзину
app.post("/add-to-cart", (req, res) => {
  const { userId, productId, quantity } = req.body;

  db.run(
    "INSERT INTO cart (userId, productId, quantity) VALUES (?, ?, ?)",
    [userId, productId, quantity],
    function (err) {
      if (err) {
        console.error("Ошибка при добавлении товара в корзину:", err);
        return res.status(500).send("Ошибка сервера");
      }
      res.redirect("/cart");
    },
  );
});

// Просмотр содержимого корзины
app.get("/cart", (req, res) => {
  // Проверяем, авторизован ли пользователь
  if (!req.session.user) {
    return res.redirect("/login"); // Перенаправляем на страницу входа, если пользователь не авторизован
  }

  const userId = req.session.user.id;

  db.all(
    "SELECT products.*, cart.quantity FROM cart INNER JOIN products ON cart.productId = products.id WHERE cart.userId = ?",
    [userId],
    (err, items) => {
      if (err) {
        console.error("Ошибка при получении содержимого корзины:", err);
        return res.status(500).send("Ошибка сервера");
      }
      res.render("cart", { items });
    },
  );
});

// Удаление товара из корзины
app.post("/remove-from-cart", (req, res) => {
  const { userId, productId } = req.body;

  db.run(
    "DELETE FROM cart WHERE userId = ? AND productId = ?",
    [userId, productId],
    function (err) {
      if (err) {
        console.error("Ошибка при удалении товара из корзины:", err);
        return res.status(500).send("Ошибка сервера");
      }
      res.redirect("/cart");
    },
  );
});

// Маршрут для обновления количества товара в корзине
app.post("/cart/update", (req, res) => {
  const { productId, quantity } = req.body;
  const userId = req.session.user.id;

  // Обновите количество указанного товара в корзине пользователя
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
