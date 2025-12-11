-- Seed script to create dummy user account
-- Email: ms
-- Password: movie
-- Role: admin

-- Note: Replace the password_hash below with the bcrypt hash of "movie"
-- You can generate it using: node -e "const bcrypt = require('bcryptjs'); bcrypt.hash('movie', 10).then(h => console.log(h))"

-- If the user already exists, this will fail with a unique constraint error (which is fine)
INSERT INTO users (email, password_hash, role)
VALUES (
  'ms',
  '$2b$10$CC1jPkwNJahat4yPWO.1xecv4ysxSDi5SwEcJVAhIRzjf.We2xbN2', -- bcrypt hash of "movie"
  'admin'
)
ON CONFLICT (email) DO NOTHING;

