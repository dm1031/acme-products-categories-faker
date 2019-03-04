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
        <ul className="list-group">
            {
                categories.map( ({ id, name }) =>
                    (
                        <li className="list-group-item" key={id}>
                            {name}
                                <div className="clearfix">
                                    <span className="float-right">
                                        <button class="mb-4 btn btn-primary" onClick={() => createProduct(id)}>+</button>
                                        <button class="mb-4 btn btn-danger" onClick={() => destroyCategory(id)}>-</button>
                                    </span>
                                </div>
                        
                        <ProductList
                            products={getProducts(id)}
                            destroyProduct={destroyProduct}
                        />
                        
                        </li>
                    )
                )
            }
        </ul>
    )
}

export default List;
