import {Schema, model, InferSchemaType} from "mongoose";

const NoteSchema = new Schema({
    title: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 100
    },
    text: {
        type: String,
        minlength: 1,
        maxlength: 1000
    },
},
{ timestamps: true });

type Note = InferSchemaType<typeof NoteSchema>;

export default model<Note>("Note", NoteSchema);
