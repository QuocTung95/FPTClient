import { print, OutputType } from './print.js';

export default class Exception extends Error {
  static WRONG_DB_USERNAME_PASSWORD = "Wrong datatabase's username and password";
  static WRONG_CONNECTION_STRING = 'Wrong server name/connection string';
  static CANNOT_CONNECT_MONGODB = 'Cannot connect to Mongoose';
  static EMAIL_UNIQUE = 'Email already exists';
  static CANNOT_REGISTER_USER = 'Cannot register user';
  static WRONG_EMAIL_AND_PASSWORD = 'Wrong email or password';
  static OWNER_CAN_NOT_VOTE = 'Owner can not vote';
  static ALREADY_VOTE = 'You already vote';
  static AT_LEAST_2_OPTION = 'At least 2 option';

  constructor(message, validationErrors = {}) {
    super(message); //call constructor of parent class(Error)
    print(message, OutputType.ERROR);
    this.validationErrors = validationErrors;
  }
}
