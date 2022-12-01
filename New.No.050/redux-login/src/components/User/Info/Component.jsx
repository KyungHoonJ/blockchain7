import styled from "styled-components";

const InfoComponent = ({ userName, onClick }) => {
  return (
    <InfoBox>
      {userName} 님 어서오세요.{" "}
      <button
        onClick={() => {
          onClick();
        }}
      >
        Log Out
      </button>
    </InfoBox>
  );
};

export default InfoComponent;

const InfoBox = styled.div``;
