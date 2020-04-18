import React from 'react';
import './item.css';

export class Item extends React.Component {
    constructor(props) {
        super(props);
        this.item = props.obj
    }

    render() {
        return (
            <div className="item" id={this.item.id}>
                {this.item.name}
            </div>
        )
    }
}
