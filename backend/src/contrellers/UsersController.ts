import {RequestHandler} from "express";
import createHttpError from "http-errors";
import bcrypt from "bcrypt";
import UserModel from "../models/User";

interface SignupRequest {
    username?: string;
    password?: string;
    email?: string;
}

export const signup: RequestHandler<unknown, unknown, SignupRequest, unknown> = async (req, res, next) => {
    const username = req.body.username;
    const email = req.body.email;
    const passwordRaw = req.body.password;

    try {
        if (!username || !email || !passwordRaw) {
            throw createHttpError(400, "Parameters missing");
        }

        const existingUserName = await UserModel.findOne({username: username}).exec();
        if (existingUserName) {
            throw createHttpError(409, "Username already exists");
        }

        const existingEmail = await UserModel.findOne({email: email}).exec();
        if (existingEmail) {
            throw createHttpError(409, "Email already exists");
        }

        const password = await bcrypt.hash(passwordRaw, 10);

        const newUser = await UserModel.create({
            username: username,
            email: email,
            password: password
        });

        req.session.userId = newUser._id;
        res.status(201).json(newUser);
    } catch (e) {
        next(e);
    }
}

interface LoginRequest {
    username?: string;
    password?: string;
}

export const login: RequestHandler<unknown, unknown, LoginRequest, unknown> = async (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;

    try {
        if (!username || !password) {
            throw createHttpError(400, "Parameters missing");
        }

        const user = await UserModel.findOne({username: username}).select("+password +email").exec();
        if (!user) {
            throw createHttpError(404, "User not found");
        }

        const passwordValid = await bcrypt.compare(password, user.password!);
        if (!passwordValid) {
            throw createHttpError(401, "Invalid password");
        }

        req.session.userId = user._id;
        res.status(200).json(user);
    } catch (e) {
        next(e);
    }
}
