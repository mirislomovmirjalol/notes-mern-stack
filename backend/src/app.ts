import "dotenv/config";
import express, {NextFunction, Request, Response} from "express";
import notesRouter from "./routes/api/notes";
import usersRouter from "./routes/api/users";
import morgan from "morgan";
import createHttpError, {isHttpError} from "http-errors";
import cors from "cors";
import env from "./util/validateEnv";
import session from "express-session";
import MongoStore from "connect-mongo";

const app = express();

const corsOptions = {
    origin: env.FRONTEND_URL,
    optionsSuccessStatus: 200
}


app.use(cors(corsOptions));
app.use(morgan("dev"));
app.use(express.json());

app.use(session({
    secret: env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60,
        secure: false,
        httpOnly: true,
    },
    rolling: true,
    store: MongoStore.create({
        mongoUrl: env.MONGO_CONNECTION_STRING
    }),
}));

app.use("/api/notes", notesRouter);
app.use("/api/users", usersRouter);

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
