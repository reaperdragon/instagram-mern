import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { searchUser } from "../../features/user/userSlice";

import { SpinnerCircularSplit } from "spinners-react";

import { Heart, Message } from "iconsax-react";
import { useEffect } from "react";
import { getAllFeeds } from "../../features/feed/feedSlice";

const Search = () => {
  const [value, setValue] = useState("");

  const { users, isLoading } = useSelector((state) => state.user);

  const { feeds } = useSelector((state) => state.feed);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllFeeds());
  }, [dispatch]);

  console.log(feeds[0]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(searchUser(value));
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
        <div className="input_field">
          <input
            type="text"
            placeholder="search here..."
            name="username"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />

          <button className="search_button" onClick={handleSubmit}>
            Search
          </button>
        </div>
      </ContentWrapper>

      {!value ? (
        <div className="image-gallery">
          {feeds[0]?.feed?.map((data) => {
            return (
              <div className="image-box" key={data?._id}>
                <Link to={`/feed/${data?._id}`}>
                  <img src={data?.post} alt="feed" />
                  <div className="overlay">
                    <div className="details">
                      <h3 className="likes">
                        <Heart size="32" color="#d9e3f0" variant="Bold" />{" "}
                        <h3 className="detail">{data?.likes?.length}</h3>
                      </h3>
                      <h3 className="comments">
                        <Message size="32" color="#d9e3f0" variant="Bold" />{" "}
                        <h3 className="detail">{data?.comments.length}</h3>
                      </h3>
                    </div>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      ) : (
        <ContentWrapper>
          <div className="users">
            {users?.user?.map((data, index) => (
              <div className="user_container" key={data._id}>
                <Link to={`/user/${data._id}`}>
                  <img
                    src={data?.avatar}
                    alt="logo"
                    className="user_container-profile"
                  />
                  <h4 className="user_container-username">{data.username}</h4>
                </Link>
              </div>
            ))}
          </div>
        </ContentWrapper>
      )}
    </Wrapper>
  );
};

export default Search;

const Loader = styled.div`
  height: 800px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  position: relative;

  .image-gallery {
    width: 100%;
    max-width: 950px;
    margin: 0 auto;
    padding: 50px 20px;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    grid-auto-rows: 250px;
    grid-auto-flow: dense;
    grid-gap: 20px;
    overflow-x: hidden;

    @media only screen and (max-width: 768px) {
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      grid-auto-rows: 250px;
      padding: 50px 0;
    }
  }

  .image-gallery .image-box {
    position: relative;
    background-color: #d7d7d8;
    overflow: hidden;
  }

  .image-gallery .image-box:nth-child(7n + 1) {
    grid-column: span 2;
    grid-row: span 2;

    @media only screen and (max-width: 768px) {
      grid-column: unset;
      grid-row: unset;
    }
  }

  .image-gallery .image-box img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: all 0.5s ease;
    cursor: pointer;
  }

  .image-gallery .image-box img:hover {
    transform: scale(1.1);
  }

  .image-gallery .image-box .overlay {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: #697689;
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    transition: all 0.5s ease;
    z-index: 1;
  }

  .image-gallery .image-box:hover .overlay {
    top: 20;
    right: 20;
    left: 20;
    opacity: 1;
  }

  .image-gallery .image-box .details {
    text-align: center;
  }

  .image-gallery .image-box .details .likes {
    margin-bottom: 8px;
    font-size: 24px;
    font-weight: 600;
    position: relative;
    top: -5;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;

    &:a {
      text-decoration: none;
      color: #697689;
    }
  }

  .image-gallery .image-box .details .likes .detail {
    color: #d9e3f0;
    text-decoration: none;
  }

  .image-gallery .image-box .details .comments {
    font-size: 24px;
    font-weight: 600;
    position: relative;
    bottom: -5px;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;

    &:a {
      text-decoration: none;
      color: #697689;
    }
  }

  .image-gallery .image-box .details .comments .detail {
    color: #d9e3f0;
    text-decoration: none;
  }

  .image-gallery .image-box:hover .details .likes {
    top: 0;
    opacity: 1;
    visibility: visible;
    transition: all 0.3s 0.2s ease;

    &:a {
      text-decoration: none;
      color: #697689;
    }
  }

  .image-gallery .image-box:hover .details .comments {
    bottom: 0;
    opacity: 1;
    visibility: visible;
    transition: all 0.3s 0.2s ease;

    &:a {
      text-decoration: none;
      color: #697689;
    }
  }
`;
const ContentWrapper = styled.div`
  max-width: 1234px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  input {
    width: 500px;
    height: 50px;
    padding-left: 5px;
    background: #dff3fe;
    border: none;
    border-radius: 5px;
    margin: 10px 0;
    outline: none;
    transition: all 0.3s ease-in-out;
    font-family: "Poppins", sans-serif;

    @media only screen and (max-width: 768px) {
      width: 300px;
    }
  }

  input:focus {
    color: black;
    font-weight: 400;
    font-family: "Poppins", sans-serif;
  }

  input::placeholder {
    font-family: "Poppins", sans-serif;
  }

  .search_button {
    background: #0691f5;
    border: none;
    padding: 15px 15px;
    border-radius: 5px;
    color: white;
    margin-left: 10px;
    cursor: pointer;
    transition: all 0.3s ease-in-out;

    &:hover {
      box-shadow: 0px 4px 4px rgba(14, 121, 255, 0.4);
    }
  }

  .users {
    max-width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 20px 0;
  }

  .user_container {
    display: flex;

    align-items: center;
    justify-content: left;
    gap: 10px;
    margin: 10px 0;
    width: 500px;
    height: 50px;
    background: #dff3fe;
    padding-left: 10px;
    padding-top: 10px;
    padding-bottom: 10px;
    border-radius: 5px;
    transition: all 0.3s ease-in-out;
    cursor: pointer;

    &:hover {
      border: 1px solid #0691f5;
    }
  }

  a {
    display: flex;
    align-items: center;
    justify-content: left;
    gap: 10px;
    text-decoration: none;
  }

  .user_container-profile {
    width: 42px;
    height: 42px;
    border-radius: 50%;
  }

  .user_container-username {
    font-family: "Poppins";
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    line-height: 30px;
    color: #7c7c7c;
    color: #141414;
  }
`;
