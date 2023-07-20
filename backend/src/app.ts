import "dotenv/config";
import express, {NextFunction, Request, Response} from "express";
import notesRouter from "./routes/api/notes";
import morgan from "morgan";
import createHttpError, {isHttpError} from "http-errors";
import cors from "cors";
import env from "./util/validateEnv";

const app = express();

const corsOptions = {
    origin: env.FRONTEND_URL,
    optionsSuccessStatus: 200
}


app.use(cors(corsOptions));
app.use(morgan("dev"));
app.use(express.json());

app.use("/api/notes", notesRouter);

app.use((req, res, next) => {
    next(createHttpError(404, "Endpoint not found"));
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
    console.error(error);
    let errorMessage = "An error occurred";
    let statusCode = 500;
    if (isHttpError(error)) {
        statusCode = error.statusCode;
        errorMessage = error.message;
    }
    res.status(statusCode).json({error: errorMessage});

})

export default app;
