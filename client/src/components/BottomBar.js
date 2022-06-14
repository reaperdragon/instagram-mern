import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { Home2, SearchNormal, Export } from "iconsax-react";

import { useSelector } from "react-redux";

const BottomBar = () => {
  const { user } = useSelector((state) => state.user);

  return (
    <Wrapper>
      <ContentWrapper>
        <nav class="mobile-bottom-nav">
          <div class="mobile-bottom-nav__item mobile-bottom-nav__item--active">
            <div class="mobile-bottom-nav__item-content">
              <Link to="/">
                <Home2 size="32" color="#697689" variant="Outline" />
              </Link>
            </div>
          </div>
          <div class="mobile-bottom-nav__item">
            <div class="mobile-bottom-nav__item-content">
              <Link to="/search">
                <SearchNormal size="32" color="#697689" variant="Outline" />
              </Link>
            </div>
          </div>
          <div class="mobile-bottom-nav__item">
            <div class="mobile-bottom-nav__item-content">
              <Link to={`/create`}>
                <Export size="32" color="#697689" variant="Outline" />
              </Link>
            </div>
          </div>

          <div class="mobile-bottom-nav__item">
            <div class="mobile-bottom-nav__item-content">
              <Link to={`/user/${user._id}`}>
                <img src={user?.avatar} className="profile" alt="profile" />
              </Link>
            </div>
          </div>
        </nav>
      </ContentWrapper>
    </Wrapper>
  );
};

export default BottomBar;

const Wrapper = styled.div`
  display: none;
  @media only screen and (max-width: 640px) {
    display: block;
  }
`;

const ContentWrapper = styled.div`
  @media only screen and (max-width: 640px) {
    .profile {
      width: 34px;
      height: 34px;
      border-radius: 50%;
    }

    .mobile-bottom-nav {
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      z-index: 1000;

      will-change: transform;
      transform: translateZ(0);

      display: flex;

      height: 50px;

      box-shadow: 0 -2px 5px -2px #333;
      background-color: #fff;

      &__item {
        flex-grow: 1;
        text-align: center;
        font-size: 12px;

        display: flex;
        flex-direction: column;
        justify-content: center;
      }
      &__item--active {
        //dev
        color: red;
      }
      &__item-content {
        display: flex;
        flex-direction: column;
      }
    }
  }
`;
