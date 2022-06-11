import React from 'react'
import styled from 'styled-components'
import { Link, NavLink } from "react-router-dom";
import { Home2, SearchNormal, Export } from "iconsax-react";

import { useSelector } from "react-redux";

const BottomBar = () => {

     const { user, isLoading } = useSelector((state) => state.user);

  return (
    <Wrapper>
      <ContentWrapper>
        <NavItems>
          <NavItem>
            <NavLink
              to="/"
              activeStyle={{
                fontWeight: "bold",
                color: "#399ffd",
              }}
            >
              <Home2 size="32" variant="Outline" />
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink to="/search" activeClassName="selected">
              <SearchNormal size="32" variant="Outline" />
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink to="/create" activeClassName="selected">
              <Export size="32" variant="Outline" />
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink to={`/user/${user.user._id}`}>
              <img className="profile" src={user?.user?.avatar} alt="profile" />
            </NavLink>
          </NavItem>
        </NavItems>
      </ContentWrapper>
    </Wrapper>
  );
}

export default BottomBar

const Wrapper = styled.div`
  @media only screen and (max-width: 640px) {
    position: relative;
    height:100vh ;
  }
`;

const ContentWrapper = styled.div`
  @media only screen and (max-width: 640px) {
    position: absolute;
    bottom: 0;
  }
`;

const NavItems = styled.ul`
 @media only screen and (max-width: 640px) {
  display: flex;
  align-items: center;
  list-style-type: none;
 }
`;

const NavItem = styled.li`
 @media only screen and (max-width: 640px) {
  margin: 0 10px;

  .selected {
    color: #399ffd;
  }

  a {
    text-decoration: none;
    color: black;
    font-family: "Poppins";
    transition: all 0.3s ease-in-out;

    .profile {
      width: 34px;
      height: 34px;
      border-radius: 50%;
    }

    &:hover {
      color: #399ffd;
    }
  }
}
`;
