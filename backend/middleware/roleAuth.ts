
import { Response, NextFunction } from 'express';

export const isTeacher = (req: any, res: Response, next: NextFunction) => {
  if (!req.user) {
    return res.status(401).json({ error: "Unauthorized: No token provided" });
  }

  const role = req.user.role;

  if (role !== 'teacher' && role !== 'admin') {
    return res.status(403).json({ 
      error: "Access Denied: You do not have permission to perform this action. Teacher role required." 
    });
  }

  next();
};
