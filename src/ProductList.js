import React from 'react';

const ProductList = ({ products }) => {
    console.log(products)
    return (
        <ul>
            {products.map( (product) => {
                return (
                <li>
                    {product.name}
                </li>
                )
            })}
        </ul>
    )
}




export default ProductList;