import React from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import { SpinnerCircularSplit } from "spinners-react";

import { followUserFeeds } from "../../features/feed/feedSlice.js";

import PostContainer from "../../components/PostContainer.js";

const Home = () => {
  const { isLoading, followingUserFeeds } = useSelector((state) => state.feed);

  const { user } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(followUserFeeds());
  }, [dispatch, user]);

  if (isLoading) {
    return (
      <Loader>
        <SpinnerCircularSplit
          size={50}
          thickness={100}
          speed={100}
          color="rgba(57, 159, 253, 1)"
          secondaryColor="rgba(57, 159, 253, 0.5)"
        />
      </Loader>
    );
  }

  return (
    <Wrapper>
      <ContentWrapper>
        {followingUserFeeds[0]?.followingFeeds?.length > 0 ? (
          <>
            {followingUserFeeds[0]?.followingFeeds?.map((data) => (
              <PostContainer data={data} key={data?._id} />
            ))}
          </>
        ) : (
          <div className="message">Please Follow Someone to See Here Posts</div>
        )}
      </ContentWrapper>
    </Wrapper>
  );
};

export default Home;

const Loader = styled.div`
  height: 800px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div``;

const ContentWrapper = styled.div`
  max-width: 1200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0 auto;

  .message {
    font-family: "Poppins";
    font-size: 40px;
  }
`;
