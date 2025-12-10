const express = require('express');
const router = express.Router();
const Recipe = require('../models/Recipe');

// Middleware to check if user is authenticated
const isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    return res.status(401).json({ message: 'Unauthorized' });
};

// Save a recipe
router.post('/save', isAuthenticated, async (req, res) => {
    const { recipeId } = req.body;
    if (!recipeId) {
        return res.status(400).json({ message: 'Recipe ID is required' });
    }

    try {
        const recipe = await Recipe.findById(recipeId);
        if (!recipe) {
            return res.status(404).json({ message: 'Recipe not found' });
        }

        req.user.savedRecipes.push(recipeId);
        await req.user.save();
        return res.status(200).json({ message: 'Recipe saved successfully' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error' });
    }
});

// Share a recipe
router.post('/share', isAuthenticated, async (req, res) => {
    const { recipeId, userId } = req.body;
    if (!recipeId || !userId) {
        return res.status(400).json({ message: 'Recipe ID and User ID are required' });
    }

    try {
        const recipe = await Recipe.findById(recipeId);
        if (!recipe) {
            return res.status(404).json({ message: 'Recipe not found' });
        }

        // Logic to share the recipe with another user
        // This could involve sending an email or a notification
        // For simplicity, we will just return a success message
        return res.status(200).json({ message: 'Recipe shared successfully', recipe });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;