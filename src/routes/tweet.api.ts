import express from 'express';
import auth from '../middleware/auth';
import { Tweet } from '../models/tweet.model';
import { User } from '../models/user.model';
import errorHandler from './error';

const router = express.Router();

// get all the tweets
router.get('/', (req, res) => {
 Tweet.find({})
   .sort({ timestamp: 'desc' })
   .then((data) => {
     return res.status(200).json({ success: true, data });
   })
   .catch((error) => {
     return res.status(400).json({ sucess: false, error });
   });
});

// create tweets
router.post('/create', auth, async (req, res) => {
 const { userId } = req;
 const { text } = req.body;
 const user = await User.findById(userId);
 if (!user) return errorHandler(res, 'User is not valid');

 const newTweet = new Tweet({
   userId,
   username: `${user.firstName} ${user.lastName}`,
   text,
 });

 await newTweet.save();

 return res
   .status(200)
   .json({ success: true, message: 'Tweet created succesfully' });
});

// delete a certain tweet

export default router;


