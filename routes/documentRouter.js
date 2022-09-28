import express from 'express';
const documentRouter = express.Router();
import {getDocument} from "../controllers/controller.js";

documentRouter.get('/getDoc', getDocument);

export default documentRouter;