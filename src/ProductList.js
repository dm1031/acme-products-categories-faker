import React from 'react';

const ProductList = ({ products, destroyProduct }) => {
    return (
        <ul>
            {
                products.map( (product) => {
                    return (
                        <li key={product.id}>
                            {product.name}
                                <button onClick={() => destroyProduct(product.id)}>-</button>
                        </li>
                        )
                    }
                )
            }
        </ul>
    )
}
export default ProductList;
