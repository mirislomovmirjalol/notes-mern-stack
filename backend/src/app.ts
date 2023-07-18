import "dotenv/config";
import express, {NextFunction, Request, Response} from "express";
import {Error} from "mongoose";
import notesRouter from "./routes/api/notes";
const app = express();

app.use(express.json());
app.use((req: Request, res: Response, next: NextFunction) => {
    console.log("url: " + req.originalUrl);
    console.log("method: " + req.method + "\n");
    next();
});

app.use("/api/notes", notesRouter);

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
