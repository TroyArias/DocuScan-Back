import express from 'express';
const authRouter = express.Router();
import {login, logout} from "../controllers/authController.js";

authRouter.post('/login', login);
authRouter.post('/logout', logout)

export default authRouter;