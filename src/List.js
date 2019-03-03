import React from 'react';
import ProductList from './ProductList';

const List = ({ categories, products, createProduct }) => {
console.log(products)
    const getProducts = (id) => {
        return products.reduce( (acc, product) => {
            if (product.categoryId === id) {
                acc.push(product)
            }
            return acc;
        }, [])
    }

    return (
        <ul>
            {
                categories.map( ({ id, name }) =>
                    <li key={id}>
                        {name}
                            <ProductList products={getProducts()} />
                                <button onClick={() => createProduct(id)}>+</button>
                    </li>
                )
            }
        </ul>
    )
}

export default List;
