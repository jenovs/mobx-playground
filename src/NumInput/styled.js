import styled from 'styled-components';

export const Input = styled.input`
  background-color: transparent;
  border: none;
  color: #333;
  font-size: 20px;
  height: 100%;
  line-height: 20px;
  max-width: 12ch;
  padding: 6px 8px 4px;
  text-align: center;

  /* Remove number spinners on Firefox */
  -moz-appearance: textfield;

  /* Remove number spinners on Webkit browsers (Safari, Chrome) */
  &::-webkit-inner-spin-button,
  &::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

export const Wrapper = styled.form`
  display: flex;
`;
