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
  const user = users.find((user) => user.name === name && user.pass === pass);
  if (user) {
    req.session.user = user;
    res.redirect("/dashboard");
  } else {
    res.send("Неверный логин или пароль");
  }
});

// Маршрут для страницы регистрации
app.get("/register", (req, res) => {
  res.render("register");
});

// Маршрут для обработки запроса на регистрацию
app.post("/register", (req, res) => {
  const { name, pass } = req.body;

  // Проверяем, существует ли уже пользователь с таким именем
  if (users.some((user) => user.name === name)) {
    return res.send("Пользователь с таким логином уже существует");
  }

  // Добавляем нового пользователя в массив
  users.push({ name, pass });

  // В реальном приложении здесь будет код добавления пользователя в базу данных

  // После успешной регистрации перенаправляем пользователя на другую страницу
  res.redirect("/login");
});

// Защищаем маршруты, доступ к которым должен быть только для авторизованных пользователей
app.get("/dashboard", (req, res) => {
  if (req.session.user) {
    res.send(`Добро пожаловать, ${req.session.user.name}`);
  } else {
    res.redirect("/login");
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
