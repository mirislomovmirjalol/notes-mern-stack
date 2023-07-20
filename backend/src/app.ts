import "dotenv/config";
import express, {NextFunction, Request, Response} from "express";
import {Error} from "mongoose";
import notesRouter from "./routes/api/notes";
import morgan from "morgan";

const app = express();
app.use(morgan("dev"));
app.use(express.json());

app.use("/api/notes", notesRouter);

app.use((req, res, next) => {
    next(new Error("Not found"));
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
    console.error(error);
    let errorMessage = "An error occurred";
    if (error instanceof Error) {
        errorMessage = error.message;
    }
    res.status(500).json({error: errorMessage});

})

export default app;
