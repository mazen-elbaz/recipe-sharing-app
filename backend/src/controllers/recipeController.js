const Recipe = require('../models/recipeModel');

const createRecipe = async (req, res,next) => {
  try {
    const recipe = new Recipe({ ...req.body, owner: req.user.id });
    await recipe.save();
    res.status(201).json(recipe);
  } catch (error) {
    next(error);
  }
};

const updateRecipe = async (req, res,next) => {
  try {
    const id = req.params.id;
    const recipe = await Recipe.findByIdAndUpdate(id, req.body, { returnDocument: 'after' });
    if (!recipe) {
      return res.status(404).json({ message: 'Recipe not found' });
    }
    res.json(recipe);
  } catch (error) {
    next(error);
  }
};

const deleteRecipe = async (req, res,next) => {
  try {
    const id = req.params.id;
    const recipe = await Recipe.findByIdAndDelete(id);
    if (!recipe) {
      return res.status(404).json({ message: 'Recipe not found' });
    }
    res.json({ message: 'Recipe deleted successfully' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createRecipe,
  updateRecipe,
  deleteRecipe,
};
