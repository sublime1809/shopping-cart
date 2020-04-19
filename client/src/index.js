import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Item } from './items/item.js';
import { ShoppingCart } from './shoppingcarts/shopping-cart.js';

class Store extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cart: null,
            availableItems: []
        }
        fetch('http://localhost:8000/item/')
        .then(res => res.json())
        .then((data) => {
            this.setState({availableItems: data.items});
        });
        fetch('http://localhost:8000/cart/')
        .then(res => res.json())
        .then((data) => {
            this.setState({cart: data});
        });
    }

    addToCart(item) {
        console.log('adding: ', item);
        const items = this.state.cart.items.concat(item);
        const cart = this.state.cart;

        cart.items = items;
        this.setState({cart: cart});
    }

    render() {
        const itemsList = this.state.availableItems.map((item) =>
            <Item key={item.id} id={item.id} obj={item} onClick={() => this.addToCart({item})} />
        )
        return (
            <div className="store">
                <div className="shopping-cart">
                    <ShoppingCart cart={this.state.cart} />
                </div>
                <div className="items">
                    {itemsList}
                </div>
            </div>
        );
    }
}

// ========================================

ReactDOM.render(
  <Store />,
  document.getElementById('root')
);
