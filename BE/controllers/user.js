import { body, validationResult } from 'express-validator';
import { userRepository } from '../repositories/index.js';
import HttpStatusCode from '../helpers/httpStatus.js';
import { MAX_RECORDS } from '../helpers/constants.js';

const UserController = {
  login: async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(HttpStatusCode.BAD_REQUEST).json({
        errors: errors.array(),
      });
    }
    const { email, password } = req.body;

    //call repository
    try {
      let existingUser = await userRepository.login({ email, password });
      res.status(HttpStatusCode.OK).json({
        message: 'Login user successfully',
        data: existingUser,
      });
    } catch (exception) {
      res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
        message: exception.toString(),
      });
    }
  },
  register: async (req, res, next) => {
    //destructuring
    const { name, email, password, address } = req.body;

    try {
      const user = await userRepository.register({
        name,
        email,
        password,
        address,
      });
      res.status(HttpStatusCode.INSERT_OK).json({
        message: 'Register user successfully',
        data: user,
      });
    } catch (exception) {
      res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
        message: exception.message,
      });
    }
  },
  getAll: async (req, res, next) => {
    let { page = 1, size = MAX_RECORDS, searchString = '' } = req.query;
    size = size >= MAX_RECORDS ? MAX_RECORDS : size;

    try {
      let filteredStudents = await userRepository.getAll({
        size,
        page,
        searchString,
      });
      res.status(HttpStatusCode.OK).json({
        message: 'Get students successfully',
        size: filteredStudents.length,
        page,
        searchString,
        data: filteredStudents,
      });
    } catch (exception) {
      res.status(HttpStatusCode.InternalServerError).json({
        message: exception.message,
      });
    }
  },
};

export default UserController;
