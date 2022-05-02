const mongoose = require('mongoose');
const { Schema } = mongoose;

const SupportMaterialSchema = new Schema({
    url: String
});

module.exports = mongoose.model('SupportMaterial', SupportMaterialSchema);