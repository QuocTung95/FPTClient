import mongoose, { Schema, ObjectId } from 'mongoose';

export default mongoose.model(
  'Poll',
  new Schema(
    {
      id: { type: ObjectId },
      author: {
        type: ObjectId,
        ref: 'User',
      },
      title: {
        type: String,
        required: true,
        validate: {
          validator: (value) => value.length > 3,
          message: 'Title must be at least 3 characters',
        },
      },
      description: {
        type: String,
        required: false,
      },
      votes: [
        {
          option: String,
          voters: [{ type: ObjectId, ref: 'User' }],
        },
      ],
    },
    {
      timestamps: true,
    }
  )
);
