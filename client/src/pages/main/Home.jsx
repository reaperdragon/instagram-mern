import React from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import { followUserFeeds } from "../../features/feed/feedSlice.js";

import { More, Heart, Message, Save2 } from "iconsax-react";

const Home = () => {
  const { isLoading, followingUserFeeds } = useSelector((state) => state.feed);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(followUserFeeds());
  }, [dispatch]);

  console.log(followingUserFeeds[0]?.followingFeeds);

  return (
    <Wrapper>
      <ContentWrapper>
        {followingUserFeeds[0]?.followingFeeds?.map((data) => (
          <div className="profile_container" key={data?._id}>
            <div className="profile_container-header">
              <div className="profile_container-header--user">
                <img
                  src={data?.postedBy?.avatar}
                  alt="profile"
                  className="profile_container-header--user-avatar"
                />
                <p className="profile_container-header--user-username">
                  {data?.postedBy?.username}
                </p>
              </div>
              <div className="profile_container-header--more">
                <More size="24" color="#697689" className="more-icon" />
              </div>
            </div>
            <img
              src={data?.post}
              alt="profile-post"
              className="profile_container-post"
            />
            <div className="profile_container-footer">
              <div className="profile_container-footer--icons">
                <div className="profile_container-footer-icon">
                  <Heart size="32" color="#697689" />
                  <Message size="32" color="#697689" />
                </div>
                <Save2 size="32" color="#697689" />
              </div>
              <div className="profile_container-footer-like-count">
                <p>Like {data?.likes?.length}</p>
              </div>
              <div className="profile_container-footer-caption">
                <p className="profile_container-footer-caption--caption-text">
                  <span className="profile_container-footer-caption--username">
                    {data?.postedBy?.username}
                  </span>{" "}
                  {data?.caption}
                </p>
              </div>
            </div>
          </div>
        ))}
      </ContentWrapper>
    </Wrapper>
  );
};

export default Home;

const Wrapper = styled.div``;

const ContentWrapper = styled.div`
  max-width: 1200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0 auto;

  .profile_container {
    width: 700px;
    height: max-content;
    display: flex;
    align-items: center;
    border: 1px solid #929292;
    background: #f0f0f0;
    flex-direction: column;
    margin: 20px;
  }

  .profile_container-header {
    min-width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px;
  }

  .profile_container-header--user {
    display: flex;
    justify-content: center;
    align-items: center;
    padding-left: 10px;
    gap: 10px;
  }

  .profile_container-post {
    width: 100%;
  }

  .profile_container-header--user-avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }

  .profile_container-header--user-username {
    font-family: "Poppins";
    font-style: normal;
    font-weight: 500;
    font-size: 20px;
    line-height: 45px;
  }

  .profile_container-footer {
    width: 100%;
  }

  .profile_container-footer--icons {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
  }

  .profile_container-footer-icon {
    display: flex;
    gap: 10px;
  }

  .profile_container-footer-like-count {
    padding: 10px;
  }

  .profile_container-footer-caption {
    padding: 10px;
  }

  .profile_container-footer-caption--username {
    font-family: "Poppins";
    font-style: normal;
    font-weight: 500;
    font-size: 15px;
    line-height: 38px;
    color:black ;
  }

  .profile_container-footer-caption--caption-text {
    font-family: "Poppins";
    color: #6f6f6f;
  }

  .more-icon {
    transform: rotate(270deg);
  }
`;
