import express from 'express';
import documentRouter from './routes/documentRouter.js';
import authRouter from './routes/authRouter.js';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(express.json())
app.use("/document", documentRouter);
app.use("/auth", authRouter);

app.listen( process.env.PORT || 3000, function () {console.log("Server running")});
