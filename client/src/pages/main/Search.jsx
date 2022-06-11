import React, { useState } from "react";
import styled from 'styled-components'
import { FormRow } from "../../components";
import Photo from '../../assets/img/instagram logo.svg'
 const Search = () => {
  const [value, setValue] = useState({username:""});

    const handleChange = (e) => {
      setValue({ ...value, [e.target.name]: e.target.value });
  };
  
  const users = [
    {
      username: "Michael",
      photo: Photo,
    },
    {
      username: "John",
      photo: Photo,
    },
  ];

  return (
    <>
      <Wrapper>
        <ContentWrapper>
          <div className="input-field">
            <FormRow
              type="text"
              placeholder="search here..."
              name="username"
              value={value.username}
              handleChange={handleChange}
            />
          </div>

          <div className="users">
            {users.map((data, index) => (
              <div className="user_container">
                <img
                  src={data?.photo}
                  alt="logo"
                  className="user_container-profile"
                />
                <h4 className="user_container-username">{data.username}</h4>
              </div>
            ))}
          </div>

          <div class="container"></div>
        </ContentWrapper>
      </Wrapper>
    </>
  );
};

export default Search;

const Wrapper = styled.div` 

`
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
    transition:all 0.3s ease-in-out;
    cursor: pointer;

    &:hover {
      border: 1px solid #0691f5;
    }
  }

  .user_container-profile {
    width: 42px;
    height: 42px;
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