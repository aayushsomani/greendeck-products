import React, { Component } from 'react';
import { connect } from 'react-redux';
import NoResult from "../Layout/NoResult"
import MovieCard from './MovieCard';

export class MoviesContainer extends Component {
    render() {
        const { products } = this.props;
        let productsArray = null;
        productsArray =
            (products.length > 0)
                ? products.map((product, index) => (
                    <MovieCard key={index} product={product} />
                ))
                : <NoResult />;
        return (
            <div className="row">
                {productsArray}
            </div>
        );
    }
}

const mapStateToProps = state => ({
    products: state.productsData.products
});

export default connect(mapStateToProps)(MoviesContainer);