import React from 'react';

export class ShoppingCart extends React.Component {
    constructor(props) {
        super(props);
        this.state {
            expanded: false;
        };
    }

    addItem(item) {
        this.props.contents.push(item);
    }

    save() {
         const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title: 'React POST Request Example' })
        };
        // TODO: expand the id to be dynamic if more carts. Right now, hardcode.
        fetch('http://localhost:5000/cart/' + '0', requestOptions)
            .then(response => response.json())
            .then(data => this.setState({ postId: data.id }));
    }

    render() {
        if (this.state.expanded) {
            itemList =
            return (
                <div>
                    <p>Items</p>
                    ({this.props.cart ? this.props.cart.items.length : 0})
                </div>
            );
        } else {
            return (
                <div>
                    Im a shopping cart! ({this.props.cart ? this.props.cart.items.length : 0})
                </div>
            );
        }
    }
}
