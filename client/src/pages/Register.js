import React, { useState } from "react";
import styled from "styled-components";
import Mockup from "../assets/img/iphonesvg.svg";
import MeshGradient from "../assets/img/Rectangle mesh gradient.jpg";
import Logo from "../assets/img/instagram logo.svg";
import { FormRow } from "../components";

import { useDispatch, useSelector } from "react-redux";
import { registerUser, loginUser } from "../features/user/userSlice";

import { useNavigate } from "react-router-dom";

import { toast } from "react-toastify";
import { useEffect } from "react";

const initialState = {
  username: "",
  fullName: "",
  email: "",
  password: "",
  isMember: true,
};

const Register = () => {
  const [values, setValues] = useState(initialState);

  const { user } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const toggleMember = (e) => {
    setValues({ ...values, isMember: !values.isMember });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const { username, fullName, email, password, isMember } = values;

    if (
      !email ||
      !password ||
      (!isMember && !username) ||
      (!isMember && !fullName)
    ) {
      toast.error("Please Provide All Fields.");
      return;
    }

    if (isMember) {
      dispatch(loginUser({ email: email, password: password }));
      return;
    }
    dispatch(registerUser({ username, fullName, email, password }));

    setValues({ username: "", fullName: "", email: "", password: "" });
  };

  useEffect(() => {
    if (user) {
      setTimeout(() => {
        navigate("/");
      }, 3000);
    }
  }, [user, navigate]);

  return (
    <Wrapper>
      <ContentWrapper>
        <div className="mockup">
          <img src={MeshGradient} alt="gradient" className="gradient" />
          <img src={Mockup} alt="mockup" className="mockup-image" />
        </div>

        <div className="content">
          <form className="form" onSubmit={onSubmit}>
            <div className="main">
              <img src={Logo} alt="logo" className="logo" />
              <h4>{values.isMember ? "Login" : "Register"}</h4>
            </div>

            <div className="fields">
              {!values.isMember && (
                <FormRow
                  type="username"
                  placeholder="username"
                  name="username"
                  value={values.username}
                  handleChange={handleChange}
                />
              )}

              {!values.isMember && (
                <FormRow
                  type="fullName"
                  placeholder="fullname"
                  name="fullName"
                  value={values.fullName}
                  handleChange={handleChange}
                />
              )}

              <FormRow
                type="email"
                placeholder="email"
                name="email"
                value={values.email}
                handleChange={handleChange}
              />

              <FormRow
                type="password"
                placeholder="password"
                name="password"
                value={values.password}
                handleChange={handleChange}
              />

              <button type="submit" className="btn-login">
                {values.isMember ? "Login" : "Register"}
              </button>
              <p>
                {values.isMember
                  ? "Not Have An Account?"
                  : "Already Have an Account? "}
                <span onClick={toggleMember}>
                  {" "}
                  {!values.isMember ? "Login" : "Create one."}
                </span>
              </p>
            </div>
          </form>
        </div>
      </ContentWrapper>
    </Wrapper>
  );
};

export default Register;

const Wrapper = styled.div`
  height: 100vh;
  background: #e0e5e7;
`;

const ContentWrapper = styled.div`
  display: grid;
  align-items: center;
  justify-content: center;
  grid-template-columns: repeat(2, 1fr);
  height: 100%;

  @media only screen and (max-width: 768px) {
    grid-template-columns: 1fr;
    overflow: hidden;
  }

  .mockup {
    width: 100%;
    height: 100%;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;

    @media only screen and (max-width: 768px) {
      display: none;
    }
  }

  .gradient {
    position: absolute;
    width: 100%;
    height: 100%;
  }

  .mockup-image {
    position: relative;
    top: 200px;
  }

  .content {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .form {
    width: 520px;
    background: #ffffff;
    border-radius: 17px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: 40px 0;

    @media only screen and (max-width: 768px) {
      padding: 40px 30px;
    }
  }

  .logo {
    width: 80px;
    height: 80px;
  }

  h4 {
    font-family: "Inter";
    font-style: normal;
    font-weight: 700;
    font-size: 40px;
    line-height: 73px;
  }

  .fields {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  input {
    width: 100%;
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

  .btn-login {
    background: #9ad0e8;
    border-radius: 8px;
    border: none;
    margin: 10px 0;
    font-family: "Inter";
    font-style: normal;
    font-weight: 700;
    font-size: 25px;
    line-height: 36px;
    padding: 10px 0;
    cursor: pointer;
    color: white;
    transition: all 0.3s ease-in-out;

    &:hover {
      transform: translate(0, -5px);
      background: #0691f5;
      box-shadow: 0px 4px 4px rgba(36, 130, 217, 0.35);
    }
  }
  p {
    font-family: "Inter";
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    line-height: 24px;
    margin: 10px 0;
  }

  span {
    font-family: "Poppins";
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    line-height: 24px;
    color: #2482d9;
    cursor: pointer;
  }
`;
