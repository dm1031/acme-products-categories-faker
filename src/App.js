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

    componentDidMount() {
        axios.get('/api/categories')
        .then( response => response.data)
        .then( categories => this.setState({ categories }));
    }

    render(){
        const { categories, products } = this.state;
        const { createCategory, createProduct } = this;
        return (
            <div>
                <h1>Dan's Acme Categories and Products by faker</h1>
                <button onClick={ createCategory }>Create Category</button>
                <span> <List categories={categories} products={products} createProduct={createProduct} /> </span>
            </div>
        );
    }
}

export default App;
