import styled from 'styled-components';

const BREAK_SMALL = 650;

export const CardWrapper = styled.div`
  align-items: center;
  background-color: #f9f9f9;
  border: 1px solid #bbb;
  border-radius: 2px;
  display: flex;
  height: 50px;
  justify-content: space-between;
  margin: 1rem auto;
  padding: 0 2rem;
  width: 100%;

  &:hover,
  &:active {
    background-color: #f2f2f2;
  }

  @media (max-width: ${BREAK_SMALL}px) {
    align-items: flex-end;
    flex-direction: column;
    height: auto;
    padding: 1rem;
    padding-right: 5rem;
  }
`;

export const Delete = styled.button.attrs({
  title: 'Delete',
})`
  background-color: transparent;
  border: none;
  color: tomato;
  font-size: 2rem;
  font-weight: bold;
  padding-left: 1rem;
`;

export const DeltaWrapper = styled.div`
  align-self: flex-start;
  box-sizing: border-box;
  color: ${p => (p.color ? p.color : 'inherit')};
  display: flex;
  font-size: 10px;
  padding: 1rem 1ch;
  width: 25ch;

  @media (max-width: ${BREAK_SMALL}px) {
    align-self: auto;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    min-height: 20px;
    padding: 0 1ch;
    width: auto;
  }
`;

export const FromCurrency = styled.div`
  align-items: center;
  display: flex;
`;

export const Label = styled.div`
  margin-left: 0;
  padding-left: 1rem;
`;

export const TotalWrapper = styled.div`
  color: ${p => (p.color ? p.color : 'inherit')};
  display: flex;
  flex: 1;
  justify-content: flex-end;

  @media (min-width: ${BREAK_SMALL}px) {
    flex: auto;
  }
`;
