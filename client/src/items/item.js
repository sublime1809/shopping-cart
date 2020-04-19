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
                <div className="item-title">{this.item.name}</div>
                <img className="item-picture" src={this.item.src} />
            </div>
        )
    }
}
