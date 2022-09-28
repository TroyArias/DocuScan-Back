import express from 'express';
import documentRouter from './routes/documentRouter.js';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(express.json())
app.use("/document", documentRouter);

app.listen(3000, function () {console.log("Server running")});