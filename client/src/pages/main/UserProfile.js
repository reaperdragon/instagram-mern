import React from "react";
import { SpinnerCircularSplit } from "spinners-react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  followUser,
  getUserProfile,
  unFollowUser,
} from "../../features/user/userSlice";

import { logoutUser } from "../../features/user/userSlice";

import styled from "styled-components";
import { useNavigate, useParams, Link } from "react-router-dom";

import { Heart, Message } from "iconsax-react";

const UserProfile = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserProfile(id));
  }, [dispatch, id]);

  const { user, isLoading, userProfile } = useSelector((state) => state.user);

  const handleFollow = (e) => {
    e.preventDefault();
    dispatch(followUser({ userId: userProfile?.payload?.user?._id }));
  };

  const handleUnFollow = (e) => {
    e.preventDefault();
    dispatch(unFollowUser({ userId: userProfile?.payload?.user?._id }));
  };

  const FollowUnFollow = () => {
    if (userProfile?.payload?.user?.followers?.length > 0) {
      return userProfile?.payload?.user?.followers?.find(
        (person) => person._id === user?._id
      ) ? (
        <>
          <button className="button-unFollow" onClick={handleUnFollow}>
            Following
          </button>
        </>
      ) : (
        <>
          <button className="button-follow" onClick={handleFollow}>
            Follow
          </button>
        </>
      );
    }
    return (
      <>
        <button className="button-follow" onClick={handleFollow}>
          Follow
        </button>
      </>
    );
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
    <>
      <ContentWrapper>
        <div className="user_profile">
          <img
            src={userProfile?.payload?.user?.avatar}
            className="profile"
            alt="profile"
          />
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
            {userProfile?.payload?.user?._id === user?._id ? (
              <>
                {" "}
                <button
                  className="button-edit"
                  onClick={() => {
                    navigate("/editProfile");
                  }}
                >
                  Edit Profile
                </button>{" "}
                <button
                  className="btn-logout"
                  disabled={isLoading}
                  onClick={() => dispatch(logoutUser())}
                >
                  Log Out
                </button>
              </>
            ) : (
              <FollowUnFollow />
            )}
          </div>
          <div>
            <h2>{userProfile?.payload?.user?.username}</h2>
            <h4>{userProfile?.payload?.user?.fullName}</h4>
            <p className="bio">{userProfile?.payload?.user?.bio}</p>
          </div>
        </div>
      </ContentWrapper>

      <SectionWrapper>
        <section class="post-list">
          {userProfile?.payload?.feed?.map((data) => {
            return (
              <Link to={`/feed/${data?._id}`} className="post">
                <figure class="post-image">
                  <img
                    src={data?.post}
                    alt="profile-post"
                    className="post-main"
                  />
                </figure>
                <span class="post-overlay">
                  <p>
                    <span class="post-likes">
                      {" "}
                      <Heart size="32" color="#697689" variant="Bold" />
                      {data?.likes?.length}
                    </span>
                    <span class="post-comments">
                      {" "}
                      <Message size="32" color="#697689" variant="Bold" />
                      {data?.comments?.length}
                    </span>
                  </p>
                </span>
              </Link>
            );
          })}
        </section>
      </SectionWrapper>
    </>
  );
};

export default UserProfile;

const Loader = styled.div`
  height: 800px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ContentWrapper = styled.div`
  max-width: 1234px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
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

  .button-edit {
    width: 100%;
    border: none;
    margin: 10px 0;
    font-family: "Poppins";
    font-style: normal;
    font-weight: 500;
    font-size: 20px;
    line-height: 45px;
    background: #ededed;
    border: 1px solid #969696;
    border-radius: 3px;
    cursor: pointer;
  }

  .button-follow {
    width: 100%;
    border: none;
    margin: 10px 0;
    font-family: "Poppins";
    font-style: normal;
    font-weight: 500;
    font-size: 20px;
    line-height: 45px;
    background: #0691f5;
    border-radius: 3px;
    color: white;
    cursor: pointer;
  }

  .button-unFollow {
    width: 100%;
    border: none;
    margin: 10px 0;
    font-family: "Poppins";
    font-style: normal;
    font-weight: 500;
    font-size: 20px;
    line-height: 45px;
    border: 1px solid #0691f5;
    border-radius: 3px;
    color: #0691f5;
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

  .btn-logout {
    width: 100%;
    height: 50px;
    background: #ff5454;
    border-radius: 3px;
    cursor: pointer;
    border: none;
    font-family: "Poppins";
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    line-height: 45px;
    margin: 10px 0;
    transition: all 0.25s ease-in-out;
    &:hover {
      background: #fd3939;
      box-shadow: 0px 10px 20px rgba(253, 57, 57, 0.5);
      transform: translate(0, -5px);
      color: white;
    }
  }
`;

const SectionWrapper = styled.div`
  .post-list {
    display: grid;
    grid-template-columns: repeat(3, minmax(100px, 293px));
    justify-content: center;
    grid-gap: 28px;
  }
  .post {
    cursor: pointer;
    position: relative;
    display: block;
    transition: all 0.3s ease-in-out;

    .post:hover .post-overlay {
      display: flex;
    }
  }
  .post-image {
    margin: 0;
    width: 100%;
    height: 100%;
    transition: all 0.3s ease-in-out;
  }
  .post-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: all 0.5s ease;
    cursor: pointer;
    transition: all 0.3s ease-in-out;
  }
  .post-overlay {
    background: rgba(0, 0, 0, 0.4);
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    display: none;
    align-items: center;
    justify-content: center;
    color: white;
    text-align: center;
    transition: all 0.3s ease-in-out;
  }
  .post:hover .post-overlay {
    display: flex;
    font-family: "Poppins";
  }

  .post-likes,
  .post-comments {
    width: 80px;
    margin: 5px;
    font-weight: bold;
    text-align: center;
    display: inline-block;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
  }

  @media screen and (max-width: 768px) {
    .post-list {
      grid-gap: 3px;
    }
  }
`;
