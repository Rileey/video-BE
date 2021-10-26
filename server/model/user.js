import { Schema, model } from "mongoose";
const userSchema = new Schema({
    name: {
        type: String,
    },
    avatar: {
        type: String,
    },
    public_id: {
        type: String,
    },
}, {timestamps: true});

module.exports = model('User', userSchema)