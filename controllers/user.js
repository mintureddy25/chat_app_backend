const express = require('express');
const { verifyToken } = require('../middleware/middleware');
const app = express();


app.get('/:userId', verifyToken, async (req, res) => {

    const userId = req.params.userId;
    
    



});

module.exports = app;