const express = require("express");
const mongoose = require("mongoose");
const path = require('path')
const app = express();
const products = require("./routes/api/products");
const config = require("config")
//body parser middleware
app.use(express.json());

//database configuration
const db = config.get("mongoURI");

//connection to Mongo using mongoose
mongoose.connect(db, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true })
    .then(() => console.log("mongodb connected"))
    .catch((err) => console.log(err))

//use routes
app.use("/api/products", products);

//server static resources if in production
if (process.env.NODE_ENV === 'production') {
    //set static folder
    console.log('/n/n/n\n\n\n', "IPRODUCTION")
    app.use(express.static(path.join('client', 'build')))
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname + '/client/build/index.html'))
    })
}
const port = process.env.PORT || 5000

app.listen(port, () => console.log("server started on port: ", port));

