const express = require('express');
const router = express.Router();
const recipeController = require('../controllers/recipeController');
const ownerShipMiddleware = require('../middleware/ownerShip.middleware');
const verifyToken = require('../middleware/auth.middleware')

router.post('/recipes',recipeController.createRecipe);
router.put('/recipes/:id',ownerShipMiddleware, recipeController.updateRecipe);
router.delete('/recipes/:id', ownerShipMiddleware, recipeController.deleteRecipe);
router.get('/recipes/mine',verifyToken , recipeController.getMyRecipes);
module.exports = router;