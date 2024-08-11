import express from 'express';
import { auth } from 'express-openid-connect';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.set('view engine', 'ejs');

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log(err));

// Auth0 Configuration
const config = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.AUTH0_SECRET,
  baseURL: process.env.AUTH0_BASEURL,
  clientID: process.env.AUTH0_CLIENTID,
  issuerBaseURL: process.env.AUTH0_ISSUERBASEURL,
  routes: {
    login: false,
    logout: false,
    postLogoutRedirect: '/',
  },
};

// Middleware
app.use(auth(config));
app.use(express.urlencoded({ extended: false }));
app.use(express.static('views'));

// Routes
import indexRoutes from './routes/index.js';
import dashboardRoutes from './routes/dashboard.js';
import contractRoutes from './routes/contract.js';

app.use('/', indexRoutes);
app.use('/dashboard', dashboardRoutes);
app.use('/contract', contractRoutes);



// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
