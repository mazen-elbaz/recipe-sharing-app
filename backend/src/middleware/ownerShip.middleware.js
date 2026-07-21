const recipeModel = require("../models/recipeModel");
const ownerShipMiddleware = async (req, res, next) => {
    try {
        const myId = req.user.id;
        const recipeId = req.params.id;
        const recipe =  await recipeModel.findById(recipeId);
        if (!recipe) {
            return res.status(404).json({ error: 'Recipe not found.' });
        }
        if (myId !== recipe.owner.toString()) {
            return res.status(403).json({ error: 'Access denied. You do not have permission to perform this action.' });
        }
        req.recipe = recipe; // Attach the recipe to the request object for further use
        next(); 
    } catch (err) {
        next(err);
    }
};

module.exports = ownerShipMiddleware;