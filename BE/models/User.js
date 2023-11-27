import mongoose, { Schema, ObjectId } from 'mongoose';
import isEmail from 'validator/lib/isEmail.js';
export default mongoose.model(
  'User',
  new Schema(
    {
      id: { type: ObjectId },
      name: {
        type: String,
        required: true, //NOT NULL
        unique: true,
        validate: {
          validator: (value) => value.length > 3,
          message: 'Username must be at least 3 characters',
        },
      },
      email: {
        type: String,
        unique: true,
        validate: {
          validator: (value) => isEmail,
          message: 'Email is incorrect format',
        },
      },
      password: {
        //hashed/encrypted password
        type: String,
        required: true,
        //validate ??
      },
      polls: [{ type: ObjectId, ref: 'Poll' }],
    },
    {
      timestamps: true,
    }
  )
);
