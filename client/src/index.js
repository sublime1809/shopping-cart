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
            cartContents: [],
            availableItems: [
                {id: 0, src: 'https://image.shutterstock.com/image-photo/colorful-flower-on-dark-tropical-260nw-721703848.jpg'},
                {id: 1, src: 'https://miro.medium.com/max/1200/1*mk1-6aYaf_Bes1E3Imhc0A.jpeg'}
            ]
        }
        fetch('http://localhost:5000/item')
        .then(res => res.json())
        .then((data) => {
            this.setState({availableItems: data});
        });
        fetch('http://localhost:5000/cart')
        .then(res => res.json())
        .then((data) => {
            this.setState({cart: data[0]});
        });
    }

    addToCart(item) {
        const items = this.state.cart.items.concat(item);
        const cart = this.state.cart;

        cart.items = items;
        const updatedCart = this.state.cartContents.concat(item);
        console.log('cart: ', cart);
        this.setState({cartContents: updatedCart, cart: cart});
    }

    render() {
        console.log('rerender: ', this.state.cart)
        const itemsList = this.state.availableItems.map((item) =>
            <li key={item.id} onClick={() => this.addToCart({item})}>
                <Item id={item.id} obj={item} />
            </li>
        )
        return (
            <div className="store">
                <div className="shopping-cart">
                    <ShoppingCart cart={this.state.cart} contents={this.state.cartContents} />
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
