import React, { useState } from 'react';

const IngredientInput = ({ onAddIngredient }) => {
    const [ingredient, setIngredient] = useState('');
    const [dietaryPreference, setDietaryPreference] = useState('');
    const [error, setError] = useState('');

    const handleIngredientChange = (e) => {
        setIngredient(e.target.value);
    };

    const handleDietaryPreferenceChange = (e) => {
        setDietaryPreference(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!ingredient || !dietaryPreference) {
            setError('Both fields are required.');
            return;
        }
        setError('');
        onAddIngredient({ ingredient, dietaryPreference });
        setIngredient('');
        setDietaryPreference('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="ingredient">Ingredient:</label>
                <input
                    type="text"
                    id="ingredient"
                    value={ingredient}
                    onChange={handleIngredientChange}
                    required
                />
            </div>
            <div>
                <label htmlFor="dietaryPreference">Dietary Preference:</label>
                <select
                    id="dietaryPreference"
                    value={dietaryPreference}
                    onChange={handleDietaryPreferenceChange}
                    required
                >
                    <option value="">Select...</option>
                    <option value="vegan">Vegan</option>
                    <option value="vegetarian">Vegetarian</option>
                    <option value="gluten-free">Gluten-Free</option>
                    <option value="none">None</option>
                </select>
            </div>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <button type="submit">Add Ingredient</button>
        </form>
    );
};

export default IngredientInput;