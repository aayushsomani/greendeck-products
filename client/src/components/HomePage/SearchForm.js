import React, { Component } from 'react';
import {
    Input,
    Button
} from "reactstrap"
import "./homepage.css"
import { connect } from 'react-redux';
import _ from "lodash"
import {
    fetchProducts,
    setLoading
} from '../../actions/productsSearchActions';

export class SearchForm extends Component {
    state = {
        option: null,
        discount: null,
        searchBy: null,
        stockAvailable: null
    }
    componentDidMount() {
        this.props.fetchProducts(this.state);
    }
    handleOptions = (e) => {
        this.setState({
            option: e.target.value
        })
    }
    handleSearchBy = (e) => {
        this.setState({
            searchBy: e.target.value
        })
    }
    handleStockAvailablity = (e) => {
        this.setState({
            stockAvailable: e.target.value
        })
    }
    onChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
        if (e.target.name === 'searchBy') {
            if (e.target.value.length > 0) {
                this.throttleSubmit(e)
            }
        }
    };
    throttleSubmit = _.debounce((e) => {
        e.preventDefault();
        this.props.fetchProducts(this.state);
        this.props.setLoading();
    }, 500)
    onSubmit = e => {
        e.preventDefault();
        this.props.fetchProducts(this.state);
        this.props.setLoading();
    };

    render() {
        return (
            <>
                <form id="searchForm" style={{ "width": "-webkit-fill-available" }} onSubmit={this.onSubmit}>
                    <div class="fakeimg" style={{ "height": "60px" }}>
                        <select onChange={this.handleOptions} class="custom-select" id="inputGroupSelect01">
                            <option disabled selected hidden value={null}>Option</option>
                            <option value="greater_than">Greater Than</option>
                            <option value="smaller_than">Smaller Than</option>
                            <option value="equal">Equal</option>
                        </select>
                        <Input type="number" placeholder="Discount" className="form-control" onChange={this.onChange} name="discount" />
                    </div><br></br>
                    <div class="fakeimg" style={{ "height": "60px" }}>
                        <Input type="search" placeholder="Search by Brand" className="form-control" onChange={this.onChange} name="searchBy" />
                    </div><br></br>
                    <div class="fakeimg" style={{ "height": "60px" }}>
                        <select onChange={this.handleStockAvailablity} class="custom-select" id="inputGroupSelect02">
                            <option disabled selected hidden value="">Stock Available</option>
                            <option value={true}>True</option>
                            <option value={false}>False</option>
                        </select>
                    </div><br></br>
                    <div class="fakeimg" style={{ "height": "60px" }}>
                        <Button block size="lg" type="submit" color="success">Search</Button>
                    </div>
                </form>
            </>
        );
    }
}

const mapStateToProps = state => ({
    text: state.productsData.text
});

export default connect(
    mapStateToProps,
    { fetchProducts, setLoading }
)(SearchForm);