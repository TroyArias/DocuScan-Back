import express from 'express';
const documentRouter = express.Router();
import {getDocument, clearDocument} from "../controllers/documentController.js";

documentRouter.get('/getDoc', getDocument);
documentRouter.delete('/clearDoc', clearDocument);

export default documentRouter;