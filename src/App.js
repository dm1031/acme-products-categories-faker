import React, { Component } from 'react';
import List from './List'
import axios from 'axios';

class App extends Component{
    constructor() {
        super()
        this.state = {
            categories: [],
            products: []
        };
        this.createCategory = this.createCategory.bind(this);
        this.createProduct = this.createProduct.bind(this);
        this.destroyCategory = this.destroyCategory.bind(this);
        this.destroyProduct = this.destroyProduct.bind(this);
    }

    createCategory() {
        axios.post('/api/categories')
        .then( response => response.data)
        .then( newCategory => {
            const categories = this.state.categories;
            categories.push(newCategory);
            this.setState( { categories })
        });
    }

    createProduct(id) {
        axios.post(`/api/categories/${id}/products`)
        .then( response => response.data)
        .then( newProduct => {
            const categories = this.state.categories;
            const products = this.state.products;
            products.push(newProduct);
            this.setState( { categories, products });
        })
    }

    destroyCategory(id) {
        axios.delete(`api/categories/${id}`)
        .then( () => {
            let categories = this.state.categories;
            categories = categories.filter( category => category.id !== id)

            let products = this.state.products;
            products = products.filter( product => product.categoryId !== id)

            this.setState({ categories, products });
        })
    }

    destroyProduct(id) {
        axios.delete(`api/products/${id}`)
        .then( () => {
            let products = this.state.products;
            products = products.filter( product => product.id !== id)

            this.setState({ products });
        })
    }

    componentDidMount() {
        axios.get('/api/categories')
        .then( response => response.data)
        .then( ({ categories, products })  => this.setState({ categories, products }));
    }

    render(){
        const { categories, products } = this.state;
        const { createCategory, createProduct, destroyCategory, destroyProduct } = this;
        
        return (
            <div className="container">
                <h2>Acme Categories and Products <i>by Dan</i></h2>
                    <button class ="btn btn-primary" onClick={ createCategory }>Create Category</button>
                        <div className="pt-2">
                            <span> 
                                <List
                                    categories={categories}
                                    products={products}
                                    createProduct={createProduct}
                                    destroyCategory={destroyCategory}
                                    destroyProduct={destroyProduct}
                                />
                            </span>
                        </div>
            </div>
        );
    }
}

export default App;
