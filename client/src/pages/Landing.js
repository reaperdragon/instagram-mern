import React from "react";
import styled from "styled-components";
import Mockup from "../assets/img/iphonesvg.svg";
import { Link } from "react-router-dom";
import Logo from "../assets/img/instagram logo.svg";

const Landing = () => {
  return (
    <Wrapper>
      <ContentWrapper>
        <div className="content">
          <img src={Logo} alt="logo" className="logo" />
          <h1>Instagram</h1>
          <Link to="/register">Register / Log In</Link>
        </div>

        <div className="mockup-image">
          <img src={Mockup} alt="mockup" />
        </div>
      </ContentWrapper>
    </Wrapper>
  );
};

export default Landing;

const Wrapper = styled.div`
  height: 100%;
`;

const ContentWrapper = styled.div`
  max-width: 1234px;
  margin: 0 auto;
  display: grid;
  align-items: center;
  justify-content: center;
  grid-template-columns: repeat(2, 1fr);
  padding: 15px 0;
  transition: all 0.3s ease-in-out;

  @media only screen and (max-width: 768px) {
    grid-template-columns: repeat(1, 1fr);
    height: 90vh;
  }

  .content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .logo {
    display: none;
    @media only screen and (max-width: 768px) {
      display: block;
      margin: 20px 0;
    }
  }

  h1 {
    font-family: "Poppins";
    font-style: normal;
    font-weight: 700;
    font-size: 60px;
    line-height: 90px;
    margin: 20px 0;
  }

  & a {
    background: #2482d9;
    padding: 15px;
    font-family: "Poppins";
    font-style: normal;
    font-weight: 500;
    font-size: 20px;
    line-height: 45px;
    color: white;
    text-decoration: none;
    border-radius: 10px;
    transition: all 0.3s ease-in-out;
    margin: 20px 0;

    :hover {
      transform: translate(0, -10px);
      box-shadow: 0px 4px 20px rgba(36, 130, 217, 0.5);
    }
  }

  .mockup-image {
    display: flex;
    align-items: center;
    justify-content: center;

    @media only screen and (max-width: 940px) {
      display: none;
    }
  }
`;
