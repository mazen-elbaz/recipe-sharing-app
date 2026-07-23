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

const getRecipeById = async (req, res, next) => {
  try {
    const { id } = req.params;

   
    if (!id || id.length !== 24) {
      return res.status(400).json({ message: 'Invalid Recipe ID format' });
    }

    const recipe = await Recipe.findById(id).populate('owner', 'username');

    if (!recipe) {
      return res.status(404).json({ message: 'Recipe not found' });
    }

    const formattedRecipe = {
      _id: recipe._id,
      title: recipe.title,
      description: recipe.description || '',
      ingredients: recipe.ingredients || [],
      steps: recipe.steps || [],
      category: recipe.category,
      cookTime: recipe.cookTime,
      imageUrl: recipe.imageUrl || null,
      owner: (recipe.owner && recipe.owner._id)
        ? {
            _id: recipe.owner._id,
            username: recipe.owner.username || 'Unknown',
          }
        : null,
      createdAt: recipe.createdAt,
    };

    return res.status(200).json(formattedRecipe);
  } catch (error) {
    console.error('Error in getRecipeById:', error);
   
    return res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
};

  const getAllRecipe=async(req,res,next)=>{
    try{
      const recipes=await Recipe.find().populate('owner');
      const formattedRecipes=recipes.map(recipe=>({
        _id:recipe._id,
        title:recipe.title,
        description:recipe.description||'',
        ingredients:recipe.ingredients,
        steps:recipe.steps,
        category:recipe.category,
        cookTime:recipe.cookTime,
        imageUrl:recipe.imageUrl||null,
        owner:recipe.owner
        ?{
          _id:recipe.owner._id,
          username:recipe.owner.username || 'Unknown',
        }
        :null,
        createdAt:recipe.createdAt,
      }));
      res.status(200).json(formattedRecipes);
    }catch(error){
      next(error);
    }

};

const getMyRecipes = async (req, res, next) => {
  try {
    const recipes = await Recipe.find({ owner: req.user.id }).populate('owner', 'username');
    const formattedRecipes = recipes.map(recipe => ({
      _id: recipe._id,
      title: recipe.title,
      description: recipe.description || '',
      ingredients: recipe.ingredients,
      steps: recipe.steps,
      category: recipe.category,
      cookTime: recipe.cookTime,
      imageUrl: recipe.imageUrl || null,
      owner: recipe.owner
        ? {
          _id: recipe.owner._id,
          username: recipe.owner.username,
        }
        : null,
      createdAt: recipe.createdAt,
    }));
    res.status(200).json(formattedRecipes);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createRecipe,
  updateRecipe,
  deleteRecipe,
  getRecipeById,
  getAllRecipe,
  getMyRecipes
};
