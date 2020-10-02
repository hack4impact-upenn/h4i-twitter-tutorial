/**
 * Define your global interfaces here
 */

declare interface IUserSignup {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

declare interface IUserLogin {
  email: string;
  password: string;
}

interface IAPIResponse {
  success: boolean;
}

declare interface ITweet {
  _id: string;
  timestamp: string;
  userId: string;
  username: string;
  text: string;
}
