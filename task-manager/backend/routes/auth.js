const express = require('express');
const router = express.Router();
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const User = require('../models/User');
const keys = require('../config/keys');

// Passport Google OAuth setup
passport.use(new GoogleStrategy({
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    callbackURL: "/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    // Find or create a user in your database
    User.findOne({ googleId: profile.id }, (err, existingUser) => {
      if (err) return done(err);
      if (existingUser) return done(null, existingUser);

      // If no user exists, create a new user
      const newUser = new User({
        googleId: profile.id,
        name: profile.displayName,
        email: profile.emails[0].value
      });

      newUser.save((err) => {
        if (err) return done(err);
        return done(null, newUser);
      });
    });
  }
));

// Google OAuth route
router.get('/google', passport.authenticate('google', {
  scope: ['profile', 'email']
}));

// Google OAuth callback route
router.get('/google/callback', passport.authenticate('google'), (req, res) => {
  res.redirect('/'); // Redirect to home or another route after successful login
});

module.exports = router;
