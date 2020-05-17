const express = require("express")
const router = express.Router()
const ndjson = require('ndjson')
const fs = require('fs')

//Product Model
const Product = require("../../models/Product")

// @route GET api/products/filter
// @desc  GET all filtered products
// @access public
router.post("/filter", (req, res) => {
    let filters = req.body.filters
    let filterTOPass = {}
    for (index in filters) {
        let filter = filters[index]
        switch (filter.key) {
            case 'discount':
                switch (filter.operator) {
                    case "greater_than":
                        filterTOPass["discount"] = { $gt: filter.value }
                        break;
                    case "smaller_than":
                        filterTOPass["discount"] = { $lt: filter.value }
                        break;
                    default:
                        filterTOPass["discount"] = { $eq: filter.value }
                }
                break;
            case 'brand':
                switch (filter.operator) {
                    case 'contains':
                        filterTOPass[filter.key + ".name"] = { $regex: new RegExp(filter.value), "$options": new RegExp("i") }
                        break;
                }
                break;
            case 'stock_available':
                switch (filter.operator) {
                    case 'equal':
                        filterTOPass["stock.available"] = filter.value
                }
            default:
                break;
        }
    }
    Product.find(filterTOPass).limit(52)
        .then(item => res.json(item))
})

// @route POST api/products/add
// @desc  add products form json 
// @access public
// only use this api onces
router.post("/add", (req, res) => {
    fs.createReadStream('./data.json')
        .pipe(ndjson.parse())
        .on('data', function (obj) {
            const newProduct = Product(
                {
                    "name": obj.name,
                    "brand": obj.brand,
                    "price": obj.price,
                    "stock": obj.stock,
                    "discount": ((obj.price.regular_price.value - obj.price.offer_price.value) / obj.price.regular_price.value) * 100,
                    "created_at": {
                        "date": obj.created_at.$date
                    }
                }
            );
            newProduct.save();
        })
})

module.exports = router;
