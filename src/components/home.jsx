import React, { Component } from 'react';




export default class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            home: false
        }
        this.showDisplay = this.showDisplay.bind(this);
    }

    showDisplay() {
        this.setState({
            home: !this.state.home
        });
    }

    render() {
        return (
            <div>Arun
                <button onClick={this.showDisplay}>Click</button>
                <div>Arunsadfssa
                </div>
            </div>
        )
    }
}