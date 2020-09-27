// Tutorial: Create Tweet API Endpoints
import express from 'express';
import auth from '../middleware/auth';
import { Tweet } from '../models/tweet.model';
import { User } from '../models/user.model';
import errorHandler from './error';

const router = express.Router();

// create new tweet
router.post('/create', auth, async (req, res) => {
  const { text } = req.body;
  const { userId } = req;
  const user = await User.findById(userId);
  if (!user) return errorHandler(res, 'User does not exist.');

  // construct user name
  const username = `${user.firstName} ${user.lastName}`;

  const newTweet = new Tweet({
    username,
    userId,
    text,
  });

  await newTweet.save();

  return res
    .status(200)
    .json({ success: true, message: 'Tweet created succesfully' });
});

// delete one tweet by id
router.delete('/:tweetId/delete', auth, async (req, res) => {
  const { tweetId } = req.params;
  const { userId } = req;
  const user = await User.findById(userId);
  if (!user) return errorHandler(res, 'User does not exist.');

  const tweet = await Tweet.findById(tweetId);
  if (!tweet) return errorHandler(res, 'Tweet does not exist.');

  if (tweet.userId !== userId)
    return errorHandler(res, 'Users can only delete their own posts.');

  await tweet.deleteOne();

  return res
    .status(200)
    .json({ success: true, message: 'Tweet deleted succesfully' });
});

// get all tweet
router.get('/', (_, res) => {
  Tweet.find({})
    .then((data) => res.status(200).json({ success: true, data }))
    .catch((e) => errorHandler(res, e));
});

export default router;
