import React, { Component } from 'react';

export class MovieCard extends Component {
    render() {
        const { product } = this.props;
        return (
            <div id="moviecard" className="col-md-3 mb-5">
                <div className="card text-center card-body h-100">
                    <img className="w-100 mb-3" src="https://www.pngitem.com/pimgs/m/219-2195024_mannequin-fashion-design-icon-hd-png-download.png" alt="Product Cover" />
                    <h6 className="card-title">
                        {product.name}
                    </h6>
                </div>
            </div>
        );
    }
}

export default MovieCard;