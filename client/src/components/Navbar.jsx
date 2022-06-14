import React from "react";
import Logo from "../assets/img/instagram logo.svg";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { Home2, SearchNormal, Export } from "iconsax-react";

import { useSelector } from "react-redux";

const Navbar = () => {
  const { user } = useSelector((state) => state.user);

  return (
    <Wrapper>
      <ContentWrapper>
        <LogoWrapper>
          <img src={Logo} className="logo" alt="instagram-logo" />
          <h4 className="logo-name">Instagram</h4>
        </LogoWrapper>

        <NavItems>
          <NavItem>
            <NavLink
              to="/"
              activestyle={{
                fontWeight: "bold",
                color: "#399ffd",
              }}
            >
              <Home2 size="32" variant="Outline" />
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink to="/search" activeclassname="selected">
              <SearchNormal size="32" variant="Outline" />
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink to="/create" activeclassname="selected">
              <Export size="32" variant="Outline" />
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink to={`/user/${user._id}`}>
              <img className="profile" src={user?.avatar} alt="profile" />
            </NavLink>
          </NavItem>
        </NavItems>
      </ContentWrapper>
    </Wrapper>
  );
};

export default Navbar;

const Wrapper = styled.div`
  height: 100px;
`;

const ContentWrapper = styled.div`
  max-width: 1234px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
`;

const LogoWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;

  .logo {
    width: 62px;
    height: 62px;
  }

  .logo-name {
    font-family: "Poppins";
    font-style: normal;
    font-weight: 700;
    font-size: 30px;
    line-height: 45px;
  }
`;

const NavItems = styled.ul`
  display: flex;
  align-items: center;
  list-style-type: none;
  @media only screen and (max-width: 640px) {
    display: none;
  }
`;

const NavItem = styled.li`
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
`;
