const mongoose = require('mongoose');
// const db_name = product_manager_db;

mongoose.connect(`mongodb+srv://root:root@cluster0.qj05l.mongodb.net/product_manager_db?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('Established a connection to the database'))
    .catch(err => console.log('Something went wrong when connecting to the database ', err));