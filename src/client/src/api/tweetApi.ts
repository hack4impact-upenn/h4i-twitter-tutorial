import secureAxios from './core/apiClient';

const fetchTweets = ({ accessToken }: { accessToken: string }) => {
  return new Promise((resolve, reject) => {
    secureAxios({
      url: '/api/tweet/create',
      method: 'GET',
      timeout: 0,
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    })
      .then((data) => resolve(data))
      .catch((err) => reject(err.response));
  });
};

const createTweet = () => {};

const deleteTweet = () => {};

export { fetchTweets, createTweet, deleteTweet };
