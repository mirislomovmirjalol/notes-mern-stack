import {InferSchemaType, model, Schema} from "mongoose";

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 100,
        unique: true
    },
    email: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 1000,
        unique: true
    },
    password: {
        type: String,
        minlength: 1,
        maxlength: 1000
    },
});

type User = InferSchemaType<typeof userSchema>;

export default model<User>("User", userSchema);
