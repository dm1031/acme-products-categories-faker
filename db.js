const Sequelize = require('sequelize');
const conn = new Sequelize(process.env.DATABASE_URL);

const faker = require('faker');

const Category = conn.define('category', {
    name: Sequelize.STRING
})

const Product = conn.define('product', {
    name: Sequelize.STRING,
    price: Sequelize.DECIMAL(10, 2)
})

Product.belongsTo(Category);
Category.hasMany(Product);

Category.createCategory = function() {
    return this.create({ name: faker.commerce.department()});
}

Category.prototype.createProduct = function() {
    return Product.create({
        name: faker.commerce.productName(),
        price: Math.floor(Math.random() * 10) + Math.round(Math.random() * 100) / 100,
        categoryId: this.id
    });
}


const getFakerData = (dataType, count = 5) => {
    const _fakerData = [];

    while (_fakerData.length < count) {
        if (dataType === 'category') {
            _fakerData.push(faker.commerce.department());
        }
        else if (dataType === 'product') {
            _fakerData.push(faker.commerce.productName());
        }
    }
    return _fakerData;
}


const syncAndSeed = () => {
    return conn.sync({force: true})
    .then( async () => {
        const fakerCategories = await getFakerData('category', 2);
        const createdCategories = await Promise.all(
            fakerCategories.map(category => Category.create({ name: category }))
        )
    })
}


module.exports = {
    syncAndSeed,
    models: {
        Category,
        Product
    }
}