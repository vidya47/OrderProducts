const express = require('express');
const { process_params } = require('express/lib/router');
const fs = require('fs'); // require file system object
const app = express();

// Add Access Control Allow Origin headers
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  });

// Endpoint to get a list of products
app.get('/order/products', (req, res) => {
    fs.readFile(__dirname + "/" + "products.json", "utf8", (err, data) => res.send(data));
});

// Endpoint to get individual product
app.get('/order/products/:id', (req,res) => {
    fs.readFile(__dirname + "/" + "products.json", "utf8", (err, data) => {
        const prods = JSON.parse(data);
        const prod = prods.find(p => p.productId === req.params.id);
        if (!prod) res.status(404).send('The product with given id was not found!');
        res.send(prod);
    });
});

// PORT
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));