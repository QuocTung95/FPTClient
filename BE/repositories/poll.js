import { print, OutputType } from '../helpers/print.js';
import { Poll } from '../models/index.js';
import Exception from '../helpers/exceptions.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';

const createPoll = async ({ author, title, votes, description = '' }) => {
  try {
    if (votes.length < 2) {
      throw new Exception(Exception.AT_LEAST_2_OPTION);
    }
    const poll = await Poll.create({
      author,
      title,
      description,
      votes,
    });
    return poll;
  } catch (exception) {
    if (!!exception.errors) {
      //error from validations
      throw new Exception('Input error', exception.errors);
    }
  }
};

const updatePoll = async (req) => {
  const { _id, votes, author, idVoted } = req.body;
  const userId = req.dataUser._id;
  const poll = await Poll.findById(_id);
  if (poll.author.toString() === userId) {
    throw new Exception(Exception.OWNER_CAN_NOT_VOTE);
  } else {
    poll.votes.forEach((item, index) => {
      if (item.voters.includes(userId)) {
        throw new Exception(Exception.ALREADY_VOTE);
      }
      if (item._id.toString() === idVoted) {
        item.voters.push(userId);
      }
    });

    await poll.save();
    return poll;
  }
};

const getAllVoterById = async ({ pollId, voteId }) => {
  try {
    // const users = await Poll.findById(id);
    const vote = await Poll.aggregate([
      { $match: { _id: new mongoose.Types.ObjectId(pollId) } }, // Lọc bản ghi với pollId mong muốn
      { $unwind: '$votes' }, // Tách mỗi đối tượng trong mảng votes thành các bản ghi riêng
      { $match: { 'votes._id': new mongoose.Types.ObjectId(voteId) } }, // Lọc lại để chỉ lấy đối tượng với voteId mong muốn
    ]);
  } catch (exception) {
    if (!!exception.errors) {
      //error from validations
      throw new Exception('Input error', exception.errors);
    }
  }
};

const getAll = async ({ page, size, searchString }) => {
  //aggregate data for all students
  page = parseInt(page);
  size = parseInt(size);

  let filteredStudents = await Poll.aggregate([
    {
      $match: {
        $or: [
          {
            title: { $regex: `.*${searchString}.*`, $options: 'i' }, //ignore case
          },
        ],
      },
    },
    { $skip: (page - 1) * size },
    { $limit: size },
  ]);
  return filteredStudents;
};

export default {
  createPoll,
  updatePoll,
  getAllVoterById,
  getAll,
};
