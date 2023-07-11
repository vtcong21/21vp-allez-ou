const mongoose = require('mongoose');

const provinceSchema = new mongoose.Schema({
    key: {type: String, require : true, unique : true},
    name: {type: String}
});


const Province = mongoose.model('Province', provinceSchema);
module.exports = Province;