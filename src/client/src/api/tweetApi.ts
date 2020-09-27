import secureAxios from './core/apiClient';

const fetchTweets = (_: string, { accessToken }: { accessToken: string }) => {
  return new Promise((resolve, reject) => {
    secureAxios({
      url: '/api/tweet/',
      method: 'GET',
      timeout: 0,
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    })
      .then((res) => resolve(res.data.data))
      .catch((err) => reject(err.response));
  });
};

const createTweet = ({
  accessToken,
  text,
}: {
  accessToken: string;
  text: string;
}) => {
  return new Promise((resolve, reject) => {
    secureAxios({
      url: '/api/tweet/create',
      method: 'POST',
      timeout: 0,
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      data: JSON.stringify({ text }),
    })
      .then((res) => resolve(res.data))
      .catch((err) => reject(err.response));
  });
};

// try an implement this yourself!
const deleteTweet = () => {};

export { fetchTweets, createTweet, deleteTweet };
