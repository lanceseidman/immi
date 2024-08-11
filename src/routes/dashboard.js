import express from 'express';
import mongoose from 'mongoose';
import User from '../models/User.js';
// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log(err));

const router = express.Router();

router.get('/', async (req, res) => {
    console.log('Reached /dashboard route');

    try {
        const auth0Id = req.oidc.user.sub; // Get the Auth0 ID from the logged-in user
        console.log('Auth0 ID:', auth0Id);

        // Find the user in MongoDB using the Auth0 ID
        const user = await User.findOne({ auth0Id });
        console.log('User Data:', user);

        if (!user) {
            return res.render('dashboard', { message: 'No records found for this patient', user: null });
        }

        // If user and records exist, render the dashboard with patient data
        res.render('dashboard', { user });
    } catch (err) {
        console.error('Error fetching patient data:', err);
        res.status(500).send('Failed to fetch patient data.');
    }
});
router.post('/add-medical-record', async (req, res) => {
    console.log('Record trying to be added');
    const { fullName, medName, mg, frequency, prescriber, auth0Id } = req.body;

    console.log('Received Auth0 ID:', auth0Id); // Should log the full Auth0 ID

    try {
        const user = await User.findOne({ auth0Id }); // Lookup by Auth0 ID instead of _id
        if (!user) {
            console.log('User not found');
            return res.status(404).send('User not found');
        }

        // Add the medical record to the user's records
        user.medicalRecords.push({ medication: medName, dosage: mg, frequency: frequency, prescriber: prescriber });
        await user.save();

        res.status(200).send('Medical record added successfully.');
    } catch (err) {
        console.error('Error adding medical record:', err);
        res.status(500).send('Failed to add medical record.');
    }
});


// Route to view user information
router.get('/user-info', async (req, res) => {
    try {
        const user = req.user;
        res.status(200).json(user);
    } catch (err) {
        console.error('Error fetching user info:', err);
        res.status(500).send('Failed to fetch user info.');
    }
});

async function checkAndRegisterUser(req, res, next) {
    const auth0Id = req.oidc.user.sub;

    try {
        // Check if the user already exists in the MongoDB database
        let user = await User.findOne({ auth0Id });

        if (!user) {
            // If the user doesn't exist, create a new one
            const name = req.oidc.user.name || 'Unknown'; // Use the name from Auth0 or a default value
            const age = req.body.age || 0; // Default age; can be updated later
            user = new User({ auth0Id, name, age, medicalRecords: [] });
            await user.save();
        }

        // Attach the user to the request object
        req.user = user;
        next();
    } catch (err) {
        console.error('Error checking or registering user:', err);
        res.status(500).send('Failed to check or register user.');
    }
}

// Use this middleware for routes where user info is required
router.use(checkAndRegisterUser);

export default router;
