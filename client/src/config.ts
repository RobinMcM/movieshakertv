// In production, use relative path since frontend is served from same origin as backend
// In development, use localhost
export const API_URL = import.meta.env.VITE_API_URL || (import.meta.env.PROD ? '' : 'http://localhost:3000');

