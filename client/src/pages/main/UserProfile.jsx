import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserProfile } from "../../features/user/userSlice";

import styled from 'styled-components'
import { useParams } from "react-router-dom";

const UserProfile = () => {
  const { user, isLoading, userProfile } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  console.log(user);

  const { id } = useParams();

  useEffect(() => {
    dispatch(getUserProfile(id))
  }, [dispatch, id]);

  console.log(userProfile.payload);
  
  
  return (
    <>
      <ContentWrapper>
        <div className="user_profile">
          <img src={user?.user?.avatar} className="profile" alt="profile" />
          <div className="content1">
            <div className="users">
              <div className="total">
                <h3>{userProfile?.payload?.totalPosts}</h3>
                <p>Posts</p>
              </div>
              <div className="total">
                <h3>{userProfile?.payload?.totalFollowers}</h3>
                <p>Followers</p>
              </div>
              <div className="total">
                <h3>{userProfile?.payload?.totalFollowings}</h3>
                <p>Following</p>
              </div>
            </div>
            <button className="button">Button</button>
          </div>
          <div>
            <h2>{user?.user?.username }</h2>
            <h4>{user?.user?.fullName }</h4>
            <p className="bio">{user?.user?.bio }</p>
          </div>
        </div>

        <div className="users_posts">

          {
            userProfile?.payload?.feed?.map((data) => {
              return (
                <div key={data?._id}>
                  <img src={data?.post} alt="post"/>
                </div>
              )
              })
          }

        </div>
      </ContentWrapper>
    </>
  );
};

export default UserProfile;

const ContentWrapper = styled.div`
  max-width: 1234px;
  margin: 0 auto;
  display: flex;
  flex-direction:column ;
  align-items: center;
  justify-content: center;

  .user_profile {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 30px;
    margin: 20px 0;
  }

  .users {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    font-family: "Poppins";
  }

  .content1 {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  .profile {
    width: 150px;
    height: 150px;
    border-radius: 50%;
  }

  h3 {
    font-family: "Poppins";
    font-style: normal;
    font-weight: 500;
    font-size: 35px;
    line-height: 52px;
    text-align: center;
  }

  .button {
    width: 100%;
    border: none;
    margin: 10px 0;
    font-family: "Poppins";
    font-style: normal;
    font-weight: 500;
    font-size: 20px;
    line-height: 45px;
    cursor: pointer;
  }

  h2 {
    font-family: "Poppins";
    font-style: normal;
    font-weight: 500;
    font-size: 30px;
    line-height: 65px;
  }

  h4 {
    font-family: "Poppins";
    font-style: normal;
    font-weight: 500;
    font-size: 20px;
    line-height: 20px;
    margin: 10px 0;
    color: #4e4e4e;
  }

  .bio {
    font-family: "Poppins";
    font-style: normal;
    font-weight: 500;
    font-size: 20px;
    line-height: 30px;
    margin: 10px 0;
    color: #4e4e4e;
  }

  .users_posts{

  }
`;
