import React from 'react';
import ProductList from './ProductList'

const List = ({ categories, products, createProduct, destroyCategory, destroyProduct }) => {

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
                    (
                    <li key={id}>
                        {name}
                            <ProductList products={getProducts(id)} destroyProduct={destroyProduct} />
                                <div>
                                    <button onClick={() => createProduct(id)}>+</button>
                                    <button onClick={() => destroyCategory(id)}>-</button>
                                </div>
                    </li>
                    )
                )
            }
        </ul>
    )
}

export default List;
