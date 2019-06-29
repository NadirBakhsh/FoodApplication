import React, { Component } from 'react';
import './Stylecss/card.css'

class Card extends Component {

    constructor(props) {
        super(props);
        this.state = {

        }
    }

    

    render() {
        return (
            <div>
                <div className="container">
                    <article className="card">
                        <a href="#" className="card__link">

                            <img style={{ width: '100%', height: "220px" }}
                                src={this.props.imgUrl} />

                            <div className="card__header">
                                <h3 className="card__header-title">{this.props.dishName}</h3>
                                <p className="card__header-meta">

                                    {this.props.price}
        
                                    {this.props.addToCard}
                                </p>



                            </div>

                        </a>
                    </article>
                </div>
            </div>
        );
    }
}

export default Card;