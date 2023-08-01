const mongoose = require('mongoose');

const provinceSchema = new mongoose.Schema({
    code: { type: String, required: true, unique: true },
    name: { type: String }
});

const Province = mongoose.model('Province', provinceSchema);

module.exports = Province;
