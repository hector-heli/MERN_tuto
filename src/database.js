const mongoose = require('mongoose');

const URI = 'mongodb+srv://hectorheli:student@cluster0.cgsri.mongodb.net/compromiso_db?retryWrites=true&w=majority'

mongoose.connect(URI)
.then(db => console.log('database is connected'))
.catch(err => console.error(err));

module.exports = mongoose;
