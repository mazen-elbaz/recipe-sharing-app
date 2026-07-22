const express = require('express');
const router = express.Router();
const recipeController = require('../controllers/recipeController');
const ownerShipMiddleware = require('../middleware/ownerShip.middleware');

router.post('/recipes',recipeController.createRecipe);
router.put('/recipes/:id',ownerShipMiddleware, recipeController.updateRecipe);
router.delete('/recipes/:id', ownerShipMiddleware, recipeController.deleteRecipe);
router.get('/recipes/:id',recipeController.getRecipeById);
router.get('/recipes', recipeController.getAllRecipe)

module.exports = router;