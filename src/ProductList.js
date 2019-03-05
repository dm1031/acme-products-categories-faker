import React from 'react';

const ProductList = ({ products, destroyProduct, updateCart }) => {
    return (
        <ul className="list-group">
            {
                products.map( (product) => {
                    return (
                        <li className="list-group-item" key={product.id}>
                            {product.name}
                                <div className="clearfix">
                                    <span className="float-right">
                                        <button class="mb-4 btn btn-success" onClick={() => updateCart(product.price)}>Buy</button>
                                        <button class="mb-4 btn btn-danger" onClick={() => destroyProduct(product.id)}>-</button>
                                    </span>
                                </div>
                        </li>
                        )
                    }
                )
            }
        </ul>
    )
}
export default ProductList;
