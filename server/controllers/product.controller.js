const Product = require('../models/product.model')

// create a new product
module.exports.createProduct = (req, res) =>{
    Product.create(req.body)
        .then(newProduct => {
            res.json({results: newProduct})
        })
        .catch(err =>{
            res.json({msg: "Something went wrong", error: err})
        })
}

// find all products
module.exports.findAllProducts = (req, res) => {
    Product.find()
        .then(allProducts=>{
            res.json({results: allProducts})
        })
        .catch(err =>{
            res.json({msg: "Something went wrong", error: err})
        })
}

// find a random product
module.exports.findRandomProduct = (req, res) => {
    // .exec() is just saying execute a function after .count()
    Product.count().exec( (err, count) => {
        let random = Math.floor(Math.random() * count);
        Product.findOne().skip(random)
        .then(ranProduct => res.json({results: ranProduct}))
        .catch(err => res.json({msg: 'Something went wrong', error: err}))
    })
}

// find one product
module.exports.findOneProduct = (req, res) => {
    Product.find({_id: req.params.id})
        .then(oneProduct => res.json({results: oneProduct}))
        .catch(err =>{
            res.json({msg: "Something went wrong", error: err})
        })
}

// update a product
module.exports.updateProduct = (req, res) => {
    Product.findOneAndUpdate(
        {_id: req.params.id},
        req.body,
        {new: true, runValidators: true}
    )
        .then(updatedProduct => {
            res.json({results: updatedProduct})
        })
        .catch(err =>{
            res.json({msg: "Something went wrong", error: err})
        })
}

// delete a product
module.exports.deleteProduct = (req, res) =>{
    Product.deleteOne({_id: req.params.id})
        .then(deletedProduct =>{
            res.json({results: deletedProduct})
        })
        .catch(err =>{
            res.json({msg: "Something went wrong", error: err})
        })
}

