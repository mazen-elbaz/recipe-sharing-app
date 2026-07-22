const express = require('express');
const router = express.Router();
const recipeController = require('../controllers/recipeController');
const authMiddleware = require('../middleware/auth.middleware');
const ownerShipMiddleware = require('../middleware/ownerShip.middleware');

router.post('/recipes', authMiddleware, recipeController.createRecipe);
router.put('/recipes/:id', authMiddleware, ownerShipMiddleware, recipeController.updateRecipe);
router.delete('/recipes/:id', authMiddleware, ownerShipMiddleware, recipeController.deleteRecipe);
router.get('/recipes/mine', authMiddleware, recipeController.getMyRecipes);
router.get('/recipes/:id',recipeController.getRecipeById);
router.get('/recipes', recipeController.getAllRecipe)

module.exports = router;
