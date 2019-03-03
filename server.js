const express = require('express');
const path = require('path');
const { syncAndSeed, models } = require('./db');
const { Category, Product } = models

const app = express();


syncAndSeed()

app.get('/app.js', (req, res, next) => res.sendFile(path.join(__dirname, 'dist', 'main.js')));
app.get('/', (req, res, next) => res.sendFile(path.join(__dirname, 'index.html')));

app.get('/api/categories', async (req, res, next) => {
    const _categories = await Category.findAll()
    res.send(_categories);
    next();
})

const PORT = process.env.port || 3000;

app.listen(PORT, () => {
    console.log(`Listening on ${PORT}`);
});