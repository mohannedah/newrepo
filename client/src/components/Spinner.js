import React from "react";
import styled from "styled-components";
import spinner from "../images/Twitter Logo Animation.gif";

const SpinnerComponent = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SpinnerContainer = styled.div`
  min-height: 30vh;
`;

const Spinner = () => {
  return (
    <SpinnerComponent>
      <SpinnerContainer>
        <img className='h-50 w-50' src={spinner} alt='' />
      </SpinnerContainer>
    </SpinnerComponent>
  );
};

export default Spinner;
