import React from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

const Feed = () => {
  const { id } = useParams();

  return (
    <Wrapper>
      <ContentWrapper></ContentWrapper>
    </Wrapper>
  );
};

export default Feed;

const Wrapper = styled.div``;

const ContentWrapper = styled.div``;
