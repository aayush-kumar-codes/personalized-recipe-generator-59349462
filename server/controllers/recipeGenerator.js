const Recipe = require('../models/Recipe');
const Ingredient = require('../models/Ingredient');

exports.generateRecipe = async (req, res) => {
    const { ingredients } = req.body;

    if (!ingredients || !Array.isArray(ingredients) || ingredients.length === 0) {
        return res.status(400).json({ error: 'Invalid ingredients input' });
    }

    try {
        const availableIngredients = await Ingredient.find({ name: { $in: ingredients } });

        if (availableIngredients.length === 0) {
            return res.status(404).json({ error: 'No matching ingredients found' });
        }

        const recipeSuggestions = await Recipe.find({
            ingredients: { $all: availableIngredients.map(ing => ing._id) }
        });

        if (recipeSuggestions.length === 0) {
            return res.status(404).json({ message: 'No recipes found for the given ingredients' });
        }

        return res.status(200).json(recipeSuggestions);
    } catch (error) {
        console.error('Error generating recipe:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};