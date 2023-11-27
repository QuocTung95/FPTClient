import express from 'express';
import PollController from '../controllers/poll.js';
import verifyToken from '../middleware/auth.js';

const router = express.Router();

router.get('/', PollController.getAll);
router.post('/create', verifyToken, PollController.createPoll);
router.post('/update', verifyToken, PollController.updatePoll);
router.get('/getAllVoterById/:pollId/:voteId', PollController.getAllVoterById);

export default router;
