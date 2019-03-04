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
                    <li class="panel panel-body" key={id}>
                        {name}
                            <ProductList products={getProducts(id)} destroyProduct={destroyProduct} />
                                    <button class="btn btn-primary" onClick={() => createProduct(id)}>+</button>
                                    <button class="btn btn-danger" onClick={() => destroyCategory(id)}>-</button>
                    </li>
                    )
                )
            }
        </ul>
    )
}

export default List;
