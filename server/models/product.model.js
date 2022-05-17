const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema ({
    title: {
        type: String,
        required: [true, 'Title is required!'],
        minlength: [3, 'Title must be at least 3 characters long'],
    },

    description: {
        type: String,
        required: [true, 'Description is required!'],
        minlength: [10, 'Description must be at least 10 characters long']
    },

    price: {
        type: Number,
        min: [0, 'Price cannot be negative!']
    }
})

const Product = mongoose.model('Product', ProductSchema)

module.exports = Product;