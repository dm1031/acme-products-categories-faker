import React from 'react';

const ProductList = ({ products, destroyProduct }) => {
    return (
        <ul>
            {
                products.map( (product) => {
                    return (
                        <li key={product.id}>
                            {product.name}
                                    <button class="btn btn-danger" onClick={() => destroyProduct(product.id)}>-</button>
                        </li>
                        )
                    }
                )
            }
        </ul>
    )
}
export default ProductList;
