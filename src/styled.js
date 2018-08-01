import styled from 'styled-components';

export const CardWrapper = styled.div`
  align-items: center;
  background-color: #f9f9f9;
  border: 1px solid #bbb;
  border-radius: 2px;
  display: flex;
  height: 50px;
  justify-content: space-around;
  margin: 1rem auto;
  max-width: 700px;
  width: 100%;

  &:hover,
  &:active {
    background-color: #f2f2f2;
  }
`;
