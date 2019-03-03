const Sequelize = require('sequelize');
const conn = new Sequelize(process.env.DATABASE_URL);

const faker = require('faker');

const Category = conn.define('category', {
    name: Sequelize.STRING
})

const Product = conn.define('product', {
    name: Sequelize.STRING
})

Product.belongsTo(Category);

Category.createCategory = function() {
    return this.create({ name: faker.commerce.department()});
}

Category.prototype.createProduct = function() {
    return Product.create({ name: faker.commerce.productName(), categoryId: this.id});
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
        const [ _fakerCategories, _fakerProducts ] = [ await getFakerData('category', 2), await getFakerData('product', 1) ];
        const [ createdCategories, createProducts ] = await Promise.all(
            _fakerCategories.map(category => Category.create({ name: category })),
            _fakerProducts.map(product => Product.create({ name: product }))
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