export const isAdmin = (req, res, next) => {
    if (req.user.role !== 'Admin') {
      return res.status(403).json({ message: 'Admin access required' });
    }
    next();
  };
  