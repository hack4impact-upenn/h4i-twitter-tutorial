import React from 'react';
import { useQuery } from 'react-query';
import styled from 'styled-components';
import auth from '../api/core/auth';
import { fetchMe } from '../api/userApi';
import Sidebar from '../components/Sidebar';
import TweetCard from '../components/TweetCard';
import { Field, Form, Formik } from 'formik';

const FlexContainer = styled.div`
  display: flex;
`;

const ContentContainer = styled.div`
  margin: 5%;
  width: 60%;
`;

const FormContainer = styled.div`
  width: 60%;
  margin: 20px 0px;
`;

const Button = styled.button`
  margin: 5px 0px;
  width: 150px;
`;

interface MyProfileResponse extends IAPIResponse {
  data: {
    _id: string;
    email: string;
    firstName: string;
    lastName: string;
  };
}

const tweet = [
  {
    _id: '1',
    timestamp: '2018/2/3',
    userId: '123',
    username: 'John Smith',
    text: 'Hello',
  },
];

const initialValues = {
  text: '',
};

const Dashboard = () => {
  const profileQuery = useQuery(
    ['fetchMe', { accessToken: auth.getAccessToken() }],
    fetchMe,
    {
      refetchOnWindowFocus: false,
    }
  );

  const handleSubmit = async (values: any) => {};

  const MyProfile = (res: MyProfileResponse) => {
    const { data: myProfile } = res;
    return (
      <div>
        <h3 className="title is-3">
          Hey {myProfile.firstName}! Welcome to Tweet4Impact.
        </h3>
      </div>
    );
  };

  return (
    <FlexContainer>
      <Sidebar />
      <ContentContainer>
        {profileQuery.isLoading && <div>Loading...</div>}
        {profileQuery.data && MyProfile(profileQuery.data as any)}

        <FormContainer>
          <Formik initialValues={initialValues} onSubmit={handleSubmit}>
            <Form>
              <Field
                name="text"
                className="input"
                type="text"
                placeholder="What's happening now?"
                style={{ margin: '10px 0px' }}
              />

              <Button
                className="button is-primary is-light is-outlined"
                type="submit"
              >
                Tweet
              </Button>
            </Form>
          </Formik>
        </FormContainer>

        <div style={{ width: '60%' }}>
          {tweet.map((tweet: ITweet) => (
            <TweetCard tweet={tweet} />
          ))}
        </div>
      </ContentContainer>
    </FlexContainer>
  );
};

export default Dashboard;
