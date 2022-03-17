const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const recipeSchema = new Schema({
    name: { type: String, required: true },
    meat: { type: String, default: false },
    vegetables: { type: String, default: false },
    spices: { type: String, default: false },
    image: { type: String },
    user: {type: Schema.Types.ObjectId, ref: 'User'},
    isVegan: {type: Boolean, default: false },
}, { timestamps: true })

const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;