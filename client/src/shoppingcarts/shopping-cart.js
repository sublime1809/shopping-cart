import React from 'react';
import { FaShoppingCart } from 'react-icons/fa';
import { Item } from '../items/item.js';

export class ShoppingCart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            expanded: false
        };
    }

    save() {
         const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title: 'React POST Request Example' })
        };
        // TODO: expand the id to be dynamic if more carts. Right now, hardcode.
        fetch('http://api:8000/cart/', requestOptions)
            .then(response => response.json())
            .then(data => this.setState({ postId: data.id }));
    }

    toggleExpand() {
        this.setState({expanded: !this.state.expanded});
    }

    save() {

    }

    render() {
        if (this.state.expanded) {
            var items = {};
            var itemsList = [];
            for (var i in this.props.cart.items) {
                const item = this.props.cart.items[i].item;
                if (items[item.id] == null) {
                    items[item.id] = {item: item, quantity: 1};
                } else {
                    items[item.id].quantity = items[item.id].quantity + 1;
                }
            }
            if (Object.keys(items).length > 0) {
                for (var itemId in items) {
                    const itemInfo = items[itemId];
                    itemsList.push(<li key={itemId}>
                        <p>Count: {itemInfo.quantity}</p><Item id={itemId} obj={itemInfo.item} />
                    </li>);
                }
            };
            return (
                <div>
                    <p>
                        Items ({this.props.cart ? this.props.cart.items.length : 0})
                        <FaShoppingCart onClick={() => this.toggleExpand()}/>
                    </p>
                    {itemsList}
                </div>
            );
        } else {
            return (
                <div>
                    Im a shopping cart! ({this.props.cart ? this.props.cart.items.length : 0})
                    <FaShoppingCart onClick={() => this.toggleExpand()}/>
                </div>
            );
        }
    }
}
