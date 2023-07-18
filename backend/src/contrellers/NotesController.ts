import NoteModel from "../models/Note";
import {RequestHandler} from "express";

export const getNotes: RequestHandler = async (req, res, next) => {
    try {
        const notes = await NoteModel.find().exec();
        res.status(200).json(notes);
    } catch (err) {
        next(err);
    }
}

export const createNote: RequestHandler = async (req, res, next) => {
    const {title, text} = req.body;
    try {
        const newNote = await NoteModel.create({
            title: title,
            text: text
        });
        res.status(201).json(newNote);
    } catch (err) {
        next(err);
    }
}
