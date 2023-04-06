import * as mongoose from 'mongoose';

export const User = new mongoose.Schema({
    id: Number,
    name: String,
    last_name: String,
    hash: String,
    avatar: String,
})

export interface User {
    id: Number,
    name: String,
    last_name: String,
    hash: String,
    avatar: String,
  }