import React, { Component } from 'react';
import List from './List'
import axios from 'axios';

class App extends Component{
    constructor() {
        super()
        this.state = {
            categories: []
        };
    }
    componentDidMount() {
        axios.get('/api/categories')
        .then( response => response.data)
        .then( categories => this.setState({ categories }));
    }
    render(){
        const { categories } = this.state;
        return (
            <div>
                <h1>Dan's Acme Categories and Products by faker</h1>
                <span> <List categories={categories} /> </span>
            </div>
        );
    }
}

export default App;
