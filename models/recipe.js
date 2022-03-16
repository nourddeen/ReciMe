const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const recipeSchema = new Schema({
    name: { type: String, required: true },
    meat: { type: String, required: false },
    vegetables: { type: String, required: false },
    spices: { type: String, required: false },
    img: { data: Buffer, contentType: String, required: false },
    user: {type: Schema.Types.ObjectId, ref: 'User'}
}, { timestamps: true })

const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;