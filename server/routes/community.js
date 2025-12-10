const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const Recipe = mongoose.model('Recipe', new mongoose.Schema({
    title: { type: String, required: true },
    ingredients: { type: [String], required: true },
    instructions: { type: String, required: true },
    ratings: { type: [Number], default: [] },
    createdAt: { type: Date, default: Date.now }
}));

// Create a new recipe
router.post('/recipes', async (req, res) => {
    const { title, ingredients, instructions } = req.body;
    try {
        const recipe = new Recipe({ title, ingredients, instructions });
        await recipe.save();
        res.status(201).json(recipe);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Get all recipes
router.get('/recipes', async (req, res) => {
    try {
        const recipes = await Recipe.find();
        res.status(200).json(recipes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Rate a recipe
router.post('/recipes/:id/rate', async (req, res) => {
    const { rating } = req.body;
    if (rating < 1 || rating > 5) {
        return res.status(400).json({ message: 'Rating must be between 1 and 5' });
    }
    try {
        const recipe = await Recipe.findById(req.params.id);
        if (!recipe) {
            return res.status(404).json({ message: 'Recipe not found' });
        }
        recipe.ratings.push(rating);
        await recipe.save();
        res.status(200).json(recipe);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get average rating of a recipe
router.get('/recipes/:id/rating', async (req, res) => {
    try {
        const recipe = await Recipe.findById(req.params.id);
        if (!recipe) {
            return res.status(404).json({ message: 'Recipe not found' });
        }
        const averageRating = recipe.ratings.length > 0 ? (recipe.ratings.reduce((a, b) => a + b) / recipe.ratings.length).toFixed(2) : 0;
        res.status(200).json({ averageRating });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;