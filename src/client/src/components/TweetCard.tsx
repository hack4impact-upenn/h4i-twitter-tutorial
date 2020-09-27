import React from 'react';
import { parseISO, formatDistanceToNow } from 'date-fns';

const TweetCard = ({ tweet }: { tweet: ITweet }) => {
  const renderTimestamp = (date: number | Date) => {
    const timePeriod = formatDistanceToNow(date);

    return `${timePeriod} ago`
      .replace(/almost|about|over|ago?/gi, '')
      .replace(/\s/gi, '')
      .replace(/lessthanaminute?/gi, '1minutes')
      .replace(/minutes?/gi, 'min')
      .replace(/days?/gi, 'd')
      .replace(/hours?/gi, 'h');
  };

  return (
    <div className="card">
      <div className="card-content">
        <div className="media-content">
          <p className="title is-4">{tweet.username}</p>
          <p className="subtitle is-6">
            <small>{renderTimestamp(Date.parse(tweet.timestamp))}</small>
          </p>
        </div>
        <div className="content">{tweet.text}</div>
      </div>
    </div>
  );
};

export default TweetCard;
