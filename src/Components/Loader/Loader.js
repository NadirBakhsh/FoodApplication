
import React, { Component } from 'react';
import './loader.css'

class Loader extends Component {
render() {
        return (
            <span className="lds-bg">
                <div className="lds-roller">
                    <div></div><div></div><div>
                    </div><div></div><div></div>
                    <div></div><div></div><div>
                    </div></div>
            </span>
        );
    }
}

export default Loader;