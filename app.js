// Modules imports
const express = require('express');
const morgan = require('morgan')

// Routes
const typeRoutes = require('./src/routes/typeRoutes');
const pokemonRoutes = require('./src/routes/pokemonRoutes');
const userRoutes = require('./src/routes/userRoutes')

// Application
const app = express();

// Application configuration
app
    .use(morgan('dev'))
    .use(express.urlencoded({extended: false}))
    .use(express.json())

// Set routes
app
    .use('/api/pokemons', pokemonRoutes)
    .use('/api/types', typeRoutes)
    .use('/api/user', userRoutes)


module.exports = app;