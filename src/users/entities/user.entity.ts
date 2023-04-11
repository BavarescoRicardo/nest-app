import * as mongoose from 'mongoose';

export const User = new mongoose.Schema({
    id: Number,
    email: String,
    first_name: String,
    last_name: String,
    avatar: String,
})

export interface User {
    id: Number,
    email: String,
    first_name: String,
    last_name: String,
    avatar: String,
  }
