const express = require('express');
const path = require('path');
const { syncAndSeed, models } = require('./db');
const { Category, Product } = models

const app = express();


syncAndSeed()

app.get('/app.js', (req, res, next) => res.sendFile(path.join(__dirname, 'dist', 'main.js')));
app.get('/', (req, res, next) => res.sendFile(path.join(__dirname, 'index.html')));

app.get('/api/categories', async (req, res, next) => {

    const _categories = await Category.findAll({
        include: [
            {
                model: Product
            }
        ]
    })
    res.send(_categories);
    next();
})

app.post('/api/categories', async (req, res, next) => {
    const newCategory = await Category.createCategory();
    res.send(newCategory);
})

app.post('/api/categories/:id/products', async (req, res, next) => {
    const parentCategory = await Category.findOne({ where: { id: req.params.id }});
    const childProduct = await parentCategory.createProduct();
    res.send(childProduct);
})

const PORT = process.env.port || 3000;

app.listen(PORT, () => {
    console.log(`Listening on ${PORT}`);
});