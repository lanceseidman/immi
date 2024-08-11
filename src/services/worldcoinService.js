import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const WORLDCOIN_API_URL = 'https://id.worldcoin.org';

export const getAuthorizationUrl = (redirectUri) => {
  const params = new URLSearchParams({
    client_id: process.env.WORLDCOIN_CLIENT_ID,
    response_type: 'code',
    scope: 'openid email profile',
    redirect_uri: redirectUri,
  });
  return `${WORLDCOIN_API_URL}/authorize?${params.toString()}`;
};

export const exchangeCodeForToken = async (code, redirectUri) => {
  try {
    const response = await axios.post(`${WORLDCOIN_API_URL}/token`, new URLSearchParams({
      code,
      grant_type: 'authorization_code',
      redirect_uri: redirectUri,
    }), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Basic ${Buffer.from(`${process.env.WORLDCOIN_CLIENT_ID}:${process.env.WORLDCOIN_CLIENT_SECRET}`).toString('base64')}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error('Failed to exchange code for token');
  }
};

export const getUserInfo = async (accessToken) => {
  try {
    const response = await axios.post(`${WORLDCOIN_API_URL}/userinfo`, null, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error('Failed to get user info');
  }
};