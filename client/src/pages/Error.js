import React from "react";
import styled from "styled-components";
import Logo from "../assets/img/instagram logo.svg";
import { Link } from "react-router-dom";

const Error = () => {
  return (
    <Wrapper>
      <ContentWrapper>
        <div className="content">
          <img src={Logo} alt="logo" className="logo" />
          <h2>Oooops!</h2>
          <p>
            Sorry, The Page You are looking for doesn’t exists or has been
            removed.{" "}
          </p>
          <Link to="/landing" className="button">
            Go Back to Home
          </Link>
        </div>
      </ContentWrapper>
    </Wrapper>
  );
};

export default Error;

const Wrapper = styled.div`
  height: 90vh;
`;

const ContentWrapper = styled.div`
  max-width: 1234px;
  margin: 0 auto;
  display: grid;
  align-items: center;
  justify-content: center;
  grid-template-rows: 1fr;
  padding: 15px 0;
  transition: all 0.3s ease-in-out;
  height: 100%;

  .content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .logo {
    width: 80px;
    height: 80px;
    margin: 20px 0;
  }

  h2 {
    font-family: "Inter";
    font-style: normal;
    font-weight: 700;
    font-size: 80px;
    line-height: 40px;
    margin: 20px 0;
  }

  p {
    font-family: "Poppins";
    font-style: normal;
    font-weight: 700;
    font-size: 20px;
    line-height: 20px;
    text-align: center;
    color: #606060;
    margin: 20px 0;
  }

  .button {
    padding: 20px;
    font-family: "Poppins";
    font-style: normal;
    font-weight: 500;
    font-size: 20px;
    line-height: 25px;
    border: 4px solid #2482d9;
    color: #2482d9;
    border-radius: 10px;
    text-decoration: none;
    transition: all 0.3s ease-in-out;
    margin: 20px 0;

    &:hover {
      color: white;
      background: #2482d9;
      transform: translate(0, -5px);
      box-shadow: 0px 4px 4px rgba(36, 130, 217, 0.35);
    }
  }
`;
