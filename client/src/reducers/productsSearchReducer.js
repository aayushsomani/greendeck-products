import {
    LOADING,
    FETCH_PRODUCTS
} from '../actions/types';

const initialState = {
    products: [],
    loading: false,
};

export default function (state = initialState, action) {
    switch (action.type) {
        case FETCH_PRODUCTS:
            return {
                ...state,
                products: action.payload,
                loading: false
            };
        case LOADING:
            return {
                ...state,
                loading: true
            };
        default:
            return state;
    }
}