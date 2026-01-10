require('dotenv').config();
const express = require('express');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/api/data', async (req, res) => {
    try {
        const response = await axios.get(`https://api.spoonacular.com/recipes/random?apiKey=${process.env.API_KEY}`, {
            headers: {
                'Authorization': `Bearer \${process.env.API_KEY}`
            }
        });
        res.json(response.data);
    } catch (error) {
        res.status(500).json({
            message: 'Error fetching data',
            error: error.message
        });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:\${PORT}`);
});