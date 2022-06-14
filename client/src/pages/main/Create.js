import React, { useState } from "react";
import { SpinnerCircularSplit } from "spinners-react";
import { FormRow2 } from "../../components";
import { BsImage } from "react-icons/bs";
import FileBase64 from "react-file-base64";
import styled from "styled-components";

import { toast } from "react-toastify";

import { useDispatch, useSelector } from "react-redux";
import { createFeed } from "../../features/feed/feedSlice";

const Create = () => {
  const [values, setValues] = useState({
    caption: "",
    post: "",
  });

  const { isLoading } = useSelector((state) => state.feed);

  const dispatch = useDispatch();

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const { caption, post } = values;

    if (!caption || !post) {
      toast.error("Please Provide All The Fields");
      setValues({ caption: "", post: "" });
    } else {
      dispatch(createFeed(values));
      setValues({ caption: "", post: "" });
      return;
    }
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
        <ImageWrapper>
          {values?.post?.length > 0 ? (
            <img src={values?.post} alt="post" />
          ) : (
            <div className="no-image">
              <BsImage className="icon" /> Please Select an Image to see
              Preview.
            </div>
          )}
        </ImageWrapper>

        <DetailsWrapper>
          <form className="form" onSubmit={onSubmit}>
            <FormRow2
              type="text"
              placeholder="Caption"
              name="caption"
              value={values.caption}
              handleChange={handleChange}
            />

            <FileBase64
              type="file"
              label="Image"
              multiple={false}
              name="myFile"
              accept=".jpeg, .png, .jpg, .svg"
              value={values.post}
              onDone={({ base64 }) => setValues({ ...values, post: base64 })}
            />

            <button type="submit" disabled={isLoading} className="btn-update">
              {isLoading ? "Uploading" : "Post"}
            </button>
          </form>
        </DetailsWrapper>
      </ContentWrapper>
    </Wrapper>
  );
};

export default Create;

const Loader = styled.div`
  height: 800px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  height: 80vh;
  .edit {
    text-align: center;
    font-family: "Poppins", sans-serif;
    font-weight: 600;
    font-size: 20px;
    margin: 20px 0;
  }
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
    height: max-content;
  }
  .no-image {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
    text-align: center;
    font-family: "Poppins", sans-serif;
    font-weight: 500;
    flex-direction: column;
  }
  .icon {
    margin: 10px 0;
    font-size: 25px;
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
  textarea {
    width: 80%;
    height: 300px;
    padding-top: 5px;
    padding-left: 5px;
    background: #dff3fe;
    border: none;
    border-radius: 5px;
    margin: 10px 0;
    resize: none;
    overflow: auto;
    outline: none;
    transition: all 0.3s ease-in-out;
    font-family: "Poppins", sans-serif;
  }
  textarea:focus {
    color: black;
    font-weight: 400;
    font-family: "Poppins", sans-serif;
  }
  textarea::placeholder {
    font-family: "Poppins", sans-serif;
  }
  textarea::-webkit-scrollbar {
    width: 1em;
  }
  textarea::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  }
  textarea::-webkit-scrollbar-thumb {
    background-color: darkgrey;
    outline: 1px solid slategrey;
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
