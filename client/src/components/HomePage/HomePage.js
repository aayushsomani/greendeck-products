import React, { Component } from 'react';

import { connect } from 'react-redux';

import SearchForm from './SearchForm';
import MoviesContainer from './MoviesContainer';
import Spinner from '../Layout/Spinner';
import "./homepage.css";

export class HomePage extends Component {
    render() {
        const { loading } = this.props;
        return (
            <div>
                <div class="navbar">
                    <a href="/">HOME</a>
                </div>
                <div class="row">
                    <div class="side">
                        <SearchForm />
                    </div>
                    <div class="main">
                        {loading ? <Spinner /> : <MoviesContainer />}
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    loading: state.productsData.loading
});

export default connect(mapStateToProps)(HomePage);