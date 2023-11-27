import UserRouter from './users.js';
import PollRouter from './poll.js';

const route = (app) => {
  app.use('/users', UserRouter);
  app.use('/polls', PollRouter);
};

export default route;
