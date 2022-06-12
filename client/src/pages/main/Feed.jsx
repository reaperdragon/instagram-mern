import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { getFeed } from "../../features/feed/feedSlice";

import { Link } from "react-router-dom";

import { More, Heart, Message, Save2 } from "iconsax-react";

import {
  feedLikeDislike,
} from "../../features/feed/feedSlice.js";

import moment from "moment";

const Feed = () => {
  const { id } = useParams();

  const { feed, isLoading } = useSelector((state) => state.feed);

  const { user } = useSelector((state) => state.user);

  console.log(user);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getFeed(id));
  }, [dispatch, id]);

  console.log(feed);
  console.log(feed?.payload?.feed);

  const Likes = () => {
    if (feed?.payload?.feed?.likes?.length > 0) {
      return feed?.payload?.feed?.likes?.find(
        (like) => like === user.user._id
      ) ? (
        <>
          <Heart
            size="32"
            color="#f47373"
            variant="Bold"
            onClick={() => {
              dispatch(feedLikeDislike({ postId: feed?.payload?.feed?._id }));
              window.location.reload(false);
            }}
          />
        </>
      ) : (
        <>
          <Heart
            size="32"
            color="#697689"
            onClick={() => {
              dispatch(feedLikeDislike({ postId: feed?.payload?.feed?._id }));
              window.location.reload(false);
            }}
          />
        </>
      );
    }
    return (
      <>
        {" "}
        <Heart
          size="32"
          color="#697689"
          onClick={() => {
            dispatch(feedLikeDislike({ postId: feed?.payload?.feed?._id }));
            window.location.reload(false);
          }}
        />
      </>
    );
  };

  return (
    <Wrapper>
      <ContentWrapper>
        <div className="profile_container" key={feed?.payload?.feed?._id}>
          <div className="profile_container-header">
            <div className="profile_container-header--user">
              <Link to={`/user/${feed?.payload?.feed?.postedBy?._id}`}>
                <img
                  src={feed?.payload?.feed?.postedBy?.avatar}
                  alt="profile"
                  className="profile_container-header--user-avatar"
                />
                <p className="profile_container-header--user-username">
                  {feed?.payload?.feed?.postedBy?.username}
                </p>
              </Link>
            </div>
            <div className="profile_container-header--more">
              <More size="24" color="#697689" className="more-icon" />
            </div>
          </div>

          <img
            src={feed?.payload?.feed?.post}
            alt="profile-post"
            className="profile_container-post"
          />

          <div className="profile_container-footer">
            <div className="profile_container-footer--icons">
              <div className="profile_container-footer-icon">
                <Likes />
                <Message size="32" color="#697689" />
              </div>
              <Save2 size="32" color="#697689" />
            </div>
            <div className="profile_container-footer-like-count--time">
              <p>Like {feed?.payload?.feed?.likes?.length}</p>
              <p>{moment(feed?.payload?.feed?.createdAt).fromNow()}</p>
            </div>
            <div className="profile_container-footer-caption">
              <p className="profile_container-footer-caption--caption-text">
                <span className="profile_container-footer-caption--username">
                  {feed?.payload?.feed?.postedBy?.username}
                </span>{" "}
                {feed?.payload?.feed?.caption}
              </p>
            </div>
          </div>
        </div>
      </ContentWrapper>
    </Wrapper>
  );
};

export default Feed;

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
    justify-content: center;
    border: 1px solid #929292;
    background: #f0f0f0;
    flex-direction: column;
    margin: 20px 0;
    overflow-x: hidden;

    @media only screen and (max-width: 628px) {
      max-width: 96vw;
      margin: 10px 0;
      justify-content: center;
    }
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

    a {
      color: black;
      text-decoration: none;
      display: flex;
      gap: 10px;
    }
  }

  .profile_container-post-link {
    width: 100%;
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
    cursor: pointer;
  }

  .profile_container-footer-like-count--time {
    font-family: "Poppins", sans-serif;

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
    color: black;
  }

  .profile_container-footer-caption--caption-text {
    font-family: "Poppins";
    color: #6f6f6f;
  }

  .more-icon {
    transform: rotate(270deg);
    cursor: pointer;
  }
`;
