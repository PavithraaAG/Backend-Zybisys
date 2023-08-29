

const express = require('express');
const passport = require('passport');
const router = express.Router();
const User = require('../models/user');
const authController = require('../controllers/authController'); 


router.post('/register', authController.registerUser);


router.post('/login', authController.loginUser);


router.get('/logout', authController.logoutUser);


router.get('/profile', authController.getProfile);

module.exports = router;


router.post('/register', (req, res) => {
    const { username, password } = req.body;

    User.register(new User({ username }), password, (err, user) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: err.message });
        }
        passport.authenticate('local')(req, res, () => {
            res.json({ message: 'Registration successful' });
        });
    });
});


router.post('/login', passport.authenticate('local'), (req, res) => {
    res.json({ message: 'Login successful', user: req.user });
});


router.get('/logout', (req, res) => {
    req.logout();
    res.json({ message: 'Logout successful' });
});


function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.status(401).json({ error: 'Unauthorized' });
}


router.get('/profile', isLoggedIn, (req, res) => {
    res.json({ message: 'This is a protected route', user: req.user });
});

module.exports = router;
