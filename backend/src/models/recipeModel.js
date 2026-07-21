const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
  title: {type: String,required: [true, 'Title is required']},
  description: {type: String},
  ingredients: {type: [String],required: [true, 'Ingredients are required']},
  steps: {type: [String],required: [true, 'Steps are required']},
  category: {type: String,enum: [
        "Breakfast",
        "Main Course",
        "Dessert",
        "Appetizer",
        "Salad",
        "Soup",
        "Beverage",
        "Snack"],
        required: [true, 'Category is required']},
  cookTime: {type: Number, min: [0, 'Cook time must be a positive number']},
  imageUrl: {type: String},
  owner: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
},{timestamps: true}
);


module.exports = mongoose.model('Recipe', recipeSchema);