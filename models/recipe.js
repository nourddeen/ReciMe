const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const recipeSchema = new Schema({
    name: { type: String, required: true },
    ingredients: { type: String, required: true },
    isVegan: { type:Boolean},
    img: {type: String},
    user: {type: Schema.Types.ObjectId, ref: 'User'}
}, { timestamps: true })

const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;