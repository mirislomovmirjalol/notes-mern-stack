import NoteModel from "../models/Note";
import {RequestHandler} from "express";
import createHttpError from "http-errors";
import mongoose from "mongoose";

export const getNotes: RequestHandler = async (req, res, next) => {
    try {
        const notes = await NoteModel.find().exec();
        res.status(200).json(notes);
    } catch (err) {
        next(err);
    }
}

interface CreateNoteRequest {
    title?: string;
    text?: string;
}

export const createNote: RequestHandler<unknown, unknown, CreateNoteRequest, unknown> = async (req, res, next) => {
    const {title, text} = req.body;
    try {
        if (!title) {
            throw createHttpError(400, "Title is required");
        }

        const newNote = await NoteModel.create({
            title: title,
            text: text
        });
        res.status(201).json(newNote);
    } catch (err) {
        next(err);
    }
}

export const getNote: RequestHandler = async (req, res, next) => {
    const id = req.params.id;
    try {
        if (!mongoose.isValidObjectId(id)) {
            throw createHttpError(400, "Invalid ID");
        }
        const note = await NoteModel.findById(id).exec();

        if (!note) {
            throw createHttpError(404, "Note not found");
        }
        res.status(200).json(note);
    } catch (err) {
        next(err);
    }
}

interface UpdateNoteParams {
    id: string;
}

interface UpdateNoteBody {
    title?: string;
    text?: string;
}

export const updateNote: RequestHandler<UpdateNoteParams, unknown, UpdateNoteBody, unknown> = async (req, res, next) => {
    const id = req.params.id;
    const newTitle = req.body.title;
    const newText = req.body.text;

    try {
        if (!mongoose.isValidObjectId(id)) {
            throw createHttpError(400, "Invalid ID");
        }

        if (!newTitle) {
            throw createHttpError(400, "Title is required");
        }

        const note = await NoteModel.findById(id).exec();

        if (!note) {
            throw createHttpError(404, "Note not found");
        }

        note.title = newTitle;

        if (newText) {
            note.text = newText;
        }

        const updatedNote = await note.save();

        res.status(200).json(updatedNote);
    } catch (err) {
        next(err);
    }
}

export const deleteNote: RequestHandler = async (req, res, next) => {
    const id = req.params.id;
    try {
        if (!mongoose.isValidObjectId(id)) {
            throw createHttpError(400, "Invalid ID");
        }

        const note = await NoteModel.findByIdAndDelete(id).exec();

        if (!note) {
            throw createHttpError(404, "Note not found");
        }

        await note.deleteOne();

        res.status(204).json();
    } catch (err) {
        next(err);
    }
}
