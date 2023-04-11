import * as mongoose from 'mongoose';

export const Avatar = new mongoose.Schema({
    id: Number,
    avatar: String,
})

export interface Avatar {
    id: Number,
    avatar: String,
  }
