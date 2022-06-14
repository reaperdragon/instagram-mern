import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FormRow } from "../../components";
import styled from "styled-components";
import FileBase64 from "react-file-base64";
import { toast } from "react-toastify";
import { userUpdate } from "../../features/user/userSlice";

const EditUserProfile = () => {
  const { user, isLoading } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const [userData, setDataUser] = useState({
    username: user.username || "",
    email: user.email || "",
    fullName: user.fullName || "",
    avatar: user.avatar || "",
    bio: user.bio || "",
  });

  const handleChange = (e) => {
    setDataUser({ ...userData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const { username, email, fullName, avatar, bio } = userData;

    if (!username || !email || !fullName || !avatar || !bio) {
      toast.error("Please Provide All Fields.");
      return;
    }
    dispatch(userUpdate({ username, email, fullName, avatar, bio }));
  };

  return (
    <Wrapper>
      <ContentWrapper>
        <ImageWrapper>
          <img src={user.avatar} alt="profile" />
        </ImageWrapper>

        <DetailsWrapper>
          <form className="form" onSubmit={onSubmit}>
            <FormRow
              type="text"
              placeholder="username"
              name="username"
              value={userData.username}
              handleChange={handleChange}
            />
            <FormRow
              type="text"
              placeholder="email"
              name="email"
              value={userData.email}
              handleChange={handleChange}
            />

            <FormRow
              type="text"
              placeholder="fullName"
              name="fullName"
              value={userData.fullName}
              handleChange={handleChange}
            />

            <FormRow
              type="text"
              placeholder="bio"
              name="bio"
              value={userData.bio}
              handleChange={handleChange}
            />

            <FileBase64
              type="file"
              label="Image"
              multiple={false}
              name="myFile"
              accept=".jpeg, .png, .jpg"
              value={userData.avatar}
              onDone={({ base64 }) =>
                setDataUser({ ...userData, avatar: base64 })
              }
            />

            <button type="submit" disabled={isLoading} className="btn-update">
              {isLoading ? `Please Wait` : `Update Profile`}
            </button>
          </form>
        </DetailsWrapper>
      </ContentWrapper>
    </Wrapper>
  );
};

export default EditUserProfile;

const Wrapper = styled.div`
  height: 80vh;
`;
const ContentWrapper = styled.div`
  max-width: 1234px;
  height: 100%;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 10px;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  @media only screen and (max-width: 640px) {
    grid-template-columns: 1fr;
    grid-gap: 40px;
  }
`;

const ImageWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  img {
    width: 300px;
    height: 300px;
    border-radius: 50%;
  }
`;

const DetailsWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  .form {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding: 20px 0;
    background: white;
    width: 380px;
    border: 1px solid black;
    margin: 10px 0;
  }
  input {
    width: 80%;
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
  .btn-update {
    width: 80%;
    height: 50px;
    background: #a1ddff;
    border-radius: 5px;
    cursor: pointer;
    border: none;
    font-family: "Poppins";
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    line-height: 45px;
    margin: 20px 0;
    transition: all 0.25s ease-in-out;
    &:hover {
      background: #399ffd;
      box-shadow: 0px 10px 20px rgba(57, 159, 253, 0.5);
      transform: translate(0, -5px);
      color: white;
    }
  }
`;
