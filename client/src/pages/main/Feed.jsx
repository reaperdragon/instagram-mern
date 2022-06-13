import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { commentOnFeed, getFeed } from "../../features/feed/feedSlice";

import { Link } from "react-router-dom";

import { More, Heart, Message, Save2 } from "iconsax-react";

import { feedLikeDislike } from "../../features/feed/feedSlice.js";

import moment from "moment";

import { SpinnerCircularSplit } from "spinners-react";
import { useState } from "react";

import { FormRow } from "../../components";

const Feed = () => {
  const [values, setValues] = useState({ comment: "" });
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

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const { comment } = values;
    await dispatch(
      commentOnFeed({ postId: feed?.payload?.feed?._id, comment: comment })
    );
    console.log(comment);
  };

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

        <div className="comment_container">
          <form className="form" onSubmit={onSubmit}>
            <FormRow
              type="text"
              placeholder="comment here"
              name="comment"
              value={values.comment}
              handleChange={handleChange}
            />
            <button type="submit" className="comment_container-comment--button">
              Comment
            </button>
          </form>
        </div>
      </ContentWrapper>
    </Wrapper>
  );
};

export default Feed;

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
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 10px;
  align-items: center;
  justify-content: center;
  margin: 0 auto;

  @media only screen and (max-width: 628px) {
    grid-template-columns: 1fr;
  }

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

  .form {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: row;
    padding: 20px 0;
    background: white;
    width: 100%;
    gap: 10px;
    border-radius: 5px;
  }

  input {
    width: 80%;
    height: 50px;
    padding-left: 5px;
    background: #dff3fe;
    border: none;
    border-radius: 5px;
    margin: 10px 0;
    font-family: "Poppins", sans-serif;
    outline: none;
    transition: all 0.3s ease-in-out;
  }
  input:focus {
    color: black;
    font-weight: 400;
    font-family: "Poppins", sans-serif;
  }
  input::placeholder {
    font-family: "Poppins", sans-serif;
  }

  .comment_container-comment--button {
    background: #9ad0e8;
    border-radius: 8px;
    border: none;
    margin: 10px 0;
    font-family: "Inter";
    font-style: normal;
    font-weight: 400;

    line-height: 36px;
    padding: 5px 5px;
    cursor: pointer;
    color: white;
    transition: all 0.3s ease-in-out;

    &:hover {
      transform: translate(0, -5px);
      background: #0691f5;
      box-shadow: 0px 4px 4px rgba(36, 130, 217, 0.35);
    }
  }
`;
