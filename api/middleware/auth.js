import jwt from 'jsonwebtoken';

const auth = async (req, res, next) => {
  const authorization = req.get('authorization');
  const token = authorization && authorization.toLowerCase().startsWith('bearer ') ? authorization.substring(7) : null;

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    jwt.verify(token, process.env.JWT_SECRET, (error, user) => {
      if (error) {
        return res.status(403).json({ error: 'Invalid token' });
      }

      req.user = user;
      next();
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export default auth;
