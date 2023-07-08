import { NextFunction, Request, Response } from "express";
import express from "express";
const router = express.Router();
import jwt from "jsonwebtoken";

const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.sendStatus(401);
  }

  jwt.verify(token, "test", (err, user) => {
    if (err) {
      return res.sendStatus(403);
    }
    next();
  });
};

router.use(authenticateToken);
// router.get("/guide",.....)
// router.post("/guide",.....)
export default router
