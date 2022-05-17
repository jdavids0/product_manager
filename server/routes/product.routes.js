const ProductController = require('../controllers/product.controller');

// ***** ROUTES *****
module.exports = app => {
    console.log("here");
    app.get('/api/products', ProductController.findAllProducts);
    app.post('/api/products', ProductController.createProduct);
    app.get('/api/products/random', ProductController.findRandomProduct);
    app.get('/api/products/:id', ProductController.findOneProduct);
    app.put('/api/products/:id', ProductController.updateProduct);
    app.delete('/api/products/:id', ProductController.deleteProduct);
}