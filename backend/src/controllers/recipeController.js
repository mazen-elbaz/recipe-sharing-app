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

const getRecipeById=async(req,res,next)=> {
  try{
    const {id}=req.params;
    const recipe =await Recipe.findById(id).populate('owner','username');
    if(!recipe){
      return res.status(404).json({message:'Recipe not found'});

    }
    const formattedRecipe={
      _id:recipe._id,
      title:recipe.title,
      description:recipe.description||'',
      ingredients:recipe.ingredients,
      steps:recipe.steps,
      category:recipe.category,
      cookTime:recipe.cookTime,
      imageUrl: recipe.imageUrl ||null,
      owner:recipe.owner 
      ? {
         _id:recipe.owner._id,
         username: recipe.owner.username,
         
      }
      :null,
      createdAt:recipe.createdAt,
    };
    res.status(200).json(formattedRecipe);
  }catch(error){
    next(error);
  }

};

const getMyRecipes = async (req, res, next) => {
  try {
    const recipes = await Recipe.find({ owner: req.user.id });
    res.status(200).json(recipes);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createRecipe,
  updateRecipe,
  deleteRecipe,
  getRecipeById,
  getMyRecipes
};
