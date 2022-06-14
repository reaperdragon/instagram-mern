import React, { useState } from "react";
import styled from "styled-components";

import { useDispatch } from "react-redux";

import moment from "moment";

import { feedLikeDislike } from "../features/feed/feedSlice.js";
import { Link } from "react-router-dom";

import { More, Heart, Message, Save2 } from "iconsax-react";

const PostContainer = ({ data }) => {
  const [like, setLike] = useState(data?.likes.length);
  const dispatch = useDispatch();

  return (
    <ContentWrapper>
      <div className="profile_container" key={data?._id}>
        <div className="profile_container-header">
          <div className="profile_container-header--user">
            <Link to={`/user/${data?.postedBy?._id}`}>
              <img
                src={data?.postedBy?.avatar}
                alt="profile"
                className="profile_container-header--user-avatar"
              />
              <p className="profile_container-header--user-username">
                {data?.postedBy?.username}
              </p>
            </Link>
          </div>
          <div className="profile_container-header--more">
            <More size="24" color="#697689" className="more-icon" />
          </div>
        </div>
        <Link to={`/feed/${data?._id}`} className="profile_container-post-link">
          <img
            src={data?.post}
            alt="profile-post"
            className="profile_container-post"
          />
        </Link>
        <div className="profile_container-footer">
          <div className="profile_container-footer--icons">
            <div className="profile_container-footer-icon">
              {data?.liked ? (
                <>
                  <Heart
                    size="32"
                    color="#f47373"
                    variant="Bold"
                    onClick={() => {
                      setLike(like - 1);
                      dispatch(feedLikeDislike({ postId: data?._id }));
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
                      setLike(like + 1);
                      dispatch(feedLikeDislike({ postId: data?._id }));
                      window.location.reload(false);
                    }}
                  />
                </>
              )}

              <Message size="32" color="#697689" />
            </div>
            <Save2 size="32" color="#697689" />
          </div>
          <div className="profile_container-footer-like-count--time">
            <p>Like {data?.likes?.length}</p>
            <p>{moment(data?.createdAt).fromNow()}</p>
          </div>
          <div className="profile_container-footer-caption">
            <p className="profile_container-footer-caption--caption-text">
              <span className="profile_container-footer-caption--username">
                {data?.postedBy?.username}
              </span>{" "}
              {data?.caption}
            </p>

            {data?.comments?.slice(0, 2).map((comment) => {
              return (
                <p
                  className="profile_container-footer-caption--comment-text"
                  key={comment._id}
                >
                  <span className="profile_container-footer-caption--username">
                    {comment?.commentedBy?.username}
                  </span>{" "}
                  {comment?.comment}
                </p>
              );
            })}
          </div>
        </div>
      </div>
    </ContentWrapper>
  );
};

export default PostContainer;

const ContentWrapper = styled.div`
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

  .profile_container-footer-caption--comment-text {
    font-family: "Poppins";
    font-size: 12px;
    color: #6f6f6f;
  }

  .more-icon {
    transform: rotate(270deg);
    cursor: pointer;
  }
`;
