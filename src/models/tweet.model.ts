// Tutorial: Create Tweet Model
import mongoose from 'mongoose';

const { Schema } = mongoose;

interface ITweet extends mongoose.Document {
  _id: string;
  timestamp: Date;
  userId: string;
  username: string;
  text: string;
}

const TweetSchema = new Schema({
  timestamp: { type: Date, default: Date.now },
  username: { type: String, required: true },
  userId: { type: String, required: true },
  text: { type: String, required: false },
});

const Tweet = mongoose.model<ITweet>('Tweet', TweetSchema);

export { Tweet, ITweet };
