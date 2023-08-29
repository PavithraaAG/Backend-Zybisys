const passport = require('passport');
const User = require('../models/User');


exports.registerUser = (req, res) => {
  const { username, password } = req.body;

  User.findOne({ username }, (err, existingUser) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    if (existingUser) {
      return res.status(400).json({ error: 'Username is already taken' });
    }

   
    const newUser = new User({ username });
    User.register(newUser, password, (err, user) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Internal Server Error' });
      }
      
      passport.authenticate('local')(req, res, () => {
        res.json({ message: 'Registration successful', user });
      });
    });
  });
};


exports.loginUser = (req, res, next) => {
  passport.authenticate('local', (err, user) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    if (!user) {
      return res.status(401).json({ error: 'Authentication failed' });
    }
    req.login(user, (err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Internal Server Error' });
      }
      res.json({ message: 'Login successful', user });
    });
  })(req, res, next);
};


exports.logoutUser = (req, res) => {
  req.logout();
  res.json({ message: 'Logout successful' });
};

