import express from 'express';
import User from '../models/User.js';

const router = express.Router();

router.get('/', (req, res) => {
  if (req.oidc.isAuthenticated()) {
    return res.redirect('/dashboard');
  }
  res.sendFile('home.html', { root: './views' });
});

router.post('/signup', (req, res) => {
  // Handle signup logic here
});

router.get('/login', (req, res) => {
  res.oidc.login({ returnTo: '/dashboard' });
});

router.get('/logout', (req, res) => {
  // This will log the user out of Auth0 and redirect them to the home page
  res.oidc.logout({ returnTo: '/' });
});

router.get('/callback', (req, res) => {
  if (req.oidc.isAuthenticated()) {
    // Store user in MongoDB
    const { sub, email, name } = req.oidc.user;
    
    User.findOne({ auth0Id: sub }, (err, existingUser) => {
      if (err) return console.log(err);
      if (!existingUser) {
        const newUser = new User({ auth0Id: sub, email, fullName: name });
        newUser.save((err) => {
          if (err) return console.log(err);
          console.log('User saved to MongoDB');
        });
      }
    });

    res.redirect('/dashboard');
  } else {
    res.redirect('/');
  }
});


export default router;