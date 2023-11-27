import { body, validationResult } from 'express-validator';
import { pollRepository } from '../repositories/index.js';
import HttpStatusCode from '../helpers/httpStatus.js';
import { MAX_RECORDS } from '../helpers/constants.js';

const PollController = {
  createPoll: async (req, res, next) => {
    try {
      const poll = await pollRepository.createPoll(req.body);
      res.status(HttpStatusCode.INSERT_OK).json({
        message: 'Insert poll successfully',
        data: poll,
      });
    } catch (exception) {
      res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
        message: 'Cannot create poll: ' + exception,
        validationErrors: exception.validationErrors,
      });
    }
  },
  updatePoll: async (req, res, next) => {
    try {
      const poll = await pollRepository.updatePoll(req);
      res.status(HttpStatusCode.OK).json({
        message: 'Update poll successfully',
        data: poll,
      });
    } catch (exception) {
      res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
        message: 'Cannot update poll: ' + exception,
        validationErrors: exception.validationErrors,
      });
    }
  },
  getAllVoterById: async (req, res, next) => {
    const { pollId, voteId } = req.params;
    try {
      const users = await pollRepository.getAllVoterById({ pollId, voteId });
    } catch (error) {}
  },
  getAll: async (req, res, next) => {
    let { page = 1, size = MAX_RECORDS, searchString = '' } = req.query;
    size = size >= MAX_RECORDS ? MAX_RECORDS : size;

    try {
      let filteredPoll = await pollRepository.getAll({
        size,
        page,
        searchString,
      });
      res.status(HttpStatusCode.OK).json({ data: filteredPoll });
    } catch (exception) {
      res.status(HttpStatusCode.InternalServerError).json({
        message: exception.message,
      });
    }
  },
};

export default PollController;
