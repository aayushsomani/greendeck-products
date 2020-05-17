import {
    FETCH_PRODUCTS,
    LOADING
} from './types';
import axios from 'axios';


export const fetchProducts = input => dispatch => {
    let params = {
        "filters": []
    }
    let { option, discount, searchBy, stockAvailable } = input
    if (option && discount) {
        params["filters"].push({ key: "discount", value: discount, operator: option })
    }
    if (searchBy) {
        params["filters"].push({ key: "brand", value: searchBy, operator: "contains" })
    }
    if (stockAvailable) {
        params["filters"].push({ key: "stock_available", value: stockAvailable, operator: "equal" })
    }
    axios
        .post("/api/products/filter", params)
        .then(response => {
            let payload = response.data
            dispatch({
                type: FETCH_PRODUCTS,
                payload
            })
        }
        )
        .catch(err => console.log(err));
};

export const setLoading = () => {
    return {
        type: LOADING
    };
};