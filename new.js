const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/userDB', { useNewUrlParser: true, useUnifiedTopology: true });

// Schema and Model
const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String
});

const User = mongoose.model('User', userSchema);

// Route for form submission
app.post('/register', (req, res) => {
    const { username, email, password } = req.body;

    // Create and save new user
    const newUser = new User({ username, email, password });
    newUser.save((err) => {
        if (err) {
            res.send('Error saving user: ' + err);
        } else {
            res.send('Registration successful!');
        }
    });
});

// Start server
app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
