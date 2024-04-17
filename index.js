const express = require('express')
const path = require('path')
const database = require('./database')

// Инициализация базы данных
database.initializeDatabase()

const app = express()
const PORT = process.env.PORT || 3001

app.use(express.static(path.join(__dirname, 'views')))
app.set('view engine', 'pug')
app.set('views', path.join(__dirname, 'views'))

app.get('/', (req, res) => {
  database.getSaleProducts((err, products) => {
    if (err) {
      return res
        .status(500)
        .json({ error: 'Ошибка при получении товаров из базы данных' })
    }
    res.render('index', { products })
  })
})

app.get('/shop', (req, res) => {
  database.getAllProducts((err, products) => {
    if (err) {
      return res
        .status(500)
        .json({ error: 'Ошибка при получении товаров из базы данных' })
    }
    res.render('shop', { products })
  })
})

app.get('/office-shop', (req, res) => {
  database.getProductByCategory('office', (err, products) => {
    if (err) {
      return res
        .status(500)
        .json({ error: 'Ошибка при получении товаров из базы данных' })
    }
    res.render('shop', { products })
  })
})

app.get('/shool-shop', (req, res) => {
  database.getProductByCategory('shool', (err, products) => {
    if (err) {
      return res
        .status(500)
        .json({ error: 'Ошибка при получении товаров из базы данных' })
    }
    res.render('shop', { products })
  })
})

app.get('/art-shop', (req, res) => {
  database.getProductByCategory('art', (err, products) => {
    if (err) {
      return res
        .status(500)
        .json({ error: 'Ошибка при получении товаров из базы данных' })
    }
    res.render('shop', { products })
  })
})

app.get('/sale-shop', (req, res) => {
  database.getSaleProducts((err, products) => {
    if (err) {
      return res
        .status(500)
        .json({ error: 'Ошибка при получении товаров из базы данных' })
    }
    res.render('shop', { products })
  })
})

app.get('/contacts', (req, res) => {
  database.getAllProducts((err, products) => {
    if (err) {
      return res
        .status(500)
        .json({ error: 'Ошибка при получении товаров из базы данных' })
    }
    res.render('contacts', { products })
  })
})

app.get('/about-us', (req, res) => {
  database.getAllProducts((err, products) => {
    if (err) {
      return res
        .status(500)
        .json({ error: 'Ошибка при получении товаров из базы данных' })
    }
    res.render('about-us', { products })
  })
})

app.get('/product/:id', (req, res) => {
  const productId = req.params.id

  database.getProduct(productId, (err, product) => {
    if (err) {
      return res
        .status(500)
        .json({ error: 'Ошибка при получении товара из базы данных' })
    }

    if (!product) {
      return res.status(404).json({ error: 'Товар не найден' })
    }

    res.render('product', { product })
  })
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
