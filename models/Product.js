const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ProductSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    brand: {
        name: {
            type: String,
        },
        sub_brand: {
            type: String,
        }
    },
    price: {
        offer_price: {
            value: {
                type: Number
            }
        },
        regular_price: {
            value: {
                type: Number
            }
        }
    },
    stock: {
        available: {
            type: Boolean,
            default: false
        }
    },
    discount: {
        type: Schema.Types.Decimal128,
        default: 0
    },
    created_at:
    {
        date: {
            type: Date,
            default: Date.now
        }
    }
});
module.exports = User = mongoose.model("Product", ProductSchema);
// mongodb+srv://aayush:somani@codehire-ggghz.mongodb.net/test?retryWrites=true&w=majority
// mongodb://localhost:27017/products