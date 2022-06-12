import React, { useState } from "react";
import styled from "styled-components";
import { FormRow } from "../../components";
import Photo from "../../assets/img/instagram logo.svg";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { searchUser } from "../../features/user/userSlice";

import { SpinnerCircularSplit } from "spinners-react";

const Search = () => {
  const [value, setValue] = useState("");

  const { users, isLoading } = useSelector((state) => state.user);

  const dispatch = useDispatch();

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
        <div className="input-field">
          <input
            type="text"
            placeholder="search here..."
            name="username"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />

          <button onClick={handleSubmit}>Search</button>
        </div>

        {!value ? (
          <p>Search User</p>
        ) : (
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
        )}

        <div class="container"></div>
      </ContentWrapper>
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

const Wrapper = styled.div``;
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
  }

  input:focus {
    color: black;
    font-weight: 400;
    font-family: "Poppins", sans-serif;
  }

  input::placeholder {
    font-family: "Poppins", sans-serif;
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

  .container {
  }
`;
