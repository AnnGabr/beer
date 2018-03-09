import React, {Component} from 'react';

export default class Drawer extends Component {
    render() {
        return (
            <div style={{height: '200px', width: '200px', color: 'green', display: (this.props.isOpened)? 'block' : 'none'}}>
                Im drawer.
            </div>
        )
    }
}