import { auth as auth } from 'express-openid-connect';
import dotenv from 'dotenv';

dotenv.config();

export const authMiddleware = auth({
  authRequired: false,
  auth0Logout: true,
  secret: process.env.AUTH0_SECRET,
  baseURL: process.env.AUTH0_BASEURL,
  clientID: process.env.AUTH0_CLIENTID,
  issuerBaseURL: process.env.AUTH0_ISSUERBASEURL
});

export default authMiddleware;

