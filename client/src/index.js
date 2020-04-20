import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { FaShoppingCart } from 'react-icons/fa';
import { Item } from './items/item.js';

class Store extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cart: null,
            availableItems: [],
            cartExpanded: false
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
        const items = this.state.cart.items;
        let quantity = 0;
        if (items[item.item.id] != null) {
            quantity = items[item.item.id].quantity + 1;
        } else {
            quantity = 1;
        }
        console.log('added: ', items);
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ quantity: quantity })
        };
        fetch('http://localhost:8000/cart/' + this.state.cart.id + '/item/' + item.item.id, requestOptions)
        .then(res => res.json())
        .then((data) => {
            console.log('new cart: ', data);
            this.setState({cart: data});
        });
    }

    updateQuantity(itemId) {
        const quantity = this.state.cart.items[itemId].quantity;
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ quantity: parseInt(quantity) })
        };
        fetch('http://localhost:8000/cart/' + this.state.cart.id + '/item/' + itemId, requestOptions)
        .then(res => res.json())
        .then((data) => {
            this.setState({cart: data});
        });
    }

    handleChange(itemId, event) {
        console.log(itemId);
        const item = this.state.cart.items[itemId]
        item.quantity = event.target.value;
        const cart = this.state.cart;
        cart.items[itemId] = item;
        this.setState({cart: cart});
      }

    render() {
        const itemsList = this.state.availableItems.map((item) =>
            <a onClick={() => this.addToCart({item})}><Item key={item.id} id={item.id} obj={item} /></a>
        )
        return (
            <div className="store">
                <div className="header">
                    <div className="shopping-cart">
                        {this.renderCart()}
                    </div>
                </div>
                <div className="items">
                    {itemsList}
                </div>
            </div>
        );
    }

    toggleExpand() {
        this.setState({cartExpanded: !this.state.cartExpanded});
    }

    renderCart() {
        var itemsList = [];
        var itemCount = 0;
        if (this.state.cart && Object.keys(this.state.cart.items).length > 0) {
            for (const itemId in this.state.cart.items) {
                console.log(itemId + ' in ', this.state.cart);
                const itemInfo = this.state.cart.items[itemId];
                itemsList.push(<div className="cart-list" key={itemId}>
                    <p>Item: {itemInfo.item.name}</p>
                    <p>Count: <input type="text" value={itemInfo.quantity} onChange={(e) => this.handleChange(itemId, e)} onBlur={() => this.updateQuantity(itemId)} /></p>
                </div>);
                itemCount += (1 * itemInfo.quantity);
            }
        };
        return (
            <div>
                <p>
                    <FaShoppingCart onClick={() => this.toggleExpand()}/>
                    ( {itemCount} )
                </p>
                {
                    this.state.cartExpanded
                    ? <div className="cart-overlay" >
                        {itemsList}
                    </div>
                    : null
                }
            </div>
        );
    }
}

// ========================================

ReactDOM.render(
  <Store />,
  document.getElementById('root')
);
