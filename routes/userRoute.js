import express from "express";
import { getUserById, getUsers, register,login } from "../controllers/UserController.js";
const router = express.Router();

router.get("/users",getUsers)
router.get("/users/:id",getUserById)
router.post("/register",register)
router.post("/login",login)
export default router;