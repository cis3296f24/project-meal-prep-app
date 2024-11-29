require('dotenv').config();
const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors());
// Middleware to parse JSON data from requests
app.use(express.json());

// Create a MySQL database connection
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

db.connect((err) => {
    if (err) {
        console.error('Database connection error:', err);
        return;
    }
    console.log('Connected to MySQL database');
});

// Route to add a new recipe
app.post('/addRecipe', (req, res) => {
    const { name, description, ingredients, image } = req.body;

    // Check if all required fields are provided
    if (!name || !description || !ingredients || !image) {
        return res.status(400).json({ error: 'Please provide name, description, ingredients, and image URL' });
    }

    const query = 'INSERT INTO Recipes (recipe_name, recipe_description, recipe_image, ingredient_list) VALUES (?, ?, ?, ?)';
    db.query(query, [name, description, image, ingredients], (err, results) => {
        if (err) {
            console.error('Error inserting recipe:', err);
            res.status(500).json({ error: 'Failed to add recipe' });
            return;
        }
        res.status(201).json({ message: 'Recipe added successfully', id: results.insertId });
    });
});

// Route to delete a recipe by ID
app.delete('/deleteRecipe/:id', (req, res) => {
    const { id } = req.params;

    // Check if ID is provided
    if (!id) {
        return res.status(400).json({ error: 'Recipe ID is required' });
    }

    const query = 'DELETE FROM Recipes WHERE id = ?';
    db.query(query, [id], (err, results) => {
        if (err) {
            console.error('Error deleting recipe:', err);
            res.status(500).json({ error: 'Failed to delete recipe' });
            return;
        }

        // Check if a recipe was deleted
        if (results.affectedRows === 0) {
            return res.status(404).json({ error: 'Recipe not found' });
        }

        res.status(200).json({ message: 'Recipe deleted successfully' });
    });
});


// Updated Route to get all recipes with IDs
app.get('/recipes', (req, res) => {
    const query = 'SELECT id, recipe_name AS name, recipe_description AS description, recipe_image AS image, ingredient_list AS ingredients FROM Recipes';
    
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching recipes:', err);
            res.status(500).json({ error: 'Failed to retrieve recipes' });
            return;
        }
        res.status(200).json(results);
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
