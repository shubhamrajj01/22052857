export const CACHE_TTL = 60 * 5; // 5 minutes
export const API_BASE_URL = process.env.API_BASE_URL || 'http://20.244.56.144/social-media-api';

// Updated to use the token you received
export const AUTH_CONFIG = {
  tokenType: 'Bearer',
  accessToken: process.env.AUTH_TOKEN || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiZXhwIjoxNzQzNjA0MzE5LCJpYXQiOjE3NDM2MDQwMTksImlzcyI6IkFmZm9yZG1lZCIsImp0aSI6IjRhNGRhMmFhLTkxMjMtNGU3NC04ZWU5LWUzMmE4ZDQ2NGFjZSIsInN1YiI6IjIyMDUyODA0QGtpaXQuYWMuaW4ifSwiZW1haWwiOiIyMjA1MjgwNEBraWl0LmFjLmluIiwibmFtZSI6ImFycHJlZXQgbWFoYWxhIiwicm9sbE5vIjoiMjIwNTI4MDQiLCJhY2Nlc3NDb2RlIjoibndwd3JaIiwiY2xpZW50SUQiOiI0YTRkYTJhYS05MTIzLTRlNzQtOGVlOS1lMzJhOGQ0NjRhY2UiLCJjbGllbnRTZWNyZXQiOiJWS011UktWQ2RSQmZNZmZLIn0.nHIEJw-AIDImKzNtNZHLxdJByEgXmMZ8K46mP1ZiZcA",
  expiresAt: process.env.TOKEN_EXPIRY || 1743604319 
};