import { print, OutputType } from '../helpers/print.js';
import { User } from '../models/index.js';
import Exception from '../helpers/exceptions.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const login = async ({ email, password }) => {
  let existingUser = await User.findOne({ email }).exec();
  if (existingUser) {
    let isMatch = await bcrypt.compare(password, existingUser.password);
    if (!!isMatch) {
      //create Java Web Token
      let token = jwt.sign(
        {
          dataUser: existingUser,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: '30 days',
        }
      );
      return {
        ...existingUser.toObject(),
        password: 'not show',
        token: token,
      };
    } else {
      throw new Exception(Exception.WRONG_EMAIL_AND_PASSWORD);
    }
  } else {
    throw new Exception(Exception.WRONG_EMAIL_AND_PASSWORD);
  }
};

const register = async ({ name, email, password, phoneNumber, address }) => {
  const existingEmail = await User.findOne({ email }).exec();
  if (existingEmail) {
    throw new Exception(Exception.EMAIL_UNIQUE);
  }

  const hashedPassword = await bcrypt.hash(password, parseInt(process.env.SALT_ROUNDS));
  //insert to db
  const newUser = await User.create({
    name,
    email,
    password: hashedPassword,
    address,
  });
  return {
    ...newUser._doc,
    password: 'Not show',
  };
};

const getAll = async ({ page, size, searchString }) => {
  //aggregate data for all students
  page = parseInt(page);
  size = parseInt(size);

  let filteredStudents = await User.aggregate([
    {
      $match: {
        $or: [
          {
            name: { $regex: `.*${searchString}.*`, $options: 'i' }, //ignore case
          },
          {
            email: { $regex: `.*${searchString}.*`, $options: 'i' }, //ignore case
          },
          {
            address: { $regex: `.*${searchString}.*`, $options: 'i' }, //ignore case
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
  login,
  register,
  getAll,
};
