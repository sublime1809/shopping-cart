import React from 'react';
import { FaShoppingCart } from 'react-icons/fa';
import { Item } from '../items/item.js';
import './shopping-cart.css';

export class ShoppingCart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            expanded: false
        };
    }

    onUpdateQuantity(itemId, quantity) {
        this.props.onUpdateQuantity(itemId, quantity);
    }

    render() {
        var itemsList = [];
        var itemCount = 0;
        if (this.props.cart && Object.keys(this.props.cart.items).length > 0) {
            for (var itemId in this.props.cart.items) {
                const itemInfo = this.props.cart.items[itemId];
                itemsList.push(<div className="cart-list" key={itemId}>
                    <p>Item: {itemInfo.item.name}</p>
                    <p>Count: <input type="text" value={itemInfo.quantity} onChange={e => this.onUpdateQuantity(itemId, e.target.value)} /></p>
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
                    this.state.expanded
                    ? <div className="cart-overlay" >
                        {itemsList}
                    </div>
                    : null
                }
            </div>
        );
    }
}
